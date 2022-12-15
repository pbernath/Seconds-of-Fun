<script setup>
import LandingPage from '../components/LandingPage.vue'
</script>

<template>
  <main class="home">
    <img alt="SOF logo" class="logo" src="@/assets/sof-logo-500.png" width="125" height="125" />

    <div class="wrapper">
      <LandingPage msg="Welcome!" />
    </div>
  </main>
</template>

<style>
  #content {
   position: relative;
  }

  @media (min-width: 769px) {
    .home {
      display: flex;
      height: auto;
      flex-direction: row;
      align-content: space-between;
      place-items: flex-start;
      align-items: flex-start;
      justify-content: left;
      flex-wrap: wrap;
    }

    .home .logo {
      position: fixed;
      top: 15px;
      right: 15px;
    }

    .home .wrapper {
      display: flex;
      place-items: flex-start;
      justify-content: left;
      align-items: flex-start;
      flex-direction: column;
      flex-wrap: nowrap;
      order: 0;
    }
  }

</style>