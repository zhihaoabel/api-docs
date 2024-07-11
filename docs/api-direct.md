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


<script>
  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };

  
</script>


# 两方支付
两方支付，也常被称为站内支付，通常指的是在同一个平台或应用内部完成的支付流程，不需要用户跳转到外部的第三方页面或应用进行支付。

<div class="alertbox2">

::: tip  对于商家来说，站内支付不仅可以提升整体用户体验。还可以通过站内支付收集用户支付行为数据，用于分析用户习惯、推荐商品，从而更好的服务消费者。两方支付商户必须提供PCI  DSS（支付卡行业数据安全标准）
:::

</div>

请求地址、请求方式、请求头 可以参考：

<br>

|   <div style="text-align: left;">名称</div>| 内容                                                          |
|----------------:|:---------------------------------------------------------------|
| Request URL :    | https://sandbox-acq.onerway.com/v1/txn/doTransaction  |
| Request Method : | <div style="color:var(--vp-c-brand-1);font-weight:500;"> POST  </div>                                                        |
| Content-Type :  | <div style="color:var(--vp-c-brand-1);font-weight:500;">application/json      </div>                                        |

<br>

<div class="alertbox3">

::: tip  Content-Type: application/json; charset=UTF-8 错误   <br>Content-Type: application/json 正确 
:::

</div>


## 两方支付

#### 请求参数


<div class="custom-table bordered-table">

| 名称                    | 类型     | 长度  | 必填  | 签名  | 描述                                                                                           |
|-----------------------|--------|-----|-----|-----|----------------------------------------------------------------------------------------------|
| merchantNo            | String | 20  | Yes | Yes | 商户号。 商户注册时，OnerWay会为商户创建商户号                                                                  |
| merchantTxnId         | String | 64  | Yes | Yes | 商户创建的商户交易订单号，<CMNote data="不同的订单号视为不同的交易"></CMNote>                                             |
| merchantTxnTime       | String | /   | No  | Yes | 商户交易订单发生的时间。 格式为  `yyyy\-MM\-dd HH:mm:ss` <br>  <CMExample data="2024-2-28 15:05:34"></CMExample>                                                      |
| merchantTxnTimeZone   | String | 64  | No  | Yes | 商户交易订单发生的时区。  <br>  <CMExample data="+08:00"></CMExample>                                                                          |
| merchantTxnOriginalId | String | 128 | No  | Yes | 商户原始订单号。标记商户网站上唯一订单号，可重复，同一笔订单只能支付成功一次                                                       |
| productType           | String | 16  | Yes | Yes | 产品类型，请参阅        <CustomPopover title="ProductTypeEnum" width="auto" reference="ProductTypeEnum" link="/apis/enums.html#producttypeenum" ></CustomPopover>                                                                |
| subProductType        | String | 16  | Yes | Yes | 子产品类型，请参阅       <CustomPopover title="SubProductTypeEnum" width="auto" reference="SubProductTypeEnum" link="/apis/enums.html#subproducttypeenum" ></CustomPopover>                                                              |
| txnType               | String | 16  | Yes | Yes | 交易类型，请参阅             <CustomPopover title="TxnTypeEnum" width="auto" reference="TxnTypeEnum" link="/apis/enums.html#txntypeenum" ></CustomPopover>                                                             |
| paymentMode           | String | 16  | No  | Yes | 支付模式。 请参阅 PaymentModeEnum  <CustomPopover title="PaymentModeEnum" width="auto" reference="PaymentModeEnum" link="/apis/enums.html#paymentmodeenum" ></CustomPopover>。默认为`WEB`                                                             |
| osType                | String | 16  | No  | Yes | 操作系统类型。 请参阅 OsTypeEnum <CustomPopover title="OsTypeEnum" width="auto" reference="OsTypeEnum" link="/apis/enums.html#ostypeenum" ></CustomPopover>。`paymentMode`不是`WEB`时必填                                                   |
| orderAmount           | String | 19  | Yes | Yes | 交易订单金额                                                                                       |
| orderCurrency         | String | 8   | Yes | Yes | 交易订单的货币。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes)货币代码                                                          |
| originTransactionId   | String | 20  | No  | Yes | 来源于Onerway的原始交易订单号，常用于退款等反向交易时通过此ID查找对应的交易订单号                                                |
| risk3dsStrategy       | String | 16  | No  | Yes | `3ds`风险控制策略。 请参阅         <CustomPopover title="Risk3dsStrategyEnum" width="auto" reference="Risk3dsStrategyEnum" link="/apis/enums.html#risk3dsstrategyenum" ></CustomPopover>                                                      |
| subscription          | String | /   | No  | Yes | 订阅付款所需的订阅信息。 格式为 `json`字符串。 请参阅对象  <CustomPopover title="Subscription" width="auto" reference="Subscription" link="/apis/api-direct-sub.html#subscription" ></CustomPopover>                                                 |
| mpiInfo               | String | /   | No  | Yes | `mpi`信息，`3ds`验证结果集，`risk3dsStrategy`为`EXTERNAL`时需要。 格式为 `json` 字符串。 请参阅对象     <CustomPopover title="MpiInfo" width="auto" reference="MpiInfo" link="/apis/api-direct.html#mpiinfo" ></CustomPopover>                    |
| txnOrderMsg           | String | /   | No  | Yes | 交易业务信息，除订阅复购外必填。 格式为 `json` 字符串。 请参阅对象 TxnOrderMsg         <CustomPopover title="TxnOrderMsg" width="auto" reference="TxnOrderMsg" link="/apis/api-direct.html#txnordermsg" ></CustomPopover>                                       |
| cardInfo              | String | /   | No  | Yes | 交易卡信息，`productType`为`CARD`时，除`订阅复购`、`Token支付`、`Google Pay`、`Apple Pay`外必填。 格式为 `json` 字符串。 请参考对象     <CustomPopover title="cardInfo" width="auto" reference="cardInfo" link="/apis/api-direct.html#txncardinfo" ></CustomPopover>  |
| billingInformation    | String | /   | No  | Yes | 交易账单信息。 格式为 `json` 字符串。 请参阅对象    <CustomPopover title="TransactionAddress" width="auto" reference="TransactionAddress" link="/apis/api-direct.html#transactionaddress" ></CustomPopover>                                      |
| shippingInformation   | String | /   | No  | Yes | 交易邮寄信息。 格式为 `json` 字符串。 请参阅对象    <CustomPopover title="TransactionAddress" width="auto" reference="TransactionAddress" link="/apis/api-direct.html#transactionaddress" ></CustomPopover>                                         |
| lpmsInfo              | String | /   | No  | Yes | 本地支付方式信息，`productType`为`LPMS`时，除协议代扣外必填，格式为`json`字符串。 请参阅对象     <CustomPopover title="LpmsInfo" width="auto" reference="LpmsInfo" link="/apis/api-direct-lpms.html#lpmsinfo" ></CustomPopover>                               |
| tokenInfo             | String | /   | No  | Yes | token信息，`subProductType`为`TOKEN`或`AUTO_DEBIT`时必填，格式为`json`字符串。 请参阅对象        <CustomPopover title="tokenInfo" width="auto" reference="tokenInfo" link="/apis/api-direct-token.html#tokeninfo" ></CustomPopover>                   |
| sign                  | String | /   | Yes | No  | 签名字符串，请参阅  签名字符串，请参阅[Sign](./sign.html)                                                                                           |
                    
