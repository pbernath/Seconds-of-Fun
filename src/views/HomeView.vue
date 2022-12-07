<script setup>
import LandingPage from '../components/LandingPage.vue'
</script>

<template>
  <main class="home">
    <header>
    <img alt="SOF logo" class="logo" src="@/assets/sof-logo-500.png" width="125" height="125" />

    <div class="wrapper">
      <LandingPage msg="Welcome!" />
    </div>
    </header>
  </main>
</template>

<style scoped>

.home{
  width: 430px;
  height: 290;
}




</style>