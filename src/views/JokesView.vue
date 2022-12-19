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
          @change="addPreferencesACB"
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
          @change="addPreferencesACB"
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
    "setPreferencesACB",
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
  },
  created() {
    // this.selectedCategories = this.jokePreferences.categories;
    function filterFlags(item) {
      return !this.selectedFlags.includes(item);
    }
    this.selectedFlags = this.jokePreferences.blacklist.filter(filterFlags.bind(this));

  },
  methods: {
    changeToSettingsACB(){
      this.settings = !this.settings;
    },
    getJokeACB() {
      this.$emit("getNewJokeACB");
    },
    addToFavoriteJokesACB() {
      this.$emit("sendJokeToFavoriteACB");
    },

    addPreferencesACB() {
      let invertedFlags = []
      function filterFlags(item) {
          return !this.selectedFlags.includes(item);
        }
      invertedFlags = this.flags.filter(filterFlags.bind(this))

      this.$emit("setPreferencesACB", {categories: this.selectedCategories, blacklist: invertedFlags});
    },
  },
};
</script>

<style scoped>
.button {
  cursor: pointer;
}
</style>
