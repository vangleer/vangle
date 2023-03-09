---
title: Tree 树形控件
lang: zh-CN
---

# Tree 树形控件

用清晰的层级结构展示信息，可展开或折叠。

## 基础用法

基础的树形结构展示

:::demo

tree/basic

:::

## 可选择

适用于需要选择层级时使用。

:::demo 本例还展示了动态加载节点数据的方法。

tree/selectable

:::

## 懒加载自定义叶子节点

:::demo 由于在点击节点时才进行该层数据的获取，默认情况下 Tree 无法预知某个节点是否为叶子节点， 所以会为每个节点添加一个下拉按钮，如果节点没有下层数据，则点击后下拉按钮会消失。 同时，你也可以提前告知 Tree 某个节点是否为叶子节点，从而避免在叶子节点前渲染下拉按钮。

tree/custom-leaf

:::

## 禁用复选框

节点的复选框可以设置为禁用。

:::demo 在示例中，通过 disabled 设置禁用状态。 相应的复选框已禁用，不能点击。

tree/disabled

:::

## 默认展开以及默认选中

树节点可以在初始化阶段被设置为展开和选中。

:::demo 分别通过 `default-expanded-keys` 和 `default-checked-keys` 设置默认展开和默认选中的节点。 需要注意的是，此时必须设置 `node-key`， 其值为节点数据中的一个字段名，该字段在整棵树中是唯一的。

tree/default-state

:::

## 树节点的选择

:::demo 本例展示如何获取和设置选中节点。 获取和设置各有两种方式：通过 node 或通过 key。 如果需要通过 key 来获取或设置，则必须设置 `node-key`。

tree/checking-tree

:::

## 自定义节点内容

节点的内容支持自定义，可以在节点区添加按钮或图标等内容

:::demo 可以通过两种方法进行树节点内容的自定义：`render-content` 和 scoped slot。 使用 `render-content` 指定渲染函数，该函数返回需要的节点区内容即可。 渲染函数的用法请参考 Vue 文档。 使用 scoped slot 会传入两个参数 `node` 和 `data`，分别表示当前节点的 Node 对象和当前节点的数据。 注意：由于 JSFiddle 不支持 JSX 语法，所以 `render-content` 示例无法在那里运行。 但是在实际的项目中，只要正确地配置了相关依赖，就可以正常运行。

tree/customized-node

:::

## 自定义节点类名

节点的类名支持自定义。

:::demo 使用 `props.class` 来建立节点的类名。

tree/custom-node-class

:::

## 树节点过滤

树节点是可以被过滤的

:::demo 调用 Tree 实例对象的 `filter` 方法来过滤树节点。 方法的参数就是过滤关键字。 需要注意的是，此时需要设置 `filter-node-method` 属性，其值为过滤函数。

tree/filtering

:::

## 手风琴模式

对于同一级的节点，每次只能展开一个

:::demo

tree/accordion

:::

## 可拖拽节点

通过 `draggable` 属性可让节点变为可拖拽

:::demo

tree/draggable

:::

## 属性

| 属性名                   | 说明                                                                                                                      | 类型                                                               | 可选值 | 默认值   |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | --- | ----- |
| data                  | 展示数据                                                                                                                    | array                                                            | —   | —     |
| empty-text            | 内容为空的时候展示的文本                                                                                                            | string                                                           | —   | —     |
| node-key              | 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的                                                                                              | string                                                           | —   | —     |
| props                 | 配置选项，具体看下表                                                                                                              | object                                                           | —   | —     |
| render-after-expand   | 是否在第一次展开某个树节点后才渲染其子节点                                                                                                   | boolean                                                          | —   | true  |
| load                  | 加载子树数据的方法，仅当 lazy 属性为true 时生效                                                                                           | function(node, resolve)，`node`为当前点击的节点，`resolve`为数据加载完成的回调(必须调用) | —   | —     |
| render-content        | 树节点的内容区的渲染 Function                                                                                                     | Function(h, `{ node, data, store }`)                             | —   | —     |
| highlight-current     | 是否高亮当前选中节点，默认值是 false。                                                                                                  | boolean                                                          | —   | false |
| default-expand-all    | 是否默认展开所有节点                                                                                                              | boolean                                                          | —   | false |
| expand-on-click-node  | 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。                                                          | boolean                                                          | —   | true  |
| check-on-click-node   | 是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。                                                                             | boolean                                                          | —   | false |
| auto-expand-parent    | 展开子节点的时候是否自动展开父节点                                                                                                       | boolean                                                          | —   | true  |
| default-expanded-keys | 默认展开的节点的 key 的数组                                                                                                        | array                                                            | —   | —     |
| show-checkbox         | 节点是否可被选择                                                                                                                | boolean                                                          | —   | false |
| default-checked-keys  | 默认勾选的节点的 key 的数组                                                                                                        | array                                                            | —   | —     |
| current-node-key      | 当前选中的节点                                                                                                                 | string / number                                                  | —   | —     |
| filter-node-method    | 对树节点进行筛选时执行的方法， 返回 `false` 则表示这个节点会被隐藏                                                                                  | Function(value, data, node)                                      | —   | —     |
| accordion             | 是否每次只打开一个同级树节点展开                                                                                                        | boolean                                                          | —   | false |
| indent                | 相邻级节点间的水平缩进，单位为像素                                                                                                       | number                                                           | —   | 18    |
| icon                  | 自定义树节点图标组件                                                                                                              | `string \| Component`                                           | -   | -     |
| lazy                  | 是否懒加载子节点，需与 load 方法结合使用                                                                                                 | boolean                                                          | —   | false |
| draggable             | 是否开启拖拽节点功能                                                                                                              | boolean                                                          | —   | false |
| allow-drag            | 判断节点能否被拖拽 如果返回 `false` ，节点不能被拖动                                                                                         | Function(node)                                                   | —   | —     |
| allow-drop            | 拖拽时判定目标节点能否成为拖动目标位置。 如果返回 `false` ，拖动节点不能被拖放到目标节点。 `type` 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后 | Function(draggingNode, dropNode, type)                           | —   | —     |

