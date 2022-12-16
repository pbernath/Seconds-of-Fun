<script setup>
import styledButton from "../components/styledButton.vue";
import LoadingGIF from "../components/icons/LoadingGIF.vue";
</script>

<template>
  <div class="jokes_page">
    <p v-if="joke != msg" class="jokes_page_msg">{{ joke }}</p>
    <LoadingGIF class="jokes_page_msg" v-else/>
    <styledButton
      buttonText="Next joke!"
      @click="getJokeACB"
    />
  </div>
</template>

<style>
.jokes_page {
  width: 430px;
  height: 290;
}

.jokes_page_msg {
  
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
  data(){return {msg: "Waiting for a joke..."}},
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
