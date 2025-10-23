import { createSharedComposable } from '@vueuse/core'

const scoreStore = () => {}

export const useScoreStore = createSharedComposable(scoreStore)
