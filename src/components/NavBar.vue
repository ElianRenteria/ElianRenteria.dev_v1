<template>
  <nav class="navbar">
    <div class="container">
      <div class="brand">
        <img src="../assets/images/logo.png" alt="Logo Image" class="logo">
        <div class="nameTitle">
          <p id="name">{{ name }}</p>
          <p id="jobTitle">{{ jobTitle }}</p>
        </div>
      </div>

      <!-- Show popup menu icon for small screens -->
      <div class="popup-menu" @click="toggleMenu" v-if="isSmallViewport">
        <i class="pi pi-bars"></i>
      </div>

      <!-- PrimeVue popup menu for navigation links -->
      <div v-else>
        <ul class="nav-links">
          <li v-for="(item, index) in menuItems" :key="index">
            <router-link :to="item.to">{{ item.label }}</router-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- PrimeVue popup menu for small screens -->
    <Menu ref="menu" id="overlay_menu" :model="popupMenuItems" :popup="true" />
  </nav>
</template>

<script>
import { ref } from "vue";
const menu = ref();
export default {
  name: 'NavBar',
  data() {
    return {
      name: 'Elian Renteria',
      jobTitle: 'Software Engineer',
      isSmallViewport: false,
      menuItems: [
        { label: 'Home', to: '/' },
        { label: 'Projects', to: '/projects' },
        { label: 'Tutorials', to: '/tutorials' },
        { label: 'Resume', to: '/resume' },
        { label: 'Contact', to: '/contact' }
      ]
    }
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
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkViewportSize);
  },
  methods: {
    toggleMenu(event) {
      if (this.$refs.menu && this.$refs.menu.toggle) {
        this.$refs.menu.toggle(event);
      }
    },
    checkViewportSize() {
      this.isSmallViewport = window.innerWidth < 768;
    },
    async loadTutorials() {
    try {
        const response = await fetch('../tutorials'); // Adjust the path to your tutorial JSON files
        const tutorials = await response.json();
        this.tutorials = tutorials; // Populate the tutorials array with the fetched data
        this.isLoading = false; // Set isLoading to false after loading tutorials
      } catch (error) {
        console.error('Error loading tutorials:', error);
        this.isLoading = false; // Set isLoading to false in case of error
      }
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: rgba(34, 34, 34, .6);
  color: #fff;
  padding: 1rem 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.brand {
  display: flex;
  align-items: center;
}

.logo {
  width: 50px;
  height: auto;
  font-size: 12px;
}

.nameTitle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.nameTitle #name {
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 24px;
  margin: 0;
  padding: 0;
}

.nameTitle #jobTitle {
  font-family: 'Roboto', sans-serif;
  font-weight: 200;
  font-size: 14px;
  margin: 0;
  padding: 0;
}

.popup-menu {
  display: none;
  cursor: pointer;
  color: #fff;
  font-size: 1.5rem;
  margin-left: auto;
  padding: 0.5rem;
}

.nav-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.nav-links li {
  margin-right: 1rem;
}

.nav-links li:last-child {
  margin-right: 0;
}

.nav-links a {
  text-decoration: none;
  color: inherit;
  transition: color 0.3s ease;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
}

.nav-links a:hover {
  color: #fbbf24;
}

.router-link-active {
  text-decoration: none;
  color: #fbbf24;
}

@media screen and (max-width: 767px) {
  .popup-menu {
    display: block;
  }
}
</style>
