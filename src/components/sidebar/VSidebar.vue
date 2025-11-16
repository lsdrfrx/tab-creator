<template>
  <VSidebarSkeleton v-if="isLoading" />
  <div v-else class="sidebar">
    <VButton class="btn" variant="filled" text="Новая партитура" @click="handleCreate" />
    <VList>
      <ListItem
        v-for="{ title, id } in scores"
        :key="`score-${id}`"
        :title
        :active="selectedScore?.id === id"
        class="item"
        @click="selectScore(id)"
      />
    </VList>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'

import { ref } from 'vue'
import { onMounted } from 'vue'
import { useScoreStore } from '@/composables'
import { ListItem, VList } from '../list'
import VSidebarSkeleton from './VSidebarSkeleton.vue'
import VButton from '../button/VButton.vue'

const { scores, selectedScore, fetchScores, createScore, selectScore } = useScoreStore()

const isLoading: Ref<boolean> = ref(false)

const handleCreate = async () => {
  toggleLoading()
  const isCreated = await createScore()
  toggleLoading()
}

const toggleLoading = () => {
  isLoading.value = !isLoading.value
}

onMounted(async () => {
  toggleLoading()
  await fetchScores()
  toggleLoading()
})
</script>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 30rem;
  min-width: 30rem;
  border-right: 1px solid var(--color-border);
  padding: 1rem;
  height: calc(100vh - 6.4rem);
}

.btn {
  width: 100%;
}
</style>
