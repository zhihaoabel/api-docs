---
outline: deep
---
<script setup>

</script>

# 两方支付
两方支付，也常被称为站内支付，通常指的是在同一个平台或应用内部完成的支付流程，不需要用户跳转到外部的第三方页面或应用进行支付。


::: tip  对于商家来说，站内支付不仅可以提升整体用户体验。还可以通过站内支付收集用户支付行为数据，用于分析用户习惯、推荐商品，从而更好的服务消费者。两方支付商户必须提供PCI  DSS（支付卡行业数据安全标准）
:::



请求地址、请求方式、请求头 可以参考：

| 名称 | 内容                                                          |
|----------------|---------------------------------------------------------------|
| Request URL    | https://sandbox-v3-acquiring.pacypay.com/v1/txn/doTransaction |
| Request Method | POST                                                          |
| Content-Type   | application/json                                              |


::: warning  注意:
Content-Type: application/json; charset=UTF-8 错误 
    <br>Content-Type: application/json 正确 
:::


## 两方支付

#### 请求参数

| 名称                    | 类型     | 长度  | 必填  | 签名  | 描述                                                                                             |
|-----------------------|--------|-----|-----|-----|------------------------------------------------------------------------------------------------|
| merchantNo            | String | 20  | Yes | Yes | 商户号。 商户注册时，OnerWay会为商户创建商户号                                                                    |
| merchantTxnId         | String | 64  | Yes | Yes | 商户创建的商户交易订单号，不同的订单号视为不同的交易                                                                     |
| merchantTxnTime       | String | /   | No  | Yes | 商户交易订单发生的时间。 格式为 yyyy-MM-dd HH:mm:ss                                                           |
| merchantTxnTimeZone   | String | 64  | No  | Yes | 商户交易订单发生的时区。 例如：+08:00                                                                         |
| merchantTxnOriginalId | String | 128 | No  | Yes | 商户原始订单号。标记商户网站上唯一订单号，可重复，同一笔订单只能支付成功一次                                                         |
| productType           | String | 16  | Yes | Yes | 产品类型，请参阅 ProductTypeEnum                                                                       |
| subProductType        | String | 16  | Yes | Yes | 子产品类型，请参阅 SubProductTypeEnum                                                                   |
| txnType               | String | 16  | Yes | Yes | 交易类型，请参阅 TxnTypeEnum                                                                           |
| paymentMode           | String | 16  | No  | Yes | 支付模式。 请参阅 PaymentModeEnum。默认为WEB                                                               |
| osType                | String | 16  | No  | Yes | 操作系统类型。 请参阅 OsTypeEnum。paymentMode不是WEB时必填                                                     |
| orderAmount           | String | 19  | Yes | Yes | 交易订单金额                                                                                         |
| orderCurrency         | String | 8   | Yes | Yes | 交易订单的货币。 请参阅 ISO 4217 货币代码                                                                     |
| originTransactionId   | String | 20  | No  | Yes | 来源于Onerway的原始交易订单号，常用于退款等反向交易时通过此ID查找对应的交易订单号                                                  |
| risk3dsStrategy       | String | 16  | No  | Yes | 3ds风险控制策略。 请参阅 Risk3dsStrategyEnum                                                             |
| subscription          | String | /   | No  | Yes | 订阅付款所需的订阅信息。 格式为 json 字符串。 请参阅对象 Subscription                                                  |
| mpiInfo               | String | /   | No  | Yes | mpi信息，3ds验证结果集，risk3dsStrategy为EXTERNAL时需要。 格式为 json 字符串。 请参阅对象 MpiInfo                        |
| txnOrderMsg           | String | /   | No  | Yes | 交易业务信息，除订阅复购外必填。 格式为 json 字符串。 请参阅对象 TxnOrderMsg                                               |
| cardInfo              | String | /   | No  | Yes | 交易卡信息，productType为CARD时，除订阅复购、Token支付、Google Pay、Apple Pay外必填。 格式为 json 字符串。 请参象 TxnCardInfo |
| billingInformation    | String | /   | No  | Yes | 交易账单信息，除订阅复购外必填。 格式为 json 字符串。 请参阅对象 TransactionAddress                                        |
| shippingInformation   | String | /   | No  | Yes | 交易邮寄信息，除订阅复购外必填。 格式为 json 字符串。 请参阅对象 TransactionAddress                                        |
| lpmsInfo              | String | /   | No  | Yes | 本地支付方式信息，productType为LPMS时，除协议代扣外必填，格式为json字符串。 请参阅对象 LpmsInfo                                 |
| tokenInfo             | String | /   | No  | Yes | token信息，subProductType为TOKEN或AUTO_DEBIT时必填，格式为json字符串。 请参阅对象 TokenInfo                         |
| sign                  | String | /   | Yes | No  | 签名字符串。                                                                                         |
                    

#### TxnOrderMsg


