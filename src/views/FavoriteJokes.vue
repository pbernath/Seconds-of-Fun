<script setup>
import {jokeSort} from "../utils.jsx"
</script>

<template>
  <div v-if="userIsLoggedIn">
    <li :key="joke.id" class="jokeList" v-for="joke in jokesArray">
      <button @click="removeACB(joke.id)">X</button>
      <div class="toBeHidden">hidden</div>
          {{ joke.joke }}
      <div class="toBeHidden">hidden</div>

    </li>
  </div>
  <div v-else>You need to log in to save jokes!</div>
</template>

<script>
export default {
  props: ["jokes", "userIsLoggedIn"],
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