<template>
  <div>
    <h1>Search friends</h1>
    <div
      class="fa-border static-height"
      id="nonFriends"
      ref="nonFriendLocation"
    ></div>
  </div>
</template>

<script>
import AnimeMangaInstance from "../components/NonFriendList";
import Vue from "vue";
// import {eventBus} from "../main";
const ComponentClass = Vue.extend(AnimeMangaInstance);

export default {
  name: "SearchFriends",
  data() {
    return {
      email: null,
      request: null
    };
  },
  mounted() {
    this.request = new XMLHttpRequest();
    try {
      this.email = JSON.parse(atob(sessionStorage.getItem("userInfo"))).profile.email;
    } catch (e) {
      this.email = null;
    }
    this.findNonFriends();
  },
  watch: {
    $route() {
      try {
        this.email = JSON.parse(atob(sessionStorage.getItem("userInfo"))).profile.email;
      } catch (e) {
        this.email = null;
      }
    }
  },
  methods: {
    findNonFriends() {
      const nonFriendDiv = this.$refs.nonFriendLocation;
      this.request.open(
        "GET",
        "https://192.168.1.242:8082/friend/findnonfriends/" + this.email
      );
      this.request.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status === 200) {
            const nonFriendArray = JSON.parse(this.response);
            for (let i = 0; i < Object.keys(nonFriendArray).length; i++) {
              const friend = nonFriendArray[i];
              const instance = new ComponentClass({
                propsData: {
                    image: friend.imgUrl,
                    friendMail: friend.email,
                    name: friend.name
                }
              });
              instance.$mount();
              nonFriendDiv.appendChild(instance.$el);
            }
          }
        }
      };
      this.request.send();
    }
  }
};
</script>

<style scoped></style>
