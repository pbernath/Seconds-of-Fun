<script setup>
import WelcomeItem from '../components/WelcomeItem.vue'
import DocumentationIcon from '../components/icons/IconDocumentation.vue'
import CommunityIcon from '../components/icons/IconCommunity.vue'
import SupportIcon from '../components/icons/IconSupport.vue'
import styledButton from '../components/styledButton.vue'
</script>

<template>
      <styledButton buttonText="Home" @click="goToHomeACB"/>

      <styledButton buttonText="AnotherPage" @click="goToAnotherPageACB"/>

      <styledButton buttonText="Third" @click="goToThirdACB"/>
</template>

<script>export default {
  emits:['anotherPageRoutingACB', 'homePageRoutingACB', 'thirdRoutingACB'],
  methods:{
    goToAnotherPageACB(){
      this.$emit('anotherPageRoutingACB')},
    goToHomeACB(){
      this.$emit('homePageRoutingACB')},
    goToThirdACB(){
      this.$emit('thirdRoutingACB')}

},};
</script>
