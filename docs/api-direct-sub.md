---
outline: deep
---
<script setup>


import {reactive, ref, watch, onMounted, unref } from 'vue'; 
import {requestGen, secret} from "./util/utils";
import {ProductTypeEnum as ProductTypeEnumTable,SubProductTypeEnum as SubProductTypeEnumTable,TxnTypeEnum as TxnTypeEnumTable, SubProductTypeEnum} from "./util/constants";
import CMExample from './components/CMExample.vue';
import CMNote from './components/CMNote.vue';
import CustomPopover from './components/element-ui/CustomPopover.vue'; 
import CustomTable from "./components/element-ui/CustomTable.vue";
import {TopRight, View} from "@element-plus/icons-vue";
import { ClickOutside as vClickOutside } from 'element-plus';


</script>

# 订阅支付
订阅支付是指客户与商家之间建立的一种协议，允许商家根据预先设定的时间表自动收取客户的付款。

## 请求参数

<div class="custom-table bordered-table">

| 名称             | 类型     | 长度 | 必填  | 签名  | 描述                           |
|----------------|--------|----|-----|-----|------------------------------|
| subProductType | String | 16 | Yes | Yes | 子产品类型，请参阅   <CustomPopover title="SubProductTypeEnum" width="auto" reference="SubProductTypeEnum" link="/apis/enums.html#subproducttypeenum" >  <CustomTable :data="SubProductTypeEnum.data" :columns="SubProductTypeEnum.columns"></CustomTable> </CustomPopover> |

</div>



<div class="alertbox4">

::: tip   两方支付的本地支付，请求参数可参考两方支付信用卡支付，只需将`subProductType` 值改为` SUBSCRIBE` 即可；
:::

</div>

#### Subscription

<!--@include: ./parts/subscription.md-->

## 以下部分展示了订阅支付的请求示例：

### Request

https://sandbox-acq.onerway.com/v1/txn/doTransaction <Badge type="tip">POST</Badge>


::: code-group

```json[订阅首购请求]
{
   "//": "订阅首购",
   "billingInformation": "{\"country\":\"US\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"17700492982\",\"address\":\"Apt. 870\",\"city\":\"Hayward\",\"postalCode\":\"66977\",\"identityNumber\":\"12345678\"}",
   "cardInfo": "{\"cardNumber\":\"4000020951595032\",\"cvv\":\"789\",\"month\":\"12\",\"year\":\"2030\",\"holderName\":\"CL BRW2\"}",
   "merchantCustId": "1721287451000",
   "merchantNo": "800209",
   "merchantTxnId": "1721287451000",
   "merchantTxnTime": "2024-07-18 15:24:11",
   "merchantTxnTimeZone": "+08:00",
   "orderAmount": "10",
   "orderCurrency": "USD",
   "productType": "CARD",
   "shippingInformation": "{\"country\":\"US\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"17700492982\",\"address\":\"Apt. 870\",\"city\":\"Hayward\",\"postalCode\":\"66977\",\"identityNumber\":\"12345678\"}",
   "sign": "93a3289383e3111b37bf3a9d41a5579acdfee43730b3dc5e36e2d0ea0e2fb02f",
   "subProductType": "SUBSCRIBE",  // [!code error]
   "subscription": "{\"merchantCustId\":\"1721287451000\",\"requestType\":0,\"expireDate\":\"2030-11-11\",\"frequencyType\":\"D\",\"frequencyPoint\":1,\"tokenId\":\"\",\"contractId\":\"\"}", // [!code error]
   "txnOrderMsg": "{\"returnUrl\":\"https://www.merchant-store-website.com/\",\"appId\":\"1739545982264549376\",\"notifyUrl\":\"https://www.merchant-store-notify.com/\",\"products\":\"[{\\\"name\\\":\\\"Pro1\\\",\\\"price\\\":\\\"50.00\\\",\\\"num\\\":\\\"2\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"Pro2\\\",\\\"price\\\":\\\"100\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"shipping fee\\\",\\\"price\\\":\\\"10\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\",\\\"type\\\":\\\"shipping_fee\\\"},{\\\"name\\\":\\\"discount\\\",\\\"price\\\":\\\"-10\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\",\\\"type\\\":\\\"discount\\\"}]\",\"transactionIp\":\"127.0.0.1\"}",
   "txnType": "SALE"
}


```

```json[订阅复购请求]
{
    "//": "订阅复购",
    "merchantCustId": "1721287886000",
    "merchantNo": "800209",
    "merchantTxnId": "1721287886000",
    "merchantTxnTime": "2024-07-18 15:31:26",
    "merchantTxnTimeZone": "+08:00",
    "orderAmount": "10",
    "orderCurrency": "USD",
    "productType": "CARD",
    "sign": "f752bdee4e1842787ce4fe1cb1cbb98e6acebfcc5bb199a8a605ae3b1bbc3fef",
    "subProductType": "SUBSCRIBE",  // [!code error]
    "subscription": "{\"requestType\":\"1\",\"tokenId\":\"822ba14cc565ab56887029673e244c57daf3eb2373a70a6bfd4132f1d8ad059c\",\"contractId\":\"1813837154846384128\",\"merchantCustId\":\"1721287886000\"}",  // [!code error]
    "txnOrderMsg": "{\"products\":\"[{\\\"price\\\":\\\"110.00\\\",\\\"num\\\":\\\"1\\\",\\\"name\\\":\\\"iphone11\\\",\\\"currency\\\":\\\"USD\\\"}]\",\"appId\":\"1739545982264549376\"}",
    "txnType": "SALE"
}


```

```json[订阅首购响应]
{
    "//": "订阅首购",
    "respCode": "20000",
    "respMsg": "Success",
    "data": {
        "transactionId": "1813839291336761344",
        "responseTime": "2024-07-18 15:32:48",
        "txnTime": "2024-07-18 15:32:41",
        "txnTimeZone": "+08:00",
        "orderAmount": "10.00",
        "orderCurrency": "USD",
        "txnAmount": null,
        "txnCurrency": null,
        "status": "S",
        "redirectUrl": null,
        "contractId": "1813839291387092992",  // [!code error]
        "tokenId": "42e76067938dd5d4250e475f376648cd8274c559c9a3484dffc094a996f4b02e",  // [!code error]
        "eci": null,
        "periodValue": null,
        "codeForm": null,
        "presentContext": null,
        "actionType": null,
        "sign": "b6194118ac1f707cf4a6138b22c58296501a8ac0d011ae0d33e9e12265393471"
    }
}

```



```json[订阅复购响应]
{
    "//": "订阅复购",
    "respCode": "20000",
    "respMsg": "Success",
    "data": {
        "transactionId": "1813838978852724736",
        "responseTime": "2024-07-18 15:31:29",
        "txnTime": "2024-07-18 15:31:26",
        "txnTimeZone": "+08:00",
        "orderAmount": "10.00",
        "orderCurrency": "USD",
        "txnAmount": null,
        "txnCurrency": null,
        "status": "S",
        "redirectUrl": null,
        "contractId": "1813837154846384128",// [!code error]
        "tokenId": "822ba14cc565ab56887029673e244c57daf3eb2373a70a6bfd4132f1d8ad059c",  // [!code error]
        "eci": null,
        "periodValue": null,
        "codeForm": null,
        "presentContext": null,
        "actionType": null,
        "sign": "2a07b1cd9fc2e8f52ab648fd398407f305fd2f4e67088641e9b51cf517ce1e74"
    }
}

```

<div class="alertbox4">

::: tip 此示例仅限参考 请勿拿此示例直接请求。
:::

</div>


