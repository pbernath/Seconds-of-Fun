<script setup>
import ActivityChooser from "../views/ActivityChooserView.vue";
</script>

<template>
  <ActivityChooser
    @jokesPageRoutingACB="routeToJokesACB"
    @homePageRoutingACB="routeToHomeACB"
    @comicPageRoutingACB="routeToComicACB"
    @loginPageRoutingACB="routeToLoginACB"
    @favoriteComicPageRoutingACB="routeToFavoriteComicACB"
  >
  </ActivityChooser>
</template>

<script>
export default {
  //Vue component
  props: ["model"],
  components: {
    ActivityChooser,
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
    routeToFavoriteComicACB(){
      this.$router.push({name: "favorite_comic"});
    }
  },
};
</script>
