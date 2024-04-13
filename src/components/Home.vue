<script>
    import Card from 'primevue/card';
    export default {
        name: 'Home',
        components: {
            Card
        }
    }
</script>

<template>
    <Card>
        <template #title>Welcome to My Digital Portfolio</template>
        <template #content>
            <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                quas!
            </p>
        </template>
    </Card>
</template>

<style scoped>
    .p-card {
        margin: 4rem;
        background-color: rgba(40, 40, 40, 0) !important;
        font-family: 'Roboto', sans-serif !important;
        font-weight: 100 !important;
        height: 85%;
        padding: 0%;
        margin: 3%;
    }
</style>
