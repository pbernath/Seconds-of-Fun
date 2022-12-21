<script setup>
import LoadingGIF from "../components/icons/LoadingGIF.vue";
</script>
      
<template>
  <div v-if="loggedIn">
    <li :key="comic.num" class="comicList" v-for="comic in comics">
        <button @click="removeACB(comic.num)">X</button>

        <div @click="goToFavComicACB(comic.num)">{{ comic.title }}</div>
    </li>
  </div>
  <h1 v-else> You have to be logged in to see your favorite comics  </h1>

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
    props:['comics', 'loggedIn'],
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