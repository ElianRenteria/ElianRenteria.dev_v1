<template>
    <div class="loading">
      <div class="title">
        <span class="name" ref="nameText">Elian Renteria</span> <span class="portfolio" ref="portfolioText">Portfolio</span>
      </div>
    </div>
  </template>
    
  <script>
  export default {
    name: 'Loading',
    mounted() {
      setTimeout(() => {
        this.$refs.nameText.classList.add('fade-out');
      }, 1500); 
  
      setTimeout(() => {
        this.$refs.portfolioText.classList.add('fade-out');
      }, 2500); 
    }
  }
  </script>
    
  <style scoped>
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(40, 40, 40, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .title {
    font-size: 28px; 
    text-align: center;
    font-family: 'Roboto', sans-serif !important; 
    font-weight: 100 !important;
  }
  
  .name {
    opacity: 0.8; 
    transition: opacity 1s; 
    font-weight: 300;
  }
  
  .portfolio {
    opacity: 0.8; 
    transition: opacity 1s; 
    font-weight: 100;
  }
  
  .fade-out {
    opacity: 0 !important; 
  }
  </style>
  