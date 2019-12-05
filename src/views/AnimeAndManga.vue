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
          ref="mangaSearch"
        ></v-text-field>
        <div
          class="fa-border static-height"
          id="manga"
          ref="mangalocation"
        ></div>
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
            if (this.status === 200) {
              const animeArray = JSON.parse(this.response).results;
              for (let i = 0; i < Object.keys(animeArray).length; i++) {
                const anime = animeArray[i];
                const instance = new ComponentClass({
                  propsData: {
                    animeOrManga: "anime",
                    title: anime.title,
                    description: anime.synopsis,
                    image: anime.image_url,
                    url: anime.url,
                    episodes: anime.episodes,
                    rating: anime.rated,
                    airing: anime.airing,
                    score: anime.score,
                    type: anime.type
                  }
                });
                instance.$mount();
                animeDiv.appendChild(instance.$el);
              }
            }
          }
        };
        this.request.send();
      }
    },
    searchManga() {
      const mangaDiv = this.$refs.mangalocation;
      while (mangaDiv.firstChild) {
        mangaDiv.removeChild(mangaDiv.firstChild);
      }
      if (this.manga.length > 3) {
        this.request.open(
          "GET",
          "https://api.jikan.moe/v3/search/manga?q=" + this.manga + "&limit=5"
        );
        this.request.onreadystatechange = function() {
          if (this.readyState === 4) {
            if (this.status === 200) {
              const mangaArray = JSON.parse(this.response).results;
              for (let i = 0; i < Object.keys(mangaArray).length; i++) {
                const manga = mangaArray[i];
                const instance = new ComponentClass({
                  propsData: {
                    animeOrManga: "manga",
                    title: manga.title,
                    description: manga.synopsis,
                    image: manga.image_url,
                    url: manga.url,
                    episodes: manga.chapters,
                    airing: manga.publishing,
                    score: manga.score,
                    type: manga.type,
                    volumes: manga.volumes
                  }
                });
                instance.$mount();
                mangaDiv.appendChild(instance.$el);
              }
            }
          }
        };
        this.request.send();
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
