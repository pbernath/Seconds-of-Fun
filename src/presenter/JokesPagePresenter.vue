<!-- 
  * JokesPagePresenter.vue contains functions and actions related to the jokes page.
  * It works together with jokeSource and JokesView, and is responsible for
  * launching requests to the API when a joke should be fetched.
-->

<script setup>
import JokesPage from "../views/JokesView.vue";
import { resolvePromise } from "../resolvePromise";
import { getJoke } from "../jokeSource";
</script>
<template>
  <JokesPage
    v-if="jokeData != undefined"
    :jokeData="jokeData"
    @getNewJokeACB="setCurrentJokeACB"
  />
</template>
<script>
export default {
  //Vue component.
  props: ['model'],
  computed: {
    jokeData() {
      if (this.model.jokePromiseState.data == null) {
        this.model.jokePromiseState.data = { joke: "Waiting for a joke..." };
      }
      return this.model.jokePromiseState;
    },
  },
  created() {
    if (this.model.jokePromiseState.promise == undefined)
      resolvePromise(getJoke(), this.model.jokePromiseState);
  },
  methods: {
    setCurrentJokeACB() {
      this.model.setCurrentJoke();
    },
  },
  components: {
    JokesPage,
  },
};
</script>
