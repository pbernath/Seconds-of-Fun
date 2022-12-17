<script setup>
import { RouterLink, RouterView } from 'vue-router';
import ActivityPresenter from '../presenter/ActivityPresenter.vue';

</script>

<template>
  <header>
    <div class="mainDiv">
    <div class="wrapper">
      <ActivityPresenter :model="this.model"/>
    </div>
    </div>
  </header>
  <RouterView :model="this.model"/>
</template>

<script>

export default{
  props: ['model'],

};


</script>
<style scoped>

@media (min-width: 768px) {
  .header {
    display: flex;
    place-items: center;
  }

  .mainDiv {
  display: flex;
  /* height:auto; */
  flex-direction: column;
  align-content: space-between;
  place-items: flex-start;
  align-items: flex-start;
  justify-content: left;
  flex-wrap: wrap;
  }

  .wrapper {
    position: fixed;
    display: flex;
    place-items: flex-start;
    justify-content: left;
    flex-direction: column;
    flex-wrap: wrap;
    top: 0.3em;
    left: 0.3em;
  }
}

@media (max-width: 768px) {
  .mainDiv {
    display: flex;
    flex-direction: row;
    align-content: bottom;
    place-items: end start;
  }

  .wrapper {
    position: fixed;
    width: 100%;
    display: flex;
    place-items: flex-end;
    justify-content: space-evenly;
    /* align-items: center; */
    align-content: bottom;
    flex-direction: row;
    flex-wrap: wrap;
    bottom: 0em;
    left: 0em;
    margin:0px;
    padding:0px;
  }
}

</style>
