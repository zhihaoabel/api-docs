[//]: # (###### TxnOrderMsg)

<div class="custom-table bordered-table">

| 名称             | 类型      | 长度   | 必填  | 签名 | 描述                                                                                                               |
|----------------|---------|------|-----|----|------------------------------------------------------------------------------------------------------------------|
| returnUrl      | String  | 256  | Yes | No | 同步返回地址，顾客付款完成后，`Onerway`的托管页面会通过这个地址重定向回商家的指定页面。                                                                 |
| products       | String  | 1024 | Yes | No | 顾客购买的商品信息列表，请参考下方[Products](#products)对象                                                                         |
| transactionIp  | String  | 64   | Yes | No | 持卡人交易`IP`                                                                                                        |
| appId          | String  | 20   | Yes | No | 店铺`ID`，商家在`Onerway`入驻网站/应用程序时，会生成一个与该网站/应用程序的唯一ID。 该ID在`Onerway`后台获取。                                            |
| javaEnabled    | Boolean | /    | Yes | No | 持卡人浏览器是否开启`java`，获取方式：<n-ellipsis style="max-width: 240px">`window.navigator.javaEnabled()`</n-ellipsis>         |
| colorDepth     | String  | 64   | Yes | No | 持卡人屏幕色深，获取方式：`window.screen.colorDepth`                                                                          |
| screenHeight   | String  | 64   | Yes | No | 持卡人的屏幕分辨率，获取方式：`window.screen.height`                                                                            |
| screenWidth    | String  | 64   | Yes | No | 持卡人的屏幕分辨率，获取方式：`window.screen.width`                                                                             |
| timeZoneOffset | String  | 64   | Yes | No | 持卡人浏览器的时区，获取方式：<n-ellipsis style="max-width: 250px">`((new Date()).getTimezoneOffset()).toString()`</n-ellipsis> |
| accept         | String  | 2048 | Yes | No | 持卡人浏览器的 `Accept` 请求头                                                                                             |
| userAgent      | String  | 2048 | Yes | No | 持卡人的浏览器类型，获取方式：`window.navigator.userAgent`                                                                      |
| contentLength  | String  | 64   | Yes | No | <n-ellipsis style="max-width: 250px">持卡人浏览器内容长度头部以外的内容长度</n-ellipsis>                                            |
| language       | String  | 64   | Yes | No | 持卡人浏览器的语言，获取方式：`window.navigator.language`                                                                       |
| periodValue    | String  | /    | No  | No | 分期付款期数。对应[咨询分期期数接口](./installment)返回的期数值。当 `subProductType` 为 `INSTALLMENT` 时必填。                                 |
| notifyUrl      | String  | 256  | No  | No | 通知地址。详见[通知](./notify)                                                                                            |

</div>

###### Products

<!--@include: ./products.md-->