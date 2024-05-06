---
outline: deep
---

<script setup>

</script>

# 收银台支付

收银台信用卡支付：指用户从原始交易网站或应用程序重定向到另一个专门处理信用卡支付的页面。

请求地址、请求方式、请求头 可以参考：


<div class="table-request-top" >

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

####  接入流程 <br><br>

<div style="height: 200px;">
  <el-steps direction="vertical" :active="5">
    <el-step title="请求收银台下单接口" process-status="success"></el-step>
    <el-step title="获取接口响应redirectUrl" process-status="success" ></el-step>
    <el-step title="重定向到获取的redirectUrl" process-status="success"></el-step>
    <el-step title="完成下单" process-status="success"></el-step>
    <el-step title="处理异步通知，更新订单状态。并返回异步通知中的transactionId" process-status="success"></el-step>
  </el-steps>
</div>

<!-- 1. 请求收银台下单接口
2. 获取接口响应redirectUrl
3. 重定向到获取的redirectUrl
4. 完成下单
5. 处理异步通知，更新订单状态。并返回异步通知中的transactionId -->


## 收银台支付

#### 请求参数


<div class="custom-table bordered-table">

| 名称	 | 类型   | 长度  | 必填	  | 签名  | 描述  |
|-------------|---------------|--------------|--------------|--------------|--------------|
| merchantNo  | String | 20 | Yes	 | Yes | 商户号。 商户注册时，OnerWay会为商户创建商户号 |                                           |
| merchantTxnId         | String | 64  | Yes | Yes | 商户创建的商户交易订单号，不同的订单号视为不同的交易                                              |
| merchantTxnTime       | String | /   | No  | Yes | 商户交易订单发生的时间。 格式为 yyyy\-MM\-dd HH:mm:ss                                  |
| merchantTxnTimeZone   | String | 64  | No  | Yes | 商户交易订单发生的时区。 例如：\+08:00                                                 |
| merchantTxnOriginalId | String | 128 | No  | Yes | 商户原始订单号。标记商户网站上唯一订单号，可重复，同一笔订单只能支付成功一次                                  |
| productType           | String | 16  | Yes | Yes | 产品类型，请参阅 ProductTypeEnum                                                |
| subProductType        | String | 16  | Yes | Yes | 子产品类型，请参阅 SubProductTypeEnum                                            |
| txnType               | String | 16  | Yes | Yes | 交易类型，请参阅 TxnTypeEnum                                                    |
| orderAmount           | String | 19  | Yes | Yes | 交易订单金额                                                                  |
| orderCurrency         | String | 8   | Yes | Yes | 交易订单的货币。 请参阅 ISO 4217 货币代码                                              |
| subscription          | String | /   | No  | Yes | 订阅付款所需的订阅信息。 格式为 json 字符串。 请参阅对象 Subscription                           |
| mpiInfo               | String | /   | No  | Yes | mpi信息，3ds验证结果集，risk3dsStrategy为EXTERNAL时需要。 格式为 json 字符串。 请参阅对象 MpiInfo |
| txnOrderMsg           | String | /   | YES  | Yes | 交易业务信息，除订阅复购外必填。 格式为 json 字符串。 请参阅对象 TxnOrderMsg                        |
| cardInfo              | String | /   | No  | Yes | 交易卡信息。 格式为 json 字符串。 请参阅对象 TxnCardInfo                                  |
| billingInformation    | String | /   | Yes  | Yes | 交易账单信息。 格式为 json 字符串。 请参阅对象 TransactionAddress                 |
| shippingInformation   | String | /   | Yes  | Yes | 交易邮寄信息。 格式为 json 字符串。 请参阅对象 TransactionAddress               |
| lpmsInfo              | String | /   | No  | Yes | 本地支付方式信息，productType为LPMS时必填，格式为json字符串。 请参阅对象 LpmsInfo                 |
| sign                  | String | /   | Yes | No  | 签名字符串。                                                                  |


</div>

#### TxnOrderMsg


<div class="custom-table bordered-table">

| 名称        | 类型     | 长度   | 必填  | 签名 | 描述                                                                                                                                                                                                                                               |
|-----------|--------|------|-----|----|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| returnUrl | String | 256  | Yes | No | 商户的回跳地址                                                                                                                                                                                                                                          |
| products  | String | 1024 | Yes | No | 产品信息列表。|
| appId     | String | 20   | Yes | No | 商户应用程序 ID。 <br/>商户注册网站时，OnerWay会为商户创建一个应用id                                                                                                                                                                                                           |
| notifyUrl | String | 256  | No  | No | 通知地址。详见通知                                                                                                                                                                                                                                        

</div>

::: warning  注意
products 必须为JSON字符串格式 。例如：其中type字段的枚举如下：<br>discount<br>shipping_fee 
:::

