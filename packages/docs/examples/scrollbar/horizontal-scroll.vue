<template>
  <van-scrollbar>
    <div class="scrollbar-flex-content">
      <p v-for="item in 50" :key="item" class="scrollbar-demo-item">
        {{ item }}
      </p>
    </div>
  </van-scrollbar>
</template>

<style scoped>
.scrollbar-flex-content {
  display: flex;
}
.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--van-color-danger-8);
  color: var(--van-color-danger);
}
</style>
