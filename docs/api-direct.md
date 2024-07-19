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
import {TransactionAddress, LpmsInfo, ProductTypeEnum, SubProductTypeEnum, TxnTypeEnum as TxnTypeEnumTable, PaymentModeEnum, OsTypeEnum, Risk3dsStrategyEnum, Subscription, MpiInfo, TxnOrderMsg, TxnCardInfoDirect, TokenProviderEnum, StoreProductTypeEnum} from "./util/constants";


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
|----------------|---------------------------------------------------------------|
| Request URL :   | https://sandbox-acq.onerway.com/v1/txn/doTransaction  |
| Request Method : | <div style="color:var(--vp-c-brand-1);font-weight:500;"> POST  </div>                                                       |
| Content-Type : | <div style="color:var(--vp-c-brand-1);font-weight:500;">application/json      </div>                                       |

<br>

<div class="alertbox3">

::: tip  Content-Type: application/json; charset=UTF-8 错误   <br>Content-Type: application/json 正确 
:::

</div>


## 两方支付

#### 请求参数


<div class="custom-table bordered-table">

| 名称                    | 类型     | 长度  | 必填  | 签名  | 描述                                                                                                                                                                                                                                                                                                             |
|-----------------------|--------|-----|-----|-----|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchantNo            | String | 20  | Yes | Yes | 商户号。由Onerway分配，在Onerway后台获取。                                                                                                                                                                                                                                                                                   |
| merchantTxnId         | String | 64  | Yes | Yes | 顾客每次付款的订单号，必须保证单号唯一。                                                                                                                                                                                                                                                                                           |
| merchantTxnTime       | String | /   | No  | Yes | 商户交易订单发生的时间。 格式为  `yyyy\-MM\-dd HH:mm:ss` <br>  <CMExample data="2024-2-28 15:05:34"></CMExample>                                                                                                                                                                                                              |
| merchantTxnTimeZone   | String | 64  | No  | Yes | 商户交易订单发生的时区。  <br>  <CMExample data="+08:00"></CMExample>                                                                                                                                                                                                                                                      |
| merchantTxnOriginalId | String | 128 | No  | Yes | 商家生成的主订单号，单号可以重复，但重复的单号只有一笔可以成功。                                                                                                                                                                                                                                                                               |
| productType           | String | 16  | Yes | Yes | 产品类型，请参阅 <br/><CustomPopover title="ProductTypeEnum" width="auto" reference="ProductTypeEnum" link="/apis/enums.html#producttypeenum"><CustomTable :data="ProductTypeEnum.data" :columns="ProductTypeEnum.columns"></CustomTable></CustomPopover>                                                              |
| subProductType        | String | 16  | Yes | Yes | 子产品类型，请参阅 <br/><CustomPopover title="SubProductType" width="auto" reference="SubProductTypeEnum" link="/apis/enums.html#subproducttypeenum"><CustomTable :data="SubProductTypeEnum.data" :columns="SubProductTypeEnum.columns"></CustomTable></CustomPopover>                                                  |
| txnType               | String | 16  | Yes | Yes | 交易类型， <br/> <CustomPopover title="TxnTypeEnum" width="auto" reference="TxnTypeEnum" link="/apis/enums.html#txntypeenum" > <CustomTable :data="TxnTypeEnumTable.data" :columns="TxnTypeEnumTable.columns"></CustomTable> </CustomPopover>                                                                       |
| paymentMode           | String | 16  | No  | Yes | 支付模式。 请参阅  <br/> <CustomPopover title="PaymentModeEnum" width="auto" reference="PaymentModeEnum" link="/apis/enums.html#paymentmodeenum" > <CustomTable :data="PaymentModeEnum.data" :columns="PaymentModeEnum.columns"></CustomTable> </CustomPopover>。默认为`WEB`                                               |
| osType                | String | 16  | No  | Yes | 操作系统类型。 请参阅 <br/> <CustomPopover title="OsTypeEnum" width="auto" reference="OsTypeEnum" link="/apis/enums.html#ostypeenum" > <CustomTable :data="OsTypeEnum.data" :columns="OsTypeEnum.columns"></CustomTable> </CustomPopover>。`paymentMode`不是`WEB`时必填                                                        |
| orderAmount           | String | 19  | Yes | Yes | 订单金额，以“元”为单位，如有小数，保留两位小数。                                                                                                                                                                                                                                                                                      |
| orderCurrency         | String | 8   | Yes | Yes | 交易订单的货币。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes)货币代码                                                                                                                                                                                                            |
| originTransactionId   | String | 20  | No  | Yes | 来源于Onerway的原始交易订单号，常用于退款等反向交易时通过此ID查找对应的交易订单号                                                                                                                                                                                                                                                                  |
| risk3dsStrategy       | String | 16  | No  | Yes | `3ds`风险控制策略。 请参阅 <br/> <CustomPopover title="Risk3dsStrategyEnum" width="auto" reference="Risk3dsStrategyEnum" link="/apis/enums.html#risk3dsstrategyenum" > <CustomTable :data="Risk3dsStrategyEnum.data" :columns="Risk3dsStrategyEnum.columns"></CustomTable> </CustomPopover>                              |
| subscription          | String | /   | No  | Yes | 订阅付款所需的订阅信息。 格式为 `json`字符串。 请参阅对象 <br/> <CustomPopover title="Subscription" width="auto" reference="Subscription" link="/apis/api-direct#subscription" > <CustomTable :data="Subscription.data" :columns="Subscription.columns"></CustomTable> </CustomPopover>                                                |
| mpiInfo               | String | /   | No  | Yes | mpi信息，3ds验证结果集，`risk3dsStrategy`为`EXTERNAL`时需要。 格式为 `json` 字符串。 请参阅对象   <CustomPopover title="MpiInfo" width="auto" reference="MpiInfo" link="/apis/api-direct#mpiinfo" > <CustomTable :data="MpiInfo.data" :columns="MpiInfo.columns"></CustomTable> </CustomPopover>                                         |
| txnOrderMsg           | String | /   | YES | Yes | 交易业务信息，除订阅复购外必填。 格式为 `json` 字符串。 请参阅对象     <CustomPopover title="TxnOrderMsg" width="auto" reference="TxnOrderMsg" link="/apis/api-direct#txnordermsg" >   <CustomTable :data="TxnOrderMsg.data" :columns="TxnOrderMsg.columns"></CustomTable>   </CustomPopover>                                              |
| cardInfo              | String | /   | No  | Yes | 交易卡信息。 格式为 `json` 字符串。 请参阅对象           <CustomPopover title="CardInfo" width="auto" reference="CardInfo" link="/apis/apis/api-casher#txncardinfodirect" > <CustomTable :data="TxnCardInfoDirect.data" :columns="TxnCardInfoDirect.columns"></CustomTable>  </CustomPopover>                                    |
| billingInformation    | String | /   | Yes | Yes | 账单信息格式为 json 字符串。 请参阅对象  <CustomPopover title="TransactionAddress" width="auto" reference="TransactionAddress" link="/apis/api-direct#transactionaddress" >  <CustomTable :data="TransactionAddress.data" :columns="TransactionAddress.columns"></CustomTable> </CustomPopover>                                |
| shippingInformation   | String | /   | Yes | Yes | 账单信息格式为 json 字符串。 请参阅对象  <CustomPopover title="TransactionAddress" width="auto" reference="TransactionAddress" link="/apis/api-direct#transactionaddress" >  <CustomTable :data="TransactionAddress.data" :columns="TransactionAddress.columns"></CustomTable>   </CustomPopover>                              |
| lpmsInfo              | String | /   | No  | Yes | 用来指定使用哪个本地支付方式。格式为json字符串。 请参阅对象  <CustomPopover title="LpmsInfo" width="auto" reference="LpmsInfo" link="/apis/api-cashier.html#lpmsinfo" ><CustomTable :data="LpmsInfo.data" :columns="LpmsInfo.columns"></CustomTable>  </CustomPopover>                                                                    |
| tokenInfo             | String | /   | No  | Yes | token信息，`subProductType`为`TOKEN`或`AUTO_DEBIT`时必填，格式为`json`字符串。 请参阅对象 <CustomPopover title="TokenProviderEnum" width="auto" reference="TokenProviderEnum" link="/apis/enums.html#tokenproviderenum"><CustomTable :data="TokenProviderEnum.data" :columns="TokenProviderEnum.columns"></CustomTable></CustomPopover> |
| sign                  | String | /   | Yes | No | 签名字符串，请参阅  签名字符串，请参阅[Sign](./sign.html)                                                                                                                                                                                                                                                                        |
                    
