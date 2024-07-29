---
outline: deep
---
<script setup>

import {reactive, ref, watch, onMounted, unref } from 'vue'; 
import {requestGen, secret} from "./util/utils";
import {ProductTypeEnum as ProductTypeEnumTable, SubProductTypeEnum as SubProductTypeEnumTable,TxnTypeEnum as TxnTypeEnumTable,SubProductTypeEnum,Subscription,NotifyTypeEnum,TxnTypeEnum,TxnStatusEnum} from "./util/constants";
import CMExample from './components/CMExample.vue';
import CMNote from './components/CMNote.vue';
import CustomPopover from './components/element-ui/CustomPopover.vue'; 
import CustomTable from "./components/element-ui/CustomTable.vue";
import {TopRight, View} from "@element-plus/icons-vue";
import { ClickOutside as vClickOutside } from 'element-plus';

</script>

# 预授权
预授权是一种金融交易方式，主要用于信用卡支付。在某些情况下，商家需要确保顾客的信用卡有足够的信用额度来支付即将发生的交易。这时，商家会向银行发起预授权请求，银行会暂时冻结顾客信用卡上的一定金额，直到交易完成或取消。

## 授权支付

<div class="custom-table bordered-table">

| 名称             | 类型     | 长度 | 必填  | 签名  | 描述           |
|----------------|--------|----|-----|-----|--------------|
| txnType | String | 16 | Yes | Yes | 授权支付使用"AUTH" |

</div>


::: tip 基于收银台支付接口，授权需要设置以下参数： `txnType`：`AUTH`
:::






#### 响应参数

<div class="custom-table bordered-table">

| 名称	           | 类型     | 签名  | 描述                                                                                                                                                                                                                                          |
|---------------|--------|-----|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| notifyType    | String | Yes | 通知类型。请参阅  <CustomPopover title="NotifyTypeEnum" width="auto" reference="NotifyTypeEnum" link="/apis/enums.html#notifytypeenum" > <CustomTable :data="NotifyTypeEnum.data" :columns="NotifyTypeEnum.columns"></CustomTable> </CustomPopover> |                                           |
| transactionId | String | Yes | Onerway创建的交易订单号，对应商户订单号                                                                                                                                                                                                                     |
| txnType       | String | Yes | 交易类型，  <CustomPopover title="TxnTypeEnum" width="auto" reference="TxnTypeEnum" link="/apis/enums.html#txntypeenum" > <CustomTable :data="TxnTypeEnum.data" :columns="TxnTypeEnum.columns"></CustomTable> </CustomPopover>                   |
| merchantNo    | String | Yes | 商户号。 商户注册时，OnerWay会为商户创建商户号                                                                                                                                                                                                                 |
| merchantTxnId | String | Yes | 顾客每次付款的订单号。                                                                                                                                                                                                                                 |
| responseTime  | String | Yes | 接口响应时间，格式为`yyyy\-MM\-dd HH:mm:ss`                                                                                                                                                                                                           |
| txnTime       | String | Yes | 交易完成时间，格式为`yyyy\-MM\-dd HH:mm:ss`                                                                                                                                                                                                           |
| txnTimeZone   | String | Yes | 交易完成时区，<br/>例如`+08:00`                                                                                                                                                                                                                      |
| orderAmount   | String | Yes | 订单金额，以“元”为单位，如有小数，保留两位小数。                                                                                                                                                                                                                   |
| orderCurrency | String | Yes | 交易订单的货币。 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes)货币代码                                                                                                                                             |
| status        | String | Yes | 交易处理结果。 请参阅 <CustomPopover title="TxnStatusEnum" width="auto" reference="TxnStatusEnum" link="/apis/enums.html#txnstatusenum" > <CustomTable :data="TxnStatusEnum.data" :columns="TxnStatusEnum.columns"></CustomTable> </CustomPopover>    |
| contractId    | String | Yes | 订阅合同ID：唯一值，用来区分是哪笔订阅。通常会与tokenId成对保存。订阅首购成功后返回，需要复购中使用                                                                                                                                                                                      |
| tokenId       | String | Yes | tokenId：用来完成订阅复购的重要参数。订阅首购成功后返回，需要复购中使用                                                                                                                                                                                                     |
| reason        | String | Yes | 交易失败的原因                                                                                                                                                                                                                                     |
| sign          | String | Yes | 签名字符串，请参阅[Sign](./sign)接口                                                                                                                                                                                                       |
| paymentMethod | String | Yes | 具体支付方式，包括卡和本地支付类型                                                                                                                                                                                                                           |

