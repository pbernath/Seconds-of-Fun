<!--
  * ActivityChooserView does things related to the menu, home logo and buttons.
  * It routes buttons and their clicks to other pages.
-->

<script setup>
import styledButton from "../components/styledButton.vue";
</script>

<template>
  <div class="flex-container">
    <div class="flex-item">
      <img src="../assets/logo-500.png" id="homeLogo" @click="goToHomeACB" class="pointer"/>
    </div>
    <div class="flex-item">
      <img src="../assets/joke-500.png" id=jokesLogo @click="goToJokesPageACB" class="pointer"/>
    </div>
    <div class="flex-item">
      <img src="../assets/comic-500.png" id=comicsLogo @click="goToComicACB" class="pointer"/>
    </div>
    <div class="flex-item">
      <img src="../assets/user-500.png" id=loginLogo @click="goToLoginACB" class="pointer"/>
    </div>
    <!-- <div class="flex-item">
      <styledButton buttonText="Favorite jokes" @click="goToFavoriteJokesACB"/>
    </div>
    <div class="flex-item" label="FavoriteComic">
      <styledButton buttonText="Favorite comics" @click="goToFavoriteComicACB"/>
    </div> -->
  </div>
</template>

<script>
export default {
  emits: [
    "homePageRoutingACB",
    "jokesPageRoutingACB",
    "comicPageRoutingACB",
    "loginPageRoutingACB",
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
  },
};
</script>

<style scoped>

@media (min-width: 768px) {
.flex-container {
  display: flex;
  flex-direction:column;
}
}

@media (max-width: 768px) {
.flex-container {
  display: flex;
  flex-direction:row;
}

#flex-container > .flex-item {
  flex: auto;
}
}

.pointer {
  cursor: pointer;
}


</style>
