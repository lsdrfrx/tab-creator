<template>
  <div class="container">
    <VAppbar />
    <div class="inner">
      <VSidebar />
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VAppbar } from '@/components/appbar'
import { VSidebar } from '@/components/sidebar'
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
}

.inner {
  display: flex;
  height: calc(100vh - 6.4rem);
  gap: 2rem;
}

.content {
  overflow: auto;
  width: 100%;
}
</style>
