<template>
  <div class="container">
    <div class="Background">
        <Background />
    </div>
    <Loading v-if="isLoading" />
    <div class="content" v-else>
      <canvas ref="causticsCanvas" class="caustics"></canvas>
      <NavBar />
      <div class="content_body" :sytle="getContentBodyStyles">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>

import Loading from './components/Loading.vue';
import NavBar from './components/NavBar.vue';
import Background from './components/background.vue';

export default {
  name: 'App',
  components: {
    Loading,
    NavBar,
    Background
  },
  data() {
    return {
      isLoading: true
    };
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 4000); 
    setTimeout(() => {
      this.fadeInContent();
    }, 4300);
  },
  methods: {
    fadeInContent() {
      const content = document.querySelector('.content');
      content.classList.add('fade-in');
    }
  },
  computed: {
    getContentBodyStyles() {
      const isResumeRoute = this.$route.name === 'resume';
      
      return {
        border: '.1px solid #B1B1B1',
        borderRadius: '10px',
        margin: '2%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        height: '83%',
        overflow: isResumeRoute ? 'scroll' : 'hidden !important'
      };
    }
  },
  watch: {
    '$route'(to, from) {
      console.log('Route changed from', from.name, 'to', to.name);
      console.log('Re-evaluating styles...');
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;  .content_body{
    border-radius: 10px;
    margin: 2%;
    display: flex;
    justify-content: center;
    align-items:start;
    height: 83%;
    overflow:-moz-hidden-unscrollable;
  }
  width: 100%;
}
.content {
  opacity: 0;
  transition: opacity 2s ease-in; 
  font-family: 'Roboto', sans-serif !important;
  font-weight: 300 !important;
  text-align: center;
  height: 100%;
}

.content.fade-in {
  opacity: 1;
}
.caustics {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; 
  z-index: -1;
  opacity: .3;
}
.Background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -9999; /* Ensure background is behind content */
}
</style>
