import { createApp } from 'vue';
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'; 
import App from './App.vue';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-dark-amber/theme.css';
import 'primeicons/primeicons.css';
import Ripple from 'primevue/ripple';

// Import your components for routes
import Home from './components/Home.vue';
import Resume from './components/Resume.vue';
import Projects from './components/Projects.vue';
import Contact from './components/Contact.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/Resume', component: Resume },
    { path: '/projects', component: Projects },
    { path: '/contact', component: Contact }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;

const app = createApp(App);

app.use(router); 
app.use(PrimeVue, { ripple: true });
app.directive('ripple', Ripple);

app.mount('#app');
