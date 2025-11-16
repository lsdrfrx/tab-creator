import type { Ref } from 'vue'
import type { Score } from '@/types'

import { ref, computed } from 'vue'
import { useFetch, createSharedComposable } from '@vueuse/core'

interface ScoreStore {
  scores: Ref<Array<Score>>
  selectedScore: Ref<Nullable<Score>>
  fetchScores: () => Promise<void>
  createScore: () => Promise<boolean>
  saveScore: (scoreData: Score) => Promise<boolean>
  deleteScore: () => Promise<boolean>
  selectScore: (id: string) => void
}

const scoreStore = (): ScoreStore => {
  const scores: ScoreStore['scores'] = ref([])
  const selectedScore: ScoreStore['selectedScore'] = ref(null)

  const fetchScores: ScoreStore['fetchScores'] = async () => {
    const response = await useFetch('http://localhost:4000/score')

    if (response.statusCode.value !== 200) return

    const data = JSON.parse(response.data.value as string)

    scores.value = data
  }

  const createScore: ScoreStore['createScore'] = async () => {
    const response = await useFetch('http://localhost:4000/score/new').post()

    await fetchScores()

    return true
  }

  const saveScore: ScoreStore['saveScore'] = async (scoreData) => {
    const response = await useFetch(`http://localhost:4000/score/${scoreData.id}`).patch(scoreData)

    return true
  }

  const deleteScore: ScoreStore['deleteScore'] = async () => {
    return true
  }

  const selectScore: ScoreStore['selectScore'] = (id) => {
    selectedScore.value = scores.value.find((score) => score.id === id) ?? null
    console.log(id)
  }

  return {
    scores: computed(() => scores.value),
    selectedScore: computed(() => selectedScore.value),
    fetchScores,
    createScore,
    saveScore,
    deleteScore,
    selectScore,
  }
}

export const useScoreStore = createSharedComposable(scoreStore)
