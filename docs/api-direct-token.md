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

</script>

# Token绑卡支付
绑卡支付：绑卡支付是用户将其信用卡或借记卡的信息与其账户进行关联（绑定），使得在未来的交易中，用户可以通过简单的验证步骤而不必再次输入详细的卡片信息来完成支付。这通常包括输入卡号、有效期、等信息。


## 获取Token

请求地址、请求方式、请求头 可以参考：

<br>

|   <div style="text-align: left;">名称</div>| 内容                                                          |
|----------------:|:---------------------------------------------------------------|
| Request URL :    | https://sandbox-acq.onerway.com/v1/txn/bindCard  |
| Request Method : | <div style="color:var(--vp-c-brand-1);font-weight:500;"> POST  </div>                                                        |
| Content-Type :  | <div style="color:var(--vp-c-brand-1);font-weight:500;">application/json      </div>                                        |

<br>

<div class="alertbox3">

::: tip  Content-Type: application/json; charset=UTF-8 错误   <br>Content-Type: application/json 正确 
:::

</div>

#### 请求参数


<div class="custom-table bordered-table">

| 名称             | 类型     | 长度  | 必填  | 签名  | 描述                                     |
|----------------|--------|-----|-----|-----|----------------------------------------|
| merchantNo     | String | 20  | Yes | Yes | 商户号。 商户注册时，OnerWay会为商户创建商户号            |
| appId          | String | 20  | Yes | Yes | 商户应用程序 `ID`。 商户注册网站时，OnerWay会为商户创建一个应用`id` |
| merchantCustId | String | 50  | Yes | Yes | 客户在商户的唯一标识                             |
| cardInfo       | String | /   | Yes | Yes | 交易卡信息，格式为 `json` 字符串。 请参阅对象  <CustomPopover title="TxnCardInfo" width="auto" reference="TxnCardInfo" link="/apis/api-direct-token.html#tokeninfo" ></CustomPopover>  |
| email          | String | 256 | Yes | Yes | 商户客户的邮箱                                |
| country        | String | 64  | Yes | Yes | 商户客户的国家。请参考 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes)。 <br>  <CMExample data="美国 is US     "></CMExample>      |
| transactionIp  | String | 64  | Yes | Yes | 商户客户的交易`IP  `                            |
| sign           | String | /   | Yes | No  | 签名字符串，请参阅  签名字符串，请参阅[Sign](./sign.html)                                    |                 |

</div>


<div class="custom-table bordered-table">

##### TxnCardInfo

| 名称         | 类型     | 长度  | 必填  | 签名 | 描述            |
|------------|--------|-----|-----|----|---------------|
| holderName | String | 48  | Yes | No | 持卡人姓名         |
| cardNumber | String | 128 | Yes | No | 持卡人的卡号        |
| month      | String | 64  | Yes | No | 卡号月份，例如： <br>  <CMExample data="03"></CMExample>  |
| year       | String | 64  | Yes | No | 卡号年份，例如： <br>  <CMExample data="2024"></CMExample>|
| cvv        | String | 64  | Yes | No | 卡号cvv         |

</div>


##### 响应参数


<div class="custom-table bordered-table">

| 名称       | 类型     | 签名 | 描述                    |
|----------|--------|----|-----------------------|
| respCode | String | No | 来自 Onerway 的响应码       |
| respMsg  | String | No | 来自 Onerway 的响应信息      |
| data     | Map    | No | 响应数据。 请参阅对象  <CustomPopover title="TokenInfo" width="auto" reference="TokenInfo" link="/apis/api-direct-token.html#tokeninfo" ></CustomPopover>   |

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
  "merchantNo":"800037",
  "appId":"1458672763818790912",
  "merchantCustId":"custId_1640247522000",
  "cardInfo":"{\"cardNumber\":\"4000027891380961\",\"cvv\":\"789\",\"month\":\"12\",\"year\":\"2022\",\"holderName\":\"CL BRW2\"}",
  "email":"shipping@test.com",
  "country":"US",
  "transactionIp":"127.0.0.1",
  "sign":"..."
}

```

```json[响应参数]

{
  "respCode": "20000",
  "respMsg": "Success",
  "data": {
    "transactionId": "1573856617225345201",
    "tokenId": "2a6f9b7720403a161860b6cc9e2121e3bf0e2c59bad870501e51233ce7f34f6a",
    "sign": "..."
  }
}

