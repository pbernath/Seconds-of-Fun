<script setup>
import styledButton from '../components/styledButton.vue';
</script>

<template>
  <div class="login_page">
    <div>
    <h3 v-if="fetchUser != null">{{fetchUser}}</h3>
    <input id="emailField" placeholder="e-mail" @keydown="checkForEnterWhileLoginACB">
    <input id="passwordField" placeholder="password" @keydown="checkForEnterWhileLoginACB">
    <input v-if="!logIn" id="secondPasswordField" placeholder="repeat password" @keydown="checkForEnterWhileLoginACB">
    <styledButton v-if="logIn" buttonText="Log In" @click="continueLogInACB"/>
    <styledButton v-if="!logIn" buttonText="Sign Up!" @click="continueLogInACB"/>
  </div>
  <div>
    <h3 v-if="logIn" @click="switchToSignUpACB" @mouseover="" >Not yet registered? Click here to Sign Up!</h3>
    <h3 v-if="!logIn" @click="switchToLogInACB" @mouseover="" >Already signed up? Click here to Log In!</h3>
  </div>
  <div>PLACEHOLDER Forgot your password? Click here!</div>

  </div>

</template>

<style>
.login_page{
  width: 100%;
  height: 100%;
  color: white;
  border-style: solid;
  border-radius: 12px;
}


@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script>export default {
  props: [ 'userFromFirebase'],
  emits:[ 'getDetailsForAuthACB'],
  data(){return {logIn: true, signUp: false, someText: "This is a template for a log in page, i know, it's cool. (◕‿◕)"}},
  computed: {
    fetchFromModel() {
      return this.inputFromTheModel;
    },
    fetchUser () {
      return this.userFromFirebase;
    }
  },
  methods:{
    checkForEnterACB(e){
      if (e.key === "Enter") {
        this.addToModelACB();
      }
    },
    switchToSignUpACB () {
      this.logIn = false;
    },
    switchToLogInACB () {
      this.logIn = true;
    },
    checkForEnterWhileLoginACB (e) {
      if (e.key === "Enter") {
        this.continueLogInACB();
      }
    },
    continueLogInACB () {
      if (!this.logIn) {
        if (passwordField.value !== secondPasswordField.value) {
          this.someText = "Password fields don't match";
          passwordField.value = "";
          secondPasswordField.value = "";
          return;
        }
      }
      this.$emit('getDetailsForAuthACB', {email: emailField.value, password: passwordField.value, logIn: this.logIn});
      this.someText = "if everything goes according to plan you should soon be signed in";
      passwordField.value = "";
    }
  },
};
</script>