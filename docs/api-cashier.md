---
outline: deep
---

<script lang="ts" setup>

import {reactive, ref, watch, onMounted, unref } from 'vue'; 
import {requestGen, secret} from "./util/utils";
import {ProductTypeEnum as ProductTypeEnumTable, SubProductTypeEnum as SubProductTypeEnumTable,TxnTypeEnum as TxnTypeEnumTable, StoreProductTypeEnum} from "./util/constants";
import CMExample from './components/CMExample.vue';
import CMNote from './components/CMNote.vue';
import CustomPopover from './components/element-ui/CustomPopover.vue'; 
import CustomTable from "./components/element-ui/CustomTable.vue";
import {TopRight, View} from "@element-plus/icons-vue";
import { ClickOutside as vClickOutside } from 'element-plus';

let activeName = ref('first');

</script>

# 收银台支付

收银台支付：顾客从商家网站或应用程序重定向到支付供应商的托管页面进行支付。

请求地址、请求方式、请求头 可以参考：

<div class="custom-table bordered-table">

| 名称             | 内容                                                                                   |
|----------------|--------------------------------------------------------------------------------------|
| Request URL    | https://sandbox-acq.onerway.com/txn/payment                                          |
| Request Method | <div style="color:var(--vp-c-brand-1);font-weight:500;"> POST  </div>                |
| Content-Type   | <div style="color:var(--vp-c-brand-1);font-weight:500;">application/json      </div> |

</div>

<div class="alertbox3">

::: tip  Content-Type: application/json; charset=UTF-8 错误   <br>Content-Type: application/json 正确 
:::

</div>



####  接入流程 <br><br>

<div style="height: 200px;">
  <el-steps direction="vertical" :active="5" finish-status="finish">
    <el-step title="请求收银台下单接口"></el-step>
    <el-step title="获取接口响应redirectUrl" ></el-step>
    <el-step title="重定向到获取的redirectUrl"></el-step>
    <el-step title="完成下单"></el-step>
    <el-step title="处理异步通知，更新订单状态。并返回异步通知中的transactionId"></el-step>
  </el-steps>
</div>

<!-- 1. 请求收银台下单接口
2. 获取接口响应redirectUrl
3. 重定向到获取的redirectUrl
4. 完成下单
5. 处理异步通知，更新订单状态。并返回异步通知中的transactionId -->


## 收银台支付

#### 请求参数


<div class="custom-table bordered-table">

