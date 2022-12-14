import { createApp } from 'vue'
import VueRoot from './views/VueRoot.vue'
import router from './router'

import './assets/main.css'

const app = createApp(VueRoot)

app.use(router)

app.mount('#app')
