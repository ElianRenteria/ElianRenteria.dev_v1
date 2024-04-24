<template>
    <Card>
        <template #title>
            <h1 class="p-card-title">Contact</h1>
        </template>
        <template #content>
            <h5>Email:</h5>
            <p>elianrenteriadevelopment@gmail.com</p>
            <h5>Phone:</h5>
            <p>+1 909-314-3799</p>
            <h5>Social Media:</h5>
            <div class="social-links">
                <a href="https://linkedin.com/in/elian-renteria-5a467b29b" target="_blank"><i class="pi pi-linkedin" style="font-size: 2.5rem"></i></a>
                <a href="https://github.com/elianrenteria" target="_blank"><i class="pi pi-github" style="font-size: 2.5rem"></i></a>
            </div>
        </template>
    </Card>
  </template>
  
  <script>
    import Card from 'primevue/card';
    export default {
        name: 'contact',
        components: {
        Card
        }
    };
  </script>
  
  <style scoped>
  .contact {
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    font-family: Roboto, sans-serif !important;
    font-weight: 300;
  }
  
  .contact-card {
    max-width:  85%;
    height: fit-content;
    text-align: center;
    margin: 0 auto;
  }
  .social-links {
    width: 100%;
    display: flex;
    flex-direction: row !important;
    justify-content: space-evenly;
    align-items: end;
    margin-top: 20px;
  }
  .social-links a {
    margin-right: 10px;
    color: #333;
    font-size: 24px;
    padding: 0%;
    margin: 0%;
  }
  
  .social-links a:hover {
    color: #fbbf24;
  }
  </style>
  