## Props

| Props    | 说明                              | 类型                           | 可选值 | 默认值 |
| -------- | ------------------------------- | ---------------------------- | --- | --- |
| label    | 指定节点标签为节点对象的某个属性值               | string, function(data, node) | —   | —   |
| children | 指定子树为节点对象的某个属性值                 | string                       | —   | —   |
| disabled | 指定节点选择框是否禁用为节点对象的某个属性值          | string, function(data, node) | —   | —   |
| isLeaf   | 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效 | string, function(data, node) | —   | —   |
| class    | 自定义节点类名                         | string, function(data, node) | —   | —   |

## 方法

`Tree` 组件有以下方法，均返回当前选中的节点数组
| 方法                  | 描述                                                        | 参数                                                                                                                                  |
| ------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| filter              | 过滤所有树节点，过滤后的节点将被隐藏                                        | 接收一个参数并指定为 filter-node-method 属性的第一个参数                                                                                              |
| getCheckedNodes     | 如果节点可以被选中，(`show-checkbox` 为 `true`), 本方法将返回当前选中节点的数组     | (leafOnly, includeHalfChecked) 接收两个布尔类型参数: 1. 默认值为 `false`. 若参数为 `true`, 它将返回当前选中节点的子节点 2. 默认值为 `false`. 如果参数为 `true`, 返回值包含半选中节点数据 |
| setCheckedNodes     | 设置目前勾选的节点，使用此方法必须提前设置 ` node-key ` 属性                     | 要选中的节点构成的数组                                                                                                                         |
| getCheckedKeys      | 若节点可用被选中 (`show-checkbox` 为 `true`), 它将返回当前选中节点 key 的数组   | (leafOnly) 接收一个布尔类型参数，默认为 `false`. 如果参数是 `true`, 它只返回当前选择的子节点数组。                                                                    |
| setCheckedKeys      | 设置目前选中的节点，使用此方法必须设置 `node-key` 属性                         | (keys, leafOnly) 接收两个参数: 1. 一个需要被选中的多节点 key 的数组 2. 一个布尔类型参数，默认为 `false`. 如果参数是 `true`, 它只返回当前选择的子节点数组。                              |
| setChecked          | 设置节点是否被选中, 使用此方法必须设置 `node-key` 属性                        | (key/data, checked, deep) 接收三个参数: 1. 要选中的节点的 key 或者数据 2. 一个布尔类型参数表明是否选中. 3. 一个布尔类型参数表明是否递归选中子节点                                     |
| getCurrentKey       | 返回当前被选中节点的数据 (如果没有则返回 null)                               | —                                                                                                                                   |
| getCurrentNode      | 返回当前被选中节点的数据 (如果没有则返回 null)                               | —                                                                                                                                   |

## 事件

| 事件名              | 说明                               | 回调参数                                                                                                            |
| ---------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| node-click       | 当节点被点击的时候触发                      | 四个参数：对应于节点点击的节点对象，TreeNode 的 `node` 属性, TreeNode和事件对象                                                           |
| node-contextmenu | 当某一节点被鼠标右键点击时会触发该事件              | 共四个参数，依次为：event、传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。                                                   |
| check-change     | 当复选框被点击的时候触发                     | 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点                                                    |
| node-expand      | 节点被展开时触发的事件                      | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身                                                          |
| node-collapse    | 节点被关闭时触发的事件                      | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身                                                          |
| node-drag-start  | 节点开始拖拽时触发的事件                     | 共两个参数，依次为：被拖拽节点对应的 Node、event                                                                                   |
| node-drag-enter  | 拖拽进入其他节点时触发的事件                   | 共三个参数，依次为：被拖拽节点对应的 Node、所进入节点对应的 Node、event                                                                     |
| node-drag-leave  | 拖拽离开某个节点时触发的事件                   | 共三个参数，依次为：被拖拽节点对应的 Node、所离开节点对应的 Node、event                                                                     |
| node-drag-over   | 在拖拽节点时触发的事件（类似浏览器的 mouseover 事件） | 共三个参数，依次为：被拖拽节点对应的 Node、当前进入节点对应的 Node、event                                                                    |
| node-drag-end    | 拖拽结束时（可能未成功）触发的事件                | 共三个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点（可能为空）、event                                 |
| node-drop        | 拖拽成功完成时触发的事件                     | 共三个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点、event                                       |

## 插槽

| 插槽名 | 说明                                          |
| --- | ------------------------------------------- |
| —   | 自定义树节点的内容， 自定义树节点的内容， 参数为 ` { node, data }` |
