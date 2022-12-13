<script setup>
import AnotherPage from '../views/AnotherPage.vue';
import { resolvePromise } from '../resolvePromise';
import { getJoke } from '../jokeSource';
import { render } from 'vue';
</script>
<template>
    <AnotherPage v-if="jokeData" 
                        :jokeData="jokeData" :loading="false" @getNewJokeACB="setCurrentJokeACB"/>

    <AnotherPage v-else :jokeData="loadingDataGif" :loading="true" @getNewJokeACB="setCurrentJokeACB"/>

</template>
<script>

export default { //Vue component
    props: ['model'],
    data(){ return {jokeData: this.model.jokePromiseState,
        loadingDataGif: "",    
    };
        
    },
    created(){
        if(this.jokeData.promise == undefined) resolvePromise(getJoke(),this.jokeData);
        if (this.jokeData.data == null) {
            this.jokeData.data = { joke: 'no joke'}
        }
    }, 
    methods:{setCurrentJokeACB(){ 
        this.model.setCurrentJoke()
    }
},
    components: {
        AnotherPage
    },


}
</script>
