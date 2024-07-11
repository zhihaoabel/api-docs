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

# 聚合收银台

聚合支付：顾客从商家网站或应用程序重定向到支付供应商的托管页面进行支付。

## 请求参数

 <div class="custom-table bordered-table">

| 名称          | 类型     | 长度 | 必填  | 签名  | 描述                                                                                                                                              |
|-------------|--------|----|-----|-----|-------------------------------------------------------------------------------------------------------------------------------------------------|
| productType | String | 16 | Yes | Yes | 产品类型，请参阅   <CustomPopover title="MpiInfo" width="auto" reference="SubProductTypeEnum" link="/apis/enums.html#producttypeenum" ></CustomPopover> |

</div>

::: tip  聚合收银台请求参数可参考收银台信用卡支付，只需将`productType` 由 `CARD` 改为 `ALL`即可

```json lines
{
  // 聚合收银台参数更新，其他参数请参考收银台信用卡支付
  "productType": "ALL"
}
```
:::

## 以下部分展示了聚合收银台的请求示例：

https://sandbox-acq.onerway.com/txn/payment <Badge type="tip">POST</Badge>

::: code-group

```json [请求参数]

{
  "billingInformation": "{\"country\":\"BE\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"17700492982\",\"address\":\"Apt. 870\",\"city\":\"Hayward\",\"postalCode\":\"66977\",\"identityNumber\":\"12345678\"}",
  "merchantCustId": "custId_1640247522000",
  "merchantNo": "800209",
  "merchantTxnId": 1720682002000,
  "merchantTxnTime": "2024-01-30 07:10:51",
  "merchantTxnTimeZone": "+08:00",
  "orderAmount": "10",
  "orderCurrency": "EUR",
  "productType": "ALL", // [!code error]
  "shippingInformation": "{\"country\":\"BE\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"17700492982\",\"address\":\"Apt. 870\",\"city\":\"Hayward\",\"postalCode\":\"66977\",\"identityNumber\":\"12345678\"}",
  "sign": "7bd7dee1cdde3c5f0dfef6922aafba3594dde992debfd33fdd36ed337c2d0c44", // [!code error]
  "subProductType": "DIRECT",
  "txnOrderMsg": "{\"returnUrl\":\"https://docs.onerway.com/\",\"products\":\"[{\\\"price\\\":\\\"110.00\\\",\\\"num\\\":\\\"1\\\",\\\"name\\\":\\\"iphone11\\\",\\\"currency\\\":\\\"CNY\\\"}]\",\"transactionIp\":\"127.0.0.1\",\"appId\":\"1739545982264549376\",\"javaEnabled\":false,\"colorDepth\":\"24\",\"screenHeight\":\"1080\",\"screenWidth\":\"1920\",\"timeZoneOffset\":\"-480\",\"accept\":\"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36\",\"contentLength\":\"340\",\"language\":\"zh-CN\"}",
  "txnType": "SALE"
}

```

```json [响应参数]

{
  "respCode": "20000",
  "respMsg": "Success",
  "data": {
    "transactionId": "1811297724159889408",
    "merchantTxnId": "1720682002000",
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
    "redirectUrl": "https://sandbox-checkout.onerway.com/aggregate?key=7095b9fbc61543178a1d2edd7c5423d4", // [!code error]
    "sign": "5ae50da2598ffe8a1bb3797b1177140e6eaeaccc1f3a9c7be50cae5cd78fb0d3",
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

::: tip 此示例仅限参考 请勿拿此示例直接请求。
:::

</div>


## 指定本地支付方式

 <div class="custom-table bordered-table">

| 名称       | 类型     | 长度 | 签名  | 描述                                                                         |
|----------|--------|----|-----|----------------------------------------------------------------------------|
| lpmsInfo | String | /  | Yes | 用来指定使用哪个本地支付方式。格式为json字符串。 请参阅对象 [LpmsTypeEnum](./enums.html#lpmstypeenum) |

</div>

::: tip 商户可通过 `lpmsInfo` 指定收银台展示的支付方式 

例如：

```json
{
  // 通过 lpmsInfo 指定收银台展示的支付方式，其他请求参数参考收银台信用卡支付
  "lpmsInfo": "{\"lpmsType\":\"OXXO\",\"bankName\":\"\",\"iban\":\"\"}"
}

```
则收银台上只展示 ` OXXO ` 这一种本地支付，其余的本地支付、信用卡支付都不会展示。 
:::

## 以下为指定本地支付样例：

::: code-group

```json [请求参数]
{
  "billingInformation": "{\"country\":\"NL\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"17700492982\",\"address\":\"Apt. 870\",\"city\":\"Hayward\",\"postalCode\":\"66977\",\"identityNumber\":\"12345678\"}",
  "lpmsInfo": "{\"lpmsType\":\"SEPADD\"}",
  "merchantCustId": 1720680372000,
  "merchantNo": "800209",
  "merchantTxnId": 1720680372000,
  "merchantTxnTime": "2024-01-30 07:10:51",
  "merchantTxnTimeZone": "+08:00",
  "orderAmount": "10",
  "orderCurrency": "USD",
  "productType": "ALL",
  "shippingInformation": "{\"country\":\"NL\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"17700492982\",\"address\":\"Apt. 870\",\"city\":\"Hayward\",\"postalCode\":\"66977\",\"identityNumber\":\"12345678\"}",
  "sign": "17ec7ed3adb9141062da2177eedc69b7cbcfde041107da12885c48c50c15a10f",   // [!code error]
  "subProductType": "DIRECT",   // [!code error]
  "txnOrderMsg": "{\"returnUrl\":\"https://docs.onerway.com/\",\"products\":\"[{\\\"price\\\":\\\"110.00\\\",\\\"num\\\":\\\"1\\\",\\\"name\\\":\\\"iphone11\\\",\\\"currency\\\":\\\"CNY\\\"}]\",\"transactionIp\":\"127.0.0.1\",\"appId\":\"1739545982264549376\",\"javaEnabled\":false,\"colorDepth\":\"24\",\"screenHeight\":\"1080\",\"screenWidth\":\"1920\",\"timeZoneOffset\":\"-480\",\"accept\":\"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36\",\"contentLength\":\"340\",\"language\":\"zh-CN\"}",
  "txnType": "SALE"
}

```

```json [响应参数]

{
  "respCode": "20000",
  "respMsg": "Success",
  "data": {
    "transactionId": "1811290882969047040",
    "merchantTxnId": "1720680372000",
    "merchantNo": "800209",
    "responseTime": "",
    "txnTime": "",
    "orderAmount": "10.00",
    "orderCurrency": "USD",
    "txnAmount": "",
    "txnCurrency": null,
    "txnTimeZone": null,
    "status": "U",
    "reason": null,
    "redirectUrl": "https://sandbox-checkout.onerway.com/aggregate?key=5c450e93737c4db0ad3c3c9e71f963da", // [!code error] 
    "sign": "92ce7d94d74039dc50f124309e5d5fe059210cebe428ccc27ca73c112eb66f82",
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