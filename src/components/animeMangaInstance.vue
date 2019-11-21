<template>
  <div class="fa-border indigo darken-2 wrapper" @click="goToPage">
    <!--      TODO set image left of text-->
    <div class="image">
      <v-img v-bind:src="image"></v-img>
    </div>
    <div class="content">
      <h1>{{ title }}</h1>
      <span>{{ description }}</span>
      <h2>Type: {{ type }}</h2>
      <h2 v-if="animeOrManga === 'anime'">Episodes: {{ episodes }}</h2>
      <h2 v-if="animeOrManga === 'manga'">Chapters: {{ episodes }}</h2>
        <h2 v-if="animeOrManga === 'manga'">Volumes: {{ volumes }}</h2>
      <h2>score: {{ score }}</h2>
      <h2 v-if="animeOrManga === 'anime'">Rating: {{ rating }}</h2>
      <h2 v-if="animeOrManga === 'anime'">
        Airing:
        <i v-if="airing" class="fas fa-check greenColor"></i>
        <i v-else class="fas fa-times redColor"></i>
      </h2>
      <h2 v-else>
        Publishing:
        <i v-if="airing" class="fas fa-check greenColor"></i>
        <i v-else class="fas fa-times redColor"></i>
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
      required: true,
      default: "something went wrong"
    },
    image: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    episodes: {
      type: Number,
      required: true
    },
    rating: {
      type: String
    },
    airing: {
      type: Boolean,
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    },
      volumes: {
        type: Number
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
