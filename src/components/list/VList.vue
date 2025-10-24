<template>
  <div class="list">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
</style>
