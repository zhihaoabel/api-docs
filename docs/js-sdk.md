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

<div class="custom-table bordered-table">

| 名称                    | 类型     | 长度  | 必填  | 签名  | 描述                                                                                                                                                                                                             |
|-----------------------|--------|-----|-----|-----|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchantNo            | String | 20  | Yes | Yes | 商户号。 商户注册时，OnerWay会为商户创建商户号                                                                                                                                                                                    |
| merchantTxnId         | String | 64  | Yes | Yes | 商户创建的商户交易订单号，**不同的订单号视为不同的交易**                                                                                                                                                                                 |
| merchantTxnTime       | String | /   | No  | Yes | 商户交易订单发生的时间 格式为 <br/> `yyyy-MM-dd HH:mm:ss`<br/><CMExample data="例如：2024-2-28 15:05:34"></CMExample>                                                                                                           |
| merchantTxnTimeZone   | String | 64  | No  | Yes | 商户交易订单发生的时区。 <br/> <CMExample data="例如：+08:00"></CMExample>                                                                                                                                                    |
| merchantTxnOriginalId | String | 128 | No  | Yes | 商户原始订单号。标记商户网站上唯一订单号，可重复，同一笔订单只能支付成功一次                                                                                                                                                                         |
| merchantCustId        | String | 50  | No  | Yes | 客户在商户的唯一标识。<br/><CMNote data="当 subProductType 为 TOKEN 时必填。" />                                                                                                                                                |
| productType           | String | 16  | Yes | Yes | 产品类型，请参阅 <CustomPopover title="ProductTypeEnum" width="600" reference="ProductTypeEnum" ><CustomTable :data="ProductTypeEnumTable.data" :columns="ProductTypeEnumTable.columns"></CustomTable></CustomPopover> |
| subProductType        | String | 16  | Yes | Yes | 子产品类型，请参阅 SubProductTypeEnum                                                                                                                                                                                   |
| txnType               | String | 16  | Yes | Yes | 交易类型，请参阅 TxnTypeEnum                                                                                                                                                                                           |
| paymentMode           | String | 16  | No  | Yes | 支付模式。 请参阅 PaymentModeEnum。默认为WEB                                                                                                                                                                               |
| osType                | String | 16  | No  | Yes | 操作系统类型。 请参阅 OsTypeEnum。paymentMode不是WEB时必填                                                                                                                                                                     |
| orderAmount           | String | 19  | Yes | Yes | 交易订单金额                                                                                                                                                                                                         |
| orderCurrency         | String | 8   | Yes | Yes | 交易订单的货币。 请参阅 ISO 4217 货币代码                                                                                                                                                                                     |
| originTransactionId   | String | 20  | No  | Yes | 来源于Onerway的原始交易订单号，常用于退款等反向交易时通过此ID查找对应的交易订单号                                                                                                                                                                  |
| risk3dsStrategy       | String | 16  | No  | Yes | 3ds风险控制策略。 请参阅 Risk3dsStrategyEnum                                                                                                                                                                             |
| subscription          | String | /   | No  | Yes | 订阅付款所需的订阅信息。 格式为 json 字符串。 请参阅对象 Subscription                                                                                                                                                                  |
| mpiInfo               | String | /   | No  | Yes | mpi信息，3ds验证结果集，risk3dsStrategy为EXTERNAL时需要。 格式为 json 字符串。 请参阅对象 MpiInfo                                                                                                                                        |
| txnOrderMsg           | String | /   | No  | Yes | 交易业务信息，除订阅复购外必填。 格式为 json 字符串。 请参阅对象 TxnOrderMsg                                                                                                                                                               |
| billingInformation    | String | /   | No  | Yes | 交易账单信息，除订阅复购外必填。 格式为 json 字符串。 请参阅对象 TransactionAddress                                                                                                                                                        |
| shippingInformation   | String | /   | No  | Yes | 交易邮寄信息，除订阅复购外必填。 格式为 json 字符串。 请参阅对象 TransactionAddress                                                                                                                                                        |
| lpmsInfo              | String | /   | No  | Yes | 本地支付方式信息，productType为LPMS时必填，格式为json字符串。 请参阅对象 LpmsInfo                                                                                                                                                        |
| sign                  | String | /   | Yes | No  | 签名字符串。                                                                                                                                                                                                         |

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

<style lang="css">

 .dialog-button {
   margin-top: 0.75rem;
   border-radius: 6px;

   border-color: var(--vp-button-alt-border);
   color: var(--vp-button-alt-text);
   background-color: var(--vp-button-alt-bg);
}
</style>