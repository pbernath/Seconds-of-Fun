<script setup>
import styledButton from '../components/styledButton.vue';
</script>

<template>
  <div class="another_page">
    <input id="theInputField" @keydown="checkForEnterACB">
    <styledButton buttonText="Add to model" @click="addToModelACB"/>
    <h1 class="another_page_msg">{{fetchFromModel}}</h1>

  </div>
</template>

<style>
.another_page{
  width: 430px;
  height: 290;
}

.another_page_msg{
  color: white;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script>export default {
  props: ['inputFromTheModel'],
  emits:['getTextFromInputACB'],
  data(){return {}},
  computed: {
    fetchFromModel() {
      return this.inputFromTheModel;
    }
  },
  methods:{
    addToModelACB(){
      this.$emit('getTextFromInputACB', theInputField.value);
    },
    checkForEnterACB(e){
      if (e.key === "Enter") {
        this.addToModelACB();
      }
    }
  },
};
</script>