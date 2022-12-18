<script setup>
import FavoriteJokes from "../views/FavoriteJokes.vue";
import {jokeSort} from "../utils.jsx"
</script>

<template>
  <FavoriteJokes :jokes="favorites" @removeJokeACB="jokeRemovalACB" :userIsLoggedIn="user != null"/>
</template>

<script>
export default {
  //Vue component
  props: ["model"],
  computed: {
    favorites(){
        return jokeSort(this.model.favoriteJokes);
    },
    user(){
      return this.model.userMail;
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