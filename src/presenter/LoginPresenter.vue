<!--
    * LoginPresenter.vue contains functions related to the login page.
    *
    * It works together with LoginView, and is responsible for getting
    * and setting inputs from the login window, such as authenticating
    * the input and getting user data from Firebase.
-->

<script setup>
import Login from '../views/LoginView.vue';
import { resolvePromise } from '../resolvePromise';
import { render } from 'vue';
import {createAccount, signInToAccount, signOutOfAccount, updateModelFromFirebase} from '../model/firebaseModel.js';
</script>

<template>
    <Login
    :userFromFirebase="getUserFromModel"
    :errorMessage="getAuthErrorMessageFromModel"
    @getDetailsForAuthACB="handleAuthACB"
    @signOutFromFirebaseACB="handleSignOutACB"
    @errorAckACB="resetErrorMessageACB"
    @jokeFavoritesRoutingACB="routeToJokeFavsACB"
    @comicFavoritesRoutingACB="routeToComicFavsACB"
    />
</template>

<script>

export default {
    //Vue component.
    props: ['model'],
    data(){ return {

        };
    },
    created(){

    },
    computed: {
        getUserFromModel () {
            return this.model.userMail;
        },
        getAuthErrorMessageFromModel () {
            return this.model.authErrorMessage;
        },
    },
    methods:{
        handleAuthACB (event) {
            if (event.logIn) {
                signInToAccount(event.email, event.password, this.model);
            } else {
                createAccount(event.email, event.password, this.model);
            }
        },
        handleSignOutACB() {
            signOutOfAccount(this.model);
        },
        resetErrorMessageACB() {
            this.model.setAuthErrorMessage(null);
        },
        routeToJokeFavsACB() {
            this.$router.push({ name: "favorite_jokes" });
        },
        routeToComicFavsACB() {
            this.$router.push({ name: "favorite_comic" });
        },
    },
    components: {
        Login
    },
    

}
</script>