</div>

#### TxnOrderMsg




<div class="custom-table bordered-table">

| 名称             | 类型      | 长度   | 必填  | 签名 | 描述                                                                                                                                                                                                                               |
|----------------|---------|------|-----|----|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| returnUrl      | String  | 256  | Yes | No | 商户的回跳地址                                                                                                                                                                                                                          |
| products       | String  | 1024 | Yes | No | 产品信息列表|
| transactionIp  | String  | 64   | Yes | No | 持卡人交易IP                                                                                                                                                                                                                          |
| appId          | String  | 20   | Yes | No | 商户应用程序 `ID`。 商户注册网站时，`OnerWay`会为商户创建一个应用id                                                                                                                                                                                           |
| javaEnabled    | Boolean | /    | Yes | No | 持卡人浏览器是否开启java                                                                                                                                                                                                                   |
| colorDepth     | String  | 64   | Yes | No | 持卡人屏幕色深                                                                                                                                                                                                                          |
| screenHeight   | String  | 64   | Yes | No | 持卡人的屏幕分辨率                                                                                                                                                                                                                        |
| screenWidth    | String  | 64   | Yes | No | 持卡人的屏幕分辨率                                                                                                                                                                                                                        |
| timeZoneOffset | String  | 64   | Yes | No | 持卡人浏览器的时区                                                                                                                                                                                                                        |
| accept         | String  | 2048 | Yes | No | 持卡人浏览器的 `Accept` 请求头                                                                                                                                                                                                               |
| userAgent      | String  | 2048 | Yes | No | 持卡人的浏览器类型                                                                                                                                                                                                                        |
| contentLength  | String  | 64   | Yes | No | 持卡人浏览器内容长度头部以外的内容长度                                                                                                                                                                                                              |
| language       | String  | 64   | Yes | No | 持卡人浏览器的语言                                                                                                                                                                                                                        |
| periodValue    | String  | /    | No  | No | 分期付款期数。对应咨询分期期数接口返回的期数值。当 `subProductType` 为 `INSTALLMENT` 时必填。                                                                                                                                                                      |
| terminalId     | String  | 64   | No  | No | 商户分配的唯一标识，用于标识商店终端。当 `productType` 为 `PAYMENT_CODE` 时必填。                                                                                                                                                                             |
| notifyUrl      | String  | 256  | No  | No | 通知地址。详见通知                                                                                                                                                                                                                        |                                                                                                                                                                       

