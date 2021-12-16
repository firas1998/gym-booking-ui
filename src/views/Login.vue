<template>
  <div class="login">
    <div class="head">
      <h1 class="title is-1">Login</h1>
    </div>
    <div class="loginForm">
      <vue-tel-input mode="international" v-model="phonenumber"></vue-tel-input>
      <br />
      <b-field v-if="verificationCodeSent" label="Verification code">
        <b-input v-model="verificationCode"></b-input>
      </b-field>
      <div v-if="!verificationCodeSent" class="buttons">
        <b-button
          id="verificationCodeButton"
          type="is-primary"
          v-on:click="sendVerificationCode"
          expanded
          >Send verification code</b-button
        >
      </div>
      <div v-if="verificationCodeSent" class="buttons">
        <b-button type="is-primary" v-on:click="login" expanded>Login</b-button>
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
import Header from "@/components/Header.vue";
import { me, login } from "@/http/requests";
import * as firebase from "@firebase/auth";
import { Component, Vue } from "vue-property-decorator";

@Component<Login>({
  components: {
    Header
  },})
export default class Login extends Vue {
  error = false;
  errorMessage = "";
  phonenumber = "";
  verificationCodeSent = false;
  verificationCode = "";
  confirmationResult: any;

  beforeMount(): void {
    if (this.$store.state.firebaseUser) {
      this.$router.push({ name: "Home" });
    }
    this.error = this.$route.params.error === "true";
    this.errorMessage = this.$route.params.errorMessage;
  }

  async sendVerificationCodeFB(
    phoneNumber: string
  ): Promise<firebase.ConfirmationResult | false> {
    const auth = firebase.getAuth();
    auth.useDeviceLanguage();

    const recaptcha = new firebase.RecaptchaVerifier(
      "verificationCodeButton",
      {
        size: "invisible",
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log(response);
        },
      },
      auth
    );
    try {
      return await firebase.signInWithPhoneNumber(auth, phoneNumber, recaptcha);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async sendVerificationCode(): Promise<void> {
    if (this.phonenumber === "") {
      this.error = true;
      this.errorMessage = "Something is wrong with the phone number";
      return;
    }
    try {
      this.confirmationResult = await this.sendVerificationCodeFB(
        this.phonenumber
      );
    } catch (error) {
      console.log(error);
    }

    if (!this.confirmationResult) {
      this.error = true;
      this.errorMessage = "Something is wrong";
      return;
    }
    this.verificationCodeSent = true;
  }

  async login(): Promise<void> {
    const res = await login(this.verificationCode, this.confirmationResult);
    if (!res) {
      this.error = true;
      this.errorMessage = "Wrong verification code";
    }
    try {
      const user = await me();
      this.$router.push({ name: "Home" });
    } catch (error) {
      this.$router.push({ name: "CreateUser" });
    }
  }
}
</script>
<style>
.loginForm {
  width: 30%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5em;
  border: 1px solid black;
  padding: 2em;
  border-radius: 15px;
}
</style>
