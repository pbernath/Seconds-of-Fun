<!--
  * LandingPage.vue is responsible for what is displayed on the landing page, such as settings of the text.
-->

<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <img src="../assets/logo-500.png" class="the_logo" />
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      <h4>You've found your way to </h4> <h3 class="green">Seconds of Fun!</h3>
    </h3>
    <h4>
      Please choose an activity
    </h4>
  </div>
</template>

<style scoped>
/* Settings for the displayed text on the landing page.  */
.the_logo {
  width: 10em;
  height: 10em;
margin: auto;

}
.h1 {
	font-weight: 500;
	font-size: 2.6rem;
	top: -10px;
}
.h3 {
	font-size: 1.2rem;
}
.h4 {
	color: white;
	font-size: 1.2rem;
}
/* Specific settings for Desktop view. */
@media (min-width: 768px) {
	.greetings h1,
	.greetings h3 {
		text-align: center;
	}
  .greetings h4 {
  text-align: center;
}
}
/* Specific settings for Mobile view. */
@media (max-width: 768px) {
  .greetings h1,
  .greetings h3 {
    text-align: center;
  }
  .greetings h4 {
  text-align: center;
}
}
</style>
