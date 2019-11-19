<template>
  <div>
    <v-toolbar
      :extended="extended"
      :prominent="prominent"
      :dense="dense"
      :collapse="collapse"
      :flat="flat"
      :src="
        bg
          ? 'https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg'
          : undefined
      "
      :extension-height="extensionHeight"
    >

      <v-toolbar-title>{{username}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn to="/animeandmanga" text>Anime & manga</v-btn>
        <v-btn to="/textchat" text>Textchat</v-btn>
        <v-btn to="/webcamchat" text>Videochat</v-btn>
        <v-btn to="/users" text>MAL users</v-btn>
      </v-toolbar-items>

      <template v-if="$vuetify.breakpoint.smAndUp">
        <v-btn icon>
          <v-icon>mdi-power-settings</v-icon>
        </v-btn>
      </template>
    </v-toolbar>
  </div>
</template>

<script>
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
  mounted(){
    try{
      this.username = JSON.parse(sessionStorage.getItem("userInfo")).profile.name;
    }
    catch (e) {
      this.username = null;
    }
  },
  watch: {
    '$route'(){
      try{
        this.username = JSON.parse(sessionStorage.getItem("userInfo")).profile.name;
      }
      catch (e) {
        this.username = null;
      }
    }
  }
};
</script>
