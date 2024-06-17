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

# 取消订阅合同



请求地址、请求方式、请求头 可以参考：

<br>

|   <div style="text-align: left;">名称</div>| 内容                                                          |
|----------------:|:---------------------------------------------------------------|
| Request URL :    | https://sandbox-v3-acquiring.pacypay.com/txn/payment  |
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

| 名称         | 类型     | 长度 | 必填  | 签名  | 描述                          |
|------------|--------|----|-----|-----|-----------------------------|
| contractId | String | 20 | Yes | Yes | 订阅合同`id`                      |
| merchantNo | String | 20 | Yes | Yes | 商户号。 商户注册时，`OnerWay`会为商户创建商户号 |
| sign       | String | /  | Yes | No  | 签名字符串。                      |


</div>


#### 响应参数

<div class="custom-table bordered-table">

| 名称       | 类型     | 签名 | 描述                           |
|----------|--------|----|------------------------------|
| respCode | String | No | 来自 `Onerway `的响应码              |
| respMsg  | String | No | 来自 `Onerway` 的响应信息             |
| data     | String | No | 合同状态. 请参阅    <CustomPopover title="ContractStatusEnu" width="auto" reference="contractstatusenum" link="/apis/enums.html#txnstatusenum" ></CustomPopover>    |


</div>




#### TxnCancelInfo

<div class="custom-table bordered-table">

| 名称            | 类型     | 签名 | 描述                             |
|---------------|--------|----|--------------------------------|
| transactionId | String | No | 申请取消的交易订单号                     |
| status        | String | No | 申请取消的交易订单状态。 请参阅   <CustomPopover title="TxnStatusEnum" width="auto" reference="TxnStatusEnum" link="/apis/enums.html#txnstatusenum" ></CustomPopover> |

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


<div class="alertbox4">

::: tip 此示例仅限参考 请勿拿此示例直接请求。
:::

</div>


