---
outline: deep
---

<script lang="ts" setup>

import {reactive, ref, watch, onMounted, unref } from 'vue'; 
import {requestGen, secret} from "./util/utils";
import {ProductTypeEnum as ProductTypeEnumTable, SubProductTypeEnum as SubProductTypeEnumTable,TxnTypeEnum as TxnTypeEnumTable} from "./util/constants";
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
  <el-steps direction="vertical" :active="1">
    <el-step title="请求收银台下单接口" process-status="success"></el-step>
    <el-step title="获取接口响应redirectUrl" process-status="success" ></el-step>
    <el-step title="重定向到获取的redirectUrl" process-status="success"></el-step>
    <el-step title="完成下单" process-status="success"></el-step>
    <el-step title="处理异步通知，更新订单状态。并返回异步通知中的transactionId" process-status="success"></el-step>
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

| 名称	 | 类型   | 长度  | 必填	  | 签名  | 描述                                                                                                                                                                                                                                                          |
|-------------|---------------|--------------|--------------|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchantNo  | String | 20 | Yes	 | Yes | 商户号，由Onerway分配，在Onerway后台获取。                                                                                                                                                                                                                                |                                           |
| merchantTxnId         | String | 64  | Yes | Yes | 顾客每次付款的订单号，必须保证单号唯一。                                                                                                                                                                                                                                        |
| merchantTxnTime       | String | /   | No  | Yes | 商户交易订单发生的时间。 格式为  `yyyy\-MM\-dd HH:mm:ss` <br>  <CMExample data="2024-2-28 15:05:34"></CMExample>                                                                                                                                                           |
| merchantTxnTimeZone   | String | 64  | No  | Yes | 商户交易订单发生的时区。  <br>  <CMExample data="+08:00"></CMExample>                                                                                                                                                                                                   |
| merchantTxnOriginalId | String | 128 | No  | Yes | 商家生成的主订单号，单号可以重复，但重复的单号只有一笔可以成功。                                                                                                                                                                                                                            |
| productType           | String | 16  | Yes | Yes | 产品类型，请参阅 <br/><CustomPopover title="ProductTypeEnum" width="auto" reference="ProductTypeEnum" link="/apis/enums.html#producttypeenum"><CustomTable :data="ProductTypeEnumTable.data" :columns="ProductTypeEnumTable.columns"></CustomTable></CustomPopover> |
| subProductType        | String | 16  | Yes | Yes | 子产品类型，                                                                                                                                                                                                                                                      |
| txnType               | String | 16  | Yes | Yes | 交易类型， <br/> <CustomPopover title="TxnTypeEnum" width="auto" reference="TxnTypeEnum" link="/apis/enums.html#txntypeenum" > <CustomTable :data="TxnTypeEnumTable.data" :columns="TxnTypeEnumTable.columns"></CustomTable> </CustomPopover>                    |
| orderAmount           | String | 19  | Yes | Yes | 订单金额，以“元”为单位，如有小数，保留两位小数。                                                                                                                                                                                                                                   |
| orderCurrency         | String | 8   | Yes | Yes | 交易订单的货币。 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes)货币代码                                                                                                                                                             |
| subscription          | String | /   | No  | Yes | 订阅付款所需的订阅信息。 格式为 json 字符串。 请参阅对象   <br/> <CustomPopover title="Subscription" width="auto" reference="SubProductTypeEnum" link="/apis/enums.html#subproducttypeenum" ></CustomPopover>                                                                       |
| mpiInfo               | String | /   | No  | Yes | mpi信息，3ds验证结果集，`risk3dsStrategy`为`EXTERNAL`时需要。 格式为 `json` 字符串。 请参阅对象   <CustomPopover title="MpiInfo" width="auto" reference="MpiInfo" link="/apis/api-Cashier.html#mpiinfo" ></CustomPopover>                                                             |
| txnOrderMsg           | String | /   | YES  | Yes | 交易业务信息，除订阅复购外必填。 格式为 `json` 字符串。 请参阅对象     <CustomPopover title="TxnOrderMsg" width="auto" reference="TxnOrderMsg" link="/apis/api-Cashier.html#txnordermsg" ></CustomPopover>                                                                              |
| cardInfo              | String | /   | No  | Yes | 交易卡信息。 格式为 `json` 字符串。 请参阅对象           <CustomPopover title="TxnCardInfo" width="auto" reference="TxnCardInfo" link="/apis/api-Cashier.html#txncardinfo" ></CustomPopover>                                                                                  |
| billingInformation    | String | /   | Yes  | Yes | 账单信息格式为 json 字符串。 请参阅对象  <CustomPopover title="TransactionAddress" width="auto" reference="TransactionAddress" link="/apis/api-Cashier.html#transactionaddress" ></CustomPopover>                                                                           |
| shippingInformation   | String | /   | Yes  | Yes | 账单信息格式为 json 字符串。 请参阅对象  <CustomPopover title="TransactionAddress" width="auto" reference="TransactionAddress" link="/apis/api-Cashier.html#transactionaddress" ></CustomPopover>                                                                           |
| lpmsInfo              | String | /   | No  | Yes | 用来指定使用哪个本地支付方式。格式为json字符串。 请参阅对象  <CustomPopover title="LpmsInfo" width="auto" reference="LpmsInfo" link="/apis/sign.html" ></CustomPopover>                                                                                                                |
| sign                  | String | /   | Yes | No  | 签名字符串，请参阅  签名字符串，请参阅[Sign](./sign.html)                                                                                                                                         |


