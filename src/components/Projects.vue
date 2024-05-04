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
        // Retrieve GitHub access token from Cloudflare Worker endpoint
        const envResponse = await axios.get('https://hello-world-weathered-mountain-8ec2.bravefrontier5913.workers.dev/');
        const githubToken = envResponse.data.githubToken;
        // Fetch repositories using the retrieved GitHub access token
        let allRepos = [];
        let page = 1;
        let response;
        do {
          response = await axios.get(`https://api.github.com/users/ElianRenteria/repos?page=${page}&per_page=100`, {
            headers: {
              Authorization: `Bearer ${githubToken}`
            }
          });
          allRepos = [...allRepos, ...response.data];
          page++;
        } while (response.data.length === 100);

        // Fetch languages for each repository
        await Promise.all(allRepos.map(async repo => {
          const languagesResponse = await axios.get(repo.languages_url, {headers: {Authorization: `Bearer ${githubToken}`}});
          repo.languages = Object.keys(languagesResponse.data);
        }));

        this.projects = allRepos;
        this.isLoading = false;
      } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        // Handle error
        this.isLoading = false;
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
  overflow: auto !important;
}

/* Adjust title font size dynamically */
.p-card-title {
  font-family: 'Roboto', sans-serif !important;
  font-size: calc(16px + (14 - 12) * ((100vw - 300px) / (1600 - 300))); /* Adjust the min and max font size as needed */
}
.p-card-content {
  font-family: 'Roboto', sans-serif !important;
  font-size: calc(8px + (14 - 12) * ((100vw - 300px) / (1600 - 300))); /* Adjust the min and max font size as needed */
  font-weight: 200 !important;
}
p-card-subtitle {
  font-family: 'Roboto', sans-serif !important;
  font-size: calc(10px + (14 - 12) * ((100vw - 300px) / (1600 - 300))); /* Adjust the min and max font size as needed */
  font-weight: 200 !important;
}
.projects-grid {
  margin: 0 auto;
  padding: 0%;
  width: 100%;
  height: 100%;
}
.p-card{
  overflow: hidden !important;
  background-color: #1b1b1bc0;
}

</style>
