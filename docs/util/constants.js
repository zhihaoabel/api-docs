export const ProductTypeEnum = {
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
    ]
};
export const SubProductTypeEnum = {
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
            code: 'DIRECT',
            desc: '直接支付',
        },
        {
            code: 'SUBSCRIBE',
            desc: '订阅支付',
        },
        {
            code: 'INSTALLMENT',
            desc: '分期支付',
        },
        {
            code: 'TOKEN',
            desc: 'token支付',
        },
        {
            code: 'AUTO_DEBIT',
            desc: '代扣',
        },
    ],
};
export const TxnTypeEnum = {
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
            code: 'SALE',
            desc: '支付',
        },
        {
            code: 'REFUND',
            desc: '退款',
        },
        {
            code: 'BIND_CARD',
            desc: '绑定支付方式',
        },
        {
            code: 'AUTH',
            desc: '预授权',
        },
        {
            code: 'PRE_AUTH',
            desc: '预授权',
        },
        {
            code: 'CAPTURE',
            desc: '预授权请款',
        },
        {
            code: 'VOID',
            desc: '预授权撤销',
        },
    ],

};
export const PaymentModeEnum = {
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
            code: 'WEB',
            desc: 'WEB支付',
        },
        {
            code: 'WAP',
            desc: 'WAP支付',
        },
        {
            code: 'MINI_PROGRAM',
            desc: '小程序支付',
        },
        {
            code: 'IN_APP',
            desc: 'APP支付',
        },
        {
            code: 'OFFICIAL_ACCOUNT',
            desc: '公众号支付',
        },
    ],
};
export const OsTypeEnum = {
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
            code: 'IOS',
            desc: 'IOS',
        },
        {
            code: 'ANDROID',
            desc: '安卓',
        },
    ],
};
export const Risk3dsStrategyEnum = {
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
            code: 'INNER',
            desc: '内部 3ds（强制使用 Onerway 提供的 3ds）',
        },
        {
            code: 'EXTERNAL',
            desc: '外置3ds（强制使用商家自己的3ds）',
        },
        {
            code: 'NONE',
            desc: '强制不使用 3ds',
        },
        {
            code: 'DEFAULT',
            desc: '默认（取决于Onerway判断是否需要走3ds）',
        },
    ],
};
export const LpmsTypeEnum = {
    columns: [
        {
            prop: 'type',
            label: '本地支付方式类型',
        },
        {
            prop: 'name',
            label: '名称',
        },
        {
            prop: 'countries',
            label: '国家(ISO标准)',
        },
        {
            prop: 'currencies',
            label: '支持币种',
        },
        {
            prop: 'requiredFields',
            label: '必填字段',
        },
        {
            prop: 'limit',
            label: '单笔限额',
        },
    ],
    data: [
        {
            type: 'Alipay+',
            name: 'Alipay+',
            countries: 'Worldwide',
            currencies: 'EUR, USD, GBP',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'WeChat',
            name: 'WeChat',
            countries: 'GB',
            currencies: 'GBP',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'AlipayHK',
            name: 'AlipayHK',
            countries: 'AT, BE, BG, HR, CY, CZ, DK, EE, FI, FR, DE, GR, HU, IE, IT, LV, LT, LU, MT, NL, PL, PT, RO, SK, SI, ES, SE, IS, LI, NO, GB, CH',
            currencies: 'GBP, USD, EUR, HKD, MYR, PHP, IDR, KRW, THB, CNY',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'AlipayCN',
            name: 'AlipayCN',
            countries: 'AT, BE, BG, HR, CY, CZ, DK, EE, FI, FR, DE, GR, HU, IE, IT, LV, LT, LU, MT, NL, PL, PT, RO, SK, SI, ES, SE, IS, LI, NO, GB, CH',
            currencies: 'EUR, GBP, USD, AUD, CNY, HKD, THB, MYR, KRW, IDR, PHP',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'Kakao_Pay',
            name: 'Kakao Pay',
            countries: 'AT, BE, BG, HR, CY, CZ, DK, EE, FI, FR, DE, GR, HU, IE, IT, LV, LT, LU, MT, NL, PL, PT, RO, SK, SI, ES, SE, IS, LI, NO, GB, CH',
            currencies: 'USD, GBP, EUR, KRW, HKD, MYR, PHP, IDR, CNY, THB',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'Klarna',
            name: 'Klarna',
            countries: 'AU, AT, BE, FI, FR, DE, GR, IE, IT, NL, PT, ES, CZ, DK, NO, PL, SE, CH, GB',
            currencies: 'AUD, EUR, CZK, DKK, NOK, PLN, SEK, CHF, GBP',
            requiredFields: 'email, country, language, products',
            limit: '',
        },
        {
            type: 'Boleto',
            name: 'Boleto',
            countries: 'BR',
            currencies: 'BRL, EUR, USD',
            requiredFields: 'email, country, identityNumber, province, street, city, postalCode',
            limit: '',
        },
        {
            type: 'BankTransfer',
            name: 'BankTransfer',
            countries: 'BR, PH',
            currencies: 'BRL, EUR, USD, PHP',
            requiredFields: 'email, country, identityNumber, province, street, city, postalCode, name',
            limit: '',
        },
        {
            type: 'Banrisul',
            name: 'Banrisul',
            countries: 'BR',
            currencies: 'BRL, EUR, USD',
            requiredFields: 'email, country, identityNumber, province, street, city, postalCode',
            limit: '',
        },
        {
            type: 'Bradesco',
            name: 'Bradesco',
            countries: 'BR',
            currencies: 'BRL, EUR, USD',
            requiredFields: 'email, country, identityNumber, province, street, city, postalCode',
            limit: '',
        },
        {
            type: 'Banco do Brasil',
            name: 'Banco do Brasil',
            countries: 'BR',
            currencies: 'BRL, EUR, USD',
            requiredFields: 'email, country, identityNumber, province, street, city, postalCode',
            limit: '',
        },
        {
            type: 'Itau',
            name: 'Itau',
            countries: 'BR',
            currencies: 'BRL, EUR, USD',
            requiredFields: 'email, country, identityNumber, province, street, city, postalCode',
            limit: '',
        },
        {
            type: 'MercadoPago',
            name: 'MercadoPago',
            countries: 'BR',
            currencies: 'BRL, EUR, USD',
            requiredFields: 'email, country, identityNumber, province, street, city, postalCode',
            limit: '',
        },
        {
            type: 'PIX',
            name: 'PIX',
            countries: 'BR',
            currencies: 'BRL, EUR, USD',
            requiredFields: 'email, country, identityNumber, province, street, city, postalCode',
            limit: '',
        },
        {
            type: 'Servipag',
            name: 'Servipag',
            countries: 'CL',
            currencies: 'CLP, EUR, USD',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'Sencillito',
            name: 'Sencillito',
            countries: 'CL',
            currencies: 'CLP, EUR, USD',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'Webpay',
            name: 'Webpay',
            countries: 'CL',
            currencies: 'CLP, EUR, USD',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'Multicaja',
            name: 'Multicaja',
            countries: 'CL',
            currencies: 'CLP, EUR, USD',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'Baloto',
            name: 'Baloto',
            countries: 'CO',
            currencies: 'COP, EUR, USD',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'EFT',
            name: 'EFT',
            countries: 'CO',
            currencies: 'COP, EUR, USD',
            requiredFields: 'email, country, identityNumber, bankName',
            limit: '',
        },
        {
            type: 'Efecty',
            name: 'Efecty',
            countries: 'CO',
            currencies: 'COP, EUR, USD',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'SPEI',
            name: 'SPEI',
            countries: 'MX',
            currencies: 'MXN, USD',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'OXXO',
            name: 'OXXO',
            countries: 'MX',
            currencies: 'MXN, USD',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'OXXOPAY',
            name: 'OXXOPAY',
            countries: 'MX',
            currencies: 'MXN, USD',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'MercadoPago',
            name: 'MercadoPago',
            countries: 'MX',
            currencies: 'MXN, USD',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'PagoEfectivo',
            name: 'PagoEfectivo',
            countries: 'PE',
            currencies: 'PEN, USD',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'safetypay-cash',
            name: 'safetypay-cash',
            countries: 'PE',
            currencies: 'PEN, USD',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'safetypay-online',
            name: 'safetypay-online',
            countries: 'PE',
            currencies: 'PEN, USD',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'PayU',
            name: 'PayU',
            countries: 'PL, CZ',
            currencies: 'PLN, CZK',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'Przelewy24',
            name: 'Przelewy24',
            countries: 'PL',
            currencies: 'PLN',
            requiredFields: 'email, country, bankName',
            limit: '',
        },
        {
            type: 'safetypay-cash',
            name: 'safetypay-cash',
            countries: 'EC',
            currencies: 'USD',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'safetypay-online',
            name: 'safetypay-online',
            countries: 'EC',
            currencies: 'USD',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'Pagosnet',
            name: 'Pagosnet',
            countries: 'BO',
            currencies: 'BOB, USD',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'SEPADD',
            name: 'SEPADD',
            countries: 'AT, BE, BG, HR, CY, CZ, DK, EE, FI, FR, DE, GR, HU, IE, IT, LV, LT, LU, MT, NL, PL, PT, RO, SK, SI, ES, SE, IS, LI, NO, AD, SM, MC, VA, PF, TF, GI, GG, IM, JE, BL, PM, CH, GB, WF',
            currencies: 'EUR',
            requiredFields: 'Cashier Payment: email, country<br>API Payment: email, country, IBAN',
            limit: '0.10 EUR ~ 1,000 EUR',
        },
        {
            type: 'Sofort',
            name: 'Sofort',
            countries: 'AT, BE, DE, NL, ES, CH',
            currencies: 'EUR, CHF',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'Giropay',
            name: 'Giropay',
            countries: 'DE',
            currencies: 'EUR',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'iDEAL',
            name: 'iDEAL',
            countries: 'NL',
            currencies: 'AUD, CAD, DKK, EUR, GBP, HKD, NOK, SEK, USD',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'Konbini',
            name: 'Konbini',
            countries: 'JP',
            currencies: 'JPY',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'PayEasy',
            name: 'PayEasy',
            countries: 'JP',
            currencies: 'JPY',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'POLi',
            name: 'POLi',
            countries: 'AU',
            currencies: 'AUD',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'Bancontact',
            name: 'Bancontact',
            countries: 'BE',
            currencies: 'EUR',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'OVO',
            name: 'OVO',
            countries: 'ID',
            currencies: 'IDR',
            requiredFields: 'email, country',
            limit: '',
        }, {
            type: 'MyBank',
            name: 'MyBank',
            countries: 'IT',
            currencies: 'EUR',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'Dragonpay',
            name: 'Dragonpay',
            countries: 'Worldwide',
            currencies: 'PHP',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'Skrill',
            name: 'Skrill',
            countries: 'Worldwide',
            currencies: 'EUR, GBP, USD',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'eNETS',
            name: 'eNETS',
            countries: 'SG',
            currencies: 'SG',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'PayseraWallet',
            name: 'PayseraWallet',
            countries: 'LT, LV, EE',
            currencies: 'EUR',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'LithuanianBanks',
            name: 'LithuanianBanks',
            countries: 'LT',
            currencies: 'EUR',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'PaySafeCard',
            name: 'PaySafeCard',
            countries: 'AT, AU, BE, BG, CA, CH, CY, CZ, DE, DK, ES, FI, FR, GB, GE, GI, GR, HR, HU, IE, IT, LI, LT, LU, MT, MX, NL, NZ, NO, PE, PL, PT, RO, SE, SI, SK, UY',
            currencies: 'AUD, CAD, CHF, EUR, GBP, NOK, PLN, RON, SEK, USD',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'Paysafecash',
            name: 'Paysafecash',
            countries: 'AT, BE, CA, CH, CY, CZ, DK, ES, FR, GB, GR, HR, HU, IE, IT, LU, LT, MT, NL, PL, PT, RO, SE, SI, SK',
            currencies: 'AUD, CAD, CHF, EUR, GBP, NOK, PLN, RON, SEK, USD',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'Payconiq',
            name: 'Payconiq',
            countries: 'BE, NL, LU',
            currencies: 'EUR',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'Trustly',
            name: 'Trustly',
            countries: 'DE, DK, EE, ES, FI, GB, LT, LV, NL, NO, PL, SE, SK',
            currencies: 'DKK, EUR, GBP, NOK, PLN, SEK',
            requiredFields: 'email, country',
            limit: '',
        },
        {
            type: 'GCash',
            name: 'GCash',
            countries: 'PH',
            currencies: 'PHP',
            requiredFields: 'email, identityNumber, name',
            limit: '1 PHP ~ 10000 PHP (Equivalent)',
        },
        {
            type: 'GrabPay',
            name: 'GrabPay',
            countries: 'PH',
            currencies: 'PHP',
            requiredFields: 'email, identityNumber, name',
            limit: '>= 1 PHP',
        },
        {
            type: 'PayMaya',
            name: 'PayMaya',
            countries: 'PH',
            currencies: 'PHP',
            requiredFields: 'email, identityNumber, name',
            limit: '1 PHP ~ 50000 PHP (Equivalent)',
        },
        {
            type: 'ELEVEN',
            name: 'ELEVEN',
            countries: 'PH',
            currencies: 'PHP',
            requiredFields: 'email, identityNumber, name',
            limit: '1 PHP ~ 10000 PHP (Equivalent)',
        },
        {
            type: 'GrabPay SG',
            name: 'GrabPay SG',
            countries: 'SG',
            currencies: 'SGD',
            requiredFields: 'country',
            limit: 'Min Value: 0.01',
        },
        {
            type: 'TrueMoney Wallet',
            name: 'TrueMoney Wallet',
            countries: 'TH',
            currencies: 'THB',
            requiredFields: 'Cashier Payment: country<br>API Payment: country, phone',
            limit: 'Min Value: 20.00 <br/> Max Value: 100,000.00',
        },
        {
            type: 'Rabbit_Line_pay',
            name: 'Rabbit Line Pay',
            countries: 'TH',
            currencies: 'THB',
            requiredFields: 'country',
            limit: 'Min Value: 20.00 <br/> Max Value: 150,000.00',
        },
        {
            type: 'PromptPay',
            name: 'PromptPay',
            countries: 'TH',
            currencies: 'THB',
            requiredFields: 'country',
            limit: 'Min Value: 20.00 <br/> Max Value: 150,000.00',
        },
        {
            type: 'KRUNGSRI_ONLINE',
            name: 'Krungsri Online',
            countries: 'TH',
            currencies: 'THB',
            requiredFields: 'country',
            limit: 'Min Value: 20.00 <br/> Max Value: 150,000.00',
        },
        {
            type: 'BUALUANG_IBANKING',
            name: 'Bualuang iBanking',
            countries: 'TH',
            currencies: 'THB',
            requiredFields: 'country',
            limit: 'Min Value: 20.00 <br/> Max Value: 150,000.00',
        },
        {
            type: 'CITI_POINTS',
            name: 'Pay with Points - Citi Rewards Points',
            countries: 'TH',
            currencies: 'THB',
            requiredFields: 'country',
            limit: 'Min Value: 20.00 <br/> Max Value: 150,000.00',
        },
        {
            type: 'K_PLUS',
            name: 'K PLUS',
            countries: 'TH',
            currencies: 'THB',
            requiredFields: 'country',
            limit: 'Min Value: 20.00 <br/> Max Value: 150,000.00',
        },
        {
            type: 'MCASH',
            name: 'MCASH',
            countries: 'MY',
            currencies: 'MYR',
            requiredFields: 'country',
            limit: 'Min Value: 1.00',
        },
        {
            type: 'TOUCH_GO_EWALLET',
            name: 'Touch \'n Go eWallet',
            countries: 'MY',
            currencies: 'MYR',
            requiredFields: 'country',
            limit: 'Min Value: 1.00',
        },
        {
            type: 'ShopeePay',
            name: 'ShopeePay',
            countries: 'MY',
            currencies: 'MYR',
            requiredFields: 'country',
            limit: 'Min Value: 1.00',
        },
        {
            type: 'Boost',
            name: 'Boost',
            countries: 'MY',
            currencies: 'MYR',
            requiredFields: 'country',
            limit: 'Min Value: 1.00',
        },
        {
            type: 'BNI',
            name: 'BNI VA',
            countries: 'ID',
            currencies: 'IDR',
            requiredFields: 'country',
            limit: 'Min Value: 1 <br/> Max Value: 10,000',
        },
        {
            type: 'MANDIRI',
            name: 'Mandiri ATM',
            countries: 'ID',
            currencies: 'IDR',
            requiredFields: 'country',
            limit: 'Min Value: 1 <br/> Max Value: 10,000',
        },
        {
            type: 'Maybank',
            name: 'Maybank VA',
            countries: 'ID',
            currencies: 'IDR',
            requiredFields: 'country',
            limit: 'Min Value: 1 <br/> Max Value: 10,000',
        },
        {
            type: 'PERMATA',
            name: 'Permata VA',
            countries: 'ID',
            currencies: 'IDR',
            requiredFields: 'country',
            limit: 'Min Value: 1 <br/> Max Value: 10,000',
        },
        {
            type: 'BRI',
            name: 'BRI VA',
            countries: 'ID',
            currencies: 'IDR',
            requiredFields: 'country',
            limit: 'Min Value: 1 <br/> Max Value: 10,000',
        },
        {
            type: 'CIMB',
            name: 'CIMB VA',
            countries: 'ID',
            currencies: 'IDR',
            requiredFields: 'country',
            limit: 'Min Value: 1 <br/> Max Value: 10,000',
        },
        {
            type: 'OVO',
            name: 'OVO',
            countries: 'ID',
            currencies: 'IDR',
            requiredFields: 'country',
            limit: 'Min Value: 1 <br/> Max Value: 10,000',
        },
        {
            type: 'DANA',
            name: 'DANA',
            countries: 'ID',
            currencies: 'IDR',
            requiredFields: 'country',
            limit: 'Min Value: 1 <br/> Max Value: 10,000',
        },
        {
            type: 'QRIS',
            name: 'QRIS',
            countries: 'ID',
            currencies: 'IDR',
            requiredFields: 'country',
            limit: 'Min Value: 1 <br/> Max Value: 10,000',
        },
        {
            type: 'AKULAKU',
            name: 'AKULAKU',
            countries: 'ID',
            currencies: 'IDR',
            requiredFields: 'country',
            limit: 'Min Value: 1 <br/> Max Value: 10,000',
        },
        {
            type: 'ShopeePay',
            name: 'ShopeePay',
            countries: 'ID',
            currencies: 'IDR',
            requiredFields: 'country',
            limit: 'Min Value: 1 <br/> Max Value: 10,000',
        },
        {
            type: 'Konbini',
            name: 'Konbini',
            countries: 'JP',
            currencies: 'JPY',
            requiredFields: 'country',
            limit: 'Min Value: 1 <br/> Max Value: 300,000',
        },
        {
            type: 'BankTransfer',
            name: 'Bank Transfer Japan',
            countries: 'JP',
            currencies: 'JPY',
            requiredFields: 'Cashier Payment: country<br>API Payment: country, firstName, lastName, jpFirstName, jpLastName, phone',
            limit: 'Min Value: 1',
        },
        {
            type: 'PayEasy',
            name: 'PayEasy',
            countries: 'JP',
            currencies: 'JPY',
            requiredFields: 'Cashier Payment: country<br>API Payment: country, firstName, lastName, jpFirstName, jpLastName, phone',
            limit: 'Min Value: 1 <br/> Max Value: 300,000',
        },
        {
            type: 'Paypay',
            name: 'PayPay',
            countries: 'JP',
            currencies: 'JPY',
            requiredFields: 'country',
            limit: 'Min Value: 1 <br/> Max Value: 1,000,000',
        },
        {
            type: 'LINE_Pay',
            name: 'LINE Pay',
            countries: 'JP',
            currencies: 'JPY',
            requiredFields: 'country',
            limit: 'Min Value: 1 <br/> Max Value: 1,000,000',
        },
        {
            type: 'Merpay',
            name: 'merPay',
            countries: 'JP',
            currencies: 'JPY',
            requiredFields: 'country',
            limit: 'Min Value: 1 <br/> Max Value: 1,000,000',
        },
        {
            type: 'Rakuten_Pay',
            name: 'Rakuten Pay',
            countries: 'JP',
            currencies: 'JPY',
            requiredFields: 'country',
            limit: 'Min Value: 100 <br/> Max Value: 9,999,999',
        },
        {
            type: 'BitCash',
            name: 'Bit Cash',
            countries: 'JP',
            currencies: 'JPY',
            requiredFields: 'Cashier Payment: country<br>API Payment: country, prepaidNumber',
            limit: 'Min Value: 1 <br/> Max Value: 20,000',
        },
        {
            type: 'Net_Cash',
            name: 'Net Cash',
            countries: 'JP',
            currencies: 'JPY',
            requiredFields: 'Cashier Payment: country<br>API Payment: country, prepaidNumber',
            limit: 'Min Value: 1 <br/> Max Value: 20,000',
        },
        {
            type: 'WebMoney',
            name: 'Web Money',
            countries: 'JP',
            currencies: 'JPY',
            requiredFields: 'Cashier Payment: country<br>API Payment: country, prepaidNumber',
            limit: 'Min Value: 1 <br/> Max Value: 20,000',
        },
        {
            type: 'au',
            name: 'au KDDI',
            countries: 'JP',
            currencies: 'JPY',
            requiredFields: 'country',
            limit: 'Min Value: 1 <br/> Max Value: 100,000',
        },
        {
            type: 'SoftBank',
            name: 'SoftBank',
            countries: 'JP',
            currencies: 'JPY',
            requiredFields: 'country',
            limit: 'Min Value: 1 <br/> Max Value: 100,000',
        },
        {
            type: 'NTT_Docomo',
            name: 'NTT Docomo',
            countries: 'JP',
            currencies: 'JPY',
            requiredFields: 'country',
            limit: 'Min Value: 1 <br/> Max Value: 100,000',
        },
        {
            type: 'Paidy',
            name: 'Paidy',
            countries: 'JP',
            currencies: 'JPY',
            requiredFields: 'country',
            limit: 'Min Value: 1 <br/> Max Value: 1,000,000',
        },
        {
            type: 'BLIK',
            name: 'BLIK',
            countries: 'PL',
            currencies: 'PLN',
            requiredFields: 'Cashier Payment: country API Payment: country, walletAccountId',
            limit: 'Minimum transaction amount: 0.01 PLN Maximum transaction amount: 50,000 PLN/transaction (most issuers have a limit of 10,000 PLN / transaction)',
        },
        {
            type: 'BLIK_SEAMLESS',
            name: 'BLIK_Seamless',
            countries: 'PL',
            currencies: 'PLN',
            requiredFields: 'Cashier Payment: country API Payment: country, walletAccountId',
            limit: 'Minimum transaction amount: 0.01 PLN Maximum transaction amount: 50,000 PLN/transaction (most issuers have a limit of 10,000 PLN / transaction)',
        },
    ],
};
export const Subscription = {
    columns: [
        {
            prop: 'name',
            label: '名称',
            width: 130
        },
        {
            prop: 'type',
            label: '类型',
        },
        {
            prop: 'length',
            label: '长度',
        },
        {
            prop: 'required',
            label: '必填',
        },
        {
            prop: 'sign',
            label: '签名',
        },
        {
            prop: 'desc',
            label: '描述',
            width: 250
        },
    ],
    data: [
        {
            name: 'requestType',
            type: 'String',
            length: '1',
            required: 'Yes',
            sign: 'No',
            desc: '订阅请求类型。 枚举如下：0 - 首购 1 - 复购',
        },
        {
            name: 'merchantCustId',
            type: 'String',
            length: '50',
            required: 'No',
            sign: 'No',
            desc: '商户客户id，requestType为0时必填。',
        },
        {
            name: 'expireDate',
            type: 'String',
            length: '10',
            required: 'No',
            sign: 'No',
            desc: '过期日期，requestType为0时必填，格式为yyyy-MM-dd',
        },
        {
            name: 'frequencyType',
            type: 'String',
            length: '1',
            required: 'No',
            sign: 'No',
            desc: '订阅频率类型，requestType为0时必填。枚举如下：D - 天',
        },
        {
            name: 'frequencyPoint',
            type: 'String',
            length: '2',
            required: 'No',
            sign: 'No',
            desc: '订阅频率点数，requestType为0时必填。',
        },
        {
            name: 'contractId',
            type: 'String',
            length: '20',
            required: 'No',
            sign: 'No',
            desc: '订阅合同id，requestType为1时必填。',
        },
        {
            name: 'tokenId',
            type: 'String',
            length: '300',
            required: 'No',
            sign: 'No',
            desc: '订阅令牌id，requestType为1时必填。',
        },
    ],
};
export const MpiInfo = {
    columns: [
        {
            prop: 'name',
            label: '名称',
        },
        {
            prop: 'type',
            label: '类型',
        },
        {
            prop: 'length',
            label: '长度',
        },
        {
            prop: 'required',
            label: '必填',
        },
        {
            prop: 'sign',
            label: '签名',
        },
        {
            prop: 'desc',
            label: '描述',
            width: 250
        },
    ],
    data: [
        {
            name: 'eci',
            type: 'String',
            length: '2',
            required: 'Yes',
            sign: 'No',
            desc: '责任转移',
        },
        {
            name: 'cavv',
            type: 'String',
            length: '128',
            required: 'Yes',
            sign: 'No',
            desc: '由发卡行创建',
        },
        {
            name: 'xid',
            type: 'String',
            length: '128',
            required: 'No',
            sign: 'No',
            desc: '3D-Secure v1版本Mpi交易id（与dsTransID任选其一填写）',
        },
        {
            name: 'dsTransID',
            type: 'String',
            length: '128',
            required: 'No',
            sign: 'No',
            desc: '3D-Secure v2版本Mpi交易id（与xid任选其一填写）',
        },
    ],
};
export const TxnOrderMsg = {
    columns: [
        {
            prop: 'name',
            label: '名称',
            width: 130,
        },
        {
            prop: 'type',
            label: '类型',
        },
        {
            prop: 'length',
            label: '长度',
        },
        {
            prop: 'required',
            label: '必填',
        },
        {
            prop: 'sign',
            label: '签名',
        },
        {
            prop: 'desc',
            label: '描述',
            width: 250
        },
    ],
    data: [
        {
            name: 'returnUrl',
            type: 'String',
            length: '256',
            required: 'Yes',
            sign: 'No',
            desc: '商户的回跳地址',
        },
        {
            name: 'products',
            type: 'String',
            length: '1024',
            required: 'Yes',
            sign: 'No',
            desc: '产品信息列表。 格式为 json 字符串。 例如：[{"name":"iphone11","price":"5300.00","num":"2","currency":"CNY"}, {"name":"macBook","price":"1234.00","num":"1","currency":"USD","type":"discount"}]，其中type字段的枚举如下：discount shipping_fee不传type 就是商品信息本身',
        },
        {
            name: 'transactionIp',
            type: 'String',
            length: '64',
            required: 'Yes',
            sign: 'No',
            desc: '持卡人交易IP',
        },
        {
            name: 'appId',
            type: 'String',
            length: '20',
            required: 'Yes',
            sign: 'No',
            desc: '商户应用程序 ID。 商户注册网站时，OnerWay会为商户创建一个应用id',
        },
        {
            name: 'javaEnabled',
            type: 'Boolean',
            length: '/',
            required: 'Yes',
            sign: 'No',
            desc: '持卡人浏览器是否开启java',
        },
        {
            name: 'colorDepth',
            type: 'String',
            length: '64',
            required: 'Yes',
            sign: 'No',
            desc: '持卡人屏幕色深',
        },
        {
            name: 'screenHeight',
            type: 'String',
            length: '64',
            required: 'Yes',
            sign: 'No',
            desc: '持卡人的屏幕分辨率',
        },
        {
            name: 'screenWidth',
            type: 'String',
            length: '64',
            required: 'Yes',
            sign: 'No',
            desc: '持卡人的屏幕分辨率',
        },
        {
            name: 'timeZoneOffset',
            type: 'String',
            length: '64',
            required: 'Yes',
            sign: 'No',
            desc: '持卡人浏览器的时区',
        },
        {
            name: 'accept',
            type: 'String',
            length: '2048',
            required: 'Yes',
            sign: 'No',
            desc: '持卡人浏览器的 Accept 请求头',
        },
        {
            name: 'userAgent',
            type: 'String',
            length: '2048',
            required: 'Yes',
            sign: 'No',
            desc: '持卡人的浏览器类型',
        },
        {
            name: 'contentLength',
            type: 'String',
            length: '64',
            required: 'Yes',
            sign: 'No',
            desc: '持卡人浏览器内容长度头部以外的内容长度',
        },
        {
            name: 'language',
            type: 'String',
            length: '64',
            required: 'Yes',
            sign: 'No',
            desc: '持卡人浏览器的语言',
        },
        {
            name: 'periodValue',
            type: 'String',
            length: '/',
            required: 'No',
            sign: 'No',
            desc: '分期付款期数。对应咨询分期期数接口返回的期数值。当 subProductType 为 INSTALLMENT 时必填。',
        },
        {
            name: 'notifyUrl',
            type: 'String',
            length: '256',
            required: 'No',
            sign: 'No',
            desc: '通知地址。详见通知',
        },
    ],
};
export const TransactionAddress = {
    columns: [
        {
            prop: 'name',
            label: '名称',
            width: 130,
        },
        {
            prop: 'type',
            label: '类型',
        },
        {
            prop: 'length',
            label: '长度',
        },
        {
            prop: 'required',
            label: '必填',
        },
        {
            prop: 'sign',
            label: '签名',
        },
        {
            prop: 'desc',
            label: '描述',
            width: 250
        },
    ],
    data: [
        {
            name: 'firstName',
            type: 'String',
            length: '64',
            required: 'No',
            sign: 'No',
            desc: '名',
        },
        {
            name: 'lastName',
            type: 'String',
            length: '64',
            required: 'No',
            sign: 'No',
            desc: '姓',
        },
        {
            name: 'jpFirstName',
            type: 'String',
            length: '64',
            required: 'No',
            sign: 'No',
            desc: '（日文片假名）名',
        },
        {
            name: 'jpLastName',
            type: 'String',
            length: '64',
            required: 'No',
            sign: 'No',
            desc: '（日文片假名）姓',
        },
        {
            name: 'phone',
            type: 'String',
            length: '32',
            required: 'No',
            sign: 'No',
            desc: '电话号码',
        },
        {
            name: 'email',
            type: 'String',
            length: '256',
            required: 'Yes',
            sign: 'No',
            desc: '电子邮件',
        },
        {
            name: 'postalCode',
            type: 'String',
            length: '32',
            required: 'No',
            sign: 'No',
            desc: '邮政编码',
        },
        {
            name: 'address',
            type: 'String',
            length: '256',
            required: 'No',
            sign: 'No',
            desc: '地址',
        },
        {
            name: 'country',
            type: 'String',
            length: '64',
            required: 'Yes',
            sign: 'No',
            desc: '国家。 请参考 ISO。 例如： 美国 is US',
        },
        {
            name: 'province',
            type: 'String',
            length: '64',
            required: 'No',
            sign: 'No',
            desc: '州。 当国家是美国 (US) 或加拿大 (CA) 时必填。 请参考 ISO。 例如：美属萨摩亚 is AS',
        },
        {
            name: 'city',
            type: 'String',
            length: '64',
            required: 'No',
            sign: 'No',
            desc: '城市',
        },
        {
            name: 'street',
            type: 'String',
            length: '64',
            required: 'No',
            sign: 'No',
            desc: '街道',
        },
        {
            name: 'number',
            type: 'String',
            length: '64',
            required: 'No',
            sign: 'No',
            desc: '门牌号',
        },
        {
            name: 'identityNumber',
            type: 'String',
            length: '64',
            required: 'No',
            sign: 'No',
            desc: '证件号码',
        },
        {
            name: 'birthDate',
            type: 'String',
            length: '64',
            required: 'No',
            sign: 'No',
            desc: '出生日期，格式为 yyyy/MM/dd',
        },
    ],
};
export const NotifyTypeEnum = {
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
            code: 'TXN',
            desc: '交易类通知（包括支付和退款交易）',
        },
        {
            code: 'REFUND_AUDIT',
            desc: '退款审核结果通知',
        },
        {
            code: 'CANCEL',
            desc: '取消交易通知',
        },
        {
            code: 'CHARGEBACK',
            desc: '拒付通知',
        },
    ],
};
export const LocaleEnum = {
    columns: [
        {
            prop: 'language',
            label: '语言',
        },
        {
            prop: 'desc',
            label: '描述',
        },
        {
            prop: 'supportApplePay',
            label: '是否支持Apple Pay',
        },
        {
            prop: 'supportGooglePay',
            label: '是否支持Google Pay',
        }
    ],
    data: [
        {
            language: 'ar',
            desc: '阿拉伯语',
            supportApplePay: 'YES',
            supportGooglePay: 'YES',
        },

        {
            "language": "ca",
            "desc": "Català",
            "supportApplePay": "YES",
            "supportGooglePay": "YES"
        },
        {
            "language": "cs",
            "desc": "Čeština",
            "supportApplePay": "YES",
            "supportGooglePay": "YES"
        },
        {
            "language": "da",
            "desc": "Dansk",
            "supportApplePay": "YES",
            "supportGooglePay": "YES"
        },
        {
            "language": "de",
            "desc": "Deutsch",
            "supportApplePay": "YES",
            "supportGooglePay": "YES"
        },
        {
            "language": "el",
            "desc": "Ελληνικά",
            "supportApplePay": "YES",
            "supportGooglePay": "YES"
        },
        {
            "language": "en",
            "desc": "English",
            "supportApplePay": "YES",
            "supportGooglePay": "YES"
        },
        {
            "language": "es",
            "desc": "Español",
            "supportApplePay": "YES",
            "supportGooglePay": "YES"
        },
        {
            "language": "fi",
            "desc": "Suomi",
            "supportApplePay": "YES",
            "supportGooglePay": "YES"
        },
        {
            "language": "fr",
            "desc": "Français",
            "supportApplePay": "YES",
            "supportGooglePay": "YES"
        },
        {
            "language": "hr",
            "desc": "Hrvatski",
            "supportApplePay": "YES",
            "supportGooglePay": "YES"
        },
        {
            "language": "id",
            "desc": "Bahasa Indonesia",
            "supportApplePay": "YES",
            "supportGooglePay": "YES"
        },
        {
            "language": "it",
            "desc": "Italiano",
            "supportApplePay": "YES",
            "supportGooglePay": "YES"
        },
        {
            "language": "ja",
            "desc": "日本語",
            "supportApplePay": "YES",
            "supportGooglePay": "YES"
        },
        {
            "language": "ko",
            "desc": "한국어",
            "supportApplePay": "YES",
            "supportGooglePay": "YES"
        },
        {
            "language": "ms",
            "desc": "Bahasa Melayu",
            "supportApplePay": "YES",
            "supportGooglePay": "YES"
        },
        {
            "language": "no",
            "desc": "Norsk",
            "supportApplePay": "YES",
            "supportGooglePay": "YES"
        },
        {
            "language": "nl",
            "desc": "Nederlands",
            "supportApplePay": "YES",
            "supportGooglePay": "YES"
        },
        {
            "language": "pl",
            "desc": "Polski",
            "supportApplePay": "YES",
            "supportGooglePay": "YES"
        },
        {
            "language": "pt",
            "desc": "Português",
            "supportApplePay": "YES",
            "supportGooglePay": "YES"
        },
        {
            "language": "ru",
            "desc": "Русский",
            "supportApplePay": "YES",
            "supportGooglePay": "YES"
        },
        {
            "language": "sk",
            "desc": "Slovenčina",
            "supportApplePay": "YES",
            "supportGooglePay": "YES"
        },
        {
            "language": "sv",
            "desc": "Svenska",
            "supportApplePay": "YES",
            "supportGooglePay": "YES"
        },
        {
            "language": "th",
            "desc": "ไทย",
            "supportApplePay": "YES",
            "supportGooglePay": "YES"
        },
        {
            "language": "tr",
            "desc": "Türkçe",
            "supportApplePay": "YES",
            "supportGooglePay": "YES"
        },
        {
            "language": "uk",
            "desc": "Українська",
            "supportApplePay": "YES",
            "supportGooglePay": "YES"
        },
        {
            "language": "zh",
            "desc": "简体中文",
            "supportApplePay": "YES",
            "supportGooglePay": "YES"
        },
        {
            "language": "vi",
            "desc": "Tiếng Việt",
            "supportApplePay": "YES",
            "supportGooglePay": "NO"
        },
        {
            "language": "he",
            "desc": "עברית",
            "supportApplePay": "YES",
            "supportGooglePay": "NO"
        },
        {
            "language": "hi",
            "desc": "हिन्दी",
            "supportApplePay": "YES",
            "supportGooglePay": "NO"
        },
        {
            "language": "hu",
            "desc": "Magyar",
            "supportApplePay": "NO",
            "supportGooglePay": "YES"
        },
        {
            "language": "ro",
            "desc": "Română",
            "supportApplePay": "NO",
            "supportGooglePay": "YES"
        },
        {
            "language": "zh-TW",
            "desc": "繁體中文",
            "supportApplePay": "NO",
            "supportGooglePay": "YES"
        },
        {
            "language": "bg",
            "desc": "Български",
            "supportApplePay": "NO",
            "supportGooglePay": "YES"
        },
        {
            "language": "et",
            "desc": "Eesti",
            "supportApplePay": "NO",
            "supportGooglePay": "YES"
        },
        {
            "language": "sr",
            "desc": "Српски",
            "supportApplePay": "NO",
            "supportGooglePay": "YES"
        },
        {
            "language": "sl",
            "desc": "Slovenščina",
            "supportApplePay": "NO",
            "supportGooglePay": "YES"
        }
    ]
}
