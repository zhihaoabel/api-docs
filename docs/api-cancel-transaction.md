---
outline: deep
---
<script setup>
import {reactive, ref, watch, onMounted, unref } from 'vue'; 
import {requestGen, secret} from "./util/utils";
import {ProductTypeEnum as ProductTypeEnumTable, SubProductTypeEnum as SubProductTypeEnumTable, TxnTypeEnum as TxnTypeEnumTable} from "./util/constants";
import CMExample from './components/CMExample.vue';
import CMNote from './components/CMNote.vue';
import CustomPopover from './components/element-ui/CustomPopover.vue'; 
import CustomTable from "./components/element-ui/CustomTable.vue";
import {TopRight, View} from "@element-plus/icons-vue";
import { ClickOutside as vClickOutside } from 'element-plus';

</script>

# 申请取消交易

1. 在支付完成后的5分钟到30分钟之内交易状态仍然为处理中的才能发起该取消申请
2. 根据申请，我们会核实原交易的最终状态，取消的处理方式是会根据原交易的实际最终状态而有所不同
3. 如果在确定原交易实际是失败的，那么会直接通知商户取消成功；如果在确定原交易实际是成功的，那么我们会发起退款，退款成功后通知商户取消成功



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


## 申请取消交易

#### 请求参数

<div class="custom-table bordered-table">

| 名称                  | 类型     | 长度 | 必填  | 签名  | 描述                                         |
|---------------------|--------|----|-----|-----|--------------------------------------------|
| originTransactionId | String | 20 | Yes | Yes | 来源于`Onerway`的原始交易订单号，常用于反向交易时通过此`ID`查找对应的交易订单号 |
| merchantNo          | String | 20 | Yes | Yes | 商户号。 商户注册时，`OnerWay`会为商户创建商户号                |
| sign                | String | /  | Yes | No  | 签名字符串。                                     |


</div>


#### 响应参数

<div class="custom-table bordered-table">

| 名称       | 类型     | 签名 | 描述               |
|----------|--------|----|------------------|
| respCode | String | No | 来自 `Onerway` 的响应码  |
| respMsg  | String | No | 来自` Onerway` 的响应信息 |
| data     | Map    | No | 响应数据。 请参阅对象 TxnCancelInfo  |

</div>




#### TxnCancelInfo

<div class="custom-table bordered-table">

| 名称            | 类型     | 签名 | 描述                             |
|---------------|--------|----|--------------------------------|
| transactionId | String | No | 申请取消的交易订单号                     |
| status        | String | No | 申请取消的交易订单状态。 请参阅    <CustomPopover title="TxnStatusEnum" width="auto" reference="TxnStatusEnum" link="/apis/enums.html#txnstatusenum" ></CustomPopover> |

</div>

## 以下部分展示了交易订单查询的请求示例：

### Request

https://sandbox-acq.onerway.com/v1/txn/cancelTxn<Badge type="tip">POST</Badge>

::: code-group

```json[Request]
{
  "merchantNo": "800058",
  "originTransactionId": "1484408335541923840",
  "sign": "..."
}

```
```json[Response]
{
  "respCode": "20000",
  "respMsg": "Success",
  "data": {
    "transactionId": "1484409612279672832",
    "status": "I"
  }
}


```


<div class="alertbox4">

::: tip 此示例仅限参考 请勿拿此示例直接请求。
:::

</div>