| 名称	                   | 类型     | 长度  | 必填	  | 描述                                                                                                                                                                                                                                                          |
|-----------------------|--------|-----|------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchantNo            | String | 20  | Yes  | 商户号，由Onerway分配，在Onerway后台获取。                                                                                                                                                                                                                                |                                           |
| merchantTxnId         | String | 64  | Yes  | 顾客每次付款的订单号，必须保证单号唯一。                                                                                                                                                                                                                                        |
| merchantTxnTime       | String | /   | No   | 商户交易订单发生的时间。 格式为  `yyyy\-MM\-dd HH:mm:ss` <br>  <CMExample data="2024-2-28 15:05:34"></CMExample>                                                                                                                                                           |
| merchantTxnTimeZone   | String | 64  | No   | 商户交易订单发生的时区。  <br>  <CMExample data="+08:00"></CMExample>                                                                                                                                                                                                   |
| merchantTxnOriginalId | String | 128 | No   | 商家生成的主订单号，单号可以重复，但重复的单号只有一笔可以成功。                                                                                                                                                                                                                            |
| productType           | String | 16  | Yes  | 产品类型，请参阅 <br/><CustomPopover title="ProductTypeEnum" width="auto" reference="ProductTypeEnum" link="/apis/enums.html#producttypeenum"><CustomTable :data="ProductTypeEnumTable.data" :columns="ProductTypeEnumTable.columns"></CustomTable></CustomPopover> |
| subProductType        | String | 16  | Yes  | 子产品类型，                                                                                                                                                                                                                                                      |
| txnType               | String | 16  | Yes  | 交易类型， <br/> <CustomPopover title="TxnTypeEnum" width="auto" reference="TxnTypeEnum" link="/apis/enums.html#txntypeenum" > <CustomTable :data="TxnTypeEnumTable.data" :columns="TxnTypeEnumTable.columns"></CustomTable> </CustomPopover>                    |
| orderAmount           | String | 19  | Yes  | 订单金额，以“元”为单位，如有小数，保留两位小数。                                                                                                                                                                                                                                   |
| orderCurrency         | String | 8   | Yes  | 交易订单的货币。 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes)货币代码                                                                                                                                                             |
| subscription          | String | /   | No   | 订阅付款所需的订阅信息。 格式为 json 字符串。 请参阅对象   <br/> <CustomPopover title="Subscription" width="auto" reference="SubProductTypeEnum" link="/apis/enums.html#subproducttypeenum" ></CustomPopover>                                                                       |
| mpiInfo               | String | /   | No   | mpi信息，3ds验证结果集，`risk3dsStrategy`为`EXTERNAL`时需要。 格式为 `json` 字符串。 请参阅对象   <CustomPopover title="MpiInfo" width="auto" reference="MpiInfo" link="/apis/api-Cashier.html#mpiinfo" ></CustomPopover>                                                             |
| txnOrderMsg           | String | /   | YES  | 交易业务信息，除订阅复购外必填。 格式为 `json` 字符串。 请参阅对象     <CustomPopover title="TxnOrderMsg" width="auto" reference="TxnOrderMsg" link="/apis/api-Cashier.html#txnordermsg" ></CustomPopover>                                                                              |
| cardInfo              | String | /   | No   | 交易卡信息。 格式为 `json` 字符串。 请参阅对象           <CustomPopover title="TxnCardInfo" width="auto" reference="TxnCardInfo" link="/apis/api-Cashier.html#txncardinfo" ></CustomPopover>                                                                                  |
| billingInformation    | String | /   | Yes  | 账单信息格式为 json 字符串。 请参阅对象  <CustomPopover title="TransactionAddress" width="auto" reference="TransactionAddress" link="/apis/api-Cashier.html#transactionaddress" ></CustomPopover>                                                                           |
| shippingInformation   | String | /   | Yes  | 账单信息格式为 json 字符串。 请参阅对象  <CustomPopover title="TransactionAddress" width="auto" reference="TransactionAddress" link="/apis/api-Cashier.html#transactionaddress" ></CustomPopover>                                                                           |
| lpmsInfo              | String | /   | No   | 用来指定使用哪个本地支付方式。格式为json字符串。 请参阅对象  <CustomPopover title="LpmsInfo" width="auto" reference="LpmsInfo" link="/apis/api-cashier.html#lpmsinfo" ></CustomPopover>                                                                                                |
| sign                  | String | /   | Yes  | 签名字符串，请参阅  签名字符串，请参阅[Sign](./sign.html)                                                                                                                                                                                                                     |


</div>

#### TxnOrderMsg

<div class="custom-table bordered-table">

