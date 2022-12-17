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
  display:flex;
}

.jokes_page_msg {
  color:white;
  border-style: solid;
  border-radius: 0px;
  border-color: #00bd7e;
  border-width: 0px;
  /* height: 250px;
  width: 500px; */
  margin:auto;
  padding: 10em;
}

@media (min-width: 768px) {
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
