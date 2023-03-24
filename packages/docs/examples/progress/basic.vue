<template>
  <div class="demo-progress">
    <van-progress :percentage="50" />
    <van-progress :percentage="100" :format="format" />
    <van-progress :percentage="100" status="success" />
    <van-progress :percentage="100" status="info" />
    <van-progress :percentage="100" status="warning" />
    <van-progress :percentage="50" status="danger" />
  </div>
</template>

<script lang="ts" setup>
const format = (percentage: number) => (percentage === 100 ? 'Full' : `${percentage}%`)
</script>

<style scoped>
.demo-progress .van-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
</style>