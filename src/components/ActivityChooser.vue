<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>
      <button class="button" @click="$router.push('/')">Home</button>
    </template>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>
      <button class="button" @click="$router.push('/another_page')">AnotherPage</button>
    </template>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>
      <button class="button" @click="getJokeACB">Get joke!</button>
    </template>
    </WelcomeItem>

</template>

<script>export default {
  emits:['getJokeEvent'],
  methods:{getJokeACB(){this.$emit('getJokeEvent')}
},};
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
