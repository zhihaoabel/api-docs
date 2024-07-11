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


| 名称          | 类型     | 长度 | 必填  | 签名  | 描述                       |
|-------------|--------|----|-----|-----|--------------------------|
| productType | String | 16 | Yes | Yes | 产品类型，请参阅   <CustomPopover title="MpiInfo" width="auto" reference="SubProductTypeEnum" link="/apis/enums.html#producttypeenum" ></CustomPopover> |


</div>

  

<div class="alertbox4">

::: tip  聚合收银台请求参数可参考收银台信用卡支付，只需将`productType：CARD` 改为 `productType：ALL`即可
:::

</div>





## 以下部分展示了聚合收银台的请求示例：


https://sandbox-acq.onerway.com/txn/payment <Badge type="tip">POST</Badge>



::: code-group

```json [请求参数]

{
  "billingInformation": "{\"country\":\"BE\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"17700492982\",\"address\":\"Apt. 870\",\"city\":\"Hayward\",\"postalCode\":\"66977\",\"identityNumber\":\"12345678\"}",
  "merchantNo": "800209",
  "merchantTxnId": 1720490458000,
  "merchantTxnTime": "2024-01-30 07:10:51",
  "merchantTxnTimeZone": "+08:00",
  "orderAmount": "10",
  "orderCurrency": "EUR",
  "productType": "ALL",  // [!code error]
  "shippingInformation": "{\"country\":\"BE\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"17700492982\",\"address\":\"Apt. 870\",\"city\":\"Hayward\",\"postalCode\":\"66977\",\"identityNumber\":\"12345678\"}",
  "sign": "30749b4890d8174d024ca2b14067a88966ec14a4be5811a316dd9fc122d0d06b",   // [!code error]
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
    "transactionId": "1810494636444487680",
    "merchantTxnId": "1720490532000",
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
    "redirectUrl": "https://sandbox-checkout.onerway.com/aggregate?key=484c56a7ffc4414495d3ff7d19b32872",  // [!code error]
    "sign": "1be89be9a11b0455ad3f9c502be32d500691db9d125488994e15dc32dc0d7b3b",
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


| 名称          | 类型     | 长度 | 签名  | 描述                                                                                                                                                                  |
|-------------|--------|----|-----|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| lpmsInfo | String | /  | Yes | 用来指定使用哪个本地支付方式。格式为json字符串。 请参阅对象   <CustomPopover title="LpmsTypeEnum" width="auto" reference="LpmsTypeEnum" link="/apis/enums.html#lpmstypeenum" ></CustomPopover> |


</div>


<div class="alertbox2">

::: tip 如您需要指定本地支付方式在聚合收银台中，只显示某一种本地支付，只需要在 lpmsInfo 中指定即可,例如：  `"  \"lpmsInfo\":\"{\\\"lpmsType\\\":\\\"Skrill\\\",\\\"bankName\\\":\\\"\\\",\\\"iban\\\":\\\"\\\"}\" `  则收银台上只展示 ` Skrill ` 这一种本地支付，其余的本地支付、信用卡支付 都将不显示。 
:::

</div>



## 以下为指定本地支付样例：


::: code-group

```json [请求参数]
{
  "billingInformation": "{\"country\":\"BE\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"17700492982\",\"address\":\"Apt. 870\",\"city\":\"Hayward\",\"postalCode\":\"66977\",\"identityNumber\":\"12345678\"}",
  "merchantNo": "800209",
  "merchantTxnId": 1720503232000,
  "merchantTxnTime": "2024-01-30 07:10:51",
  "merchantTxnTimeZone": "+08:00",
  "orderAmount": "10",
  "orderCurrency": "EUR",
  "productType": "ALL",
  "shippingInformation": "{\"country\":\"BE\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"17700492982\",\"address\":\"Apt. 870\",\"city\":\"Hayward\",\"postalCode\":\"66977\",\"identityNumber\":\"12345678\"}",
  "sign": "3c9a1aee6bfcaaf81453b9fd76144fd42a77b3dff5f032715b5f6f0c9db60678",   // [!code error]
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
        "transactionId": "1759879333348245504",
        "merchantTxnId": "1720503232000",
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
        "redirectUrl": "https://sandbox-checkout.onerway.com/checkout?key=19d6513ee000463783532f576c10dbcb",  // [!code error]
        "sign": "64cf0651986e86e109e6e2804b74bdeecb94cd7cb310c15711f7138867b0cac7",
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