</div>

#### TxnOrderMsg
<!--@include: ./parts/txn-order-msg.md-->



####  TxnCardInfo 

<div class="custom-table bordered-table">

| 名称         | 类型     | 长度  | 必填  | 描述            |
|------------|--------|-----|-----|---------------|
| holderName | String | 48  | Yes | 持卡人姓名         |
| cardNumber | String | 128 | Yes | 持卡人的卡号        |
| month      | String | 64  | Yes | 卡号月份 <br>  <CMExample data="03"></CMExample>   |
| year       | String | 64  | Yes | 卡号年份，<br>  <CMExample data="2024"></CMExample> |
| cvv        | String | 64  | Yes | 卡号cvv         |

</div>

#### TransactionAddress


<div class="custom-table bordered-table">

| 名称             | 类型     | 长度  | 必填  | 描述                                                                  |
|----------------|--------|-----|-----|---------------------------------------------------------------------|
| firstName      | String | 64  | Yes | 名 (虚拟商品可不传)                                                         |
| lastName       | String | 64  | Yes | 姓 (虚拟商品可不传)                                                         |
| jpFirstName    | String | 64  | No  | （日文片假名）名                                                            |
| jpLastName     | String | 64  | No  | （日文片假名）姓                                                            |
| phone          | String | 32  | Yes | 电话号码   (虚拟商品的可不传)                                                   |
| email          | String | 256 | Yes | 电子邮件                                                                |
| postalCode     | String | 32  | Yes | 邮政编码  (虚拟商品可不传)                                                     |
| address        | String | 256 | Yes | 地址    (虚拟商品可不传)                                                     |
| country        | String | 64  | Yes | 国家。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes)。 <br>   <CMExample data="美国 is US  (虚拟商品可不传)"></CMExample>                             |
| province       | String | 64  | Yes | 州。 当国家是美国 \(US\) 或加拿大 \(CA\) 时必填。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes)。 <br>  <CMExample data="美属萨摩亚 is AS  (虚拟商品可不传)"></CMExample>  |
| street         | String | 64  | No  | 街道                                                                  |
| number         | String | 64  | No  | 门牌号                                                                 |
| identityNumber | String | 64  | No  | 证件号码                                                                |
| birthDate      | String | 64  | No  | 出生日期，格式为 `yyyy/MM/dd`                                       |

