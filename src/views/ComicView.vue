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
        <img src="../assets/refresh-500.png" id="Random" @click="getRandomComicACB" class="comic_buttons"/>
      </div>

      <div class="flex_comicButton">
        <img src="../assets/left-500.png" id="Previous" @click="getPrevComicACB" class="comic_buttons"/>
      </div>

      <div class="flex_comicButton">
        <img src="../assets/right-500.png" id="Next" @click="getNextComicACB" class="comic_buttons"/>
      </div>

      <div v-if="loggedIn && !comicSaved" class="flex_comicButton">
        <img  src="../assets/like-500-false.png" id="Favorite" @click="favComicACB" class="comic_buttons"/>
      </div>

      <div v-if="loggedIn && comicSaved" class="flex_comicButton">
        <img  src="../assets/like-500-true.png" id="Unfavorite" @click="removeFromFavoriteComicsACB" class="comic_buttons"/>
      </div>

    </div>

    <p v-if="!loggedIn">
      Log in to save the comic!
    </p>
  </div>
</template>

<style>

.comic_page {
	width: 100%;
	height: 100%;
	color: white;
	border-style: solid;
	border-radius: 100px;
	border-color: #00bd7e;
	border-width: 0px;
	margin-left: 10em;
	margin-right:10em;
	margin-bottom: 50em;
	z-index: -1;
  }
  
  .flex_comicButton{
	width: 5em;
	height: 5em;
	flex-wrap: wrap;
	cursor: pointer;
  }
  .flex_comicButton:hover{
	background-color:#00bd7e1b;
  }
  
  .comic_buttonContainer {
	display: flex;
	flex-direction:row;
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

