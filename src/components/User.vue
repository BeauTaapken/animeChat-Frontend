<template>
  <div class="fa-border indigo darken-2 wrapper" @click="goToPage">
    <div class="image">
      <h1>{{ username }}</h1>
      <v-img v-bind:src="image"></v-img>
    </div>
    <div class="content">
      <div v-html="about" class="fa-border"></div>
      <div class="fa-border">
        <h2>Days watched: {{ daysWatched }}</h2>
        <h2>Anime mean Score: {{ meanScoreAnime }}</h2>
        <h2>Watching anime: {{ watching }}</h2>
        <h2>Completed anime: {{ animeCompleted }}</h2>
        <h2>On hold anime: {{ animeOnHold }}</h2>
        <h2>Dropped anime: {{ animeDropped }}</h2>
        <h2>Plan to watch anime: {{ planToWatch }}</h2>
        <h2>Watched anime episodes: {{ episodesWatched }}</h2>
      </div>
      <div class="fa-border">
        <h2>Days read: {{ daysRead }}</h2>
        <h2>Manga mean Score: {{ meanScoreManga }}</h2>
        <h2>Reading manga: {{ reading }}</h2>
        <h2>Completed manga: {{ mangaCompleted }}</h2>
        <h2>On hold manga: {{ mangaOnHold }}</h2>
        <h2>Dropped manga: {{ mangaDropped }}</h2>
        <h2>Plan to read manga: {{ planToRead }}</h2>
        <h2>Read manga chapters: {{ chaptersRead }}</h2>
        <h2>Read manga volumes: {{ volumesRead }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  props: {
    username: {
      type: String,
      required: true,
      default: "something went wrong"
    },
    about: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    daysWatched: {
      type: Number,
      required: true
    },
    meanScoreAnime: {
      type: Number,
      required: true
    },
    watching: {
      type: Number,
      required: true
    },
    animeCompleted: {
      type: Number,
      required: true
    },
    animeOnHold: {
      type: Number,
      required: true
    },
    animeDropped: {
      type: Number,
      required: true
    },
    planToWatch: {
      type: Number,
      required: true
    },
    episodesWatched: {
      type: Number,
      required: true
    },
    daysRead: {
      type: Number,
      required: true
    },
    meanScoreManga: {
      type: Number,
      required: true
    },
    reading: {
      type: Number,
      required: true
    },
    mangaCompleted: {
      type: Number,
      required: true
    },
    mangaOnHold: {
      type: Number,
      required: true
    },
    mangaDropped: {
      type: Number,
      required: true
    },
    planToRead: {
      type: Number,
      required: true
    },
    chaptersRead: {
      type: Number,
      required: true
    },
    volumesRead: {
      type: Number,
      required: true
    },
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
</style>
