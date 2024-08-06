---
outline: deep
---

<script setup>

</script>

# Android-SDK收银台

## 接入流程
1. 引入[SDK](https://v3-doc.pacypay.com/android/pacypay-v1.0.1.aar)
2. 创建收银台配置和支付回调
3. 创建收银台对象
4. 调用下单接口
5. 从下单接口响应中获取`transactionId`，调用收银台支付方法


### 引入SDK

a. 将[SDK](https://v3-doc.pacypay.com/android/pacypay-v1.0.1.aar)添加到您的app/libs目录下

b. 在 app/build.gradle 文件的 dependencies 块中添加

```groovy
dependencies {
  implementation files('libs/pacypay-v1.0.1.aar')
} 
```

### 初始化SDK

#### 1. 创建收银台配置

```java
PacypayConfig config = new PacypayConfig.Builder()
                // SubProductType.DIRECT: 卡直接支付  
                // SubProductType.TOKEN: TOKEN 绑卡支付
                .setSubProductType(SubProductType.TOKEN) 
                .setEnvironment(Environment.SANDBOX)
                .build();
```

#### 2. 创建收银台支付回调

```java
PaymentHandler handler = new PaymentHandler() {
    @Override
    public void onCompleted(PaymentResult result) {
        String status = result.getStatus();
        switch (status) {
            case PaymentResult.PENDING:
                Toast.makeText(context, "处理中！", Toast.LENGTH_LONG).show();
                break;
            case PaymentResult.SUCCEEDED:
                Toast.makeText(context, "支付成功！", Toast.LENGTH_LONG).show();
                break;
            case PaymentResult.FAILED:
                Toast.makeText(context, "支付失败！", Toast.LENGTH_LONG).show();
                break;
        }
    }
    @Override
    public void onError(PacypayException e) {
        Toast.makeText(context, "支付失败: " + e.getCode() + "=" + e.getMessage(), Toast.LENGTH_LONG).show();
    }
};
```

#### 3. 创建收银台对象(在 onCreate 中创建此对象)

```java
PacypayCheckout checkout = new PacypayCheckout(componentActivity, config, handler);
```

#### 4. 调用[下单接口](sdk-do-transaction)


#### 5. 调用收银台支付方法

```java
// transationId: 商户通过接口获取到的交易 ID
checkout.payment(transactionId);
```

