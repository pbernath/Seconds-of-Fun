<script setup>
import styledButton from "../components/styledButton.vue";
import LoadingGIF from "../components/icons/LoadingGIF.vue";
</script>

<template>
  <div class="another_page">
    <p class="another_page_msg">{{ joke }}</p>
    <styledButton
      buttonText="Next joke!"
      @click="getJokeACB"
    />
  </div>
</template>

<style>
.another_page {
  width: 430px;
  height: 290;
}

.another_page_msg {
  
  border-style: solid;
  border-radius: 12px;
  color: white;
  height: 250px;
  width: 500px;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script>
export default {
  props: ["jokeData", "loading"],
  emits: ["getNewJokeACB"],
  computed: {
    joke() {
      return this.jokeData.data.joke;
    },
  },
  methods: {
    getJokeACB() {
      this.$emit("getNewJokeACB");
    },
  },
};
</script>
