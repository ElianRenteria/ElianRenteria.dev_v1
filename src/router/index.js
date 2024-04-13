import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue';
import Resume from '../components/Resume.vue';
import Projects from '../components/Projects.vue';
import Contact from '../components/Contact.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/Resume', component: Resume },
    { path: '/projects', component: Projects },
    { path: '/contact', component: Contact }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
