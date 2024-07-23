---
outline: deep
---
<script setup>


import {reactive, ref, watch, onMounted, unref } from 'vue'; 
import {requestGen, secret} from "./util/utils";
import {ProductTypeEnum as ProductTypeEnumTable,SubProductTypeEnum as SubProductTypeEnumTable,TxnTypeEnum as TxnTypeEnumTable, TxnTypeEnum, TxnStatusEnum} from "./util/constants";
import CMExample from './components/CMExample.vue';
import CMNote from './components/CMNote.vue';
import CustomPopover from './components/element-ui/CustomPopover.vue'; 
import CustomTable from "./components/element-ui/CustomTable.vue";
import {TopRight, View} from "@element-plus/icons-vue";
import { ClickOutside as vClickOutside } from 'element-plus';




</script>

# 预授权撤销

注意事项：
1. 此接口需要传入原预授权交易订单号，可以通过JS-SDK收银台的下单接口、收银台支付接口、两方支付接口来获得，其中交易类型需要选择`AUTH`/`PRE_AUTH`中的一个。
2. 此接口目前仅支持全额请款或撤销。
3. 此接口的交易类型仅支持`VOID`。

## 预授权

#### 请求参数

<div class="custom-table bordered-table">

| 名称                  | 类型     | 长度 | 必填  | 签名  | 描述                                                                                                                                                                                                                                             |
|---------------------|--------|----|-----|-----|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchantNo          | String | 20 | Yes | Yes | 商户号。 商户注册时，`OnerWay`会为商户创建商户号                                                                                                                                                                                                                  |
| txnType             | String | 16 | Yes | Yes | 交易类型，请参阅  <CustomPopover title="TxnTypeEnum" width="auto" reference="TxnTypeEnum" link="/apis/enums.html#txntypeenum" >  <CustomTable :data="TxnTypeEnum.data" :columns="TxnTypeEnum.columns"></CustomTable> </CustomPopover>  。此撤销接口仅支持`VOID` |
| merchantTxnId       | String | 64 | No  | Yes | 商户创建的预授权撤销的交易订单号，不同的订单号视为不同的交易                                                                                                                                                                                                                 |
| originTransactionId | String | 20 | Yes | Yes | 来自 `Onerway `的原预授权交易订单号。                                                                                                                                                                                                                       |
| sign                | String | /  | Yes | No  | 签名字符串，请参阅  签名字符串，请参阅[Sign](./sign.html)                                                                                                                                                                                                        |


</div>

##### 响应参数


<div class="custom-table bordered-table">

| 名称       | 类型     | 签名 | 描述                  |
|----------|--------|----|---------------------|
| respCode | String | No | 来自` Onerway`的响应码     |
| respMsg  | String | No | 来自 `Onerway` 的响应信息    |
| data     | Map    | No | 响应数据。 请参阅对象    [TxnInfo](./api-direct-auth-reverse#txninfo)  |
                                                                             |
</div>

#### TxnInfo

<div class="custom-table bordered-table">


| 名称            | 类型     | 必填  | 描述                                                                                                                                                                                                                                       |
|---------------|--------|-----|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| transactionId | String | Yes | Onerway创建的交易订单号，对应商户订单号                                                                                                                                                                                                                  |
| responseTime  | String | Yes | 接口响应时间，格式为`yyyy-MM-dd HH:mm:ss`                                                                                                                                                                                                          |
| txnTime       | String | Yes | 交易完成时间，格式为`yyyy-MM-dd HH:mm:ss `                                                                                                                                                                                                         |
| txnTimeZone   | String | Yes | 交易完成时区，例如：+08:00                                                                                                                                                                                                                         |
| orderAmount   | String | Yes | 交易订单金额                                                                                                                                                                                                                                   |
| orderCurrency | String | Yes | 交易订单币种。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) 货币代码                                                                                                                                      |
| txnAmount     | String | Yes | 订单金额转换成结算币种后的金额                                                                                                                                                                                                                          |
| txnCurrency   | String | Yes | 结算币种。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) 货币代码                                                                                                                                        |
| status        | String | Yes | 交易处理结果。 请参阅    <CustomPopover title="TxnStatusEnum" width="auto" reference="TxnStatusEnum" link="/apis/enums.html#txnstatusenum" >  <CustomTable :data="TxnStatusEnum.data" :columns="TxnStatusEnum.columns"></CustomTable> </CustomPopover> |
| redirectUrl   | String | Yes | 当交易状态为`R`时，商户需要重定向到该`URL`完成部分交易，包括`3ds`验证、本地支付收银等                                                                                                                                                                                        |
| periodValue   | String | Yes  | 分期付款期数                                                                                                                                                                                                                                   |
| contractId    | String | Yes | 订阅合同id，首购时返回                                                                                                                                                                                                                             |
| tokenId       | String | Yes | 订阅令牌id ，首购时返回                                                                                                                                                                                                                            |
| eci           | String | Yes | 责任转移                                                                                                                                                                                                                                     |
| sign          | String | Yes  | 签名字符串，请参阅  签名字符串，请参阅[Sign](./sign.html)                                                                                                                                                                                                  |


</div>



## 以下部分展示了预授权的请求响应示例： 

### Request

https://sandbox-acq.onerway.com/v1/txn/doTransaction <Badge type="tip">POST</Badge>

::: code-group

```json [Request]
{
  "merchantNo": "800209",
  "merchantTxnId": "1721288823000",
  "originTransactionId": "1587326740704169984",
  "sign": "ad9c51f5452c7f90c82b847984881e81b91a0444fe109be9413bc8f66ca4325a",
  "txnType": "VOID"
}


```


```json [Response]
{
  "respCode": "20000",
  "respMsg": "Success",
  "data": {
    "transactionId": "1813842908840075264",
    "responseTime": "2024-07-18 15:47:05",
    "txnTime": "2024-07-18 15:47:03",
    "txnTimeZone": "+08:00",
    "orderAmount": "20.00",
    "orderCurrency": "USD",
    "txnAmount": null,
    "txnCurrency": null,
    "status": "S",
    "redirectUrl": null,
    "contractId": null,
    "tokenId": null,
    "eci": null,
    "periodValue": null,
    "codeForm": null,
    "presentContext": null,
    "actionType": null,
    "sign": "de8ef7a2b9ffcc274b9d40970f2217055d540452c93ee9f35f133751e285cfb8"
  }
}

```


<div class="alertbox4">

::: tip 此示例仅限参考 请勿拿此示例直接请求。
:::

</div>





