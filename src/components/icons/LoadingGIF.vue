<template>
    <img :src="gif">
  </template>
  
  <script>
  import gif from './theGif.gif';
  
  export default {
    data() {
      return {
        gif
      }
    }
  }
  </script>