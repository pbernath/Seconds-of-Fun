<script setup>
import styledButton from '../components/styledButton.vue';
</script>

<template>
  <div class="another_page">
    <h1 class="another_page_msg">{{joke}}</h1>
    <styledButton buttonText="Get joke!" @click="getJokeACB"/>

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
  props: ['jokeData'],
  emits:['getNewJokeACB'],
  data(){return {joke: this.jokeData}},
  methods:{getJokeACB(){this.$emit('getNewJokeACB');}},
};
</script>