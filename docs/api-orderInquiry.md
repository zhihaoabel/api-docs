---
outline: deep
---
<script setup>

</script>

# 交易订单查询

交易订单查询接口，开发者可以编写代码来访问和获取订单数据，以便在自己的应用程序或系统中进行处理和展示。接口的作用是建立起与订单系统的连接，并提供一种标准的方式来请求和获取订单信息。



请求地址、请求方式、请求头 可以参考：

| 名称 | 内容                                                          |
|----------------|---------------------------------------------------------------|
| Request URL    | https://sandbox-v3-acquiring.pacypay.com/v1/txn/list    |
| Request Method | POST                                                          |
| Content-Type   | application/json                                              |


::: warning  注意:
Content-Type: application/json; charset=UTF-8 错误 
    <br>Content-Type: application/json 正确 
:::


## 交易订单查询

#### 请求参数
| 名称             | 类型     | 长度 | 必填  | 签名  | 描述                                         |
|----------------|--------|----|-----|-----|--------------------------------------------|
| merchantNo     | String | 20 | Yes | Yes | 商户号。 商户注册时，OnerWay会为商户创建商户号                |
| merchantTxnIds | String | /  | No  | Yes | 商户交易订单号，可以是多个，以逗号分隔，例如：“554815,684541”     |
| transactionIds | String | /  | No  | Yes | Onerway交易订单号，可以是多个，以逗号分隔                   |
| txnTypes       | String | /  | No  | Yes | 交易类型，可以是多个，用逗号分隔                           |
| startTime      | String | /  | No  | Yes | 交易开始时间，格式为yyyy-MM-dd HH:mm:ss              |
| endTime        | String | /  | No  | Yes | 交易结束时间，格式为yyyy-MM-dd HH:mm:ss。 最长间隔为 90 天。 |
| current        | String | /  | Yes | Yes | 查询的当前页码                                    |
| sign           | String | /  | Yes | No  | 签名字符串。                                     |




#### 响应参数

| 名称       | 类型     | 签名 | 描述               |
|----------|--------|----|------------------|
| respCode | String | No | 来自 Onerway 的响应码  |
| respMsg  | String | No | 来自 Onerway 的响应信息 |
| data     | Map    | No | 响应数据。 请参阅对象 Page |


#### Page

| 名称            | 类型     | 签名 | 描述                   |
|---------------|--------|----|----------------------|
| content       | List   | No | 交易信息列表，请参阅对象 TxnInfo |
| current       | String | No | 当前页码                 |
| size          | String | No | 当前页大小                |
| totalPages    | String | No | 总页数                  |
| totalElements | String | No | 总条数                  |



#### TxnInfo

| 名称                         | 类型     | 签名 | 描述                                                       |
|----------------------------|--------|----|----------------------------------------------------------|
| transactionId              | String | No | Onerway创建的交易订单号，对应商户订单号                                  |
| merchantTxnId              | String | No | 商户创建的商户交易订单号，不同的订单号视为不同的交易                               |
| txnTime                    | String | No | 交易完成时间                                                   |
| originTransactionId        | String | No | 来自 Onerway 的原交易订单号。                                      |
| productType                | String | No | 产品类型，请参阅 ProductTypeEnum                                 |
| subProductType             | String | No | 子产品类型，请参阅 SubProductTypeEnum                             |
| txnType                    | String | No | 交易类型，请参阅 TxnTypeEnum                                     |
| status                     | String | No | 交易处理结果。 请参阅 TxnStatusEnum                                |
| reason                     | String | No | 交易失败原因                                                   |
| paymentMethod              | String | No | 具体支付方式，包括卡和本地支付类型                                        |
| walletTypeName             | String | No | 钱包的品牌名称                                                  |
| orderAmount                | String | No | 交易订单金额                                                   |
| orderCurrency              | String | No | 交易订单币种。 请参阅 ISO 4217 货币代码                                |
| txnAmount                  | String | No | 订单金额转换成结算币种后的金额                                          |
| txnCurrency                | String | No | 结算币种。 请参阅 ISO 4217 货币代码                                  |
| settleRate                 | String | No | 汇率 (txnAmount = orderAmount * settleRate)。               |
| customsDeclarationAmount   | String | No | 可报关金额                                                    |
| customsDeclarationCurrency | String | No | 可用于报关的金额对应币种。 请参阅 ISO 4217 货币代码                          |
| arn                        | String | No | ARN                                                      |
| appId                      | String | No | 商户应用程序 ID。 商户注册网站时，OnerWay会为商户创建一个应用id                   |
| website                    | String | No | 交易网站                                                     |
| cardBinCountry             | String | No | 卡bin所属国家                                                 |
| cardNumber                 | String | No | 交易卡号                                                     |
| userPaymentStatus          | String | No | 用户支付状态，true：已支付，false：未支付，（只有 Sofort 交易可能关注此字段；空值时忽略此字段） |
| holderName                 | String | No | 持卡人姓名                                                    |
| eci                        | String | No | 责任转移                                                     |




## 以下部分展示了交易订单查询的请求示例：

### Request

https://sandbox-v3-acquiring.pacypay.com/v1/txn/list<Badge type="tip">POST</Badge>

```json
{
  "merchantNo": "800037",
  "merchantTxnIds": "1640244407000,1640244473000",
  "transactionIds": "",
  "txnTypes": "",
  "startTime": "",
  "endTime": "",
  "current": "1",
  "sign": "..."  //这里的sign字符串需要通过签名获得
}




```

::: warning  此示例仅限参考 请勿拿此示例直接请求。
:::

## 以下部分展示了交易订单查询响应示例：

### Response

```json

{
  "respCode": "20000",
  "respMsg": "Success",
  "data": {
    "content": [
      {
        "transactionId": "1473918047031586816",
        "merchantTxnId": "1640244407000",
        "txnTime": "2021-12-23 15:27:01",
        "originTransactionId": null,
        "productType": "CARD",
        "subProductType": "DIRECT",
        "txnType": "0006",
        "status": "S",
        "paymentMethod": "VISA",
        "orderAmount": "20.00",
        "orderCurrency": "USD",
        "txnAmount": "20.00",
        "txnCurrency": "USD",
        "settleRate": "1",
        "arn": null,
        "appId": "1458672763818790912",
        "website": "800037.sc.com",
        "cardBinCountry": "US",
        "cardNumber": "400002******0961",
        "reason": null,
        "userPaymentStatus": "true"
      },
      {
        "transactionId": "1473918280901783552",
        "merchantTxnId": "1640244473000",
        "txnTime": "2021-12-23 15:27:56",
        "originTransactionId": null,
        "productType": "CARD",
        "subProductType": "DIRECT",
        "txnType": "0006",
        "status": "S",
        "paymentMethod": "VISA",
        "orderAmount": "20.00",
        "orderCurrency": "USD",
        "txnAmount": "20.00",
        "txnCurrency": "USD",
        "settleRate": "1",
        "arn": null,
        "appId": "1458672763818790912",
        "website": "800037.sc.com",
        "cardBinCountry": "US",
        "cardNumber": "400002******0961",
        "reason": null,
        "userPaymentStatus": null
      }
    ],
    "current": "1",
    "size": "10",
    "totalPages": "1",
    "totalElements": "2"
  }
}
