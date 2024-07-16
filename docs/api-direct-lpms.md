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

# 本地支付
本地支付：两方支付的本地支付接口 无需通过第三方方收银台跳转，将通过直连的方式跳转到对应的本地支付。


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

## 本地支付

#### 请求参数

<div class="custom-table bordered-table">

| 名称          | 类型     | 长度 | 必填  | 签名  | 描述                       |
|-------------|--------|----|-----|-----|--------------------------|
| productType | String | 16 | Yes | Yes | LPMS  |
| lpmsInfo | String | / | No | Yes | 本地支付方式信息，`productType`为`LPMS`时，除协议代扣外必填，格式为`json`字符串。 请参阅对象   <CustomPopover title="LpmsInfo" width="auto" reference="LpmsInfo" link="/apis/enums.html#lpmsinfo" ></CustomPopover> |


</div>


<div class="alertbox4">

::: tip   两方支付的本地支付，请求参数可参考两方支付信用卡支付，需将 `productType：CARD` 改为 `productType：LPMS` ,`lpmsInfo` 传需要对接的本地支付。
:::

</div>


##### LpmsInfo


<div class="custom-table bordered-table">


| 名称            | 类型     | 长度  | 必填  | 签名 | 描述                                                                                               |
|---------------|--------|-----|-----|----|--------------------------------------------------------------------------------------------------|
| lpmsType      | String | 64  | Yes | No | 本地支付方式。 请参阅 LpmsTypeEnum    <CustomPopover title="EFTBankNameEnum" width="auto" reference="eftbanknameenum" link="/apis/enums.html#lpmstypeenum" ></CustomPopover>                                                                       |
| bankName      | String | 128 | No  | No | 银行名称，某些本地支付方式需要。`lpmsType`为`EFT`时请参阅    <CustomPopover title="EFTBankNameEnum" width="auto" reference="eftbanknameenum" link="/apis/enums.html#eftbanknameenum" ></CustomPopover>      。 `lpmsType`为Przelewy24时请参阅    <CustomPopover title="Przelewy24BankNameEnum" width="auto" reference="Przelewy24BankNameEnum" link="/apis/enums.html#przelewy24banknameenum" ></CustomPopover> |
| iBan          | String | 64  | No  | No | 银行账户，部分地区转账时需要                                                                                   |
| prepaidNumber | String | /   | No  | No | 预付费卡号，部分支付方式需要                                                                                   |

</div>
## 以下部分展示了本地支付的请求响应示例：

### Request

https://sandbox-acq.onerway.com/v1/txn/doTransaction <Badge type="tip">POST</Badge>

::: code-group

```json [请求参数]
{
  "merchantNo": "800037",
  "merchantTxnId": "1646043155000",
  "merchantTxnTime":"2022-02-28 15:30:30",
  "merchantTxnTimeZone":"+08:00",
  "productType":"LPMS",   // [!code error]
  "subProductType":"DIRECT",
  "txnType": "SALE",
  "orderAmount": "20",
  "orderCurrency":  "BRL",
  "txnOrderMsg": "{\"returnUrl\":\"https://www.ronhan.com/\",\"products\":\"[{\\\"name\\\":\\\"iphone 11\\\",\\\"price\\\":\\\"5300.00\\\",\\\"num\\\":\\\"2\\\",\\\"currency\\\":\\\"CNY\\\"}]\",\"transactionIp\":\"2600:1700:f0f1:1e30:d08f:c6da:976c:45cd\",\"appId\":1493520562615545856}",
  "lpmsInfo":"{\"lpmsType\":\"Boleto\",\"bankName\":\"\",\"iban\":\"\"}",  // [!code error]
  "shippingInformation":"{\"firstName\":\"da\",\"lastName\":\"xiong\",\"phone\":\"8522847000\",\"email\":\"shipping@example.com\",\"postalCode\":\"123456\",\"address\":\"HHHEEII\",\"country\":\"MY\",\"province\":\"BABA\",\"city\":\"BALALA\",\"street\":\"1010\",\"number\":\"20-1202\",\"identityNumber\":\"11112223333\",\"birthDate\":\"2020/12/28\"}",
  "billingInformation":"{\"firstName\":\"José\",\"lastName\":\"Silva\",\"phone\":\"8522847035\",\"email\":\"jose@example.com\",\"postalCode\":\"61919-230\",\"address\":\"Rua E\",\"country\":\"BR\",\"province\":\"CE\",\"city\":\"Maracanaú\",\"street\":\"1040\",\"identityNumber\":\"853.513.468-93\",\"birthDate\":\"2000/12/20\"}",
  "sign":"..."
}

```


```json [响应参数]
{
  "respCode": "20000",
  "respMsg": "Success",
  "data": {
    "transactionId": "1498239706186051584",
    "responseTime": "2022-02-28 18:12:37",
    "txnTime": "2022-02-28 18:12:36",
    "txnTimeZone": "+08:00",
    "orderAmount": "20.00",
    "orderCurrency": "BRL",
    "txnAmount": null,
    "txnCurrency": null,
    "status": "R",
    "redirectUrl": "https://sandbox.ebanxpay.com/print/?hash=621ca01414557c5009067504858cd223b90efca03add5c94",
    "contractId": null,
    "tokenId": null,
    "eci": null,
    "periodValue": null,
    "sign": "..."
  }
}


```

<div class="alertbox4">

::: tip 此示例仅限参考 请勿拿此示例直接请求。
:::

</div>






