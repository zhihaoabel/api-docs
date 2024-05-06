---
outline: deep
---

<script setup>

</script>

# 通用参数枚举

<script>

</script>

<div id="table-hover-container">
    <!-- 完整表格内容将被动态插入这里 -->

</div>

## ProductTypeEnum

<div class="custom-table bordered-table">

| 代码        | 描述      |
| ----------- | --------- |
| DIRECT      | 直接支付  |
| SUBSCRIBE   | 订阅支付  |
| INSTALLMENT | 分期支付  |
| TOKEN       | token支付 |

</div>

## SubProductTypeEnum

<div class="custom-table bordered-table">

| 代码        | 描述      |
| ----------- | --------- |
| DIRECT      | 直接支付  |
| SUBSCRIBE   | 订阅支付  |
| INSTALLMENT | 分期支付  |
| TOKEN       | token支付 |
| AUTO_DEBIT  | 代扣      |

</div>

## TxnTypeEnum

<div class="custom-table bordered-table">

| 代码      | 描述                                                       |
| --------- | ---------------------------------------------------------- |
| SALE      | 支付                                                       |
| REFUND    | 退款，仅用于交易查询、异步通知                             |
| BIND_CARD | 绑定支付方式（包括卡和本地支付），仅用于交易查询、异步通知 |
| AUTH      | 预授权                                                     |
| PRE_AUTH  | 预授权                                                     |
| CAPTURE   | 预授权请款                                                 |
| VOID      | 预授权撤销                                                 |

</div>

## PaymentModeEnum

<div class="custom-table bordered-table">

| 代码             | 描述                               |
| ---------------- | ---------------------------------- |
| WEB              | 终端是通过PC浏览器打开的网站       |
| WAP              | 终端是通过移动浏览器打开的HTML页面 |
| MINI_PROGRAM     | 终端是小程序                       |
| IN_APP           | 终端是APP                          |
| OFFICIAL_ACCOUNT | 终端是公众号                       |

</div>

## OsTypeEnum

代码 描述
IOS IOS
ANDROID 安卓

<div class="custom-table bordered-table">

| 代码      | 描述  |
|---------|-----|
| IOS     | IOS |
| ANDROID | 安卓  |

</div>

## NotifyTypeEnum

<div class="custom-table bordered-table">

| 代码           | 描述       |
|--------------|----------|
| TXN          | 交易类通知    |
| REFUND_AUDIT | 退款审核结果通知 |
| CANCEL       | 取消交易通知   |
| CHARGEBACK   | 拒付通知     |

</div>

## TxnStatusEnum

<div class="custom-table bordered-table">

| 代码 | 描述             |
|----|----------------|
| S  | 交易成功           |
| F  | 交易失败 / 审核不通过   |
| P  | 交易结果未知（处理中）    |
| R  | 需要3ds验证        |
| N  | 交易被取消          |
| I  | 退款待审核/取消待处理    |
| U  | 待付款，仅在收银台支付中出现 |

</div>

## ContractStatusEnum

<div class="custom-table bordered-table">

| 代码 | 描述  |
|----|-----|
| 0  | 处理中 |
| 1  | 生效  |
| 2  | 不生效 |
| 3  | 被取消 |

</div>

## Risk3dsStrategyEnum

<div class="custom-table bordered-table">

| 代码       | 描述                       |
|----------|--------------------------|
| INNER    | 内部 3ds                   |
| EXTERNAL | 外置3ds                    |
| NONE     | 强制不使用 3ds                |
| DEFAULT  | 默认（取决于Onerway判断是否需要走3ds） |

</div>

## CustomsCodeEnum

<div class="custom-table bordered-table">

| 代码              | 描述         |
|-----------------|------------|
| GUANGZHOU       | 广州海关       |
| HANGZHOU        | 杭州海关       |
| NINGBO          | 宁波海关       |
| ZHENGZHOU_BS    | 郑州（保税物流中心） |
| CHONGQING       | 重庆海关       |
| SHANGHAI        | 上海海关       |
| SHENZHEN        | 深圳海关       |
| ZHENGZHOU_ZH_ZS | 郑州综合保税区    |
| TIANJIN         | 天津海关       |

</div>

## CredentialsTypeEnum

<div class="custom-table bordered-table">

| 代码      | 描述   |
|---------|------|
| ID_CARD | 身份证号 |

</div>

## VerifyDepartmentEnum

