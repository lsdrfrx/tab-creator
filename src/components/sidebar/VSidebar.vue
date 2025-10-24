<template>
  <VSidebarSkeleton v-if="isLoading" />
  <div v-else class="sidebar">
    <VList>
      <ListItem
        v-for="{ _id, title } in scores"
        :key="`score-${_id}`"
        :title
        class="item"
        @click="selectScore(_id)"
      />
    </VList>
    <button @click="handleCreate">Новая партитура</button>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'

import { ref } from 'vue'
import { onMounted } from 'vue'
import { useScoreStore } from '@/composables'
import VSidebarSkeleton from './VSidebarSkeleton.vue'
import { ListItem, VList } from '../list'

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
  await new Promise((resolve) => setTimeout(resolve, 5000))
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
  border-right: 1px solid #999999;
  padding: 1rem;
  height: calc(100vh - 6.4rem);
}
</style>
