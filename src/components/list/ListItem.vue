<template>
  <div class="item" @click="$emit('click')">{{ title }}</div>
</template>

<script setup lang="ts">
interface Props {
  title: string
}

defineProps<Props>()
defineEmits<{
  click: []
}>()
</script>

<style scoped lang="scss">
.item {
  height: 4rem;
  border-radius: 0.8rem;
  padding: 0.8rem;
  border: 1px solid #999999;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
}
</style>
