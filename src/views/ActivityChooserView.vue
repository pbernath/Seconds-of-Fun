<!--
  * ActivityChooserView does things related to the menu, home logo and buttons.
  * It routes buttons and their clicks to other pages.
-->

<script setup>
import styledButton from "../components/styledButton.vue";
</script>

<template>
  <div class="flex-container">
  <div @click="goToHomeACB">
    <li class="pointer">
      <div style="flex: 1 1 100"><img v-if="goToHomeACB" src="../assets/sof-logo-500.png" id="homeLogo" width="100" height="100"></div>
  </li>
	</div>
  </div>
  <div style="flex: 1 1 100"><styledButton buttonText="Jokes" @click="goToJokesPageACB"></styledButton></div>
  <div style="flex: 1 1 100"><styledButton buttonText="Comics" @click="goToComicACB"></styledButton></div>
  <div style="flex: 1 1 100"><styledButton buttonText="Login" @click="goToLoginACB"></styledButton></div>

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

<style>
.flex-container {
  display: flex;
}

.flex-container > div {
  text-align: center;
  width: 100px;
  margin: 0px;
}

li.pointer {
  cursor: pointer;
}
</style>
