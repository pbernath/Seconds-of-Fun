<script setup>
import WelcomeItem from '../components/WelcomeItem.vue'
import DocumentationIcon from '../components/icons/IconDocumentation.vue'
import CommunityIcon from '../components/icons/IconCommunity.vue'
import SupportIcon from '../components/icons/IconSupport.vue'
import styledButton from '../components/styledButton.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>
      <styledButton buttonText="Home" @click="goToHomeACB"/>
    </template>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>
      <styledButton buttonText="AnotherPage" @click="goToAnotherPageACB"/>
    </template>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>
      <styledButton buttonText="No purpose yet"/>
    </template>
    </WelcomeItem>

</template>

<script>export default {
  emits:['anotherPageRoutingACB', 'homePageRoutingACB'],
  methods:{goToAnotherPageACB(){this.$emit('anotherPageRoutingACB')},
          goToHomeACB(){this.$emit('homePageRoutingACB')}

},};
</script>
