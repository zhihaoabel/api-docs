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


# 绑卡支付

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
| sign           | String | /   | Yes | No  | 签名字符串，请参阅[Sign](./sign)接口                                   |                 |

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
| data     | Map    | No | 响应数据。 请参阅对象  token信息，`subProductType`为`TOKEN`或`AUTO_DEBIT`时必填，格式为`json`字符串。 请参阅对象[TokenInfo](./api-direct-bind-card#tokeninfo) |

</div>

##### TokenInfo

<div class="custom-table bordered-table">

| 名称            | 类型     | 签名  | 描述              |
|---------------|--------|-----|-----------------|
| transactionId | String | Yes | Onerway创建的交易订单号 |
| tokenId       | String | Yes | 绑卡令牌id          |
| sign          | String | No  | 签名字符串，请参阅[Sign](./sign)接口             |

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
    "transactionId": "1813811878687023104",    // [!code error]
    "tokenId": "42fbae15a31ec71a1870c7fc859081cbee838cf3da7c76d9c40abe55c20fc0fc",  // [!code error]
    "sign": "a8102449f8395d7181c68868ae0ad397f6b0d8993fc7dd8a306b63d5e39f107b" 
  }
}

```
<div class="alertbox4">

::: tip 此示例仅限参考 请勿拿此示例直接请求。
:::

</div>
