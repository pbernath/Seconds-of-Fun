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
.home{
  width: 430px;
  height: 290px;
}




</style>