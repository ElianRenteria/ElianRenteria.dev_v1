<template>
    <Card class="resume-card">
      <template #content>
        <div class="image-container" @mouseover="showButton = true" @mouseleave="showButton = false">
          <img src="../assets/images/Elian_Renteria.png" alt="resume" class="resume" />
          <a :href="downloadLink" class="download-button" v-show="showButton" download>
            <i class="pi pi-print"></i> Download
          </a>
        </div>
      </template>
    </Card>
  </template>
  
  <script>
  import Card from 'primevue/card';
  
  export default {
    name: 'resume',
    components: {
      Card,
    },
    data() {
      return {
        showButton: false,
        downloadLink: 'https://drive.google.com/uc?export=download&id=1FJC8rOLGk-q0I6bO8sk9wMsVF930Ptrh',
      };
    },
  };
  </script>
  
  <style scoped>

  .resume-card {
    position: relative;
    width: 50%;
    height: auto;
  }
  
  .image-container {
    position: relative;
    display: inline-block;
  }
  
  .download-button {
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(40, 40, 40, 0.9);
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    color: rgb(255, 255, 255);
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;
    z-index: 1;
  }
  
  .download-button:hover {
    opacity: 0.8;
  }
  
  .resume {
    width: 100%;
    max-height: 100%; 
    object-fit: contain; 
  }
  </style>
  