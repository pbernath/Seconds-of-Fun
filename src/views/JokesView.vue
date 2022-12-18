<script setup>
import styledButton from "../components/styledButton.vue";
import LoadingGIF from "../components/icons/LoadingGIF.vue";
</script>

<template>
  <div class="jokes_page">
    <p v-if="joke != msg" class="jokes_page_msg">{{ joke }}</p>
    <LoadingGIF class="jokes_page_msg" v-else/>
    <styledButton
      buttonText="Next joke!"
      @click="getJokeACB"
    />
    <styledButton v-if="loggedIn"
      buttonText="Save!"
      @click="addToFavoriteJokesACB"
    />
    <p v-else>Log in to save the joke!</p>
  </div>
</template>

<script>
export default {
  props: ["jokeData", "loading", "loggedIn"],
  emits: ["getNewJokeACB", "setJokeOnLoadACB" ,"sendJokeToFavoriteACB"],
  data(){return {msg: "Waiting for a joke..."}},
  computed: {
    joke() {
      this.$emit("setJokeOnLoadACB");
      return this.jokeData.data.joke;
    },
  },
  methods: {
    getJokeACB() {
      this.$emit("getNewJokeACB");
    },
    addToFavoriteJokesACB() {
      this.$emit("sendJokeToFavoriteACB");
    },
  },
};
</script>

<style>
.jokes_page {
  width: 430px;
  height: 290;
}

.jokes_page_msg {
  
  border-style: solid;
  border-radius: 12px;
  color: white;
  height: 250px;
  width: 500px;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
