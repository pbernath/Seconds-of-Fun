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

@media (min-width: 769px) {
  .mainDiv {
  display: flex;
  flex-direction: column;
  align-content: center;
  place-items: flex-start;
  /* padding-right: calc(var(--section-gap) / 2); */
  }
  
  .logo {
    /* margin: 0 2rem 0 0; */
    position: relative;
    top: 15px;
    right: 15px;
  }

  .mainDiv.wrapper {
    display: flex;
    place-items: flex-start;
    justify-content: left;
    align-items: left;
    flex-direction: column;
    flex-wrap: nowrap;
    
  }

  nav {
    text-align: left;
    /* margin-left: -1rem; */
    font-size: 1rem;

    padding: 1rem 0;
    /* margin-top: 1rem; */
  }
  .routerBox{
    position:absolute;
    

  }
  .wrapper {
    position: absolute;
    display: flex;
    place-items: flex-start;
    justify-content: left;
    align-items: left;
    flex-direction: column;
    flex-wrap: nowrap;

  }
}

@media (max-width: 768px) {
  .mainDiv {
    display: flex;
    flex-direction: row;
    align-content: bottom;
    place-items: end start;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    /* margin: 0 2rem 0 0; */
    position: absolute;
    top: 15px;
    right: 15px;
  }

  .mainDiv.wrapper {
    display: flex;
    place-items: flex-start;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    
  }

  nav {
    text-align: left;
    /* margin-left: -1rem; */
    font-size: 1rem;

    padding: 1rem 0;
    /* margin-top: 1rem; */
  }
  .routerBox{
    position:absolute;
    top:0;
    left:0;
    width:10%;

  }
  .wrapper {
    position: absolute;
    display: flex;
    place-items: flex-start;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;

  }
}
</style>
