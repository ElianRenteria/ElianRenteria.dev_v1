<template>
  <div class="loading">
    <ProgressSpinner :style="{ width: '40px', height: '40px' }" strokeWidth="4" fill="#333" />
  </div>
</template>

<script>
import { ProgressSpinner } from 'primevue/progressspinner';

export default {
  name: 'Loading',
  components: {
    ProgressSpinner
  }
};
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>

  