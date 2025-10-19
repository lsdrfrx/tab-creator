<template>
  <VAppbar />
  <div class="container">
    <VDrawer />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { VAppbar } from '@/shared/ui/appbar'
import { VDrawer } from '@/shared/ui/drawer'
import { RouterView } from 'vue-router'
</script>

<style scoped lang="scss">
.container {
  display: flex;
  gap: 1.6rem;
}
</style>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

html {
  font-size: 10px;
}

* {
  margin: 0;
  box-sizing: border-box;
  font-size: 1.6rem;
  font-family: 'Roboto', sans-serif;
  font-optical-sizing: auto;
}
</style>
