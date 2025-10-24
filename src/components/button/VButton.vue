<template>
  <div class="btn" @click="$emit('click')">{{ text }}</div>
</template>

<script setup lang="ts">
interface Props {
  text: string
  variant?: string
  size?: string
}

const { text, variant = 'filled', size = 'M' } = defineProps<Props>()
defineEmits<{
  click: []
}>()
</script>

<style scoped lang="scss">
.btn {
  display: flex;
  background-color: var(--button-filled-bg);
  color: var(--button-filled-fg);
  border-radius: 0.5rem;
  padding: 0.8rem;
  height: 4rem;
  justify-content: center;
  align-items: center;
  transition: all ease-in 0.2s;

  &:hover {
    background-color: var(--button-filled-hover);
  }

  &:active {
    background-color: var(--button-filled-click);
  }
}
</style>
