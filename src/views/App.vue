<script setup>
import { RouterLink, RouterView } from 'vue-router'
import ActivityChooser from '../components/ActivityChooser.vue';

</script>

<template>
  <div class="mainDiv">
    <div class="wrapper">
      <ActivityChooser />
    </div>
    <div class="routerBox">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

@media (min-width: 768px) {
  .mainDiv {
  display: flex;
  /* height:auto; */
  flex-direction: column;
  align-content: space-between;
  place-items: flex-start;
  align-items: flex-start;
  justify-content: left;
  flex-wrap: wrap;

  /* padding-right: calc(var(--section-gap) / 2); */
  }

  /* .mainDiv.wrapper {

    display: flex;
    place-items: flex-start;
    justify-content: left;
    align-items: flex-start;
    flex-direction: column;
    flex-wrap: nowrap;
  } */

  /* .nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  } */
  .routerBox{
    position: relative;
    display: flex;
    flex-direction: column;
    align-content: space-between;
    right: -224px;

  }
  .wrapper {
    position: fixed;
    display: flex;
    place-items: flex-start;
    justify-content: left;
    flex-direction: column;
    flex-wrap: wrap;
    left: 1em;
    top: 1em;

  }
}

@media (max-width: 768px) {
  .mainDiv {
    display: flex;
    flex-direction: row;
    align-content: bottom;
    place-items: end start;
    /* padding-right: calc(var(--section-gap) / 2); */
  }

  /* .mainDiv.wrapper {
    display: flex;
    place-items: flex-start;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    
  } */

  .routerBox{
    position:absolute;


  }

  .wrapper {
    position: fixed;
    display: flex;
    place-items: flex-end;
    justify-content: space-evenly;
    /* align-items: center; */
    align-content: bottom;
    flex-direction: row;
    flex-wrap: nowrap;
    bottom: 1em;

  }
}
</style>
