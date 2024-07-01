<template>
  <el-popover
      :placement="placement"
      :title="title"
      :width="width"
      :trigger="trigger"
  >
    <template #reference>
      <span class="reference-text">{{reference}}</span>
    </template>
    <div class="reference-link my-3">
      <a v-if="link" class="plain-link" :href="link">
        Reference
      </a>
    </div>
    <slot/>
  </el-popover>
</template>

<script>

import {TopRight, View} from "@element-plus/icons-vue";

export default {
  name: "CustomPopover",
  components: {View, TopRight},
  props: {
    placement: {
      default: 'right',
    },
    title: {
      default: 'Title',
    },
    width: {
      default: 200,
    },
    trigger: {
      default: 'click',
    },
    reference: {
      default: 'Click to activate',
    },
    link: '',
    linkType: {
      default: 'primary'
    },
    target: {
      default: '_self'
    }
  },
  created() {
  },
  data() {
    return {
    }
  },
  methods: {},
  computed: {},
}
</script>

<style scoped lang="scss">
</style>