| 名称        | 类型     | 长度   | 必填  | 描述                                                              |
|-----------|--------|------|-----|-----------------------------------------------------------------|
| returnUrl | String | 256  | Yes | 同步返回地址，顾客付款完成后，Onerway的托管页面会通过这个地址重定向回商家的指定页面。                  |
| products  | String | 1024 | Yes | 顾客购买的商品信息列表，请参考下方[Products](./api-cashier#product)对象。           |
| appId     | String | 20   | Yes | 店铺ID，商家在Onerway入驻网站/应用程序时，会生成一个与该网站/应用程序的唯一ID。 该ID在Onerway后台获取。 |
| notifyUrl | String | 256  | No  | 通知地址。详见[通知](./notify)                                           |

</div>

#### Products

<div class="custom-table bordered-table">

| 名称       | 类型     | 长度   | 必填  | 描述         |
|----------|--------|------|-----|------------|
| name     | String | 256  | Yes | 商品名称。      |
| price    | String | 1024 | Yes | 商品单价。      |
| num      | String | 20   | Yes | 商品数量。      |
| currency | String | 256  | No  | 商品价格对应得货币。 |
| type     | String | 256  | No  | 商品类型。请参考 <CustomPopover title="StoreProductTypeEnum" width="auto" reference="StoreProductTypeEnum" link="/apis/enums.html#storeproducttypeenum"><CustomTable :data="StoreProductTypeEnum.data" :columns="StoreProductTypeEnum.columns"></CustomTable></CustomPopover> |

</div>

::: tip `products` 必须为`JSON`字符串格式

**示例：**

<Badge type="warning">如果type为shipping_fee，折扣金额需要传负数</Badge>

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

#### TxnCardInfo

<div class="custom-table bordered-table">

| 名称         | 类型     | 长度 | 必填 | 描述    |
|------------|--------|----|----|-------|
| holderName | String | 48 | No | 持卡人姓名 |

</div>

#### TransactionAddress

<div class="custom-table bordered-table">

| 名称             | 类型     | 长度  | 必填   | 描述                                                        |
|----------------|--------|-----|------|-----------------------------------------------------------|
| firstName      | String | 64  | Yes  | 名 (虚拟商品可不传)                                                         |
| lastName       | String | 64  | Yes  | 姓 (虚拟商品可不传)                                                         |
| jpFirstName    | String | 64  | No   | （日文片假名）名                                                   |
| jpLastName     | String | 64  | No   | （日文片假名）姓                                                  |
| phone          | String | 32  | Yes  | 电话号码   (虚拟商品的可不传)                                                       |
| email          | String | 256 | Yes  | 电子邮件                                                       |
| postalCode     | String | 32  | Yes  | 邮政编码  (虚拟商品可不传)                                                        |
| address        | String | 256 | Yes  | 地址    (虚拟商品可不传)                                                        |
| country        | String | 64  | Yes  | 国家。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes)。 <br>   <CMExample data="美国 is US "></CMExample>                             |
| province       | String | 64  | Yes  | 州。 当国家是美国 \(US\) 或加拿大 \(CA\) 时必填。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes)。 <br>  <CMExample data="美属萨摩亚 is AS"></CMExample> |
| city           | String | 64  | Yes  | 城市 (虚拟商品可不传)                                                           |
| street         | String | 64  | No   | 街道                                                        |
| number         | String | 64  | No   | 门牌号                                                       |
| identityNumber | String | 64  | No   | 证件号码                                                      |
| birthDate      | String | 64  | No   | 出生日期，格式为 `yyyy/MM/dd`                                       |


</div>


<div class="alertbox3">

::: tip 销售虚拟商品的商户 必须提前与我们沟通。
:::

</div>



#### LpmsInfo

<div class="custom-table bordered-table">


| 名称            | 类型     | 长度  | 必填  | 描述                                                                                                                                                                                                                                                                                                                                                                                    |
|---------------|--------|-----|-----|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| lpmsType      | String | 64  | Yes | 本地支付方式。 请参阅 <CustomPopover title="LpmsTypeEnum" width="auto" reference="LpmsTypeEnum" link="/apis/enums.html#lpmstypeenum" ></CustomPopover>。                                                                                                                                                                                                                                         |
| bankName      | String | 128 | No  | 银行名称，某些本地支付方式需要。`lpmsType`为`EFT`时请参阅    <CustomPopover title="EFTBankNameEnum" width="auto" reference="EFTBankNameEnum" link="/apis/enums.html#eftbanknameenum" ></CustomPopover>      。 <br/>`lpmsType`为`Przelewy24`时请参阅    <CustomPopover title="Przelewy24BankNameEnum" width="auto" reference="Przelewy24BankNameEnum" link="/apis/enums.html#przelewy24banknameenum" ></CustomPopover>。 |
| iBan          | String | 64  | No  | 银行账户，部分地区转账时需要                                                                                                                                                                                                                                                                                                                                                                        |
| prepaidNumber | String | /   | No  | 预付费卡号，部分支付方式需要                                                                                                                                                                                                                                                                                                                                                                        |

