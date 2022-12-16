<script setup>
import styledButton from "../components/styledButton.vue";
</script>

<template>
  <div>
    <styledButton buttonText="Home" @click="goToHomeACB" />
  </div>
  <div>
    <styledButton buttonText="JokesPage" @click="goToJokesPageACB" />
  </div>
  <div>
    <styledButton buttonText="Comics" @click="goToComicACB" />
  </div>
  <div>
    <styledButton buttonText="Login" @click="goToLoginACB" />
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
