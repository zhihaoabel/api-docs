---
outline: deep
---

<script setup>

const requestTableData = [
   {
      env: 'Sandbox',
      url: 'https://sandbox-acq.onerway.com/${endpoint}',
   },
   {
      env: 'Production',
      url: 'https://v3-acq.pacypay.com/${endpoint}',
   },
];
const requestColumns = [
    {
      prop: 'env',
      label: 'Environment',
      width: 180,
    },
    {
      prop: 'url',
      label: 'Request URL',
    },
];

const storeInfoColumns = [
    {
      prop: 'field',
      label: '关键信息',
    },
    {
      prop: 'method',
      label: '获取方法',
    }
];

const storeInfoTableData = [
    {
      field: '商户号（merchantNo）',
      method: '登入客户端 >> 账户中心 >> 账户信息 >> 商户号',
    },
    {
      field: '秘钥（Secret Key）',
      method: '登入客户端 >> 账户中心 >> 账户信息 >> Secret Key',
    },
    {
      field: '店铺ID（appId）',
      method: '登入客户端 >> 交易管理 >> 应用列表 >> 在“我的应用/网站”中找到需要接入的应用名称所对应的店铺ID',
    },
];

</script>

# Overview

Onerway Document Overview

## Onerway APIs

Onerway API 设计清晰、简洁、易于集成，降低高可用性应用程序的复杂性，缩短开发时间。Onerway 的 API 基于 HTTP 协议，采用 POST
API，使用 SHA256 创建数字签名，接受 JSON 编码的请求体，并返回 JSON 编码的响应。API 请求包括路径中的 API URL，以及请求体中的请求参数。

要与Onerway集成，您首先需要向我们提供一个邮箱和一个准备用来测试集成的网站域名，我们会为您创建沙盒环境账户，并通过您提供的邮箱将账户信息发送给您。

::: tip Note

邮箱会用来创建沙盒账户
您提供用来测试集成的网站域名，我们会添加白名单，仅仅只有添加了白名单的域名才能访问Onerway API
:::

在您通过邮件收到我们沙盒账户信息后，您可以通过邮件中的链接登入我们的客户端。并获取Onerway API 所需要的关键信息
（商户号、秘钥、店铺ID）。

<CustomTable :columns="storeInfoColumns" :data="storeInfoTableData"></CustomTable>

然后，您可以通过沙盒环境来进行集成，我们鼓励在上线项目之前在沙盒环境中测试API调用。

生产环境和沙箱环境的请求地址仅是域名有所不同。您可以首先在沙箱环境中测试 Onerway API，这不会影响生产环境中的数据。一旦测试完成，请通过更改请求域名
和其他配置参数（商户号、秘钥、店铺ID）切换到生产环境。

<CustomTable :columns="requestColumns" :data="requestTableData"></CustomTable>

## 以下部分展示了典型的Onerway API 请求和响应的示例：

### Request

https://sandbox-acq.onerway.com/v1/txn/doTransaction <Badge type="tip">POST</Badge>

```json
{
  "merchantNo": "800079",
  "merchantTxnId": 1121633246,
  "merchantTxnTime": null,
  "merchantTxnTimeZone": null,
  "productType": "CARD",
  "subProductType": "DIRECT",
  "txnType": "SALE",
  "orderAmount": "100",
  "orderCurrency": "USD",
  "txnOrderMsg": "{\"returnUrl\":\"https:\/\/www.ronhan.com\/\",\"products\":\"[{\\\"name\\\":\\\"iphone 11\\\",\\\"price\\\":\\\"40\\\",\\\"num\\\":\\\"2\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"macBook\\\",\\\"price\\\":\\\"20.00\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"discount\\\",\\\"price\\\":\\\"-10.00\\\",\\\"currency\\\":\\\"USD\\\",\\\"type\\\":\\\"discount\\\"},{\\\"name\\\":\\\"shipping fee\\\",\\\"price\\\":\\\"10.00\\\",\\\"currency\\\":\\\"USD\\\",\\\"type\\\":\\\"shipping_fee\\\"}]\",\"transactionIp\":\"127.0.0.1\",\"appId\":1673591020057956352,\"javaEnabled\":false,\"colorDepth\":\"24\",\"screenHeight\":\"1080\",\"screenWidth\":\"1920\",\"timeZoneOffset\":\"-480\",\"accept\":\"text\/html,application\/xhtml+xml,application\/xml;q=0.9,image\/avif,image\/webp,image\/apng,*\/*;q=0.8,application\/signed-exchange;v=b3;q=0.9\",\"userAgent\":\"Mozilla\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/91.0.4472.124 Safari\/537.36\",\"contentLength\":\"340\",\"language\":null}",
  "cardInfo": "{\"cardNumber\":\"4000027891380961\",\"cvv\":\"456\",\"month\":\"12\",\"year\":\"2024\",\"holderName\":\"CL BRW2\"}",
  "shippingInformation": "{\"firstName\":\"Eric\",\"lastName\":\"Canela\",\"phone\":\"3114899788\",\"email\":\"Gabekcanlea@gmail.com\",\"postalCode\":\"90047\",\"address\":\"Aehitment 2, 1256 W Flooeioece Aye\",\"country\":\"US\",\"province\":\"AS\",\"city\":\"Los Angeles\"}",
  "billingInformation": "{\"firstName\":\"Eric\",\"lastName\":\"Canela\",\"phone\":\"3114899788\",\"email\":\"Gabekcanlea@gmail.com\",\"postalCode\":\"90047\",\"address\":\"Aehitment 2, 1256 W Flooeioece Aye\",\"country\":\"US\",\"province\":\"AS\",\"city\":\"Los Angeles\"}",
  "sign": "ef803e92ba89b70ffbe5bc9bacc516e84fd5524854ff61845d3de8f720704f69"
}
```

### Response

```json
{
  "respCode": "20000",
  "respMsg": "Success",
  "data": {
    "transactionId": "1742463301465800704",
    "responseTime": "2024-01-03 16:30:01",
    "txnTime": "2024-01-03 16:29:59",
    "txnTimeZone": "+08:00",
    "orderAmount": "100.00",
    "orderCurrency": "USD",
    "txnAmount": null,
    "txnCurrency": null,
    "status": "S",
    "redirectUrl": null,
    "contractId": null,
    "tokenId": null,
    "eci": null,
    "periodValue": null,
    "codeForm": null,
    "presentContext": null,
    "redirectType": null,
    "sign": "fac37b729b55313e48438b45ea490c5731d4078d5bcd9ca3a67b8085c5f5c132"
  }
}
```

## Onerway 提供了这些API 和 通知

不同的 API 针对不同的支付场景进行了设计。请根据您的支付收款业务使用特定的 API。我们还提供通知，当支付处理达到最终的成功或失败状态时，将支付结果发送给商家。