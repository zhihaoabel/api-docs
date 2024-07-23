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

##### 请求参数

<div class="custom-table bordered-table">

| 名称                  | 类型     | 长度 | 必填  | 描述                                                                              |
|---------------------|--------|----|-----|---------------------------------------------------------------------------------|
| merchantNo          | String | 20 | Yes | 商户号。 商户注册时，`OnerWay` 会为商户创建商户号                                                  |
| merchantTxnId       | String | 64 | No  | 商户创建的商户交易订单号，不同的订单号视为不同的交易。和 `transactionId` 两个参数中至少传一个                         |
| transactionId       | String | 20 | No  | `Onerway` 创建的交易订单号，对应商户订单号。和 `merchantTxnId` 两个参数中至少传一个                         |
| orderAmount         | String | 19 | Yes | 修改后的交易订单金额。                                                                     |
| billingInformation  | String | /  | No  | 交易账单信息。 格式为 `json` 字符串。 请参阅对象 [TransactionInformation](#transactioninformation) |
| shippingInformation | String | /  | No  | 交易邮寄信息。 格式为 `json` 字符串。 请参阅对象 [TransactionInformation](#transactioninformation) |
| sign                | String | /  | Yes | 签名字符串，请参阅[Sign](./sign)接口                                                       |

</div>

###### TransactionInformation
<!--@include: ./parts/txn-info.md-->


<style lang="css">



</style>