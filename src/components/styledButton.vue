<!--
  * styledButton.vue contains global settings for the buttons that are used on the website. 
  * Specific button settings are then made using <style scoped>.
-->

<template>
    <button class="button">{{this.buttonText}}</button>
</template>

<script>export default {
  props:['buttonText']
}
</script>

<style scoped>
/* Specific settings for Desktop view. */
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
/* Specific settings for Mobile view. */
  @media (max-width: 768px) {
  .button {
        background-color:#191a1c;
        border-color: #5b576b;
        border-radius: 4px;
        color:antiquewhite;
        height: 100px; 
        width: 100px;
        max-width: 100%;
        flex-grow: 4;
        margin:0px;
        padding:0px;
    }
  }
/* Settings for what happens when the mouse hovers a certain button, such as changing color. */
  .button:hover {
        background-color:#00bd7e;
        transition: 0.7s;
        border-radius: 10px;
        color:black;
    }
</style>
