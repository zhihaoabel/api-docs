<template>
  <span class="custom-note">
    {{leadingText}}<span v-html="data"></span>
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
      leadingText: '注意：',
    }
  },
  methods: {},
  computed: {},
}
</script>

<style scoped lang="scss">

</style>