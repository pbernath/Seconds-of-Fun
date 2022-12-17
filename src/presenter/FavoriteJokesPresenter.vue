<script setup>
import { getJokeByID } from "../jokeSource";
import FavoriteJokes from "../views/FavoriteJokes.vue";
import { resolvePromise } from "../resolvePromise";
</script>

<template>
  <FavoriteJokes :jokes="favorites"/>
</template>

<script>
export default {
  //Vue component
  props: ["model"],
  computed: {
    favorites(){
        console.log(this.model.favoriteJokes)
        return this.model.favoriteJokes;
    }
  },
  components: {
    FavoriteJokes,
  },
  methods: {},
};
</script>
