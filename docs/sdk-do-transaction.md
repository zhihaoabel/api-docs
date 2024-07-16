---
outline: deep
---

<script lang="ts" setup>

import CustomPopover from './components/element-ui/CustomPopover.vue'; 
import CustomTable from "./components/element-ui/CustomTable.vue";
import CMNote from './components/CMNote.vue';
import CMExample from './components/CMExample.vue';
import {ProductTypeEnum, SubProductTypeEnum, TxnTypeEnum, PaymentModeEnum, OsTypeEnum, Risk3dsStrategyEnum, Subscription, MpiInfo, TxnOrderMsg, TransactionInformation, LpmsInfo, StoreProductTypeEnum, TxnStatusEnum} from "./util/constants";

</script>

# 下单

请求地址、请求方式、请求头 可以参考：

<div class="custom-table bordered-table">

| 名称             | 内容                                                                                   |
|----------------|--------------------------------------------------------------------------------------|
| Request URL    | https://sandbox-acq.onerway.com/v1/sdkTxn/doTransaction                              |
| Request Method | <div style="color:var(--vp-c-brand-1);font-weight:500;"> POST  </div>                |
| Content-Type   | <div style="color:var(--vp-c-brand-1);font-weight:500;">application/json      </div> |

</div>

::: warning Content-Type: application/json; charset=UTF-8  :x:   <br>Content-Type: application/json  :white_check_mark:
:::

## 请求参数

<div class="custom-table bordered-table">

