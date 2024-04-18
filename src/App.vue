<template>
  <div class="container">
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

export default {
  name: 'App',
  components: {
    Loading,
    NavBar,
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
    /*setTimeout(() => {
      this.initCausticsAnimation();
    }, 4300);*/
  },
  methods: {
    fadeInContent() {
      const content = document.querySelector('.content');
      content.classList.add('fade-in');
    },
    /*initCausticsAnimation() {
      const canvas = this.$refs.causticsCanvas;
      const ctx = canvas.getContext('2d');

      if (!canvas || !ctx) {
        console.error('Canvas or 2D context is not available.');
        return;
      }

      const width = canvas.width = window.innerWidth;
      const height = canvas.height = window.innerHeight;
      const batchSize = 5;

      let time = 0;
      let lastMouseX = 0;
      let lastMouseY = 0;
      let lastTimestamp = 0;

      const drawCaustics = () => {
        ctx.clearRect(0, 0, width, height);

        for (let x = 0; x < width; x += batchSize) {
          for (let y = 0; y < height; y += batchSize) {
            const displacementX = Math.sin(x / 50 + time * 3);
            const displacementY = Math.cos(y / 50 + time * 3);
            const waveEffect = Math.sin(x / 10 + displacementX + time) * Math.cos(y / 10 + displacementY + time);
            const waveThickness = Math.abs(Math.sin(x / 15 + time * 3) * Math.cos(y / 15 + time * 2) * 30 + Math.random() * 15);
            const brightness = Math.floor((waveEffect + 1) * 30);
            if (Math.random() >= .8) {
              ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
              ctx.fillRect(x, y, batchSize, batchSize);
            }
          }
        }

        time += .06;

        requestAnimationFrame(drawCaustics);
      };

      canvas.addEventListener('mousemove', (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const currentTime = Date.now();
        const deltaTime = currentTime - lastTimestamp;
        const velocityX = Math.abs(mouseX - lastMouseX) / deltaTime;
        const velocityY = Math.abs(mouseY - lastMouseY) / deltaTime;
        const velocity = Math.sqrt(velocityX * velocityX + velocityY * velocityY);

        const rippleSize = Math.min(velocity * 50, 120); // Adjust multiplier for ripple size

        lastMouseX = mouseX;
        lastMouseY = mouseY;
        lastTimestamp = currentTime;
        drawRipple(mouseX, mouseY, rippleSize);
      });

      const drawRipple = (x, y, size) => {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fill();
        ctx.closePath();
      };

      drawCaustics();
    }*/
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
</style>
