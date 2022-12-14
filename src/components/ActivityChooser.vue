<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import {joke} from '../configs/jokeSource.js'
</script>

<template>
  <WelcomeItem>
    <template #heading>
      <div class="container">
      <div class="button-wrap">
      <button class="button" @click="$router.push('/')">Home</button>
    </div>
    </div>
    </template>
  </WelcomeItem>

  <WelcomeItem>
    <template #heading>
      <div class="container">
      <div class="button-wrap">
      <button class="button" @click="$router.push('/another_page')">AnotherPage</button>
    </div>
    </div>
    </template>
  </WelcomeItem>

  <WelcomeItem>
    <template #heading>
      <div class="container">
      <div class="button-wrap">
      <button class="button"  v-on:click="getJoke">Get joke!</button>
    </div>
    </div>
    </template>
      
  </WelcomeItem>

</template>
<script>export default {
props:{},
methods:{getJoke() { joke() }},


};
</script>

<style media="all">
.mobile-display {
    display: inline-block;
}
.desktop-display {
    display: grid;
}

.container {
  display: flex;
  width: 100%;
  margin: auto;
}

.button-wrap {
  padding: 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
@media (max-width: 768px) {
  .container {
    flex-direction: row;
  }
  .button-wrap {
    padding: 1em 0;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .button {
    flex: 0 0 20%;
  }

}
  .button {
        display: flex;
        justify-content: center;
        flex-direction: column;
        background-color:#191a1c;
        border-color: #5b576b;
        border-radius: 4px;
        color:antiquewhite;
        height:50px; 
        width: 100px;
        place-items: center;
        position: relative;
        flex: 0 0 auto;
    }
  .button:hover {
        background-color:#ffccc5;
        transition: 0.7s;
        border-radius: 10px;
        color:black;
    }
</style>
