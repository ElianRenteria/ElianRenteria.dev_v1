<template>
  <div class="container" :class="{ 'collapsed': isSmallViewport }">
    <div class="sidebar-toggle" v-if="isSmallViewport">
      <div class="tutorial_menu_button"><i class="pi pi-book" @click="toggleSidebar($event)"></i></div>
    </div>

    <div class="sidebar_menu" :class="{ 'collapsed': isSmallViewport }">
      <ul class="filter-menu">
        <li v-for="item in expandedMenuItems" :key="item.label" @click="filterTutorials(item.label)">
          <p>{{ item.label }}</p>
        </li>
      </ul>
    </div>

    <div class="tutorials-grid">
      <Loading v-if="isLoading" />
      <ul class="grid-container">
        <li v-for="tutorial in filteredTutorials" :key="tutorial.id">
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
            <template #footer>
              <Button label="Start" severity="info" outlined rounded @click="openModal(tutorial)"/>
            </template>
          </Card>
        </li>
      </ul>
    </div>
    <Menu ref="sidebarMenu" id="sidebar_menu" :model="popupMenuItems" :popup="true" />
    <Modal :showModal="showModal" :tutorial="selectedTutorial" @close="closeModal" />
  </div>
</template>

<script>
import Card from 'primevue/card';
import Loading from './LoadingProjects.vue';
import Button from 'primevue/button';
import Modal from './tutorial_modal.vue';


export default {
  name: 'Tutorials',
  components: {
    Card,
    Loading,
    Button,
    Modal
  },
  data() {
    return {
      isSmallViewport: false,
      isLoading: true,
      tutorials: [], // Initialize the tutorials array
      menuItems: [
        { label: 'All', filter: '' },
        { label: 'Beginner', filter: 'Beginner' },
        { label: 'Intermediate', filter: 'Intermediate' },
        { label: 'Advanced', filter: 'Advanced' },
        { label: 'Python', filter: 'Python' },
        { label: 'Java', filter: 'Java' },
      ],
      expandedMenuItems: [
        { label: 'All', filter: '' },
        { label: 'Beginner', filter: 'Beginner' },
        { label: 'Intermediate', filter: 'Intermediate' },
        { label: 'Advanced', filter: 'Advanced' },
        { label: 'Python', filter: 'Python' },
        { label: 'Java', filter: 'Java' },
        { label: 'Web', filter: 'Web' },
        { label: 'Networking', filter: 'Networking' },
        { label: 'Cloud', filter: 'Cloud' },
        { label: 'AI', filter: 'AI' },
      ],
      selectedMenuItem: 'All',
      showModal: false,
      selectedTutorial: null
    };
  },
  computed: {
    popupMenuItems() {
      return this.menuItems.map(item => ({
        label: item.label,
        command: () => this.filterTutorials(item.label)
      }));
    },
    filteredTutorials() {
      if (this.selectedMenuItem === 'All') {
        return this.tutorials;
      } else {
        return this.tutorials.filter(tutorial => tutorial.languages.includes(this.selectedMenuItem));
      }
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
        const response = await fetch('https://elianrenteria.net:8066/tutorials');
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
    },
    filterTutorials(menuItemLabel) {
      this.selectedMenuItem = menuItemLabel;
    },
    openModal(tutorial) {
      this.selectedTutorial = tutorial;
      this.showModal = true;
    },
    closeModal() {
      this.selectedTutorial = null;
      this.showModal = false;
    }
  }
};
</script>

<style scoped>
    .sidebar_menu {
        min-width: 250px;
        background-color: #333333cc;
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
        background-color: #9292921e;
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
    font-weight: 400;
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
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); 
  grid-gap: 20px;
  list-style: none;
  padding-top: 0%;
  padding-left: 3%;
  padding-right: 3%;
  padding-bottom: 0%;
  overflow: auto !important;
}

.p-card-title {
  font-family: 'Roboto', sans-serif !important;
  font-size: calc(16px + (14 - 12) * ((100vw - 300px) / (1600 - 300)));
  height: 50px;
}
.p-card-content {
  font-family: 'Roboto', sans-serif !important;
  font-size: calc(8px + (14 - 12) * ((100vw - 300px) / (1600 - 300)));
  font-weight: 200 !important;
}
.p-card-subtitle {
  font-family: 'Roboto', sans-serif !important;
  font-size: calc(10px + (14 - 12) * ((100vw - 300px) / (1600 - 300))); 
  font-weight: 200 !important;
}
.p-card-body {
  height: 100%;
}
.projects-grid {
  margin: 0 auto;
  padding: 0%;
  width: 100%;
  height: 100%;
}
.p-card{
  overflow: hidden !important;
  background-color: #ffffffe1;
  color: #000000;
  height: 400px;
}
.card_image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.p-card.p-component {
  height: 100%;
  padding: 0%;
  margin: 0%;
  cursor: default;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; 
}

.modal {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 80%; 
  max-height: 80%; 
  overflow-y: auto; 
  z-index: 99999;
}
</style>
  