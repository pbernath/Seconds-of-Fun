<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import {joke} from '../jokeSource.js'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading><button class="button"  v-on:click="joke">Comic strips!</button></template>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading><button class="button"  v-on:click="getJoke">Jokes!</button></template>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading><button class="button"  v-on:click="joke">Most liked joke!</button></template>
  </WelcomeItem>

</template>
<script>export default {
props:{},
methods:{getJoke() {joke()}},


};
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
