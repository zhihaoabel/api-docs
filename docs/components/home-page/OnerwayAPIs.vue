<template>
  <div class="onerway-api max-w-6xl my-0 mx-auto">
    <h3 class="header text-3xl font-bold my-5">Onerway APIs</h3>
    <p class="font-sans pb-8">Onerway API 设计清晰、简洁、易于集成，降低高可用性应用程序的复杂性，缩短开发时间。Onerway 的
      API 基于 HTTP 协议，采用
      POST API，使用 SHA256 创建数字签名，接受 JSON 编码的请求体，并返回 JSON 编码的响应。API 请求包括路径中的 API
      URL，以及请求体中的请求参数。</p>
    <p class="font-sans pb-4">
      要与Onerway集成，您首先需要向我们提供一个邮箱和一个准备用来测试集成的网站域名，我们会为您创建沙盒环境账户，并通过您提供的邮箱将账户信息发送给您。
    </p>
    
    <c-m-alert
        message="邮箱会用来创建沙盒账户 ；您提供用来测试集成的网站域名，我们会添加白名单，仅仅只有添加了白名单的域名才能访问Onerway API ；"
        type="warning"/>
    
    <p class="font-sans pb-8">
      在您通过邮件收到我们沙盒账户信息后，您可以通过邮件中的链接登入我们的客户端。并获取Onerway API 所需要的关键信息
      （商户号、秘钥、店铺ID）。
    </p>
    
    <c-m-table :body="infoTable.body" :header="infoTable.header"/>
    
    <p class="font-sans pb-8 pt-4">
      然后，您可以通过沙盒环境来进行集成，我们鼓励在上线项目之前在沙盒环境中测试API调用。
    </p>
    <p class="font-sans pb-8">
      生产环境和沙盒环境的请求地址仅是域名有所不同。您可以首先在沙盒环境中测试 Onerway API，这不会影响生产环境中的数据。一旦测试完成，请通过更改请求域名
      和其他配置参数（商户号、秘钥、店铺ID）切换到生产环境。
    </p>
    
    <c-m-table :body="envTable.body" :header="envTable.header"/>
    
    <h3 class="header text-3xl font-bold my-5">以下部分展示了典型的Onerway API 请求和响应的示例：</h3>
    
    <div class="grid ">
      <div class="grid-rows-1">
        <c-m-code-block/>
      </div>
      <div class="grid-cols-2">
        <c-m-code-block/>
      </div>
    </div>
  
  </div>
</template>

<script>
import CMAlert from "../CMAlert.vue";
import CMTable from "../CMTable.vue";
import {defineProps} from "vue";
import CMCodeBlock from "../CMCodeBlock.vue";
import CMHelloWorld from "../CMHelloWorld.vue";

defineProps({
  data: {
    type: Object,
    default: () => null
  },
})

export default {
  name: "Onerway-APIs",
  components: {CMHelloWorld, CMCodeBlock, CMTable, CMAlert},
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
      // onerway APIs表格
      infoTable: {
        header: ['关键信息', '获取方法'],
        body: [
          ['商户号（merchantNo）', '登入客户端 >> 账户中心 >> 账户信息 >> 商户号'],
          ['秘钥（Secret Key）', '登入客户端 >> 账户中心 >> 账户信息 >> Secret Key'],
          ['店铺ID（shopId）', '登入客户端 >> 交易管理 >> 应用列表 >> 在“我的应用/网站”中找到需要接入的应用名称所对应的店铺ID'],
        ]
      },
      // 环境表格
      envTable: {
        header: ['Environment', 'Request URL'],
        body: [
          ['Sandbox', 'https://sandbox-acq.onerway.com/<endpoint>'],
          ['Production', 'https://v3-acq.pacypay.com/<endpoint>']
        ]
      }
    }
  },
  methods: {},
  computed: {},
}
</script>

<style lang="scss" scoped>

</style>