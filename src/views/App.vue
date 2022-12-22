<!--
  * App.vue contains settings for the global layout.
  * It includes settings for the buttons and where elements are placed on every page.
-->

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import ActivityPresenter from '../presenter/ActivityPresenter.vue';

</script>

<template>
  <header>
    <div class="wrapper">
      <ActivityPresenter :model="model"/>
    </div>
  </header>
  <RouterView :model="model"/>
</template>

<script>

export default{
  props: ['model'],
  created() {
    
  },
};
</script>


<style scoped>
/* Specific settings for Desktop view. */
@media (min-width: 768px) {
	.header {
		display: flex;
		place-items: center;
	}
	.mainDiv {
		display: flex;
		/* height:auto; */
		flex-direction: column;
		align-content: space-between;
		place-items: flex-start;
		align-items: flex-start;
		justify-content: left;
		/* flex-wrap: wrap; */
	}
	.wrapper {
		position: fixed;
		display: flex;
		place-items: flex-start;
		justify-content: left;
		flex-direction: column;
		/* flex-wrap: wrap; */
		top: 0.3em;
		left: 0.3em;
	}
}
/* Specific settings for Mobile view. */
@media (max-width: 768px) {
	.mainDiv {
		display: flex;
		flex-direction: row;
		align-content: bottom;
		place-items: end start;
	}
	.wrapper {
		position: fixed;
		width: 100%;
		display: flex;
		place-items: flex-end;
		justify-content: space-between;
		align-items: stretch;
		flex-direction: inherit;
		/* flex-wrap: wrap; */
		bottom: 0em;
		left: 0em;
		margin: 0px;
		padding: 0px;
	}
}

@media (min-width: 400px) and (max-width: 768px) {
	.mainDiv {
		display: flex;
		flex-direction: row;
		align-content: bottom;
		place-items: end start;
	}
	.wrapper {
		position: fixed;
		width: 400px;
		display: flex;
		place-items: flex-end;
		justify-content: space-between;
		align-items: stretch;
		flex-direction: inherit;
		/* flex-wrap: wrap; */
		bottom: 0em;
		left: 0em;
		margin: 0px;
		padding: 0px;
	}
}
</style>
