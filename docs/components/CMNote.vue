<template>
  <ClientOnly>
    <span class="custom-note">
      <span class="leading-text" >{{leadingText}}</span>
      <span v-html="data"></span>
    </span>
  </ClientOnly>
</template>

<script>
export default {
  name: "CMExample",
  components: {},
  props: {
    data: {
      type: String,
      default: () => null
    },
  },
  created() {
    this.content = this.data || this.content
  },
  data() {
    return {
      content: {},
      leadingText: '注意',
    }
  },
  methods: {},
  computed: {},
}
</script>

<style scoped lang="scss">
.leading-text {
  color: var(--vp-badge-danger-text);
  background-color: var(--vp-badge-danger-bg);
  display: inline-block;
  border: 2px solid var(--vp-badge-danger-border);
  border-radius: 12px;
  padding: 0 10px;
  margin: 0 5px 0 0;
  line-height: 22px;
  font-size: 12px;
  font-weight: 500;
  transform: translateY(+2px);
}
</style>