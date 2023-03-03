# 手把手从零搭建一个 vue3 组件库 (六)：Tooltip 组件封装

相信大家在使用Element-plus的时候都注意到像Dropdown、Select、Popover、TimeSelect等触发展示弹窗组件

在Element-plus中这些触发弹窗都使用的是Tooltip组件、而Tooltip使用的是基础组件Popper

今天就来实现一个 Tooltip 组件，使用 [floating-ui](https://github.com/floating-ui/floating-ui) 来完成 Popper 组件的功能

Tooltip组件依赖 floating-ui 如果还不了解的朋友可以先看一下哟

## 实现思路

触发展示弹窗有两个关键的元素，Trigger(触发器) 和 Popper(弹窗)，因此需要将两个单独成组件

Trigger(触发器)规定何时显示弹窗，如触发mouseenter、click、focus等

Popper(弹窗)定义显示隐藏动画和方向

Element-plus会在body下创建一个容器专门放弹窗组件、而在 Ant-design 中是直接放在body中的，这也说明类似这种组件都需要将 Trigger 和 Popper 分离，Vue3 的 Teleport 可以轻松实现这个功能


## Trigger 实现

先来看看基本使用
```html
<van-tooltip
  class="box-item"
  effect="dark"
  content="Top Left prompts info"
  placement="top-start"
>
  <van-button>top-start</van-button>
</van-tooltip>
<van-tooltip
  class="box-item"
  effect="dark"
  content="Top Left prompts info"
  placement="top-start"
>
  top-end
</van-tooltip>
```

默认插槽可以是纯文本也可以是元素/组件，因为纯文本无法添加事件，我们将纯文本放入一个默认的组件中

