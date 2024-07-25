<script lang="ts" setup>
import defaultProps from 'vue';

withDefaults(defineProps<{
  tableData?: Array<Record<any, any>>
  columns?: Array<{ label: string, prop: string, width: number }>
  striped?: boolean
  bordered?: boolean
  width?: number
  minWidth?: number
}>(), {
  striped: true,
  bordered: false
})
</script>

<template>
    <el-table :border="bordered" :data="tableData" :stripe="striped" style="width: 100%; min-width: 650px;">
      <ClientOnly>
        <el-table-column v-for="column in columns" :key="column.label" :label="column.label"
                         :prop="column.prop" :width="column.width">
          <template #default="{ row }">
            <a v-if="row[column.prop].startsWith('http') || row[column.prop].startsWith('https')" :href="row[column.prop]">{{
                row[column.prop]
              }}</a>
            <span v-else v-html="row[column.prop]"></span>
          </template>
        </el-table-column>
      </ClientOnly>
    </el-table>
</template>

<style lang="scss" scoped>
el-table {
  white-space: nowrap;
  word-break: break-word;
  word-wrap: break-word;
}
</style>