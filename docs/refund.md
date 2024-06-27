---
outline: deep
---
<script setup>

    import {reactive, ref, watch, onMounted, unref } from 'vue'; 
import {requestGen, secret} from "./util/utils";
import CMExample from './components/CMExample.vue';
import CMNote from './components/CMNote.vue';
import CustomPopover from './components/element-ui/CustomPopover.vue'; 
import CustomTable from "./components/element-ui/CustomTable.vue";
import {TopRight, View} from "@element-plus/icons-vue";
import { ClickOutside as vClickOutside } from 'element-plus';

</script>

# 申请退款
对于已经支付成功的交易可以申请退款。


请求地址、请求方式、请求头 可以参考：


<br>

|   <div style="text-align: left;">名称</div>| 内容                                                          |
|----------------:|:---------------------------------------------------------------|
| Request URL :    | https://sandbox-acq.onerway.com/txn/payment  |
| Request Method : | <div style="color:var(--vp-c-brand-1);font-weight:500;"> POST  </div>                                                        |
| Content-Type :  | <div style="color:var(--vp-c-brand-1);font-weight:500;">application/json      </div>                                        |

<br>

<div class="alertbox3">

::: tip  Content-Type: application/json; charset=UTF-8 错误   <br>Content-Type: application/json 正确 
:::

</div>


## 申请退款


<div class="custom-table bordered-table">

#### 请求参数
| 名称                  | 类型     | 长度 | 必填  | 签名  | 描述                                                                   |
|---------------------|--------|----|-----|-----|----------------------------------------------------------------------|
| merchantNo          | String | 20 | Yes | Yes | 商户号。 商户注册时，`OnerWay`会为商户创建商户号                                          |
| refundType          | String | 1  | Yes | Yes | 交易退款类型，枚举如下：`0` - 申请退款 `1` - 取消退款申请                                      |
| merchantTxnId       | String | 64 | No  | Yes | 商户创建的商户退款交易订单号，不同的订单号视为不同的交易                                         |
| originTransactionId | String | 20 | Yes | Yes | 来自 `Onerway` 的原始交易订单号。 当`refundType`为`0`时为传原交易订单号，当`refundType`为`1`时传原退款交易订单号。 |
| refundAmount        | String | 19 | Yes | Yes | 退款交易金额，<CMNote data="该金额的币种应与原交易时发送的订单币种对应"></CMNote>                                             |
| sign                | String | /  | Yes | No  | 签名字符串。                                                               |

</div>

#### 响应参数

<div class="custom-table bordered-table">

| 名称       | 类型     | 签名 | 描述                          |
|----------|--------|----|-----------------------------|
| respCode | String | No | 来自 `Onerway` 的响应码             |
| respMsg  | String | No | 来自` Onerway` 的响应信息            |
| data     | String | No | `Onerway`创建的退款交易订单号，申请退款时才会返回 |

</div>


## 以下部分展示了申请退款的请求示例：

### Request

https://sandbox-acq.onerway.com//v1/txn/onlineRefund<Badge type="tip">POST</Badge>


::: code-group

```json [请求参数]
{
  "merchantNo": "800037",
  "refundType": "0",
  "merchantTxnId": "1640241780000",
  "originTransactionId":"1473906683882672128",
  "refundAmount": "20",
  "sign": "..." //这里的sign字符串需要通过签名获得
}


```

```json  [响应参数]

{
  "respCode": "20000",
  "respMsg": "Success",
  "data": "1473906993397141504"
}

```

<div class="alertbox4">

::: tip 此示例仅限参考 请勿拿此示例直接请求。
:::

</div>

