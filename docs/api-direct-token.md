---
outline: deep
---
<script setup>

  import {reactive, ref, watch, onMounted, unref } from 'vue'; 
import {requestGen, secret} from "./util/utils";
import CMExample from './components/CMExample.vue';
import CMNote from './components/CMNote.vue';
import CustomPopover from './components/element-ui/CustomPopover.vue'; 
import CustomTable from "./components/element-ui/CustomTable.vue";
import {TopRight, View} from "@element-plus/icons-vue";
import { ClickOutside as vClickOutside } from 'element-plus';
import {TxnCardInfoDirect, TokenProviderEnum} from './util/constants';

</script>

# Token绑卡支付
绑卡支付：绑卡支付是用户将其信用卡或借记卡的信息与其账户进行关联（绑定），使得在未来的交易中，用户可以通过简单的验证步骤而不必再次输入详细的卡片信息来完成支付。这通常包括输入卡号、有效期、等信息。


## 获取Token

#### 请求参数

<div class="custom-table bordered-table">

| 名称             | 类型     | 长度  | 必填  | 签名  | 描述                                     |
|----------------|--------|-----|-----|-----|----------------------------------------|
| merchantNo     | String | 20  | Yes | Yes | 商户号。 商户注册时，OnerWay会为商户创建商户号            |
| appId          | String | 20  | Yes | Yes | 商户应用程序 `ID`。 商户注册网站时，OnerWay会为商户创建一个应用`id` |
| merchantCustId | String | 50  | Yes | Yes | 客户在商户的唯一标识                             |
| cardInfo       | String | /   | Yes | Yes |交易卡信息。 格式为 `json` 字符串。 请参阅对象           <CustomPopover title="CardInfo" width="auto" reference="CardInfo" link="/apis/apis/api-casher#txncardinfodirect" > <CustomTable :data="TxnCardInfoDirect.data" :columns="TxnCardInfoDirect.columns"></CustomTable>  </CustomPopover>                                    |
| email          | String | 256 | Yes | Yes | 商户客户的邮箱                                |
| country        | String | 64  | Yes | Yes | 商户客户的国家。请参考 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes)。 <br>  <CMExample data="美国 is US     "></CMExample>      |
| transactionIp  | String | 64  | Yes | Yes | 商户客户的交易`IP  `                            |
| sign           | String | /   | Yes | No  | 签名字符串，请参阅  签名字符串，请参阅[Sign](./sign.html)                                    |                 |

</div>


<div class="custom-table bordered-table">

##### TxnCardInfo

| 名称         | 类型     | 长度  | 必填  | 描述            |
|------------|--------|-----|-----|---------------|
| holderName | String | 48  | Yes | 持卡人姓名         |
| cardNumber | String | 128 | Yes | 持卡人的卡号        |
| month      | String | 64  | Yes | 卡号月份，例如： <br>  <CMExample data="03"></CMExample>  |
| year       | String | 64  | Yes | 卡号年份，例如： <br>  <CMExample data="2024"></CMExample>|
| cvv        | String | 64  | Yes | 卡号cvv         |

</div>


##### 响应参数


<div class="custom-table bordered-table">

