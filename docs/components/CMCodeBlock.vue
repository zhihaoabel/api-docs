<template>
  <div class="custom-code-block">
      <pre class="text-sm sm:text-base lg:text-lg overflow-auto">
        <code ref="codeBlock" :class="lang" v-html="code||content.code"></code>
      </pre>
  </div>
</template>

<script>
import highlight from "highlight.js";
import 'highlight.js/styles/atom-one-dark.css';

export default {
  name: "CMCodeBlock",
  components: {},
  props: {
    data: {
      type: Object,
      default: () => null
    },
    code: {
      type: String,
      default: '',
    },
    lang: {
      type: String,
      default: 'json',
    }
  },
  created() {
    this.content = this.data || this.content
  },
  mounted() {
    highlight.highlightElement(this.$refs.codeBlock)
  },
  data() {
    return {
      content: {
        code: `{
  "merchantNo": "800240",
  "merchantTxnId": "16460431556942",
  "merchantTxnTime": "2022-03-31 15:30:00",
  "merchantTxnTimeZone": "+08:00",
  "productType": "LPMS",
  "subProductType": "DIRECT",
  "txnType": "SALE",
  "orderAmount": "20",
  "orderCurrency": "GBP",
  "txnOrderMsg": "{\\"returnUrl\\":\\"https://www.ronhan.com/\\",\\"products\\":\\"[{\\\\\\"name\\\\\\":\\\\\\"iphone 11\\\\\\",\\\\\\"price\\\\\\":\\\\\\"5300.00\\\\\\",\\\\\\"num\\\\\\":\\\\\\"2\\\\\\",\\\\\\"currency\\\\\\":\\\\\\"GBP\\\\\\"}]\\",\\"transactionIp\\":\\"127.0.0.1\\",\\"appId\\":1742731621613047808}",
  "lpmsInfo": "{\\"lpmsType\\":\\"WeChat\\",\\"bankName\\":\\"\\",\\"iban\\":\\"\\"}",
  "shippingInformation": "{\\"email\\":\\"shipping@test.com\\",\\"country\\":\\"GB\\"}",
  "billingInformation": "{\\"firstName\\":\\"José\\",\\"lastName\\":\\"Silva\\",\\"phone\\":\\"8522847035\\",\\"email\\":\\"customer@email\\",\\"country\\":\\"GB\\"}",
  "sign": "57b463f27344f579189eca09aa96b51a70ed542e215624f8bee6daafe9849246"
}`,
      },
    }
  },
  methods: {
    copyCode() {
      navigator.clipboard.writeText(this.code)
          .then(() => {
            alert('Code copied to clipboard');
          })
          .catch(err => {
            console.error('Could not copy text: ', err);
          });
    },
    formatCode() {
      const lines = this.code.split('\n');
      this.formattedCode = lines.map(line => `<span class="line">${line}</span>`).join('\n');
    },
  },
  computed: {
    theme() {
      return theme
    }
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .hljs {
    background-color: transparent;
  }
}
</style>