</div>


<div class="alertbox3">

::: tip products 必须为`JSON`字符串格式 其中`type`字段的枚举如下：<br>`discount`：折扣类型 <br> `shipping_fee`：运费类型 <br>  不传`type` 字段 视为商品本身 
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



####  TxnCardInfo 





<div class="custom-table bordered-table">

| 名称         | 类型     | 长度  | 必填  | 签名 | 描述            |
|------------|--------|-----|-----|----|---------------|
| holderName | String | 48  | Yes | No | 持卡人姓名         |
| cardNumber | String | 128 | Yes | No | 持卡人的卡号        |
| month      | String | 64  | Yes | No | 卡号月份 <br>  <CMExample data="03"></CMExample>   |
| year       | String | 64  | Yes | No | 卡号年份，<br>  <CMExample data="2024"></CMExample> |
| cvv        | String | 64  | Yes | No | 卡号cvv         |

</div>

#### TransactionAddress


<div class="custom-table bordered-table">

| 名称             | 类型     | 长度  | 必填  | 签名 | 描述                                                                  |
|----------------|--------|-----|-----|----|---------------------------------------------------------------------|
| firstName      | String | 64  | Yes | No | 名 (虚拟商品可不传)                                                         |
| lastName       | String | 64  | Yes | No | 姓 (虚拟商品可不传)                                                         |
| jpFirstName    | String | 64  | No  | no | （日文片假名）名                                                            |
| jpLastName     | String | 64  | No  | no | （日文片假名）姓                                                            |
| phone          | String | 32  | Yes | No | 电话号码   (虚拟商品的可不传)                                                   |
| email          | String | 256 | Yes | No | 电子邮件                                                                |
| postalCode     | String | 32  | Yes | No | 邮政编码  (虚拟商品可不传)                                                     |
| address        | String | 256 | Yes | No | 地址    (虚拟商品可不传)                                                     |
| country        | String | 64  | Yes | No | 国家。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes)。 <br>   <CMExample data="美国 is US  (虚拟商品可不传)"></CMExample>                             |
| province       | String | 64  | Yes  | No | 州。 当国家是美国 \(US\) 或加拿大 \(CA\) 时必填。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes)。 <br>  <CMExample data="美属萨摩亚 is AS  (虚拟商品可不传)"></CMExample>  |
| street         | String | 64  | No  | No | 街道                                                                  |
| number         | String | 64  | No  | No | 门牌号                                                                 |
| identityNumber | String | 64  | No  | No | 证件号码                                                                |
| birthDate      | String | 64  | No  | No  | 出生日期，格式为 `yyyy/MM/dd`                                       |

</div>


#### Subscription

<div class="custom-table bordered-table">

| 名称             | 类型     | 长度 | 必填  | 签名 | 描述                                  |
|----------------|--------|----|-----|----|-------------------------------------|
| requestType    | String | 1  | Yes | No | 订阅请求类型。 枚举如下：  `0 - 首购 `, 收银台仅支持首次购买。   |
| merchantCustId | String | 50 | No  | No | 商户客户 `id `， `requestType `为 `0 `时必填。            |
| expireDate     | String | 10 | No  | No | 过期日期， `requestType `为 `0 `时必填，格式为 `yyyy-MM-dd ` |
| frequencyType  | String | 1  | No  | No | 订阅频率类型， `requestType `为 `0 `时必填。枚举如下： `D - 天  ` |
| frequencyPoint | String | 2  | No  | No | 订阅频率点数， `requestType `为 `0 `时必填。            |


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
| respCode | String | No | 来自 Onerway 的响应码     |
| respMsg  | String | No | 来自 Onerway 的响应信息    |
| data     | Map    | No | 响应数据。 请参阅对象   <CustomPopover title="TxnInfo" width="auto" reference="TxnInfo" link="/apis/api-direct.html#txninfo" ></CustomPopover>      |

</div>

####  TxnInfo

<div class="custom-table bordered-table">

