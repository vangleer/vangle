<template>
  <div class="tooltip-base-box">
    <div class="row center">
      <van-tooltip
        class="box-item"
        effect="dark"
        content="Top Center prompts info"
        placement="top"
      >
        top
      </van-tooltip>
    </div>
    <div class="row">
      <van-tooltip
        class="box-item"
        effect="dark"
        content="Left Center prompts info"
        placement="left"
      >
        <van-button class="mt-3 mb-3">left</van-button>
      </van-tooltip>
      <van-tooltip
        class="box-item"
        effect="dark"
        content="Right Center prompts info"
        placement="right"
      >
        <van-button>right</van-button>
      </van-tooltip>
    </div>
    <div class="row center">
      <van-tooltip
        class="box-item"
        effect="dark"
        content="Bottom Center prompts info"
        placement="bottom"
      >
        <van-button>bottom</van-button>
      </van-tooltip>
    </div>
  </div>
</template>

<style>
.tooltip-base-box {
  width: 600px;
}
.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tooltip-base-box .center {
  justify-content: center;
}
.tooltip-base-box .box-item {
  margin-top: 10px;
}
</style>