<div class="custom-table bordered-table">

| 代码    | 描述        |
|-------|-----------|
| CUP   | 表示清算渠道为银联 |
| NUCC  | 表示清算通道为网联 |
| OTHER | 表示清算通道为其他 |

</div>

## ChargebackStatusEnum

<div class="custom-table bordered-table">

| 代码     | 描述           |
|--------|--------------|
| NEW    | 表示发生新的拒付     |
| FA     | 在第一次申诉中      |
| FAF    | 第一次申诉失败      |
| FAS    | 第一次申诉成功      |
| FAT    | 第一次申诉超时      |
| SA     | 在第二次申诉中      |
| SAF    | 第二次申诉失败      |
| SAS    | 第二次申诉成功      |
| SAT    | 第二次申诉超时      |
| ACCEPT | 接受拒付         |
| REVOKE | 拒付被撤销        |
| DELETE | 被删除（仅用于拒付通知） |

</div>

## LanguageEnum

<div class="custom-table bordered-table">

| 代码    | 描述   |
|-------|------|
| zh-cn | 中文简体 |
| en    | 英语   |
| de    | 德语   |
| es    | 西班牙语 |
| fr    | 法语   |
| it    | 意大利语 |
| nl    | 荷兰语  |
| ko    | 韩语   |
| zh-tw | 繁体   |
| ja    | 日语   |
| th    | 泰语   |
| ar    | 阿拉伯语 |
| ru    | 俄语   |
| sv    | 瑞典语  |
| fi    | 芬兰语  |
| pt    | 葡萄牙语 |
| pl    | 波兰语  |
| no    | 挪威语  |

</div>

## ActionTypeEnum

<div class="custom-table bordered-table">

| 代码          | 描述         |
|-------------|------------|
| RedirectURL | 需要使用重定向url |
| QrCode      | 需要使用码信息    |
| ShowContext | 需要使用文本内容   |

</div>

## EciEnum

<div class="custom-table bordered-table">

| 代码 | 描述                               |
|----|----------------------------------|
| 00 | MasterCard使用。ACS服务不可用或者卡片不支持3D验证 |
| 01 | MasterCard使用。持卡人或发卡行未注册3D安全验证服务  |
| 02 | MasterCard使用。持卡人3D安全验证通过         |
| 05 | Visa使用。持卡人3D安全验证通过               |
| 06 | Visa使用。持卡人或发卡行未注册3D安全验证服务        |
| 07 | Visa使用。ACS服务不可用或者卡片不支持3D验证       |

</div>

## TokenProviderEnum

<div class="custom-table bordered-table">

| 代码        | 描述                                 |
|-----------|------------------------------------|
| GooglePay | 由GooglePay提供token，一般用于Google Pay场景 |
| ApplePay  | 由ApplePay提供token，一般用于Apple Pay场景   |

</div>

## LpmsTypeEnum

<div id="zoom-table" class="custom-table bordered-table">