</div>

#### TxnOrderMsg


<div class="custom-table bordered-table">

| 名称        | 类型     | 长度   | 必填  | 签名 | 描述                                                              |
|-----------|--------|------|-----|----|-----------------------------------------------------------------|
| returnUrl | String | 256  | Yes | No | 同步返回地址，顾客付款完成后，Onerway的托管页面会通过这个地址重定向回商家的指定页面。                  |
| products  | String | 1024 | Yes | No | 顾客购买的商品信息列表。                                                    |
| appId     | String | 20   | Yes | No | 店铺ID，商家在Onerway入驻网站/应用程序时，会生成一个与该网站/应用程序的唯一ID。 该ID在Onerway后台获取。 |
| notifyUrl | String | 256  | No  | No | 通知地址。详见通知                                                       |

</div>




<div class="alertbox3">

::: tip `products` 必须为`JSON`字符串格式 其中`type`字段的枚举如下：<br>`discount`：折扣类型 <br> `shipping_fee`：运费类型 <br>  不传`type` 字段 默认为商品 
   <el-tabs v-model="activeName" >
    <el-tab-pane label="一般情形" name="first" style="font-weight: 700;"> 示例：
   
```json 
[{"name":"iphone11","price":"5300.00","num":"2","currency":"CNY"}]

```
要注意的是 price * num  = orderAmount (交易订单金额) 


</el-tab-pane>

  <el-tab-pane label="有折扣" name="有折扣" style="font-weight: 700;"> 示例：
   
```json 

 [{"name":"iphone11","price":"5300.00","num":"2","currency":"CNY"}, {"name":"macBook","price":"-1234.00","num":"1","currency":"USD","type":"discount"}]

```
要注意的是 price * num - price(折扣金额)  = orderAmount  (交易订单金额)  <text style="color:red;"><br>折扣金额需要传负数</text>


</el-tab-pane>

 <el-tab-pane label="有运费" name="有运费" style="font-weight: 700;"> 示例：
   
```json 

 [{"name":"iphone11","price":"5300.00","num":"2","currency":"CNY"}, {"name":"yunfei","price":"34.00","num":"1","currency":"USD","type":"shipping_fee"}]

```
要注意的是 price * num + price(运费金额)  = orderAmount  (交易订单金额)  

</el-tab-pane>

  </el-tabs>

:::

</div>



#### TxnCardInfo

<div class="custom-table bordered-table">

| 名称         | 类型     | 长度 | 必填 | 签名 | 描述    |
|------------|--------|----|----|----|-------|
| holderName | String | 48 | No | No | 持卡人姓名 |

</div>

#### TransactionAddress

<div class="custom-table bordered-table">

| 名称             | 类型     | 长度  | 必填  | 签名 | 描述                                                        |
|----------------|--------|-----|-----|----|-----------------------------------------------------------|
| firstName      | String | 64  | Yes  | No | 名 (虚拟商品可不传)                                                         |
| lastName       | String | 64  | Yes  | No | 姓 (虚拟商品可不传)                                                         |
| jpFirstName    | String | 64  | No  | No  | （日文片假名）名                                                   |
| jpLastName     | String | 64  | No  | No  | （日文片假名）姓                                                  |
| phone          | String | 32  | Yes  | No | 电话号码   (虚拟商品的可不传)                                                       |
| email          | String | 256 | Yes | No | 电子邮件                                                       |
| postalCode     | String | 32  | Yes  | No | 邮政编码  (虚拟商品可不传)                                                        |
| address        | String | 256 | Yes  | No | 地址    (虚拟商品可不传)                                                        |
| country        | String | 64  | Yes | No | 国家。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes)。 <br>   <CMExample data="美国 is US "></CMExample>                             |
| province       | String | 64  | Yes  | No | 州。 当国家是美国 \(US\) 或加拿大 \(CA\) 时必填。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes)。 <br>  <CMExample data="美属萨摩亚 is AS"></CMExample> |
| city           | String | 64  | Yes  | No | 城市 (虚拟商品可不传)                                                           |
| street         | String | 64  | No  | No  | 街道                                                        |
| number         | String | 64  | No  | No  | 门牌号                                                       |
| identityNumber | String | 64  | No  | No  | 证件号码                                                      |
| birthDate      | String | 64  | No  | No  | 出生日期，格式为 `yyyy/MM/dd`                                       |


</div>


<div class="alertbox3">

::: tip 销售虚拟商品的商户 必须提前与我们沟通。
:::

</div>



#### LpmsInfo

<div class="custom-table bordered-table">


