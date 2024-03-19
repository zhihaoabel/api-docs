---
outline: deep
---

<script setup>

import CMExample from './components/CMExample.vue';
import CMNote from './components/CMNote.vue';
import CustomPopover from './components/element-ui/CustomPopover.vue'; 
import CustomTable from "./components/element-ui/CustomTable.vue";
import {NotifyTypeEnum, TxnTypeEnum} from "./util/constants";

</script>

# 通知

::: warning 注意事项：

- 通知地址可以通过两种方式给我们，一种是由商户在Onerway注册时提供，另一种是通过交易接口中的字段传输。
- 优先找交易接口中的 `notifyUrl` 作为通知地址，如果没有则会找后台配置的，如果还找不到则不会发送通知。
- 商户需要根据以下参数开发并响应接收结果。
- 请将 `v1/txn/notifyResult` 添加到通知地址的 URI 部分中。
- 支付结果以异步通知为准！

:::

<Badge text="POST" type="tip"></Badge> `{notifyUrl}` 

## 请求参数

<div class="custom-table">

| 参数名                        | 类型     | 长度   | 签名  | 描述                                                                                                                                                                                                                                                             |
|----------------------------|--------|------|-----|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| notifyType                 | String | /    | Yes | 通知类型。请参阅 <CustomPopover title="NotifyTypeEnum" width="auto" reference="NotifyTypeEnum" link="/apis/enums.html#notifytypeenum"><CustomTable :data="NotifyTypeEnum.data" :columns="NotifyTypeEnum.columns"></CustomTable></CustomPopover>                        |
| txnType                    | String | /    | Yes | 交易类型。请参阅 <CustomPopover title="TxnTypeEnum" width="auto" reference="TxnTypeEnum" link="/apis/enums.html#txntypeenum"><CustomTable :data="TxnTypeEnum.data" :columns="TxnTypeEnum.columns"></CustomTable></CustomPopover>。 当 `notifyType` 为 `TXN` 时返回，用于区分支付和退款 |
| transactionId              | String | 20   | Yes | Onerway创建的交易订单号，对应商户订单号                                                                                                                                                                                                                                        |
| originTransactionId        | String | 20   | No  | 来源于Onerway的原始交易订单号。在退款等反向交易的通知中返回对应的正向交易的Onerway交易订单号                                                                                                                                                                                                          |
| merchantTxnId              | String | 64   | Yes | 商户创建的商户交易订单号。不同的订单号视为不同的交易                                                                                                                                                                                                                                     |
| originMerchantTxnId        | String | 64   | No  | 商户原交易订单号。在退款等反向交易的通知中返回对应的正向交易的商户交易订单号                                                                                                                                                                                                                         |
| merchantNo                 | String | 20   | Yes | 商户号。 商户注册时，OnerWay会为商户创建商户号                                                                                                                                                                                                                                    |
| responseTime               | String | /    | Yes | 接口响应时间。格式为 <br/> `yyyy-MM-dd HH:mm:ss`<br/><CMExample data="2024-2-28 15:05:34"></CMExample>                                                                                                                                                                   |
| txnTime                    | String | /    | Yes | 交易完成时间。格式为 <br/> `yyyy-MM-dd HH:mm:ss`<br/><CMExample data="2024-2-28 15:05:34"></CMExample>                                                                                                                                                                   |
| txnTimeZone                | String | /    | Yes | 交易完成时区。<br/> <CMExample data="+08:00"></CMExample>                                                                                                                                                                                                             |
| orderAmount                | String | 19   | Yes | 交易订单金额                                                                                                                                                                                                                                                         |
| orderCurrency              | String | 8    | Yes | 交易订单的货币。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) 货币代码                                                                                                                                                           |
| txnAmount                  | String | 19   | Yes | 订单金额转换成结算币种后的金额                                                                                                                                                                                                                                                |
| txnCurrency                | String | 8    | Yes | 结算币种。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) 货币代码                                                                                                                                                              |
| settleRate                 | String | 19   | Yes | 汇率<br/><CMExample leadingText="计算公式" data="<br/>txnAmount = orderAmount * settleRate"></CMExample>                                                                                                                                                             |
| customsDeclarationAmount   | String | 19   | No  | 可报关金额                                                                                                                                                                                                                                                          |
| customsDeclarationCurrency | String | 8    | No  | 可用于报关的金额对应币种。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) 货币代码                                                                                                                                                      |
| paymentMethod              | String | 64   | No  | 具体支付方式，包括卡和本地支付类型                                                                                                                                                                                                                                              |
| walletTypeName             | String | 128  | No  | 钱包的品牌名称                                                                                                                                                                                                                                                        |
| status                     | String | 1    | Yes | 交易处理结果。 枚举如下： <CMExample leadingText="" data="<br/> S - 交易成功/取消交易成功 <br/> F - 交易失败/审批不通过/取消交易失败"></CMExample>                                                                                                                                                  |
| reason                     | String | 512  | Yes | 交易失败的原因                                                                                                                                                                                                                                                        |
| periodValue                | String | /    | No  | 分期付款期数                                                                                                                                                                                                                                                         |
| contractId                 | String | 20   | Yes | 订阅合同id。在订阅首购时会返回                                                                                                                                                                                                                                               |
| tokenId                    | String | 300  | Yes | token id。在订阅首购、协议代扣申请 `token` 时会返回                                                                                                                                                                                                                             |
| tokenExpireTime            | String | /    | No  | token过期时间。在协议代扣申请 `token` 时会返回                                                                                                                                                                                                                                 |
| eci                        | String | 2    | Yes | 责任转移                                                                                                                                                                                                                                                           |
| chargebackDate             | String | /    | Yes | 发生拒付的日期。格式为 <br/> `yyyy-MM-dd` <br/> <CMExample data="2024-2-28 15:05:34"></CMExample>                                                                                                                                                                         |
| importTime                 | String | /    | Yes | Onerway接收拒付交易的时间。格式为 <br/> `yyyy-MM-dd HH:mm:ss`<br/><CMExample data="2024-2-28 15:05:34"></CMExample>                                                                                                                                                         |
| appealDueTime              | String | /    | Yes | 申诉资料提交截止时间。格式为 <br/> `yyyy-MM-dd HH:mm:ss`<br/><CMExample data="2024-2-28 15:05:34"></CMExample>                                                                                                                                                               |
| chargebackAmount           | String | 19   | Yes | 拒付金额                                                                                                                                                                                                                                                           |
| chargebackCurrency         | String | 8    | Yes | 拒付金额对应币种。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) 货币代码                                                                                                                                                          |
| chargebackStatus           | String | 16   | Yes | 拒付状态。请参阅 ChargebackStatusEnum                                                                                                                                                                                                                                  |
| chargebackArn              | String | 128  | Yes | 拒付ARN                                                                                                                                                                                                                                                          |
| chargebackCode             | String | 32   | Yes | 拒付代码                                                                                                                                                                                                                                                           |
| chargebackReason           | String | 1024 | Yes | 拒付原因                                                                                                                                                                                                                                                           |
| sign                       | String | /    | No  | 签名字符串                                                                                                                                                                                                                                                          |

