<script lang="ts" setup>
import defaultProps from 'vue';

withDefaults(defineProps<{
  tableData?: Array<Record<any, any>>
  columns?: Array<{ label: string, prop: string, width: number }>
  striped?: boolean
  bordered?: boolean
}>(), {
  striped: true,
  bordered: false
})
</script>

<template>
  <el-table :border="bordered" :data="tableData" :stripe="striped" style="width: 100%">
    <el-table-column v-for="column in columns" :key="column.label" :label="column.label"
                     :prop="column.prop" :width="column.width">
      <template #default="{ row }">
        <a v-if="row[column.prop].startsWith('http') || row[column.prop].startsWith('https')" :href="row[column.prop]">{{
            row[column.prop]
          }}</a>
        <span v-else>{{ row[column.prop] }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="scss" scoped>

</style>