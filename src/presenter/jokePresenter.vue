<script setup>
import ActivityChooser from '../components/ActivityChooser.vue';
import AnotherPage from '../views/AnotherPage.vue';
import { RouterLink } from 'vue-router';
import { resolvePromise } from './resolvePromise';
import { getJoke } from '../configs/jokeSource';
</script>

<template>
    <ActivityChooser
    @getJokeEvent="fetchJokeACB">
    </ActivityChooser>

</template>

<script>
export default { //Vue component
    props: ["model" ],
    data(){return {jokeData: this.model.jokePromiseState.data
        };
    },
    created(){if(this.model.jokePromiseState.promise == null) resolvePromise(getJoke(),this.model.jokePromiseState);}, 
    components: {
    ActivityChooser,
    AnotherPage
  },
    methods:{fetchJokeACB(){
       
        //this.jokePromiseState.promise=fetch joke from API 
        //console.log("Presenter about to resolve promise")
        //resolvePromise(this.jokePromiseState.promise, this.jokePromiseState)
        this.model.setCurrentJoke();
    }
}

}
</script>
