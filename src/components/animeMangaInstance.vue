<template>
  <div class="fa-border indigo darken-2" @click="goToPage">
<!--      TODO set image left of text-->
    <v-img v-bind:src="image" class="image"></v-img>
    <h1>{{ title }}</h1>
      <span>{{description}}</span>
  </div>
</template>

<script>
export default {
  name: "animeMangaInstance",
  props: {
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
      }
  },
  methods:{
      goToPage(){
          window.open(this.url)
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
  width: 40%;
}
</style>
