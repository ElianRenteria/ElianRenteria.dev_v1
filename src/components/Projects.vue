<script>
import axios from 'axios';
const githubToken = require('./github_repo_key.json');
import Loading from './LoadingProjects.vue';

export default {
  name: 'projects',
  data() {
    return {
      isLoading: true,
      projects: []
    };
  },
  components: {
    Loading,
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 4000); 
    setTimeout(() => {
      this.fadeInContent();
    }, 4300);
    // Fetch GitHub projects
    this.fetchProjects();
  },
  methods: {
    fadeInContent() {
      const content = document.querySelector('.content');
      content.classList.add('fade-in');
    },
    async fetchProjects() {
      try {
        let allRepos = [];
        let page = 1;
        let response;
        
        do {
          response = await axios.get(`https://api.github.com/users/ElianRenteria/repos?page=${page}&per_page=100`, {
            headers: {
              Authorization: `Bearer ${githubToken.token}`
            }
          });
          
          allRepos = [...allRepos, ...response.data];
          page++;
        } while (response.data.length === 100);
  
        this.projects = allRepos;
      } catch (error) {
        console.error('Error fetching GitHub projects:', error);
      }
    }
  }
};
</script>



<template>
  <div>
    <h2>My Projects</h2>
    <ul>
      <li v-for="project in projects" :key="project.id">
        <a :href="project.html_url" target="_blank">{{ project.name }}</a>
        <p>{{ project.description }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none; 
  padding: 0; 
}

li {
  margin-bottom: 10px; 
}

a {
  text-decoration: none; 
  color: #ffffff;
}
a:hover {
  color: #fbbf24;
}

p {
  margin-top: 5px; 
}
</style>