<script setup>
import ComicView from "../views/ComicView.vue";
</script>

<template>
  <ComicView />
</template>

<script>
export default {
  //Vue component
  props: ['model'],
  components: {
    ComicView,
  },
  created() {
    
  },
};
</script>
