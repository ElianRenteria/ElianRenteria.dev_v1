import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue';
import Projects from '../components/Projects.vue';
import Tutorials from '../components/Tutorials.vue';
import Resume from '../components/Resume.vue';
import Contact from '../components/Contact.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/projects', component: Projects },
    { path: '/tutorials', component: Tutorials },
    { path: '/resume', component: Resume },
    { path: '/contact', component: Contact }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
