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

# 订阅
订阅支付是指客户与商家之间建立的一种协议，允许商家根据预先设定的时间表自动收取客户的付款。

## 订阅首购

<div class="custom-table bordered-table">

| 名称             | 类型     | 长度 | 必填  | 签名  | 描述                                                                                                                                                                                                                                                                 |
|----------------|--------|----|-----|-----|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| subProductType | String | 16 | Yes | Yes | 子产品类型，请参阅   <CustomPopover title="SubProductTypeEnum" width="auto" reference="SubProductTypeEnum" link="/apis/enums.html#subproducttypeenum" >  <CustomTable :data="SubProductTypeEnum.data" :columns="SubProductTypeEnum.columns"></CustomTable> </CustomPopover> |
| subscription   | String | /  | No  | Yes | 订阅付款所需的订阅信息。 格式为 `json` 字符串。 请参阅对象 [Subscription](#subscription)                                                                                                                                                                                                   |

</div>

<div class="alertbox4">

::: tip 基于收银台支付接口，订阅首购需要设置以下参数： `subProductType` 、 `subscription`
:::

</div>

#### SubProductType

<div class="custom-table bordered-table">

| 代码          | 描述      | 
|-------------|---------|
| DIRECT      | 直接支付    | 
| SUBSCRIBE   | 订阅支付    |
| INSTALLMENT | 分期支付    |
| TOKEN       | token支付 |
| AUTO_DEBIT  | 代扣      |

</div>

#### Subscription

<!--@include: ./parts/subscription.md-->

## 订阅首购请求示例：

https://sandbox-acq.onerway.com/txn/payment <Badge type="tip">POST</Badge>

::: code-group

```json [请求参数]

{
  "merchantNo": "800079",
  "merchantTxnId": 860499906,
  "merchantTxnTime": null,
  "merchantTxnTimeZone": null,
  "productType": "CARD",
  "subProductType": "SUBSCRIBE",
  "txnType": "SALE",
  "orderAmount": "200",
  "orderCurrency": "USD",
  "subscription": "{\"merchantCustId\":\"1720507855183939880.4680922699\",\"requestType\":\"0\",\"expireDate\":\"2030-11-11\",\"frequencyType\":\"D\",\"frequencyPoint\":\"1\"}",
  "txnOrderMsg": "{\"returnUrl\":\"https:\/\/www.merchant-store-website.com\/\",\"notifyUrl\":\"https:\/\/www.merchant-store-notify.com\/\",\"products\":\"[{\\\"name\\\":\\\"Pro1\\\",\\\"price\\\":\\\"50.00\\\",\\\"num\\\":\\\"2\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"Pro2\\\",\\\"price\\\":\\\"100\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"shipping fee\\\",\\\"price\\\":\\\"10\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\",\\\"type\\\":\\\"shipping_fee\\\"},{\\\"name\\\":\\\"discount\\\",\\\"price\\\":\\\"-10\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\",\\\"type\\\":\\\"discount\\\"}]\",\"transactionIp\":\"127.0.0.1\",\"appId\":1673591020057956352}",
  "shippingInformation": "{\"firstName\":\"xxx\",\"lastName\":\"xxx\",\"phone\":\"13976448789\",\"email\":\"taoyun15@gmail.com\",\"postalCode\":\"35802\",\"address\":\"test\",\"country\":\"US\",\"province\":\"AS\",\"city\":\"city\",\"street\":\"Amsterdam Ave\",\"number\":10,\"identityNumber\":\"717.628.937-97\"}",
  "billingInformation": "{\"firstName\":\"xxx\",\"lastName\":\"xxx\",\"phone\":\"13976448789\",\"email\":\"taoyun15@gmail.com\",\"postalCode\":\"35802\",\"address\":\"test\",\"country\":\"US\",\"province\":\"AS\",\"city\":\"city\",\"street\":\"Amsterdam Ave\",\"number\":10,\"identityNumber\":\"717.628.937-97\"}",
  "sign": "07043e0c11d755b3103281fb20a4cfb122a7d109db2b49b3ede7b289410a6e8c"
}

```

```json [响应参数]

{
  "data": {
    "transactionId": "1810970934312833024",
    "merchantTxnId": "860499906",
    "merchantNo": "800079",
    "responseTime": "",
    "txnTime": "",
    "orderAmount": "200.00",
    "orderCurrency": "USD",
    "txnAmount": "",
    "status": "U",
    "redirectUrl": "https://sandbox-checkout.onerway.com/checkout?key=b04656a9fb52448ab437a47a5933588c",
    "sign": "",
    "contractId": ""
  },
  "respCode": "20000",
  "respMsg": "Success"
}

```
:::

<div class="alertbox4">

::: tip 若请求成功，商家需要获取响应参数中的redirectUrl，然后进行重定向打开。
:::

</div>

## 订阅首购成功示例

::: code-group

```json [同步返回（returnurl）]

https://www.merchant-store-website.com/?transactionId=1810970934312833024&merchantTxnId=860499906&merchantNo=800079&responseTime=2024-07-10%2017:35:43&txnTime=2024-07-10%2017:35:22&txnTimeZone=+08:00&orderAmount=200.00&orderCurrency=USD&txnAmount=200.00&txnCurrency=USD&status=S&reason=Payment%20successful&contractId=1810970934409302016&tokenId=cfcc0dae0138d6644a2d39d074d9832557f3ba194664a4a7355a1cccac7c3776&eci=5

```

```json [异步通知（notifyurl）]

{
    "notifyType": "TXN",
    "transactionId": "1810970934312833024",
    "txnType": "SALE",
    "merchantNo": "800079",
    "merchantTxnId": "860499906",
    "responseTime": "2024-07-10 17:35:42",
    "txnTime": "2024-07-10 17:35:22",
    "txnTimeZone": "+08:00",
    "orderAmount": "200.00",
    "orderCurrency": "USD",
    "txnAmount": "",
    "status": "S",
    "contractId": "1810970934409302016",
    "tokenId": "cfcc0dae0138d6644a2d39d074d9832557f3ba194664a4a7355a1cccac7c3776",
    "eci": "5",
    "reason": "{"respCode":"20000","respMsg":"Success"}",
    "sign": "975a88f47b29c948386f5d4de038bc4751cf37b4a956698ab9c18e8eaff85b72",
    "paymentMethod": "VISA"
}

```
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
| sign          | String | Yes | 签名字符串，请参阅  签名字符串，请参阅[Sign](./sign)接口                                                                                                                                                                                                        |
| paymentMethod | String | Yes | 具体支付方式，包括卡和本地支付类型                                                                                                                                                                                                                           |

</div>