</div>

#### MpiInfo

 <div class="custom-table bordered-table">

| 名称        | 类型     | 长度  | 必填  | 描述                                      |
|-----------|--------|-----|-----|-----------------------------------------|
| eci       | String | 2   | Yes | 责任转移                                    |
| cavv      | String | 128 | Yes | 由发卡行创建                                  |
| xid       | String | 128 | No  | `3D-Secure` v1版本`Mpi`交易`id`（与`dsTransID`任选其一填写） |
| dsTransID | String | 128 | No  | `3D-Secure` v2版本Mpi交易`id`（与`xid`任选其一填写）       |

</div>

 #### 响应参数

 <div class="custom-table bordered-table">

| 名称       | 类型     | 签名 | 描述                  |
|----------|--------|----|---------------------|
| respCode | String | No | 来自 ` Onerway` 的响应码     |
| respMsg  | String | No | 来自 `Onerway` 的响应信息    |
| data     | Map    | No | 响应数据。 请参阅对象  <CustomPopover title="TxnInfo" width="auto" reference="TxnInfo" link="/apis/api-Cashier.html#txninfo" ></CustomPopover>|

</div>


 #### TxnInfo


 <div class="custom-table bordered-table">

| 名称            | 类型     | 必填  | 描述                                                                                                                                              |
|---------------|--------|-----|-------------------------------------------------------------------------------------------------------------------------------------------------|
| transactionId | String | Yes | Onerway创建的交易订单号，对应商户订单号                                                                                                                         |
| merchantNo    | String | Yes | 商户号。 商户注册时，OnerWay会为商户创建商户号                                                                                                                     |
| merchantTxnId | String | Yes | 顾客每次付款的订单号。                                                                                                                                     |
| responseTime  | String | Yes | 接口响应时间，格式为`yyyy\-MM\-dd HH:mm:ss  `                                                                                                             |
| txnTime       | String | Yes | 交易完成时间，格式为`yyyy\-MM\-dd HH:mm:ss`                                                                                                               |
| txnTimeZone   | String | Yes | 交易完成时区， <br>  <CMExample data="+08:00"></CMExample>                                                                                             |
| orderAmount   | String | Yes | 交易订单金额                                                                                                                                          |
| orderCurrency | String | Yes | 交易订单币种。 请参阅  [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) 货币代码                                            |
| txnAmount     | String | Yes | 订单金额转换成结算币种后的金额                                                                                                                                 |
| txnCurrency   | String | Yes | 结算币种。 请参阅  [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) 货币代码                                              |
| status        | String | Yes | 交易处理结果。 请参阅  <CustomPopover title="TxnStatusEnum" width="auto" reference="TxnStatusEnum" link="/apis/enums.html#txnstatusenum" ></CustomPopover> |
| reason        | String | Yes | 交易失败的原因                                                                                                                                         |
| redirectUrl   | String | Yes | 收银台地址，商家拿到这个地址后，需要重定向打开。                                                                                                                        |
| sign          | String | Yes | 签名字符串，请参阅  签名字符串，请参阅[Sign](./sign.html)                                                                                                                                              |

</div>

 


## 收银台接口请求、响应示例：


https://sandbox-acq.onerway.com/v1/txn/doTransaction <Badge type="tip">POST</Badge>

::: code-group

