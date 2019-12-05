<template>
  <div class="fa-border indigo darken-2 wrapper align-center" @click="goToPage">
    <div class="image">
      <v-img v-bind:src="image" class="imageHeight"></v-img>
    </div>
    <div>
      <span>{{ name }}</span>
    </div>
    <div>
      <v-btn @click="addFriend(friendMail), refreshList">Add as friend</v-btn>
    </div>
  </div>
</template>

<script>
// import {eventBus} from "../main.js";
export default {
  name: "NonFriendList",
  props: {
    image: {
      type: String,
      required: true
    },
    friendMail: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      email: null,
      request: null
    };
  },
  mounted() {
    this.request = new XMLHttpRequest();
    try {
      this.email = JSON.parse(sessionStorage.getItem("userInfo")).profile.email;
    } catch (e) {
      this.email = null;
    }
  },
  watch: {
    $route() {
      try {
        this.email = JSON.parse(
          sessionStorage.getItem("userInfo")
        ).profile.email;
      } catch (e) {
        this.email = null;
      }
    }
  },
  methods: {
    addFriend(friendEmail) {
      const friend = {
        user: this.email,
        friend: friendEmail
      };

      console.log(friend);

      this.request.open("POST", "http://localhost:8082/friend/addfriend");
      this.request.setRequestHeader("Content-Type", "text/plain");
      this.request.send(JSON.stringify(friend));
    }

    // refreshList() {
    //     eventBus.$emit('reloadFriendList');
    // }
  }
};
</script>

<style scoped>
.imageHeight {
  float: left;
}
.image {
  width: 60px;
}
.wrapper {
  display: grid;
  grid-gap: 10px;
  grid-auto-flow: column;
  /*grid-auto-columns: auto;*/
}
</style>
