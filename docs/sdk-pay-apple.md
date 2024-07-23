---
outline: deep
---

<script lang="ts" setup>

import "./util/constants";

</script>

# Apple Pay

::: tip Apple Pay 需要更新`options`中的 `mode` 字段为`ApplePay`，config字段请参考下方[config字段说明](#apple-pay-config字段说明)
```js
const options = {
    // ...
    locale: 'zh', // 支持语言，详见下方 locale 字段说明
    mode: 'ApplePay', // [!code error]
    config: {
        // Apple Pay config字段，详见下方 config 字段说明
    }
    // ...
}
```
:::

创建 config

```js
const config = {
    applePayButtonType: '', // 'add-money' | 'book' | 'buy' | 'check-out' | 'continue' | 'contribute' | 'donate' | 'order' | 'plain' | 'reload' | 'rent' | 'subscribe' | 'support' | 'tip' | 'top-up' | 'pay'
    applePayButtonColor: '',  // 'black' | 'white' | 'white-outline'
    buttonWidth: '', // 按钮宽度
    buttonHeight: '', // 按钮高度
    buttonRadius: '', // 按钮圆角边框
}
```

### Apple Pay config字段说明

<div class="custom-table bordered-table">

| 属性                   | 类型     | 必填 | 说明                                                                                                                                                              |
|----------------------|--------|----|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| applePayButtonType   | string | No | `Apple Pay`按钮类型`add-money`、`book`、`buy`、`check-out`、`continue`、`contribute`、`donate`、`order`、`plain`、`reload`、`rent`、`subscribe`、`support`、`tip`、`top-up`、`pay` |
| applePayButtonColor  | string | No | `Apple Pay`按钮主题，支持`black`、`white`、`white-outline`                                                                                                               |
| buttonWidth          | string | No | 按钮宽度 例: `200px`                                                                                                                                                 |
| buttonHeight         | string | No | 按钮高度 例: `40px`                                                                                                                                                  |
| buttonRadius         | string | No | 按钮圆角边框 例: `4px`                                                                                                                                                 |

</div>

### SDK Apple Pay代码示例

::: danger 注意
下单接口中的 `subProductType` 请传 `DIRECT`
:::

```js-vue
const transactionId = '下单接口返回的 transactionId'; //当前交易ID // [!code error]
const options = {
   container: 'pacypay_checkout', // 按钮嵌入的容器
   locale: "zh", // 支持语言
   environment: 'sandbox', // sandbox、production
   mode: 'ApplePay', // GooglePay、ApplePay // [!code error]
   config: {
     applePayButtonType: 'buy', // 'add-money' | 'book' | 'buy' | 'check-out' | 'continue' | 'contribute' | 'donate' | 'order' | 'plain' | 'reload' | 'rent' | 'subscribe' | 'support' | 'tip' | 'top-up' | 'pay'
     applePayButtonColor: 'black',  // 'black' | 'white' | 'white-outline'
     buttonWidth: '100px', // 按钮宽度
     buttonHeight: '40px', // 按钮高度
     buttonRadius: '4px', // 按钮圆角边框
   },
   onPaymentCompleted: function (res) { // 成功支付后回调方法
     const txtInfo = res.data; // 返回交易结果详情
     const respCode = res.respCode; // 响应码
     const respMsg = res.respMsg; // 响应信息
     if(respCode === '20000') { // respCode 为 20000 表示交易正常
       switch (txtInfo.status) { // 交易状态判断
         case 'S': // status 为 'S' 表示成功
         // 支付最终状态以异步通知结果为准
          break
         case 'F': // status 为 'F' 表示失败
          break;
       }
     } else {
       // 交易失败
     }
   },
   onError: function (err) {
     //支付异常回调方法
     console.log('res', err);
   }
 }
```

### Apple Pay Locale

<div class="custom-table bordered-table">

| 语言    | 描述     | 是否支持Apple Pay | 是否支持Google Pay |
|-------|--------|---------------|----------------|
| ar    | 阿拉伯语   | 是             | 是              |
| ca    | 加泰罗尼亚语 | 是             | 是              |
| cs    | 捷克语    | 是             | 是              |
| da    | 丹麦语    | 是             | 是              |
| de    | 德语     | 是             | 是              |
| el    | 希腊语    | 是             | 是              |
| en    | 英语     | 是             | 是              |
| es    | 西班牙语   | 是             | 是              |
| fi    | 芬兰语    | 是             | 是              |
| fr    | 法语     | 是             | 是              |
| hr    | 克罗地亚语  | 是             | 是              |
| id    | 印度尼西亚语 | 是             | 是              |
| it    | 意大利语   | 是             | 是              |
| ja    | 日语     | 是             | 是              |
| ko    | 韩语     | 是             | 是              |
| ms    | 马来语    | 是             | 是              |
| no    | 挪威语    | 是             | 是              |
| nl    | 荷兰语    | 是             | 是              |
| pl    | 波兰语    | 是             | 是              |
| pt    | 葡萄牙语   | 是             | 是              |
| ru    | 俄语     | 是             | 是              |
| sk    | 斯洛伐克语  | 是             | 是              |
| sv    | 瑞典语    | 是             | 是              |
| th    | 泰语     | 是             | 是              |
| tr    | 土耳其语   | 是             | 是              |
| uk    | 乌克兰语   | 是             | 是              |
| zh    | 简体中文   | 是             | 是              |
| vi    | 越南语    | 是             | 否              |
| he    | 希伯来语   | 是             | 否              |
| hi    | 印地语    | 是             | 否              |
| hu    | 匈牙利语   | 是             | 否              |
| ro    | 罗马尼亚语  | 是             | 否              |
| zh-TW | 繁体中文   | 是             | 否              |
| bg    | 保加利亚语  | 否             | 是              |
| et    | 爱沙尼亚语  | 否             | 是              |
| sr    | 塞尔维亚语  | 否             | 是              |
| sl    | 斯洛文尼亚语 | 否             | 是              |

</div>


<style lang="css">



</style>