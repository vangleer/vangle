<template>
  <van-tree
    :allow-drop="allowDrop"
    :allow-drag="allowDrag"
    :data="data"
    draggable
    default-expand-all
    node-key="id"
    @node-drag-start="handleDragStart"
    @node-drag-enter="handleDragEnter"
    @node-drag-leave="handleDragLeave"
    @node-drag-over="handleDragOver"
    @node-drag-end="handleDragEnd"
    @node-drop="handleDrop"
  />
</template>

<script lang="ts" setup>
import type { Node } from '@valgle/components/tree'


const handleDragStart = (node: Node, ev: DragEvent) => {
  console.log('drag start', node)
}
const handleDragEnter = (
  draggingNode: Node,
  dropNode: Node,
  ev: DragEvent
) => {
  console.log('tree drag enter:', dropNode.label)
}
const handleDragLeave = (
  draggingNode: Node,
  dropNode: Node,
  ev: DragEvent
) => {
  console.log('tree drag leave:', dropNode.label)
}
const handleDragOver = (draggingNode: Node, dropNode: Node, ev: DragEvent) => {
  console.log('tree drag over:', dropNode.label)
}
const handleDragEnd = (
  draggingNode: Node,
  dropNode: Node,
  ev: DragEvent
) => {
  console.log('tree drag end:', dropNode && dropNode.label)
}
const handleDrop = (
  draggingNode: Node,
  dropNode: Node,
  ev: DragEvent
) => {
  console.log('tree drop:', dropNode.label)
}
const allowDrop = (draggingNode: Node, dropNode: Node, type: string) => {
  if (dropNode.data.label === 'Level two 3-1') {
    return type !== 'inner'
  } else {
    return true
  }
}
const allowDrag = (draggingNode: Node) => {
  return draggingNode.data.label !== 'Level three 3-1-1'
}

const data = [
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
</script>
