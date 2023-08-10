<template>
  <div class="tooltip-base-box">
    <div class="row center">
      <VanPopper
        class="box-item"
        effect="dark"
        content="Top Left prompts info"
        placement="top-start"
      >
        <span class="demo-btn">top-start</span>
      </VanPopper>
      <VanPopper
        class="box-item"
        effect="dark"
        content="Top Center prompts info"
        placement="top"
      >
        <span class="demo-btn">top</span>
      </VanPopper>
      <VanPopper
        class="box-item"
        effect="dark"
        content="Top Right prompts info"
        placement="top-end"
      >
        <span class="demo-btn">top-end</span>
      </VanPopper>
    </div>
    <div class="row">
      <VanPopper
        class="box-item"
        effect="dark"
        content="Left Top prompts info"
        placement="left-start"
      >
        <span class="demo-btn">left-start</span>
      </VanPopper>
      <VanPopper
        class="box-item"
        effect="dark"
        content="Right Top prompts info"
        placement="right-start"
      >
        <span class="demo-btn">right-start</span>
      </VanPopper>
    </div>
    <div class="row">
      <VanPopper
        class="box-item"
        effect="dark"
        content="Left Center prompts info"
        placement="left"
      >
        <span class="demo-btn mt-3 mb-3">left</span>
      </VanPopper>
      <VanPopper
        class="box-item"
        effect="dark"
        content="Right Center prompts info"
        placement="right"
      >
        <span class="demo-btn">right</span>
      </VanPopper>
    </div>
    <div class="row">
      <VanPopper
        class="box-item"
        effect="dark"
        content="Left Bottom prompts info"
        placement="left-end"
      >
        <span class="demo-btn">left-end</span>
      </VanPopper>
      <VanPopper
        class="box-item"
        effect="dark"
        content="Right Bottom prompts info"
        placement="right-end"
      >
        <span class="demo-btn">right-end</span>
      </VanPopper>
    </div>
    <div class="row center">
      <VanPopper
        class="box-item"
        effect="dark"
        content="Bottom Left prompts info"
        placement="bottom-start"
      >
        <span class="demo-btn">bottom-start</span>
      </VanPopper>
      <VanPopper
        class="box-item"
        effect="dark"
        content="Bottom Center prompts info"
        placement="bottom"
      >
        <span class="demo-btn">bottom</span>
      </VanPopper>
      <VanPopper
        class="box-item"
        effect="dark"
        content="Bottom Right prompts info"
        placement="bottom-end"
      >
        <span class="demo-btn">bottom-end</span>
      </VanPopper>
    </div>
  </div>
  </template>
  
  <script lang="ts" setup>
  import VanPopper from './popper.vue'
  </script>
  
  <style lang="less">
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
    width: 110px;
    margin-top: 10px;
  }
  
  .row {
    margin-bottom: 10px;
  }
  
  .demo-btn {
    display: inline-block;
    padding: 6px 12px;
    border: 1px solid #ebedf0;
    border-radius: 4px;
    & + & {
      margin-left: 10px;
    }
  }
  </style>