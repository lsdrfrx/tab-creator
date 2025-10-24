<template>
  <div class="item" :class="{ active }" @click="$emit('click')">{{ title }}</div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  active: boolean
}

defineProps<Props>()
defineEmits<{
  click: []
}>()
</script>

<style scoped lang="scss">
.item {
  display: flex;
  position: relative;
  align-items: center;
  height: 4rem;
  border-radius: 0.5rem;
  padding: 0.8rem;
  cursor: pointer;
  background-color: var(--list-item-bg);
  color: var(--text-primary);

  &:hover {
    background-color: var(--list-item-hover);
  }

  &.active,
  &:active {
    background-color: var(--list-item-click);
  }
}
</style>
