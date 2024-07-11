---
outline: deep
---
<script setup>


import {reactive, ref, watch, onMounted, unref } from 'vue'; 
import {requestGen, secret} from "./util/utils";
import {ProductTypeEnum as ProductTypeEnumTable, SubProductTypeEnum as SubProductTypeEnumTable,TxnTypeEnum as TxnTypeEnumTable} from "./util/constants";
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

| 名称          | 类型     | 长度 | 必填  | 签名  | 描述                       |
|-------------|--------|----|-----|-----|--------------------------|
| subProductType | String | 16 | Yes | Yes | 子产品类型，请参阅   <CustomPopover title="SubProductTypeEnum" width="auto" reference="SubProductTypeEnum" link="/apis/enums.html#subproducttypeenum" ></CustomPopover> |
| subscription          | String | /   | No  | Yes | 订阅付款所需的订阅信息。 格式为 `json` 字符串。 请参阅对象     <CustomPopover title="Subscription" width="auto" reference="Subscription" link="/apis/api-Cashier-sub.html#subscription" ></CustomPopover>                     |

</div>

<div class="alertbox4">

::: tip 基于收银台支付接口，订阅首购需要设置以下参数： `subProductType` 、 `subscription`
:::

</div>

#### SubProductType

<div class="custom-table bordered-table">

| 代码             | 描述     | 
|----------------|--------|
| DIRECT    | 直接支付 | 
| SUBSCRIBE | 订阅支付 |
| INSTALLMENT     | 分期支付 |
| TOKEN  | token支付 |
| AUTO_DEBIT | 代扣 |

</div>


#### Subscription

<div class="custom-table bordered-table">

| 名称             | 类型     | 长度 | 必填  | 签名 | 描述                                         |
|----------------|--------|----|-----|----|--------------------------------------------|
| requestType    | String | 1  | YES | YES | 订阅类型：`0 - 首购`, 收银台仅支持首次购买。                   |
| merchantCustId | String | 50 | YES  | YES | 顾客ID           |
| expireDate     | String | 10 | YES  | YES | 过期日期， 格式为 `yyyy-MM-dd ` |
| frequencyType  | String | 1  | YES  | YES | 订阅频率类型，仅支持按天订阅，所以写死为`D` |
| frequencyPoint | String | 2  | YES  | YES | 订阅频率点数，表示多少天进行一次扣款|

</div>

## 订阅首购请求示例：



https://sandbox-acq.onerway.com/txn/payment <Badge type="tip">POST</Badge>




::: code-group

```json [请求参数]
{
  "billingInformation": "{\"country\":\"BE\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"17700492982\",\"address\":\"Apt. 870\",\"city\":\"Hayward\",\"postalCode\":\"66977\",\"identityNumber\":\"12345678\"}",
  "merchantCustId": 1720494168000,
  "merchantNo": "800209",
  "merchantTxnId": 1720494168000,
  "merchantTxnTime": "2024-01-30 07:10:51",
  "merchantTxnTimeZone": "+08:00",
  "orderAmount": "10",
  "orderCurrency": "EUR",
  "productType": "SUBSCRIBE",  // [!code error]
  "shippingInformation": "{\"country\":\"BE\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"17700492982\",\"address\":\"Apt. 870\",\"city\":\"Hayward\",\"postalCode\":\"66977\",\"identityNumber\":\"12345678\"}",
  "sign": "a215ea01c96ce585dcba264e447b994da204f47b7f28be55ede2fb48c647685c",  // [!code error]
  "subProductType": "SUBSCRIBE",
  "subscription": "{\"merchantCustId\":1720494168000,\"requestType\":\"0\",\"expireDate\":\"2024-11-11\",\"frequencyType\":\"D\",\"frequencyPoint\":1,\"tokenId\":\"\",\"contractId\":\"\"}",  // [!code error]
  "txnOrderMsg": "{\"returnUrl\":\"https://docs.onerway.com/\",\"products\":\"[{\\\"price\\\":\\\"110.00\\\",\\\"num\\\":\\\"1\\\",\\\"name\\\":\\\"iphone11\\\",\\\"currency\\\":\\\"CNY\\\"}]\",\"transactionIp\":\"127.0.0.1\",\"appId\":\"1739545982264549376\",\"javaEnabled\":false,\"colorDepth\":\"24\",\"screenHeight\":\"1080\",\"screenWidth\":\"1920\",\"timeZoneOffset\":\"-480\",\"accept\":\"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36\",\"contentLength\":\"340\",\"language\":\"zh-CN\"}",
  "txnType": "SALE"
}
```

