<template>
  <div>
    <input ref="input" v-model="model" :class="{ error: hasError }" type="text" />
    <span v-if="hasError" class="errorLabel">{{ errorLabel }}</span>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside, onKeyDown } from '@vueuse/core'
import { useTemplateRef } from 'vue'

interface Props {
  hasError?: boolean
  errorLabel?: string
}

interface Emits {
  cancel: []
  save: []
}

defineProps<Props>()

const emit = defineEmits<Emits>()

const model = defineModel()
const inputRef = useTemplateRef('input')

onClickOutside(inputRef, () => emit('cancel'))
onKeyDown('Enter', () => emit('save'))
</script>

<style scoped lang="scss">
input {
  background-color: var(--color-bg);
  outline: none;
  border: 0.3rem solid var(--color-text);
  border-radius: 0.5rem;
  padding: 0.8rem;
  height: inherit;
  font-size: inherit;
  width: 100%;
}
</style>
