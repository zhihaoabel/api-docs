---
outline: deep
---
<script setup>

</script>

# 订阅
订阅支付是指客户与商家之间建立的一种协议，允许商家根据预先设定的时间表自动收取客户的付款。

请求地址、请求方式、请求头 可以参考：


<div class="table-request-top">

| 名称 | 内容                                                          |
|----------------|---------------------------------------------------------------|
| Request URL    | https://sandbox-v3-acquiring.pacypay.com/txn/payment |
| Request Method | POST                                                          |
| Content-Type   | application/json                                              |

</div>

::: warning  注意:
Content-Type: application/json; charset=UTF-8 错误 
    <br>Content-Type: application/json 正确 
:::


## 订阅支付
请求参数

<div class="custom-table bordered-table">

| 名称          | 类型     | 长度 | 必填  | 签名  | 描述                       |
|-------------|--------|----|-----|-----|--------------------------|
| subProductType | String | 16 | Yes | Yes | 子产品类型，请参阅 SubProductTypeEnum |
| subscription          | String | /   | No  | Yes | 订阅付款所需的订阅信息。 格式为 json 字符串。 请参阅对象 Subscription                           |

</div>

::: warning   订阅请求参数可参考收银台信用卡支付，只需将"subProductType":"DIRECT",改为 subProductType："SUBSCRIBE" 即可
:::



## 以下部分展示了订阅支付的请求示例：



https://sandbox-v3-acquiring.pacypay.com/txn/payment <Badge type="tip">POST</Badge>




::: code-group

```json [请求参数]
{
  "merchantNo":"800052",
  "merchantTxnId":"1640247522000",
  "merchantTxnTime":"2021-12-22 15:30:30",
  "merchantTxnTimeZone":"+08:00",
  "productType":"CARD",
  "subProductType":"SUBSCRIBE",   // [!code error]
  "txnType":"SALE",
  "orderAmount":"200",
  "orderCurrency":"USD",
  "txnOrderMsg":"{\"returnUrl\":\"https://www.ronhan.com/\",\"products\":\"[{\\\"price\\\":\\\"110.00\\\",\\\"num\\\":\\\"1\\\",\\\"name\\\":\\\"iphone11\\\",\\\"currency\\\":\\\"USD\\\"}]\",\"transactionIp\":\"127.0.0.1\",\"appId\":1458672763818790912,\"javaEnabled\":false,\"colorDepth\":\"24\",\"screenHeight\":\"1080\",\"screenWidth\":\"1920\",\"timeZoneOffset\":\"-480\",\"accept\":\"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36\",\"contentLength\":\"340\",\"language\":\"zh-CN\"}",
  "cardInfo":"{\"cardNumber\":\"4000027891380961\",\"cvv\":\"789\",\"month\":\"12\",\"year\":\"2022\",\"holderName\":\"CL BRW2\"}",
  "shippingInformation":"{\"firstName\":\"ShippingFirstName\",\"lastName\":\"ShippingLastName\",\"phone\":\"188888888888\",\"email\":\"shipping@test.com\",\"postalCode\":\"888888\",\"address\":\"Shipping Address\",\"country\":\"CN\",\"province\":\"SH\",\"city\":\"SH\",\"street\":\"lujiazui\",\"number\":\"1\",\"identityNumber\":\"110000\"}",
  "billingInformation":"{\"firstName\":\"billingFirstName\",\"lastName\":\"billingLastName\",\"phone\":\"18600000000\",\"email\":\"billing@test.com\",\"postalCode\":\"430000\",\"address\":\"Billing Address\",\"country\":\"CN\",\"province\":\"HK\",\"city\":\"HK\",\"street\":\"jianshazui\",\"number\":\"2\",\"identityNumber\":\"220000\"}",
  "subscription":"{\"merchantCustId\":\"custId_1640247522000\",\"requestType\":\"0\",\"expireDate\":\"2022-11-11\",\"frequencyType\":\"D\",\"frequencyPoint\":1}",
  "sign":""  //这里的sign字符串需要通过签名获得
}
```

```json [响应参数]


{
    "respCode": "20000",
    "respMsg": "Success",
    "data": {
        "transactionId": "1759879333348245504",
        "merchantTxnId": "164604252511",
        "merchantNo": "800052",
        "responseTime": "",
        "txnTime": "",
        "orderAmount": "20.00",
        "orderCurrency": "USD",
        "txnAmount": "",
        "txnCurrency": null,
        "txnTimeZone": null,
        "status": "U",
        "reason": null,
        "redirectUrl": "https://sandbox-checkout.onerway.com/checkout?key=19d6513ee000463783532f576c10dbcb",
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

::: warning  此示例仅限参考 请勿拿此示例直接请求。
:::