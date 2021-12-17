import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from "firebase/auth";
import createPersistedState from "vuex-persistedstate";
import { User } from '@/models/user.model';


Vue.use(Vuex)
export interface State {
  authenticated: boolean;
  user: User;
}
export default new Vuex.Store<State>({
  plugins: [createPersistedState()],
  state: {
    authenticated: false,
    user: {}
  },
  mutations: {
    setUser: (state, { user }) => {
      state.user = user;
    },
    setAuthenticated: (state, { authenticated }) => {
      state.authenticated = authenticated;
    }

  },
  actions: {
  },
  modules: {
  }
})
