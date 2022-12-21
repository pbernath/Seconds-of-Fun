<!--
  * This is the root of the Vue app.
  *
  * It is responsible for loading the firebase data and then passing it to the App component.
  *
  * It also passes the firebase data to the model so that the model can update the firebase data,
  * as well as the model to the App component so that the App component can update the model.
  
  * Finally it passes the model to the window so that the model can be accessed from the console.
-->

<script setup>
import App from './App.vue';
import { firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase } from '../model/firebaseModel.js';
import secondsModel from '../model/secondsModel';
import LoadingGIF from '../components/icons/LoadingGIF.vue';
import { resolvePromise } from '../resolvePromise';
</script>

<template>
	<App v-if="doesFirebaseHaveData()" :model="myModel" />
	<LoadingGIF v-else />
</template>

<script>
export default {
	data() {
		return { myModel: {}, firebaseModelPromiseState: {} };
	},
	created() {
		if (!this.firebaseModelPromiseState.promise) {
			resolvePromise(firebaseModelPromise(), this.firebaseModelPromiseState, this.continueSetup);
		}
	},
	methods: {
		doesFirebaseHaveData() {
			if (!this.firebaseModelPromiseState.promise) {
				return false;
			}

			if (this.firebaseModelPromiseState.data) {
				return true;
			}

			if (this.firebaseModelPromiseState.error) {
				console.log(this.firebaseModelPromiseState.error.toString());
				return false;
			}
		},
		continueSetup() {
			this.myModel = this.firebaseModelPromiseState.data;
			window.myModel = this.myModel;
			updateModelFromFirebase(this.myModel);
			updateFirebaseFromModel(this.myModel);
		},
	},
};
</script>
