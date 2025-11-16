<template>
  <VueFeather class="icon" :type="iconId" />
</template>

<script setup lang="ts">
import VueFeather from 'vue-feather'

interface Props {
  iconId: string
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.icon {
  width: 1.6rem;
  height: 1.6rem;
  transition: all ease-in 0.2s;
}
</style>