</div>

## 授权支付请求示例：

https://sandbox-acq.onerway.com/txn/payment <Badge type="tip">POST</Badge>

::: code-group

```json [请求参数]

{
  "billingInformation": "{\"country\":\"DE\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"şş\",\"lastName\":\"café\",\"phone\":\"17700492982\",\"address\":\"Apt. 870\",\"city\":\"Akşehir\",\"postalCode\":\"66977\",\"identityNumber\":\"12345678\",\"province\":\"Akşehir\"}",
  "merchantCustId": "1721788143000",
  "merchantNo": "800209",
  "merchantTxnId": "1721788143000",
  "merchantTxnTime": "2024-07-24 10:29:03",
  "merchantTxnTimeZone": "+08:00",
  "orderAmount": "100",
  "orderCurrency": "USD",
  "productType": "CARD",
  "shippingInformation": "{\"country\":\"DE\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"şş\",\"lastName\":\"café\",\"phone\":\"17700492982\",\"address\":\"Apt. 870\",\"city\":\"Akşehir\",\"postalCode\":\"66977\",\"identityNumber\":\"12345678\",\"province\":\"Akşehir\"}",
  "sign": "efdca32780a8a58918c9fa333cb8aba72586a77eb87b4b0961d4556ed210928a",
  "subProductType": "DIRECT",
  "txnOrderMsg": "{\"returnUrl\":\"https://docs.onerway.com/\",\"products\":\"[{\\\"price\\\":\\\"110.00\\\",\\\"num\\\":\\\"1\\\",\\\"name\\\":\\\"iphone11\\\",\\\"currency\\\":\\\"USD\\\"}]\",\"transactionIp\":\"127.0.0.1\",\"appId\":\"1739545982264549376\",\"javaEnabled\":false,\"colorDepth\":\"24\",\"screenHeight\":\"1080\",\"screenWidth\":\"1920\",\"timeZoneOffset\":\"-480\",\"accept\":\"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36\",\"contentLength\":\"340\",\"language\":\"zh-CN\"}",
  "txnType": "AUTH"   // [!code error]
}

```

```json [响应参数]

{
  "respCode": "20000",
  "respMsg": "Success",
  "data": {
    "transactionId": "1815937211611619328",
    "merchantTxnId": "1721788143000",
    "merchantNo": "800209",
    "responseTime": "",
    "txnTime": "",
    "orderAmount": "100.00",
    "orderCurrency": "USD",
    "txnAmount": "",
    "txnCurrency": null,
    "txnTimeZone": null,
    "status": "U",
    "reason": null,
    "redirectUrl": "https://sandbox-checkout.onerway.com/checkout?key=be2093ebb79241e1b0f28296ef8f28f7",
    "sign": "4b059cbfbc3a7b748f15ea0a56bdd77faf26d8cb06e3cedd99fae3ced3df8f9a",
    "contractId": "",
    "tokenId": null,
    "eci": null,
    "transactionOrderNo": null,
    "periodValue": null,
    "lpmsType": null,
    "qrCode": null
  }
}

```
:::


::: tip 若请求成功，商家需要获取响应参数中的redirectUrl，然后进行重定向打开。
:::


## 授权支付成功示例

::: code-group

```json [同步返回（returnurl）]

https://www.merchant-store-website.com/?transactionId=1815937211611619328&merchantTxnId=1721788143000&merchantNo=800209&responseTime=2024-07-10%2017:35:43&txnTime=2024-07-10%2017:35:22&txnTimeZone=+08:00&orderAmount=100.00&orderCurrency=USD&txnAmount=100.00&txnCurrency=USD&status=S&reason=Payment%20successful&eci=5

```

```json [异步通知（notifyurl）]

{
    "notifyType": "TXN",
    "transactionId": "1815937211611619328",
    "txnType": "AUTH",
    "merchantNo": "800209",
    "merchantTxnId": "1721788143000",
    "responseTime": "2024-07-10 17:35:42",
    "txnTime": "2024-07-10 17:35:22",
    "txnTimeZone": "+08:00",
    "orderAmount": "100.00",
    "orderCurrency": "USD",
    "txnAmount": "",
    "status": "S",
    "contractId": "",
    "tokenId": "",
    "eci": "5",
    "reason": "{\"respCode\":\"20000\",\"respMsg\":\"Success\"}",
    "sign": "4b059cbfbc3a7b748f15ea0a56bdd77faf26d8cb06e3cedd99fae3ced3df8f9a",
    "paymentMethod": "VISA"
}

```
:::