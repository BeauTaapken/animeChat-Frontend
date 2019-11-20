<template>
  <div>
    <h1>
      Search anime & manga
    </h1>
    <div id="wrapper">
      <div>
        <v-text-field
          label="Search for an anime"
          placeholder="Enter name"
          append-icon="fas fa-search"
          @click:append="searchAnime"
          v-model="anime"
        ></v-text-field>
        <div class="fa-border static-height" id="anime"></div>
      </div>
      <div>
        <v-text-field
          label="Search for a manga"
          placeholder="Enter name"
          append-icon="fas fa-search"
          @click:append="searchManga"
          v-model="manga"
        ></v-text-field>
        <div class="fa-border static-height" id="manga"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnimeAndManga",
  data() {
    return {
      anime: null,
      manga: null
    };
  },
  methods: {
    searchAnime() {
      if (this.anime !== null) {
        console.log(this.anime);
      }
    },
    searchManga() {
      if (this.manga !== null) {
        console.log(this.manga);
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

.static-height {
  height: 600px;
}
</style>
