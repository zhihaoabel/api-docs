---
outline: deep
---

<script lang="ts" setup>

import {reactive, ref, watch, onMounted, unref } from 'vue'; 
import {concatedStr, requestGen, secret as secretKey} from "./util/utils";
import {LocaleEnum as LocaleEnumTable} from './util/constants';
import CMExample from './components/CMExample.vue';
import CMNote from './components/CMNote.vue';
import CustomPopover from './components/element-ui/CustomPopover.vue'; 
import CustomTable from "./components/element-ui/CustomTable.vue"; 
import {TopRight, View} from "@element-plus/icons-vue";
import { ClickOutside as vClickOutside } from 'element-plus';



const dialogVisible = ref(false);
const datetime = new Date().toLocaleString('zh', { hour12: false }).replace(/\//g, '-').replace(/上午|下午/g, '');
let merchantCustId = localStorage.getItem('merchantCustId') || 'Cust_' + Date.parse(new Date());
const merchantTxnId = localStorage.getItem('merchantTxnId') || Date.parse(new Date());

const buttonRef = ref();
const popoverRef = ref();
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
};

/*表格属性*/
const formLabelWidth = '140px';
const draggable = ref(true);

let reactives = reactive({
    directSign: '',
    tokenSign: '',
    directConcatString: '',  /* 直接支付拼接的字符串 */
    tokenConcatString: '',  /* token支付拼接的字符串 */
});

const form = reactive({
   merchantNo: localStorage.getItem('merchantNo') || '#{你的商户号}',
   appId: localStorage.getItem('appId') || '#{你的appId}',
   secret: localStorage.getItem('secret') || '',
   notifyUrl: localStorage.getItem('notifyUrl') || '#{你的回调地址}',
});

