<template>
    <transition name="modal">
      <div class="modal-overlay" v-if="showModal">
        <div class="modal">
          <div class="modal-header">
            <Button label="close" @click="closeModal" severity="danger" rounded />
            <div class="modal-header-title">
                <h2 class="modal-title">{{ tutorial.title }}</h2>
            </div>
          </div>
          <div class="modal-body">
            <ul class="steps-list">
              <li v-for="(step, index) in tutorial.steps" :key="index">
                <h3>{{ step.title }}</h3>
                <p>{{ step.description }}</p>
                <pre>{{ step.codeSnippet }}</pre>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  import Button from 'primevue/button';
  
  export default {
    components: {
      Button
    },
    props: {
      showModal: Boolean,
      tutorial: Object
    },
    methods: {
      closeModal() {
        this.$emit('close');
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    padding: 0%;
    margin: 0%;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background-color: #353535e7;
    padding: 20px;
    border-radius: 5px;
    width: calc(100% - 40px);
    height: calc(100% - 40px); 
    max-width: none; 
    max-height: none; 
    overflow-y: auto; 
    transition: opacity 0.3s ease; 
  }
  
  .modal-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end; 
  }
  
  .modal-title {
    margin: 0;
  }
  
  .modal-body {
    margin-top: 10px;
  }
  

  .modal-body h3 {
    margin-bottom: 5px;
  }
  
  .steps-list {
    list-style: none; 
    padding: 0%;
    margin: 0%;
  }
  
  .modal-body pre {
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
    overflow-x: auto;
  }
  
  /* Transition class */
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .modal-enter,
  .modal-leave-to{
    opacity: 0;
  }

  .modal-header-title {
    width: 100%;
    flex: 1;
    justify-content: center;
  }
  pre{
    color: black;
  }
  </style>
  
  
  