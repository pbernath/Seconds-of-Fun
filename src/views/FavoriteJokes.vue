<script setup>
import {jokeSort} from "../utils.jsx"
</script>

<template>
  <div v-if="loggedIn">
    <li :key="joke.id" class="jokeList" v-for="joke in jokesArray">
      <button @click="removeACB(joke.id)">X</button>
      <div class="toBeHidden">hidden</div>
          {{ joke.joke }}
      <div class="toBeHidden">hidden</div>

    </li>
  </div>
  <h1 v-else>You have to be logged in to see your favorite jokes </h1>
</template>

<script>
export default {
  props: ["jokes", "loggedIn"],
  emits: ["removeJokeACB"],
  computed:{
    jokesArray(){
      return jokeSort(this.jokes);
    }
  },
  methods: {
    removeACB(id) {
      this.$emit("removeJokeACB", id)
    },
  },
};
</script>

<style>
.jokeList {
  border-style: dotted;
  border-width: 1px;
  list-style-type: none;
}
.toBeHidden {
  visibility: hidden;
}
</style>