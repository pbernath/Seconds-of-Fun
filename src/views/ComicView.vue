<!--
  * ComicView contains settings for how the comics page looks, such as color and dimensions.
-->

<script setup>
import styledButton from "../components/styledButton.vue";
import LoadingGIF from "../components/icons/LoadingGIF.vue";
</script>




<template>
    <div class="comic_page">
    <p v-if="comic != msg" class="comic_page">
        {{ comicTitle }}
    </p>

    <img v-if="comic != msg" :src=comicImage >
    <LoadingGIF v-else/>
    <div>
      <styledButton
      buttonText="Random Comic strip"
      @click="getRandomComicACB"
    />
    <styledButton
      buttonText="Next Comic"
      @click="getNextComicACB"
    />
    <styledButton
      buttonText="Previous Comic"
      @click="getPrevComicACB"
    />
    <styledButton
      v-if="loggedIn && !comicSaved"
      buttonText="Save!"
      @click="favComicACB"
    />
    <styledButton
      v-if="loggedIn && comicSaved"
      buttonText="Unsave!"
      @click="removeFromFavoriteComicsACB"
    />

    <p v-if="!loggedIn">
      Log in to save the joke and to change the joke preferences!
    </p>
    </div>
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
  props: ["comicData", "loading","loggedIn", "comicSaved"],
  emits: ["getRandomComicACB", "getNextComicACB", "getPrevComicACB", "favComicACB", "comicSaved","removeComicFromFavACB"],
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

