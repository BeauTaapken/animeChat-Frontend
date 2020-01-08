<template>
  <div class="fa-border indigo darken-2 wrapper" @click="goToPage">
    <div class="image">
      <v-img v-bind:src="image"></v-img>
    </div>
    <div class="content">
      <h1>{{ title }}</h1>
      <span v-if="description !== null">{{ description }}</span>
      <h2>Type: {{ type }}</h2>
      <h2 v-if="animeOrManga === 'anime'">Episodes: {{ episodes }}</h2>
      <h2 v-if="animeOrManga === 'manga'">Chapters: {{ episodes }}</h2>
        <h2 v-if="animeOrManga === 'manga'">Volumes: {{ volumes }}</h2>
      <h2 v-if="score !== null">score: {{ score }}</h2>
      <h2 v-if="animeOrManga === 'anime' && rating !== null">Rating: {{ rating }}</h2>
      <h2 v-if="animeOrManga === 'anime' && airing !== null">
        Airing:
        <span v-if="airing" class="fas fa-check greenColor"></span>
        <span v-else class="fas fa-times redColor"></span>
      </h2>
      <h2 v-if="animeOrManga === 'manga' && airing !== null">
        Publishing:
        <span v-if="airing" class="fas fa-check greenColor"></span>
        <span v-else class="fas fa-times redColor"></span>
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "animeMangaInstance",
  props: {
    animeOrManga: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true,
      default: "something went wrong"
    },
    description: {
      type: String,
      default: null
    },
    image: {
      type: String,
      required: true,
      default: null
    },
    url: {
      type: String,
      required: true,
      default: null
    },
    episodes: {
      type: Number,
      required: true,
      default: null
    },
    rating: {
      type: String,
      default: null
    },
    airing: {
      type: Boolean,
      default: null
    },
    score: {
      type: Number,
      default: null
    },
    type: {
      type: String,
      required: true,
      default: null
    },
      volumes: {
        type: Number,
        default: null
      }
  },
  methods: {
    goToPage() {
      window.open(this.url);
    }
  }
};
</script>

<style scoped>
div {
  margin-bottom: 10px;
  cursor: pointer;
}
.image {
  float: left;
  width: 255px;
}
.wrapper {
  display: grid;
  grid-gap: 5px;
  grid-auto-flow: column;
  grid-auto-columns: auto;
}
.greenColor {
  color: limegreen;
}

.redColor {
  color: red;
}
</style>
