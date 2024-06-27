---
outline: deep
---
<script setup>

import {reactive, ref, watch, onMounted, unref } from 'vue'; 
import {requestGen, secret} from "./util/utils";
import {ProductTypeEnumTable,SubProductTypeEnumTable,TxnTypeEnumTable} from "./util/constants";
import CMExample from './components/CMExample.vue';
import CMNote from './components/CMNote.vue';
import CustomPopover from './components/element-ui/CustomPopover.vue'; 
import CustomTable from "./components/element-ui/CustomTable.vue";
import {TopRight, View} from "@element-plus/icons-vue";
import { ClickOutside as vClickOutside } from 'element-plus';


</script>

# 聚合收银台

聚合收银台：指用户从原始交易网站或应用程序重定向到另一个专门处理支付的页面时同时本地支付以及信用卡支付的收银台。

请求地址、请求方式、请求头 可以参考：


<br>

|   <div style="text-align: left;">名称</div>| 内容                                                          |
|----------------:|:---------------------------------------------------------------|
| Request URL :    | https://sandbox-acq.onerway.com/txn/payment  |
| Request Method : | <div style="color:var(--vp-c-brand-1);font-weight:500;"> POST  </div>                                                        |
| Content-Type :  | <div style="color:var(--vp-c-brand-1);font-weight:500;">application/json      </div>                                        |

<br>

<div class="alertbox3">

::: tip  Content-Type: application/json; charset=UTF-8 错误   <br>Content-Type: application/json 正确 
:::

</div>



## 聚合收银台

请求参数

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
  "merchantNo": "800252",
  "merchantTxnId": "164604252511",
  "merchantTxnTime":"2022-02-28 15:30:30",
  "merchantTxnTimeZone":"+08:00",
  "productType":"ALL",  // [!code error]
  "subProductType":"DIRECT",
  "txnType": "SALE",	
  "orderAmount": "20",
  "orderCurrency": "USD",
  "shippingInformation":"{\"firstName\":\"da\",\"lastName\":\"xiong\",\"phone\":\"8522847000\",\"email\":\"shipping@example.com\",\"postalCode\":\"123456\",\"address\":\"HHHEEII\",\"country\":\"KR\",\"province\":\"BABA\",\"city\":\"BALALA\",\"street\":\"1010\",\"number\":\"20-1202\",\"identityNumber\":\"11112223333\",\"birthDate\":\"2020/12/28\"}",
  "billingInformation":"{\"firstName\":\"José\",\"lastName\":\"Silva\",\"phone\":\"8522847035\",\"email\":\"jose@example.com\",\"postalCode\":\"61919-230\",\"address\":\"Rua E\",\"country\":\"KR\",\"province\":\"CE\",\"city\":\"Maracanaú\",\"street\":\"1040\",\"identityNumber\":\"853.513.468-93\",\"birthDate\":\"2000/12/20\"}",
  "txnOrderMsg": "{\"returnUrl\":\"https://www.ronhan.com/\",\"products\":\"[{\\\"name\\\":\\\"iphone 11\\\",\\\"price\\\":\\\"5300.00\\\",\\\"num\\\":\\\"2\\\",\\\"currency\\\":\\\"USD\\\"}]\",\"appId\":1755154682941415424}",
  "sign":""  //这里的sign字符串需要通过签名获得    //  [!code highlight]
}

```

```json [响应参数]

{
    "respCode": "20000",
    "respMsg": "Success",
    "data": {
        "transactionId": "1759879333348245504",
        "merchantTxnId": "164604252511",
        "merchantNo": "800252",
        "responseTime": "",
        "txnTime": "",
        "orderAmount": "20.00",
        "orderCurrency": "USD",
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

::: tip 此示例仅限参考 请勿拿此示例直接请求。
:::

</div>


## 指定本地支付方式


<div class="alertbox2">

::: tip 如您需要指定本地支付方式在聚合收银台中，只显示某一种本地支付，只需要在 lpmsInfo 中指定即可,例如：  `"  \"lpmsInfo\":\"{\\\"lpmsType\\\":\\\"Skrill\\\",\\\"bankName\\\":\\\"\\\",\\\"iban\\\":\\\"\\\"}\" `  则收银台上只展示 ` Skrill ` 这一种本地支付，其余的本地支付、信用卡支付 都将不显示。 
:::

</div>



## 以下为指定本地支付样例：


::: code-group

```json [请求参数]

{
  "merchantNo": "800252",
  "merchantTxnId": "164604252511",
  "merchantTxnTime":"2022-02-28 15:30:30",
  "merchantTxnTimeZone":"+08:00",
  "productType":"ALL",  // [!code error]
  "subProductType":"DIRECT",
  "txnType": "SALE",	
  "orderAmount": "20",
  "orderCurrency": "USD",
  "lpmsInfo":"{\"lpmsType\":\"Skrill\",\"bankName\":\"\",\"iban\":\"\"}",  // [!code error]
  "shippingInformation":"{\"firstName\":\"da\",\"lastName\":\"xiong\",\"phone\":\"8522847000\",\"email\":\"shipping@example.com\",\"postalCode\":\"123456\",\"address\":\"HHHEEII\",\"country\":\"KR\",\"province\":\"BABA\",\"city\":\"BALALA\",\"street\":\"1010\",\"number\":\"20-1202\",\"identityNumber\":\"11112223333\",\"birthDate\":\"2020/12/28\"}",
  "billingInformation":"{\"firstName\":\"José\",\"lastName\":\"Silva\",\"phone\":\"8522847035\",\"email\":\"jose@example.com\",\"postalCode\":\"61919-230\",\"address\":\"Rua E\",\"country\":\"KR\",\"province\":\"CE\",\"city\":\"Maracanaú\",\"street\":\"1040\",\"identityNumber\":\"853.513.468-93\",\"birthDate\":\"2000/12/20\"}",
  "txnOrderMsg": "{\"returnUrl\":\"https://www.ronhan.com/\",\"products\":\"[{\\\"name\\\":\\\"iphone 11\\\",\\\"price\\\":\\\"5300.00\\\",\\\"num\\\":\\\"2\\\",\\\"currency\\\":\\\"USD\\\"}]\",\"appId\":1755154682941415424}",
  "sign":""  //这里的sign字符串需要通过签名获得    //  [!code highlight]
}

```

```json [响应参数]

{
    "respCode": "20000",
    "respMsg": "Success",
    "data": {
        "transactionId": "1759879333348245504",
        "merchantTxnId": "164604252511",
        "merchantNo": "800252",
        "responseTime": "",
        "txnTime": "",
        "orderAmount": "20.00",
        "orderCurrency": "USD",
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

::: tip 此示例仅限参考 请勿拿此示例直接请求。
:::

</div>