<!--
  * JokesView contains settings for how the jokes page looks, such as color, dimensions and button settings.
-->

<script setup>
import styledButton from "../components/styledButton.vue";
import LoadingGIF from "../components/icons/LoadingGIF.vue";
</script>

<template>
  <div class="jokes_page">
    <p v-if="joke != msg" class="jokes_page_msg">{{ joke }}</p>
    <LoadingGIF class="jokes_page_msg" v-else/>
    <styledButton class="button"
      buttonText="Next joke!"
      @click="getJokeACB"
    />
    <styledButton class="button" v-if="loggedIn"
      buttonText="Save!"
      @click="addToFavoriteJokesACB"
    />
    <p v-else>Log in to save the joke!</p>
    <p v-if="isASavedJoke" > Joke was saved!</p>
  </div>
</template>


<script>
export default {
  props: ["jokeData", "loading", "loggedIn", "isASavedJoke"],
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



