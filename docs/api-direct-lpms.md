---
outline: deep
---
<script setup>



import {reactive, ref, watch, onMounted, unref } from 'vue'; 
import {requestGen, secret} from "./util/utils";
import {ProductTypeEnum as ProductTypeEnumTable,SubProductTypeEnum as SubProductTypeEnumTable,TxnTypeEnum as TxnTypeEnumTable, LpmsTypeEnum, EFTBankNameEnum, Przelewy24BankNameEnum} from "./util/constants";
import CMExample from './components/CMExample.vue';
import CMNote from './components/CMNote.vue';
import CustomPopover from './components/element-ui/CustomPopover.vue'; 
import CustomTable from "./components/element-ui/CustomTable.vue";
import {TopRight, View} from "@element-plus/icons-vue";
import { ClickOutside as vClickOutside } from 'element-plus';


</script>

# 本地支付
本地支付：两方支付的本地支付接口 无需通过第三方方收银台跳转，将通过直连的方式跳转到对应的本地支付。


## 本地支付

#### 请求参数

<div class="custom-table bordered-table">

| 名称          | 类型     | 长度 | 必填  | 签名  | 描述                                                                                                                                                                                                                                                                       |
|-------------|--------|----|-----|-----|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| productType | String | 16 | Yes | Yes | 产品类型，本地支付填写‘LPMS’。请参阅 <br/><CustomPopover title="ProductTypeEnum" width="auto" reference="ProductTypeEnum" link="/apis/enums.html#producttypeenum"><CustomTable :data="ProductTypeEnumTable.data" :columns="ProductTypeEnumTable.columns"></CustomTable></CustomPopover> |
| lpmsInfo | String | / | No | Yes | 本地支付方式信息，`productType`为`LPMS`时，除协议代扣外必填，格式为`json`字符串。 请参阅对象 [LpmsInfo](./api-direct-lpms#lpmsinfo)                                                                                                                                                                       |


</div>


<div class="alertbox4">

::: tip   两方支付的本地支付，请求参数可参考两方支付信用卡支付，需将 `productType：CARD` 改为 `productType：LPMS` ,`lpmsInfo` 传需要对接的本地支付。
:::

</div>


##### LpmsInfo


<div class="custom-table bordered-table">


| 名称            | 类型     | 长度  | 必填  | 签名 | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|---------------|--------|-----|-----|----|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| lpmsType      | String | 64  | Yes | No | 本地支付方式。 请参阅 <CustomPopover title="LpmsTypeEnum" width="auto" reference="LpmsTypeEnum" link="/apis/enums.html#lpmstypeenum" >  <CustomTable :data="LpmsTypeEnum.data" :columns="LpmsTypeEnum.columns"></CustomTable> </CustomPopover>                                                                                                                                                                                                                                                                                                                                            |
| bankName      | String | 128 | No  | No | 银行名称，某些本地支付方式需要。`lpmsType`为`EFT`时请参阅  <CustomPopover title="EFTBankNameEnum" width="auto" reference="EFTBankNameEnum" link="/apis/enums.html#eftbanknameenum" >  <CustomTable :data="EFTBankNameEnum.data" :columns="EFTBankNameEnum.columns"></CustomTable> </CustomPopover>       。 `lpmsType`为Przelewy24时请参阅    <CustomPopover title="Przelewy24BankNameEnum" width="auto" reference="Przelewy24BankNameEnum" link="/apis/enums.html#przelewy24banknameenum" >  <CustomTable :data="Przelewy24BankNameEnum.data" :columns="Przelewy24BankNameEnum.columns"></CustomTable> </CustomPopover> |
| iBan          | String | 64  | No  | No | 银行账户，部分地区转账时需要                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| prepaidNumber | String | /   | No  | No | 预付费卡号，部分支付方式需要                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

</div>
## 以下部分展示了本地支付的请求响应示例：

### Request

https://sandbox-acq.onerway.com/v1/txn/doTransaction <Badge type="tip">POST</Badge>

::: code-group

```json [请求参数]
{
  "billingInformation": "{\"country\":\"BR\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"8522847035\",\"address\":\"Apt. 870\",\"city\":\"Hayward\",\"postalCode\":\"66977\",\"identityNumber\":\"86258406122\"}",
  "lpmsInfo": "{\"lpmsType\":\"Boleto\",\"bankName\":\"\",\"iban\":\"\"}",
  "merchantNo": "800209",
  "merchantTxnId": "1721291898000",
  "merchantTxnTime": "2024-07-18 16:38:18",
  "merchantTxnTimeZone": "+08:00",
  "orderAmount": "20.00",
  "orderCurrency": "BRL",
  "productType": "LPMS",
  "shippingInformation": "{\"country\":\"BR\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"8522847035\",\"address\":\"Apt. 870\",\"city\":\"Hayward\",\"postalCode\":\"66977\",\"identityNumber\":\"86258406122\"}",
  "sign": "d342edbc884fb6821c50ff84ce5f8042a9462772c0556f8aea23ae523006e2b8",
  "subProductType": "DIRECT",
  "txnOrderMsg": "{\"returnUrl\":\"https://www.merchant-store-website.com/\",\"appId\":\"1739545982264549376\",\"notifyUrl\":\"https://www.merchant-store-notify.com/\",\"products\":\"[{\\\"name\\\":\\\"Pro1\\\",\\\"price\\\":\\\"50.00\\\",\\\"num\\\":\\\"2\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"Pro2\\\",\\\"price\\\":\\\"100\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"shipping fee\\\",\\\"price\\\":\\\"10\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\",\\\"type\\\":\\\"shipping_fee\\\"},{\\\"name\\\":\\\"discount\\\",\\\"price\\\":\\\"-10\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\",\\\"type\\\":\\\"discount\\\"}]\",\"transactionIp\":\"127.0.0.1\"}",
  "txnType": "SALE"
}

```


```json [响应参数]
{
  "respCode": "20000",
  "respMsg": "Success",
  "data": {
    "transactionId": "1813855806303903744",
    "responseTime": "2024-07-18 16:38:20",
    "txnTime": "2024-07-18 16:38:18",
    "txnTimeZone": "+08:00",
    "orderAmount": "20.00",
    "orderCurrency": "BRL",
    "txnAmount": null,
    "txnCurrency": null,
    "status": "R",
    "redirectUrl": "https://sandbox.dlocal.com/gmf-apm/payments/M-a4f04d73-ecf2-4d5f-849b-07c8c48db94f",
    "contractId": null,
    "tokenId": null,
    "eci": null,
    "periodValue": null,
    "codeForm": null,
    "presentContext": null,
    "actionType": "RedirectURL",
    "sign": "9f6352760bf12bca3395d163a159fba92e2228017118497f69272fd93204ac7d"
  }
}


```

<div class="alertbox4">

::: tip 此示例仅限参考 请勿拿此示例直接请求。
:::

</div>






