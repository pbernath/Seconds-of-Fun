<script setup>
import styledButton from "../components/styledButton.vue";
</script>

<template>
  <div @click="goToHomeACB">
    <img v-if="goToHomeACB" src="../assets/sof-logo-500.png" id="homeLogo" width="100" height="100" />
  </div>
  <div>
    <styledButton buttonText="JokesPage" @click="goToJokesPageACB" />
  </div>
  <div>
    <styledButton buttonText="Comics" @click="goToComicACB" />
  </div>
  <div label="LoginButton">
    <styledButton buttonText="Login" @click="goToLoginACB" />
  </div>
    <div label="FavoriteComic">
    <styledButton buttonText="Favorite comics" @click="goToFavoriteComicACB" />
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  emits: [
    "homePageRoutingACB",
    "jokesPageRoutingACB",
    "comicPageRoutingACB",
    "loginPageRoutingACB",
    "favoriteComicPageRoutingACB"
  ],
  methods: {
    goToHomeACB() {
      this.$emit("homePageRoutingACB");
    },
    goToJokesPageACB() {
      this.$emit("jokesPageRoutingACB");
    },
    goToComicACB() {
      this.$emit("comicPageRoutingACB");
    },
    goToLoginACB() {
      this.$emit("loginPageRoutingACB");
    },
      goToFavoriteComicACB() {
      this.$emit("favoriteComicPageRoutingACB");
    },
  },
};
</script>