| 名称             | 类型      | 长度   | 必填  | 签名 | 描述                                                                                                                                                                                                                               |
|----------------|---------|------|-----|----|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| returnUrl      | String  | 256  | Yes | No | 商户的回跳地址                                                                                                                                                                                                                          |
| products       | String  | 1024 | Yes | No | 产品信息列表。 格式为 json 字符串。 例如：[{"name":"iphone11","price":"5300.00","num":"2","currency":"CNY"}, {"name":"macBook","price":"1234.00","num":"1","currency":"USD","type":"discount"}]，其中type字段的枚举如下：discount shipping_fee不传type就是商品信息本身 |
| transactionIp  | String  | 64   | Yes | No | 持卡人交易IP                                                                                                                                                                                                                          |
| appId          | String  | 20   | Yes | No | 商户应用程序 ID。 商户注册网站时，OnerWay会为商户创建一个应用id                                                                                                                                                                                           |
| javaEnabled    | Boolean | /    | Yes | No | 持卡人浏览器是否开启java                                                                                                                                                                                                                   |
| colorDepth     | String  | 64   | Yes | No | 持卡人屏幕色深                                                                                                                                                                                                                          |
| screenHeight   | String  | 64   | Yes | No | 持卡人的屏幕分辨率                                                                                                                                                                                                                        |
| screenWidth    | String  | 64   | Yes | No | 持卡人的屏幕分辨率                                                                                                                                                                                                                        |
| timeZoneOffset | String  | 64   | Yes | No | 持卡人浏览器的时区                                                                                                                                                                                                                        |
| accept         | String  | 2048 | Yes | No | 持卡人浏览器的 Accept 请求头                                                                                                                                                                                                               |
| userAgent      | String  | 2048 | Yes | No | 持卡人的浏览器类型                                                                                                                                                                                                                        |
| contentLength  | String  | 64   | Yes | No | 持卡人浏览器内容长度头部以外的内容长度                                                                                                                                                                                                              |
| language       | String  | 64   | Yes | No | 持卡人浏览器的语言                                                                                                                                                                                                                        |
| periodValue    | String  | /    | No  | No | 分期付款期数。对应咨询分期期数接口返回的期数值。当 subProductType 为 INSTALLMENT 时必填。                                                                                                                                                                      |
| terminalId     | String  | 64   | No  | No | 商户分配的唯一标识，用于标识商店终端。当 productType 为 PAYMENT_CODE 时必填。                                                                                                                                                                             |
| notifyUrl      | String  | 256  | No  | No | 通知地址。详见通知 |                                                                                                                                                                       




####  TxnCardInfo 


| 名称         | 类型     | 长度  | 必填  | 签名 | 描述            |
|------------|--------|-----|-----|----|---------------|
| holderName | String | 48  | Yes | No | 持卡人姓名         |
| cardNumber | String | 128 | Yes | No | 持卡人的卡号        |
| month      | String | 64  | Yes | No | 卡号月份，例如：03    |
| year       | String | 64  | Yes | No | 卡号年份，例如： 2021 |
| cvv        | String | 64  | Yes | No | 卡号cvv         |


#### TransactionAddress

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


#### 响应参数 

| 名称       | 类型     | 签名 | 描述                  |
|----------|--------|----|---------------------|
| respCode | String | No | 来自 Onerway 的响应码     |
| respMsg  | String | No | 来自 Onerway 的响应信息    |
| data     | Map    | No | 响应数据。 请参阅对象 TxnInfo |

####  TxnInfo

| 名称            | 类型     | 签名  | 描述                                          |
|---------------|--------|-----|---------------------------------------------|
| transactionId | String | Yes | Onerway创建的交易订单号，对应商户订单号                     |
| responseTime  | String | Yes | 接口响应时间，格式为yyyy-MM-dd HH:mm:ss               |
| txnTime       | String | Yes | 交易完成时间，格式为yyyy-MM-dd HH:mm:ss               |
| txnTimeZone   | String | Yes | 交易完成时区，例如：+08:00                            |
| orderAmount   | String | Yes | 交易订单金额                                      |
| orderCurrency | String | Yes | 交易订单币种。 请参阅 ISO 4217 货币代码                   |
| txnAmount     | String | Yes | 订单金额转换成结算币种后的金额                             |
| txnCurrency   | String | Yes | 结算币种。 请参阅 ISO 4217 货币代码                     |
| status        | String | Yes | 交易处理结果。 请参阅 TxnStatusEnum                   |
| redirectUrl   | String | Yes | 当交易状态为R时，商户需要重定向到该URL完成部分交易，包括3ds验证、本地支付收银等 |
| periodValue   | String | No  | 分期付款期数                                      |
| contractId    | String | Yes | 订阅合同id，首购时返回                                |
| tokenId       | String | Yes | 订阅令牌id ，首购时返回                               |
| eci           | String | Yes | 责任转移                                        |
| codeForm      | Map    | No  | 码的信息。请参阅对象 CodeForm                         |
| sign          | String | No  | 签名字符串。                                      |





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

