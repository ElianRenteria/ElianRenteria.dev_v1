<script>
import axios from 'axios';
import Card from 'primevue/card';
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
    Card
  },
  mounted() {
    // Fetch GitHub projects
    this.fetchProjects();
  },
  methods: {
    async fetchProjects() {
      try {
        let allRepos = [];
        let page = 1;
        let response;

        // Fetch repositories
        do {
          response = await axios.get(`https://api.github.com/users/ElianRenteria/repos?page=${page}&per_page=100`,{
            headers: {
              Authorization: `Bearer ${process.env.VUE_APP_GITHUB_TOKEN}`
            }
          });
          allRepos = [...allRepos, ...response.data];
          page++;
        } while (response.data.length === 100);

        // Fetch languages for each repository
        await Promise.all(allRepos.map(async repo => {
          const languagesResponse = await axios.get(repo.languages_url);
          repo.languages = Object.keys(languagesResponse.data);
        }));

        this.projects = allRepos;
        this.isLoading = false;
      } catch (error) {
        console.error('Error fetching GitHub projects:', error);
      }
    }
  }
};
</script>

<template>
  <div class="projects-grid">
    <h2>My Projects</h2>
    <Loading v-if="isLoading" />
    <ul class="grid-container">
      <li v-for="project in projects" :key="project.id">
        <Card>
          <template #title>
            <a class="p-card-title" :href="project.html_url" target="_blank">{{ project.name }}</a>
          </template>
          <template #subtitle>
            <p>{{ project.languages.join(', ') }}</p>
          </template>
          <template #content>
            <p>{{ project.description }}</p>
          </template>
        </Card>
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
  white-space: nowrap; /* Prevent title from wrapping */
  overflow: hidden; /* Hide overflow */
  text-overflow: ellipsis; /* Display ellipsis for overflow */
}

a:hover {
  color: #fbbf24;
}

p {
  margin-top: 5px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Adjust the column width as needed */
  grid-gap: 20px; /* Adjust the gap between grid items */
  list-style: none;
  padding: 0;
}

/* Adjust title font size dynamically */
.p-card-title {
  font-size: calc(12px + (14 - 12) * ((100vw - 300px) / (1600 - 300))); /* Adjust the min and max font size as needed */
}
.projects-grid {
  margin: 0 auto;
  padding: 0%;
  width: 100%;
  height: 100%;
}
.p-card{
  overflow: hidden !important;
}
</style>
