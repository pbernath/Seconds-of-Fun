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
          @change="adjustCategoriesACB(item)"
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
          @change="adjustBlacklistACB(item)"
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
    "addCategoryACB",
    "removeCategoryACB",
    "addBlacklistACB",
    "removeBlacklistACB",
  ],
  data() {
    return {
      settings: false,
      msg: "Waiting for a joke...",
      category: ["Programming", "Misc", "Dark", "Pun", "Spooky", "Christmas"],
      flags: ["NSFW", "Religious", "Political", "Racist", "Sexist", "Explicit"],
      selectedCategories: this.jokePreferences.category,
      selectedFlags: this.jokePreferences.blacklist,
    };
  },
  computed: {
    joke() {
      this.$emit("setJokeOnLoadACB");
      return this.jokeData.data.joke;
    },
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
      this.settings = !this.settings;
      this.setJokePreferencesACB();
    },
    getJokeACB() {
      this.$emit("getNewJokeACB");
    },
    addToFavoriteJokesACB() {
      this.$emit("sendJokeToFavoriteACB");
    },
    addCategoryToPreferencesACB(category) {
      this.$emit("addCategoryACB", category);
    },
    removeCategoryFromPreferencesACB(category) {
      this.$emit("removeCategoryACB", category);
    },
    addBlacklistToPreferencesACB(flag) {
      this.$emit("addBlacklistACB", flag);
    },
    removeBlacklistFromPreferencesACB(flag) {
      this.$emit("removeBlacklistACB", flag);
    },
    adjustCategoriesACB(item) {
      if (this.selectedCategories.find((listItem) => {return listItem == item})) {
        this.addCategoryToPreferencesACB(item);
      } else {
        this.removeCategoryFromPreferencesACB(item);
      }
    },
    adjustBlacklistACB(item) {
      if (this.selectedFlags.find((listItem) => {return listItem == item})) {
        this.addBlacklistToPreferencesACB(item);
      } else {
        this.removeBlacklistFromPreferencesACB(item);
      }
    },
    setJokePreferencesACB() {
      this.selectedCategories = this.jokePreferences.category;
      this.selectedFlags = this.jokePreferences.blacklist;
    },
  },
};
</script>

<style scoped>
.button {
  cursor: pointer;
}
</style>