#### TxnCardInfo

<div class="custom-table bordered-table">

| 名称         | 类型     | 长度 | 必填 | 签名 | 描述    |
|------------|--------|----|----|----|-------|
| holderName | String | 48 | No | No | 持卡人姓名 |

</div>

#### TransactionAddress

<div class="custom-table bordered-table">

| 名称             | 类型     | 长度  | 必填  | 签名 | 描述                                                        |
|----------------|--------|-----|-----|----|-----------------------------------------------------------|
| firstName      | String | 64  | Yes  | No | 名 (虚拟商品可不传)                                                         |
| lastName       | String | 64  | Yes  | No | 姓 (虚拟商品可不传)                                                         |
| jpFirstName    | String | 64  | No  | no  | （日文片假名）名                                                   |
| jpLastName     | String | 64  | No  | no  | （日文片假名）姓                                                  |
| phone          | String | 32  | Yes  | No | 电话号码   (虚拟商品的可不传)                                                       |
| email          | String | 256 | Yes | No | 电子邮件                                                       |
| postalCode     | String | 32  | Yes  | No | 邮政编码  (虚拟商品可不传)                                                        |
| address        | String | 256 | Yes  | No | 地址    (虚拟商品可不传)                                                        |
| country        | String | 64  | Yes | No | 国家。 请参阅 ISO。 例如： 美国 is US    (虚拟商品可不传)                                |
| province       | String | 64  | Yes  | No | 州。 当国家是美国 \(US\) 或加拿大 \(CA\) 时必填。 请参阅 ISO。 例如：美属萨摩亚 is AS (虚拟商品可不传)    |
| city           | String | 64  | Yes  | NO | 城市 (虚拟商品可不传)                                                           |
| street         | String | 64  | No  | No  | 街道                                                        |
| number         | String | 64  | No  | No  | 门牌号                                                       |
| identityNumber | String | 64  | No  | No  | 证件号码                                                      |
| birthDate      | String | 64  | No  | No  | 出生日期，格式为 yyyy/MM/dd                                       |


</div>

::: warning  注意
销售虚拟商品的商户 必须提前与我们沟通。
:::



 #### 响应参数

 <div class="custom-table bordered-table">

| 名称       | 类型     | 签名 | 描述                  |
|----------|--------|----|---------------------|
| respCode | String | No | 来自 Onerway 的响应码     |
| respMsg  | String | No | 来自 Onerway 的响应信息    |
| data     | Map    | No | 响应数据。 请参阅对象 TxnInfo |

</div>


 #### TxnInfo


 <div class="custom-table bordered-table">

| 名称            | 类型     | 签名  | 描述                                                |
|---------------|--------|-----|---------------------------------------------------|
| transactionId | String | Yes | Onerway创建的交易订单号，对应商户订单号                           |
| merchantNo    | String | Yes | 商户号。 商户注册时，OnerWay会为商户创建商户号                       |
| merchantTxnId | String | Yes | 商户创建的商户交易订单号，不同的订单号视为不同的交易                        |
| responseTime  | String | Yes | 接口响应时间，格式为yyyy\-MM\-dd HH:mm:ss                   |
| txnTime       | String | Yes | 交易完成时间，格式为yyyy\-MM\-dd HH:mm:ss                   |
| txnTimeZone   | String | Yes | 交易完成时区，例如：\+08:00                                 |
| orderAmount   | String | Yes | 交易订单金额                                            |
| orderCurrency | String | Yes | 交易订单币种。 请参阅 ISO 4217 货币代码                         |
| txnAmount     | String | Yes | 订单金额转换成结算币种后的金额                                   |
| txnCurrency   | String | Yes | 结算币种。 请参阅 ISO 4217 货币代码                           |
| status        | String | Yes | 交易处理结果。 请参阅 TxnStatusEnum                         |
| reason        | String | Yes | 交易失败的原因                                           |
| redirectUrl   | String | Yes | 当交易状态为U时，需要将商户重定向到这里才能打开收银页面（url需要经过URLDecoder解码） |
| sign          | String | No  | 签名字符串。                                            |

</div>


## 以下部分展示了收银台接口的请求响应示例：


https://sandbox-v3-acquiring.pacypay.com/v1/txn/doTransaction <Badge type="tip">POST</Badge>

::: code-group

```json [请求参数]

{
  "merchantNo": "800252",
  "merchantTxnId": "164604252511",
  "merchantTxnTime":"2022-02-28 15:30:30",
  "merchantTxnTimeZone":"+08:00",
  "productType":"CARD",   // [!code error]
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

```json [响应参数]

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
:::

::: warning  此示例仅限参考 请勿拿此示例直接请求。
:::