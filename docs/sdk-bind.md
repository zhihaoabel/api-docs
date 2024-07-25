---
outline: deep
---

<script lang="ts" setup>

import {SubProductTypeEnum} from "./util/constants";

</script>

# 绑卡下单

绑卡支付：用户将其信用卡或借记卡的信息与其账户进行关联（绑定），使得在未来的交易中，用户可以通过简单的验证步骤而不必再次输入详细的卡片信息来完成支付。

### 请求参数

 <div class="custom-table bordered-table">

| 名称             | 类型     | 长度 | 必填  | 签名  | 描述                               |
|----------------|--------|----|-----|-----|----------------------------------|
| subProductType | String | 16 | Yes | Yes | 绑卡支付 `subProductType` 使用 `TOKEN` |

</div>

::: tip 绑卡支付请求参数请参考[下单请求中的信用卡支付](./sdk-do-transaction#sdk下单请求及响应示例)，只需将`subProductType` 由 `DIRECT` 改为 `TOKEN`即可

```json lines
{
  // 绑卡支付参数更新，其他参数请参考下单请求中的信用卡支付
  "subProductType": "TOKEN"
}
```
:::

### 请求及响应示例

https://sandbox-acq.onerway.com/v1/sdkTxn/doTransaction <Badge type="tip">POST</Badge>

::: code-group
```json-vue [Request]
{
    "billingInformation": "{\"country\":\"US\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"17700492982\",\"address\":\"Apt. 870\",\"city\":\"Hayward\",\"postalCode\":\"66977\",\"identityNumber\":\"717.628.937-97\"}",
    "merchantCustId": "1721209611000",
    "merchantNo": "800209",
    "merchantTxnId": "1721209611000",
    "orderAmount": "200",
    "orderCurrency": "USD",
    "productType": "CARD",
    "shippingInformation": "{\"country\":\"US\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"17700492982\",\"address\":\"Apt. 870\",\"city\":\"Hayward\",\"postalCode\":\"66977\",\"identityNumber\":\"717.628.937-97\"}",
    "sign": "46f781e24e15b25e888a503d2db2f6122df193c85f4675a8f64a31025682933b",
    "subProductType": "TOKEN",  // [!code error] 
    "txnOrderMsg": "{\"returnUrl\":\"https://www.merchant-store-website.com/\",\"appId\":\"1798898582021349376\",\"notifyUrl\":\"https://www.merchant-store-notify.com/\",\"products\":\"[{\\\"name\\\":\\\"Pro1\\\",\\\"price\\\":\\\"50.00\\\",\\\"num\\\":\\\"2\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"Pro2\\\",\\\"price\\\":\\\"100\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"shipping fee\\\",\\\"price\\\":\\\"10\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\",\\\"type\\\":\\\"shipping_fee\\\"},{\\\"name\\\":\\\"discount\\\",\\\"price\\\":\\\"-10\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\",\\\"type\\\":\\\"discount\\\"}]\",\"transactionIp\":\"127.0.0.1\"}",
    "txnType": "SALE"
}
```
```json-vue [Response]
{
    "respCode": "20000",
    "respMsg": "Success",
    "data": {
        "transactionId": "1813510671984631808", // [!code error] 交易流水号, 用于拉起SDK
        "responseTime": "2024-07-17 17:46:52",
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
        "sign": "a94484ad6c8a33242db6a7d4afdc8e7361718e822978b32891c8e93a1e09f005"
    }
}
```
:::

<style lang="css">



</style>