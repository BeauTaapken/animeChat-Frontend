import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as firebase from "firebase";
import vuetify from "./plugins/vuetify";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

library.add(faUserSecret);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

var firebaseConfig = {
  apiKey: "AIzaSyCDmDYxwlofI1H-0hRbdONDQhLr9v8_0Xo",
  authDomain: "animechat-45181.firebaseapp.com",
  databaseURL: "https://animechat-45181.firebaseio.com",
  projectId: "animechat-45181",
  storageBucket: "animechat-45181.appspot.com",
  messagingSenderId: "287685805323",
  appId: "1:287685805323:web:3cfcd532f2e72d80f50e0e",
  measurementId: "G-RFTWMBEE35"
};

firebase.initializeApp(firebaseConfig);

export const eventBus = new Vue();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
