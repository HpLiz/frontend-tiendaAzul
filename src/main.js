import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import { router } from "./routes/index";
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

const toastOptions = {
    position: POSITION.TOP_CENTER,
    timeout: 3000
}

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).use(Toast, toastOptions).mount('#app')
