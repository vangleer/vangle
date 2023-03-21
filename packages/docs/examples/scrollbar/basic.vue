<template>
  <van-scrollbar height="400px">
    <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
  </van-scrollbar>
</template>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--van-color-primary-8);
  color: var(--van-color-primary);
}

</style>
