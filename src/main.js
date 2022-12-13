import { createApp } from 'vue'
import App from './views/App.vue'
import router from './router'

import './assets/main.css'
import secondsModel from './model/secondsModel'
const myModel = new secondsModel();
window.myModel = myModel;
const app = createApp(App, myModel)

app.use(router)

app.mount('#app')

export{myModel}