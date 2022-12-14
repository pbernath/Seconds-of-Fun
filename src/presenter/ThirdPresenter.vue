<script setup>
import Third from '../views/Third.vue';
import { resolvePromise } from '../resolvePromise';
import { render } from 'vue';
</script>

<template>
    <Third :inputFromTheModel="getInputFromModel" @getTextFromInputACB="setInputACB"/>
</template>

<script>

export default { //Vue component
    props: ['model'],
    data(){ return {

        };
    },
    created(){

    },
    computed: {
        getInputFromModel() {
            return this.model.currentInput;
        }
    },
    methods:{
        setInputACB(input){
            this.model.setInput(input)
        }
    },
    components: {
        Third
    },
    

}
</script>
