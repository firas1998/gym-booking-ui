<template>
  <div class="createUser">
    <div class="createUserForm">
      <b-field label="First name">
        <b-input v-model="firstname"></b-input>
      </b-field>
      <b-field label="Last name">
        <b-input v-model="lastname"></b-input>
      </b-field>
      <b-field label="Gender">
        <b-select expanded v-model="gender" placeholder="Gender">
          <option
            v-for="option in genderOptions"
            :value="option.value"
            :key="option.value"
          >
            {{ option.text }}
          </option>
        </b-select>
      </b-field>
      <br />
      <b-field>
        <b-datepicker
          v-model="dateOfBirth"
          ref="datepicker"
          expanded
          placeholder="Date of birth"
        >
        </b-datepicker>
        <b-button
          @click="$refs.datepicker.toggle()"
          icon-left="calendar-today"
          type="is-primary"
        />
      </b-field>
      <br />
      <div class="buttons">
        <b-button type="is-primary" v-on:click="createUser" expanded
          >Create user</b-button
        >
      </div>
      <b-message
        v-if="error"
        title="Error"
        type="is-danger"
        aria-close-label="Close message"
      >
        {{ errorMessage }}
      </b-message>
    </div>
  </div>
</template>

<script lang="ts">
import { UserDTO } from "@/http/DTOs/user.dto";
import { Gender } from "@/http/Enums/gender.enum";
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
import { Constants } from "@/Constants";
import { createUser } from "@/http/requests";
import router from "@/router";
import Header from "@/components/Header.vue";

@Component({
  components: {
    Header
  },
})
export default class CreateUser extends Vue {
  firstname = "";
  firstnameError = false;
  lastname = "";
  gender = Gender.MALE;
  dateOfBirth = new Date();
  error = false;
  errorMessage = "";
  genderOptions = [
    { value: Gender.MALE, text: "Male" },
    { value: Gender.FEMALE, text: "Female" },
    { value: Gender.OTHER, text: "Other" },
  ];

  async createUser() {
    // const dateOfBirthString = moment(
    //   this.dateOfBirth,
    //   Constants.DATE_FORMAT
    // ).format(Constants.DATE_FORMAT);
    this.errorMessage = "";
    this.error = false;
    if (this.firstname === "") {
      this.error = true;
      this.errorMessage += "firstname can't be empty";
    }
    if (this.lastname === "") {
      this.error = true;
      this.errorMessage += "lastname can't be empty";
    }
    if (this.error) {
      return;
    }
    const userDTO: UserDTO = {
      firstName: this.firstname,
      lastName: this.lastname,
      gender: this.gender,
      dateOfBirth: this.dateOfBirth,
    };

    try {
      const newUser = await createUser(userDTO);
      router.push({name: 'Home'});
    } catch (error) {
      this.error = true;
      this.errorMessage = "oops something went wrong";
    }
  }
}
</script>
<style>
.createUserForm {
  width: 30%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5em;
  border: 1px solid black;
  padding: 2em;
  border-radius: 15px;
}
</style>