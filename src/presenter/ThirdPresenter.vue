<script setup>
import Third from '../views/Third.vue';
import { resolvePromise } from '../resolvePromise';
import { render } from 'vue';
import {createAccount, signInToAccount} from '../model/firebaseModel.js';
</script>

<template>
    <Third
    :inputFromTheModel="getInputFromModel"
    :userFromFirebase="getUserFromFirebase"
    @getTextFromInputACB="setInputACB"
    @getDetailsForAuthACB="handleAuthACB"
    />
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
        },
        getUserFromFirebase () {
            return this.model.user;
        }
    },
    methods:{
        setInputACB(input){
            this.model.setInput(input)
        },
        handleAuthACB (event) {
            console.log(event);
            if (event.logIn) {
                signInToAccount(event.email, event.password, this.model);
            } else if (!event.logIn) {
                createAccount(event.email, event.password, this.model);
            }
        }
    },
    components: {
        Third
    },
    

}
</script>
