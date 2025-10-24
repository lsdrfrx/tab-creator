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

.list > *:not(:last-child)::after {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  bottom: -0.4rem;
  height: 0.1rem;
  width: 100%;
  background-color: var(--border-primary);
}
</style>
