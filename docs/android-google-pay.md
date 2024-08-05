---
outline: deep
---

<script lang="ts" setup>

</script>

# Android Google Pay

::: tip Google Pay 接入前提

- 安装 18.1.3 或更高版本的 Google Play 服务
- [安装 Google Pay 应用并添加付款方式](https://support.google.com/pay/answer/6289372?hl=zh-cn)
- [为您的 Google 帐号添加付款方式](https://support.google.com/wallet/answer/12058983?hl=zh-Hans&visit_id=638584335841986819-2908238858&rd=1)
- 遵守 [Google Pay API 使用限制政策](https://payments.developers.google.com/terms/aup?hl=zh-cn) 和 [Google Play 开发者政策](https://support.google.com/googleplay/android-developer/answer/14906471?hl=zh-Hans&visit_id=638584335841986819-2908238858&rd=1)

:::

## 接入流程

1. 引入 `Google Pay` [SDK-v1.0.0](./assets/sdk/v1.0.0.zip)
2. 创建 `GooglePayLauncher` 实例，添加 `Google Pay` 支付回调
3. 初始化 `Google Pay` 配置信息，确定是否支持 `Google Pay` 付款
4. 调用[下单接口](./sdk-do-transaction)
5. 从下单接口响应中获取 `transactionId`，调用 `GooglePayLauncher` 的 `pay` 方法

### 引入SDK

在 app/build.gradle 文件的 dependencies 块中添加

```gradle
dependencies {
  implementation files('libs/onerway-core-v1.0.2.aar')
  implementation files('libs/onerway-googlepay-v1.0.0.aar')
  implementation 'com.google.android.gms:play-services-wallet:19.3.0'
}
```

### 初始化SDK

#### 1. 创建 `GooglePayLauncher` 实例

::: warning 该操作必须要在 `Activity#onCreate()` 内完成
:::

```java
Environment environment = Environment.SANDBOX; // SANDBOX、PRODUCTION
launcher = new GooglePayLauncher(this, environment, new PaymentHandler() {
            @Override
            public void onCompleted(PaymentResult result) {
                String status = result.getStatus();
                switch (status) {
                    case PaymentResult.PENDING:
                        Toast.makeText(GooglePayActivity.this, "处理中！", Toast.LENGTH_LONG).show();
                        break;
                    case PaymentResult.SUCCEEDED:
                        Toast.makeText(GooglePayActivity.this, "支付完成！", Toast.LENGTH_LONG).show();
                        break;
                    case PaymentResult.FAILED:
                        Toast.makeText(GooglePayActivity.this, "支付失败！" + result.getMessage(), Toast.LENGTH_LONG).show();
                        break;
                    case PaymentResult.CANCEL:
                        Toast.makeText(GooglePayActivity.this, "支付取消！", Toast.LENGTH_LONG).show();
                        break;
                }
            }
 
            @Override
            public void onError(PacypayException e) {
                Toast.makeText(GooglePayActivity.this, "支付失败: " + e.getCode() + "=" + e.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
```

#### 2. 创建 `Google Pay` 按钮
<br/>

##### 2.1 内置支付按钮 <Badge text="推荐" type="tip" />

引入 GooglePay 按钮

```xml-vue
<com.onerway.checkout.googlepay.GooglePayButton    // [!code ++]
        android:id="@+id/btn_google_pay"  // [!code ++]
        android:layout_width="wrap_content"  // [!code ++]
        android:layout_height="wrap_content" />  // [!code ++]
```

创建配置信息，具体参数可参考 [GooglePay文档](https://developers.google.com/pay/api/android/reference/request-objects#PaymentDataRequest)

```java
String gatewayMerchantId = "800096"; // 生产环境请替换成商户自己的 gatewayMerchantId
// 初始化配置信息
GooglePayConfig config = new GooglePayConfig.Builder()
                .setGooglePayEnvironment(GooglePayEnvironment.TEST)
                .build(gatewayMerchantId);
GooglePayButton btn = findViewById(R.id.btn_google_pay);  // [!code ++]
btn.initialize(config, new GooglePayReadyCallback() {
            @Override
            public void onReady(boolean isAvailable) {
                // 判断设备是否支持 GooglePay
                if (!isAvailable) {
                    Toast.makeText(GooglePayActivity.this, "该设备暂不支持 GooglePay !", Toast.LENGTH_LONG).show();
                }
            }
        });
```

##### 2.2 自定义按钮支付

创建配置信息，具体参数可参考 [GooglePay文档](https://developers.google.com/pay/api/android/reference/request-objects#PaymentDataRequest)

```java
String gatewayMerchantId = "800096"; // 生产环境请替换成商户自己的 gatewayMerchantId
// 初始化配置信息
GooglePayConfig config = new GooglePayConfig.Builder()
                .setGooglePayEnvironment(GooglePayEnvironment.TEST)
                .build(gatewayMerchantId);
launcher.initialize(config, new GooglePayReadyCallback() {
            @Override
            public void onReady(boolean isAvailable) {
                if (!isAvailable) {
                    Toast.makeText(GooglePayActivity.this, "该设备暂不支持 GooglePay !", Toast.LENGTH_LONG).show();
                }
            }
        });
```

::: warning 自定按钮样式请遵循 [Google Pay品牌指南](https://developers.google.com/pay/api/android/guides/brand-guidelines?hl=zh-cn#payment-buttons)
:::

#### 3. 调用[下单接口](./sdk-do-transaction)
<br/>

#### 4. 根据下单接口响应中的 `transactionId` 调用 `GooglePay` 支付

```java
// 在（自定义）按钮的点击事件中调用 launcher 的 payment 方法
String transactionId = "下单接口返回的 transactionId"; 
btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                launcher.payment(transactionId); // 启动 Google Pay  // [!code warning]
            }
        });
```

<style lang="css">



</style>