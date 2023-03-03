<template>
  <div class="tooltip-base-box">
    <div class="row center">
      <van-popper
        effect="dark"
        content="Top Left prompts info"
        placement="top-start"
      >
        top-start
      </van-popper>
      <van-popper
        effect="dark"
        content="Top Center prompts info"
        placement="top"
      >
        <span>top</span>
      </van-popper>
      <van-popper
        effect="dark"
        content="Top Right prompts info"
        placement="top-end"
      >
        <van-button>top-end</van-button>
      </van-popper>
    </div>
    <div class="row">
      <van-popper
        effect="dark"
        content="Left Top prompts info"
        placement="left-start"
      >
        <van-button>left-start</van-button>
      </van-popper>
      <van-popper
        effect="dark"
        content="Right Top prompts info"
        placement="right-start"
      >
        <van-button>right-start</van-button>
      </van-popper>
    </div>
    <div class="row">
      <van-popper
        effect="dark"
        content="Left Center prompts info"
        placement="left"
      >
        <van-button class="mt-3 mb-3">left</van-button>
      </van-popper>
      <van-popper
        effect="dark"
        content="Right Center prompts info"
        placement="right"
      >
        <van-button>right</van-button>
      </van-popper>
    </div>
    <div class="row">
      <van-popper
        effect="dark"
        content="Left Bottom prompts info"
        placement="left-end"
      >
        <van-button>left-end</van-button>
      </van-popper>
      <van-popper
        effect="dark"
        content="Right Bottom prompts info"
        placement="right-end"
      >
        <van-button>right-end</van-button>
      </van-popper>
    </div>
    <div class="row center">
      <van-popper
        effect="dark"
        content="Bottom Left prompts info"
        placement="bottom-start"
      >
        <van-button>bottom-start</van-button>
      </van-popper>
      <van-popper
        effect="dark"
        content="Bottom Center prompts info"
        placement="bottom"
      >
        <van-button>bottom</van-button>
      </van-popper>
      <van-popper
        effect="dark"
        content="Bottom Right prompts info"
        placement="bottom-end"
      >
        <van-button>bottom-end</van-button>
      </van-popper>
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
  margin-top: 10px;
}
.tooltip-base-box .center {
  justify-content: center;
}
.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>