<template>
  <section>
    <div class="modal-card" style="height: 640px">
      <header class="modal-card-head">
        <p class="modal-card-title">Book a 1 hour session</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <b-field label="Select datetime">
          <b-datetimepicker
            v-model="datetime"
            rounded
            placeholder="Click to select..."
            icon="calendar-today"
            :icon-right="datetime ? 'close-circle' : ''"
            icon-right-clickable
            @icon-right-click="clearDateTime"
            locale="de-De"
            :datepicker="{ showWeekNumber: true }"
            :timepicker="{ enableSeconds: false, hourFormat: '24' }"
            horizontal-time-picker
          >
          </b-datetimepicker>
        </b-field>
        <b-message
          v-if="error"
          title="Error"
          type="is-danger"
          aria-close-label="Close message"
        >
          {{ errorMessage }}
        </b-message>
        <b-message
          v-if="success"
          title="Success"
          type="is-success"
          aria-close-label="Close message"
        >
          {{ successMessage }}
        </b-message>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Close" @click="$emit('close')" />
        <b-button @click="book" label="Book!" type="is-primary" />
      </footer>
    </div>
  </section>
</template>

<script lang="ts">
import { Constants } from "@/Constants";
import { BookingDTO } from "@/http/DTOs/booking.dto";
import { book } from "@/http/requests";
import { GymRow } from "@/views/Home.vue";
import moment from "moment";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class BookingModal extends Vue {
  @Prop() private gymUuid!: string;
  @Prop() private gymName!: string;
  datetime: any = new Date();
  error = false;
  errorMessage = "";
  success = false;
  successMessage = "";

  clearDateTime() {
    this.datetime = null;
  }

  async book() {
    const datetimeFormated = moment(
      this.datetime,
      Constants.DATE_TIME_FORMAT
    ).format(Constants.DATE_TIME_FORMAT);

    const booking: BookingDTO = {
      gymId: this.gymUuid,
      datetime: datetimeFormated,
    };
    try {
      const newBooking = await book(booking);
      if (newBooking) {
        this.success = true;
        this.successMessage = `Your booking at ${this.gymName} was made`;
      }
    } catch (error: any) {
      this.error = true;
      this.errorMessage = error.response.data.error;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
