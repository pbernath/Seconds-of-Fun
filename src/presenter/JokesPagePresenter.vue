<!-- 
  * JokesPagePresenter.vue contains functions and actions related to the jokes page.
  * It works together with jokeSource and JokesView, and is responsible for
  * launching requests to the API when a joke should be fetched.
-->

<script setup>
import JokesPage from "../views/JokesView.vue";
import { resolvePromise } from "../resolvePromise.js";
import { getJoke } from "../jokeSource.js";
</script>
<template>
  <JokesPage
    :loggedIn="model.userMail != null"
    :jokeData="jokeData"
    :jokePreferences="jokePreferences"
    @getNewJokeACB="setCurrentJokeACB"
    @setJokeOnLoadACB="setJoke"
    @sendJokeToFavoriteACB="addCurrentJokeToFavoritesACB"
    @emitPreferencesACB="setJokePreferencesACB"

  />
</template>
<script>
export default {
  //Vue component
  props: ["model"],
  computed: {
    jokeData() {
      if (this.model.jokePromiseState.data == null) {
        this.model.jokePromiseState.data = {
          joke: "Waiting for a joke...",
          id: "",
        };
      }
      return this.model.jokePromiseState;
    },
    jokePreferences () {
      return this.model.preferenceNumber;
    }
  },
  created() {
    if (this.model.jokePromiseState.promise == undefined)
      resolvePromise(getJoke(this.model.preferenceNumber), this.model.jokePromiseState);
  },
  methods: {
    setCurrentJokeACB() {
      console.log(this.model.preferenceNumber);
      resolvePromise(getJoke(this.model.preferenceNumber), this.model.jokePromiseState);
    },
    addCurrentJokeToFavoritesACB() {
      this.model.addJokeToFavorites(this.model.jokePromiseState.data);
    },
    setJoke() {
      if (this.model.jokePromiseState.data) {
        this.model.currentJoke = this.model.jokePromiseState.data.id;
      }
    },
    setJokePreferencesACB(preferenceNumber){
      this.model.updatePreferences(preferenceNumber);
    },
  },
  components: {
    JokesPage,
  },
};
</script>
