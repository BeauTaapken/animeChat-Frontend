<template>
  <v-app>
    <v-content>
      <Navbar v-if="token" />
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import router from "./router";
export default {
  name: "App",

  components: {
    Navbar
  },

  data() {
    return {
      username: null,
      token: null
    };
  },
  beforeMount() {
    try{
      if (sessionStorage.getItem("token") === null) {
        router.push("/");
      }
    }
    catch {
      router.push("/");
    }
  },
  watch: {
    $route() {
      try {
        this.token = sessionStorage.getItem("token");
      } catch (e) {
        this.token = null;
      }
    }
  }
};
</script>
<style>
  h1 {
    text-align: center;
  }
</style>
