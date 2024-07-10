---
outline: deep
---

<script lang="ts" setup>

</script>

# 咨询分期期数  <Badge text="POST" type="tip"></Badge>

`https://sandbox-acq.onerway.com/v1/txn/consultInstallment`

#### 请求参数

<div class="custom-table bordered-table">

| 名称            | 类型     | 长度 | 必填  | 签名  | 描述                                     |
|---------------|--------|----|-----|-----|----------------------------------------|
| merchantNo    | String | 20 | Yes | Yes | 商户号。 商户注册时，OnerWay会为商户创建商户号            |
| appId         | String | 20 | Yes | Yes | 商户应用程序 ID。 商户注册网站时，OnerWay会为商户创建一个应用id |
| country       | String | 64 | Yes | Yes | 国家。 请参阅 ISO。 例如： 美国 is US              |
| orderAmount   | String | 19 | Yes | Yes | 交易订单金额                                 |
| orderCurrency | String | 8  | Yes | Yes | 交易订单币种。 请参阅 ISO 4217 货币代码              |
| cardInfo      | String | /  | Yes | Yes | 交易卡信息，格式为 json 字符串。 请参阅对象 CardInfo     |
| sign          | String | /  | Yes | No  | 签名字符串，请参阅  签名字符串，请参阅[Sign](./sign.html)                                     |

</div>

#### CardInfo

<div class="custom-table bordered-table">

| 名称         | 类型     | 长度  | 必填  | 签名 | 描述     |
|------------|--------|-----|-----|----|--------|
| cardNumber | String | 128 | Yes | No | 持卡人的卡号 |

</div>

#### 响应参数

<div class="custom-table bordered-table">

| 名称       | 类型     | 签名 | 描述                                       |
|----------|--------|----|------------------------------------------|
| respCode | String | No | 来自 Onerway 的响应码                          |
| respMsg  | String | No | 来自 Onerway 的响应信息                         |
| data     | List   | No | 响应数据。请参阅对象 [data](./installment.md#data) |

</div>

#### data

<div class="custom-table bordered-table">

| 名称          | 类型     | 签名 | 描述   |
|-------------|--------|----|------|
| periodValue | String | No | 期数值  |
| periodName  | String | No | 期数名称 |

</div>