/*
    * main.js is the starting point of the Vue app.
    * It creates the Vue instance and mounts it to the DOM.
    * It also imports the router and passes it to the Vue instance in main.js.
*/

import { createApp } from 'vue'
import VueRoot from './views/VueRoot.vue'
import router from './router'

import './assets/main.css'

const app = createApp(VueRoot)

app.use(router)

app.mount('#app')
