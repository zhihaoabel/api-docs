<template>
  <div class="custom-hello-world text-3xl font-bold underline">
    <h1 class="h-1">Hello World</h1>
  </div>
</template>

<script>
export default {
  name: "CMHelloWorld",
  components: {},
  props: {
    data: {
      type: Object,
      default: () => null
    },
  },
  created() {
    this.content = this.data || this.content
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