</div>

## 通知请求示例

::: code-group

```json [支付通知]
{
    "notifyType": "TXN", // [!code warning]
    "transactionId": "1599953668994019328",
    "txnType": "SALE", // [!code warning]
    "merchantNo": "800096",
    "merchantTxnId": "1670293654000",
    "originMerchantTxnId": null,
    "responseTime": "2022-12-06 10:27:39",
    "txnTime": "2022-12-06 10:27:35",
    "txnTimeZone": "+08:00",
    "orderAmount": "29.00",
    "orderCurrency": "USD",
    "txnAmount": "29.00",
    "txnCurrency": "USD",
    "customsDeclarationAmount": null,
    "customsDeclarationCurrency": null,
    "status": "S",
    "contractId": null,
    "tokenId": null,
    "tokenExpireTime": null,
    "eci": null,
    "reason": "{\"respCode\":\"20000\",\"respMsg\":\"Success\"}",
    "periodValue": null,
    "paymentMethod": "VISA",
    "walletTypeName": null,
    "sign": "..."
}

```

```json [退款通知]
{
    "notifyType":"TXN",
    "transactionId":"1600000893212209152",
    "txnType":"REFUND", // [!code warning]
    "merchantNo":"800096",
    "merchantTxnId":"1670304250000",
    "originMerchantTxnId":"1670304250000",
    "responseTime":"2022-12-06 13:36:06",
    "txnTime":null,
    "txnTimeZone":"+08:00",
    "orderAmount":"16.00",
    "orderCurrency":"USD",
    "txnAmount":"16.00",
    "txnCurrency":"USD",
    "settleRate":"1",
    "customsDeclarationAmount":null,
    "customsDeclarationCurrency":null,
    "status":"S",
    "contractId":null,
    "tokenId":null,
    "tokenExpireTime":null,
    "eci":null,
    "reason":"{\"respCode\":\"20000\",\"respMsg\":\"Success\"}",
    "periodValue":null,
    "paymentMethod":"VISA",
    "walletTypeName":null,
    "sign": "..."
}
```

```json [交易取消通知]
{
    "notifyType":"CANCEL", // [!code warning]
    "transactionId":"1600013917075582976",
    "txnType":"SALE", // [!code warning]
    "merchantNo":"800058",
    "merchantTxnId":"1670308019000",
    "originMerchantTxnId":null,
    "responseTime":null,
    "txnTime":"2022-12-06 14:26:59",
    "txnTimeZone":null,
    "orderAmount":"323.90",
    "orderCurrency":"USD",
    "txnAmount":"",
    "txnCurrency":null,
    "settleRate":null,
    "customsDeclarationAmount":null,
    "customsDeclarationCurrency":null,
    "status":"S",
    "contractId":null,
    "tokenId":null,
    "tokenExpireTime":null,
    "eci":null,
    "reason":"{\"respCode\":\"20000\",\"respMsg\":\"Success\"}",
    "periodValue":null,
    "paymentMethod":null,
    "walletTypeName":null,
    "sign": "..."
}
```
:::

## 响应之前验签



## 响应示例

```json
1530009844336164864
```