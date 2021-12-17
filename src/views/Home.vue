<template>
  <div class="home">
    <Header />
      <h1 class="title is-1">Gyms</h1>
    <b-table @dblclick="openBookingModal" striped hoverable :data="gymsTableData" :columns="gymTablesColumns"></b-table>
  </div>
</template>

<script lang="ts">
import { getGyms } from "@/http/requests";
import { Gym } from "@/models/gym.model";
import store from "@/store";
import { Component, Vue } from "vue-property-decorator";
import Header from '@/components/Header.vue';
import BookingModal from "@/components/BookingModal.vue";

export interface GymRow {
  id?: number;
  uuid?: string;
  name?: string;
  address?: string;
  maxVisitors?: number;
}

@Component({
  components: {
    Header
  },
})
export default class Home extends Vue {
  gyms: Gym[] = [];
  gymsTableData: GymRow[] = [];
  gymTablesColumns = [
    {
      field: "id",
      label: "ID",
      centered: true
    },
    {
      field: "uuid",
      label: "UUID",
      centered: true
    },
    {
      field: "name",
      label: "NAME",
      centered: true
    },
    {
      field: "address",
      label: "ADDRESS",
      centered: true
    },
    {
      field: "maxVisitors",
      label: "MAX VISITORS",
      centered: true
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
    await this.getAllGyms()
  }

  openBookingModal(gymRow: GymRow) {
    this.$buefy.modal.open({
                    parent: this,
                    component: BookingModal,
                    props: {
                      gymUuid: gymRow.uuid,
                      gymName: gymRow.name
                    },
                    hasModalCard: true,
                    trapFocus: true
                })
  }

  async getAllGyms() {
    this.gyms = await getGyms();
    this.gymsTableData = this.gyms.map((gym: Gym) => {
      return {
        id: gym.id,
        uuid: gym.uuid,
        name: gym.name,
        address: gym.address,
        maxVisitors: gym.maxVisitors,
      };
    });
  }
}
</script>