| 名称                    | 类型     | 长度  | 必填  | 签名  | 描述                                                                                                                                                                                                                                                                           |
|-----------------------|--------|-----|-----|-----|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchantNo            | String | 20  | Yes | Yes | 商户号。由Onerway分配，在Onerway后台获取。                                                                                                                                                                                                                                                 |
| merchantTxnId         | String | 64  | Yes | Yes | 顾客每次付款的订单号，必须保证单号唯一。                                                                                                                                                                                                                                                         |
| merchantTxnTime       | String | /   | No  | Yes | 商户交易订单发生的时间 格式为 <br/> `yyyy-MM-dd HH:mm:ss`<br/><CMExample data="2024-2-28 15:05:34"></CMExample>                                                                                                                                                                            |
| merchantTxnTimeZone   | String | 64  | No  | Yes | 商户交易订单发生的时区。 <br/> <CMExample data="+08:00"></CMExample>                                                                                                                                                                                                                     |
| merchantTxnOriginalId | String | 128 | No  | Yes | 商家生成的主订单号，单号可以重复，但重复的单号只有一笔可以成功。                                                                                                                                                                                                                                             |
| merchantCustId        | String | 50  | No  | Yes | 客户在商户的唯一标识。<br/>                                                                                                                                                                                                                                                             |
| productType           | String | 16  | Yes | Yes | 产品类型。请参阅 <br/><CustomPopover title="ProductTypeEnum" width="auto" reference="ProductTypeEnum" link="/apis/enums.html#producttypeenum"><CustomTable :data="ProductTypeEnum.data" :columns="ProductTypeEnum.columns"></CustomTable></CustomPopover>                            |
| subProductType        | String | 16  | Yes | Yes | 子产品类型。请参阅 <br/><CustomPopover title="SubProductTypeEnum" width="auto" reference="SubProductTypeEnum" link="/apis/enums.html#subproducttypeenum" ><CustomTable :data="SubProductTypeEnum.data" :columns="SubProductTypeEnum.columns"></CustomTable></CustomPopover>           |
| txnType               | String | 16  | Yes | Yes | 交易类型。请参阅 <br/><CustomPopover title="TxnTypeEnum" width="auto" reference="TxnTypeEnum" link="/apis/enums.html#txntypeenum" ><CustomTable :data="TxnTypeEnum.data" :columns="TxnTypeEnum.columns"></CustomTable></CustomPopover>                                               |
| paymentMode           | String | 16  | No  | Yes | 支付模式。 请参阅 <br/><CustomPopover title="PaymentModeEnum" width="auto" reference="PaymentModeEnum" link="/apis/enums.html#paymentmodeenum" ><CustomTable :data="PaymentModeEnum.data" :columns="PaymentModeEnum.columns"></CustomTable></CustomPopover>。默认为WEB                   |
| osType                | String | 16  | No  | Yes | 操作系统类型。 请参阅 <br/><CustomPopover title="OsTypeEnumTable" width="auto" reference="OsTypeEnum" link="/apis/enums.html#ostypeenum" ><CustomTable :data="OsTypeEnum.data" :columns="OsTypeEnum.columns"></CustomTable></CustomPopover>。<br/><CMNote data="paymentMode不是WEB时必填" /> |
| orderAmount           | String | 19  | Yes | Yes | 订单金额，以“元”为单位，如有小数，保留两位小数。                                                                                                                                                                                                                                                    |
| orderCurrency         | String | 8   | Yes | Yes | 交易订单的货币。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) 货币代码                                                                                                                                                                         |
| originTransactionId   | String | 20  | No  | Yes | 来源于Onerway的原始交易订单号，常用于退款等反向交易时通过此ID查找对应的交易订单号                                                                                                                                                                                                                                |
| risk3dsStrategy       | String | 16  | No  | Yes | 3ds风险控制策略。 请参阅 <br/><CustomPopover title="Risk3dsStrategyEnum" width="auto" reference="Risk3dsStrategyEnum" link="/apis/enums.html#risk3dsstrategyenum" ><CustomTable :data="Risk3dsStrategyEnum.data" :columns="Risk3dsStrategyEnum.columns"></CustomTable></CustomPopover> |
| subscription          | String | /   | No  | Yes | 订阅付款所需的订阅信息。 格式为 `json` 字符串。 请参阅对象 [Subscription](#subscription)                                                                                                                                                                                                             |
| mpiInfo               | String | /   | No  | Yes | mpi信息，3ds验证结果集。`risk3dsStrategy` 为 `EXTERNAL` 时需要。 格式为 json 字符串。 请参阅对象 [MpiInfo](#mpiinfo)                                                                                                                                                                                   |
| txnOrderMsg           | String | /   | No  | Yes | 交易业务信息，除订阅复购外必填。 格式为 `json` 字符串。 请参阅对象 [TxnOrderMsg](#txnordermsg)                                                                                                                                                                                                           |
| billingInformation    | String | /   | No  | Yes | 交易账单信息，除订阅复购外必填。 格式为 `json` 字符串。 请参阅对象 [TransactionInformation](#transactioninformation)                                                                                                                                                                                     |
| shippingInformation   | String | /   | No  | Yes | 交易邮寄信息，除订阅复购外必填。 格式为 `json` 字符串。 请参阅对象 [TransactionInformation](#transactioninformation)                                                                                                                                                                                     |
| lpmsInfo              | String | /   | No  | Yes | 本地支付方式信息，`productType` 为 `LPMS` 时必填，格式为 `json` 字符串。 请参阅对象 [LpmsInfo](#lpmsinfo)                                                                                                                                                                                              |
| sign                  | String | /   | Yes | No  | 签名字符串，请参阅  签名字符串，请参阅[Sign](./sign.html)                                                                                                                                                                                                                                      |

</div>

### TxnOrderMsg

<div class="custom-table bordered-table">

| 名称        | 类型     | 长度   | 必填  | 描述                                                              |
|-----------|--------|------|-----|-----------------------------------------------------------------|
| returnUrl | String | 256  | Yes | 同步返回地址，顾客付款完成后，Onerway的托管页面会通过这个地址重定向回商家的指定页面。                  |
| products  | String | 1024 | Yes | 顾客购买的商品信息列表，请参考下方[Products](#products)对象。                       |
| appId     | String | 20   | Yes | 店铺ID，商家在Onerway入驻网站/应用程序时，会生成一个与该网站/应用程序的唯一ID。 该ID在Onerway后台获取。 |
| notifyUrl | String | 256  | No  | 通知地址。详见[通知](./notify)                                           |

</div>

#### Products

<div class="custom-table bordered-table">

| 名称       | 类型     | 长度   | 必填  | 描述                                                                                                                                                                                                                                                                    |
|----------|--------|------|-----|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name     | String | 256  | Yes | 商品名称。                                                                                                                                                                                                                                                                 |
| price    | String | 1024 | Yes | 商品单价。                                                                                                                                                                                                                                                                 |
| num      | String | 20   | Yes | 商品数量。                                                                                                                                                                                                                                                                 |
| currency | String | 256  | Yes | 商品价格对应得货币。                                                                                                                                                                                                                                                            |
| type     | String | 256  | No  | 商品类型。请参考 <CustomPopover title="StoreProductTypeEnum" width="auto" reference="StoreProductTypeEnum" link="/apis/enums.html#storeproducttypeenum"><CustomTable :data="StoreProductTypeEnum.data" :columns="StoreProductTypeEnum.columns"></CustomTable></CustomPopover> |

</div>

::: tip `products` 必须为`JSON`字符串格式

**示例：**

<Badge type="danger">如果type为shipping_fee，折扣金额需要传负数</Badge>

::: code-group

```json [一般情况]
\"[{\\\"name\\\":\\\"Pro1\\\",\\\"price\\\":\\\"50.00\\\",\\\"num\\\":\\\"2\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"Pro2\\\",\\\"price\\\":\\\"100\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\"}]\"

```

```json [有折扣]
\"[{\\\"name\\\":\\\"Pro1\\\",\\\"price\\\":\\\"50.00\\\",\\\"num\\\":\\\"2\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"Pro2\\\",\\\"price\\\":\\\"100\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"discount\\\",\\\"price\\\":\\\"-10\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\",\\\"type\\\":\\\"discount\\\"}]\"

```

```json [有运费]
\"[{\\\"name\\\":\\\"Pro1\\\",\\\"price\\\":\\\"50.00\\\",\\\"num\\\":\\\"2\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"Pro2\\\",\\\"price\\\":\\\"100\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"shipping fee\\\",\\\"price\\\":\\\"10\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\",\\\"type\\\":\\\"shipping_fee\\\"}]\"

```

```json [有折扣和运费]
\"[{\\\"name\\\":\\\"Pro1\\\",\\\"price\\\":\\\"50.00\\\",\\\"num\\\":\\\"2\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"Pro2\\\",\\\"price\\\":\\\"100\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"shipping fee\\\",\\\"price\\\":\\\"10\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\",\\\"type\\\":\\\"shipping_fee\\\"},{\\\"name\\\":\\\"discount\\\",\\\"price\\\":\\\"-10\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\",\\\"type\\\":\\\"discount\\\"}]\"

```

**要注意的是 price * num = orderAmount（订单交易金额）**
:::

### TransactionInformation

<div class="custom-table bordered-table">

| 名称             | 类型     | 长度  | 必填  | 描述                                                                                                                                                                         |
|----------------|--------|-----|-----|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| firstName      | String | 64  | Yes | 名 (虚拟商品可不传)                                                                                                                                                                |
| lastName       | String | 64  | Yes | 姓 (虚拟商品可不传)                                                                                                                                                                |
| jpFirstName    | String | 64  | No  | （日文片假名）名                                                                                                                                                                   |
| jpLastName     | String | 64  | No  | （日文片假名）姓                                                                                                                                                                   |
| phone          | String | 32  | Yes | 电话号码   (虚拟商品的可不传)                                                                                                                                                          |
| email          | String | 256 | Yes | 电子邮件                                                                                                                                                                       |
| postalCode     | String | 32  | Yes | 邮政编码  (虚拟商品可不传)                                                                                                                                                            |
| address        | String | 256 | Yes | 地址    (虚拟商品可不传)                                                                                                                                                            |
| country        | String | 64  | Yes | 国家。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes)。 <br>   <CMExample data="美国 is US "></CMExample>                                |
| province       | String | 64  | Yes | 州。 当国家是美国 \(US\) 或加拿大 \(CA\) 时必填。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes)。 <br>  <CMExample data="美属萨摩亚 is AS"></CMExample> |
| city           | String | 64  | Yes | 城市 (虚拟商品可不传)                                                                                                                                                               |
| street         | String | 64  | No  | 街道                                                                                                                                                                         |
| number         | String | 64  | No  | 门牌号                                                                                                                                                                        |
| identityNumber | String | 64  | No  | 证件号码                                                                                                                                                                       |
| birthDate      | String | 64  | No  | 出生日期，格式为 `yyyy/MM/dd`                                                                                                                                                      |

</div>

### LpmsInfo

<div class="custom-table bordered-table">


| 名称            | 类型     | 长度  | 必填  | 描述                                                                                                                                                                                                                                                                                                                                                                                           |
|---------------|--------|-----|-----|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| lpmsType      | String | 64  | Yes | 本地支付方式。 请参阅 <CustomPopover title="LpmsTypeEnum" width="auto" reference="LpmsTypeEnum" link="/apis/enums.html#lpmstypeenum" ></CustomPopover>。                                                                                                                                                                                                                                                |
| bankName      | String | 128 | No  | 银行名称，某些本地支付方式需要。`lpmsType`为`EFT`时请参阅    <CustomPopover title="EFTBankNameEnum" width="auto" reference="EFTBankNameEnum" link="/apis/enums.html#eftbanknameenum" ></CustomPopover>      。 <br/>`lpmsType`为`Przelewy24`时请参阅    <CustomPopover title="Przelewy24BankNameEnum" width="auto" reference="Przelewy24BankNameEnum" link="/apis/enums.html#przelewy24banknameenum" ></CustomPopover>。 |
| iBan          | String | 64  | No  | 银行账户，部分地区转账时需要                                                                                                                                                                                                                                                                                                                                                                               |
| prepaidNumber | String | /   | No  | 预付费卡号，部分支付方式需要                                                                                                                                                                                                                                                                                                                                                                               |

</div>

### Subscription

<div class="custom-table bordered-table">

| 名称             | 类型     | 长度  | 必填  | 签名 | 描述                                                     |
|----------------|--------|-----|-----|----|--------------------------------------------------------|
| requestType    | String | 1   | Yes | No | 订阅请求类型。<br/>枚举如下：**0 - 首购 1 - 复购**                     |
| merchantCustId | String | 50  | No  | No | 商户客户id。<br/><CMNote data="requestType为0时必填。"></CMNote> |
| expireDate     | String | 10  | No  | No | 过期日期。<br/><CMNote data="requestType为0时必填。"></CMNote>   |
| frequencyType  | String | 1   | No  | No | 订阅频率类型。<br/><CMNote data="requestType为0时必填。"></CMNote> |
| frequencyPoint | String | 2   | No  | No | 订阅频率点数。<br/><CMNote data="requestType为0时必填。"></CMNote> |
| contractId     | String | 20  | No  | No | 订阅合同id。<br/><CMNote data="requestType为1时必填。"></CMNote> |
| tokenId        | String | 300 | No  | No | 订阅令牌id。<br/><CMNote data="requestType为1时必填。"></CMNote> |

</div>

### MpiInfo

 <div class="custom-table bordered-table">

| 名称        | 类型     | 长度  | 必填  | 描述                                              |
|-----------|--------|-----|-----|-------------------------------------------------|
| eci       | String | 2   | Yes | 责任转移                                            |
| cavv      | String | 128 | Yes | 由发卡行创建                                          |
| xid       | String | 128 | No  | `3D-Secure` v1版本`Mpi`交易`id`（与`dsTransID`任选其一填写） |
| dsTransID | String | 128 | No  | `3D-Secure` v2版本Mpi交易`id`（与`xid`任选其一填写）         |

</div>

## 响应参数

 <div class="custom-table bordered-table">

| 名称       | 类型     | 签名 | 描述                         |
|----------|--------|----|----------------------------|
| respCode | String | No | 来自 ` Onerway` 的响应码         |
| respMsg  | String | No | 来自 `Onerway` 的响应信息         |
| data     | Map    | No | 响应数据。 请参阅对象  [data](#data) |

</div>

### data

<div class="custom-table bordered-table">

| 名称            | 签名  | 类型     | 描述                                                                                                                                                                                                                                         |
|---------------|-----|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| transactionId | Yes | String | Onerway创建的交易订单号。商户下单时的订单号                                                                                                                                                                                                                  |
| responseTime  | Yes | String | 接口响应时间。格式为`yyyy-MM-dd HH:mm:ss`<br/><CMExample data="2024-2-28 15:05:34"></CMExample>                                                                                                                                                      |
| txnTime       | Yes | String | 交易完成时间。格式为`yyyy-MM-dd HH:mm:ss`<br/><CMExample data="2024-2-28 15:05:34"></CMExample>                                                                                                                                                      |
| txnTimeZone   | Yes | String | 交易完成时区。<CMExample data="+08:00" />                                                                                                                                                                                                         |
| orderAmount   | Yes | String | 交易订单金额。                                                                                                                                                                                                                                    |
| orderCurrency | Yes | String | 交易订单币种。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) 货币代码                                                                                                                                        |
| txnAmount     | Yes | String | 订单金额转换成结算币种后的金额                                                                                                                                                                                                                            |
| txnCurrency   | Yes | String | 结算币种。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) 货币代码                                                                                                                                          |
| status        | Yes | String | 交易处理结果。 请参阅 <br/><CustomPopover title="TxnStatusEnum" width="auto" reference="TxnStatusEnum" link="/apis/enums.html#txnstatusenum"><CustomTable :data="TxnStatusEnum.data" :columns="TxnStatusEnum.columns"></CustomTable></CustomPopover> |
| redirectUrl   | Yes | String | 当交易状态为`R`时，商户需要重定向到该URL完成部分交易，包括3ds验证、本地支付收银等                                                                                                                                                                                              |
| periodValue   | No  | String | 分期付款期数                                                                                                                                                                                                                                     |
| contractId    | Yes | String | 订阅合同`id`。首购时返回                                                                                                                                                                                                                             |
| tokenId       | Yes | String | 订阅令牌`id`。首购时返回                                                                                                                                                                                                                             |
| eci           | Yes | String | 责任转移                                                                                                                                                                                                                                       |
| sign          | No  | String | 签名字符串，请参阅  签名字符串，请参阅[Sign](./sign.html)                                                                                                                                                                                                    |

</div>

<style lang="css">



</style>