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
    <p v-if="jokeSaved">Joke has been saved!</p>
  </div>
</template>

<script>
export default {
  props: ["jokeData", "loading", "loggedIn", "isASavedJoke", "jokePreferences","jokeSaved"],
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
      return this.jokeData.data.joke;
    },

    preferences(){
      return this.jokePreferences;
    }
  },
  created() {
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

      function getNumberFromCategoriesCB(item) {
        function comparisonCB(sCategory){
          return sCategory ==item;
        }

        if (this.selectedCategories.find(comparisonCB)) {
          calcNumber = calcNumber + Math.pow(2, this.category.indexOf(item));
        }
      }
      function getNumberFromFlagsCB(item) {
        function comparisonCB(sFlag){
          return sFlag ==item;
        }
        if (this.selectedFlags.find(comparisonCB)) {
          calcNumber = calcNumber + Math.pow(2, this.flags.indexOf(item) + 6);
        }
      }

      this.category.forEach(getNumberFromCategoriesCB.bind(this));
      this.flags.forEach(getNumberFromFlagsCB.bind(this));

      this.$emit("emitPreferencesACB", calcNumber);
    
    },
    setPreferencesACB() {
      const tempData = this;
      let tempCategories = [];
      let tempFlags = [];
      let number = this.preferences;
      let i = 0;

      while (number != 0) {
        if(Math.pow(2, i) >= number){
          if(Math.pow(2, i) == number){
            addPreferenceAccordingToIndex(i);
            break;
          }
          if(Math.pow(2, i) > number){
            addPreferenceAccordingToIndex(i-1);
            number -= Math.pow(2, i-1);
            i = -1;
          }
        }
        i++;
      }

      this.selectedCategories = tempCategories;
      this.selectedFlags = tempFlags;
      function addPreferenceAccordingToIndex(index) {
        if (index < 6) {
          tempCategories = [...tempCategories, tempData.category[index]];
        } else {
          tempFlags = [...tempFlags, tempData.flags[index - 6]];
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
