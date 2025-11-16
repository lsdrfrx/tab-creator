<template>
  <div class="controls">
    <div v-if="!isEditTitle" class="title" @dblclick="isEditTitle = true">
      {{ title }}
    </div>
    <VInput
      v-else
      v-model="titleDraft"
      class="titleInput"
      errorLabel="Введите корректное название"
      :hasError="showError"
      @cancel="isEditTitle = false"
      @save="handleSaveTitle"
    />
    <div class="row">
      <div v-if="!isEditTempo" class="tempo" @dblclick="isEditTempo = true">BPM: {{ tempo }}</div>
      <VInput
        v-else
        v-model="tempoDraft"
        class="tempoInput"
        errorLabel="Введите корректное название"
        :hasError="showError"
        @cancel="isEditTitle = false"
        @save="handleSaveTempo"
      />

      <VButton iconId="save" variant="ghost" @click="$emit('saveScore')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'

import { computed, ref } from 'vue'
import { VButton } from '@/components/button'
import { VInput } from '@/components/input'

interface Props {
  title: string
  tempo: number
}

interface Emits {
  saveTitle: [title: string]
  saveTempo: [tempo: number]
  saveScore: []
}

defineProps<Props>()
defineEmits<Emits>()

const isEditTitle: Ref<boolean> = ref(false)
const isEditTempo: Ref<boolean> = ref(false)

const titleDraft: Ref<string> = ref('')
const tempoDraft: Ref<string> = ref('')

const wasSubmitted: Ref<boolean> = ref(false)
const hasError: Ref<boolean> = ref(false)

const showError = computed(() => wasSubmitted.value && hasError.value)

const handleSaveTempo = () => {
  console.log(tempoDraft.value)
  resetEditMode()
}

const handleSaveTitle = () => {
  console.log(titleDraft.value)
  resetEditMode()
}

const resetEditMode = () => {
  isEditTitle.value = false
  isEditTempo.value = false
}
</script>

<style scoped lang="scss">
.controls {
  display: flex;
  flex-direction: column;
  min-width: 30rem;
  margin: 0 auto;
  max-width: 40rem;
  padding: 1rem;
  gap: 1rem;
  align-items: start;
  border-bottom: 1px solid var(--color-border);
}

.title {
  font-size: 4rem;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
}

.titleInput {
  font-size: 4rem;
  font-weight: 500;
}

.tempo {
  display: flex;
  font-size: 1.8rem;
  width: 100%;
  gap: 0.4rem;
  cursor: pointer;
  user-select: none;
}

.tempoInput {
  font-size: 1.8rem;
}

.row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}
</style>
