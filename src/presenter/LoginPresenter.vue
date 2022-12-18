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
import { createAccount, signInToAccount } from '../model/firebaseModel.js';
</script>

<template>
	<Login
		:inputFromTheModel="getInputFromModel"
		:userFromFirebase="getUserFromFirebase"
		@getTextFromInputACB="setInputACB"
		@getDetailsForAuthACB="handleAuthACB"
	/>
</template>

<script>
export default {
	//Vue component
	props: ['model'],
	data() {
		return {};
	},
	created() {},
	computed: {
		getInputFromModel() {
			return this.model.currentInput;
		},
		getUserFromFirebase() {
			return this.model.user;
		},
	},
	methods: {
		setInputACB(input) {
			this.model.setInput(input);
		},
		handleAuthACB(event) {
			console.log(event);
			if (event.logIn) {
				signInToAccount(event.email, event.password, this.model);
			} else if (!event.logIn) {
				createAccount(event.email, event.password, this.model);
			}
		},
	},
	components: {
		Login,
	},
};
</script>