```json [Request]

{
  "merchantNo": "800079",
  "merchantTxnId": 2099220674,
  "merchantTxnTime": null,
  "merchantTxnTimeZone": null,
  "productType": "CARD",
  "subProductType": "DIRECT",
  "txnType": "SALE",
  "orderAmount": "200",
  "orderCurrency": "USD",
  "txnOrderMsg": "{\"returnUrl\":\"https:\/\/www.merchant-store-website.com\/\",\"notifyUrl\":\"https:\/\/www.merchant-store-notify.com\/\",\"products\":\"[{\\\"name\\\":\\\"Pro1\\\",\\\"price\\\":\\\"50.00\\\",\\\"num\\\":\\\"2\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"Pro2\\\",\\\"price\\\":\\\"100\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"shipping fee\\\",\\\"price\\\":\\\"10\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\",\\\"type\\\":\\\"shipping_fee\\\"},{\\\"name\\\":\\\"discount\\\",\\\"price\\\":\\\"-10\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\",\\\"type\\\":\\\"discount\\\"}]\",\"transactionIp\":\"127.0.0.1\",\"appId\":1673591020057956352}",
  "shippingInformation": "{\"firstName\":\"xxx\",\"lastName\":\"xxx\",\"phone\":\"13976448789\",\"email\":\"taoyun15@gmail.com\",\"postalCode\":\"35802\",\"address\":\"test\",\"country\":\"US\",\"province\":\"AS\",\"city\":\"city\",\"street\":\"Amsterdam Ave\",\"number\":10,\"identityNumber\":\"717.628.937-97\"}",
  "billingInformation": "{\"firstName\":\"xxx\",\"lastName\":\"xxx\",\"phone\":\"13976448789\",\"email\":\"taoyun15@gmail.com\",\"postalCode\":\"35802\",\"address\":\"test\",\"country\":\"US\",\"province\":\"AS\",\"city\":\"city\",\"street\":\"Amsterdam Ave\",\"number\":10,\"identityNumber\":\"717.628.937-97\"}",
  "sign": "c7a8a2bf3bf2f762dba18b9ef6a6c734b7370b324d00a48cc1291576d318017b"
}

```

```json [Response]

{
  "data": {
    "transactionId": "1810961729430360064",
    "merchantTxnId": "2099220674",
    "merchantNo": "800079",
    "responseTime": "",
    "txnTime": "",
    "orderAmount": "200.00",
    "orderCurrency": "USD",
    "txnAmount": "",
    "status": "U",
    "redirectUrl": "https://sandbox-checkout.onerway.com/checkout?key=5fbf64a805c74600aff384efa29feefd",
    "sign": "",
    "contractId": ""
  },
  "respCode": "20000",
  "respMsg": "Success"
}

```
:::


## 顾客支付完成示例


::: code-group

```json [同步返回（returnurl）]

https://www.merchant-store-website.com/?transactionId=1810961729430360064&merchantTxnId=2099220674&merchantNo=800079&responseTime=2024-07-10%2017:00:56&txnTime=2024-07-10%2017:00:32&txnTimeZone=+08:00&orderAmount=200.00&orderCurrency=USD&txnAmount=200.00&txnCurrency=USD&status=S&reason=Payment%20successful&eci=5

```

```json [异步通知（notifyurl）]

{
  "notifyType": "TXN",
  "transactionId": "1810961729430360064",
  "txnType": "SALE",
  "merchantNo": "800079",
  "merchantTxnId": "2099220674",
  "responseTime": "2024-07-10 17:00:56",
  "txnTime": "2024-07-10 17:00:32",
  "txnTimeZone": "+08:00",
  "orderAmount": "200.00",
  "orderCurrency": "USD",
  "txnAmount": "",
  "status": "S",
  "eci": "5",
  "reason": "{"respCode":"20000","respMsg":"Success"}",
  "sign": "2abc7bf9e3274a040bb4b946823673e6dabade4589a5ed5dde5fcfe4dfb400f4",
  "paymentMethod": "VISA"
}

```
:::

<div class="alertbox4">

::: tip 此示例仅限参考 请勿拿此示例直接请求。
:::

</div>

<style lang="css">

 .dialog-button {
   margin-top: 0.75rem;
   border-radius: 6px;

   border-color: var(--vp-button-alt-border);
   color: var(--vp-button-alt-text);
   background-color: var(--vp-button-alt-bg);
}
</style>