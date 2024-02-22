<script setup>
import {columns} from "element-plus/es/components/table-v2/src/common";

export default {
  props: {
    tableData: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div class="custom-table">
    <el-table :data="tableData">
      <el-table-column v-for="(column, index) in columns" :key="index" :label="column.label"
                       :prop="column.prop"></el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>

</style>