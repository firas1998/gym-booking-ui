import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as firebase from 'firebase/app';
import { FirebaseOptions } from 'firebase/app';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';
Vue.use(Buefy);
Vue.use(VueTelInput);

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyAbJJ57TKK9qZxNV-8rl_fa67D0UkPzWrQ",
  authDomain: "phone-signin-test.firebaseapp.com",
  databaseURL: "https://phone-signin-test.firebaseio.com",
  projectId: "phone-signin-test",
  storageBucket: "phone-signin-test.appspot.com",
  messagingSenderId: "641430917562",
  appId: "1:641430917562:web:69fb495b1802cde81e8d83",
  measurementId: "G-D1BF6LQB9W"
} as FirebaseOptions;

const app = firebase.initializeApp(firebaseConfig);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
