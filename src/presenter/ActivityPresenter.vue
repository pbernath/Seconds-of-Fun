<!--
  * ActivityPresenter.vue contains functions and actions related to the menu, home logo and buttons.
  * It routes buttons and their clicks to other pages.
-->

<script setup>
import ActivityChooserView from "../views/ActivityChooserView.vue";
</script>

<template>
  <ActivityChooserView
    @jokesPageRoutingACB="routeToJokesACB"
    @homePageRoutingACB="routeToHomeACB"
    @comicPageRoutingACB="routeToComicACB"
    @loginPageRoutingACB="routeToLoginACB"
    @favoriteJokesPageRoutingACB="routeToFavoriteJokesACB"
    @favoriteComicPageRoutingACB="routeToFavoriteComicACB"
  >
  </ActivityChooserView>
</template>

<script>
export default {
  //Vue component.
  props: ['model'],
  components: {
    ActivityChooserView,
  },
  created() {
    
  },
  methods: {
    routeToHomeACB() {
      this.$router.push({ name: "home" });
    },
    routeToJokesACB() {
      this.$router.push({ name: "jokes" });
    },
    routeToComicACB() {
      this.$router.push({ name: "comic" });
    },
    routeToLoginACB() {
      this.$router.push({ name: "login" });
    },
    routeToFavoriteJokesACB() {
      this.$router.push({ name: "favorite_jokes" });
    },
    routeToFavoriteComicACB(){
      this.$router.push({name: "favorite_comic"});
    },
  },
};
</script>
