<template>
  <div class="loading">
    <ProgressSpinner :style="{ width: '40px', height: '40px' }" strokeWidth="4"/>
  </div>
</template>

<script>
export default {
  name: 'Loading',
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

  