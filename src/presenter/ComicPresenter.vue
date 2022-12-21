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
    :comicSaved="isComicSaved"
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

    isComicSaved(){
      if(this.model.comicPromiseState.data){
        function compareIdsCB(comic){
          return comic.num == this.model.comicPromiseState.data.num;
        }
      return this.model.favComics.some(compareIdsCB.bind(this));
      }
    },

  },
  created() {
    if (this.model.comicPromiseState.promise == undefined)
      resolvePromise(getComic(), this.model.comicPromiseState);
  },
  methods: {
    getRandomComicACB() {
      this.model.getRandomComic();
    },
    setNextComicACB() {
      this.model.setNextComic();
    },
    setPrevComicACB() {
      this.model.setPrevComic();
    },
    favComicACB() {
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