| 本地支付方式类型          | 名称                  | 国家(ISO标准)                                                                                                                                                                          | 支持币种                                                  | 必填字段                                                                                              | 单笔限额                                                                                                                                            |
|-------------------|---------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Alipay+           | Alipay+             | Worldwide                                                                                                                                                                          | EUR, USD, GBP                                         | email, country                                                                                    |                                                                                                                                                 |
| WeChat            | WeChat              | GB                                                                                                                                                                                 | GBP                                                   | email, country                                                                                    |                                                                                                                                                 |
| AlipayHK          | AlipayHK            | AT, BE, BG, HR, CY, CZ, DK, EE, FI, FR, DE, GR, HU, IE, IT, LV, LT, LU, MT, NL, PL, PT, RO, SK, SI, ES, SE, IS, LI, NO, GB, CH                                                     | GBP, USD, EUR, HKD, MYR, PHP, IDR, KRW, THB, CNY      | email, country                                                                                    |                                                                                                                                                 |
| Alipay            | AlipayCN            | AT, BE, BG, HR, CY, CZ, DK, EE, FI, FR, DE, GR, HU, IE, IT, LV, LT, LU, MT, NL, PL, PT, RO, SK, SI, ES, SE, IS, LI, NO, GB, CH                                                     | EUR, GBP, USD, AUD, CNY, HKD, THB, MYR, KRW, IDR, PHP | email, country                                                                                    |                                                                                                                                                 |
| Kakao_Pay         | Kakao Pay           | AT, BE, BG, HR, CY, CZ, DK, EE, FI, FR, DE, GR, HU, IE, IT, LV, LT, LU, MT, NL, PL, PT, RO, SK, SI, ES, SE, IS, LI, NO, GB, CH                                                     | USD, GBP, EUR, KRW, HKD, MYR, PHP, IDR, CNY, THB      | email, country, phone                                                                             |                                                                                                                                                 |
| Klarna            | Klarna              | AU, AT, BE, FI, FR, DE, GR, IE, IT, NL, PT, ES, CZ, DK, NO, PL, SE, CH, GB                                                                                                         | AUD, EUR, CZK, DKK, NOK, PLN, SEK, CHF, GBP           | email, country, language, products                                                                |                                                                                                                                                 |
| Boleto            | Boleto              | BR                                                                                                                                                                                 | BRL, EUR, USD                                         | email, country, identityNumber, province, street, city, postalCode                                |                                                                                                                                                 |
| BankTransfer      | BankTransfer        | BR, PH                                                                                                                                                                             | BRL, EUR, USD, PHP                                    | email, country, identityNumber, province, street, city, postalCode, name                          |                                                                                                                                                 |
| Banrisul          | Banrisul            | BR                                                                                                                                                                                 | BRL, EUR, USD                                         | email, country, identityNumber, province, street, city, postalCode                                |                                                                                                                                                 |
| Bradesco          | Bradesco            | BR                                                                                                                                                                                 | BRL, EUR, USD                                         | email, country, identityNumber, province, street, city, postalCode                                |                                                                                                                                                 |
| Banco do Brasil   | Banco do Brasil     | BR                                                                                                                                                                                 | BRL, EUR, USD                                         | email, country, identityNumber, province, street, city, postalCode                                |                                                                                                                                                 |
| Itau              | Itau                | BR                                                                                                                                                                                 | BRL, EUR, USD                                         | email, country, identityNumber, province, street, city, postalCode                                |                                                                                                                                                 |
| MercadoPago       | MercadoPago         | BR                                                                                                                                                                                 | BRL, EUR, USD                                         | email, country, identityNumber, province, street, city, postalCode                                |                                                                                                                                                 |
| PIX               | PIX                 | BR                                                                                                                                                                                 | BRL, EUR, USD                                         | email, country, identityNumber, province, street, city, postalCode                                |                                                                                                                                                 |
| Servipag          | Servipag            | CL                                                                                                                                                                                 | CLP, EUR, USD                                         | email, country                                                                                    |                                                                                                                                                 |
| Sencillito        | Sencillito          | CL                                                                                                                                                                                 | CLP, EUR, USD                                         | email, country                                                                                    |                                                                                                                                                 |
| Webpay            | Webpay              | CL                                                                                                                                                                                 | CLP, EUR, USD                                         | email, country                                                                                    |                                                                                                                                                 |
| Multicaja         | Multicaja           | CL                                                                                                                                                                                 | CLP, EUR, USD                                         | email, country                                                                                    |                                                                                                                                                 |
| Baloto            | Baloto              | CO                                                                                                                                                                                 | COP, EUR, USD                                         | email, country                                                                                    |                                                                                                                                                 |
| EFT               | EFT                 | CO                                                                                                                                                                                 | COP, EUR, USD, PHP                                    | email, country, identityNumber, bankName                                                          |                                                                                                                                                 |
| Efecty            | Efecty              | CO                                                                                                                                                                                 | COP, EUR, USD                                         | email, country                                                                                    |                                                                                                                                                 |
| SPEI              | SPEI                | MX                                                                                                                                                                                 | MXN, USD                                              | email, country                                                                                    |                                                                                                                                                 |
| OXXO              | OXXO                | MX                                                                                                                                                                                 | MXN, USD                                              | email, country                                                                                    |                                                                                                                                                 |
| OXXOPAY           | OXXOPAY             | MX                                                                                                                                                                                 | MXN, USD                                              | email, country                                                                                    |                                                                                                                                                 |
| PagoEfectivo      | PagoEfectivo        | PE                                                                                                                                                                                 | PEN, USD                                              | email, country                                                                                    |                                                                                                                                                 |
| safetypay-cash    | safetypay-cash      | PE                                                                                                                                                                                 | PEN, USD                                              | email, country                                                                                    |                                                                                                                                                 |
| safetypay-online  | safetypay-online    | PE                                                                                                                                                                                 | PEN, USD                                              | email, country                                                                                    |                                                                                                                                                 |
| PayU              | PayU                | PL,CZ                                                                                                                                                                              | PLN, CZK                                              | email, country                                                                                    |                                                                                                                                                 |
| Przelewy24        | Przelewy24          | PL                                                                                                                                                                                 | PLN                                                   | email, country, bankName                                                                          |                                                                                                                                                 |
| safetypay-cash    | safetypay-cash      | EC                                                                                                                                                                                 | USD                                                   | email, country                                                                                    |                                                                                                                                                 |
| safetypay-online  | safetypay-online    | EC                                                                                                                                                                                 | USD                                                   | email, country                                                                                    |                                                                                                                                                 |
| Pagosnet          | Pagosnet            | BO                                                                                                                                                                                 | BOB, USD                                              | email, country                                                                                    |                                                                                                                                                 |
| SEPADD            | SEPADD              | AT, BE, BG, HR, CY, CZ, DK, EE, FI, FR, DE, GR, HU, IE, IT, LV, LT, LU, MT, NL, PL, PT, RO, SK, SI, ES, SE, IS, LI, NO, AD, SM, MC, VA, PF, TF, GI, GG, IM, JE, BL, PM, CH, GB, WF | EUR                                                   | Cashier Payment: email, country API Payment: email, country, IBAN                                 | 0.10 EUR ~ 1,000 EUR                                                                                                                            |
| Sofort            | Sofort              | AT, BE, DE, NL, ES, CH                                                                                                                                                             | EUR, CHF                                              | email, country                                                                                    |                                                                                                                                                 |
| Giropay           | Giropay             | DE                                                                                                                                                                                 | EUR                                                   | email, country                                                                                    |                                                                                                                                                 |
| iDEAL             | iDEAL               | NL                                                                                                                                                                                 | AUD, CAD, DKK, EUR, GBP, HKD, NOK, SEK, USD           | email, country                                                                                    |                                                                                                                                                 |
| Konbini           | Konbini             | JP                                                                                                                                                                                 | JPY                                                   | email, country                                                                                    |                                                                                                                                                 |
| PayEasy           | PayEasy             | JP                                                                                                                                                                                 | JPY                                                   | email, country                                                                                    |                                                                                                                                                 |
| POLi              | POLi                | AU                                                                                                                                                                                 | AUD                                                   | email, country                                                                                    |                                                                                                                                                 |
| Bancontact        | Bancontact          | BE                                                                                                                                                                                 | EUR                                                   | email, country                                                                                    |                                                                                                                                                 |
| OVO               | OVO                 | ID                                                                                                                                                                                 | IDR                                                   | email, country                                                                                    |                                                                                                                                                 |
| MyBank            | MyBank              | IT                                                                                                                                                                                 | EUR                                                   | email, country                                                                                    |                                                                                                                                                 |
| Dragonpay         | Dragonpay           | Worldwide                                                                                                                                                                          | PHP                                                   | email, country                                                                                    |                                                                                                                                                 |
| Skrill            | Skrill              | Worldwide                                                                                                                                                                          | EUR, GBP, USD                                         | email, country                                                                                    |                                                                                                                                                 |
| eNETS             | eNETS               | SG                                                                                                                                                                                 | SG                                                    | email, country                                                                                    |                                                                                                                                                 |
| PayseraWallet     | PayseraWallet       | LT, LV, EE                                                                                                                                                                         | EUR                                                   | email, country                                                                                    |                                                                                                                                                 |
| LithuanianBanks   | LithuanianBanks     | LT                                                                                                                                                                                 | EUR                                                   | email, country                                                                                    |                                                                                                                                                 |
| PaySafeCard       | PaySafeCard         | AT, AU, BE, BG, CA, CH, CY, CZ, DE, DK, ES, FI, FR, GB, GE, GI, GR, HR, HU, IE, IT, LI, LT, LU, MT, MX, NL, NZ, NO, PE, PL, PT, RO, SE, SI, SK, UY                                 | AUD, CAD, CHF, EUR, GBP, NOK, PLN, RON, SEK, USD      | email, country                                                                                    |                                                                                                                                                 |
| Paysafecash       | Paysafecash         | AT, BE, CA, CH, CY, CZ, DK, ES, FR, GB, GR, HR, HU, IE, IT, LU, LT, MT, NL, PL, PT, RO, SE, SI, SK                                                                                 | AUD, CAD, CHF, EUR, GBP, NOK, PLN, RON, SEK, USD      | email, country                                                                                    |                                                                                                                                                 |
| Payconiq          | Payconiq            | BE, NL, LU                                                                                                                                                                         | EUR                                                   | email, country                                                                                    |                                                                                                                                                 |
| Trustly           | Trustly             | DE, DK, EE, ES, FI, GB, LT, LV, NL, NO, PL, SE, SK                                                                                                                                 | DKK, EUR, GBP, NOK, PLN, SEK                          | email, country                                                                                    |                                                                                                                                                 |
| GCash             | GCash               | PH                                                                                                                                                                                 | PHP                                                   | email, identityNumber, name                                                                       | 1 PHP ~ 10000 PHP (Equivalent)                                                                                                                  |
| GrabPay           | GrabPay             | PH                                                                                                                                                                                 | PHP                                                   | email, identityNumber, name                                                                       | >= 1 PHP                                                                                                                                        |
| PayMaya           | PayMaya             | PH                                                                                                                                                                                 | PHP                                                   | email, identityNumber, name                                                                       | 1 PHP ~ 50000 PHP (Equivalent)                                                                                                                  |
| ELEVEN            | ELEVEN              | PH                                                                                                                                                                                 | PHP                                                   | email, identityNumber, name                                                                       | 1 PHP ~ 10000 PHP (Equivalent)                                                                                                                  |
| GrabPay           | GrabPay SG          | SG                                                                                                                                                                                 | SGD                                                   | country                                                                                           | Min Value: 0.01                                                                                                                                 |
| TrueMoney Wallet  | TrueMoney Wallet    | TH                                                                                                                                                                                 | THB                                                   | Cashier Payment: countryAPI Payment: country,phone                                                | Min Value: 20.00 Max Value: 100,000.00                                                                                                          |
| Rabbit_Line_pay   | Rabbit Line Pay     | TH                                                                                                                                                                                 | THB                                                   | country                                                                                           | Min Value: 20.00 Max Value: 150,000.00                                                                                                          |
| PromptPay         | PromptPay           | TH                                                                                                                                                                                 | THB                                                   | country                                                                                           | Min Value: 20.00  Max Value: 150,000.00                                                                                                         |
| KRUNGSRI_ONLINE   | Krungsri Online     | TH                                                                                                                                                                                 | THB                                                   | country                                                                                           | Min Value: 20.00  Max Value: 150,000.00                                                                                                         |
| BUALUANG_IBANKING | Bualuang iBanking   | TH                                                                                                                                                                                 | THB                                                   | country                                                                                           | Min Value: 20.Max Value: 150,000.00                                                                                                             |
| CIMB_CLICKS       | CIMB Clicks         | TH                                                                                                                                                                                 | THB                                                   | country                                                                                           | Min Value: 20.00  Max Value: 150,000.00                                                                                                         |
| K_PLUS            | K PLUS              | TH                                                                                                                                                                                 | THB                                                   | country                                                                                           | Min Value: 20.00  Max Value: 150,000.00                                                                                                         |
| MCASH             | MCASH               | MY                                                                                                                                                                                 | MYR                                                   | country                                                                                           | Min Value: 1.00                                                                                                                                 |
| TOUCH_GO_EWALLET  | Touch 'n Go eWallet | MY                                                                                                                                                                                 | MYR                                                   | country                                                                                           | Min Value: 1.00                                                                                                                                 |
| ShopeePay         | ShopeePay           | MY                                                                                                                                                                                 | MYR                                                   | country                                                                                           | Min Value: 1.00                                                                                                                                 |
| Boost             | Boost               | MY                                                                                                                                                                                 | MYR                                                   | country                                                                                           | Min Value: 1.00                                                                                                                                 |
| BNI               | BNI VA              | ID                                                                                                                                                                                 | IDR                                                   | country                                                                                           | Min Value: 1 Max Value: 10,000                                                                                                                  |
| MANDIRI           | Mandiri ATM         | ID                                                                                                                                                                                 | IDR                                                   | country                                                                                           | Min Value: 1 Max Value: 10,000                                                                                                                  |
| Maybank           | Maybank VA          | ID                                                                                                                                                                                 | IDR                                                   | country                                                                                           | Min Value: 1 Max Value: 10,000                                                                                                                  |
| PERMATA           | Permata VA          | ID                                                                                                                                                                                 | IDR                                                   | country                                                                                           | Min Value: 1 Max Value: 10,000                                                                                                                  |
| BRI               | BRI VA              | ID                                                                                                                                                                                 | IDR                                                   | country                                                                                           | Min Value: 1 Max Value: 10,000                                                                                                                  |
| CIMB              | CIMB VA             | ID                                                                                                                                                                                 | IDR                                                   | country                                                                                           | Min Value: 1 Max Value: 10,000                                                                                                                  |
| OVO               | OVO                 | ID                                                                                                                                                                                 | IDR                                                   | country                                                                                           | Min Value: 1 Max Value: 10,000                                                                                                                  |
| DANA              | DANA                | ID                                                                                                                                                                                 | IDR                                                   | country                                                                                           | Min Value: 1 Max Value: 10,000                                                                                                                  |
| QRIS              | Nobu Bank QRIS      | ID                                                                                                                                                                                 | IDR                                                   | country                                                                                           | Min Value: 1 Max Value: 10,000                                                                                                                  |
| AKULAKU           | AKULAKU             | ID                                                                                                                                                                                 | IDR                                                   | country                                                                                           | Min Value: 1 Max Value: 10,000                                                                                                                  |
| ShopeePay         | ShopeePay           | ID                                                                                                                                                                                 | IDR                                                   | country                                                                                           | Min Value: 1 Max Value: 10,000                                                                                                                  |
| Konbini           | Konbini             | JP                                                                                                                                                                                 | JPY                                                   | country                                                                                           | Min Value: 1 Max Value: 300,000                                                                                                                 |
| BankTransfer      | Bank Transfer Japan | JP                                                                                                                                                                                 | JPY                                                   | Cashier Payment: countryAPI Payment: country, firstName, lastName, jpFirstName, jpLastName ,phone | Min Value: 1                                                                                                                                    |
| PayEasy           | PayEasy             | JP                                                                                                                                                                                 | JPY                                                   | Cashier Payment: countryAPI Payment: country, firstName, lastName, jpFirstName, jpLastName ,phone | Min Value: 1 Max Value: 300,000                                                                                                                 |
| Paypay            | PayPay              | JP                                                                                                                                                                                 | JPY                                                   | country                                                                                           | Min Value: 1 Max Value: 1,000,000                                                                                                               |
| LINE_Pay          | LINE Pay            | JP                                                                                                                                                                                 | JPY                                                   | country                                                                                           | Min Value: 1 Max Value: 1,000,000                                                                                                               |
| Merpay            | merPay              | JP                                                                                                                                                                                 | JPY                                                   | country                                                                                           | Min Value: 1 Max Value: 1,000,000                                                                                                               |
| Rakuten_Pay       | Rakuten Pay         | JP                                                                                                                                                                                 | JPY                                                   | country                                                                                           | Min Value: 100 Max Value: 9,999,999                                                                                                             |
| BitCash           | Bit Cash            | JP                                                                                                                                                                                 | JPY                                                   | Cashier Payment: countryAPI Payment: country, prepaidNumber                                       | Min Value: 1 Max Value: 20,000                                                                                                                  |
| Net_Cash          | Net Cash            | JP                                                                                                                                                                                 | JPY                                                   | Cashier Payment: countryAPI Payment: country, prepaidNumber                                       | Min Value: 1 Max Value: 20,000                                                                                                                  |
| WebMoney          | Web Money           | JP                                                                                                                                                                                 | JPY                                                   | Cashier Payment: countryAPI Payment: country, prepaidNumber                                       | Min Value: 1 Max Value: 20,000                                                                                                                  |
| au                | au KDDI             | JP                                                                                                                                                                                 | JPY                                                   | country                                                                                           | Min Value: 1 Max Value: 100,000                                                                                                                 |
| SoftBank          | SoftBank            | JP                                                                                                                                                                                 | JPY                                                   | country                                                                                           | Min Value: 1 Max Value: 100,000                                                                                                                 |
| NTT_Docomo        | NTT Docomo          | JP                                                                                                                                                                                 | JPY                                                   | country                                                                                           | Min Value: 1 Max Value: 100,000                                                                                                                 |
| Paidy             | Paidy               | JP                                                                                                                                                                                 | JPY                                                   | country                                                                                           | Min Value: 1 Max Value: 1,000,000                                                                                                               |
| BLIK              | BLIK                | PL                                                                                                                                                                                 | PLN                                                   | Cashier Payment: countryAPI Payment: country, walletAccountId                                     | Minimum transaction amount: 0.01 PLN Maximum transaction amount: 50,000 PLN/transaction (most issuers have a limit of 10,000 PLN / transaction) |
| BLIK_SEAMLESS     | BLIK_Seamless       | PL                                                                                                                                                                                 | PLN                                                   | Cashier Payment: countryAPI Payment: country, walletAccountId                                     | Minimum transaction amount: 0.01 PLN Maximum transaction amount: 50,000 PLN/transaction (most issuers have a limit of 10,000 PLN / transaction) |

