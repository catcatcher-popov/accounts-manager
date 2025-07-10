import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persistedstate';
import Antd from 'ant-design-vue';

import App from './App.vue';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersist);
app.use(pinia);

app.use(Antd);

app.mount('#app');
