---
outline: deep
---

<script setup>

</script>

# IOS-SDK 收银台

## 接入流程
1. 引入[SDK](https://v3-doc.pacypay.com/android/pacypay-v1.0.1.aar)
2. 调用下单接口获取`transactionId`
3. 指定`environment`，`subProductType`，传入`transactionId`创建收银台对象
4. 渲染支付按钮
5. 创建支付回调

### 引入SDK

将 [SDK](https://v3-doc.pacypay.com/ios/SDK.xcframework.zip) 添加到您的app动态库

<img src="https://sandbox-v3-doc.pacypay.com/image.png" alt="import sdk">

### 初始化SDK

#### 1. 调用[下单接口](./js-sdk.md#调用下单接口)

#### 2. 收银台配置

```swift
import SwiftUI
import UIKit
import SDK
import Combine

//  transactionId: 流水号ID 
//  EnvironmentList 环境配置: 
//      EnvironmentList.SANDBOX:sandbox环境 
//      EnvironmentList.PRODUCTION: 正式环境 
//      EnvironmentList.BETA: 测试环境 
//  subProductType：支付类型: 
//      DIRECT：卡支付 TOKEN：toke支付 
PacypayCheckout(environment: EnvironmentList.TEST, 
                subProductType: subProductType, 
                customConfig: customConfig, 
                transactionId: transactionId) 
```

#### 3.1 内置支付按钮 <Badge text="推荐" type="tip" />

```swift
1.初始化sdk
PacypayCheckout(environment: EnvironmentList.TEST, subProductType: subProductType, customConfig: customConfig, transactionId: transactionId)

2.生成支付按钮
paymentSDK.creditCardView()//（subProductType：初始化传入的值是TOKEN,则自动唤起绑卡支付页面；如果传入的是DIRECT 自动唤起卡支付页面）
paymentSDK.applePayView()//applePay支付页面
```

#### 3.2 自定义按钮支付

```swift
VStack{
    Button(action: {
          //卡支付
          paymentSDK().createPayment(transactionId:transactionId,payMethod:"DIRECT")
          //绑卡支付
          paymentSDK().createPayment(transactionId:transactionId,payMethod:"TOKEN")
          //applePay支付
          paymentSDK().createPayment(transactionId:transactionId,payMethod:"ApplePay")

}) {
        Text("自定义支付按钮文案")
    }

} 
```

#### 4. 支付回调

```swift
//  code：“F” 支付失败  "S" 支付成功  "N"取消支付  "P"支付中
//  msg：支付结果信息，包含支付失败的信息提示，支付成功返回"Success"

.onReceive(NotificationCenter.default.publisher(for: .ronghanSDKCallBackData)) { notification in
    if let userInfo = notification.userInfo as? [String: Any],
        let code = userInfo["code"] as? String,
        let msg = userInfo["msg"] as? String {
        self.code = code
        self.msg = msg
    }
}
```