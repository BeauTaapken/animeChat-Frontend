<template>
  <div>
    <h1>users</h1>
    <div id="wrapper">
      <div>
        <v-text-field
          label="Search for a MAL user"
          placeholder="Enter name"
          append-icon="fas fa-search"
          @click:append="searchUser"
          v-model="user"
        ></v-text-field>
        <div class="fa-border static-height-user" id="user"></div>
      </div>
      <div>
        <div class="fa-border static-height" id="userAnime"></div>
          <div class="fa-border static-height" id="userManga"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      user: null
    };
  },
  methods: {
    searchUser() {
      if (this.user !== null) {
        console.log(this.user);
      }
    }
  }
};
</script>

<style scoped>
#wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 100px;
  padding: 50px;
}

.static-height-user{
    height: 600px;
}

.static-height {
  height: 310px;
    margin-bottom: 50px;
}
</style>
