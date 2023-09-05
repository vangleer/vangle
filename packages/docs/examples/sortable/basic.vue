<template>
  <van-sortable ghost-class="blue-background-class">
    <div v-for="num in 6" class="sort-item">Item {{ num }}</div>
  </van-sortable>
</template>

<style scoped>
.sort-item {
  position: relative;
  display: block;
  padding: 6px 15px;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,.125);
  color: #000;
}
.blue-background-class {
  background-color: #c8ebfb;
}
</style>