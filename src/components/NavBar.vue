<script>
  export default {
    name: 'NavBar',
    data() {
      return {
        name: 'Elian Renteria',
        jobTitle: 'Software Engineer'
      }
    }
  }
</script>


<template>
    <nav class="navbar">
      <div class="container">
        <div class="brand">
            <img src="../assets/images/logo.png" alt="Logo Image" class="logo">
            <div class="nameTitle">
                <p id="name">Elian Renteria</p>
                <p id="jobTitle">Software Engineer</p>
            </div>
        </div>
        <ul class="nav-links">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/projects">Projects</router-link></li>
          <li><router-link to="/Resume">Resume</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
        </ul>
      </div>
    </nav>
</template>
  
<style scoped>
  .nameTitle{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  }
  .nameTitle #name{
      font-family: 'Roboto', sans-serif !important;
      font-weight: 300 !important;
      font-size: 24px !important;
      margin: 0%;
      padding: 0%;
  }
  .nameTitle #jobTitle{
      font-family: 'Roboto', sans-serif !important;
      font-weight: 200 !important;
      font-size: 14px !important;
      margin: 0%;
      padding: 0%;
  }
  .navbar {
    background-color: rgba(34, 34, 34, .6); /* Dark background color */
    color: #fff; /* Light text color */
    padding: 1rem 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Shadow for depth */
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
    font-size: 12;
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
    font-family: 'Roboto', sans-serif !important;
    font-weight: 300 !important;

  }

  .nav-links a:hover {
    color: #fbbf24; 
  }
  .router-link-active {
    text-decoration: none !important;
    color: #fbbf24 !important;
  }
</style>
  