| 名称            | 类型     | 签名  | 描述                                          |
|---------------|--------|-----|---------------------------------------------|
| transactionId | String | Yes | Onerway创建的交易订单号，对应商户订单号                     |
| responseTime  | String | Yes | 接口响应时间，格式为`yyyy-MM-dd HH:mm:ss`               |
| txnTime       | String | Yes | 交易完成时间，格式为`yyyy-MM-dd HH:mm:ss`               |
| txnTimeZone   | String | Yes | 交易完成时区，例如：+08:00                            |
| orderAmount   | String | Yes | 交易订单金额                                      |
| orderCurrency | String | Yes | 交易订单币种。 请参阅  [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes)。 货币代码       |
| txnAmount     | String | Yes | 订单金额转换成结算币种后的金额                             |
| txnCurrency   | String | Yes | 结算币种。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes)。 货币代码                     |
| status        | String | Yes | 交易处理结果。 请参阅     <CustomPopover title="TxnStatusEnum" width="auto" reference="TxnStatusEnum" link="/apis/enums.html#txnstatusenum" ></CustomPopover>                  |
| redirectUrl   | String | Yes | 当交易状态为`R`时，商户需要重定向到该URL完成部分交易，包括`3ds`验证、本地支付收银等 |
| periodValue   | String | No  | 分期付款期数                                      |
| contractId    | String | Yes | 订阅合同id，首购时返回                                |
| tokenId       | String | Yes | 订阅令牌id ，首购时返回                               |
| eci           | String | Yes | 责任转移                                        |
| codeForm      | Map    | No  | 码的信息。请参阅对象 CodeForm                         |
| sign          | String | No  | 签名字符串，请参阅  签名字符串，请参阅[Sign](./sign.html)                                          |


</div>


## 以下部分展示了两方支付的请求示例：

https://sandbox-acq.onerway.com/v1/txn/doTransaction<Badge type="tip">POST</Badge>


::: code-group

```json [请求参数]
{
  "merchantNo": "800037",
  "merchantTxnId": "1640229747000",
  "merchantTxnTime": "2021-12-22 15:30:30",
  "merchantTxnTimeZone": "+08:00",
  "productType": "CARD",    // [!code error]
  "subProductType": "DIRECT",
  "txnType": "SALE",
  "orderAmount": "20",
  "orderCurrency": "USD",
  "txnOrderMsg": "{\"returnUrl\":\"https://www.ronhan.com/\",\"products\":\"[{\\\"price\\\":\\\"110.00\\\",\\\"num\\\":\\\"1\\\",\\\"name\\\":\\\"iphone11\\\",\\\"currency\\\":\\\"USD\\\"}]\",\"transactionIp\":\"127.0.0.1\",\"appId\":1458672763818790912,\"javaEnabled\":false,\"colorDepth\":\"24\",\"screenHeight\":\"1080\",\"screenWidth\":\"1920\",\"timeZoneOffset\":\"-480\",\"accept\":\"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36\",\"contentLength\":\"340\",\"language\":\"zh-CN\"}",
  "cardInfo": "{\"cardNumber\":\"4000027891380961\",\"cvv\":\"789\",\"month\":\"12\",\"year\":\"2022\",\"holderName\":\"test sandbox\"}",
  "shippingInformation": "{\"firstName\":\"ShippingFirstName\",\"lastName\":\"ShippingLastName\",\"phone\":\"188888888888\",\"email\":\"shipping@test.com\",\"postalCode\":\"888888\",\"address\":\"ShippingAddress\",\"country\":\"CN\",\"province\":\"SH\",\"city\":\"SH\",\"street\":\"lujiazui\",\"number\":\"1\",\"identityNumber\":\"110000\"}",
  "billingInformation": "{\"firstName\":\"billingFirstName\",\"lastName\":\"billingLastName\",\"phone\":\"18600000000\",\"email\":\"billing@test.com\",\"postalCode\":\"430000\",\"address\":\"BillingAddress\",\"country\":\"CN\",\"province\":\"HK\",\"city\":\"HK\",\"street\":\"jianshazui\",\"number\":\"2\",\"identityNumber\":\"220000\"}",
  "sign": "..."  //这里的sign字符串需要通过签名获得    // [!code error]
}

```

```json [响应参数]
{
  "respCode": "20000",
  "respMsg": "Success",
  "data": {
    "transactionId": "1473856517125345280",
    "responseTime": "2021-12-23 11:22:31",
    "txnTime": "2021-12-23 11:22:31",
    "txnTimeZone": "+08:00",
    "orderAmount": "20.00",
    "orderCurrency": "USD",
    "txnAmount": "20.00",
    "txnCurrency": "USD",
    "status": "S",
    "redirectUrl": null,
    "periodValue": null,
    "contractId": null,
    "tokenId": null,
    "eci": null,
    "sign": "..."
  }
}

```

<div class="alertbox4">

::: tip 此示例仅限参考 请勿拿此示例直接请求。
:::

</div>


