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

# Token支付
Token绑卡支付：绑卡支付是用户将其信用卡或借记卡的信息与其账户进行关联（绑定），使得在未来的交易中，用户可以通过简单的验证步骤而不必再次输入详细的卡片信息来完成支付。这通常包括输入卡号、有效期、等信息。

## Token绑卡支付

#### 请求参数

<div class="custom-table bordered-table">

| 名称             | 类型     | 长度 | 必填  | 签名  | 描述                                                                                                              |
|----------------|--------|----|-----|-----|-----------------------------------------------------------------------------------------------------------------|
| subProductType | String | 16 | Yes | Yes | TOKEN支付’subProductType‘使用’TOKEN‘                                                                                     |
| tokenInfo      | String | /  | No  | Yes | token信息，`subProductType`为`TOKEN`或`AUTO_DEBIT`时必填，格式为`json`字符串。 请参阅对象  [TokenInfo](./api-direct-token#tokeninfo) |





::: tip   `Token`支付，在两方支付接口中，设置 `subProductType:TOKEN`，以及`tokenInfo `参数
:::

</div>

##### TokenInfo

<div class="custom-table bordered-table">

| 名称            | 类型     | 签名  | 描述              |
|---------------|--------|-----|-----------------|
| transactionId | String | Yes | Onerway创建的交易订单号 |
| tokenId       | String | Yes | 绑卡令牌id          |
| sign          | String | No  | 签名字符串，请参阅[Sign](./sign)接口             |

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
    "sign": "e485c5f18ac69af9f3fac7e85017c0b493601c0abefb9c10de588f12ea80ab02",  
    "subProductType": "TOKEN",  // [!code error]
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
        "redirectUrl": "https://www.merchant-store-website.com",
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

::: tip 此示例仅限参考 请勿拿此示例直接请求。
:::

