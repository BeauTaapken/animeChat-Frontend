<template>
  <div>
    <v-toolbar
    >
      <v-toolbar-title>{{ username }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn to="/animeandmanga" text>Anime & manga</v-btn>
        <v-btn to="/users" text>MAL users</v-btn>
        <v-btn to="/textchat" text>Textchat</v-btn>
        <v-btn to="/searchfriends" text>Search friends</v-btn>
        <v-btn to="/webcamchat" text>Videochat</v-btn>
      </v-toolbar-items>

      <template v-if="$vuetify.breakpoint.smAndUp">
        <v-btn @click="logout" icon>
          <i class="fas fa-power-off"></i>
        </v-btn>
      </template>
    </v-toolbar>
  </div>
</template>

<script>
import firebase from "firebase";
import router from "../router";
export default {
  name: "Navbar",
  props: {
    msg: String
  },
  data() {
    return {
      username: null
  };
  },
  mounted() {
    try {
      this.username = JSON.parse(
        sessionStorage.getItem("userInfo")
      ).profile.name;
    } catch (e) {
      this.username = null;
    }
  },
  watch: {
    $route() {
      try {
        this.username = JSON.parse(
          sessionStorage.getItem("userInfo")
        ).profile.name;
      } catch (e) {
        this.username = null;
      }
    }
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          sessionStorage.clear();
          router.push("/");
          // Sign-out successful.
        })
        .catch(function(error) {
          console.log(error);
          // An error happened.
        });
    }
  }
};
</script>