</div>


#### Subscription

<!--@include: ./parts/subscription.md-->


 #### MpiInfo

<!--@include: ./parts/mpi-info.md-->

#### TokenInfo

 <div class="custom-table bordered-table">

| 名称       | 类型     | 长度  | 必填  | 描述                                                                                                                                                                                                                                                                         |
|----------|--------|-----|-----|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| tokenId  | String | / | No  | 绑定支付方式后获得的令牌id。Google Pay和Apple Pay场景下，需将提供的token内容转成json格式字符串                                                                                                                                                                                                             |
| provider | String | / | No  | token供应商，值为空时默认为Onerway，一般用于token支付场景；其他场景，请参阅<CustomPopover title="TokenProviderEnum" width="auto" reference="TokenProviderEnum" link="/apisenums.html#tokenproviderenum" > <CustomTable :data="TokenProviderEnum.data" :columns="TokenProviderEnum.columns"></CustomTable> </CustomPopover> |

</div>

#### 响应参数 


<div class="custom-table bordered-table">

| 名称       | 类型     | 必填 | 描述                  |
|----------|--------|----|---------------------|
| respCode | String | Yes | 来自 Onerway 的响应码     |
| respMsg  | String | Yes | 来自 Onerway 的响应信息    |
| data     | Map    | Yes | 响应数据。 请参阅对象   <CustomPopover title="TxnInfo" width="auto" reference="TxnInfo" link="/apis/api-direct.html#txninfo" ></CustomPopover>      |

</div>

####  TxnInfo

<div class="custom-table bordered-table">

| 名称            | 类型     | 必填  | 描述                                          |
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


