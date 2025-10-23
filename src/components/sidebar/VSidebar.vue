<template>
  <div class="sidebar">
    <div class="list">
      <div v-for="(score, i) in scores" :key="`score-${i}`" class="item">{{ score.title }}</div>
    </div>
    <button @click="fetchScores">+</button>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import type { Score } from '@/pages/tabEditor/model'

import { ref, onMounted } from 'vue'
import { useFetch } from '@vueuse/core'

const scores: Ref<Array<Record<string, Score>>> = ref([])

const fetchScores = async () => {
  console.log('AAAA')
  const response = await useFetch('http://localhost:3000/score')

  if (response.statusCode.value !== 200) return

  const data = JSON.parse(response.data.value as string)

  scores.value = data
}

onMounted(async () => await fetchScores)
</script>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 30rem;
  border-right: 1px solid #999999;
  padding: 1rem;
  height: calc(100vh - 6.4rem);
}

.list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.item {
  height: 3rem;
  padding: 0.8rem;
  border: 1px solid #999999;
}
</style>
