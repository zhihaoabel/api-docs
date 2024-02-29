<template>
  <span class="custom-example">
    <span class="leading-text" >{{leadingText}}</span>
    <span v-html="data"></span>
  </span>
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
      leadingText: '例如',
    }
  },
  methods: {},
  computed: {},
}
</script>

<style scoped lang="scss">
.custom-example .leading-text {
  color: var(--custom-note-text);
  background-color: var(--custom-note-bg);
  display: inline-block;
  border: 2px solid var(--custom-note-border);
  border-radius: 12px;
  padding: 0 10px;
  margin: 0 5px 0 0;
  line-height: 22px;
  font-size: 12px;
  font-weight: 500;
  transform: translateY(+1px);
}
</style>