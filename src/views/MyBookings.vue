<template>
  <div class="home">
    <Header />
    <h1 class="title is-1">My bookings</h1>
    <b-table striped hoverable :data="bookingsTableData">
      <b-table-column field="id" label="ID" centered v-slot="props">
        {{ props.row.id }}
      </b-table-column>
      <b-table-column field="uuid" label="UUID" centered v-slot="props">
        {{ props.row.uuid }}
      </b-table-column>
      <b-table-column field="gymName" label="Gym name" centered v-slot="props">
        {{ props.row.gymName }}
      </b-table-column>
      <b-table-column
        field="gymAddress"
        label="Gym address"
        centered
        v-slot="props"
      >
        {{ props.row.gymAddress }}
      </b-table-column>
      <b-table-column field="dateTime" label="On" centered v-slot="props">
        {{ props.row.dateTime }}
      </b-table-column>
      <b-table-column
        field="createdOn"
        label="Cerated on"
        centered
        v-slot="props"
      >
        {{ props.row.createdOn }}
      </b-table-column>
      <b-table-column field="delete" label="Remove" centered v-slot="props">
        <b-button
          @click="removeBooking(props.row)"
          class="is-borderless is-borderless"
        >
          <b-icon icon="delete"></b-icon>
        </b-button>
      </b-table-column>
    </b-table>
  </div>
</template>

<script lang="ts">
import { deleteBooking, getGyms, getMyBookings } from "@/http/requests";
import { Gym } from "@/models/gym.model";
import store from "@/store";
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import { Booking } from "@/models/booking.model";

export interface BookingTable {
  id?: number;
  uuid?: string;
  gymName?: string;
  gymAddress?: string;
  dateTime?: string;
  createdOn?: string;
  delete?: any;
}

@Component({
  components: {
    Header,
  },
})
export default class MyBookings extends Vue {
  bookings: Booking[] = [];
  bookingsTableData: BookingTable[] = [];
  bookingsTablesColumns = [
    {
      field: "id",
      label: "ID",
      centered: true,
    },
    {
      field: "uuid",
      label: "UUID",
      centered: true,
    },
    {
      field: "gymName",
      label: "Gym Name",
      centered: true,
    },
    {
      field: "gymAddress",
      label: "Gym Address",
      centered: true,
    },
    {
      field: "dateTime",
      label: "On",
      centered: true,
    },
    {
      field: "createdOn",
      label: "Made on",
      centered: true,
    },
    {
      field: "delete",
      label: "Delete booking",
      centered: true,
    },
  ];

  async beforeMount(): Promise<void> {
    if (store.state.user === {}) {
      this.$router.push({
        name: "Login",
        params: {
          error: "true",
          errorMessage: "Your session has expired please login.",
        },
      });
    }
    await this.getMyBookings();
  }

  async removeBooking(row: BookingTable) {
    console.log(row);
    if (row.uuid) {
      try {
        await deleteBooking(row.uuid);
        await this.getMyBookings();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getMyBookings() {
    this.bookings = await getMyBookings();
    this.bookingsTableData = this.bookings.map((booking: Booking) => {
      return {
        id: booking.id,
        uuid: booking.uuid,
        gymName: booking.gym?.name,
        gymAddress: booking.gym?.address,
        dateTime: booking.time,
        createdOn: booking.createdOn,
      };
    });
  }
}
</script>
