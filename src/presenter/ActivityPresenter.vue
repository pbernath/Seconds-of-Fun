<script setup>
import ActivityChooser from '../views/ActivityChooser.vue';
import { resolvePromise } from '../resolvePromise';
import { getJoke } from '../jokeSource';
import { render } from 'vue';
</script>

<template>
    <ActivityChooser
    @anotherPageRoutingACB="routeToJokesACB"
    @homePageRoutingACB="routeToHomeACB">
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
    ActivityChooser
  },
    methods:{routeToJokesACB(){
        this.$router.push({name: 'another_page', state: { model: this.model }})

    },
    routeToHomeACB(){this.$router.push({name: 'home'})}
}

}
</script>
