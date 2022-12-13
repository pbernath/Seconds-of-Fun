<script setup>
import AnotherPage from '../views/AnotherPage.vue';
import { resolvePromise } from '../resolvePromise';
import { getJoke } from '../jokeSource';
import { render } from 'vue';
</script>
<template>
    <AnotherPage v-if="dataExists" :jokedata="jokeData" @getNewJokeACB="setCurrentJokeACB"/>
    <AnotherPage v-else :jokeData="{data: {joke: 'nej'}}" @getNewJokeACB="setCurrentJokeACB"/>

</template>
<script>

export default { //Vue component
    props: ['model'],
    data(){ return {jokeData: this.model.jokePromiseState.data,
                    dataExists: (this.model.jokePromiseState.data != undefined)
        };
    },
    created(){
        if(this.model.jokePromiseState.promise == undefined) resolvePromise(getJoke(),this.model.jokePromiseState);
        
    }, 
    methods:{setCurrentJokeACB(){this.model.setCurrentJoke()}},
    components: {
        AnotherPage
    },
    

}
</script>