| 名称       | 类型     | 签名 | 描述                                                                                                                         |
|----------|--------|----|----------------------------------------------------------------------------------------------------------------------------|
| respCode | String | No | 来自 Onerway 的响应码                                                                                                            |
| respMsg  | String | No | 来自 Onerway 的响应信息                                                                                                           |
| data     | Map    | No | 响应数据。 请参阅对象  token信息，`subProductType`为`TOKEN`或`AUTO_DEBIT`时必填，格式为`json`字符串。 请参阅对象[TokenInfo](./api-direct-token#tokeninfo) |

</div>

##### TokenInfo

<div class="custom-table bordered-table">

| 名称            | 类型     | 签名  | 描述              |
|---------------|--------|-----|-----------------|
| transactionId | String | Yes | Onerway创建的交易订单号 |
| tokenId       | String | Yes | 绑卡令牌id          |
| sign          | String | No  | 签名字符串，请参阅  签名字符串，请参阅[Sign](./sign.html)              |

</div>


## 以下部分展示了获取token的请求以及响应示例：

https://sandbox-acq.onerway.com/v1/txn/bindCard <Badge type="tip">POST</Badge>

::: code-group

```json[请求参数]
{
  "appId": "1739545982264549376",
  "cardInfo": "{\"cardNumber\":\"4000027891380961\",\"cvv\":\"789\",\"month\":\"12\",\"year\":\"2030\",\"holderName\":\"CL BRW2\"}",
  "country": "US",
  "email": "abel.wang@onerway.com",
  "merchantCustId": "1721281425000",
  "merchantNo": "800209",
  "sign": "8ed606575b1ef776d6bc2d6881251650e68848e6c0b8fab6b368cdab19f2223c",
  "transactionIp": "127.0.0.1"
}

```

```json[响应参数]
{
  "respCode": "20000",
  "respMsg": "Success",
  "data": {
    "transactionId": "1813811878687023104",
    "tokenId": "42fbae15a31ec71a1870c7fc859081cbee838cf3da7c76d9c40abe55c20fc0fc",
    "sign": "a8102449f8395d7181c68868ae0ad397f6b0d8993fc7dd8a306b63d5e39f107b"
  }
}

```
<div class="alertbox4">

::: tip 此示例仅限参考 请勿拿此示例直接请求。
:::

</div>

## Token绑卡支付

#### 请求参数

| 名称             | 类型     | 长度 | 必填  | 签名  | 描述                           |
|----------------|--------|----|-----|-----|------------------------------|
| subProductType | String | 16 | Yes | Yes | TOKEN |
| tokenInfo      | String | /  | No  | Yes | token信息，`subProductType`为`TOKEN`或`AUTO_DEBIT`时必填，格式为`json`字符串。 请参阅对象  <CustomPopover title="TokenInfo" width="auto" reference="TokenInfo" link="/apis/api-direct-token.html#tokeninfo" ></CustomPopover>    |



<div class="alertbox4">

::: tip   `Token`绑卡支付，请求参数可参考两方支付信用卡支付，请求参数 `subProductType:TOKEN`，以及`tokenInfo `都需必传
:::

</div>


## 以下部分展示了token支付的请求响应示例：

### Request

https://sandbox-acq.onerway.com/v1/txn/doTransaction <Badge type="tip">POST</Badge>

::: code-group

```json[请求参数]
{
    "billingInformation": "{\"country\":\"US\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"17700492982\",\"address\":\"Apt. 870\",\"city\":\"Hayward\",\"postalCode\":\"66977\",\"identityNumber\":\"717.628.937-97\"}",
    "merchantNo": "800209",
    "merchantTxnId": "1721283822000",
    "merchantTxnTime": "2024-07-18 14:23:42",
    "merchantTxnTimeZone": "+08:00",
    "orderAmount": "200",
    "orderCurrency": "USD",
    "productType": "CARD",
    "shippingInformation": "{\"country\":\"US\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"17700492982\",\"address\":\"Apt. 870\",\"city\":\"Hayward\",\"postalCode\":\"66977\",\"identityNumber\":\"717.628.937-97\"}",
    "sign": "e485c5f18ac69af9f3fac7e85017c0b493601c0abefb9c10de588f12ea80ab02",  // [!code error]
    "subProductType": "TOKEN",
    "tokenInfo": "{\"tokenId\":\"42fbae15a31ec71a1870c7fc859081cbee838cf3da7c76d9c40abe55c20fc0fc\"}",  // [!code error]
    "txnOrderMsg": "{\"returnUrl\":\"https://www.merchant-store-website.com/\",\"appId\":\"1739545982264549376\",\"notifyUrl\":\"https://www.merchant-store-notify.com/\",\"products\":\"[{\\\"name\\\":\\\"Pro1\\\",\\\"price\\\":\\\"50.00\\\",\\\"num\\\":\\\"2\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"Pro2\\\",\\\"price\\\":\\\"100\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"shipping fee\\\",\\\"price\\\":\\\"10\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\",\\\"type\\\":\\\"shipping_fee\\\"},{\\\"name\\\":\\\"discount\\\",\\\"price\\\":\\\"-10\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\",\\\"type\\\":\\\"discount\\\"}]\",\"transactionIp\":\"127.0.0.1\"}",
    "txnType": "SALE"
}

```

```json[响应参数]
{
    "respCode": "20000",
    "respMsg": "Success",
    "data": {
        "transactionId": "1813821933129965568",
        "responseTime": "2024-07-18 14:23:44",
        "txnTime": "2024-07-18 14:23:42",
        "txnTimeZone": "+08:00",
        "orderAmount": "200.00",
        "orderCurrency": "USD",
        "txnAmount": null,
        "txnCurrency": null,
        "status": "R",
        "redirectUrl": "https://sandbox-gw-dmz.onerway.com/3dsSecure/direct/RDT_3DS_I_8002091813821934429941761",
        "contractId": null,
        "tokenId": null,
        "eci": null,
        "periodValue": null,
        "codeForm": null,
        "presentContext": null,
        "actionType": "RedirectURL",
        "sign": "f912b853fddecffa91fc47a95b879a4d9074c85ab4cad46f138df061f3e73495"
    }
}

```

<div class="alertbox4">

::: tip 此示例仅限参考 请勿拿此示例直接请求。
:::

</div>
