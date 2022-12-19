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
    @addCategoryACB="addCategoryInModelACB"
    @removeCategoryACB="removeCategoryInModelACB"
    @addBlacklistACB="addBlacklistInModelACB"
    @removeBlacklistACB="removeBlacklistInModelACB"
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
      return {category: this.model.jokeCategories, blacklist: this.model.jokeBlacklist};
    }
  },
  created() {
    if (this.model.jokePromiseState.promise == undefined)
      resolvePromise(getJoke({category: this.model.jokeCategories, blacklist: this.model.jokeBlacklist}), this.model.jokePromiseState);
  },
  methods: {
    setCurrentJokeACB() {
      resolvePromise(getJoke({category: this.model.jokeCategories, blacklist: this.model.jokeBlacklist}), this.model.jokePromiseState);
    },
    addCurrentJokeToFavoritesACB() {
      this.model.addJokeToFavorites(this.model.jokePromiseState.data);
    },
    setJoke() {
      if (this.model.jokePromiseState.data) {
        this.model.currentJoke = this.model.jokePromiseState.data.id;
      }
    },
    addCategoryInModelACB(category) {
      this.model.addJokeCategory(category);
    },
    removeCategoryInModelACB(category) {
      this.model.removeJokeCategory(category);
    },
    addBlacklistInModelACB(blacklist) {
      this.model.addJokeBlacklist(blacklist);
    },
    removeBlacklistInModelACB(blacklist) {
      this.model.removeJokeBlacklist(blacklist);
    },
  },
  components: {
    JokesPage,
  },
};
</script>
