<script setup>
import styledButton from "../components/styledButton.vue";
import LoadingGIF from "../components/icons/LoadingGIF.vue";
</script>

<template>
    <div class="comic_page">
    <p v-if="comicTitle != msg" class="comic_page">
        {{ comicTitle }}
    </p>
    <LoadingGIF class="comic_page" v-else/>
    <img v-bind:src=comicImage>
        

    <styledButton
      buttonText="Random Comic strip"
      @click="getRandomComicACB"
    />
  </div>
</template>

<style>
.comic_page {
  width: 100%;
  height: 100%;
  color: white;
  border-style: solid;
  border-radius: 0px;
  border-color: #00bd7e;
  border-width: 0px;
}
</style>
 
<script>
export default {
  props: ["comicData", "loading"],
  emits: ["getRandomComicACB"],
  data(){return {msg: "Waiting for a comic..."}},
  computed: {
    comicTitle() {
        return this.comicData.data.alt;
    },
    comicImage(){
        return this.comicData.data.img;
    },

  },
  methods: {
    getRandomComicACB() {
      this.$emit("getRandomComicACB");
    },
  },
};
</script>
  

