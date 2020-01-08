<template>
  <div class="fa-border indigo darken-2 wrapper align-center" v-if="!added">
    <div class="image">
      <v-img v-bind:src="image" class="imageHeight"></v-img>
    </div>
    <div>
      <span>{{ name }}</span>
    </div>
    <div>
      <v-btn @click="addFriend(friendMail), hideObject()">Add as friend</v-btn>
    </div>
  </div>
</template>

<script>
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
      request: null,
      added: false
    };
  },
  mounted() {
    this.request = new XMLHttpRequest();
    try {
      this.email = JSON.parse(atob(sessionStorage.getItem("userInfo"))).profile.email;
    } catch (e) {
      this.email = null;
    }
  },
  watch: {
    $route() {
      try {
        this.email = JSON.parse(atob(sessionStorage.getItem("userInfo"))).profile.email;
      } catch (e) {
        this.email = null;
        this.idtoken = null;
        this.token = null;
      }
    }
  },
  methods: {
    addFriend(friendEmail) {
      const friend = {
        user: this.email,
        friend: friendEmail
      };
      this.request.open("POST", "https://localhost:8082/friend/addfriend");
      this.request.setRequestHeader("Accept", "application/json");
      this.request.setRequestHeader("Content-type", "application/json");
      this.request.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status === 200) {
            console.log("Delete this object");
          }
        }
      };
      this.request.send(JSON.stringify(friend));
    },
    hideObject() {
      this.added = true;
    }
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
