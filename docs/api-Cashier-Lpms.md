---
outline: deep
---
<script setup>

</script>



# 本地支付
收银台本地支付:指用户从原始交易网站或应用程序重定向到另一个专门处理支付的页面时只展示本地支付的收银台。


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



## 本地支付

请求参数

<div class="custom-table bordered-table">

| 名称          | 类型     | 长度 | 必填  | 签名  | 描述                       |
|-------------|--------|----|-----|-----|--------------------------|
| productType | String | 16 | Yes | Yes | 产品类型，请参阅 ProductTypeEnum |                                       |
    
</div>


::: warning   收银台支付的本地支付，请求参数可参考收银台信用卡支付，只需将productType：CARD 改为 productType：LPMS 即可；如您信用卡和本地支付需要同时使用，则需改为productType：ALL 打开聚合收银台
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



  <el-tabs v-model="activeName" >
    <el-tab-pane label="请求参数" name="first">

### Request

https://sandbox-v3-acquiring.pacypay.com/txn/payment <Badge type="tip">POST</Badge>

```json
{
  "merchantNo": "800252",
  "merchantTxnId": "164604252511",
  "merchantTxnTime":"2022-02-28 15:30:30",
  "merchantTxnTimeZone":"+08:00",
  "productType":"LPMS",
  "subProductType":"DIRECT",
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
</el-tab-pane>
    <el-tab-pane label="响应参数" name="second">

### Response

响应参数

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
```
</el-tab-pane>
  </el-tabs>

<script>
  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
  };
</script>

