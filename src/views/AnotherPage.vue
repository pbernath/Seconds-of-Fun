<script setup>
import styledButton from '../components/styledButton.vue';
import LoadingGIF from '../components/icons/LoadingGIF.vue';
</script>

<template>
  <div class="another_page">
    <h1 class="another_page_msg">{{joke}}</h1>
    <LoadingGIF v-if="loading == true"/>
    <styledButton  v-if="loading == false" buttonText="Next joke!" @click="getJokeACB" />

  </div>
</template>

<style>
.another_page{
  width: 430px;
  height: 290;
}

.another_page_msg{
  color: white;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script>export default {
  props: ['jokeData', 'loading'],
  emits:['getNewJokeACB'],
  data(){return {joke: this.jokeData.data.joke}},
  methods:{getJokeACB(){this.$emit('getNewJokeACB'); 
},
  
  
},

};
</script>