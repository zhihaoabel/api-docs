---
outline: deep
---
<script setup>

import {reactive, ref, watch, onMounted, unref } from 'vue'; 
import {requestGen, secret} from "./util/utils";
import {ProductTypeEnum as ProductTypeEnumTable, SubProductTypeEnum as SubProductTypeEnumTable,TxnTypeEnum as TxnTypeEnumTable,SubProductTypeEnum,Subscription,NotifyTypeEnum,TxnTypeEnum,TxnStatusEnum, ActionTypeEnum, CodeFormEnum} from "./util/constants";
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

<div class="alertbox4">

::: tip 基于两方支付接口，授权需要设置以下参数： `txnType`：`AUTH`
:::

</div>


#### 响应参数


<div class="custom-table bordered-table">

| 名称       | 类型     | 必填 | 描述                                               |
|----------|--------|----|--------------------------------------------------|
| respCode | String | Yes | 来自 Onerway 的响应码                                  |
| respMsg  | String | Yes | 来自 Onerway 的响应信息                                 |
| data     | Map    | Yes | 响应数据。 请参阅对象 [TxnInfo](./api-direct-auth#txninfo) |

</div>

####  TxnInfo

<div class="custom-table bordered-table">

| 名称            | 类型     | 必填  | 描述                                                                                                                                                                                                                                                      |
|---------------|--------|-----|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| transactionId | String | Yes | Onerway创建的交易订单号，对应商户订单号                                                                                                                                                                                                                                 |
| responseTime  | String | Yes | 接口响应时间，格式为`yyyy-MM-dd HH:mm:ss`                                                                                                                                                                                                                         |
| txnTime       | String | Yes | 交易完成时间，格式为`yyyy-MM-dd HH:mm:ss`                                                                                                                                                                                                                         |
| txnTimeZone   | String | Yes | 交易完成时区，例如：+08:00                                                                                                                                                                                                                                        |
| orderAmount   | String | Yes | 交易订单金额                                                                                                                                                                                                                                                  |
| orderCurrency | String | Yes | 交易订单币种。 请参阅  [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes)。 货币代码                                                                                                                                                   |
| txnAmount     | String | Yes | 订单金额转换成结算币种后的金额                                                                                                                                                                                                                                         |
| txnCurrency   | String | Yes | 结算币种。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes)。 货币代码                                                                                                                                                      |
| status        | String | Yes | 交易处理结果。 请参阅    <CustomPopover title="TxnStatusEnum" width="auto" reference="TxnStatusEnum" link="/apis/enums.html#txnstatusenum"><CustomTable :data="TxnStatusEnum.data" :columns="TxnStatusEnum.columns"></CustomTable></CustomPopover>                |
| redirectUrl   | String | Yes | 当交易状态为`R`时，商户需要重定向到该URL完成部分交易，包括`3ds`验证、本地支付收银等                                                                                                                                                                                                         |
| periodValue   | String | No  | 分期付款期数                                                                                                                                                                                                                                                  |
| contractId    | String | Yes | 订阅合同id，首购时返回                                                                                                                                                                                                                                            |
| tokenId       | String | Yes | 订阅令牌id ，首购时返回                                                                                                                                                                                                                                           |
| eci           | String | Yes | 责任转移                                                                                                                                                                                                                                                    |
| actionType    | String | Yes | 执行类型，在status为R时需要关注， 请参阅 <CustomPopover title="ActionTypeEnum" width="auto" reference="ActionTypeEnum" link="/apis/enums.html#actiontypeenum"><CustomTable :data="ActionTypeEnum.data" :columns="ActionTypeEnum.columns"></CustomTable></CustomPopover> |
| codeForm      | Map    | No  | 码的信息。请参阅<CustomPopover title="CodeFormEnum" width="auto" reference="CodeFormEnum" link="/apis/enums.html#codeformenum"><CustomTable :data="CodeFormEnum.data" :columns="CodeFormEnum.columns"></CustomTable></CustomPopover>                        |
| sign          | String | No  | 签名字符串，请参阅[Sign](./sign)接口                                                                                                                                                                                                                |


</div>

## 授权支付请求示例：

https://sandbox-acq.onerway.com/v1/txn/doTransaction <Badge type="tip">POST</Badge>

::: code-group

```json [请求参数]
{
  "billingInformation": "{\"country\":\"US\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"17700492982\",\"address\":\"Apt. 870\",\"city\":\"Hayward\",\"postalCode\":\"66977\",\"identityNumber\":\"717.628.937-97\"}",
  "cardInfo": "{\"cardNumber\":\"2221008123677736\",\"cvv\":\"789\",\"month\":\"12\",\"year\":\"2030\",\"holderName\":\"test sandbox\"}",
  "merchantNo": "800209",
  "merchantTxnId": "1721799203000",
  "merchantTxnTime": "2024-07-24 13:33:23",
  "merchantTxnTimeZone": "+08:00",
  "orderAmount": "200",
  "orderCurrency": "USD",
  "productType": "CARD",
  "shippingInformation": "{\"country\":\"US\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"17700492982\",\"address\":\"Apt. 870\",\"city\":\"Hayward\",\"postalCode\":\"66977\",\"identityNumber\":\"717.628.937-97\"}",
  "sign": "61cbf5a885a782db5e5bcde5eab3248b0fb802eb140723f846c1a9797ead57fe",
  "subProductType": "DIRECT",
  "txnOrderMsg": "{\"returnUrl\":\"https://www.merchant-store-website.com/\",\"appId\":\"1739545982264549376\",\"notifyUrl\":\"https://www.merchant-store-notify.com/\",\"products\":\"[{\\\"name\\\":\\\"Pro1\\\",\\\"price\\\":\\\"50.00\\\",\\\"num\\\":\\\"2\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"Pro2\\\",\\\"price\\\":\\\"100\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"shipping fee\\\",\\\"price\\\":\\\"10\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\",\\\"type\\\":\\\"shipping_fee\\\"},{\\\"name\\\":\\\"discount\\\",\\\"price\\\":\\\"-10\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\",\\\"type\\\":\\\"discount\\\"}]\",\"transactionIp\":\"127.0.0.1\"}",
  "txnType": "AUTH"   // [!code error]
}

```

```json [响应参数]

{
  "respCode": "20000",
  "respMsg": "Success",
  "data": {
    "transactionId": "1815983598810308608",
    "responseTime": "2024-07-24 13:33:31",
    "txnTime": "2024-07-24 13:33:23",
    "txnTimeZone": "+08:00",
    "orderAmount": "200.00",
    "orderCurrency": "USD",
    "txnAmount": null,
    "txnCurrency": null,
    "status": "S",
    "redirectUrl": null,
    "contractId": null,
    "tokenId": null,
    "eci": "00",
    "periodValue": null,
    "codeForm": null,
    "presentContext": null,
    "actionType": null,
    "sign": "9f67a76835f4913eae68c624602c4504313f611ab146983a50d0fea9533c163b"
  }
}

```
:::