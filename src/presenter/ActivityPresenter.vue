<script setup>
import ActivityChooser from "../views/ActivityChooser.vue";
import { render } from "vue";
</script>

<template>
  <ActivityChooser
    @JokesPageRoutingACB="routeToJokesACB"
    @homePageRoutingACB="routeToHomeACB"/>
</template>

<script>
export default {
  //Vue component
  props: ["model"],
  components: {
    ActivityChooser,
  },
  methods: {
    routeToJokesACB() {
      this.$router.push({ name: "another_page" });
    },
    routeToHomeACB() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>
