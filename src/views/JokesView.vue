<!--
  * JokesView contains settings for how the jokes page looks, such as color, dimensions and button settings.
-->

<script setup>
import styledButton from "../components/styledButton.vue";
import LoadingGIF from "../components/icons/LoadingGIF.vue";
</script>

<template>
  <div v-if="settings">
    <td>
      <tr v-for="item in category" :key="item">
        <input
          type="checkbox"
          v-model="selectedCategories"
          :value="item"
          @change="adjustPreferencesACB"
        />
        {{
          item
        }}
      </tr>
    </td>
    <td>
      <tr v-for="item in flags" :key="item">
        <input
          type="checkbox"
          v-model="selectedFlags"
          :value="item"
          @change="adjustPreferencesACB"
        />
        {{
          item
        }}
      </tr>
    </td>
    <styledButton
      class="button"
      v-if="loggedIn"
      buttonText="Go back to jokes!"
      @click="changeToSettingsACB"
    />
  </div>

  <div v-if="!settings" class="jokes_page">
    <p v-if="joke != msg" class="jokes_page_msg">{{ joke }}</p>
    <LoadingGIF class="jokes_page_msg" v-else />
    <styledButton class="button" buttonText="Next joke!" @click="getJokeACB" />
    <styledButton
      class="button"
      v-if="loggedIn"
      buttonText="Save!"
      @click="addToFavoriteJokesACB"
    />
    <p v-else>Log in to save the joke and to change the joke preferences!</p>
    <p v-if="isASavedJoke">Joke was saved!</p>
    <styledButton
      class="button"
      v-if="loggedIn"
      buttonText="Change joke preferences!"
      @click="changeToSettingsACB"
    />
  </div>
</template>

<script>
export default {
  props: ["jokeData", "loading", "loggedIn", "isASavedJoke", "jokePreferences"],
  emits: [
    "getNewJokeACB",
    "setJokeOnLoadACB",
    "sendJokeToFavoriteACB",
    "emitPreferencesACB",
  ],
  data() {
    return {
      settings: false,
      msg: "Waiting for a joke...",
      category: ["Programming", "Misc", "Dark", "Pun", "Spooky", "Christmas"],
      flags: ["NSFW", "Religious", "Political", "Racist", "Sexist", "Explicit"],
      selectedCategories: [],
      selectedFlags: [],
    };
  },
  computed: {
    joke() {
      this.$emit("setJokeOnLoadACB");
      console.log("Calling joke() in computed");
      return this.jokeData.data.joke;
    },

    preferences(){
      console.log("Calling preferences() in computed");
      return this.jokePreferences;
    }
  },
  created() {
    console.log("Entered created()");
    /*
    this.selectedCategories = this.jokePreferences.categories;
    function filterFlags(item) {
      return !this.selectedFlags.includes(item);
    }
    this.selectedFlags = this.jokePreferences.blacklist.filter(filterFlags.bind(this));
    */

  },
  methods: {
    changeToSettingsACB(){
      this.setPreferencesACB();
      this.settings = !this.settings;
      
    },
    getJokeACB() {
      this.$emit("getNewJokeACB");
    },
    addToFavoriteJokesACB() {
      this.$emit("sendJokeToFavoriteACB");
    },
    adjustPreferencesACB() {
      let calcNumber = 0;

      console.log("Calling adjustPreferencesACB");
      console.log("Number starts at: " + calcNumber);

      function getNumberFromCategoriesCB(item) {
        if (item in this.selectedCategories) {
          calcNumber =+ Math.pow(2, this.category.indexOf(item));
          console.log("Number now at: " + calcNumber);
        }
      }
      function getNumberFromFlagsCB(item) {
        if (item in this.selectedFlags) {
          calcNumber =+ Math.pow(2, this.flags.indexOf(item) + 6);
          console.log("Number now at: " + calcNumber);
        }
      }

      this.category.forEach(getNumberFromCategoriesCB.bind(this));
      this.flags.forEach(getNumberFromFlagsCB.bind(this));

      console.log("Calculated preference number: " + calcNumber);
      console.log("Emitting calculated number");

      this.$emit("emitPreferencesACB", calcNumber);
    
    },
    setPreferencesACB() {
      console.log("Calling setPreferencesACB");
      let tempCategories = [];
      let tempFlags = [];
      let number = this.preferences();
      let i = 0;

      console.log("Number needed to be deciphered: " + number);

      debugger;

      while (number != 0) {
        if(Math.pow(2, i) >= number){
          console.log("Current number: " + number);
          if(Math.pow(2, i) == number){
            console.log("Number to subtract: " + Math.pow(2, i));
            addPreferenceAccordingToIndex(i);
            console.log("Stop the while calculation");
            break;
          }
          if(Math.pow(2, i) > number){
            console.log("Number to subtract: " + Math.pow(2, i-1));
            addPreferenceAccordingToIndex(i-1);
            number -= Math.pow(2, i-1);
            i = -1;
          }
        }
        i++;
      }

      debugger;

      this.selectedCategories = tempCategories;
      this.selectedFlags = tempFlags;

      function addPreferenceAccordingToIndex(index) {
        if (index < 6) {
          console.log("Index " + index + " in category is " + category[index]);
          tempCategories = [...tempCategories, category[index]];
        } else {
          console.log("Index " + index - 6 + " in flags is " + flags[index - 6]);
          tempFlags = [...tempFlags, flags[index - 6]];
        }
      }

    },

  },
};
</script>

<style scoped>
.button {
  cursor: pointer;
}
</style>
