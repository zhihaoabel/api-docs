---
outline: deep
---

<script lang="ts" setup>
import {reactive, ref, watch, onMounted} from 'vue'; 
import {requestGen, secret} from "./util/utils"; 
import CMExample from './components/CMExample.vue';
import CMNote from './components/CMNote.vue';
import CustomPopover from './components/element-ui/CustomPopover.vue'; 
import CustomTable from "./components/element-ui/CustomTable.vue";

const dialogVisible = ref(false);
const datetime = new Date().toLocaleString('zh', { hour12: false }).replace(/\//g, '-').replace(/上午|下午/g, '');
let merchantCustId = localStorage.getItem('merchantCustId') || 'Cust_' + Date.parse(new Date());
const merchantTxnId = localStorage.getItem('merchantTxnId') || Date.parse(new Date());

/*表格属性*/
const formLabelWidth = '140px';
const draggable = ref(true);
let reactives = reactive({
    sign: ''
});

const form = reactive({
   merchantNo: localStorage.getItem('merchantNo') || '',
   appId: localStorage.getItem('appId') || '',
   secret: localStorage.getItem('secret') || '',
   notifyUrl: localStorage.getItem('notifyUrl') || '',
});

const ProductTypeEnumTable = {
   columns: [
      {
         prop: 'code',
         label: '代码',
      },
      {
         prop: 'desc',
         label: '描述',
      },
   ],
   data: [
      {
         code: 'ALL',
         desc: '只能在收银支付场景下使用，表示要打开聚合收银台',
      },
      {
         code: 'CARD',
         desc: '信用卡',
      },
      {
         code: 'LPMS',
         desc: '本地支付方式',
      },
      {
         code: 'PAYMENT_CODE',
         desc: '支付码（商家扫用户的支付码）',
      },
      {
         code: 'ORDER_CODE',
         desc: '订单码（用户扫商家的订单码）',
      },
]};
const SubProductTypeEnumTable = {
   columns: [
      {
         prop: 'code',
         label: '代码',
      },
      {
         prop: 'desc',
         label: '描述',
      },
   ],
   data: [
      {
         code: 'DIRECT',
         desc: '直接支付',
      },
      {
         code: 'SUBSCRIBE',
         desc: '订阅支付',
      },
      {
         code: 'INSTALLMENT',
         desc: '分期支付',
      },
      {
         code: 'TOKEN',
         desc: 'token支付',
      },
      {
         code: 'AUTO_DEBIT',
         desc: '代扣',
      },
   ],
};
const TxnTypeEnumTable = {
    columns: [
        {
            prop: 'code',
            label: '代码',
        },
        {
            prop: 'desc',
            label: '描述',
        },
    ],
    data: [
        {
            code: 'SALE',
            desc: '支付',
        },
        {
            code: 'REFUND',
            desc: '退款',
        },
        {
            code: 'BIND_CARD',
            desc: '绑定支付方式',
        },
        {
            code: 'AUTH',
            desc: '预授权',
        },
        {
            code: 'PRE_AUTH',
            desc: '预授权',
        },
        {
            code: 'CAPTURE',
            desc: '预授权请款',
        },
        {
            code: 'VOID',
            desc: '预授权撤销',
        },
    ],
    
};
const PaymentModeEnumTable = {
    columns: [
        {
            prop: 'code',
            label: '代码',
        },
        {
            prop: 'desc',
            label: '描述',
        },
    ],
    data: [
        {
            code: 'WEB',
            desc: 'WEB支付',
        },
        {
            code: 'WAP',
            desc: 'WAP支付',
        },
        {
            code: 'MINI_PROGRAM',
            desc: '小程序支付',
        },
        {
            code: 'IN_APP',
            desc: 'APP支付',
        },
        {
            code: 'OFFICIAL_ACCOUNT',
            desc: '公众号支付',
        },
    ],
};
const OsTypeEnumTable = {
    columns: [
        {
            prop: 'code',
            label: '代码',
        },
        {
            prop: 'desc',
            label: '描述',
        },
    ],
    data: [
        {
            code: 'IOS',
            desc: 'IOS',
        },
        {
            code: 'ANDROID',
            desc: '安卓',
        },
    ],
};
const Risk3dsStrategyEnumTable = {
    columns: [
        {
            prop: 'code',
            label: '代码',
        },
        {
            prop: 'desc',
            label: '描述',
        },
    ],
    data: [
        {
            code: 'INNER',
            desc: '内部 3ds（强制使用 Onerway 提供的 3ds）',
        },
        {
            code: 'EXTERNAL',
            desc: '外置3ds（强制使用商家自己的3ds）',
        },
        {
            code: 'NONE',
            desc: '强制不使用 3ds',
        },
        {
            code: 'DEFAULT',
            desc: '默认（取决于Onerway判断是否需要走3ds）',
        },
    ],
};
const Subscription ={
    columns: [
         {
            prop: 'name',
            label: '名称',
            width: 130
         },
         {
            prop: 'type',
            label: '类型',
         },
         {
             prop: 'length',
             label: '长度',
         },
         {
             prop: 'required',
             label: '必填',
         },
         {
             prop: 'sign',
             label: '签名',
         },
         {
             prop: 'desc',
             label: '描述',
             width: 250
         },
    ],
    data: [
        {
            name: 'requestType',
            type: 'String',
            length: '1',
            required: 'Yes',
            sign: 'No',
            desc: '订阅请求类型。 枚举如下：0 - 首购 1 - 复购',
        },
        {
            name: 'merchantCustId',
            type: 'String',
            length: '50',
            required: 'No',
            sign: 'No',
            desc: '商户客户id，requestType为0时必填。',
        },
        {
            name: 'expireDate',
            type: 'String',
            length: '10',
            required: 'No',
            sign: 'No',
            desc: '过期日期，requestType为0时必填，格式为yyyy-MM-dd',
        },
        {
            name: 'frequencyType',
            type: 'String',
            length: '1',
            required: 'No',
            sign: 'No',
            desc: '订阅频率类型，requestType为0时必填。枚举如下：D - 天',
        },
        {
            name: 'frequencyPoint',
            type: 'String',
            length: '2',
            required: 'No',
            sign: 'No',
            desc: '订阅频率点数，requestType为0时必填。',
        },
        {
            name: 'contractId',
            type: 'String',
            length: '20',
            required: 'No',
            sign: 'No',
            desc: '订阅合同id，requestType为1时必填。',
        },
        {
            name: 'tokenId',
            type: 'String',
            length: '300',
            required: 'No',
            sign: 'No',
            desc: '订阅令牌id，requestType为1时必填。',
        },
    ],
};


const requestBody = {
   billingInformation: "{\"country\":\"US\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"17712345678\",\"address\":\"Apt. 870\",\"city\":\"Hayward\",\"postalCode\":\"66977\",\"identityNumber\":\"1234567890\"}",
   merchantCustId: merchantCustId,
   merchantNo: form.merchantNo,
   merchantTxnId: merchantTxnId,
   merchantTxnTime: datetime,
   merchantTxnTimeZone: "+08:00",
   orderAmount: "10",
   orderCurrency: "USD",
   productType: "CARD",
   shippingInformation: "{\"country\":\"US\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"17712345678\",\"address\":\"Apt. 870\",\"city\":\"Hayward\",\"postalCode\":\"66977\",\"identityNumber\":\"1234567890\"}",
   sign: "",
   subProductType: "DIRECT",
   txnOrderMsg: {
     appId: form.appId,
     returnUrl: "https://www.ronhan.com",
     products: "[{\"price\":\"10.00\",\"num\":\"1\",\"name\":\"iphone11\",\"currency\":\"USD\"}]",
     notifyUrl: form.notifyUrl,
     transactionIp: "127.0.0.1",
   },
   txnType: "SALE"
};

onMounted( async () => {
   const request = await requestGen(requestBody);
   reactives.sign = request.sign;
});

watch(() => form.merchantNo, (val) => {
   requestBody.merchantNo = val;
   localStorage.setItem('merchantNo', val);
});

watch(() => form.appId, (val) => {
   requestBody.txnOrderMsg.appId = val;
   localStorage.setItem('appId', val);
});

watch(() => form.secret, (val) => {
   localStorage.setItem('secret', val);
});

watch(() => form.notifyUrl, (val) => {
   requestBody.txnOrderMsg.notifyUrl = val;
   localStorage.setItem('notifyUrl', val);
});

function updateRequest() {
   dialogVisible.value = false;
   location.reload();
}

</script>

# JS SDK

## 接入流程

1. 下载[JS SDK](https://v3-doc.pacypay.com/javascripts/pacypay-v1.0.5.zip)
2. 引入JS SDK
3. 初始化SDK
4. 调用下单接口
5. 从下单接口响应中获取transactionId，拉起JS SDK收银台

### 引入JS SDK

1. 引入方式一

   在需要调用JS SDK的页面中引入[JS SDK](https://v3-doc.pacypay.com/javascripts/pacypay-v1.0.5.zip)

 ```html

<script src="pacypay.js"></script>
 ```

2. 引入方式二

   以 import / require 的方式导入

 ```javascript
// 以import方式导入
import Pacypay from './pacypay.js'

// 以require方式导入
const Pacypay = require('./pacypay.js')
 ```

### 初始化SDK

在所需页面中新增一个id为 `pacypay_checkout`的div元素块，作为收银台嵌入的容器

```html
<div id='pacypay_checkout'></div>
```

### 调用下单接口 <Badge text="POST" type="tip"></Badge>

`/v1/sdkTxn/doTransaction`

#### 请求参数

<div class="custom-table bordered-table">

| 名称                    | 类型     | 长度  | 必填  | 签名  | 描述                                                                                                                                                                                                                                                          |
|-----------------------|--------|-----|-----|-----|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchantNo            | String | 20  | Yes | Yes | 商户号。 商户注册时，OnerWay会为商户创建商户号                                                                                                                                                                                                                                 |
| merchantTxnId         | String | 64  | Yes | Yes | 商户创建的商户交易订单号，**不同的订单号视为不同的交易**                                                                                                                                                                                                                              |
| merchantTxnTime       | String | /   | No  | Yes | 商户交易订单发生的时间 格式为 <br/> `yyyy-MM-dd HH:mm:ss`<br/><CMExample data="2024-2-28 15:05:34"></CMExample>                                                                                                                                                           |
| merchantTxnTimeZone   | String | 64  | No  | Yes | 商户交易订单发生的时区。 <br/> <CMExample data="+08:00"></CMExample>                                                                                                                                                                                                    |
| merchantTxnOriginalId | String | 128 | No  | Yes | 商户原始订单号。标记商户网站上唯一订单号，可重复，同一笔订单只能支付成功一次                                                                                                                                                                                                                      |
| merchantCustId        | String | 50  | No  | Yes | 客户在商户的唯一标识。<br/>                                                                                                                                                                                                                                            |
| productType           | String | 16  | Yes | Yes | 产品类型。请参阅 <br/><CustomPopover title="ProductTypeEnum" width="auto" reference="ProductTypeEnum" link="/apis/enums.html#producttypeenum"><CustomTable :data="ProductTypeEnumTable.data" :columns="ProductTypeEnumTable.columns"></CustomTable></CustomPopover> |
| subProductType        | String | 16  | Yes | Yes | 子产品类型。请参阅 <br/><CustomPopover title="SubProductTypeEnum" width="auto" reference="SubProductTypeEnum" ><CustomTable :data="SubProductTypeEnumTable.data" :columns="SubProductTypeEnumTable.columns"></CustomTable></CustomPopover>                           |
| txnType               | String | 16  | Yes | Yes | 交易类型。请参阅 <br/><CustomPopover title="TxnTypeEnum" width="auto" reference="TxnTypeEnum" ><CustomTable :data="TxnTypeEnumTable.data" :columns="TxnTypeEnumTable.columns"></CustomTable></CustomPopover>                                                        |
| paymentMode           | String | 16  | No  | Yes | 支付模式。 请参阅 <br/><CustomPopover title="PaymentModeEnum" width="auto" reference="PaymentModeEnum" ><CustomTable :data="PaymentModeEnumTable.data" :columns="PaymentModeEnumTable.columns"></CustomTable></CustomPopover>。默认为WEB                                |
| osType                | String | 16  | No  | Yes | 操作系统类型。 请参阅 <br/><CustomPopover title="OsTypeEnumTable" width="auto" reference="OsTypeEnum" ><CustomTable :data="OsTypeEnumTable.data" :columns="OsTypeEnumTable.columns"></CustomTable></CustomPopover>。<br/><CMNote data="paymentMode不是WEB时必填" />         |
| orderAmount           | String | 19  | Yes | Yes | 交易订单金额                                                                                                                                                                                                                                                      |
| orderCurrency         | String | 8   | Yes | Yes | 交易订单的货币。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) 货币代码                                                                                                                                                        |
| originTransactionId   | String | 20  | No  | Yes | 来源于Onerway的原始交易订单号，常用于退款等反向交易时通过此ID查找对应的交易订单号                                                                                                                                                                                                               |
| risk3dsStrategy       | String | 16  | No  | Yes | 3ds风险控制策略。 请参阅 <br/><CustomPopover title="Risk3dsStrategyEnum" width="auto" reference="Risk3dsStrategyEnum" ><CustomTable :data="Risk3dsStrategyEnumTable.data" :columns="Risk3dsStrategyEnumTable.columns"></CustomTable></CustomPopover>                  |
| subscription          | String | /   | No  | Yes | 订阅付款所需的订阅信息。 格式为 json 字符串。 请参阅对象 <br/><CustomPopover title="Subscription" width="auto" reference="Subscription" ><CustomTable :width="600" :data="Subscription.data" :columns="Subscription.columns"></CustomTable></CustomPopover>                         |
| mpiInfo               | String | /   | No  | Yes | mpi信息，3ds验证结果集，risk3dsStrategy为EXTERNAL时需要。 格式为 json 字符串。 请参阅对象 MpiInfo                                                                                                                                                                                     |
| txnOrderMsg           | String | /   | No  | Yes | 交易业务信息，除订阅复购外必填。 格式为 json 字符串。 请参阅对象 TxnOrderMsg                                                                                                                                                                                                            |
| billingInformation    | String | /   | No  | Yes | 交易账单信息，除订阅复购外必填。 格式为 json 字符串。 请参阅对象 TransactionAddress                                                                                                                                                                                                     |
| shippingInformation   | String | /   | No  | Yes | 交易邮寄信息，除订阅复购外必填。 格式为 json 字符串。 请参阅对象 TransactionAddress                                                                                                                                                                                                     |
| lpmsInfo              | String | /   | No  | Yes | 本地支付方式信息，productType为LPMS时必填，格式为json字符串。 请参阅对象 LpmsInfo                                                                                                                                                                                                     |
| sign                  | String | /   | Yes | No  | 签名字符串。                                                                                                                                                                                                                                                      |

</div>

#### 请求和响应示例

<div class="custom-dialog">
  <el-button class="dialog-button" plain @click="dialogVisible = true">自动生成签名</el-button>

  <el-dialog v-model="dialogVisible" draggable=draggable title="商户信息" width="500">
    <el-form :model="form">
      <el-form-item label="商户号" :label-width="formLabelWidth">
        <el-input v-model="form.merchantNo" autocomplete="off" placeholder="Enter your merchantNo"></el-input>
      </el-form-item>
      <el-form-item label="App ID" :label-width="formLabelWidth">
        <el-input v-model="form.appId" autocomplete="off" placeholder="Enter your appId"></el-input>
      </el-form-item>
      <el-form-item label="Secret" :label-width="formLabelWidth">
        <el-input v-model="form.secret" type="password" placeholder="Enter your secret" show-password autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="异步回调通知地址" :label-width="formLabelWidth">
        <el-input v-model="form.notifyUrl" placeholder="Url for getting notifications" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="updateRequest">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>

</div>

::: code-group

```json-vue [Request.json]
{
  "billingInformation": "{\"country\":\"US\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"17712345678\",\"address\":\"Apt. 870\",\"city\":\"Hayward\",\"postalCode\":\"66977\",\"identityNumber\":\"1234567890\"}",
  "merchantCustId": "{{merchantCustId}}",
  "merchantNo": "{{form.merchantNo}}", // [!code highlight]
  "merchantTxnId": {{merchantTxnId}},
  "merchantTxnTime": "{{datetime}}",
  "merchantTxnTimeZone": "+08:00",
  "orderAmount": "10",
  "orderCurrency": "USD",
  "productType": "CARD",
  "shippingInformation": "{\"country\":\"US\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"17712345678\",\"address\":\"Apt. 870\",\"city\":\"Hayward\",\"postalCode\":\"66977\",\"identityNumber\":\"1234567890\"}",
  "sign": "{{reactives.sign}}", // [!code highlight]
  "subProductType": "DIRECT",
  "txnOrderMsg": "{\"appId\":\"{{form.appId}}\",\"returnUrl\":\"https://www.ronhan.com\",\"products\":\"[{\\\"price\\\":\\\"10.00\\\",\\\"num\\\":\\\"1\\\",\\\"name\\\":\\\"iphone11\\\",\\\"currency\\\":\\\"USD\\\"}]\",\"notifyUrl\":\"{{form.notifyUrl}}\",\"transactionIp\":\"127.0.0.1\"}", // [!code highlight]
  "txnType": "SALE"
}
```

```json-vue [Response.json]
{
   "respCode": "20000",
   "respMsg": "Success",
   "data": {
      "transactionId": "1762730229685944320", // [!code highlight]
      "responseTime": "{{datetime}}",
      "txnTime": null,
      "txnTimeZone": "+08:00",
      "orderAmount": "10.00",
      "orderCurrency": "USD",
      "txnAmount": null,
      "txnCurrency": null,
      "status": "U",
      "redirectUrl": null,
      "contractId": null,
      "tokenId": null,
      "eci": null,
      "periodValue": null,
      "codeForm": null,
      "presentContext": null,
      "redirectType": null,
      "sign": "a2dde1fd7bc46dc1b87d3bd14707dd85c6750569bbe60025d9821c3bbf13cbab"
   }
}
```

:::

#### 响应参数
<div class="custom-table">

| 名称       | 类型     | 签名 | 描述                                      |
|----------|--------|----|-----------------------------------------|
| respCode | String | No | 来自 Onerway 的响应码                         |
| respMsg  | String | No | 来自 Onerway 的响应信息                        |
| data     | Map    | No | 响应数据。 请参阅对象 [TxnInfo](./js-sdk#txninfo) |

</div>

##### TxnInfo

<div class="custom-table bordered-table">

| 名称            | 签名  | 类型     | 描述                                                                                                  |
|---------------|-----|--------|-----------------------------------------------------------------------------------------------------|
| transactionId | Yes | String | Onerway创建的交易订单号，商户下单时的订单号                                                                           |
| responseTime  | Yes | String | 接口响应时间，格式为yyyy-MM-dd HH:mm:ss                                                                       |
| txnTime       | Yes | String | 交易完成时间，格式为yyyy-MM-dd HH:mm:ss                                                                       |
| txnTimeZone   | Yes | String | 交易完成时区，例如：+08:00                                                                                    |
| orderAmount   | Yes | String | 交易订单金额                                                                                              |
| orderCurrency | Yes | String | 交易订单币种。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) 货币代码 |
| txnAmount     | Yes | String | 订单金额转换成结算币种后的金额                                                                                     |
| txnCurrency   | Yes | String | 结算币种。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) 货币代码   |
| status        | Yes | String | 交易处理结果。 请参阅 TxnStatusEnum                                                                           |
| redirectUrl   | Yes | String | 当交易状态为R时，商户需要重定向到该URL完成部分交易，包括3ds验证、本地支付收银等                                                         |
| periodValue   | No  | String | 分期付款期数                                                                                              |
| contractId    | Yes | String | 订阅合同id，首购时返回                                                                                        |
| tokenId       | Yes | String | 订阅令牌id ，首购时返回                                                                                       |
| eci           | Yes | String | 责任转移                                                                                                |
| sign          | No  | String | 签名字符串。                                                                                              |

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