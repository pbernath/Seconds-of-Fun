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
  //Vue component
  props: ["model"],
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
