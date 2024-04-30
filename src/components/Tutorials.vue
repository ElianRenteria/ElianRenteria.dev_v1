<template>
    <div class="container" :class="{ 'collapsed': isSmallViewport }">
      <div class="sidebar-toggle" v-if="isSmallViewport">
        <div class="tutorial_menu_button"><i class="pi pi-book" @click="toggleSidebar($event)"></i></div>
      </div>
  
      <div class="sidebar_menu" :class="{ 'collapsed': isSmallViewport }">
        <ul class="filter-menu">
          <li v-for="item in expandedMenuItems" :key="item.label">
            <p>{{ item.label }}</p>
          </li>
        </ul>
      </div>

      <div class="tutorials-grid">
        <Loading v-if="isLoading" />
        <ul class="grid-container">
          <li v-for="tutorial in tutorials" :key="tutorial.id">
              <Card>
                <template #header>
                  <img class="card_image" alt="user header" :src="tutorial.image" />
                </template>
                <template #title>
                    {{ tutorial.title }}
                </template>
                <template #subtitle>
                    {{ tutorial.languages.join(', ') }}
                </template>
                <template #content>
                    <p class="m-0">{{ tutorial.description }}</p>
                </template>
                <template #footer>
                  <Button class="p-button-rounded">View Tutorial</Button>
                </template>
              </Card>
          </li>
        </ul>
      </div>
  
      <Menu ref="sidebarMenu" id="sidebar_menu" :model="popupMenuItems" :popup="true" />
    </div>
</template>

<script>
  import Card from 'primevue/card';
  import Loading from './LoadingProjects.vue';
  
  export default {
    name: 'Tutorials',
    components: {
      Card,
      Loading
    },
    data() {
      return {
        isSmallViewport: false,
        isLoading: true,
        tutorials: [], // Initialize the tutorials array
        menuItems: [
          { label: 'New', to: '/' },
          { label: 'Beginner', to: '/projects' },
          { label: 'Intermediate', to: '/tutorials' },
          { label: 'Advanced', to: '/resume' }
        ],
        expandedMenuItems: [
          { label: 'New', to: '/' },
          { label: 'Beginner', to: '/projects' },
          { label: 'Intermediate', to: '/tutorials' },
          { label: 'Advanced', to: '/resume' },
          { label: 'Python', to: '/' },
          { label: 'Java', to: '/projects' },
          { label: 'Web', to: '/tutorials' },
          { label: 'networking', to: '/resume' },
          { label: 'database', to: '/' },
          { label: 'cloud', to: '/projects' },
          { label: 'AI', to: '/tutorials' },
          { label: 'Git', to: '/resume' }
        ]
      };
    },
    computed: {
      popupMenuItems() {
        return this.menuItems.map(item => ({
          label: item.label,
          command: () => this.$router.push(item.to)
        }));
      }
    },
    mounted() {
      window.addEventListener('resize', this.checkViewportSize);
      this.checkViewportSize();
      
      // Load tutorials when the component is mounted
      this.loadTutorials();
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.checkViewportSize);
    },
    methods: {
      checkViewportSize() {
        this.isSmallViewport = window.innerWidth < 768;
      },
      toggleSidebar(event) {
        if (this.isSmallViewport) {
          event.preventDefault();
          this.$refs.sidebarMenu.toggle(event);
        }
      },
      async loadTutorials() {
        try {
          const response = await fetch('http://192.168.0.206:3000/tutorials');
          if (!response.ok) {
            throw new Error('Failed to fetch tutorials');
          }
          const tutorials = await response.json();
          this.tutorials = tutorials;
          this.isLoading = false;
        } catch (error) {
          console.error('Error loading tutorials:', error);
          this.isLoading = false;
        }
      }
    }
  };
</script>

<style scoped>
    .sidebar_menu {
        min-width: 250px;
        background-color: #333;
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        padding: 0;
        margin: 0;
        transition: width 0.3s ease;
        overflow:auto;
    }
    .tutorials-grid {
        margin: 0 auto;
        padding: 0%;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: #929292;
    }
   .tutorial_menu_button {
    padding: 0%;
    padding-top: 2%;
    padding-left: 3%;
    padding-right: 3%;
    margin: 0%;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
   }
  .container {
    height: calc(100vh - 81px);
    padding: 0;
    margin: 0;
    margin-top: 81px;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
  }
  .container .collapsed{
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }
  
  .sidebar_menu.collapsed {
    width: 0;
    height: 0;
  }
  
  .sidebar-toggle {
    display: none;
    cursor: pointer;
    color: #fff;
    font-size: 1.5rem;
    margin-left: auto;
    padding: 0.5rem;
    width: 100%;
  }
  
  @media screen and (max-width: 767px) {
    .sidebar-toggle {
      display: block;
    }
  }
  .filter-menu {
    list-style: none;
    padding: 1rem;
    margin: 0;
    margin-top: 8%;
    margin-bottom: 8%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    width: 100%;
  }
  .filter-menu li {
    text-decoration: none;
    color: #fff;
    padding: 0%;
    margin: 0%;
    font-weight: 100;
  }
  router-link {
    text-decoration: none;
    color: #fff;
    padding: 0%;
    margin: 0%;
  }
  li:hover {
    cursor: pointer;
    color: #fbbf24;
  }
  .sidebar_menu.collapsed .filter-menu{
    visibility: hidden;
  }
  .grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); /* Adjust the column width as needed */
  grid-gap: 20px; /* Adjust the gap between grid items */
  list-style: none;
  padding-top: 0%;
  padding-left: 3%;
  padding-right: 3%;
  padding-bottom: 0%;
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
.p-card-subtitle {
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
  background-color: #ffffff;
  color: #000000;
}
.card_image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>
  