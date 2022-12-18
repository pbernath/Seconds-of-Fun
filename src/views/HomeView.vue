<!--
  * HomeView initializes LandingPage which is responsible for the view settings on the landing page.
-->

<script setup>
import LandingPage from '../components/LandingPage.vue'
</script>

<template>
  <main class="home">
    <header>
    <div class="wrapper">
      <LandingPage msg="Welcome!" />
    </div>
    </header>
  </main>
</template>

<style>
/* Specific settings for the landing page are located in the LandingPage component. */
</style>