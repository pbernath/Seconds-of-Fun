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
  >
  </ActivityChooserView>
</template>

<script>
export default {
  //Vue component
  components: {
    ActivityChooserView,
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
  },
};
</script>
