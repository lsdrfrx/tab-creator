<template>
  <div :class="[variant, size]" class="btn" @click="() => emit('click')">
    <slot name="content" />
  </div>
</template>

<script setup lang="ts">
type ButtonVariant = 'filled' | 'outlined'
type ButtonSize = 's' | 'm' | 'l'

interface Props {
  variant: ButtonVariant
  size: ButtonSize
}

const { variant = 'filled', size = 's' } = defineProps<Props>()

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped lang="scss">
.btn {
  width: fit-content;
  padding: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;

  &.s {
    height: 1.6rem;
  }

  &.m {
    height: 3.2rem;
  }

  &.l {
    height: 4.8rem;
  }

  &.outline {
    border: 0.2rem solid salmon;
    color: black;
  }

  &.filled {
    background-color: salmon;
    color: white;
  }
}
</style>
