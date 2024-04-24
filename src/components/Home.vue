<script>
    import Card from 'primevue/card';
    export default {
        name: '/',
        components: {
            Card
        },
        data() {
            return {
            isWideScreen: false
            };
        },
        mounted() {
            this.checkScreenAspectRatio();
            window.addEventListener('resize', this.checkScreenAspectRatio);
        },
        beforeUnmount() {
            window.removeEventListener('resize', this.checkScreenAspectRatio);
        },
        methods: {
            checkScreenAspectRatio() {
            const aspectRatio = window.innerWidth / window.innerHeight;
            this.isWideScreen = aspectRatio > 1;
            }
        }
    }
</script>

<template>
    <Card class="information">
        <template #title><div class="custom-title">Welcome to My Digital Portfolio</div></template>
        <template #content>
          <div :class="{ 'inner-cards-row': isWideScreen, 'inner-cards-column': !isWideScreen}, information">
            <Card class="inner-card" style="border: none !important">
                <template #content>
                    <img src="../assets/images/me.jpg" alt="Avatar" :class="{'desktop': isWideScreen, 'mobile': !isWideScreen}">
                    <p>Recent Computer Science grad 🎓 | Eager Learner diving into Web & Mobile Development 💻📱 | Dog Lover 🐾 | Aquarium Enthusiast 🐠 | Coding Genius ✨</p>
                </template>
            </Card>
            <Card class="inner-card about" style="border: none !important">
                <template #content class="card_2_content">
                    <p>👋 Hi, I'm Elian</p>
                    <p>👨‍💻 I'm a Full Stack Developer</p>
                    <p>🚀 I use React, Node.js, Express, MongoDB, and more</p>
                    <p>🌐 I build websites and web applications</p>
                    <p>📱 I build mobile applications</p>
                    <p>🎨 I design user interfaces</p>
                    <p>🔧 I fix bugs and optimize performance</p>
                    <p>🌱 I'm always learning and growing</p>
                    <p>🐶 I love dogs</p>
                    <p>🐠 I love aquariums</p>
                </template>
                <template #footer>
                </template>          
            </Card>
          </div>
        </template>
    </Card>
</template>


<style scoped>
    .p-card-footer {
        display: none;
    }
    .desktop {
        border-radius: 50%;
        width: 20rem;
        height: auto;
        margin: 0 auto;
        display: block;
    }
    .mobile {
        border-radius: 50%;
        height: 12rem;
        width: auto;
        width: auto;
        margin: 0 auto;
        display: block;
    }
    .p-card {
        margin: 4rem;
        background-color: rgba(255, 255, 255, 0) !important;
        border: 1px solid rgb(182, 182, 182) !important;
        font-family: 'Roboto', sans-serif !important;
        font-size: 18px;
        font-weight: 300 !important;
        width: 90%;
        height: 90%;
        padding: 0%;
        margin: 3%;
        overflow: hidden;
    }
    p-card, .information{
        overflow: auto;
    }
    .p-card-title {
        font-family: 'Roboto', sans-serif !important;
        font-size: 24px !important;
        font-weight: 300 !important;
        margin: 0%;
        padding: 0%;
    }
    .p-card-content {
        margin: 0%;
        padding: 0%;
        display: flex;
        flex-direction: column;
        justify-content: center !important;
        align-items: center !important;
        height: 100%;
    }
    .inner-cards-row {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        height: 100%;
        width: 100%;
    }

    .inner-cards-column {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;
        width: 100%;
    }
    .inner-card{
        width: 100%;
        height: 100%;
        margin: 3%;
        padding: auto;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
    }
    .p-card-body{
        padding: 0%;
        margin: 0%;
        height: 100% !important;
        width: 100% !important;
    }
    .custom-title {
        font-weight: normal;
        font-size: 26px;
        font-family: 'Roboto', sans-serif !important;
    }
    .p-card-footer  {
        display: none;
        margin: 0;
        padding: 0;
    }
</style>

