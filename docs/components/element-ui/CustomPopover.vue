<template>
  <el-popover
      :placement="placement"
      :title="title"
      :width="width"
      :trigger="trigger"
      :content="content"
  >
    <template #reference>
      <span class="reference-text">{{reference}}</span>
    </template>
    <div class="reference-link my-3">
      <el-link v-if="link" :type="linkType" :href="link">
        Reference
      </el-link>
    </div>
    <slot/>
  </el-popover>
</template>

<script>
export default {
  name: "CustomPopover",
  components: {},
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
      default: 'primary'
    }
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