<!--
  * ComicPresenter.vue contains functions and actions related to the comics page.
  * It runs the ComicView.
-->

<script setup>
import {getComic} from "../comicSource"
import { resolvePromise } from "../resolvePromise";
import ComicView from "../views/ComicView.vue"
</script>

<template>
  <ComicView
    v-if="comicData != undefined"
    :loggedIn="model.userMail != null"
    :comicData="comicData"
    @getRandomComicACB="getRandomComicACB" 
    @getNextComicACB="setNextComicACB"    
    @getPrevComicACB="setPrevComicACB"
    @favComicACB="favComicACB"
  />
</template>

<script>
export default {
  //Vue component
  props: ["model"],
  computed: {
    comicData() {
      if (this.model.comicPromiseState.data == null) {
        this.model.comicPromiseState.data = { comic: "Waiting for a comic..." };
      }
      return this.model.comicPromiseState;
    },
  },
  created() {
    if (this.model.comicPromiseState.promise == undefined)
      resolvePromise(getComic(), this.model.comicPromiseState);
  },
  methods: {
    getRandomComicACB() {
      console.log("Current comic ACB")
      console.log(this.model.comicPromiseState.data)
      this.model.getRandomComic();
    },
    setNextComicACB() {
      console.log("Next comic ACB")
      console.log(this.model.comicPromiseState.data)
      this.model.setNextComic();
    },
    setPrevComicACB() {
      console.log("Previous comic ACB")
      console.log(this.model.comicPromiseState.data)
      this.model.setPrevComic();
    },
    favComicACB() {
      console.log("fav comic ACB")
      console.log(this.model.comicPromiseState.data)
      if(this.model.comicPromiseState.data){
        this.model.addFavComic({num: this.model.comicPromiseState.data.num, title: this.model.comicPromiseState.data.safe_title});
      }
    },
    
  },
  components: {
    ComicView,
  },
};
</script>
