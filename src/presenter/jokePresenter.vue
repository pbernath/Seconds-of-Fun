<script setup>
import ActivityChooser from '../components/ActivityChooser.vue';
</script>

<template>
    <ActivityChooser
    @getJokeEvent="fetchJokeACB">
    </ActivityChooser>
</template>

<script>
export default { //Vue component
    props: ["model"], 
    data(){return {};},
    components: {
    ActivityChooser,
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
