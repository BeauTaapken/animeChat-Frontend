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
          ref="animeSearch"
        ></v-text-field>
        <div
          class="fa-border static-height"
          id="anime"
          ref="animelocation"
        ></div>
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
import AnimeMangaInstance from "../components/animeMangaInstance";
import Vue from "vue";
const ComponentClass = Vue.extend(AnimeMangaInstance);

export default {
  name: "AnimeAndManga",
  data() {
    return {
      anime: null,
      manga: null,
      request: null
    };
  },
  mounted() {
    this.request = new XMLHttpRequest();
  },
  methods: {
    searchAnime() {
      const animeDiv = this.$refs.animelocation;
      const animeSearch = this.$refs.animeSearch;
      while (animeDiv.firstChild) {
        animeDiv.removeChild(animeDiv.firstChild);
      }
      if (this.anime.length > 3) {
        this.request.open(
          "GET",
          "https://api.jikan.moe/v3/search/anime?q=" + this.anime + "&limit=5"
        );
        this.request.onreadystatechange = function() {
          if (this.readyState === 4) {
            console.log("body:", this.response);
            for (let i = 0; i < 5; i++) {
              const anime = JSON.parse(this.response).results[i];
              const instance = new ComponentClass({
                propsData: {
                  title: anime.title,
                  description: anime.synopsis,
                  image: anime.image_url,
                  url: anime.url
                }
              });
              instance.$mount();
              animeDiv.appendChild(instance.$el);

              console.log(JSON.parse(this.response).results[i]);
            }
            animeSearch.value = "";
          }
        };
        this.request.send();
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
  overflow-y: auto;
  height: 600px;
}
</style>
