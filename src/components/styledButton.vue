<template>
    <button class="button">{{this.buttonText}}</button>
</template>

<script>export default {
  props:['buttonText']
}
</script>

<style scoped>
@media (min-width: 768px) {
  .button {
        background-color:#191a1c;
        border-color: #5b576b;
        border-radius: 4px;
        color:antiquewhite;
        height: 50px; 
        width: 100px;
        place-items: center;
    }
  }

  @media (max-width: 768px) {
  .button {
        background-color:#191a1c;
        border-color: #5b576b;
        border-radius: 4px;
        color:antiquewhite;
        height: 100px; 
        width: 100px;
        place-items: stretch;
        align-items: stretch;
        flex-grow: 1;
    }

  }
  .button:hover {
        background-color:#00bd7e;
        transition: 0.7s;
        border-radius: 10px;
        color:black;
    }
</style>