const ProductTypeEnumTable = {
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
]};
const SubProductTypeEnumTable = {
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
const TxnTypeEnumTable = {
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
const PaymentModeEnumTable = {
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
const OsTypeEnumTable = {
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
const Risk3dsStrategyEnumTable = {
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
const LpmsTypeEnum =  {
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
        },{
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
const TxnStatusEnum = {
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
            code: 'S',
            desc: '交易成功',
        },
        {
            code: 'F',
            desc: '交易失败 / 审核不通过',
        },
        {
            code: 'P',
            desc: '交易结果未知（处理中）',
        },
        {
            code: 'R',
            desc: '需要3ds验证',
        },
        {
            code: 'N',
            desc: '交易被取消',
        },
        {
            code: 'I',
            desc: '退款待审核/取消待处理',
        },
        {
            code: 'U',
            desc: '待付款，仅在收银台支付中出现',
        },
    ],
};
const EFTBankNameEnum = {
    columns: [
        {
            prop: 'bankName',
            label: '描述',
        },
    ],
    data: [
        {
            bankName: 'banco_agrario',
        },
        {
            bankName: 'banco_av_villas',
        },
        {
            bankName: 'banco_bbva_colombia_s.a.',
        },
        {
            bankName: 'banco_caja_social',
        },
        {
            bankName: 'banco_colpatria',
        },
        {
            bankName: 'banco_cooperativo_coopcentral',
        },
        {
            bankName: 'banco_corpbanca_s.a',
        },
        {
            bankName: 'banco_davivienda',
        },
        {
            bankName: 'banco_de_bogota',
        },
        {
            bankName: 'banco_de_occidente',
        },
        {
            bankName: 'banco_falabella_',
        },
        {
            bankName: 'banco_gnb_sudameris',
        },
        {
            bankName: 'banco_pichincha_s.a.',
        },
        {
            bankName: 'banco_procredit',
        },
        {
            bankName: 'bancolombia',
        },
        {
            bankName: 'bancoomeva_s.a.',
        },
        {
            bankName: 'citibank_',
        },
        {
            bankName: 'itau',
        },
        {
            bankName: 'nequi',
        },
    ],
};
const Przelewy24BankNameEnum = {
    columns: [
        {
            prop: 'bankName',
            label: '描述',
        },
    ],
    data: [
        {
            bankName: 'Santander-Pretzel24',
        },
        {
            bankName: 'P_ac_ z Inteligo',
        },
        {
            bankName: 'P_ac_ z iPKO (PKO BP)',
        },
        {
            bankName: 'BNP Paribas',
        },
        {
            bankName: 'Bank PEKAO S.A.',
        },
        {
            bankName: 'Credit Agricole',
        },
        {
            bankName: 'ING Bank _l_ski',
        },
        {
            bankName: 'Konto Inteligo',
        },
        {
            bankName: 'Bank PKO BP (iPKO)',
        },
        {
            bankName: 'Santander',
        },
        {
            bankName: 'Toyota Bank',
        },
        {
            bankName: 'Bank PEKAO S.A.',
        },
        {
            bankName: 'Volkswagen Bank',
        },
        {
            bankName: 'Bank Millennium',
        },
        {
            bankName: 'P_ac_ z Alior Bankiem',
        },
        {
            bankName: 'Nest Bank',
        },
        {
            bankName: 'Credit Agricole',
        },
        {
            bankName: 'P_ac_ z BO_',
        },
        {
            bankName: 'P_ac_ z ING',
        },
        {
            bankName: 'P_ac_ z CitiHandlowy',
        },
        {
            bankName: 'Alior - Raty',
        },
        {
            bankName: 'P_ac_ z Plus Bank',
        },
        {
            bankName: 'mBank - Raty',
        },
        {
            bankName: 'e-transfer Pocztowy24',
        },
        {
            bankName: 'Banki Sp_dzielcze',
        },
        {
            bankName: 'Bank Nowy BFG S.A.',
        },
        {
            bankName: 'Getin Bank',
        },
        {
            bankName: 'BLIK',
        },
        {
            bankName: 'Noble Pay',
        },
        {
            bankName: 'P_ac_ z IdeaBank',
        },
        {
            bankName: 'EnvelopeBank',
        },
        {
            bankName: 'NestPrzelew',
        },
        {
            bankName: 'BNP Paribas P_ac_ z Pl@net',
        },
        {
            bankName: 'mBank - mTransfer',
        },
        {
            bankName: 'P24now',
        },
        {
            bankName: 'mBank (Us_ugaITP)',
        },
        {
            bankName: 'ING Bank ÅlÄski (Us_uga ITP)',
        },
        {
            bankName: 'BNP Paribas (Us_uga ITP)',
        },
        {
            bankName: 'PKO BP (Us_uga ITP)',
        },
        {
            bankName: 'Santander (Us_uga ITP)',
        },
        {
            bankName: 'Inteligo (Us_uga ITP)',
        },
        {
            bankName: 'mBank - Raty',
        },
    ],
};
const LanguageEnum = {
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
            code: 'zh-cn',
            desc: '中文简体',
        },
        {
            code: 'en',
            desc: '英语',
        },
        {
            code: 'de',
            desc: '德语',
        },
        {
            code: 'es',
            desc: '西班牙语',
        },
        {
            code: 'fr',
            desc: '法语',
        },
        {
            code: 'it',
            desc: '意大利语',
        },
        {
            code: 'nl',
            desc: '荷兰语',
        },
        {
            code: 'ko',
            desc: '韩语',
        },
        {
            code: 'zh-tw',
            desc: '繁体',
        },
        {
            code: 'ja',
            desc: '日语',
        },
        {
            code: 'th',
            desc: '泰语',
        },
        {
            code: 'ar',
            desc: '阿拉伯语',
        },
        {
            code: 'ru',
            desc: '俄语',
        },
        {
            code: 'sv',
            desc: '瑞典语',
        },
        {
            code: 'fi',
            desc: '芬兰语',
        },
        {
            code: 'pt',
            desc: '葡萄牙语',
        },
        {
            code: 'pl',
            desc: '波兰语',
        },
        {
            code: 'no',
            desc: '挪威语',
        },
    ],
};

const Subscription ={
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
const MpiInfo =  {
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
const TxnOrderMsg = {
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
            label: '描述'
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
const TransactionInformation =  {
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
            desc: '国家。 请参考 <a class="plain-link" href="https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes">ISO 4217</a> </br> <span class="custom-example"><span class="leading-text" >例如</span><span class="custom-example">美国是 US</span></span>', 
        },
        {
            name: 'province',
            type: 'String',
            length: '64',
            required: 'No',
            sign: 'No',
            desc: '州。 当国家是美国 (US)，</br>中国 (CN) 或加拿大 (CA) 时必填。</br>请参考 <a class="plain-link" href="https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes">ISO 4217</a> </br> <span class="custom-example"><span class="leading-text" >例如</span><span class="custom-example">美属萨摩亚是 AS</span></span>',
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
            desc: '出生日期。</br>格式为 <code>yyyy/MM/dd</code>',
        },
    ],
};
const LpmsInfo = {
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
            name: 'lpmsType',
            type: 'String',
            length: '64',
            required: 'Yes',
            sign: 'No',
            desc: `本地支付方式。 请参阅 <a class="plain-link" href="./enums#lpmstypeenum">LpmsTypeEnum</a>`,
        },
        {
            name: 'bankName',
            type: 'String',
            length: '128',
            required: 'No',
            sign: 'No',
            desc: '银行名称。某些本地支付方式需要。</br> lpmsType为`EFT`时</br>请参阅 EFTBankNameEnum。</br> lpmsType为Przelewy24时</br>请参阅 Przelewy24BankNameEnum',
        },
        {
            name: 'iBan',
            type: 'String',
            length: '64',
            required: 'No',
            sign: 'No',
            desc: '银行账户，部分地区转账时需要',
        },
        {
            name: 'prepaidNumber',
            type: 'String',
            length: '/',
            required: 'No',
            sign: 'No',
            desc: '预付费卡号，部分支付方式需要',
        },
    ],
};

const directRequestBody = {
   billingInformation: "{\"firstName\":\"test\",\"lastName\":\"test\",\"phone\":\"18600000000\",\"email\":\"taoyun15@gmail.com\",\"postalCode\":\"430000\",\"address\":\"Unit 1113, 11/F, Tower 2, Cheung Sha Wan Plaza, 833 Cheung Sha Wan Road, Lai Chi Kok\",\"country\":\"CN\",\"province\":\"HB\",\"city\":\"HK\"}",
   merchantCustId: merchantCustId,
   merchantNo: form.merchantNo,
   merchantTxnId: merchantTxnId,
   merchantTxnTime: datetime,
   merchantTxnTimeZone: "+08:00",
   orderAmount: "10",
   orderCurrency: "USD",
   productType: "CARD",
   shippingInformation: "{\"firstName\":\"Shipping\",\"lastName\":\"Name\",\"phone\":\"188888888888\",\"email\":\"taoyun15@gmail.com\",\"postalCode\":\"888888\",\"address\":\"Shipping Address Test\",\"country\":\"CN\",\"province\":\"HB\",\"city\":\"WH\",\"street\":\"833 Cheung Sha Wan Road\",\"number\":\"1\",\"identityNumber\":\"82962612865\"}",
   sign: "",
   subProductType: "DIRECT",
   txnOrderMsg: {
        returnUrl: "https://www.ronhan.com/",
        notifyUrl: form.notifyUrl,
        products: "[{\"name\":\"iphone 11\",\"price\":\"5300.00\",\"num\":\"2\",\"currency\":\"CNY\"},{\"name\":\"macBook\",\"price\":\"1234.00\",\"num\":\"1\",\"currency\":\"USD\"}]",
        transactionIp: "127.0.0.1",
        appId: form.appId,
        javaEnabled:false,
        colorDepth: "24",
        screenHeight: "1080",
        screenWidth: "1920",
        timeZoneOffset: "-480",
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        contentLength: "340",
        language: null
   },
   txnType: "SALE"
};

const tokenRequestBody = {
   billingInformation: "{\"firstName\":\"test\",\"lastName\":\"test\",\"phone\":\"18600000000\",\"email\":\"taoyun15@gmail.com\",\"postalCode\":\"430000\",\"address\":\"Unit 1113, 11/F, Tower 2, Cheung Sha Wan Plaza, 833 Cheung Sha Wan Road, Lai Chi Kok\",\"country\":\"CN\",\"province\":\"HB\",\"city\":\"HK\"}",
   merchantCustId: merchantCustId,
   merchantNo: form.merchantNo,
   merchantTxnId: merchantTxnId,
   merchantTxnTime: datetime,
   merchantTxnTimeZone: "+08:00",
   orderAmount: "10",
   orderCurrency: "USD",
   productType: "CARD",
   shippingInformation: "{\"firstName\":\"Shipping\",\"lastName\":\"Name\",\"phone\":\"188888888888\",\"email\":\"taoyun15@gmail.com\",\"postalCode\":\"888888\",\"address\":\"Shipping Address Test\",\"country\":\"CN\",\"province\":\"HB\",\"city\":\"WH\",\"street\":\"833 Cheung Sha Wan Road\",\"number\":\"1\",\"identityNumber\":\"82962612865\"}",
   sign: "",
   subProductType: "TOKEN",
   txnOrderMsg: {
        returnUrl: "https://www.ronhan.com/",
        notifyUrl: form.notifyUrl,
        products: "[{\"name\":\"iphone 11\",\"price\":\"5300.00\",\"num\":\"2\",\"currency\":\"CNY\"},{\"name\":\"macBook\",\"price\":\"1234.00\",\"num\":\"1\",\"currency\":\"USD\"}]",
        transactionIp: "127.0.0.1",
        appId: form.appId,
        javaEnabled:false,
        colorDepth: "24",
        screenHeight: "1080",
        screenWidth: "1920",
        timeZoneOffset: "-480",
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        contentLength: "340",
        language: null
   },
   txnType: "SALE"
};

onMounted( async () => {
    const directRequest = await requestGen(directRequestBody, [], form.secret);
    const tokenRequest = await requestGen(tokenRequestBody, [], form.secret);
    reactives.directConcatString = await concatedStr(directRequest, []);
    reactives.tokenConcatString = await concatedStr(tokenRequest, []);
    reactives.directSign = directRequest.sign;
    reactives.tokenSign = tokenRequest.sign;
});

watch(() => form.merchantNo, (val) => {
   directRequestBody.merchantNo = val;
   localStorage.setItem('merchantNo', val);
});

watch(() => form.appId, (val) => {
   directRequestBody.txnOrderMsg.appId = val;
   localStorage.setItem('appId', val);
});

watch(() => form.secret, (val) => {
    localStorage.setItem('secret', val);
});

watch(() => form.notifyUrl, (val) => {
   directRequestBody.txnOrderMsg.notifyUrl = val;
   localStorage.setItem('notifyUrl', val);
});

function updateRequest() {
   dialogVisible.value = false;
   location.reload();
}

</script>

# JS SDK

## 接入流程

1. 下载[JS SDK](https://sandbox-v3-doc.pacypay.com/javascripts/onerway-v1.1.1.zip)
2. 引入JS SDK
3. 初始化SDK
4. 调用下单接口
5. 从下单接口响应中获取`transactionId`，拉起JS SDK收银台

### 引入JS SDK

1. 引入方式一

在需要调用JS SDK的页面中引入[JS SDK](https://sandbox-v3-doc.pacypay.com/javascripts/onerway-v1.1.1.zip)

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

### 调用下单接口 <Badge text="POST" type="tip"></Badge>

`https://sandbox-acq.onerway.com/v1/sdkTxn/doTransaction`

#### 请求参数

<div class="custom-table bordered-table">

| 名称                    | 类型     | 长度  | 必填  | 签名  | 描述                                                                                                                                                                                                                                                                                                            |
|-----------------------|--------|-----|-----|-----|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchantNo            | String | 20  | Yes | Yes | 商户号。 商户注册时，OnerWay会为商户创建商户号                                                                                                                                                                                                                                                                                   |
| merchantTxnId         | String | 64  | Yes | Yes | 商户创建的商户交易订单号。<CMNote data="不同的订单号视为不同的交易"></CMNote>                                                                                                                                                                                                                                                           |
| merchantTxnTime       | String | /   | No  | Yes | 商户交易订单发生的时间 格式为 <br/> `yyyy-MM-dd HH:mm:ss`<br/><CMExample data="2024-2-28 15:05:34"></CMExample>                                                                                                                                                                                                             |
| merchantTxnTimeZone   | String | 64  | No  | Yes | 商户交易订单发生的时区。 <br/> <CMExample data="+08:00"></CMExample>                                                                                                                                                                                                                                                      |
| merchantTxnOriginalId | String | 128 | No  | Yes | 商户原始订单号。标记商户网站上唯一订单号，可重复，同一笔订单只能支付成功一次                                                                                                                                                                                                                                                                        |
| merchantCustId        | String | 50  | No  | Yes | 客户在商户的唯一标识。<br/>                                                                                                                                                                                                                                                                                              |
| productType           | String | 16  | Yes | Yes | 产品类型。请参阅 <br/><CustomPopover title="ProductTypeEnum" width="auto" reference="ProductTypeEnum" link="/apis/enums.html#producttypeenum"><CustomTable :data="ProductTypeEnumTable.data" :columns="ProductTypeEnumTable.columns"></CustomTable></CustomPopover>                                                   |
| subProductType        | String | 16  | Yes | Yes | 子产品类型。请参阅 <br/><CustomPopover title="SubProductTypeEnum" width="auto" reference="SubProductTypeEnum" link="/apis/enums.html#subproducttypeenum" ><CustomTable :data="SubProductTypeEnumTable.data" :columns="SubProductTypeEnumTable.columns"></CustomTable></CustomPopover>                                  |
| txnType               | String | 16  | Yes | Yes | 交易类型。请参阅 <br/><CustomPopover title="TxnTypeEnum" width="auto" reference="TxnTypeEnum" link="/apis/enums.html#txntypeenum" ><CustomTable :data="TxnTypeEnumTable.data" :columns="TxnTypeEnumTable.columns"></CustomTable></CustomPopover>                                                                      |
| paymentMode           | String | 16  | No  | Yes | 支付模式。 请参阅 <br/><CustomPopover title="PaymentModeEnum" width="auto" reference="PaymentModeEnum" link="/apis/enums.html#paymentmodeenum" ><CustomTable :data="PaymentModeEnumTable.data" :columns="PaymentModeEnumTable.columns"></CustomTable></CustomPopover>。默认为WEB                                          |
| osType                | String | 16  | No  | Yes | 操作系统类型。 请参阅 <br/><CustomPopover title="OsTypeEnumTable" width="auto" reference="OsTypeEnum" link="/apis/enums.html#ostypeenum" ><CustomTable :data="OsTypeEnumTable.data" :columns="OsTypeEnumTable.columns"></CustomTable></CustomPopover>。<br/><CMNote data="paymentMode不是WEB时必填" />                        |
| orderAmount           | String | 19  | Yes | Yes | 交易订单金额                                                                                                                                                                                                                                                                                                        |
| orderCurrency         | String | 8   | Yes | Yes | 交易订单的货币。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) 货币代码                                                                                                                                                                                                          |
| originTransactionId   | String | 20  | No  | Yes | 来源于Onerway的原始交易订单号，常用于退款等反向交易时通过此ID查找对应的交易订单号                                                                                                                                                                                                                                                                 |
| risk3dsStrategy       | String | 16  | No  | Yes | 3ds风险控制策略。 请参阅 <br/><CustomPopover title="Risk3dsStrategyEnum" width="auto" reference="Risk3dsStrategyEnum" link="/apis/enums.html#risk3dsstrategyenum" ><CustomTable :data="Risk3dsStrategyEnumTable.data" :columns="Risk3dsStrategyEnumTable.columns"></CustomTable></CustomPopover>                        |
| subscription          | String | /   | No  | Yes | 订阅付款所需的订阅信息。 格式为 json 字符串。 请参阅对象 <br/><CustomPopover title="Subscription" width="auto" reference="Subscription" link="/apis/js-sdk.html#subscription" ><CustomTable :data="Subscription.data" :columns="Subscription.columns"></CustomTable></CustomPopover>                                                  |
| mpiInfo               | String | /   | No  | Yes | mpi信息，3ds验证结果集。`risk3dsStrategy` 为 `EXTERNAL` 时需要。 格式为 json 字符串。 请参阅对象 <CustomPopover title="MpiInfo" width="auto" reference="MpiInfo" link="/apis/js-sdk.html#mpiinfo" ><CustomTable :data="MpiInfo.data" :columns="MpiInfo.columns"></CustomTable></CustomPopover>                                          |
| txnOrderMsg           | String | /   | No  | Yes | 交易业务信息，除订阅复购外必填。 格式为 json 字符串。 请参阅对象 <CustomPopover title="TxnOrderMsg" width="auto" reference="TxnOrderMsg" link="/apis/js-sdk.html#txnordermsg" ><CustomTable :data="TxnOrderMsg.data" :columns="TxnOrderMsg.columns"></CustomTable></CustomPopover>                                                        |
| billingInformation    | String | /   | No  | Yes | 交易账单信息，除订阅复购外必填。 格式为 json 字符串。 请参阅对象 <CustomPopover title="TransactionInformation" width="auto" reference="TransactionInformation" link="/apis/js-sdk.html#transactioninformation" ><CustomTable :data="TransactionInformation.data" :columns="TransactionInformation.columns"></CustomTable></CustomPopover> |
| shippingInformation   | String | /   | No  | Yes | 交易邮寄信息，除订阅复购外必填。 格式为 json 字符串。 请参阅对象 <CustomPopover title="TransactionInformation" width="auto" reference="TransactionInformation" link="/apis/js-sdk.html#transactioninformation" ><CustomTable :data="TransactionInformation.data" :columns="TransactionInformation.columns"></CustomTable></CustomPopover> |
| lpmsInfo              | String | /   | No  | Yes | 本地支付方式信息，`productType` 为 `LPMS` 时必填，格式为json字符串。 请参阅对象 <CustomPopover title="LpmsInfo" width="auto" reference="LpmsInfo" link="/apis/js-sdk.html#lpmsinfo" ><CustomTable :data="LpmsInfo.data" :columns="LpmsInfo.columns"></CustomTable></CustomPopover>                                                      |
| sign                  | String | /   | Yes | No  | 签名字符串，请参阅  签名字符串，请参阅[Sign](./sign.html)                                                                                                                                                                                                                                                                       |

</div>

###### Subscription

<div class="custom-table bordered-table">

| 名称             | 类型     | 长度  | 必填  | 签名 | 描述                                                     |
|----------------|--------|-----|-----|----|--------------------------------------------------------|
| requestType    | String | 1   | Yes | No | 订阅请求类型。<br/>枚举如下：**0 - 首购 1 - 复购**                     |
| merchantCustId | String | 50  | No  | No | 商户客户id。<br/><CMNote data="requestType为0时必填。"></CMNote> |
| expireDate     | String | 10  | No  | No | 过期日期。<br/><CMNote data="requestType为0时必填。"></CMNote>   |
| frequencyType  | String | 1   | No  | No | 订阅频率类型。<br/><CMNote data="requestType为0时必填。"></CMNote> |
| frequencyPoint | String | 2   | No  | No | 订阅频率点数。<br/><CMNote data="requestType为0时必填。"></CMNote> |
| contractId     | String | 20  | No  | No | 订阅合同id。<br/><CMNote data="requestType为1时必填。"></CMNote> |
| tokenId        | String | 300 | No  | No | 订阅令牌id。<br/><CMNote data="requestType为1时必填。"></CMNote> |

</div>

###### MpiInfo

<div class="custom-table bordered-table">

<CustomTable :data="MpiInfo.data" :columns="MpiInfo.columns"></CustomTable>


</div>

###### TxnOrderMsg

<div class="custom-table bordered-table">

| 名称             | 类型      | 长度   | 必填  | 签名 | 描述                                                                                                                                                                                                                                                                                                                    |
|----------------|---------|------|-----|----|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| returnUrl      | String  | 256  | Yes | No | 商户的回跳地址                                                                                                                                                                                                                                                                                                               |
| products       | String  | 1024 | Yes | No | 产品信息列表。 格式为 json 字符串。<br/><CMExample data='<br/>[{"name":"iphone11",<br/>"price":"5300.00","num":"2",<br/>"currency":"CNY"}, {"name":"macBook","price":"1234.00",<br/>"num":"1","currency":"USD",<br/>"type":"discount"}]'></CMExample><br/><CMNote data="type字段的枚举如下：discount shipping_fee不传type 就是商品信息本身"></CMNote> |
| transactionIp  | String  | 64   | Yes | No | 持卡人交易IP                                                                                                                                                                                                                                                                                                               |
| appId          | String  | 20   | Yes | No | 商户应用程序 ID。 商户注册网站时，OnerWay会为商户创建一个应用id                                                                                                                                                                                                                                                                                |
| javaEnabled    | Boolean | /    | Yes | No | 持卡人浏览器是否开启java                                                                                                                                                                                                                                                                                                        |
| colorDepth     | String  | 64   | Yes | No | 持卡人屏幕色深                                                                                                                                                                                                                                                                                                               |
| screenHeight   | String  | 64   | Yes | No | 持卡人的屏幕分辨率                                                                                                                                                                                                                                                                                                             |
| screenWidth    | String  | 64   | Yes | No | 持卡人的屏幕分辨率                                                                                                                                                                                                                                                                                                             |
| timeZoneOffset | String  | 64   | Yes | No | 持卡人浏览器的时区                                                                                                                                                                                                                                                                                                             |
| accept         | String  | 2048 | Yes | No | 持卡人浏览器的 `Accept` 请求头                                                                                                                                                                                                                                                                                                  |
| userAgent      | String  | 2048 | Yes | No | 持卡人的浏览器类型                                                                                                                                                                                                                                                                                                             |
| contentLength  | String  | 64   | Yes | No | 持卡人浏览器内容长度头部以外的内容长度                                                                                                                                                                                                                                                                                                   |
| language       | String  | 64   | Yes | No | 持卡人浏览器的语言                                                                                                                                                                                                                                                                                                             |
| periodValue    | String  | /    | No  | No | 分期付款期数。对应[咨询分期期数接口](./installment.md)返回的期数值。当 `subProductType` 为 `INSTALLMENT` 时必填。                                                                                                                                                                                                                                   |
| notifyUrl      | String  | 256  | No  | No | 通知地址。详见通知                                                                                                                                                                                                                                                                                                             |

[//]: # (todo: periodValue描述分期接口链接待补充)
</div>

##### TransactionInformation

<div class="custom-table bordered-table">

<CustomTable :data="TransactionInformation.data" :columns="TransactionInformation.columns"></CustomTable>

</div>

##### LpmsInfo

<div class="custom-table bordered-table">

| 名称            | 类型     | 长度  | 必填  | 签名 | 描述                                                                                                                                                                                                                                                                                                                                                                          |
|---------------|--------|-----|-----|----|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| lpmsType      | String | 64  | Yes | No | 本地支付方式。 请参阅 [LpmsTypeEnum  ](./enums#lpmstypeenum)                                                                                                                                                                                                                                                                                                                          |
| bankName      | String | 128 | No  | No | 银行名称，某些本地支付方式需要。`lpmsType` 为`EFT`时请参阅 <br/><CustomPopover title="EFTBankNameEnum" width="auto" reference="EFTBankNameEnum" link="/apis/enums.html#eftbanknameenum"><CustomTable :data="EFTBankNameEnum.data" :columns="EFTBankNameEnum.columns"></CustomTable></CustomPopover>。<br/>`lpmsType` 为 `Przelewy24` 时请参阅 [Przelewy24BankNameEnum](./enums#przelewy24banknameenum) |
| iBan          | String | 64  | No  | No | 银行账户，部分地区转账时需要                                                                                                                                                                                                                                                                                                                                                              |
| prepaidNumber | String | /   | No  | No | 预付费卡号，部分支付方式需要                                                                                                                                                                                                                                                                                                                                                              |

</div>

#### 响应参数

<div class="custom-table">

| 名称       | 类型     | 签名 | 描述                                |
|----------|--------|----|-----------------------------------|
| respCode | String | No | 来自 Onerway 的响应码                   |
| respMsg  | String | No | 来自 Onerway 的响应信息                  |
| data     | Map    | No | 响应数据。 请参阅对象 [data](./js-sdk#data) |

</div>

##### data

<div class="custom-table bordered-table">

| 名称            | 签名  | 类型     | 描述                                                                                                                                                                                                                                         |
|---------------|-----|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| transactionId | Yes | String | Onerway创建的交易订单号。商户下单时的订单号                                                                                                                                                                                                                  |
| responseTime  | Yes | String | 接口响应时间。格式为yyyy-MM-dd HH:mm:ss                                                                                                                                                                                                              |
| txnTime       | Yes | String | 交易完成时间。格式为yyyy-MM-dd HH:mm:ss                                                                                                                                                                                                              |
| txnTimeZone   | Yes | String | 交易完成时区。<CMExample data="+08:00" />                                                                                                                                                                                                         |
| orderAmount   | Yes | String | 交易订单金额                                                                                                                                                                                                                                     |
| orderCurrency | Yes | String | 交易订单币种。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) 货币代码                                                                                                                                        |
| txnAmount     | Yes | String | 订单金额转换成结算币种后的金额                                                                                                                                                                                                                            |
| txnCurrency   | Yes | String | 结算币种。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) 货币代码                                                                                                                                          |
| status        | Yes | String | 交易处理结果。 请参阅 <br/><CustomPopover title="TxnStatusEnum" width="auto" reference="TxnStatusEnum" link="/apis/enums.html#txnstatusenum"><CustomTable :data="TxnStatusEnum.data" :columns="TxnStatusEnum.columns"></CustomTable></CustomPopover> |
| redirectUrl   | Yes | String | 当交易状态为R时，商户需要重定向到该URL完成部分交易，包括3ds验证、本地支付收银等                                                                                                                                                                                                |
| periodValue   | No  | String | 分期付款期数                                                                                                                                                                                                                                     |
| contractId    | Yes | String | 订阅合同id。首购时返回                                                                                                                                                                                                                               |
| tokenId       | Yes | String | 订阅令牌id。首购时返回                                                                                                                                                                                                                               |
| eci           | Yes | String | 责任转移                                                                                                                                                                                                                                       |
| sign          | No  | String | 签名字符串，请参阅  签名字符串，请参阅[Sign](./sign.html)                                                                                                                                                                                                                                        |

</div>

#### 请求和响应示例

::: tip 自动生成签名
点击 <el-button class="dialog-button my-3" plain @click="dialogVisible = true">自动生成签名</el-button> 按钮，填入商户号, appId, 密钥即可自动生成签名
:::

<div class="custom-dialog">

  <el-dialog v-model="dialogVisible" draggable=draggable title="商户信息" width="500">
    <el-form :model="form">
      <el-form-item label="商户号" :label-width="formLabelWidth">
        <el-input v-model="form.merchantNo" autocomplete="off" placeholder="Enter your merchantNo"></el-input>
      </el-form-item>
      <el-form-item label="App ID" :label-width="formLabelWidth">
        <el-input v-model="form.appId" autocomplete="off" placeholder="Enter your appId"></el-input>
      </el-form-item>
      <el-form-item label="Secret" :label-width="formLabelWidth">
        <el-input v-model="form.secret" type="password" placeholder="Enter your secret" show-password autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="异步回调通知地址" :label-width="formLabelWidth">
        <el-input v-model="form.notifyUrl" placeholder="Url for getting notifications" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="updateRequest">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>

</div>

##### 直接下单请求示例

::: code-group

```json-vue [直接下单请求.json]
{
  "billingInformation": "{\"firstName\":\"test\",\"lastName\":\"test\",\"phone\":\"18600000000\",\"email\":\"taoyun15@gmail.com\",\"postalCode\":\"430000\",\"address\":\"Unit 1113, 11/F, Tower 2, Cheung Sha Wan Plaza, 833 Cheung Sha Wan Road, Lai Chi Kok\",\"country\":\"CN\",\"province\":\"HB\",\"city\":\"HK\"}",
  "merchantCustId": "{{merchantCustId}}",
  "merchantNo": "{{form.merchantNo}}", // [!code highlight]
  "merchantTxnId": {{merchantTxnId}},
  "merchantTxnTime": "{{datetime}}",
  "merchantTxnTimeZone": "+08:00",
  "orderAmount": "10",
  "orderCurrency": "USD",
  "productType": "CARD",
  "shippingInformation": "{\"firstName\":\"Shipping\",\"lastName\":\"Name\",\"phone\":\"188888888888\",\"email\":\"taoyun15@gmail.com\",\"postalCode\":\"888888\",\"address\":\"Shipping Address Test\",\"country\":\"CN\",\"province\":\"HB\",\"city\":\"WH\",\"street\":\"833 Cheung Sha Wan Road\",\"number\":\"1\",\"identityNumber\":\"82962612865\"}",
  "sign": "{{reactives.directSign}}", // [!code highlight]
  "subProductType": "DIRECT",
  "txnOrderMsg": "{\"returnUrl\":\"https://www.ronhan.com/\",\"notifyUrl\":\"{{form.notifyUrl}}\",\"products\":\"[{\\\"name\\\":\\\"iphone 11\\\",\\\"price\\\":\\\"5300.00\\\",\\\"num\\\":\\\"2\\\",\\\"currency\\\":\\\"CNY\\\"},{\\\"name\\\":\\\"macBook\\\",\\\"price\\\":\\\"1234.00\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\"}]\",\"transactionIp\":\"127.0.0.1\",\"appId\":\"{{form.appId}}\",\"javaEnabled\":false,\"colorDepth\":\"24\",\"screenHeight\":\"1080\",\"screenWidth\":\"1920\",\"timeZoneOffset\":\"-480\",\"accept\":\"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36\",\"contentLength\":\"340\",\"language\":null}", // [!code highlight]
  "txnType": "SALE"
}
```

```json-vue [直接下单响应.json]
{
   "respCode": "20000",
   "respMsg": "Success",
   "data": {
      "transactionId": "#{流水号}", // [!code highlight]
      "responseTime": "{{datetime}}",
      "txnTime": null,
      "txnTimeZone": "+08:00",
      "orderAmount": "10.00",
      "orderCurrency": "USD",
      "txnAmount": null,
      "txnCurrency": null,
      "status": "U",
      "redirectUrl": null,
      "contractId": null,
      "tokenId": null,
      "eci": null,
      "periodValue": null,
      "codeForm": null,
      "presentContext": null,
      "redirectType": null,
      "sign": "a2dde1fd7bc46dc1b87d3bd14707dd85c6750569bbe60025d9821c3bbf13cbab"
   }
}
```

:::

::: details 点击查看拼接的字符串（不含密钥）

```json-vue
{{reactives.directConcatString}}
```

:::

##### TOKEN下单请求示例

::: code-group

```json-vue [Token下单请求.json]
{
  "billingInformation": "{\"firstName\":\"test\",\"lastName\":\"test\",\"phone\":\"18600000000\",\"email\":\"taoyun15@gmail.com\",\"postalCode\":\"430000\",\"address\":\"Unit 1113, 11/F, Tower 2, Cheung Sha Wan Plaza, 833 Cheung Sha Wan Road, Lai Chi Kok\",\"country\":\"CN\",\"province\":\"HB\",\"city\":\"HK\"}",
  "merchantCustId": "{{merchantCustId}}",
  "merchantNo": "{{form.merchantNo}}", // [!code highlight]
  "merchantTxnId": {{merchantTxnId}},
  "merchantTxnTime": "{{datetime}}",
  "merchantTxnTimeZone": "+08:00",
  "orderAmount": "10",
  "orderCurrency": "USD",
  "productType": "CARD",
  "shippingInformation": "{\"firstName\":\"Shipping\",\"lastName\":\"Name\",\"phone\":\"188888888888\",\"email\":\"taoyun15@gmail.com\",\"postalCode\":\"888888\",\"address\":\"Shipping Address Test\",\"country\":\"CN\",\"province\":\"HB\",\"city\":\"WH\",\"street\":\"833 Cheung Sha Wan Road\",\"number\":\"1\",\"identityNumber\":\"82962612865\"}",
  "sign": "{{reactives.tokenSign}}", // [!code highlight]
  "subProductType": "TOKEN",
  "txnOrderMsg": "{\"returnUrl\":\"https://www.ronhan.com/\",\"notifyUrl\":\"{{form.notifyUrl}}\",\"products\":\"[{\\\"name\\\":\\\"iphone 11\\\",\\\"price\\\":\\\"5300.00\\\",\\\"num\\\":\\\"2\\\",\\\"currency\\\":\\\"CNY\\\"},{\\\"name\\\":\\\"macBook\\\",\\\"price\\\":\\\"1234.00\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\"}]\",\"transactionIp\":\"127.0.0.1\",\"appId\":\"{{form.appId}}\",\"javaEnabled\":false,\"colorDepth\":\"24\",\"screenHeight\":\"1080\",\"screenWidth\":\"1920\",\"timeZoneOffset\":\"-480\",\"accept\":\"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36\",\"contentLength\":\"340\",\"language\":null}", // [!code highlight]
  "txnType": "SALE"
}
```

```json-vue [Token下单响应.json]
{
   "respCode": "20000",
   "respMsg": "Success",
   "data": {
      "transactionId": "#{流水号}", // [!code highlight]
      "responseTime": "{{datetime}}",
      "txnTime": null,
      "txnTimeZone": "+08:00",
      "orderAmount": "10.00",
      "orderCurrency": "USD",
      "txnAmount": null,
      "txnCurrency": null,
      "status": "U",
      "redirectUrl": null,
      "contractId": null,
      "tokenId": null,
      "eci": null,
      "periodValue": null,
      "codeForm": null,
      "presentContext": null,
      "redirectType": null,
      "sign": "a2dde1fd7bc46dc1b87d3bd14707dd85c6750569bbe60025d9821c3bbf13cbab"
   }
}
```

:::

::: details 点击查看拼接的字符串（不含密钥）

```json-vue
{{reactives.tokenConcatString}}
```

:::

### 拉起JS SDK收银台

```ts
new Pacypay(transactionId, options);
```

### 参考代码

#### 1. 收银台

```js
const transactionId = '1544197674849067008'; //当前交易ID 
const pacypay = new Pacypay(transactionId, {
    locale: 'zh-cn', // en zh-cn ar de es fi fr it ja ko nl no pl pt ru sv th zh-tw
    environment: 'sandbox', // sandbox、production
    config: {
        subProductType: 'DIRECT', // DIRECT-直接支付，TOKEN-token绑卡并支付（必须和下单接口中subProductType值保持一致）
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
        if (respCode === '20000') { // respCode 为 20000 表示交易正常
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

#### 2. ApplePay/GooglePay

```javascript
const transactionId = '1544197674849067008'; //当前交易ID
options = {
    container: 'pacypay_checkout', // 按钮嵌入的容器
    locale: "zh", // 支持语言
    environment: 'sandbox', // sandbox、production
    mode: ['GooglePay'], // GooglePay、ApplePay
    config: {
        googlePayButtonType: 'buy', // 'book' | 'buy' | 'checkout' | 'donate' | 'order' | 'pay' | 'plain' | 'subscribe'
        googlePayButtonColor: 'black', // 'black' | 'white'
        applePayButtonType: 'buy', // 'add-money' | 'book' | 'buy' | 'check-out' | 'continue' | 'contribute' | 'donate' | 'order' | 'plain' | 'reload' | 'rent' | 'subscribe' | 'support' | 'tip' | 'top-up' | 'pay'
        applePayButtonColor: 'black',  // 'black' | 'white' | 'white-outline'
        googlePayEnvironment: 'TEST', // TEST PRODUCTION
        buttonWidth: '100px', // 按钮宽度
        buttonHeight: '40px', // 按钮高度
        buttonRadius: '4px', // 按钮圆角边框
    },
    onPaymentCompleted: function (res) { // 成功支付后回调方法
        const txtInfo = res.data; // 返回交易结果详情
        const respCode = res.respCode; // 响应码
        const respMsg = res.respMsg; // 响应信息
        if (respCode === '20000') { // respCode 为 20000 表示交易正常
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

#### 字段说明

<div class="custom-table">

| 属性            | 类型     | 必填  | 说明                                    |          
|---------------|--------|-----|---------------------------------------|
| transactionId | string | Yes | 商户通过 [下单接口](./js-sdk#调用下单接口) 获取到的交易ID |
| options       | object | Yes | 详见以下 [options](./js-sdk#options) 说明   |

</div>

##### options

<div class="custom-table">

| 属性                 | 类型       | 必填 | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|--------------------|----------|----|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| container          | string   | No | 容器id,默认pacypay_checkout                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| locale             | string   | No | 语言类型。1. 收银台集成：详见 <CustomPopover title="LanguageEnum" width="auto" reference="LanguageEnum" link="/apis/enums.html#languageenum"><CustomTable :data="LanguageEnum.data" :columns="LanguageEnum.columns"> </CustomTable></CustomPopover>。2. ApplePay、GooglePay集成：详见 <CustomPopover title="LocaleEnum" width="auto" reference="LocaleEnum" link="/apis/js-sdk.html#locale" > <CustomTable :data="LocaleEnumTable.data" :columns="LocaleEnumTable.columns"></CustomTable> </CustomPopover> |
| environment        | string   | No | 环境类型，`sandbox`, 默认为 `production`                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| mode               | array    | No | 支付方式，支持 `ApplePay`、`GooglePay`。集成 `ApplePay`、`GooglePay`时必填                                                                                                                                                                                                                                                                                                                                                                                                                            |
| config             | object   | No | 配置项，详见以下 [config](./js-sdk#config) 说明                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| onPaymentCompleted | function | No | 请求成功完成回调方法                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| onError            | function | No | 请求异常回调方法                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

</div>

##### locale

<div class="custom-table bordered-table">

| 语言 | 描述     | 是否支持Apple Pay | 是否支持Google Pay |
|----|--------|---------------|----------------|
| ar | 阿拉伯语   | 是             | 是              |
| ca | 加泰罗尼亚语 | 是             | 是              |
| cs | 捷克语    | 是             | 是              |
| da | 丹麦语    | 是             | 是              |
| de | 德语     | 是             | 是              |
| el | 希腊语    | 是             | 是              |
| en | 英语     | 是             | 是              |
| es | 西班牙语   | 是             | 是              |
| fi | 芬兰语    | 是             | 是              |
| fr | 法语     | 是             | 是              |
| hr | 克罗地亚语  | 是             | 是              |
| id | 印度尼西亚语 | 是             | 是              |
| it | 意大利语   | 是             | 是              |
| ja | 日语     | 是             | 是              |
| ko | 韩语     | 是             | 是              |
| ms | 马来语    | 是             | 是              |
| no | 挪威语    | 是             | 是              |
| nl | 荷兰语    | 是             | 是              |
| pl | 波兰语    | 是             | 是              |
| pt | 葡萄牙语   | 是             | 是              |
| ru | 俄语     | 是             | 是              |
| sk | 斯洛伐克语  | 是             | 是              |
| sv | 瑞典语    | 是             | 是              |

</div>

##### config

<div class="custom-table bordered-table">

| 属性                        | 类型      | 必填 |   | 说明                                                                |
|---------------------------|---------|----|:--|-------------------------------------------------------------------|
| checkoutTheme             | string  | No |   | 主题类型。`light`、`dark`                                               |
| customCssURL              | string  | No |   | 自定义样式链接地址。配置后，`checkoutTheme` 值无效                                 |
| variables                 | object  | No |   | 自定义主题色。详见以下 [variables](./js-sdk#variables) 说明                    |
| styles                    | object  | No |   | 自定义样式。详见以下 [styles](./js-sdk#styles) 说明                           |
| showPayButton             | boolean | No |   | 默认为 `true`。如果设为 `false` 可自定义支付行为和展示账单信息，请参阅 [补充说明](./js-sdk#补充说明) |
| buttonSeparation          | boolean | No |   | 默认为 `true`。`true`：绑卡与支付按钮分开操作；`false`:绑卡与支付一步完成；                  |
| displayBillingInformation | boolean | No |   | 默认为 `true`。`true`：显示账单信息；`false` ：隐藏账单信息，需通过自定义支付按钮传入账单信息         |

</div>

##### ApplePay/GooglePay

<div class="custom-table bordered-table">

| 属性                   | 类型     | 必填 | 说明                                                                                                                                                                  |
|----------------------|--------|----|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| googlePayButtonType  | string | No | `Google Pay`按钮类型，支持 `book`、`buy`、`checkout`、`donate`、`order`、`pay`、`plain`、`subscribe`                                                                              |
| googlePayButtonColor | string | No | `Google Pay`按钮主题，支持 `black`、`white`                                                                                                                                 |
| googlePayEnvironment | string | No | `Google Pay`环境，支持 `TEST`、`PRODUCTION`                                                                                                                               |
| applePayButtonType   | string | No | `Apple Pay`按钮类型，支持 `add-money`、`book`、`buy`、`check-out`、`continue`、`contribute`、`donate`、`order`、`plain`、`reload`、`rent`、`subscribe`、`support`、`tip`、`top-up`、`pay` |
| applePayButtonColor  | string | No | `Apple Pay`按钮主题，支持 `black`、`white`、`white-outline`                                                                                                                  |
| buttonWidth          | string | No | 按钮宽度，例如: `200px`                                                                                                                                                    |
| buttonHeight         | string | No | 按钮高度，例如: `40px`                                                                                                                                                     |
| buttonRadius         | string | No | 按钮圆角边框，例如: `4px`                                                                                                                                                    |

</div>

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

| 属性	                                            | 类型	     | 必填	 | 说明            |
|------------------------------------------------|---------|-----|---------------|
| .pacypay-checkout__payment-method	             | object	 | 否	  | 收银台支付方式容器     |
| .pacypay-checkout_payment-method_header	       | object	 | 否	  | 标题栏           |
| .pacypay-checkout_payment-methodheader_title	  | object	 | 否	  | 标题栏名称         |
| .pacypay-checkout_payment-methodimage_wrapper	 | object	 | 否	  | 标题栏图片容器       |
| .pacypay-checkout_payment-method_brands	       | object	 | 否	  | 标题栏右侧银行卡类型容器  |
| .pacypay-checkout_payment-method_image	        | object	 | 否	  | 标题栏图片         |
| .pacypay-checkout_payment-method_brand	        | object	 | 否	  | 标题栏右侧银行卡图片    |
| .pacypay-checkout_payment-method_name	         | object	 | 否	  | 标题栏标题名称       |
| .pacypay-checkout_payment-method_details	      | object	 | 否	  | 表单内容容器        |
| .pacypay-checkout__field-wrapper	              | object	 | 否	  | 表单项容器         |
| .pacypay-checkout__field	                      | object	 | 否	  | 标题栏右侧银行卡图片    |
| .pacypay-checkout_payment-method_brand	        | object	 | 否	  | 表单项           |
| .pacypay-checkout__field--cardNumber	          | object	 | 否	  | 表单项--卡号       |
| .pacypay-checkout__field--expire	              | object	 | 否	  | 表单项--到期时间     |
| .pacypay-checkout__field--cvv	                 | object	 | 否	  | 表单项--CVV      |
| .pacypay-checkout__field--lastName	            | object	 | 否	  | 表单项--name     |
| .pacypay-checkout__label-text	                 | object	 | 否	  | 表单项标题         |
| .pacypay-checkout__label-text--require	        | object	 | 否	  | 表单项标题必填标识     |
| .pacypay-checkout__input	                      | object	 | 否	  | 表单项输入框        |
| .pacypay-checkout__error-text	                 | object	 | 否	  | 表单项错误提示文案     |
| .pacypay-checkout__button	                     | object	 | 否	  | 按钮            |
| .pacypay-checkout__button--pay	                | object	 | 否	  | 支付按钮          |
| .pacypay-checkout_button_text	                 | object	 | 否	  | 按钮文案          |
| .pacypay-checkout__loading	                    | object	 | 否	  | 按钮 Loading 容器 |
| .pacypay-checkout__spinner	                    | object	 | 否	  | 按钮 Loading 动画 |

</div>

#### 补充说明

当 `showPayButton` 为 `false` 的时候，在自定义支付按钮处，请调用以下方法进行支付

```javascript 
pacypay.submit();
// 若绑卡时不显示账单信息（displayBillingInformation： false），需要传入账单参数  // [!code warning]
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

## 更新订单<Badge text="POST" type="tip"></Badge>

`https://sandbox-acq.onerway.com/v1/sdkTxn/updateOrder`

::: danger 注意
`TransactionInformation` 中的字段如不需要更新，则不用传这个字段，如果传了null或空字符串，则也会被更新。
:::

### 请求参数

<div class="custom-table bordered-table">

| 名称                  | 类型     | 长度 | 必填  | 签名  | 描述                                                                                                                                                                                                                                                                                                   |
|---------------------|--------|----|-----|-----|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchantNo          | String | 20 | Yes | Yes | 商户号。 商户注册时，OnerWay会为商户创建商户号                                                                                                                                                                                                                                                                          |
| merchantTxnId       | String | 64 | No  | Yes | 商户创建的商户交易订单号，不同的订单号视为不同的交易。**和transactionId两个参数中至少传一个**                                                                                                                                                                                                                                              |
| transactionId       | String | 20 | No  | Yes | Onerway创建的交易订单号。**和merchantTxnId两个参数中至少传一个**                                                                                                                                                                                                                                                         |
| orderAmount         | String | 19 | Yes | Yes | 修改后的交易订单金额。                                                                                                                                                                                                                                                                                          |
| billingInformation  | String | /  | No  | Yes | 交易账单信息。 格式为 json 字符串。 请参阅对象 <CustomPopover title="TransactionInformation" width="auto" reference="TransactionInformation" link="/apis/js-sdk.html#transactioninformation" ><CustomTable :data="TransactionInformation.data" :columns="TransactionInformation.columns"></CustomTable></CustomPopover> |
| shippingInformation | String | /  | No  | Yes | 交易邮寄信息。 格式为 json 字符串。 请参阅对象 <CustomPopover title="TransactionInformation" width="auto" reference="TransactionInformation" link="/apis/js-sdk.html#transactioninformation" ><CustomTable :data="TransactionInformation.data" :columns="TransactionInformation.columns"></CustomTable></CustomPopover> |
| sign                | String | /  | Yes | No  | 签名字符串，请参阅  签名字符串，请参阅[Sign](./sign.html)                                                                                                                                                                                                                                                                                                |

</div>

### 响应参数

<div class="custom-table bordered-table">

| 名称       | 类型     | 签名 | 描述                                      |
|----------|--------|----|-----------------------------------------|
| respCode | String | No | 来自 Onerway 的响应码                         |
| respMsg  | String | No | 来自 Onerway 的响应信息                        |
| data     | Map    | No | 响应数据。 请参阅对象 [data](/js-sdk.html#data-1) |

</div>

#### data

<div class="custom-table bordered-table">

| 名称            | 类型     | 签名  | 描述                      |
|---------------|--------|-----|-------------------------|
| transactionId | String | Yes | Onerway创建的交易订单号，对应商户订单号 |
| sign          | String | No  | 签名字符串，请参阅  签名字符串，请参阅[Sign](./sign.html)                      |

</div>

<style lang="css">

 .dialog-button {
   margin-top: 0.75rem;
   border-radius: 6px;

   border-color: var(--vp-button-alt-border);
   color: var(--vp-button-alt-text);
   background-color: var(--vp-button-alt-bg);
}
</style>