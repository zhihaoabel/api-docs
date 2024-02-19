<template>
  <div class="home-page flex px-16">
    <OnerwayAPIs/>
  </div>
</template>

<script>
import OnerwayAPIs from "./OnerwayAPIs.vue";

export default {
  name: "Home",
  components: {OnerwayAPIs},
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