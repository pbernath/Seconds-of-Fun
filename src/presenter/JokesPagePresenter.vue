<script setup>
import JokesPage from "../views/JokesPage.vue";
import { resolvePromise } from "../resolvePromise";
import { getJoke } from "../jokeSource";
import { render } from "vue";
</script>
<template>
  <JokesPage
    v-if="jokeData"
    :jokeData="jokeData"
    :loading="false"
    @getNewJokeACB="setCurrentJokeACB"
  />

  <JokesPage
    v-else
    :jokeData="loadingDataGif"
    :loading="true"
    @getNewJokeACB="setCurrentJokeACB"
  />
</template>
<script>
export default {
  //Vue component
  props: ["model"],
  data() {
    return { loadingDataGif: {joke:""} };
  },
  computed:{
    jokeData(){return this.model.jokePromiseState}
  }
  ,
  created() {
    if (this.model.jokePromiseState.promise == undefined)
      resolvePromise(getJoke(), this.jokeData);
    if (this.model.jokePromiseState.data == null) {
      this.model.jokePromiseState.data = { joke: "no joke" };
    }
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
