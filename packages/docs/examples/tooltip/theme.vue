<template>
  <van-tooltip content="Top center" placement="top">
    <van-button>Dark</van-button>
  </van-tooltip>
  <van-tooltip content="Bottom center" placement="bottom" effect="light">
    <van-button>Light</van-button>
  </van-tooltip>

  <van-tooltip content="Bottom center" effect="customized">
    <van-button>Customized theme</van-button>
  </van-tooltip>
</template>

<style>
.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.is-customized .van-popper__arrow {
  background: linear-gradient(45deg, #b2e68d, #bce689);
}
</style>
