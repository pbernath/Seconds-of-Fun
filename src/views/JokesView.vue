<!--
  * JokesView contains settings for how the jokes page looks, such as color, dimensions and button settings.
-->

<script setup>
import StyledButton from "../components/StyledButton.vue";
import LoadingGIF from "../components/icons/LoadingGIF.vue";
</script>

<template>
  <div class="jokes_page">
    <p v-if="joke != msg" class="jokes_page_msg">{{ joke }}</p>
    <LoadingGIF class="jokes_page_msg" v-else/>
    <StyledButton
      buttonText="Next joke!"
      @click="getJokeACB"
    />
  </div>
</template>

<style scoped>

/* Turns the page into a flex container where it acts as a parent where the jokes window and buttons are its children.  */
.jokes_page {
  display:flex;
  flex-direction: column;
}

/* Global effects on the button during mouse hover. */
.button:hover {
  background-color: #00bd7e;
  transition: 0.7s;
  border-radius: 10px;
  color: black;
}

/* Specific settings for Desktop view. */
@media (min-width: 768px) {
  .jokes_page_msg {
  color:white;
  border-style: solid;
  border-radius: 0px;
  border-color: #00bd7e;
  border-width: 0px;
  /* height: 250px;
  width: 500px; */
  margin: auto;
}

.button {
        background-color:#191a1c;
        border-color: #5b576b;
        border-radius: 4px;
        color:antiquewhite;
        height: 100px; 
        width: 100px;
        margin-left: auto;
        position: fixed;
        right: 15px;
        bottom: 15px;
    }

}

/* Specific settings for Mobile view. */
@media (max-width: 768px) {
  .jokes_page_msg {
  color:white;
  border-style: solid;
  border-radius: 0px;
  border-color: #00bd7e;
  border-width: 0px;
  /* height: 250px;
  width: 500px; */
  margin:auto;
  padding: 1em;
  }
  .button {
        background-color:#191a1c;
        border-color: #5b576b;
        border-radius: 4px;
        color:antiquewhite;
        height: 100px; 
        width: 100px;
        margin-left: auto;
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
