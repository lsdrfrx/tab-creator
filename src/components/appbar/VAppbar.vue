<template>
  <div class="wrapper">
    <div class="btn" @click="$emit('toggleSidebar')">
      <b>ICON</b>
    </div>
    <div class="navbar">
      <div class="action">Кнопка</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  toggleSidebar: []
}>()
</script>

<style scoped lang="scss">
.wrapper {
  height: 6.4rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3.2rem;
}

.navbar {
  display: flex;
  gap: 3.2rem;
}

.btn {
  cursor: pointer;
}
</style>
