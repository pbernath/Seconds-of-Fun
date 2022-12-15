<script setup>
import App from "./App.vue";
import {
  firebaseModelPromise,
  updateFirebaseFromModel,
  updateModelFromFirebase,
} from "../model/firebaseModel.js";
import secondsModel from "../model/secondsModel";
import LoadingGIF from "../components/icons/LoadingGIF.vue";
import { resolvePromise } from "../resolvePromise";

/*
  <App v-if="doesFirebaseHaveData()" :model="myModel" />
  <LoadingGIF v-else />
*/

</script>

<template>
  <App v-if="doesFirebaseHaveData()" :model="myModel" />
  <LoadingGIF v-else />
</template>

<script>
export default {
  data() {
    return { myModel: new secondsModel(), firebaseModelPromiseState:{}};
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
      console.log("test");
      this.myModel = this.firebaseModelPromiseState.data;
      window.myModel = this.myModel;
      updateModelFromFirebase(this.firebaseModelPromiseState.data);
      updateFirebaseFromModel(this.firebaseModelPromiseState.data);
    },
  },
};
</script>
