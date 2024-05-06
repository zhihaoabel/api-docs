---
outline: deep
---
<script setup>

</script>

# 拒付订单查询

拒付订单查询是一种用于追踪和了解被拒绝支付的订单的过程。当客户或支付机构拒绝支付某个订单时，商家或相关方面可能需要进行拒付订单查询以获取有关该拒付的详细信息。

  <el-alert
    title="调用此接口之前，需先联系我们开通查询拒付权限。"
    type="warning"
    show-icon>
  </el-alert>


请求地址、请求方式、请求头 可以参考：


<div class="table-request-top">

| 名称 | 内容                                                          |
|----------------|---------------------------------------------------------------|
| Request URL    | https://sandbox-v3-acquiring.pacypay.com/v1/chargeback/list    |
| Request Method | POST                                                          |
| Content-Type   | application/json         
                                     |
</div>

::: warning  注意:
Content-Type: application/json; charset=UTF-8 错误 
    <br>Content-Type: application/json 正确 
:::


## 拒付订单查询

#### 请求参数

<div class="custom-table bordered-table">

| 名称                   | 类型     | 长度 | 必填  | 签名  | 描述                                                      |
|----------------------|--------|----|-----|-----|---------------------------------------------------------|
| merchantNo           | String | 20 | Yes | Yes | 商户号。 商户注册时，OnerWay会为商户创建商户号                             |
| merchantTxnIds       | String | /  | No  | Yes | 商户交易订单号，可以是多个，以逗号分隔，例如：“554815,684541”                  |
| originTransactionIds | String | /  | No  | Yes | 来自Onerway的原交易订单号，可以是多个，以逗号分隔                            |
| chargebackIds        | String | /  | No  | Yes | 来自Onerway的拒付交易单号，可以是多个，以逗号分隔                            |
| importTimeStart      | String | /  | No  | Yes | onerway接收的拒付交易的开始时间，格式为yyyy-MM-dd HH:mm:ss              |
| importTimeEnd        | String | /  | No  | Yes | onerway接收的拒付交易的结束时间，格式为yyyy-MM-dd HH:mm:ss。 最长间隔为 90 天。 |
| current              | String | /  | Yes | Yes | 查询的当前页码                                                 |
| sign                 | String | /  | Yes | No  | 签名字符串。                                                  |
                            |

</div>


#### 响应参数

<div class="custom-table bordered-table">

| 名称       | 类型     | 签名 | 描述               |
|----------|--------|----|------------------|
| respCode | String | No | 来自 Onerway 的响应码  |
| respMsg  | String | No | 来自 Onerway 的响应信息 |
| data     | Map    | No | 响应数据。 请参阅对象 Page |

</div>



#### Page

<div class="custom-table bordered-table">

| 名称            | 类型     | 签名 | 描述                   |
|---------------|--------|----|----------------------|
| content       | List   | No | 交易信息列表，请参阅对象 TxnInfo |
| current       | String | No | 当前页码                 |
| size          | String | No | 当前页大小                |
| totalPages    | String | No | 总页数                  |
| totalElements | String | No | 总条数                  |

</div>



#### ChargebackInfo



<div class="custom-table bordered-table">

| 名称                  | 类型     | 签名 | 描述                                |
|---------------------|--------|----|-----------------------------------|
| merchantNo          | String | No | 商户号。 商户注册时，OnerWay会为商户创建商户号       |
| merchantTxnId       | String | No | 商户创建的商户交易订单号，不同的订单号视为不同的交易        |
| originTransactionId | String | No | 来自 Onerway 的原交易订单号。               |
| txnAmount           | String | No | 以结算币种计的原交易金额                      |
| txnCurrency         | String | No | 原交易结算币种。 请参阅 ISO 4217 货币代码        |
| txnTime             | String | No | 原交易完成时间                           |
| paymentMethod       | String | No | 具体支付方式，包括卡和本地支付类型                 |
| chargebackId        | String | No | Onerway创建的拒付交易订单号                 |
| importTime          | String | No | onerway 接收拒付交易的时间                 |
| chargebackAmount    | String | No | 发生的拒付金额                           |
| chargebackCurrency  | String | No | 拒付金额的币种。 请参阅 ISO 4217 货币代码        |
| chargebackDate      | String | No | 拒付发生的日期                           |
| chargebackStatus    | String | No | 拒付交易状态。 请参阅 ChargebackStatusEnum  |
| chargebackReason    | String | No | 拒付原因                              |
| chargebackArn       | String | No | ARN                               |
| appealDueTime       | String | No | 申诉资料提交截止时间，格式为yyyy-MM-dd HH:mm:ss |
| chargebackCode      | String | No | 拒付代码                              |

</div>


## 以下部分展示了拒付订单查询的请求示例：

### Request

https://sandbox-v3-acquiring.pacypay.com/v1/chargeback/list<Badge type="tip">POST</Badge>


::: code-group

```json [请求参数]
{
  "chargebackIds":"",
  "current":"1",
  "importTimeEnd":"",
  "importTimeStart":"",
  "merchantNo":"800037",
  "merchantTxnIds":"",
  "originTransactionIds":"1535176982304575488",
  "sign":"…"
}

```


```json [响应参数]


  "respCode":"20000",
  "respMsg":"Success",
  "data":{
    "content":[
      {
        "merchantNo":"800037",
        "chargebackId":"1535178069061324800",
        "importTime":"2022-06-10 16:32:29",
        "merchantTxnId":"1654849689044",
        "originTransactionId":"1535176982304575488",
        "txnAmount":"30.90",
        "txnCurrency":"EUR",
        "txnTime":"2022-06-10 16:28:10",
        "paymentMethod":"VISA",
        "chargebackAmount":"1.00",
        "chargebackCurrency":"USD",
        "chargebackDate":"2022-06-10",
        "chargebackReason":"chargeback occurs",
        "chargebackArn":"123",
        "appealDueTime":"2022-09-10 10:21:55",
        "chargebackCode":"res1206CODE",
        "chargebackStatus":"NEW"
      }
    ],
    "current":"1",
    "size":10,
    "totalPages":1,
    "totalElements":1
  }
}

```