</div>

## EFTBankNameEnum

<div class="custom-table bordered-table">

| bankName                      | 描述                            |
|-------------------------------|-------------------------------|
| banco_agrario                 | BANCO AGRARIO                 |
| banco_av_villas               | BANCO AV VILLAS               |
| banco_bbva_colombia_s.a.      | BANCO BBVA COLOMBIA S.A.      |
| banco_caja_social             | BANCO CAJA SOCIAL             |
| banco_colpatria               | BANCO COLPATRIA               |
| banco_cooperativo_coopcentral | BANCO COOPERATIVO COOPCENTRAL |
| banco_corpbanca_s.a           | BANCO CORPBANCA S.A           |
| banco_davivienda              | BANCO DAVIVIENDA              |
| banco_de_bogota               | BANCO DE BOGOTA               |
| banco_de_occidente            | BANCO DE OCCIDENTE            |
| banco_falabella_              | BANCO FALABELLA               |
| banco_gnb_sudameris           | BANCO GNB SUDAMERIS           |
| banco_pichincha_s.a.          | BANCO PICHINCHA S.A.          |
| banco_procredit               | BANCO PROCREDIT               |
| bancolombia                   | BANCOLOMBIA                   |
| bancoomeva_s.a.               | BANCOOMEVA S.A.               |
| citibank_                     | CITIBANK                      |
| itau                          | ITAU                          |
| nequi                         | NEQUI                         |

