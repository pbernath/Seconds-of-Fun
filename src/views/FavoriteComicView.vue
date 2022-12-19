<script setup>
import LoadingGIF from "../components/icons/LoadingGIF.vue";
</script>
      
<template>
  <div>
    <li :key="comic.num" class="comicList" v-for="comic in comics">
        <button @click="removeACB(comic.num)">X</button>

        <div @click="goToFavComicACB(comic.num)">{{ comic.safe_title }}</div>
    </li>
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
    props:['comics'],
    emits:["goToFavComicACB", "removeFavComicACB"],
    computed: {
    comic(){
       return ;
    }
    },
    methods:{
        goToFavComicACB(num){
            this.$emit("goToFavComicACB", num);
        },
        removeACB(num){
            this.$emit("removeFavComicACB", num);
        }
    }
}
</script>