---
outline: deep
---
<script setup>


import {reactive, ref, watch, onMounted, unref } from 'vue'; 
import {requestGen, secret} from "./util/utils";
import {ProductTypeEnumTable,SubProductTypeEnumTable,TxnTypeEnumTable} from "./util/constants";
import CMExample from './components/CMExample.vue';
import CMNote from './components/CMNote.vue';
import CustomPopover from './components/element-ui/CustomPopover.vue'; 
import CustomTable from "./components/element-ui/CustomTable.vue";
import {TopRight, View} from "@element-plus/icons-vue";
import { ClickOutside as vClickOutside } from 'element-plus';




</script>

# 预授权请款/撤销

注意事项：
1. 此接口需要传入原预授权交易订单号，可以通过JS-SDK收银台的下单接口、收银台支付接口、两方支付接口来获得，其中交易类型需要选择`AUTH`/`PRE_AUTH`中的一个。
2. 此接口目前仅支持全额请款或撤销。
3. 此接口的交易类型仅支持`CAPTURE`/`VOID`中的一个。


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


## 预授权

#### 请求参数

<div class="custom-table bordered-table">

| 名称                  | 类型     | 长度 | 必填  | 签名  | 描述                                      |
|---------------------|--------|----|-----|-----|-----------------------------------------|
| merchantNo          | String | 20 | Yes | Yes | 商户号。 商户注册时，`OnerWay`会为商户创建商户号             |
| txnType             | String | 16 | Yes | Yes | 交易类型，请参阅  <CustomPopover title="TxnTypeEnum" width="auto" reference="TxnTypeEnum" link="/apis/enums.html#txntypeenum" ></CustomPopover>  。此接口仅支持`CAPTURE`和`VOID` |
| merchantTxnId       | String | 64 | No  | Yes | 商户创建的预授权请款或撤销的交易订单号，不同的订单号视为不同的交易       |
| originTransactionId | String | 20 | Yes | Yes | 来自 `Onerway `的原预授权交易订单号。                  |
| sign                | String | /  | Yes | No  | 签名字符串，请参阅  签名字符串，请参阅[Sign](./sign.html)                                     |


</div>

##### 响应参数


<div class="custom-table bordered-table">

| 名称       | 类型     | 签名 | 描述                  |
|----------|--------|----|---------------------|
| respCode | String | No | 来自` Onerway`的响应码     |
| respMsg  | String | No | 来自 `Onerway` 的响应信息    |
| data     | Map    | No | 响应数据。 请参阅对象    <CustomPopover title="TxnInfo" width="auto" reference="TxnInfo" link="/apis/api-direct-auth.html#txninfo" ></CustomPopover>  |
                                                                             |
</div>

#### TxnInfo

<div class="custom-table bordered-table">


| 名称            | 类型     | 签名  | 描述                                          |
|---------------|--------|-----|---------------------------------------------|
| transactionId | String | Yes | Onerway创建的交易订单号，对应商户订单号                     |
| responseTime  | String | Yes | 接口响应时间，格式为`yyyy-MM-dd HH:mm:ss`               |
| txnTime       | String | Yes | 交易完成时间，格式为`yyyy-MM-dd HH:mm:ss `              |
| txnTimeZone   | String | Yes | 交易完成时区，例如：+08:00                            |
| orderAmount   | String | Yes | 交易订单金额                                      |
| orderCurrency | String | Yes | 交易订单币种。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) 货币代码                   |
| txnAmount     | String | Yes | 订单金额转换成结算币种后的金额                             |
| txnCurrency   | String | Yes | 结算币种。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) 货币代码                     |
| status        | String | Yes | 交易处理结果。 请参阅    <CustomPopover title="TxnStatusEnum" width="auto" reference="TxnStatusEnum" link="/apis/enums.html#txnstatusenum" ></CustomPopover>                 |
| redirectUrl   | String | Yes | 当交易状态为`R`时，商户需要重定向到该`URL`完成部分交易，包括`3ds`验证、本地支付收银等 |
| periodValue   | String | No  | 分期付款期数                                      |
| contractId    | String | Yes | 订阅合同id，首购时返回                                |
| tokenId       | String | Yes | 订阅令牌id ，首购时返回                               |
| eci           | String | Yes | 责任转移                                        |
| sign          | String | No  | 签名字符串，请参阅  签名字符串，请参阅[Sign](./sign.html)                                          |


</div>



## 以下部分展示了预授权的请求响应示例： 

### Request

https://sandbox-acq.onerway.com/v1/txn/doTransaction <Badge type="tip">POST</Badge>

::: code-group

```json [Request]
{
    "merchantNo":"800058",
    "txnType":"VOID",
    "merchantTxnId":"1665740062001",
    "originTransactionId":"1587326740704169984",
    "sign":"..."
}


```


```json [Response]
{
    "respCode": "20000",
    "respMsg": "Success",
    "data": {
        "transactionId": "1587326856370491392",
        "responseTime": "2022-11-01 18:13:10",
        "txnTime": "2022-11-01 18:13:05",
        "txnTimeZone": "+08:00",
        "orderAmount": "32.50",
        "orderCurrency": "GBP",
        "txnAmount": "32.50",
        "txnCurrency": "GBP",
        "status": "S",
        "redirectUrl": null,
        "contractId": null,
        "tokenId": null,
        "eci": null,
        "periodValue": null,
        "sign": "..."
    }
}


```


<div class="alertbox4">

::: tip 此示例仅限参考 请勿拿此示例直接请求。
:::

</div>