</div>

## Przelewy24BankNameEnum

<div class="custom-table bordered-table">

| bankName | 描述                             |
|----------|--------------------------------|
| 20       | Santander-Pretzel24            |
| 26       | P_ac_ z Inteligo               |
| 31       | P_ac_ z iPKO (PKO BP)          |
| 33       | BNP Paribas                    |
| 43       | Bank PEKAO S.A.                |
| 45       | Credit Agricole                |
| 49       | ING Bank _l_ski                |
| 52       | Konto Inteligo                 |
| 53       | Bank PKO BP (iPKO)             |
| 54       | Santander                      |
| 64       | Toyota Bank                    |
| 65       | Bank PEKAO S.A.                |
| 69       | Volkswagen Bank                |
| 85       | Bank Millennium                |
| 88       | P_ac_ z Alior Bankiem          |
| 90       | Nest Bank                      |
| 95       | Credit Agricole                |
| 99       | P_ac_ z BO_                    |
| 112      | P_ac_ z ING                    |
| 119      | P_ac_ z CitiHandlowy           |
| 129      | Alior - Raty                   |
| 131      | P_ac_ z Plus Bank              |
| 136      | mBank - Raty                   |
| 141      | e-transfer Pocztowy24          |
| 143      | Banki Sp_dzielcze             |
| 144      | Bank Nowy BFG S.A.             |
| 153      | Getin Bank                     |
| 154      | BLIK                           |
| 158      | Noble Pay                      |
| 161      | P_ac_ z IdeaBank               |
| 185      | EnveloBank                     |
| 222      | NestPrzelew                    |
| 223      | BNP Paribas P_ac_ z Pl@net     |
| 243      | mBank - mTransfer              |
| 266      | P24now                         |
| 270      | mBank (Us_ugaITP)              |
| 271      | ING Bank ÅlÄski (Us_uga ITP) |
| 272      | BNP Paribas (Us_uga ITP)       |
| 274      | PKO BP (Us_uga ITP)            |
| 275      | Santander (Us_uga ITP)         |
| 279      | Inteligo (Us_uga ITP)          |
| 280      | mBank - Raty                   |

</div>

