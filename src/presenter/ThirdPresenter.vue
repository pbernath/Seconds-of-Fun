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
        getUserFromFirebase (props) {
            return props;
        }
    },
    methods:{
        setInputACB(input){
            this.model.setInput(input)
        },
        handleAuthACB (email, password, logIn) {
            if (logIn) {
                signInToAccount(email, password).then(this.getUserFromFirebase);
            } else if (!logIn) {
                createAccount(email, password).then(this.getUserFromFirebase);
            }
        }
    },
    components: {
        Third
    },
    

}
</script>
