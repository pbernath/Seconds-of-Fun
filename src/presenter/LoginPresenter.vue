<script setup>
import Login from '../views/LoginView.vue';
import { resolvePromise } from '../resolvePromise';
import { render } from 'vue';
import {createAccount, signInToAccount, updateModelFromFirebase} from '../model/firebaseModel.js';
</script>

<template>
    <Login
    :userFromFirebase="getUserFromFirebase"
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
        getUserFromFirebase () {
            return this.model.user;
        }
    },
    methods:{
        handleAuthACB (event) {
            if (event.logIn) {
                signInToAccount(event.email, event.password, this.model);
            } else if (!event.logIn) {
                createAccount(event.email, event.password, this.model);
            }

        }
    },
    components: {
        Login
    },
    

}
</script>
