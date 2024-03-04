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

</style>