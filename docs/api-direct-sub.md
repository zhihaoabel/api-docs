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

# 订阅支付
订阅支付是指客户与商家之间建立的一种协议，允许商家根据预先设定的时间表自动收取客户的付款。


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


## 订阅支付

#### 请求参数

<div class="custom-table bordered-table">

| 名称             | 类型     | 长度 | 必填  | 签名  | 描述                           |
|----------------|--------|----|-----|-----|------------------------------|
| subProductType | String | 16 | Yes | Yes | SUBSCRIBE |

</div>



<div class="alertbox4">

::: tip   两方支付的本地支付，请求参数可参考两方支付信用卡支付，只需将`subProductType` 值改为` SUBSCRIBE` 即可；
:::

</div>

#### Subscription

<div class="custom-table bordered-table">

| 名称             | 类型     | 长度  | 必填  | 描述                                  |
|----------------|--------|-----|-----|-------------------------------------|
| requestType    | String | 1   | Yes | 订阅请求类型。 枚举如下：`0 - 首购 1 - 复购`          |
| merchantCustId | String | 50  | No  | 商户客户`id`，`requestType`为`0`时必填。            |
| expireDate     | String | 10  | No  | 过期日期，`requestType`为`0`时必填，格式为`yyyy-MM-dd `|
| frequencyType  | String | 1   | No  | 订阅频率类型，`requestType`为`0`时必填。枚举如下：`D - 天 ` |
| frequencyPoint | String | 2   | No  | 订阅频率点数，`requestType`为`0`时必填。            |
| contractId     | String | 20  | No  | 订阅合同`id`，`requestType`为`1`时必填。            |
| tokenId        | String | 300 | No  | 订阅令牌`id`，`requestType`为`1`时必填。            |

</div>

## 以下部分展示了订阅支付的请求示例：

### Request

https://sandbox-acq.onerway.com/v1/txn/doTransaction <Badge type="tip">POST</Badge>


::: code-group

```json[订阅首购请求]
{
  "//": "订阅首购",
  "merchantNo":"800037",
  "merchantTxnId":"1640247522000",
  "merchantTxnTime":"2021-12-22 15:30:30",
  "merchantTxnTimeZone":"+08:00",
  "productType":"CARD",
  "subProductType":"SUBSCRIBE",
  "txnType":"SALE",
  "orderAmount":"200",
  "orderCurrency":"USD",
  "txnOrderMsg":"{\"returnUrl\":\"https://www.ronhan.com/\",\"products\":\"[{\\\"price\\\":\\\"110.00\\\",\\\"num\\\":\\\"1\\\",\\\"name\\\":\\\"iphone11\\\",\\\"currency\\\":\\\"USD\\\"}]\",\"transactionIp\":\"127.0.0.1\",\"appId\":1458672763818790912,\"javaEnabled\":false,\"colorDepth\":\"24\",\"screenHeight\":\"1080\",\"screenWidth\":\"1920\",\"timeZoneOffset\":\"-480\",\"accept\":\"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36\",\"contentLength\":\"340\",\"language\":\"zh-CN\"}",
  "cardInfo":"{\"cardNumber\":\"4000027891380961\",\"cvv\":\"789\",\"month\":\"12\",\"year\":\"2022\",\"holderName\":\"CL BRW2\"}",
  "shippingInformation":"{\"firstName\":\"ShippingFirstName\",\"lastName\":\"ShippingLastName\",\"phone\":\"188888888888\",\"email\":\"shipping@test.com\",\"postalCode\":\"888888\",\"address\":\"Shipping Address\",\"country\":\"CN\",\"province\":\"SH\",\"city\":\"SH\",\"street\":\"lujiazui\",\"number\":\"1\",\"identityNumber\":\"110000\"}",
  "billingInformation":"{\"firstName\":\"billingFirstName\",\"lastName\":\"billingLastName\",\"phone\":\"18600000000\",\"email\":\"billing@test.com\",\"postalCode\":\"430000\",\"address\":\"Billing Address\",\"country\":\"CN\",\"province\":\"HK\",\"city\":\"HK\",\"street\":\"jianshazui\",\"number\":\"2\",\"identityNumber\":\"220000\"}",
  "subscription":"{\"merchantCustId\":\"custId_1640247522000\",\"requestType\":\"0\",\"expireDate\":\"2022-11-11\",\"frequencyType\":\"D\",\"frequencyPoint\":1}",
  "sign":"..."
}


```

```json[订阅复购请求]
{
  "//": "订阅复购",
  "merchantNo": "800037",
  "merchantTxnId": "1640323631000",
  "merchantTxnTime":"2021-12-22 15:30:30",
  "merchantTxnTimeZone":"+08:00",
  "productType":"CARD",
  "subProductType":"SUBSCRIBE",
  "txnType": "SALE",
  "orderAmount": "163",
  "orderCurrency": "USD",
  "txnOrderMsg":"{\"products\":\"[{\\\"price\\\":\\\"110.00\\\",\\\"num\\\":\\\"1\\\",\\\"name\\\":\\\"iphone11\\\",\\\"currency\\\":\\\"USD\\\"}]\"}",
  "cardInfo": null,
  "shippingInformation": null,
  "billingInformation":null,
  "subscription":"{\"requestType\":\"1\",\"tokenId\":\"2a6f9b7720403a161860b6cc9e2121e3bf0e2c59bad870501e51233ce7f34f6a\",\"contractId\":\"1473942457062490112\"}",
  "sign":"..."
}


```

```json[订阅首购响应]
{
  "//": "订阅首购",
  "respCode": "20000",
  "respMsg": "Success",
  "data": {
    "transactionId": "1473942456961826816",
    "responseTime": "2021-12-23 17:04:01",
    "txnTime": "2021-12-23 17:04:01",
    "txnTimeZone": "+08:00",
    "orderAmount": "200.00",
    "orderCurrency": "USD",
    "txnAmount": null,
    "txnCurrency": null,
    "status": "R",
    "redirectUrl": "https://sandbox-v3-gw-dmz.pacypay.com//3dsSecure/direct/3DS_1473942457892581377I",
    "contractId": "1473942457062490112",
    "tokenId": "2a6f9b7720403a161860b6cc9e2121e3bf0e2c59bad870501e51233ce7f34f6a",
    "eci": null,
    "sign": "..."
  }
}

```



```json[订阅复购响应]
{
  "//": "订阅复购",
  "respCode": "20000",
  "respMsg": "Success",
  "data": {
    "transactionId": "1474250301443518464",
    "responseTime": "2021-12-24 13:27:17",
    "txnTime": "2021-12-24 13:27:17",
    "txnTimeZone": "+08:00",
    "orderAmount": "163.00",
    "orderCurrency": "USD",
    "txnAmount": "163.00",
    "txnCurrency": "USD",
    "status": "S",
    "redirectUrl": null,
    "contractId": "1473942457062490112",
    "tokenId": "2a6f9b7720403a161860b6cc9e2121e3bf0e2c59bad870501e51233ce7f34f6a",
    "eci": null,
    "sign": "..."
  }
}

```

<div class="alertbox4">

::: tip 此示例仅限参考 请勿拿此示例直接请求。
:::

</div>


