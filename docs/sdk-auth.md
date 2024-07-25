---
outline: deep
---

<script lang="ts" setup>

import "./util/constants";

</script>

# 预授权下单

预授权：商户在用户支付前，先向用户的支付账户发起预授权请求，用户的支付账户会冻结相应的金额，待商户再调用扣款接口，将冻结的金额转为实际的交易金额。

### 请求参数

 <div class="custom-table bordered-table">

| 名称             | 类型     | 长度 | 必填  | 签名  | 描述                               |
|----------------|--------|----|-----|-----|----------------------------------|
| subProductType | String | 16 | Yes | Yes | 预授权 `subProductType` 使用 `DIRECT` |
| txnType        | String | 16 | Yes | Yes | 交易类型 `txnType` 使用 `AUTH`         |

</div>

::: tip 预授权下单请求参数请参考[下单请求中的信用卡支付](./sdk-do-transaction#sdk下单请求及响应示例)，需要将 `txnType` 由 `SALE` 改为 `AUTH`, `subProductType` 保持 `DIRECT` 不变。

```json lines
{
  // 绑卡支付参数更新，其他参数请参考下单请求中的信用卡支付
  "subProductType": "DIRECT",
  // ...
  "txnType": "AUTH"
}
```
:::

### 请求及响应示例

https://sandbox-acq.onerway.com/v1/sdkTxn/doTransaction <Badge type="tip">POST</Badge>

::: code-group
```json-vue [Request]
{
    "billingInformation": "{\"country\":\"US\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"17700492982\",\"address\":\"Apt. 870\",\"city\":\"Hayward\",\"postalCode\":\"66977\",\"identityNumber\":\"717.628.937-97\"}",
    "merchantCustId": "1721885417000",
    "merchantNo": "800209",
    "merchantTxnId": "1721885417000",
    "orderAmount": "200",
    "orderCurrency": "USD",
    "productType": "CARD",
    "shippingInformation": "{\"country\":\"US\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"17700492982\",\"address\":\"Apt. 870\",\"city\":\"Hayward\",\"postalCode\":\"66977\",\"identityNumber\":\"717.628.937-97\"}",
    "sign": "df7b91265b36035a1700413a04397b338cec8f84bef8b6d640b4fa1d6f9a2dfb",
    "subProductType": "DIRECT",   // [!code error]
    "txnOrderMsg": "{\"returnUrl\":\"https://www.merchant-store-website.com/\",\"appId\":\"1739545982264549376\",\"notifyUrl\":\"https://www.merchant-store-notify.com/\",\"products\":\"[{\\\"name\\\":\\\"Pro1\\\",\\\"price\\\":\\\"50.00\\\",\\\"num\\\":\\\"2\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"Pro2\\\",\\\"price\\\":\\\"100\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"shipping fee\\\",\\\"price\\\":\\\"10\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\",\\\"type\\\":\\\"shipping_fee\\\"},{\\\"name\\\":\\\"discount\\\",\\\"price\\\":\\\"-10\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\",\\\"type\\\":\\\"discount\\\"}]\",\"transactionIp\":\"127.0.0.1\"}",
    "txnType": "AUTH"  // [!code error]
}
```

```json-vue [Response]
{
    "respCode": "20000",
    "respMsg": "Success",
    "data": {
        "transactionId": "1816345212864577536",
        "responseTime": "2024-07-25 13:30:19",
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
        "sign": "7b0f9b099e000b82e72fc98aa3f84c27aef41593cc1ff49053918a708296b1f5"
    }
}
```
:::

<style lang="css">



</style>