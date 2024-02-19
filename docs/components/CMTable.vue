<template>
  <div class="custom-table my-0 mx-auto">
    <table class="table-auto">
      <thead>
        <tr v-if="header" class="dark:bg-slate-800">
          <th v-for="head in header" :key="head"
              class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-400 text-left">
            {{ head }}
          </th>
        </tr>
      </thead>
      <tbody v-if="body" class="bg-white dark:bg-slate-700">
        <tr v-for="(row, rowIndex) in body" :key="`row-${rowIndex}`">
          <td v-for="(cell, cellIndex) in row" :key="`row-${rowIndex}-${cellIndex}`"
              class="border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import VPHero from "vitepress/dist/client/theme-default/components/VPHero.vue";

export default {
  name: "CMTable",
  components: {VPHero},
  props: {
    data: {
      type: Object,
      default: () => null
    },
    
    header: {
      type: Array,
      default: [],
    },
    
    body: {
      type: Array,
      default: [],
    }
  },
  created() {
    this.content = this.data || this.content
  },
  data() {
    return {
      content: {
        header: ['Header 1', 'Header 2', 'Header 3'],
        body: [
          ['Data 1', 'Data 2', 'Data 3'],
          ['Data 4', 'Data 5', 'Data 6'],
        ]
      },
    }
  },
  methods: {},
  computed: {},
}
</script>

<style lang="scss" scoped>


</style>