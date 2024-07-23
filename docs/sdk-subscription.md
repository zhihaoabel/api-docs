---
outline: deep
---

<script lang="ts" setup>

import {SubProductTypeEnum} from "./util/constants";

</script>

# 订阅支付

订阅支付：客户与商家之间建立的一种协议，允许商家根据预先设定的时间自动从客户账户扣款。

### 请求参数

 <div class="custom-table bordered-table">

| 名称             | 类型     | 长度 | 必填  | 签名  | 描述                                   |
|----------------|--------|----|-----|-----|--------------------------------------|
| subProductType | String | 16 | Yes | Yes | 订阅支付 `subProductType` 使用 `SUBSCRIBE` |

</div>

::: tip 绑卡支付请求参数请参考[下单请求中的信用卡支付](./sdk-do-transaction#sdk下单请求及响应示例)，只需将`subProductType` 由 `CARD` 改为 `SUBSCRIBE`即可

```json lines
{
  // 订阅支付参数更新，其他参数请参考下单请求中的信用卡支付
  "subProductType": "SUBSCRIBE"
}
```
:::

### 请求及响应示例

https://sandbox-acq.onerway.com/v1/sdkTxn/doTransaction <Badge type="tip">POST</Badge>

::: code-group
```json-vue [Request]
{
    "billingInformation": "{\"country\":\"US\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"17700492982\",\"address\":\"Apt. 870\",\"city\":\"Hayward\",\"postalCode\":\"66977\",\"identityNumber\":\"717.628.937-97\"}",
    "merchantCustId": "1721211552000",
    "merchantNo": "800209",
    "merchantTxnId": "1721211552000",
    "merchantTxnTime": "2024-07-17 18:19:12",
    "merchantTxnTimeZone": "+08:00",
    "orderAmount": "200",
    "orderCurrency": "USD",
    "productType": "CARD",
    "shippingInformation": "{\"country\":\"US\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"17700492982\",\"address\":\"Apt. 870\",\"city\":\"Hayward\",\"postalCode\":\"66977\",\"identityNumber\":\"717.628.937-97\"}",
    "sign": "ffa8eaf6c6497850589d46be594e231b37030896c3e4b9a4e029e345ae609cd7",
    "subProductType": "SUBSCRIBE",  // [!code error]
    "subscription": "{\"merchantCustId\":\"1721211552000\",\"requestType\":0,\"expireDate\":\"2030-11-11\",\"frequencyType\":\"D\",\"frequencyPoint\":1,\"tokenId\":\"\",\"contractId\":\"\"}",  // [!code error] 订阅支付参数
    "txnOrderMsg": "{\"returnUrl\":\"https://www.merchant-store-website.com/\",\"appId\":\"1798898582021349376\",\"notifyUrl\":\"https://www.merchant-store-notify.com/\",\"products\":\"[{\\\"name\\\":\\\"Pro1\\\",\\\"price\\\":\\\"50.00\\\",\\\"num\\\":\\\"2\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"Pro2\\\",\\\"price\\\":\\\"100\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"shipping fee\\\",\\\"price\\\":\\\"10\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\",\\\"type\\\":\\\"shipping_fee\\\"},{\\\"name\\\":\\\"discount\\\",\\\"price\\\":\\\"-10\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\",\\\"type\\\":\\\"discount\\\"}]\",\"transactionIp\":\"127.0.0.1\"}",
    "txnType": "SALE"
}
```
```json-vue [Response]
{
    "respCode": "20000",
    "respMsg": "Success",
    "data": {
        "transactionId": "1813518813103529984", // [!code error] 交易流水号, 用于拉起SDK
        "responseTime": "2024-07-17 18:19:13",
        "txnTime": null,
        "txnTimeZone": "+08:00",
        "orderAmount": "200.00",
        "orderCurrency": "USD",
        "txnAmount": null,
        "txnCurrency": null,
        "status": "U",
        "redirectUrl": null,
        "contractId": null,
        "tokenId": null,
        "eci": null,
        "periodValue": null,
        "codeForm": null,
        "presentContext": null,
        "actionType": null,
        "sign": "3bf657380852ef37a438a8810c75816bd71520afc589c3d20e7634c46f369c89"
    }
}
```
:::

<style lang="css">



</style>