---
outline: deep
---

<script lang="ts" setup>

import {reactive, ref, watch} from 'vue';

const dialogVisible = ref(false);
const datetime = new Date().toLocaleString('zh', { hour12: false }).replace(/\//g, '-').replace(/上午|下午/g, '');
const formLabelWidth = '140px';
const draggable = ref(true);

const form = reactive({
   merchantNo: '#{你的商户号}',
   appId: '#{你的appId}',
});

const requestBody = {
   billingInformation: '{"country":"US"}',
};

watch(() => form.merchantNo, (val) => {
   console.log(val);
});

function signGen() {
  
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

### 调用下单接口

<div class="custom-dialog">
   <el-button class="dialog-button" plain @click="dialogVisible = true">自动生成下单参数</el-button>

  <el-dialog v-model="dialogVisible" draggable=draggable title="商户信息" width="500">
    <el-form :model="form">
      <el-form-item label="商户号" :label-width="formLabelWidth">
        <el-input v-model="form.merchantNo" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="App ID" :label-width="formLabelWidth">
        <el-input v-model="form.appId" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>

</div>

```json-vue
{
  "billingInformation": "{\"country\":\"US\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"1234567890\",\"address\":\"\",\"city\":\"\",\"postalCode\":\"000000\",\"identityNumber\":\"1234567890\"}",
  "merchantCustId": "170608205582535798.7520422185",
  "merchantNo": "{{form.merchantNo}}",
  "merchantTxnId": 1708654913000,
  "merchantTxnTime": "{{datetime}}",
  "merchantTxnTimeZone": "+08:00",
  "orderAmount": "10",
  "orderCurrency": "USD",
  "productType": "CARD",
  "shippingInformation": "{\"country\":\"US\",\"email\":\"abel.wang@onerway.com\",\"firstName\":\"CL\",\"lastName\":\"BRW2\",\"phone\":\"1234567890\",\"address\":\"\",\"city\":\"\",\"postalCode\":\"000000\",\"identityNumber\":\"1234567890\"}",
  "sign": "2ae35da473dfad93802c824db659e613d60bccbf9209628f1aa3660458d9972f",
  "subProductType": "DIRECT",
  "txnOrderMsg": "{\"appId\":\"{{form.appId}}\",\"returnUrl\":\"https://beta-docs.ronhan.com/js-sdk\",\"products\":\"[{\\\"price\\\":\\\"10.00\\\",\\\"num\\\":\\\"1\\\",\\\"name\\\":\\\"iphone11\\\",\\\"currency\\\":\\\"USD\\\"}]\",\"notifyUrl\":\"https://docs.onerway.com\",\"transactionIp\":\"127.0.0.1\"}",
  "txnType": "SALE"
}

```

<style lang="css">
 .dialog-button {
   margin-top: 0.75rem;
   border-radius: 6px;

   border-color: var(--vp-button-alt-border);
   color: var(--vp-button-alt-text);
   background-color: var(--vp-button-alt-bg);
}
</style>