<script setup>
import {getComic} from "../comicSource"
import { resolvePromise } from "../resolvePromise";
import ComicView from "../views/ComicView.vue"
</script>

<template>
  <ComicView
    v-if="comicData != undefined"
    :comicData="comicData"
    @getRandomComicACB="setCurrentComicACB" 
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
    setCurrentComicACB() {
      console.log("Current comic ACB")
      console.log(this.model.comicPromiseState.data)
      this.model.setCurrentComic();
    },
  },
  components: {
    ComicView,
  },
};
</script>

