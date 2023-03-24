<template>
  <div class="demo-progress">
    <van-progress type="circle" :percentage="0" />
    <van-progress type="circle" :percentage="25" status="success" />
    <van-progress type="circle" :percentage="100" status="info" />
    <van-progress type="circle" :percentage="70" status="warning" />
    <van-progress type="circle" :percentage="50" status="danger" />
  </div>
</template>
<style scoped>
.demo-progress .van-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
.demo-progress .van-progress--circle {
  margin-right: 15px;
}
</style>
