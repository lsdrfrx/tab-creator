<template>
  <div class="sidebar">
    <div class="list">
      <div class="item skeleton"></div>
      <div class="item skeleton"></div>
      <div class="item skeleton"></div>
      <div class="item skeleton"></div>
      <div class="item skeleton"></div>
    </div>
  </div>
</template>

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
}
</style>
