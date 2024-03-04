<template>
  <el-popover
      :placement="placement"
      :title="title"
      :width="width"
      :trigger="trigger"
      :content="content"
      :ref="popoverRef"
      :virtual-ref="virtualRef"
      virtual-triggering
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
import { ref, unref } from 'vue';

const popoverRef = ref()

export default {
  name: "CustomVirtualPopover",
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
    content: {
      default: 'this is content, this is content, this is content',
    },
    reference: {
      default: 'Click to activate',
    },
    link: '',
    linkType: {
      default: 'primary',
    },
    target: {
      default: '_self',
    },
    popoverRef: {
      default: 'popoverRef',
    },
    virtualRef: {
      default: 'virtualRef',
    },
  },
  created() {
  },
  data() {
    return {
      content: {},
    }
  },
  methods: {},
  computed: {},
}
</script>

<style scoped lang="scss">
</style>