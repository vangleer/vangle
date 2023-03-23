# vue3 组件库 (六)：Tree 组件

在工作中我们经常会用到Tree组件，今天就来实现一个简易版的Tree组件，完整的代码请到仓库获取

[在线预览](https://vangleer.github.io/vangle)

[github 地址](https://github.com/vangleer/vangle)

## 完整效果展示

![整体效果](https://img-blog.csdnimg.cn/8e2cd84af18e46bf95ca7479e6d93d20.gif#pic_center)

## Tree 目录结构

```
|-- tree
    |-- index.ts 添加install方法导出
    |-- src
        |-- tree.ts prop类型
        |-- tree.vue 模板
        |-- tree.less 样式
```

## 数据展示

- 先来看看用户传递过来的数据
```html
<template>
  <van-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
</template>

<script lang="ts" setup>
interface Tree {
  label: string
  children?: Tree[]
}

const handleNodeClick = (data: Tree) => {
  console.log(data)
}

const data: Tree[] = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
]

const defaultProps = {
  children: 'children',
  label: 'label',
}
</script>
```


- 从上面的使用可以了解到需要定义接收 data、props属性，触发一个node-click事件

```html
<script lang="ts">
import { defineComponent, h, reactive, computed, PropType } from 'vue'
import { VanIcon } from '@vangle/components/icon'
import { createNamespace } from '@vangle/utils'
export interface Node {
  id?: number
  level: number
  label: string | number
  isLeaf?: boolean
  checked?: boolean
  childNodes?: Node[]
  expand?: boolean
  parent?: Node | null
  data?: any
  store?: any
}

export type TreeStore = {
  childNodes: Node[]
  children: TreeNodeData[]
}
export interface TreeNodeData {
  [key: string]: any
}
export interface TreeOptionProps {
  children?: string
  label?: string
}
const defaultProps = {
  children: 'children',
  label: 'label'
}
export default defineComponent({
  name: 'VanTree',
  emits: ['node-click'],
  props: {
    data: {
      type: Array as PropType<TreeNodeData[]>,
      default: []
    },
    props: {
      type: Object as PropType<TreeOptionProps>,
      default: () => ({
        children: 'children',
        label: 'label'
      })
    },
  },
  setup(props, { emit }) {
    const { n } = createNamespace('tree')
    const dataProps = computed(() => ({ ...defaultProps, ...props.props }))
    const store = reactive<TreeStore>({
      childNodes: getNodes(props.data),
      children: props.data
    })

    // 处理数据
    function getNodes(data: TreeNodeData[], parent: Node | null = null): Node[] {
      if (!data) return []
      const childrenKey = dataProps.value.children
      const labelKey = dataProps.value.label
      return data.map(item => {
        const node: Node = {
          data: item,
          label: item[labelKey],
          level: parent ? parent.level + 1 : 1,
          childNodes: [] as any,
          parent,
          isLeaf: false,
        }

        if (item[childrenKey] && item[childrenKey].length) {
          // 如果有子节点递归处理
          node.childNodes = getNodes(item[childrenKey], node)
        } else {
          // 没有children说明该节点为叶子节点
          node.isLeaf = true
        }
        return node
      })
    }

    // 渲染
    function renderContext(data: Node[]): any[] {
      if (!data) return []
      let nodes = []
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        // 处理过滤
        const childNodes = item.childNodes!
        let child = null

        const label = item.label

        // 展开图标，如果为叶子节点不用展示
        const icon = h(VanIcon, { name: 'caret-right', class: [n('node__expand-icon'), { 'is-leaf': item.isLeaf }] })
        
        const content = h(
          'div',
          {
            class: [n('node__content')],
            style: { paddingLeft: item.level * 18 + 'px' },
            onClick() {
              handleNodeClick(item)
            }
          },
          [icon, label]
        )
        if (childNodes.length) { // 有子节点递归渲染
          child = h(
            'div',
            { class: [n('node')] },
            [
              content,
              h(
                'div',
                { class: 'node_children' },
                renderContext(childNodes)
              )
            ]
          )
        } else {
          child = h('div', { class: [n('node')]}, content)
        }
        nodes.push(child)
      }

      return nodes
    }

    function handleNodeClick(node: Node) {
      emit('node-click', node)
    }

    return () => {
      return h('div', { class: n() }, renderContext(store.childNodes))
    }
  }
})
</script>
<style lang="less">
@import './tree.less';
</style>
```

- getNodes 将用户传递过来的数据进行转换
- renderContext 使用转换后的数据渲染，需要考虑有子节点和没有子节点的情况

- 初次渲染的效果

![初次渲染的效果](https://img-blog.csdnimg.cn/37b5afe549544a889098a280471e430b.png#pic_center)


## expand 展开效果

- getNodes方法中给返回的node添加expand属性
```js
const node: Node = {
  expand: false // +
}
```

- renderContext中给content添加is-expand类，展开条件判断

```js
const content = h(
  'div',
  {
    class: [n('node__content'), { 'is-expand': item.expand }],
    style: { paddingLeft: item.level * 18 + 'px' },
    onClick() {
      handleNodeClick(item)
    }
  },
  [icon, label]
)
if (childNodes.length) {
  child = h(
    'div',
    { class: [n('node')] },
    [
      content,
      h(
        VanCollapseTransition, // + 展开效果动画组件
        () => item.expand && h( // + 展开条件判断
          'div',
          { class: 'node_children' },
          renderContext(item.childNodes!)
        )
      )
    ]
  )
} else {
  child = h('div', { class: [n('node')]}, content)
}
nodes.push(child)
```

- 修改点击事件 handleNodeClick
```js
function handleNodeClick(node: Node) {
  node.expand = !node.expand // +
  emit('node-click', node)
}
```

- 添加expand效果

![expand效果](https://img-blog.csdnimg.cn/8fd0d3727c574061a33ca202d3af9438.gif#pic_center)


## 处理默认插槽

- 用户还可以这样使用
```js
<van-tree
  :data="data"
>
  <template #default="{ node, data }">
    <span class="custom-tree-node">
      <span>{{ node.label }}</span>
      <span>
        <a> Append </a>
        <a style="margin-left: 8px"> Delete </a>
      </span>
    </span>
  </template>
</van-tree>
```

- 改造label的渲染，封装renderLabel
```js
/**
 * 渲染label
 * 1. 如果用户传入渲染函数则使用用户的渲染
 * 2. 如果有插槽使用插槽并传入参数
 * 3. 否则使用默认
 */
function renderLabel(node: Node) {
  if (slots.default) { // 如果用户使用默认插槽，就调用默认插槽函数并把node节点传递过去
    return slots.default({ node, data: node.data, store: node.store })
  } else { // 否则使用默认的方式
    return h('span', { class: n('node__label') }, node.label)
  }
}

// 修改 renderContext 中label渲染的方式
const label = item.label // -
const label = renderLabel(item) // +
```

## checked 选择功能

1. 新增接收 show-checkbox、default-checked-keys 属性
2. 由于用户可能没有传递唯一的id，还需要添加一个 node-key 属性默认为id
- getNodes方法中给返回的node添加checked属性
```js
const keyValue = item[props.nodeKey] || seedId++
const checked = props.defaultCheckedKeys.includes(keyValue)
const node: Node = {
  [props.nodeKey]: keyValue, // +
  checked: checked || parent?.checked // +
}
```

- renderContext中给content添加is-checked类名，checkBox选择框

```js
function handleChecked(node: Node, value: boolean) {
  node.checked = !node.checked
}
const getCheckbox = (node: Node) => {
  return props.showCheckbox && h(
    VanCheckbox,
    {
      label: '',
      modelValue: node.checked,
      indeterminate: node.indeterminate, // 半选
      disabled: node.disabled,
      'onUpdate:modelValue': (val) => handleChecked(node, val)
    }
  )
}

// 注释 + 的部分有修改
function renderContext(data: Node[]): any[] {
  if (!data) return []
  let nodes = []
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    const checkbox = getCheckbox(item) // +
    const content = h(
      'div',
      {
        class: [n('node__content'), { 'is-expand': item.expand, 'is-checked': item.checked }], // +
        style: { paddingLeft: item.level * 18 + 'px' },
        onClick() {
          handleNodeClick(item)
        }
      },
      [icon, checkbox, label] // +
    )
  }

  return nodes
}
```

- 添加选择框的效果

![添加选择框的效果](https://img-blog.csdnimg.cn/3a253ee2284b4528837f8d2195092e06.png#pic_center)

### 选择逻辑（全选、部分选择、取消全选）

- 这部分功能主要是在 handleChecked 触发时做，当前节点选择状态影响子级节点和父级节点
  
  1. 子级节点：当前节点的勾选与不勾选影响所有子节点的选择和不勾选
  2. 父级节点
      - 如果所有子节点都已选择，那么父节点也需要勾选
      - 如果部分子节点选择，父节点为半勾选状态
      - 没有一个子节点选择，父节点也不勾选

- 处理子级节点，这部分很简单，只需递归让所有子级节点和当前节点保持一致即可

```js
function handleChecked(node: Node, value: boolean) {
  node.checked = !node.checked

  checkAll(node, node.checked)
}
function checkAll(node: Node, value: boolean) {
  if (!hasChild(node)) return
  node.childNodes!.forEach(n => {
    n.checked = value
    n.indeterminate = false
    checkAll(n, value)
  })
}
function hasChild(node?: Node) {
  return node && node.childNodes && node.childNodes.length
}
```

![全选](https://img-blog.csdnimg.cn/7d694ff238614eb68871b170f698bb51.gif#pic_center)

- 处理父级节点选择状态

```js
function handleChecked(node: Node, value: boolean) {
  node.checked = node.indeterminate ? true : value
  if (node.indeterminate) {
    node.indeterminate = false
  }

  checkAll(node, node.checked)
  checkIndeterminate(node.parent!)
}
function checkIndeterminate(node: Node) {
  if (!node) return
  let root: any = node
  // 向上遍历父级节点
  while(root) {
    if (hasChild(root)) {
      // 获取当前循环节点已选择的子节点个数
      const checkedChildNodes = root.childNodes.filter((item: Node) => item.checked)

      // 如果没有一个子节点被选中，那么当前节点为不勾选
      if (checkedChildNodes.length === 0) {
        root.checked = false
        root.indeterminate = false
      } else if (checkedChildNodes.length < root.childNodes.length) {
        // 如果有未勾选的子节点，退出循环，因为从该节点开始以及该节点的所有父级节点都是半状态
        break
      } else {
        // 到这里说明所有子节点都是选中状态，设置该节点为选中
        root.indeterminate = false
        root.checked = true
      }
    }
    root = root.parent
  }

  // 如果 root 不为空，将该节点以及该节点的所有父级节点设置为半选状态
  while(root) {
    root.checked = false
    root.indeterminate = true
    root = root.parent
  }
  return root
}
```

- 处理完上面的逻辑，还需要修改一下 getNodes 里面的逻辑

```js
let checkedCount = 0 // +

// map 中记录选中节点的个数

// 如果有选择的节点，检查并修改父级节点的选中状态
if (checkedCount > 0 && parent) { // +
  checkIndeterminate(parent)
}
```
![选中](https://img-blog.csdnimg.cn/fde87f0b4cb24a209fa96e66a0a32227.gif#pic_center)



## 最后

本文主要实现了Tree组件的基本功能包括展开和选中等，完整代码参考文章开头

如果对你有帮助记得点个小星星噢(●'◡'●)
