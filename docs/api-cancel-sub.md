---
outline: deep
---
<script setup>

</script>

# 取消订阅合同



请求地址、请求方式、请求头 可以参考：

<div class="table-request-top">

| 名称 | 内容                                                          |
|----------------|---------------------------------------------------------------|
| Request URL    | https://sandbox-v3-acquiring.pacypay.com/v1/txn/sub/cancel |
| Request Method | POST                                                          |
| Content-Type   | application/json                                              |

</div>

::: warning  注意:
Content-Type: application/json; charset=UTF-8 错误 
    <br>Content-Type: application/json 正确 
:::


## 申请取消交易

#### 请求参数

<div class="custom-table bordered-table">

| 名称         | 类型     | 长度 | 必填  | 签名  | 描述                          |
|------------|--------|----|-----|-----|-----------------------------|
| contractId | String | 20 | Yes | Yes | 订阅合同id                      |
| merchantNo | String | 20 | Yes | Yes | 商户号。 商户注册时，OnerWay会为商户创建商户号 |
| sign       | String | /  | Yes | No  | 签名字符串。                      |


</div>


#### 响应参数

<div class="custom-table bordered-table">

| 名称       | 类型     | 签名 | 描述                           |
|----------|--------|----|------------------------------|
| respCode | String | No | 来自 Onerway 的响应码              |
| respMsg  | String | No | 来自 Onerway 的响应信息             |
| data     | String | No | 合同状态. 请参阅 ContractStatusEnum |


</div>




#### TxnCancelInfo

<div class="custom-table bordered-table">

| 名称            | 类型     | 签名 | 描述                             |
|---------------|--------|----|--------------------------------|
| transactionId | String | No | 申请取消的交易订单号                     |
| status        | String | No | 申请取消的交易订单状态。 请参阅 TxnStatusEnum |

</div>

## 以下部分展示了交易订单查询的请求示例：

### Request

https://sandbox-v3-acquiring.pacypay.com/v1/txn/sub/cancel<Badge type="tip">POST</Badge>

::: code-group

```json[Request]
{
  "merchantNo": "800037",
  "contractId": "1473942457062490112",
  "sign": "..."
}

```
```json[Response]
{
  "respCode": "20000",
  "respMsg": "Success",
  "data": "3"
}



```


::: warning  此示例仅限参考 请勿拿此示例直接请求。
:::

