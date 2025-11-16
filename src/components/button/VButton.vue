<template>
  <div
    class="btn"
    :class="{ [variant]: variant, iconBtn: iconId && !text }"
    @click="$emit('click')"
  >
    <template v-if="text">
      {{ text }}
    </template>
    <template v-if="iconId">
      <VIcon class="icon" :iconId />
    </template>
  </div>
</template>

<script setup lang="ts">
import { VIcon } from '../icon'

type Variant = 'filled' | 'ghost'

interface Props {
  text?: string
  variant?: Variant
  size?: string
  iconId?: string
}

const { text, variant = 'filled', size = 'M' } = defineProps<Props>()
defineEmits<{
  click: []
}>()
</script>

<style scoped lang="scss">
.btn {
  display: flex;
  border-radius: 0.5rem;
  padding: 0.8rem;
  height: 4rem;
  width: fit-content;
  justify-content: center;
  align-items: center;
  transition: all ease-in 0.2s;
  gap: 0.8rem;
  cursor: pointer;

  &.iconBtn {
    width: fit-content;
    height: fit-content;
  }

  &.filled {
    background-color: var(--color-btn-bg);
    color: var(--color-btn-text);

    .icon {
      color: var(--color-btn-text);
    }

    &:hover {
      background-color: var(--color-btn-hover-bg);
    }

    &:active {
      background-color: var(--color-accent);
    }
  }

  &.ghost {
    background-color: var(--color-bg);
    color: var(--color-text);

    .icon {
      color: var(--color-accent);
    }

    &:hover {
      background-color: var(--color-bg-hover);

      .icon {
        color: var(--color-accent-hover);
      }
    }

    &:active {
      .icon {
        color: var(--color-accent-active);
      }
    }
  }
}
</style>
