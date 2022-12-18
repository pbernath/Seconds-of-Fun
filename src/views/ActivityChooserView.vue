<!--
  * ActivityChooserView does things related to the menu, home logo and buttons.
  * It routes buttons and their clicks to other pages.
-->

<script setup>
import styledButton from "../components/styledButton.vue";
</script>

<template>
  <div @click="goToHomeACB">
		<img v-if="goToHomeACB" src="../assets/sof-logo-500.png" id="homeLogo" width="100" height="100" />
	</div>
  <div>
    <styledButton buttonText="Jokes" @click="goToJokesPageACB" />
  </div>
  <div>
    <styledButton buttonText="Comics" @click="goToComicACB" />
  </div>
  <div>
    <styledButton buttonText="Login" @click="goToLoginACB" />
  </div>
  <div>
    <styledButton buttonText="Favorite jokes" @click="goToFavoriteJokesACB" />
  </div>
</template>

<script>
export default {
  emits: [
    "homePageRoutingACB",
    "jokesPageRoutingACB",
    "comicPageRoutingACB",
    "loginPageRoutingACB",
    "favoriteJokesPageRoutingACB",
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
    goToFavoriteJokesACB() {
      this.$emit("favoriteJokesPageRoutingACB");
    },
  },
};
</script>
