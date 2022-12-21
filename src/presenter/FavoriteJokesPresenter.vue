<script setup>
import FavoriteJokes from "../views/FavoriteJokes.vue";
import {jokeSort} from "../utils.jsx"
</script>

<template>
  <FavoriteJokes 
  :loggedIn="model.userMail != null"
  :jokes="favorites" 
  @removeJokeACB="jokeRemovalACB"/>
</template>

<script>
export default {
  //Vue component
  props: ["model"],
  computed: {
    favorites(){
        return jokeSort(this.model.favoriteJokes);
    }
  },
  components: {
    FavoriteJokes,
  },
  methods: {
    jokeRemovalACB(id){
      this.model.removeFromFavorites({id:id})
    }
  },
};
</script>