| 名称            | 类型     | 长度  | 必填  | 签名 | 描述                                                                                                                                                                                                                                                                                                                                                                                    |
|---------------|--------|-----|-----|----|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| lpmsType      | String | 64  | Yes | No | 本地支付方式。 请参阅 <CustomPopover title="LpmsTypeEnum" width="auto" reference="LpmsTypeEnum" link="/apis/enums.html#lpmstypeenum" ></CustomPopover>。                                                                                                                                                                                                                                         |
| bankName      | String | 128 | No  | No | 银行名称，某些本地支付方式需要。`lpmsType`为`EFT`时请参阅    <CustomPopover title="EFTBankNameEnum" width="auto" reference="EFTBankNameEnum" link="/apis/enums.html#eftbanknameenum" ></CustomPopover>      。 <br/>`lpmsType`为`Przelewy24`时请参阅    <CustomPopover title="Przelewy24BankNameEnum" width="auto" reference="Przelewy24BankNameEnum" link="/apis/enums.html#przelewy24banknameenum" ></CustomPopover>。 |
| iBan          | String | 64  | No  | No | 银行账户，部分地区转账时需要                                                                                                                                                                                                                                                                                                                                                                        |
| prepaidNumber | String | /   | No  | No | 预付费卡号，部分支付方式需要                                                                                                                                                                                                                                                                                                                                                                        |

</div>

#### MpiInfo

 <div class="custom-table bordered-table">

| 名称        | 类型     | 长度  | 必填  | 签名 | 描述                                      |
|-----------|--------|-----|-----|----|-----------------------------------------|
| eci       | String | 2   | Yes | No | 责任转移                                    |
| cavv      | String | 128 | Yes | No | 由发卡行创建                                  |
| xid       | String | 128 | No  | No | `3D-Secure` v1版本`Mpi`交易`id`（与`dsTransID`任选其一填写） |
| dsTransID | String | 128 | No  | No | `3D-Secure` v2版本Mpi交易`id`（与`xid`任选其一填写）       |

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

| 名称            | 类型     | 签名  | 描述                                                                                                                                              |
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
| sign          | String | No  | 签名字符串，请参阅  签名字符串，请参阅[Sign](./sign.html)                                                                                                                                              |

</div>

 


## 以下部分展示了收银台接口的请求响应示例：


https://sandbox-acq.onerway.com/v1/txn/doTransaction <Badge type="tip">POST</Badge>

::: code-group

```json [Request]

{
  "merchantNo": "800252",
  "merchantTxnId": "164604252511",
  "merchantTxnTime":"2022-02-28 15:30:30",
  "merchantTxnTimeZone":"+08:00",
  "productType":"CARD",   // [!code error]
  "subProductType":"DIRECT",
  "txnType": "SALE",	
  "orderAmount": "20",
  "orderCurrency": "USD",
  "shippingInformation":"{\"firstName\":\"da\",\"lastName\":\"xiong\",\"phone\":\"8522847000\",\"email\":\"shipping@example.com\",\"postalCode\":\"123456\",\"address\":\"HHHEEII\",\"country\":\"KR\",\"province\":\"BABA\",\"city\":\"BALALA\",\"street\":\"1010\",\"number\":\"20-1202\",\"identityNumber\":\"11112223333\",\"birthDate\":\"2020/12/28\"}",
  "billingInformation":"{\"firstName\":\"José\",\"lastName\":\"Silva\",\"phone\":\"8522847035\",\"email\":\"jose@example.com\",\"postalCode\":\"61919-230\",\"address\":\"Rua E\",\"country\":\"KR\",\"province\":\"CE\",\"city\":\"Maracanaú\",\"street\":\"1040\",\"identityNumber\":\"853.513.468-93\",\"birthDate\":\"2000/12/20\"}",
  "txnOrderMsg": "{\"returnUrl\":\"https://www.ronhan.com/\",\"products\":\"[{\\\"name\\\":\\\"iphone 11\\\",\\\"price\\\":\\\"5300.00\\\",\\\"num\\\":\\\"2\\\",\\\"currency\\\":\\\"USD\\\"}]\",\"appId\":1755154682941415424}",
  "sign":""   //  [!code highlight] //这里的sign字符串需要通过签名获得   
}

```

```json [Response]

{
    "respCode": "20000",
    "respMsg": "Success",
    "data": {
        "transactionId": "1759879333348245504",
        "merchantTxnId": "164604252511",
        "merchantNo": "800252",
        "responseTime": "",
        "txnTime": "",
        "orderAmount": "20.00",
        "orderCurrency": "USD",
        "txnAmount": "",
        "txnCurrency": null,
        "txnTimeZone": null,
        "status": "U",
        "reason": null,
        "redirectUrl": "https://sandbox-checkout.onerway.com/checkout?key=19d6513ee000463783532f576c10dbcb", // [!code ++]
        "sign": "64cf0651986e86e109e6e2804b74bdeecb94cd7cb310c15711f7138867b0cac7",
        "contractId": "",
        "tokenId": null,
        "eci": null,
        "transactionOrderNo": null,
        "periodValue": null,
        "lpmsType": null,
        "qrCode": null
    }
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