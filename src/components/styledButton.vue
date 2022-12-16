<template>
    <button class="button">{{this.buttonText}}</button>
</template>

<script>export default {
  props:['buttonText']
}
</script>

<style scoped>
  .button {
        background-color:#191a1c;
        border-color: #5b576b;
        border-radius: 4px;
        color:antiquewhite;
        height:50px; 
        width: 100px;
        place-items: center;
    }
  .button:hover {
        background-color:#ffccc5;
        transition: 0.7s;
        border-radius: 10px;
        color:black;
    }
</style>
