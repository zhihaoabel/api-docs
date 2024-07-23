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
import {ChargebackStatusEnum} from "./util/constants";

</script>

# 拒付订单查询

  <el-alert
    title="调用此接口之前，需先联系我们开通查询拒付权限。"
    type="warning"
    show-icon>
  </el-alert>


请求地址、请求方式、请求头 可以参考：


<br>

|   <div style="text-align: left;">名称</div>| 内容                                                         |
|----------------|--------------------------------------------------------------|
| Request URL :   | https://sandbox-acq.onerway.com/v1/chargeback/list  |
| Request Method : | <div style="color:var(--vp-c-brand-1);font-weight:500;"> POST  </div>                                                      |
| Content-Type : | <div style="color:var(--vp-c-brand-1);font-weight:500;">application/json      </div>                                      |

<br>

<div class="alertbox3">

::: tip  Content-Type: application/json; charset=UTF-8 错误   <br>Content-Type: application/json 正确 
:::

</div>


## 拒付订单查询

#### 请求参数

<div class="custom-table bordered-table">

| 名称                   | 类型     | 长度 | 必填  | 签名  | 描述                                                      |
|----------------------|--------|----|-----|-----|---------------------------------------------------------|
| merchantNo           | String | 20 | Yes | Yes | 商户号。 商户注册时，`OnerWay`会为商户创建商户号                             |
| merchantTxnIds       | String | /  | No  | Yes | 商户交易订单号，可以是多个，以逗号分隔，<br> <CMExample data="554815,684541"></CMExample>                |
| originTransactionIds | String | /  | No  | Yes | 来自` Onerway` 的原交易订单号，可以是多个，以逗号分隔      <br> <CMExample data="1787743316,17877433"></CMExample>                      |
| chargebackIds        | String | /  | No  | Yes | 来自` Onerway` 的拒付交易单号，可以是多个，以逗号分隔                          |
| importTimeStart      | String | /  | No  | Yes | ` onerway` 接收的拒付交易的开始时间，格式为`yyyy-MM-dd HH:mm:ss`            |
| importTimeEnd        | String | /  | No  | Yes | ` onerway` 接收的拒付交易的结束时间，格式为`yyyy-MM-dd HH:mm:ss`。 最长间隔为 `90` 天。 |
| current              | String | /  | Yes | Yes | 查询的当前页码                                                 |
| sign                 | String | /  | Yes | No  | 签名字符串，请参阅  签名字符串，请参阅[Sign](./sign.html)                                                   |
                            |

</div>


#### 响应参数

<div class="custom-table bordered-table">

