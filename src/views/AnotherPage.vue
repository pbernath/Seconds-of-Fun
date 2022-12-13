<script setup>
import styledButton from '../components/styledButton.vue';
</script>

<template>
  <div class="another_page">
    <h1 class="another_page_msg">{{model}}</h1>
    <styledButton buttonText="Get joke!" @click="logging"/>

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
  props: ['model'],
  methods: {logging(){console.log(this.$route.state);}}
};
</script>