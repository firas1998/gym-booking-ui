<template>
  <div>
    <b-navbar>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
          />
        </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-item
          v-if="authenticated"
          tag="router-link"
          :to="{ name: 'Home' }"
        >
          Gyms
        </b-navbar-item>
        <b-navbar-item
          v-if="authenticated"
          tag="router-link"
          :to="{ name: 'MyBookings' }"
        >
          My bookings
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'ActiveUsers' }">
          Active users
        </b-navbar-item>
      </template>

      <template v-if="!authenticated" #end>
        <b-navbar-item tag="div">
          <div class="buttons">
            <router-link
              tag="a"
              :to="{ name: 'Login' }"
              class="button is-light"
            >
              Log in
            </router-link>
          </div>
        </b-navbar-item>
      </template>
      <template v-else #end>
        <div class="buttons">
          <a class="button is-primary">
            <strong>{{ firstname }}</strong>
          </a>
          <a @click="logout" class="button is-light"> Log out </a>
        </div>
      </template>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { logout, me } from "@/http/requests";
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { User } from "@/models/user.model";

@Component<Header>({
  computed: {
    auth() {
      return this.$store.state.authenticated;
    },
  },
  watch: {
    async auth() {
      await this.beforeMount();
    },
  },
})
export default class Header extends Vue {
  firstname = "";
  authenticated = false;

  async beforeMount(): Promise<void> {
    await this.isAuthenticated();
  }

  async isAuthenticated(): Promise<void> {
    let user: User;
    console.log(store.state.authenticated);
    if (store.state.authenticated) {
      try {
        user = await me();
        this.firstname = user.firstName ? user.firstName : "";
        this.authenticated = true;
      } catch (error: any) {
        store.commit("setAuthenticated", { authenticated: false });
        this.authenticated = false;
        console.log(error.response.data);
      }
    }
  }

  async logout(): Promise<void> {
    try {
      await logout();
      router.push({ name: "Login" });
    } catch (error: any) {
      console.log(error.response.data);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