```
<div class="alertbox4">

::: tip 此示例仅限参考 请勿拿此示例直接请求。
:::

</div>

## Token绑卡支付

请求地址、请求方式、请求头 可以参考：

<br>

|   <div style="text-align: left;">名称</div>| 内容                                                          |
|----------------:|:---------------------------------------------------------------|
| Request URL :    | https://sandbox-acq.onerway.com/v1/txn/doTransaction  |
| Request Method : | <div style="color:var(--vp-c-brand-1);font-weight:500;"> POST  </div>                                                        |
| Content-Type :  | <div style="color:var(--vp-c-brand-1);font-weight:500;">application/json      </div>                                        |

<br>

<div class="alertbox3">

::: tip  Content-Type: application/json; charset=UTF-8 错误   <br>Content-Type: application/json 正确 
:::

</div>



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
  "//": "token支付",
  "merchantNo":"800037",
  "merchantTxnId":"16402473654230",
  "merchantTxnTime":"2022-07-12 17:39:30",
  "merchantTxnTimeZone":"+08:00",
  "productType":"CARD",
  "subProductType":"TOKEN",  // [!code error]
  "txnType":"SALE",
  "orderAmount":"200",
  "orderCurrency":"USD",
  "txnOrderMsg":"{\"returnUrl\":\"https://www.ronhan.com/\",\"products\":\"[{\\\"price\\\":\\\"110.00\\\",\\\"num\\\":\\\"1\\\",\\\"name\\\":\\\"iphone11\\\",\\\"currency\\\":\\\"USD\\\"}]\",\"transactionIp\":\"127.0.0.1\",\"appId\":1458672763818790912,\"javaEnabled\":false,\"colorDepth\":\"24\",\"screenHeight\":\"1080\",\"screenWidth\":\"1920\",\"timeZoneOffset\":\"-480\",\"accept\":\"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36\",\"contentLength\":\"340\",\"language\":\"zh-CN\"}",
  "shippingInformation":"{\"firstName\":\"ShippingFirstName\",\"lastName\":\"ShippingLastName\",\"phone\":\"188888888888\",\"email\":\"shipping@test.com\",\"postalCode\":\"888888\",\"address\":\"Shipping Address\",\"country\":\"CN\",\"province\":\"SH\",\"city\":\"SH\",\"street\":\"lujiazui\",\"number\":\"1\",\"identityNumber\":\"110000\"}",
  "billingInformation":"{\"firstName\":\"billingFirstName\",\"lastName\":\"billingLastName\",\"phone\":\"18600000000\",\"email\":\"billing@test.com\",\"postalCode\":\"430000\",\"address\":\"Billing Address\",\"country\":\"CN\",\"province\":\"HK\",\"city\":\"HK\",\"street\":\"jianshazui\",\"number\":\"2\",\"identityNumber\":\"220000\"}",
  "tokenInfo":"{\"tokenId\":\"2a6f9b7720403a161860b6cc9e2121e3bf0e2c59bad870501e51233ce7f34f6a\"}",  // [!code error]
  "sign":"..."  //这里的sign字符串需要通过签名获得    // [!code error]
}

```

```json[响应参数]
{
  "//": "token支付",
  "respCode": "20000",
  "respMsg": "Success",
  "data": {
    "transactionId": "1563942450861823816",
    "responseTime": "2022-07-12 17:39:32",
    "txnTime": "2022-07-12 17:39:31",
    "txnTimeZone": "+08:00",
    "orderAmount": "200.00",
    "orderCurrency": "USD",
    "txnAmount": null,
    "txnCurrency": null,
    "status": "R",
    "redirectUrl": "https://sandbox-v3-gw-dmz.pacypay.com//3dsSecure/direct/3DS_1563942450861823816",  // [!code error]
    "contractId": null,
    "tokenId": "2a6f9b7720403a161860b6cc9e2121e3bf0e2c59bad870501e51233ce7f34f6a",  // [!code error]
    "eci": null,
    "sign": "..."
  }  
}

```

<div class="alertbox4">

::: tip 此示例仅限参考 请勿拿此示例直接请求。
:::

</div>
