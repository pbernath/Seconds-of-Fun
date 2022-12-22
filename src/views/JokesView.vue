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
      <tr class="check-box-text" v-for="item in category" :key="item">
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
      <tr class="check-box-text" v-for="item in flags" :key="item">
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
    <div class="flex-item">
        <img
          src="../assets/joke-500.png"
          @click="changeToSettingsACB"
          class="pointer"
        />
      </div>
  </div>

  <div v-if="!settings" class="jokes_page">
    <div class="joke">
      <h3 v-if="joke != msg" class="jokes_page_msg">{{ joke }}</h3>
      <LoadingGIF class="jokes_page_msg" v-else />
    </div>
    <div class="jokeButtons">
      <div class="flex-item-joke-buttons">
        <img
          src="../assets/right-500.png"
          @click="getJokeACB"
          class="pointer"
        />
      </div>
      <div class="flex-item-joke-buttons" v-if="loggedIn && !jokeSaved" >
        <img
          src="../assets/like-500-false.png"
          @click="addToFavoriteJokesACB"
          class="pointer"
        />
      </div>
      <div  class="flex-item-joke-buttons" v-if="loggedIn && jokeSaved">
        <img
          src="../assets/like-500-true.png"
          @click="removeFromFavoriteJokesACB"
          class="pointer"
        />
      </div>
      <div v-if="loggedIn" class="flex-item-joke-buttons">
        <img
          src="../assets/settings-500.png"
          @click="changeToSettingsACB"
          class="pointer"
        />
        <p v-if="!loggedIn">
          Log in to save the joke and to change the joke preferences!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["jokeData", "loading", "loggedIn", "jokePreferences", "jokeSaved"],
  emits: [
    "getNewJokeACB",
    "setJokeOnLoadACB",
    "sendJokeToFavoriteACB",
    "emitPreferencesACB",
    "removeJokeFromFavoriteACB",
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

    preferences() {
      return this.jokePreferences;
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
    changeToSettingsACB() {
      this.setPreferencesACB();
      this.settings = !this.settings;
    },
    getJokeACB() {
      this.$emit("getNewJokeACB");
    },
    addToFavoriteJokesACB() {
      this.$emit("sendJokeToFavoriteACB");
    },
    removeFromFavoriteJokesACB() {
      this.$emit("removeJokeFromFavoriteACB");
    },
    adjustPreferencesACB() {
      let calcNumber = 0;

      function getNumberFromCategoriesCB(item) {
        function comparisonCB(sCategory) {
          return sCategory == item;
        }

        if (this.selectedCategories.find(comparisonCB)) {
          calcNumber = calcNumber + Math.pow(2, this.category.indexOf(item));
        }
      }
      function getNumberFromFlagsCB(item) {
        function comparisonCB(sFlag) {
          return sFlag == item;
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
        if (Math.pow(2, i) >= number) {
          if (Math.pow(2, i) == number) {
            addPreferenceAccordingToIndex(i);
            break;
          }
          if (Math.pow(2, i) > number) {
            addPreferenceAccordingToIndex(i - 1);
            number -= Math.pow(2, i - 1);
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
.jokeButtons {
  height: auto;
  display: flex;
  flex-direction:row;

}
.joke {
  flex: 1;
  width: 60vh;
  height: 25vh;
  align-self: center;
  overflow-wrap: break-word;
  overflow-y: auto;
}
.jokes_page_msg{

  color: white;
}
.pointer {
  cursor: pointer;
}
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #00bd7e; 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #00bd7e; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #00bd7e; 
}

input[type="checkbox"] {
  appearance: none;
}

.flex-item-joke-buttons{
  width: 5em;
  height: 5em;
}
input[type="checkbox"]:before {
  content: "";
  display: inline-block;
  width: 30px;
  height: 30px;
  margin: 10px;
  border: 2px solid #333;
  border-radius: 25%;
  vertical-align: middle;
  transition: all 0.6s ease-in-out;
}

input[type="checkbox"]:checked:before {
  content: "";
  background: #333;
  border-color: #333;
}

input[type="checkbox"]:checked:after {
  content: "";
  position: absolute;
  top: 17px;
  left: 17px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #00bd7e;
}

input[type="checkbox"]:focus:before {
  box-shadow: 0 0 0 3px #00bd7e;
  transition: 0.2s ease-out;
}

input[type="checkbox"]:hover:before {
  border-color: #00bd7e;
}

input[type="checkbox"]:active:before {
  transform: scale(0.95);
  transition: 0.2s ease-in-out;
}

.check-box-text {
  width: fit-content;
  font-size: 19px;
}
</style>