```json [响应参数]


{
  "respCode": "20000",
  "respMsg": "Success",
  "data": {
    "transactionId": "1810509885683929088",
    "merchantTxnId": "1720494168000",
    "merchantNo": "800209",
    "responseTime": "",
    "txnTime": "",
    "orderAmount": "10.00",
    "orderCurrency": "EUR",
    "txnAmount": "",
    "txnCurrency": null,
    "txnTimeZone": null,
    "status": "U",
    "reason": null,
    "redirectUrl": "https://sandbox-checkout.onerway.com/aggregate?key=1d251d6ca8384d318b610e3353ed2338",   // [!code error]
    "sign": "38c5441f75090e0bbd2b9490ea3b946c77e8617ac058ce81b9ce3321bc7bf5ce",
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

<div class="alertbox4">

::: tip 若请求成功，商家需要获取响应参数中的redirectUrl，然后进行重定向打开。
:::

</div>

## 订阅首购成功


::: code-group

```json [异步通知响应]
{
    "notifyType": "TXN",
    "transactionId": "1810553728219353088",
    "txnType": "SALE",
    "merchantNo": "800209",
    "merchantTxnId": "1720504619000",
    "responseTime": "2024-07-09 13:57:19",
    "txnTime": "2024-07-09 13:57:01",
    "txnTimeZone": "+08:00",
    "orderAmount": "100.00",
    "orderCurrency": "USD",
    "txnAmount": "",
    "status": "S",
    "contractId": "1810553728324210688",  // [!code error]
    "tokenId": "7d827950f927d1be3f47c87819a8ba0d8f24b75112d70a7292e92696793081d7",  // [!code error]
    "reason": "{\"respCode\":\"20000\",\"respMsg\":\"Success\"}",
    "sign": "36e8dbce8f436df4dbb08490276bda68b101f1241897f4910a93af9d383e9d64",
    "paymentMethod": "VISA"
}

```
:::

#### 响应参数


<div class="custom-table bordered-table">

| 名称	 | 类型     | 签名 | 描述                                                                                                                                                                                              |
|-------------|--------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| notifyType  | String | Yes | 通知类型。请参阅  <CustomPopover title="NotifyTypeEnum" width="auto" reference="NotifyTypeEnum" link="/apis/enums.html#notifytypeenum" ></CustomPopover>                                                |                                           |
| transactionId         | String | Yes | Onerway创建的交易订单号，对应商户订单号                                                                                                                                                                         |
| txnType       | String | Yes | 交易类型，  <CustomPopover title="TxnTypeEnum" width="auto" reference="TxnTypeEnum" link="/apis/enums.html#txntypeenum" ></CustomPopover>                                                            |
| merchantNo   | String |  Yes | 商户号。 商户注册时，OnerWay会为商户创建商户号                                                                                                                                                                     |
| merchantTxnId | String |  Yes | 顾客每次付款的订单号。                                                                                                                                                                                     |
| responseTime           | String | Yes | 接口响应时间，格式为`yyyy\-MM\-dd HH:mm:ss`                                                                                                                                                               |
| txnTime        | String | Yes | 交易完成时间，格式为`yyyy\-MM\-dd HH:mm:ss`                                                                                                                                                               |
| txnTimeZone               | String | Yes | 交易完成时区，<br/>例如`+08:00`                                                                                                                                                                          |
| orderAmount           | String | Yes | 订单金额，以“元”为单位，如有小数，保留两位小数。                                                                                                                                                                       |
| orderCurrency         | String | Yes | 交易订单的货币。 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes)货币代码                                                                                                 |
| status          | String | Yes | 交易处理结果。 请参阅 <CustomPopover title="TxnStatusEnum" width="auto" reference="TxnStatusEnum" link="/apis/enums.html#txnstatusenum" ></CustomPopover>                                                 |
| contractId               | String | Yes | 订阅合同ID：唯一值，用来区分是哪笔订阅。通常会与tokenId成对保存。订阅首购成功后返回，需要复购中使用 |
| tokenId           | String | Yes | tokenId：用来完成订阅复购的重要参数。订阅首购成功后返回，需要复购中使用                  |
| reason              | String | Yes | 交易失败的原因                      |
| sign    | String | Yes | 签名字符串。              |
| paymentMethod   | String | Yes |    具体支付方式，包括卡和本地支付类型           |
                               


</div>