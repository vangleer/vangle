<template>
  <van-table :data="tableData" style="width: 100%">
    <van-table-column label="Date" width="290">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <VanIcon name="timer" />
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </div>
      </template>
    </van-table-column>
    <van-table-column label="Name" width="180">
      <template #default="scope">
        <VanTooltip effect="light" trigger="hover" placement="top" width="auto">
          <VanButton>{{ scope.row.name }}</VanButton>
          <template #content>
            <div>name: {{ scope.row.name }}</div>
            <div>address: {{ scope.row.address }}</div>
          </template>
        </VanTooltip>
      </template>
    </van-table-column>
    <van-table-column label="Operations">
      <template #default="scope">
        <van-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >Edit</van-button
        >
        <van-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</van-button
        >
      </template>
    </van-table-column>
  </van-table>
</template>

<script lang="ts" setup>
import { VanIcon, VanTooltip, VanButton } from '@vangle/components'

interface User {
  date: string
  name: string
  address: string
}

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}
const print = (row: any) => {
  console.log(row)
  return row
}
const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>
