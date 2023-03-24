<template>
  <div class="demo-progress">
    <van-progress :text-inside="true" :stroke-width="26" :percentage="70" />
    <van-progress
      :text-inside="true"
      :stroke-width="24"
      :percentage="100"
      status="success"
    />
    <van-progress
      :text-inside="true"
      :stroke-width="22"
      :percentage="80"
      status="warning"
    />
    <van-progress
      :text-inside="true"
      :stroke-width="20"
      :percentage="50"
      status="exception"
    />
  </div>
</template>

<style scoped>
.demo-progress .van-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
</style>
