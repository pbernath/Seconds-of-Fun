<!--
  * ComicView contains settings for how the comics page looks, such as color and dimensions.
-->

<script setup>
import styledButton from "../components/styledButton.vue";
import LoadingGIF from "../components/icons/LoadingGIF.vue";
</script>




<template>
  <div class="comic_page">
    <h1 v-if="comic != msg" class="comic_title">
        {{ comicTitle }}
    </h1>

    <img v-if="comic != msg" :src=comicImage >
    <LoadingGIF v-else/>
    <div class="comic_buttonContainer">
      <div class="flex_comicButton">
        <img src="../assets/user-500.png" id="Random" @click="getRandomComicACB" class="comic_buttons"/>
      </div>

      <div class="flex_comicButton">
        <img src="../assets/user-500.png" id="Previous" @click="getPrevComicACB" class="comic_buttons"/>
      </div>

      <div class="flex_comicButton">
        <img src="../assets/user-500.png" id="Next" @click="getNextComicACB" class="comic_buttons"/>
      </div>

      <div v-if="loggedIn && !comicSaved" class="flex_comicButton">
        <img  src="../assets/joke-500.png" id="Favorite" @click="favComicACB" class="comic_buttons"/>
      </div>

      <div v-if="loggedIn && comicSaved" class="flex_comicButton">
        <img  src="../assets/refresh-500.png" id="Unfavorite" @click="removeFromFavoriteComicsACB" class="comic_buttons"/>
      </div>

    </div>

    <p v-if="!loggedIn">
      Log in to save the comic!
    </p>
  </div>
</template>

<style>




</style>
 
<script>
export default {
  props: ["comicData", "loading","loggedIn", "comicSaved"],
  emits: ["getRandomComicACB", "getNextComicACB", "getPrevComicACB", "favComicACB", "comicSaved",""],
  data(){return {msg: "Waiting for a comic..."}},
  computed: {
    comicTitle() {
        return this.comicData.data.safe_title;
    },
    comicImage(){
        return this.comicData.data.img;
    },
    comic(){
       return this.comicData.data.comic;
    }
  },
  methods: {
    getRandomComicACB() {
      this.$emit("getRandomComicACB");
    },
    getNextComicACB() {
      this.$emit("getNextComicACB");
    },
    getPrevComicACB() {
      this.$emit("getPrevComicACB");
    },
    favComicACB() {
      this.$emit("favComicACB");
    },
    removeFromFavoriteComicsACB() {
      this.$emit("removeComicFromFavACB");
    },
  },
};
</script>

