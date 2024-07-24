---
outline: deep
---

<script lang="ts" setup>

import "./util/constants";

</script>

# 更新订单

商户如需在SDK提交支付之前更新订单信息，可以调用此接口。

<div class="custom-table bordered-table">

| 名称             | 内容                                                                                   |
|----------------|--------------------------------------------------------------------------------------|
| Request URL    | https://sandbox-acq.onerway.com/v1/sdkTxn/updateOrder                                |
| Request Method | <div style="color:var(--vp-c-brand-1);font-weight:500;"> POST  </div>                |
| Content-Type   | <div style="color:var(--vp-c-brand-1);font-weight:500;">application/json      </div> |

</div>

::: tip 注意
[TransactionInformation](#transactioninformation) 中的字段如不更新则不传入。请勿传 `null` 或空字符串，会覆盖原始值。
:::

## 请求参数

<div class="custom-table bordered-table">

| 名称                  | 类型     | 长度 | 必填  | 描述                                                                              |
|---------------------|--------|----|-----|---------------------------------------------------------------------------------|
| merchantNo          | String | 20 | Yes | 商户号。 商户注册时，`OnerWay` 会为商户创建商户号                                                  |
| merchantTxnId       | String | 64 | No  | 商户创建的商户交易订单号，不同的订单号视为不同的交易。**和 `transactionId` 两个参数中至少传一个**                     |
| transactionId       | String | 20 | No  | `Onerway` 创建的交易订单号，对应商户订单号。**和 `merchantTxnId` 两个参数中至少传一个**                     |
| orderAmount         | String | 19 | Yes | 修改后的交易订单金额。                                                                     |
| billingInformation  | String | /  | No  | 交易账单信息。 格式为 `json` 字符串。 请参阅对象 [TransactionInformation](#transactioninformation) |
| shippingInformation | String | /  | No  | 交易邮寄信息。 格式为 `json` 字符串。 请参阅对象 [TransactionInformation](#transactioninformation) |
| sign                | String | /  | Yes | 签名字符串，请参阅[Sign](./sign)接口                                                       |

</div>

### TransactionInformation
<!--@include: ./parts/txn-info.md-->

## 请求及响应示例

::: code-group

```json [Request]
{
  "billingInformation": "{\"firstName\":\"test\",\"lastName\":\"test\",\"phone\":\"18600000000\",\"email\":\"abel.wang@onerway.com\",\"postalCode\":\"430000\",\"address\":\"Unit 1113, 11/F, Tower 2, Cheung Sha Wan Plaza, 833 Cheung Sha Wan Road, Lai Chi Kok\",\"country\":\"CN\",\"province\":\"HB\",\"city\":\"HK\"}",   // [!code error]
  "merchantNo": "800209",
  "merchantTxnId": "",
  "orderAmount": "20",
  "shippingInformation": "{\"firstName\":\"Shipping\",\"lastName\":\"Name\",\"phone\":\"188888888888\",\"email\":\"abel.wang@onerway.com\",\"postalCode\":\"888888\",\"address\":\"Shipping Address Test\",\"country\":\"CN\",\"province\":\"HB\",\"city\":\"WH\",\"street\":\"833 Cheung Sha Wan Road\",\"number\":\"1\",\"identityNumber\":\"82962612865\"}",   // [!code error]
  "sign": "d1db1166ec3db7a8b9e8e731f22b17c7e0998702690fdfa0808378f44551d239",
  "transactionId": "1815676095086067712"    // [!code error] 下单接口返回的 transactionId
}
```

```json [Response]
{
  "respCode": "20000",
  "respMsg": "Success",
  "data": {
    "transactionId": "1815676095086067712",   // [!code error] 下单接口返回的 transactionId
    "responseTime": null,
    "txnTime": null,
    "txnTimeZone": null,
    "orderAmount": null,
    "orderCurrency": null,
    "txnAmount": null,
    "txnCurrency": null,
    "status": null,
    "redirectUrl": null,
    "contractId": null,
    "tokenId": null,
    "eci": null,
    "periodValue": null,
    "codeForm": null,
    "presentContext": null,
    "actionType": null,
    "sign": "d95748122b302d0944d5e48bba4092831f96bb38978007763bc4024f8142e0a7"
  }
}
```
:::

<style lang="css">



</style>