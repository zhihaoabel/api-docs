<template>
  <ClientOnly>
    <span class="custom-example ">
      <span class="leading-text" v-if="leadingText">{{leadingText}}</span>
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
    leadingText: {
      type: String,
      default: '例如'
    }
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