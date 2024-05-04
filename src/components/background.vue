<template>
    <div ref="canvasContainer"></div>
</template>
  
<script>
  import * as THREE from 'three';
  
  export default {
    mounted() {
      this.initThree();
    },
    methods: {
      initThree() {
        // Set up the scene
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 50;
  
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.$refs.canvasContainer.appendChild(this.renderer.domElement);
  
        // Create particles
        const particleCount = 500;
        const particles = new Float32Array(particleCount * 3);
        const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
  
        for (let i = 0; i < particleCount * 3; i += 3) {
          particles[i] = Math.random() * 500 - 250;
          particles[i + 1] = Math.random() * 500 - 250;
          particles[i + 2] = Math.random() * 500 - 250;
        }
  
        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));
        
        this.particleSystem = new THREE.Points(particleGeometry, particleMaterial);
        this.scene.add(this.particleSystem);
  
        // Variables for opacity change
        this.opacityDelta = 0.0005;
  
        // Add animation loop
        this.animate();
        
        // Adjust size on window resize
        window.addEventListener('resize', this.onWindowResize);
      },
      animate() {
        requestAnimationFrame(this.animate.bind(this));
  
        // Slow down rotation
        this.particleSystem.rotation.x += 0.001;
        this.particleSystem.rotation.y += 0.001;
  
        // Modify opacity of particles over time
        this.particleSystem.material.opacity += this.opacityDelta;
        if (this.particleSystem.material.opacity > 1 || this.particleSystem.material.opacity < 0) {
          this.opacityDelta *= -1;
        }
  
        this.renderer.render(this.scene, this.camera);
      },
      onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      }
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onWindowResize);
    }
  };
  </script>
  
  <style scoped>
  #canvas-container {
    width: 100%;
    height: 100%;
  }
  </style>
  