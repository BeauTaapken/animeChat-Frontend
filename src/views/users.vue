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
        <div class="fa-border static-height-user" id="user" ref="user"></div>
      </div>
      <div>
        <div class="fa-border static-height" id="userAnime" ref="anime"></div>
        <div class="fa-border static-height" id="userManga" ref="manga"></div>
      </div>
    </div>
  </div>
</template>

<script>
import AnimeMangaInstance from "../components/animeMangaInstance";
import Vue from "vue";
import User from "../components/User";
const ComponentClass = Vue.extend(AnimeMangaInstance);
const userClass = Vue.extend(User);

export default {
  name: "users",
  data() {
    return {
      user: null,
      userRequest: null,
      animeRequest: null,
      mangaRequest: null,
      url: null
    };
  },
  mounted() {
    this.userRequest = new XMLHttpRequest();
    this.animeRequest = new XMLHttpRequest();
    this.mangaRequest = new XMLHttpRequest();
    this.url = "https://api.jikan.moe/v3/user/";
  },
  methods: {
    searchUser() {
      if (this.user !== null) {
        const userDiv = this.$refs.user;
        const animeDiv = this.$refs.anime;
        const mangaDiv = this.$refs.manga;

        while (userDiv.firstChild) {
          userDiv.removeChild(userDiv.firstChild);
        }
        while (animeDiv.firstChild) {
          animeDiv.removeChild(animeDiv.firstChild);
        }
        while (mangaDiv.firstChild) {
          mangaDiv.removeChild(mangaDiv.firstChild);
        }

        console.log(userDiv);
        this.userRequest.open("GET", this.url + this.user + "/profile", false);
        this.userRequest.onreadystatechange = function() {
          if (this.readyState === 4) {
            const user = JSON.parse(this.response);
            console.log(user.manga_stats);
            const instance = new userClass({
              propsData: {
                username: user.username,
                about: user.about,
                url: user.url,
                image: user.image_url,
                daysWatched: user.anime_stats.days_watched,
                meanScoreAnime: user.anime_stats.mean_score,
                watching: user.anime_stats.watching,
                animeCompleted: user.anime_stats.completed,
                animeOnHold: user.anime_stats.on_hold,
                animeDropped: user.anime_stats.dropped,
                planToWatch: user.anime_stats.plan_to_watch,
                episodesWatched: user.anime_stats.episodes_watched,
                daysRead: user.manga_stats.days_read,
                meanScoreManga: user.manga_stats.mean_score,
                reading: user.manga_stats.reading,
                mangaCompleted: user.manga_stats.completed,
                mangaOnHold: user.manga_stats.on_hold,
                mangaDropped: user.manga_stats.dropped,
                planToRead: user.manga_stats.plan_to_read,
                chaptersRead: user.manga_stats.chapters_read,
                volumesRead: user.manga_stats.volumes_read
              }
            });
            instance.$mount();
            userDiv.appendChild(instance.$el);
          }
        };
        this.userRequest.send();

        this.animeRequest.open(
          "GET",
          this.url + this.user + "/animelist/watching",
          true
        );
        this.animeRequest.onreadystatechange = function() {
          if (this.readyState === 4) {
            if (this.status === 200) {
              const animeArray = JSON.parse(this.response).anime;
              for (let i = 0; i < Object.keys(animeArray).length; i++) {
                const anime = animeArray[i];
                const instance = new ComponentClass({
                  propsData: {
                    animeOrManga: "anime",
                    title: anime.title,
                    image: anime.image_url,
                    url: anime.url,
                    episodes: anime.total_episodes,
                    rating: anime.rating,
                    type: anime.type
                  }
                });
                instance.$mount();
                animeDiv.appendChild(instance.$el);
              }
            }
          }
        };
        this.animeRequest.send();

        this.mangaRequest.open(
          "GET",
          this.url + this.user + "/mangalist/reading",
          true
        );
        this.mangaRequest.onreadystatechange = function() {
          if (this.readyState === 4) {
            if (this.status === 200) {
              const mangaArray = JSON.parse(this.response).manga;
              for (let i = 0; i < Object.keys(mangaArray).length; i++) {
                const manga = mangaArray[i];
                const instance = new ComponentClass({
                  propsData: {
                    animeOrManga: "manga",
                    title: manga.title,
                    image: manga.image_url,
                    url: manga.url,
                    episodes: manga.total_chapters,
                    type: manga.type,
                    volumes: manga.total_volumes
                  }
                });
                instance.$mount();
                mangaDiv.appendChild(instance.$el);
              }
            }
          }
        };
        this.mangaRequest.send();
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

.static-height-user {
  height: 600px;
  overflow-y: auto;
}

.static-height {
  height: 310px;
  margin-bottom: 50px;
  overflow-y: auto;
}
</style>
