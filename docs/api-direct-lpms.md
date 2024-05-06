---
outline: deep
---
<script setup>

</script>

# 本地支付
本地支付：两方支付的本地支付接口 无需通过第三方方收银台跳转，将通过直连的方式跳转到对应的本地支付。


请求地址、请求方式、请求头 可以参考：


<div class="table-request-top">

| 名称 | 内容                                                          |
|----------------|---------------------------------------------------------------|
| Request URL    | https://sandbox-v3-acquiring.pacypay.com/v1/txn/doTransaction |
| Request Method | POST                                                          |
| Content-Type   | application/json                                              |

</div>

::: warning  注意:
Content-Type: application/json; charset=UTF-8 错误 
    <br>Content-Type: application/json 正确 
:::


## 本地支付

#### 请求参数

<div class="custom-table bordered-table">

| 名称          | 类型     | 长度 | 必填  | 签名  | 描述                       |
|-------------|--------|----|-----|-----|--------------------------|
| productType | String | 16 | Yes | Yes | LPMS  |
| lpmsInfo | String | / | No | Yes | 本地支付方式信息，productType为LPMS时，除协议代扣外必填，格式为json字符串。 请参阅对象 LpmsInfo |


</div>

::: warning   两方支付的本地支付，请求参数可参考两方支付信用卡支付，需将 productType：CARD 改为 productType：LPMS ,lpmsInfo 传需要对接的本地支付。
:::



##### LpmsInfo

<div class="custom-table bordered-table">

| 名称            | 类型     | 长度  | 必填  | 签名 | 描述                                                                                               |
|---------------|--------|-----|-----|----|--------------------------------------------------------------------------------------------------|
| lpmsType      | String | 64  | Yes | No | 本地支付方式。 请参阅 LpmsTypeEnum                                                                         |
| bankName      | String | 128 | No  | No | 银行名称，某些本地支付方式需要。lpmsType为EFT时请参阅 EFTBankNameEnum。 lpmsType为Przelewy24时请参阅 Przelewy24BankNameEnum |
| iBan          | String | 64  | No  | No | 银行账户，部分地区转账时需要                                                                                   |
| prepaidNumber | String | /   | No  | No | 预付费卡号，部分支付方式需要                                                                                   |

</div>

## 以下部分展示了本地支付的请求响应示例：

### Request

https://sandbox-v3-acquiring.pacypay.com/v1/txn/doTransaction <Badge type="tip">POST</Badge>

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

::: warning  此示例仅限参考 请勿拿此示例直接请求。
:::





