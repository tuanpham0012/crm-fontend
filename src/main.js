import { createApp } from 'vue'

import App from './App.vue'

import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';


import router from './router/index';

import store from './stores/store';


const app = createApp(App)
app.component('QuillEditor', QuillEditor)
app.use(router)
app.use(store)
app.mount('#app')
