<template>
  <div class="demo-progress">
    <van-progress :percentage="50">
      <van-button text>Content</van-button>
    </van-progress>
    <van-progress
      :text-inside="true"
      :stroke-width="20"
      :percentage="50"
      status="danger"
    >
      <span>Content</span>
    </van-progress>
    <van-progress type="circle" :percentage="100" status="success">
      <van-button type="success" icon="check" circle />
    </van-progress>
    <van-progress type="dashboard" :percentage="80">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
        <span class="percentage-label">Progressing</span>
      </template>
    </van-progress>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
.demo-progress .van-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
.demo-progress .van-progress--circle {
  margin-right: 15px;
}
</style>
