<script setup>
import FavoriteComicView from "../views/FavoriteComicView.vue";
</script>

<template>
    <FavoriteComicView :comics="favComics" @goToFavComicACB="routeToFavComicACB" @removeFavComicACB="removeFavComicACB"/>
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
    props: ["model"],
    computed: {
        favComics() {
            return this.model.favComics;
        }
    },
    methods: {
        routeToFavComicACB(num){
            this.model.setCurrentComic(num)
            this.$router.push({name: "comic"})
        },
        removeFavComicACB(num){
            this.model.removeFromFavComic({num:num});
        }
    },
    components: {
        FavoriteComicView
    }
};
</script>