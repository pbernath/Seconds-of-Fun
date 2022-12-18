<!--
  * ActivityChooserView does things related to the menu, home logo and buttons.
  * It routes buttons and their clicks to other pages.
-->

<script setup>
import StyledButton from '../components/StyledButton.vue';
</script>

<template>
	<div @click="goToHomeACB">
		<img v-if="goToHomeACB" src="../assets/sof-logo-500.png" id="homeLogo" width="100" height="100" />
	</div>
	<div>
		<StyledButton buttonText="Jokes" @click="goToJokesPageACB" />
	</div>
	<div>
		<StyledButton buttonText="Comics" @click="goToComicACB" />
	</div>
	<div label="LoginButton">
		<StyledButton buttonText="Login" @click="goToLoginACB" />
	</div>
</template>

<script>
export default {
	emits: ['homePageRoutingACB', 'jokesPageRoutingACB', 'comicPageRoutingACB', 'loginPageRoutingACB'],
	methods: {
		goToHomeACB() {
			this.$emit('homePageRoutingACB');
		},
		goToJokesPageACB() {
			this.$emit('jokesPageRoutingACB');
		},
		goToComicACB() {
			this.$emit('comicPageRoutingACB');
		},
		goToLoginACB() {
			this.$emit('loginPageRoutingACB');
		},
	},
};
</script>
