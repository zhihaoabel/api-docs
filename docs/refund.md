---
outline: deep
---
<script setup>

</script>

# 申请退款
对于已经支付成功的交易可以申请退款。


请求地址、请求方式、请求头 可以参考：

<div class="table-request-top">

| 名称 | 内容                                                          |
|----------------|---------------------------------------------------------------|
| Request URL    | https://sandbox-v3-acquiring.pacypay.com//v1/txn/onlineRefund    |
| Request Method | POST                                                          |
| Content-Type   | application/json                                              |

</div>

::: warning  注意:
Content-Type: application/json; charset=UTF-8 错误 
    <br>Content-Type: application/json 正确 
:::


## 申请退款


<div class="custom-table bordered-table">

#### 请求参数
| 名称                  | 类型     | 长度 | 必填  | 签名  | 描述                                                                   |
|---------------------|--------|----|-----|-----|----------------------------------------------------------------------|
| merchantNo          | String | 20 | Yes | Yes | 商户号。 商户注册时，OnerWay会为商户创建商户号                                          |
| refundType          | String | 1  | Yes | Yes | 交易退款类型，枚举如下：0 - 申请退款 1 - 取消退款申请                                      |
| merchantTxnId       | String | 64 | No  | Yes | 商户创建的商户退款交易订单号，不同的订单号视为不同的交易                                         |
| originTransactionId | String | 20 | Yes | Yes | 来自 Onerway 的原始交易订单号。 当refundType为0时为传原交易订单号，当refundType为1时传原退款交易订单号。 |
| refundAmount        | String | 19 | Yes | Yes | 退款交易金额，该金额的币种应与原交易时发送的订单币种对应                                         |
| sign                | String | /  | Yes | No  | 签名字符串。                                                               |

</div>

#### 响应参数

<div class="custom-table bordered-table">

| 名称       | 类型     | 签名 | 描述                          |
|----------|--------|----|-----------------------------|
| respCode | String | No | 来自 Onerway 的响应码             |
| respMsg  | String | No | 来自 Onerway 的响应信息            |
| data     | String | No | Onerway创建的退款交易订单号，申请退款时才会返回 |

</div>


## 以下部分展示了申请退款的请求示例：

### Request

https://sandbox-v3-acquiring.pacypay.com//v1/txn/onlineRefund<Badge type="tip">POST</Badge>

```json
{
  "merchantNo": "800037",
  "refundType": "0",
  "merchantTxnId": "1640241780000",
  "originTransactionId":"1473906683882672128",
  "refundAmount": "20",
  "sign": "..." //这里的sign字符串需要通过签名获得
}



```

::: warning  此示例仅限参考 请勿拿此示例直接请求。
:::

## 以下部分展示了申请退款响应示例：

### Response

```json

{
  "respCode": "20000",
  "respMsg": "Success",
  "data": "1473906993397141504"
}
