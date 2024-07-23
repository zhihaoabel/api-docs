---
outline: deep
---

<script lang="ts" setup>

import {SubProductTypeEnum, LanguageEnum, LocaleEnum} from "./util/constants";

</script>

# WebSDK支付

## 引入 Onerway JavaScript 库

下载链接: [onerway-1.1.2](https://sandbox-v3-doc.onerway.com/javascripts/onerway-v1.1.2.zip) 

1.引入方式一

```html
<script src="onerway.js"></script>
```

2.引入方式二

```js
import Pacypay from './onerway.js'
// 或者
const Pacypay = require('./onerway.js')
```

## 在页面添加SDK入口

```html
<div id='pacypay_checkout'></div>
```

## 创建SDK实例
```js
const pacypay = new pacypay(transactionId, options)
```


### options

创建options对象

```js
const options = {
    container: 'pacypay_checkout', // 容器id。默认pacypay_checkout
    locale: '', // 收银台语言。根据实际情况填写，详见下方locale参数说明 // [!code warning]
    environment: '', // 环境类型。支持沙盒、生产环境，详见下方environment参数说明。 // [!code warning]
    mode: '', // 支付方式。支持 收银台、Apple Pay、Google Pay，详见下方mode参数说明 // [!code warning]
    config: {
        //  config配置项。参数说明及示例请查看下方config配置项 // [!code warning]
    }, 
    onPaymentCompleted: function() {
        // 请求成功完成回调方法
    },
    onError: function() {
        // 请求异常回调方法
    }
}

```

::: danger 示例中的字段未赋值，请根据下方字段说明填写，完整配置请参考对应场景的代码示例
:::

#### options字段说明

<div class="custom-table bordered-table">

| 属性                 | 类型       | 必填  | 说明                                                                                                                                                                                                                                                                                                                                        |
|--------------------|----------|-----|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| container          | string   | No  | 容器id,默认`pacypay_checkout`                                                                                                                                                                                                                                                                                                                 |
| locale             | string   | No  | 语言类型。<br>1. 收银台集成：详见 <CustomPopover title="LanguageEnum" width="auto" reference="LanguageEnum" link="/apis/enums.html#languageenum"><CustomTable :data="LanguageEnum.data" :columns="LanguageEnum.columns"> </CustomTable></CustomPopover>。<br>2. Google Pay 和 Apple Pay 集成详见： [ApplePay](./sdk-pay-apple)、[GooglePay](./sdk-pay-google)。 |
| environment        | string   | No  | 环境类型，支持`sandbox`、`production`。默认为 `production`                                                                                                                                                                                                                                                                                            |
| mode               | string   | Yes | 支付方式，支持 `CARD`、`ApplePay`、`GooglePay`                                                                                                                                                                                                                                                                                                     |
| config             | object   | No  | 配置项。<br>1.收银台集成：详见以下 [config](#config) 说明 <br>2. Google Pay 和 Apple Pay 集成详见： [ApplePay Config](./sdk-pay-apple)、[GooglePay Config](./sdk-pay-google)。                                                                                                                                                                                    |
| onPaymentCompleted | function | No  | 请求成功完成回调方法                                                                                                                                                                                                                                                                                                                                |
| onError            | function | No  | 请求异常回调方法                                                                                                                                                                                                                                                                                                                                  |

</div>

#### config

创建config项

::: warning 注意
以下是SDK收银台配置代码示例，[Apple Pay](./sdk-pay-apple#apple-pay-config字段说明)、[Google Pay](./sdk-pay-google#google-pay-config字段说明) 配置及字段说明请参考对应场景的代码示例
:::

```js
const config = {
    subProductType: '', // DIRECT -直接支付；TOKEN -绑卡支付；SUBSCRIBE -订阅支付 // [!code warning]
    checkoutTheme: '', // light -浅色主题；dark -深色主题 // [!code warning]
    customCssURL: '', // 自定义样式链接地址。配置该值后，checkoutTheme 会失效 // [!code warning]
    showPayButton: true, // 是否显示支付按钮。详见下方 showPayButton 参数说明 // [!code warning]
    buttonSeparation: false, // 绑卡与支付是否分步操作。 详见下方 buttonSeparation 参数说明 // [!code warning]
    displayBillingInformation: true, // 是否显示账单信息。详见下方 displayBillingInformation 参数说明 // [!code warning]
    variables: {
        // 自定义主题色变量名。详见下方 variables 参数说明 // [!code warning]
    },
    styles: {
        // 自定义样式。详见下方 styles 参数说明 // [!code warning]
    }
}
```

##### config字段说明

<div class="custom-table bordered-table">

| 属性                        | 类型      | 必填  | 说明                                                                                                                           |
|---------------------------|---------|-----|------------------------------------------------------------------------------------------------------------------------------|
| subProductType            | string  | Yes | 子产品类型。<br>`DIRECT` - 直接支付<br>`TOKEN` - 绑卡支付<br>`SUBSCRIBE` - 订阅支付 <br> <CMNote data='需要与下单接口的 subProductType 保持一致'></CMNote> |
| checkoutTheme             | string  | No  | 主题类型。`light`、`dark`                                                                                                          |
| customCssURL              | string  | No  | 自定义样式链接地址。配置后，`checkoutTheme` 值无效                                                                                            |
| variables                 | object  | No  | 自定义主题色。详见以下 [variables](#variables) 说明                                                                                       |
| styles                    | object  | No  | 自定义样式。详见以下 [styles](#styles) 说明。<br><CMNote data="如果需要自定义所有样式，checkoutTheme,customCssURL,variables 都可以不传"></CMNote>          |
| showPayButton             | boolean | No  | 默认为 `true`。如果设为 `false` 可自定义支付按钮和展示账单信息，请参阅 [补充说明](#补充说明)                                                                    |
| buttonSeparation          | boolean | No  | 默认为 `true`。`true`：绑卡与支付按钮分开操作；`false`：绑卡与支付一步完成                                                                              |
| displayBillingInformation | boolean | No  | 默认为 `true`。`true`：显示账单信息；`false` ：隐藏账单信息，需通过自定义支付按钮传入账单信息                                                                    |

</div>

::: warning `config` 配置中的 `subProductType` 必须与[下单接口](./sdk-do-transaction)中的 `subProductType` 一致
:::

##### variables

<div class="custom-table bordered-table">

| 属性              | 类型     | 必填 | 说明                |
|-----------------|--------|----|-------------------|
| colorBackground | string | No | 主题背景色             |
| colorPrimary    | string | No | 主题色，如输入框高亮、光标颜色   |
| colorText       | string | No | 字体颜色              |
| colorDanger     | string | No | 错误提示颜色            |
| borderRadius    | string | No | 输入框角度             |
| fontSizeBase    | string | No | 基础字体大小，会按照该基准进行缩放 |
| fontFamily      | string | No | 字体样式              |

</div>

##### styles

<div class="custom-table bordered-table">

| 属性	                                            | 类型	     | 必填	 | 说明              |
|------------------------------------------------|---------|-----|-----------------|
| .pacypay-checkout__payment-method	             | object	 | 否	  | 收银台支付方式容器       |
| .pacypay-checkout_payment-method_header	       | object	 | 否	  | 标题栏             |
| .pacypay-checkout_payment-methodheader_title	  | object	 | 否	  | 标题栏名称           |
| .pacypay-checkout_payment-methodimage_wrapper	 | object	 | 否	  | 标题栏图片容器         |
| .pacypay-checkout_payment-method_brands	       | object	 | 否	  | 标题栏右侧银行卡类型容器    |
| .pacypay-checkout_payment-method_image	        | object	 | 否	  | 标题栏图片           |
| .pacypay-checkout_payment-method_brand	        | object	 | 否	  | 标题栏右侧银行卡图片      |
| .pacypay-checkout_payment-method_name	         | object	 | 否	  | 标题栏标题名称         |
| .pacypay-checkout_payment-method_details	      | object	 | 否	  | 表单内容容器          |
| .pacypay-checkout__field-wrapper	              | object	 | 否	  | 表单项容器           |
| .pacypay-checkout__field	                      | object	 | 否	  | 标题栏右侧银行卡图片      |
| .pacypay-checkout_payment-method_brand	        | object	 | 否	  | 表单项             |
| .pacypay-checkout__field--cardNumber	          | object	 | 否	  | 表单项--卡号         |
| .pacypay-checkout__field--expire	              | object	 | 否	  | 表单项--到期时间       |
| .pacypay-checkout__field--cvv	                 | object	 | 否	  | 表单项--`CVV`      |
| .pacypay-checkout__field--lastName	            | object	 | 否	  | 表单项--`name`     |
| .pacypay-checkout__label-text	                 | object	 | 否	  | 表单项标题           |
| .pacypay-checkout__label-text--require	        | object	 | 否	  | 表单项标题必填标识       |
| .pacypay-checkout__input	                      | object	 | 否	  | 表单项输入框          |
| .pacypay-checkout__error-text	                 | object	 | 否	  | 表单项错误提示文案       |
| .pacypay-checkout__button	                     | object	 | 否	  | 按钮              |
| .pacypay-checkout__button--pay	                | object	 | 否	  | 支付按钮            |
| .pacypay-checkout_button_text	                 | object	 | 否	  | 按钮文案            |
| .pacypay-checkout__loading	                    | object	 | 否	  | 按钮 `Loading` 容器 |
| .pacypay-checkout__spinner	                    | object	 | 否	  | 按钮 `Loading` 动画 |

</div>

##### 补充说明

::: tip 注意
当 `showPayButton` 为 `false` 的时候，在自定义支付按钮处，请调用`submit`方法进行支付

```js 
pacypay.submit();
```

如果绑卡时不需要显示账单信息，即 `displayBillingInformation` 为 `false`，则需要在`submit`方法传入账单信息。可在 [config](#config) 中配置 `displayBillingInformation`

```js
pacypay.submit({
    billingInformation: {
        "firstName": "ZZ",
        "lastName": "ZZ",
        "phone": "188888888888",
        "email": "shipping@test.com",
        "postalCode": "888888",
        "address": "ShippingAddress",
        "country": "CN",
        "province": "SH",
        "city": "SH",
        "street": "lujiazui",
        "number": "1",
        "identityNumber": "110000"
    }
});
```

:::

### SDK直接支付代码示例

::: danger 注意
`subProductType` 必须与 [下单接口](sdk-do-transaction#sdk下单请求及响应示例) 的 `subProductType` 保持一致
:::

```js-vue
const transactionId = '下单接口返回的 transactionId';  // [!code error]
const pacypay = new Pacypay(transactionId, {
   locale: 'zh-cn', // en zh-cn ar de es fi fr it ja ko nl no pl pt ru sv th zh-tw
   environment: 'sandbox', // sandbox、production
   mode: 'CARD',
   config: {
     subProductType: 'DIRECT', // DIRECT-直接支付，TOKEN-token绑卡并支付，SUBSCRIBE - 订阅支付 // [!code warning]
     checkoutTheme: 'light', // light、dark
     customCssURL: '', // 自定义样式链接地址，配置该值后，checkoutTheme 则无效
     variables: {
       "colorBackground": "black", // 主题背景色
       "colorPrimary": "red", // 主题色，如输入框高亮、光标颜色
       "colorText": "white", // 字体颜色
       "colorDanger": "#FF1493", // 错误提示颜色
       "borderRadius": "2px", // 输入框角度
       "fontSizeBase": "16px", // 基础字体大小，会按照该基准进行缩放
       "fontFamily": "Arial, sans-serif", // 字体样式
     },
     // 如果想自定义所有样式则只用配置styles. checkoutTheme,customCssURL,variables都可以不传
     // 详情请看styles属性说明
     styles: {
       ".pacypay-checkout__button--pay": { // 支付按钮样式
       "background-color": "red",
     },
   }
 },
 onPaymentCompleted: function (res) {
   //成功支付后回调方法
   const txtInfo = res.data; // 返回交易结果详情
   const respCode = res.respCode; // 响应码
   const respMsg = res.respMsg; // 响应信息
   if(respCode === '20000') { // respCode 为 20000 表示交易正常
     switch (txtInfo.status) { // 交易状态判断
       case 'S': // status 为 'S' 表示成功
       // 支付最终状态以异步通知结果为准
       break;
       case 'R': // status 为 'R' 表示需要3ds验证
       // 当交易状态为 R 时，商户需要重定向到该URL完成部分交易，包括3ds验证
       window.location.href = txtInfo.redirectUrl;
       break;
     }
   } else {
   // 交易失败
   }
 },
 onError: function (err) {
   //支付异常回调方法
   console.log(err);
   }
 });
 
```

<style lang="css">



</style>