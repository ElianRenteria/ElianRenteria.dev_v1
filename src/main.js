import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-dark-amber/theme.css';
import 'primeicons/primeicons.css';
import Ripple from 'primevue/ripple';
import router from './router/index';
import Menu from 'primevue/menu';

const app = createApp(App);

app.use(router); 
app.use(PrimeVue, { ripple: true });
app.component('Menu', Menu);
app.directive('ripple', Ripple);
app.mount('#app');
