<template>
  <div class="note">
    <div v-if="fret !== null" class="label">
      {{ fret }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  fret: Nullable<number>
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.note {
  display: flex;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  cursor: pointer;

  &.active {
    border-radius: 0.5rem;
    background-color: var(--button-filled-bg);
    color: var(--background-primary);

    & .label {
      background-color: var(--button-filled-bg);
    }
  }

  & .label {
    border-radius: 0.5rem;
    text-align: center;
    padding: 0 0.2rem;
    width: 100%;
    background-color: var(--background-primary);
  }
}
</style>
