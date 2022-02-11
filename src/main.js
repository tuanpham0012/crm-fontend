import { createApp } from 'vue'

import App from './App.vue'

import router from './router/index';

import store from './stores/store';

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
