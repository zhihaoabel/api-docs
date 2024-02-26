---
outline: deep
---
<script setup>

</script>

# 订阅
订阅支付是指客户与商家之间建立的一种协议，允许商家根据预先设定的时间表自动收取客户的付款。

请求地址、请求方式、请求头 可以参考：

| 名称 | 内容                                                          |
|----------------|---------------------------------------------------------------|
| Request URL    | https://sandbox-v3-acquiring.pacypay.com/txn/payment |
| Request Method | POST                                                          |
| Content-Type   | application/json                                              |


::: warning  注意:
Content-Type: application/json; charset=UTF-8 错误 
    <br>Content-Type: application/json 正确 
:::


## 订阅支付
请求参数

| 名称          | 类型     | 长度 | 必填  | 签名  | 描述                       |
|-------------|--------|----|-----|-----|--------------------------|
| subProductType | String | 16 | Yes | Yes | 子产品类型，请参阅 SubProductTypeEnum |


::: warning   订阅请求参数可参考收银台信用卡支付，只需将"subProductType":"DIRECT",改为 subProductType："SUBSCRIBE" 即可
:::



## 以下部分展示了订阅支付的请求示例：

### Request

https://sandbox-v3-acquiring.pacypay.com/txn/payment <Badge type="tip">POST</Badge>

```json
{
  "merchantNo": "800252",
  "merchantTxnId": "164604252511",
  "merchantTxnTime":"2022-02-28 15:30:30",
  "merchantTxnTimeZone":"+08:00",
  "productType":"CARD",
  "subProductType":"SUBSCRIBE",
  "txnType": "SALE",	
  "orderAmount": "20",
  "orderCurrency": "USD",
  "shippingInformation":"{\"firstName\":\"da\",\"lastName\":\"xiong\",\"phone\":\"8522847000\",\"email\":\"shipping@example.com\",\"postalCode\":\"123456\",\"address\":\"HHHEEII\",\"country\":\"KR\",\"province\":\"BABA\",\"city\":\"BALALA\",\"street\":\"1010\",\"number\":\"20-1202\",\"identityNumber\":\"11112223333\",\"birthDate\":\"2020/12/28\"}",
  "billingInformation":"{\"firstName\":\"José\",\"lastName\":\"Silva\",\"phone\":\"8522847035\",\"email\":\"jose@example.com\",\"postalCode\":\"61919-230\",\"address\":\"Rua E\",\"country\":\"KR\",\"province\":\"CE\",\"city\":\"Maracanaú\",\"street\":\"1040\",\"identityNumber\":\"853.513.468-93\",\"birthDate\":\"2000/12/20\"}",
  "txnOrderMsg": "{\"returnUrl\":\"https://www.ronhan.com/\",\"products\":\"[{\\\"name\\\":\\\"iphone 11\\\",\\\"price\\\":\\\"5300.00\\\",\\\"num\\\":\\\"2\\\",\\\"currency\\\":\\\"USD\\\"}]\",\"appId\":1755154682941415424}",
  "sign":""  //这里的sign字符串需要通过签名获得
}

```

::: warning  此示例仅限参考 请勿拿此示例直接请求。
:::

## 以下部分展示了订阅支付响应示例：

### Response

```json

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