| 名称       | 类型     | 签名 | 描述               |
|----------|--------|----|------------------|
| respCode | String | No | 来自 ` Onerway ` 的响应码  |
| respMsg  | String | No | 来自` Onerway`  的响应信息 |
| data     | Map    | No | 响应数据。 请参阅对象 [Page](./api-chargeback-query#page)  |

</div>



#### Page

<div class="custom-table bordered-table">

| 名称            | 类型     | 必填  | 描述                   |
|---------------|--------|-----|----------------------|
| content       | List   | Yes | 交易信息列表，请参阅对象 [ChargebackInfo](./api-chargeback-query#chargebackinfo) |
| current       | String | Yes  | 当前页码                 |
| size          | String | Yes  | 当前页大小                |
| totalPages    | String | Yes  | 总页数                  |
| totalElements | String | Yes  | 总条数                  |

</div>



#### ChargebackInfo



<div class="custom-table bordered-table">

| 名称                  | 类型     | 必填 | 描述                                                                                                                                                                                                                                                         |
|---------------------|--------|----|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchantNo          | String | Yes | 商户号。 商户注册时，` OnerWay` 会为商户创建商户号                                                                                                                                                                                                                            |
| merchantTxnId       | String | Yes | 商户创建的商户交易订单号，不同的订单号视为不同的交易                                                                                                                                                                                                                                 |
| originTransactionId | String | Yes | 来自 ` Onerway`  的原交易订单号。                                                                                                                                                                                                                                    |
| txnAmount           | String | Yes | 以结算币种计的原交易金额                                                                                                                                                                                                                                               |
| txnCurrency         | String | Yes | 原交易结算币种。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) 货币代码                                                                                                                                                       |
| txnTime             | String | Yes | 原交易完成时间                                                                                                                                                                                                                                                    |
| paymentMethod       | String | Yes | 具体支付方式，包括卡和本地支付类型                                                                                                                                                                                                                                          |
| chargebackId        | String | Yes | ` Onerway` 创建的拒付交易订单号                                                                                                                                                                                                                                      |
| importTime          | String | Yes | ` onerway`  接收拒付交易的时间                                                                                                                                                                                                                                      |
| chargebackAmount    | String | Yes | 发生的拒付金额                                                                                                                                                                                                                                                    |
| chargebackCurrency  | String | Yes | 拒付金额的币种。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) 货币代码                                                                                                                                                       |
| chargebackDate      | String | Yes | 拒付发生的日期                                                                                                                                                                                                                                                    |
| chargebackStatus    | String | Yes | 拒付交易状态。 请参阅 <CustomPopover title="ChargebackStatusEnum" width="auto" reference="ChargebackStatusEnum" link="/apis/enums.html#chargebackstatusenum"><CustomTable :data="ChargebackStatusEnum.data" :columns="ChargebackStatusEnum.columns"></CustomTable></CustomPopover> |
| chargebackReason    | String | Yes | 拒付原因                                                                                                                                                                                                                                                       |
| chargebackArn       | String | Yes | ARN                                                                                                                                                                                                                                                        |
| appealDueTime       | String | Yes | 申诉资料提交截止时间，格式为`yyyy-MM-dd HH:mm:ss`                                                                                                                                                                                                                        |
| chargebackCode      | String | Yes | 拒付代码                                                                                                                                                                                                                                                       |

</div>


## 以下部分展示了拒付订单查询的请求示例：

### Request

https://sandbox-acq.onerway.com/v1/chargeback/list <Badge type="tip">POST</Badge>


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
{
  "respCode": "20000",
  "respMsg": "Success",
  "data": {
    "content": [
      {
        "merchantNo": "800209",
        "chargebackId": "1815648032830914560",
        "importTime": "2024-07-23 15:19:59",
        "merchantTxnId": "355243001534",
        "originTransactionId": "1815582133184757760",
        "txnAmount": "30.00",
        "txnCurrency": "USD",
        "txnTime": "2024-07-23 10:58:25",
        "paymentMethod": "VISA",
        "chargebackAmount": "10.00",
        "chargebackCurrency": "USD",
        "chargebackDate": "2024-07-23",
        "chargebackReason": "111",
        "chargebackArn": "1111",
        "chargebackCode": "111",
        "appealDueTime": "2024-07-26 15:19:59",
        "chargebackStatus": "NEW"
      },
      {
        "merchantNo": "800209",
        "chargebackId": "1815647844296949760",
        "importTime": "2024-07-23 15:19:14",
        "merchantTxnId": "1721712864000",
        "originTransactionId": "1815621472153370624",
        "txnAmount": "20.00",
        "txnCurrency": "USD",
        "txnTime": "2024-07-23 13:36:59",
        "paymentMethod": "MASTERCARD",
        "chargebackAmount": "10.00",
        "chargebackCurrency": "USD",
        "chargebackDate": "2024-07-23",
        "chargebackReason": "1111",
        "chargebackArn": "1111",
        "chargebackCode": "111",
        "appealDueTime": "2024-07-26 15:19:14",
        "chargebackStatus": "NEW"
      }
    ],
    "current": "1",
    "size": 10,
    "totalPages": 1,
    "totalElements": 2
  }
}

```

<div class="alertbox4">

::: tip 此示例仅限参考 请勿拿此示例直接请求。
:::

</div>

