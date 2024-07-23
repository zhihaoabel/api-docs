---
outline: deep
---

<script lang="ts" setup>

import "./util/constants";

</script>

# 订阅支付

::: tip 订阅支付仅需将`config`中的`subProductType`更新为`SUBSCRIBE`，其他配置请参考[SDK直接支付config字段说明](./sdk-pay#config)
:::

## SDK订阅支付代码示例

::: danger 注意
`subProductType` 必须与 [下单接口](sdk-subscription#请求及响应示例) 的 `subProductType` 保持一致
:::

```js-vue
const transactionId = '下单接口返回的 transactionId';  // [!code error]
const pacypay = new Pacypay(transactionId, {
   locale: 'zh-cn', // en zh-cn ar de es fi fr it ja ko nl no pl pt ru sv th zh-tw
   environment: 'sandbox', // sandbox、production
   mode: 'CARD',
   config: {
     subProductType: 'SUBSCRIBE', // DIRECT - 直接支付，TOKEN - 绑卡并支付，SUBSCRIBE - 订阅支付 // [!code warning]
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