---
outline: deep
---

<script setup>

import {reactive, ref, watch, onMounted, unref } from 'vue'; 
import {requestGen, secret} from "./util/utils";
import CMExample from './components/CMExample.vue';
import CMNote from './components/CMNote.vue';
import CustomPopover from './components/element-ui/CustomPopover.vue'; 
import CustomTable from "./components/element-ui/CustomTable.vue";
import {TopRight, View} from "@element-plus/icons-vue";
import { ClickOutside as vClickOutside } from 'element-plus';
import { NotifyTypeEnum, TxnTypeEnum, ChargebackStatusEnum} from './util/constants';

</script>

# 通知

## 注意事项
1. 通知地址可以通过两种方式给到我们，一种是由商户在`Onerway`注册时提供，另一种是通过交易接口中的`notifyUrl`指定。
2. 优先使用`notifyUrl`作为通知地址，如果没有传则会找后台配置的，如果还是找不到则不会发送通知。
3. 支付结果以异步通知为准，**同步响应中的`status`字段不能用来判断支付结果**！

::: tip  验签步骤
1. 将通知中的所有非空参数，剔除下方[通知参数](#通知参数)签名列为`NO`的参数，参考[不参与验签的字段](#不参与验签的字段)。
2. 剩下的所有参数，先对参数 `Key` 做 `ASCII` 码排序，然后将 `Value` 拼接成字符串，再在字符串的末尾加上商户秘钥
3. 进行 `sha256` 签名
4. 验签无误之后将 `transactionId` 返回，只需要返回 `transactionId` 的值。
:::

### 通知参数

<div class="custom-table bordered-table">

| 名称                         | 类型     | 长度   | 签名  | 描述                                                                                                                                                                                                                                                                     |
|----------------------------|--------|------|-----|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| notifyType                 | String | /    | Yes | 通知类型。请参阅 <CustomPopover title="NotifyTypeEnum" width="auto" reference="NotifyTypeEnum" link="/apis/enums.html#notifytypeenum" ><CustomTable :data="NotifyTypeEnum.data" :columns="NotifyTypeEnum.columns"></CustomTable></CustomPopover>                               |
| txnType                    | String | /    | Yes | 交易类型。请参阅 <CustomPopover title="TxnTypeEnum" width="auto" reference="TxnTypeEnum" link="/apis/enums.html#txntypeenum" ><CustomTable :data="TxnTypeEnum.data" :columns="TxnTypeEnum.columns"></CustomTable></CustomPopover> 当 `notifyType` 为 `TXN` 时返回，用于区分支付和退款         |
| transactionId              | String | 20   | Yes | `Onerway` 创建的交易订单号，对应商户订单号                                                                                                                                                                                                                                             |
| originTransactionId        | String | 20   | No  | 来源于 `Onerway` 的原始交易订单号。在退款等反向交易的通知中返回对应的正向交易的Onerway交易订单号                                                                                                                                                                                                              |
| merchantTxnId              | String | 64   | Yes | 商户创建的商户交易订单号，不同的订单号视为不同的交易                                                                                                                                                                                                                                             |
| originMerchantTxnId        | String | 64   | No  | 商户原交易订单号，在退款等反向交易的通知中返回对应的正向交易的商户交易订单号                                                                                                                                                                                                                                 |
| merchantNo                 | String | 20   | Yes | 商户号。 商户注册时，`OnerWay` 会为商户创建商户号                                                                                                                                                                                                                                         |
| responseTime               | String | /    | Yes | 接口响应时间，格式为`yyyy-MM-dd HH:mm:ss`                                                                                                                                                                                                                                        |
| txnTime                    | String | /    | Yes | 交易完成时间，格式为`yyyy-MM-dd HH:mm:ss`                                                                                                                                                                                                                                        |
| txnTimeZone                | String | /    | Yes | 交易完成时区，例如：`+08:00`                                                                                                                                                                                                                                                     |
| orderAmount                | String | 19   | Yes | 交易订单金额                                                                                                                                                                                                                                                                 |
| orderCurrency              | String | 8    | Yes | 交易订单的货币。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes)   货币代码                                                                                                                                                                 |
| txnAmount                  | String | 19   | Yes | 订单金额转换成结算币种后的金额                                                                                                                                                                                                                                                        |
| txnCurrency                | String | 8    | Yes | 结算币种。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) 货币代码                                                                                                                                                                      |
| settleRate                 | String | 19   | Yes | 汇率`（txnAmount = orderAmount * settleRate）`。                                                                                                                                                                                                                            |
| customsDeclarationAmount   | String | 19   | No  | 可报关金额                                                                                                                                                                                                                                                                  |
| customsDeclarationCurrency | String | 8    | No  | 可用于报关的金额对应币种。请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) 货币代码                                                                                                                                                               |
| paymentMethod              | String | 64   | No  | 具体支付方式，包括`卡`和`本地支付` 类型                                                                                                                                                                                                                                                 |
| walletTypeName             | String | 128  | No  | 钱包的品牌名称                                                                                                                                                                                                                                                                |
| status                     | String | 1    | Yes | 交易处理结果。 枚举如下：` S` - 交易成功/取消交易成功 `F` - 交易失败/审批不通过/取消交易失败                                                                                                                                                                                                                |
| reason                     | String | 512  | Yes | 交易失败的原因                                                                                                                                                                                                                                                                |
| periodValue                | String | /    | No  | 分期付款期数                                                                                                                                                                                                                                                                 |
| contractId                 | String | 20   | Yes | 订阅合同`id`，在订阅首购时会返回                                                                                                                                                                                                                                                     |
| tokenId                    | String | 300  | Yes | token `id`，在订阅首购、协议代扣申请 `token` 时会返回                                                                                                                                                                                                                                   |
| tokenExpireTime            | String | /    | No  | `token` 过期时间，在协议代扣申请`token`时会返回                                                                                                                                                                                                                                        |
| eci                        | String | 2    | Yes | 责任转移                                                                                                                                                                                                                                                                   |
| chargebackDate             | String | /    | Yes | 发生拒付的日期，格式为`yyyy-MM-dd`                                                                                                                                                                                                                                                |
| importTime                 | String | /    | Yes | `Onerway` 接收拒付交易的时间，格式为`yyyy-MM-dd HH:mm:ss `                                                                                                                                                                                                                          |
| appealDueTime              | String | /    | Yes | 申诉资料提交截止时间，格式为`yyyy-MM-dd HH:mm:ss`                                                                                                                                                                                                                                    |
| chargebackAmount           | String | 19   | Yes | 拒付金额                                                                                                                                                                                                                                                                   |
| chargebackCurrency         | String | 8    | Yes | 拒付金额对应币种。  请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) 货币代码                                                                                                                                                                 |
| chargebackStatus           | String | 16   | Yes | 拒付状态。请参阅 <CustomPopover title="ChargebackStatusEnum" width="auto" reference="ChargebackStatusEnum" link="/apis/enums.html#chargebackstatusenum" ><CustomTable :data="ChargebackStatusEnum.data" :columns="ChargebackStatusEnum.columns"></CustomTable></CustomPopover> |
| chargebackArn              | String | 128  | Yes | 拒付 `ARN`                                                                                                                                                                                                                                                               |
| chargebackCode             | String | 32   | Yes | 拒付代码                                                                                                                                                                                                                                                                   |
| chargebackReason           | String | 1024 | Yes | 拒付原因                                                                                                                                                                                                                                                                   |
| sign                       | String | /    | No  | 签名字符串，请参阅[Sign](./sign)接口                                                                                                                                                                                                                                              |

</div>

#### 不参与验签的字段

::: warning `originTransactionId`, `originMerchantTxnId`, `customsDeclarationAmount`, `customsDeclarationCurrency`, `paymentMethod`, `walletTypeName`, `periodValue`, `tokenExpireTime`, `sign`
:::

### 响应参数

<div class="custom-table bordered-table">

| 名称            | 类型     | 签名 | 描述                         |
|---------------|--------|----|----------------------------|
| transactionId | String | No | `Onerway` 创建的交易订单号，对应商户订单号 |

</div>

::: tip 只需返回 transactionId 的值

"1798262509925699584"  :x:  
1798262509925699584  :white_check_mark:
:::

### 剔除参数代码示例

::: code-group

```php [PHP]
/*  
$params 需要加签的数据; 
参数类型一维数组array;
  
$PrivateKey 商户秘钥;
参数类型字符串;  
*/
function ASCII_HASH($params , $PrivateKey){
    if(!empty($params)){
       $p =  ksort($params);
       	//需要剔除的参数
	   $badkey = array('originTransactionId','originMerchantTxnId','customsDeclarationAmount','customsDeclarationCurrency','paymentMethod','walletTypeName','periodValue','tokenExpireTime','sign');
       if($p){
           $strs = '';
           foreach ($params as $k=>$val){
               //剔除为"NO"的参数
               if((!empty($val) || $val == 0) && $k != 'sign' && $k != 'route' && !in_array($k, $badkey))
               {
                   $strs .= $val ;
               }
           }
           $strs = $strs.$PrivateKey ;
           return hash('sha256' , $strs);
       }
    }
    return 'error';
}


```

```Java [Java]
        String notifyData = "\n" +
                "{\"reason\":\"{\\\"respCode\\\":\\\"20000\\\",\\\"respMsg\\\":\\\"Success\\\"}\",\"txnTimeZone\":\"+08:00\",\"orderCurrency\":\"EUR\",\"responseTime\":\"2024-05-21 09:52:03\",\"sign\":\"fa58c37f1d7fd1e249c6bcc427aa335aa2d7335389908488e8a7f96f54c59485\",\"merchantTxnId\":\"7517512835003047\",\"txnType\":\"SALE\",\"transactionId\":\"1792734932368752640\",\"notifyType\":\"TXN\",\"orderAmount\":\"500.00\",\"paymentMethod\":\"VISA\",\"txnTime\":\"2024-05-21 09:51:45\",\"txnAmount\":\"\",\"merchantNo\":\"800277\",\"status\":\"S\",\"eci\":\"5\"}";
        Map<String, Object> map = JSONUtil.parseObj(notifyData);
        TreeMap sortedMap = new TreeMap();


        //获取通知里的签名
        String sign = map.get("sign")+"";

        //获取交易流水号
        String transactionId = map.get("transactionId")+"";

        //剔除签名为NO的参数
        String [] strings = new String []{
                "originTransactionId",
                "originMerchantTxnId",
                "customsDeclarationAmount",
                "customsDeclarationCurrency",
                "paymentMethod",
                "walletTypeName",
                "periodValue",
                "tokenExpireTime",
                "sign",
        };
        for(String entry : strings)
        {
            map.remove(entry);
        }

        for (Map.Entry<String, Object> entry : map.entrySet()) {
            if (ObjectUtil.isNotEmpty(entry.getValue()) && !"null".equals(entry.getValue()+"")) {
                sortedMap.put(entry.getKey(), entry.getValue());
            }
        }

        String toBeSignedData = PacypayUtils.strcatValueSign(sortedMap);

        //参与签名的参数
        System.out.println("toBeSignedData: "+toBeSignedData);

        boolean flag = PacypayUtils.verifySha256("de45ae6504ca46cb94ebd734bb650345", toBeSignedData, sign);

        if (!flag) {
            System.out.println("验证签名失败！");
        } else {
            System.out.println("验证签名成功！");
        }

        //无论成功失败  都需要返回 transactionId

        return transactionId;   // [!code warning]
    }

    private static String strcatValueSign(TreeMap treeMap) {
        StringBuffer buffer = new StringBuffer();
        treeMap.forEach((k, v) -> {
            if (StringUtils.isNotBlank((CharSequence) v)) {
                buffer.append(v);
            }
        });
        return buffer.toString();
    }

    public static boolean verifySha256(String key, String toBeSignedData ,String sign){
        String sha256 = signSha256(key , toBeSignedData);

        //通知里的签名
        System.out.println("Onerway_sign:"+sign);

        //验签的签名
        System.out.println("shop_sign:"+sha256);

        //进行比对
        return sha256.equals(sign);
    }

    public static String signSha256(String key, String toBeSignedData){

        String str=toBeSignedData + key;
        MessageDigest messageDigest;
        String encodestr = "";
        try {
            messageDigest = MessageDigest.getInstance("SHA-256");
            messageDigest.update(str.getBytes("UTF-8"));
            encodestr = byte2Hex(messageDigest.digest());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return encodestr;
    }

    /**
     * 将字节转换为十六进制
     *
     * @param bytes
     * @return
     */
    private static String byte2Hex(byte[] bytes) {
        StringBuffer stringBuffer = new StringBuffer();
        String temp = null;
        for (int i = 0; i < bytes.length; i++) {
            temp = Integer.toHexString(bytes[i] & 0xFF);
            if (temp.length() == 1) {
                stringBuffer.append("0");
            }
            stringBuffer.append(temp);
        }
        return stringBuffer.toString();
    }

```

:::

#### 通知示例

::: code-group

```json [支付通知]

{
  "//": "支付通知",
  "notifyType": "TXN",   
  "transactionId": "1599953668994019328",
  "txnType": "SALE",  // [!code warning]
  "merchantNo": "800096",
  "merchantTxnId": "1670293654000",
  "originMerchantTxnId": null,
  "responseTime": "2022-12-06 10:27:39",
  "txnTime": "2022-12-06 10:27:35",
  "txnTimeZone": "+08:00",
  "orderAmount": "29.00",
  "orderCurrency": "USD",
  "txnAmount": "29.00",
  "txnCurrency": "USD",
  "customsDeclarationAmount": null,
  "customsDeclarationCurrency": null,
  "status": "S",    // [!code warning]
  "contractId": null,
  "tokenId": null,
  "tokenExpireTime": null,
  "eci": null,
  "reason": "{\"respCode\":\"20000\",\"respMsg\":\"Success\"}",  // [!code warning]
  "periodValue": null,
  "paymentMethod": "VISA",
  "walletTypeName": null,
  "sign": "..."
}

```

```json [退款通知]

{
  "//": "退款通知",
  "notifyType":"TXN",  
  "transactionId":"1600000893212209152",
  "txnType":"REFUND",   // [!code warning]
  "merchantNo":"800096",
  "merchantTxnId":"1670304250000",
  "originMerchantTxnId":"1670304250000",
  "responseTime":"2022-12-06 13:36:06",
  "txnTime":null,
  "txnTimeZone":"+08:00",
  "orderAmount":"16.00",
  "orderCurrency":"USD",
  "txnAmount":"16.00",
  "txnCurrency":"USD",
  "settleRate":"1",
  "customsDeclarationAmount":null,
  "customsDeclarationCurrency":null,
  "status":"S",
  "contractId":null,
  "tokenId":null,
  "tokenExpireTime":null,
  "eci":null,
  "reason":"{\"respCode\":\"20000\",\"respMsg\":\"Success\"}",// [!code warning]
  "periodValue":null,
  "paymentMethod":"VISA",
  "walletTypeName":null,
  "sign": "..."
}

```

```json [交易取消通知]

{
  "//": "交易取消通知",
  "notifyType":"CANCEL",  // [!code warning]
  "transactionId":"1600013917075582976",
  "txnType":"SALE",
  "merchantNo":"800058",
  "merchantTxnId":"1670308019000",
  "originMerchantTxnId":null,
  "responseTime":null,
  "txnTime":"2022-12-06 14:26:59",
  "txnTimeZone":null,
  "orderAmount":"323.90",
  "orderCurrency":"USD",
  "txnAmount":"",
  "txnCurrency":null,
  "settleRate":null,
  "customsDeclarationAmount":null,
  "customsDeclarationCurrency":null,
  "status":"S",
  "contractId":null,
  "tokenId":null,
  "tokenExpireTime":null,
  "eci":null,
  "reason":"{\"respCode\":\"20000\",\"respMsg\":\"Success\"}",// [!code warning]
  "periodValue":null,
  "paymentMethod":null,
  "walletTypeName":null,
  "sign": "..."
}

```

```json [退款审核结果通知]

{
  "//": "退款审核结果通知",
  "notifyType":"REFUND_AUDIT",  // [!code warning]
  "transactionId":"1605750169942548480",
  "txnType":null,
  "merchantNo":"800058",
  "merchantTxnId":null,
  "originMerchantTxnId":null,
  "responseTime":null,
  "txnTime":null,
  "txnTimeZone":null,
  "orderAmount":"",
  "orderCurrency":null,
  "txnAmount":"",
  "txnCurrency":null,
  "customsDeclarationAmount":null,
  "customsDeclarationCurrency":null,
  "status":"F",  // [!code warning]
  "contractId":null,
  "tokenId":null,
  "tokenExpireTime":null,
  "eci":null,
  "reason":null,
  "periodValue":null,
  "paymentMethod":null,
  "walletTypeName":null,
  "sign": "..."
}

```

```json [拒付通知]

{
  "//": "拒付通知",
  "notifyType": "CHARGEBACK",   // [!code warning]
  "merchantNo": "800096",
  "transactionId": "1599959226371321856",
  "originTransactionId": "1599953668994019328",
  "originMerchantTxnId": "1670293654000",
  "importTime": "2022-12-06 10:49:40",
  "chargebackDate": "2022-12-06",
  "chargebackAmount": "2.00",
  "chargebackCurrency": "USD",
  "chargebackStatus": "NEW",
  "chargebackArn": "555",
  "chargebackCode": "res1206CODE",
  "chargebackReason": "res1206",
  "appealDueTime": "2023-03-06 10:49:40",
  "sign": "..."
}

```

::: tip 您的订单需要通过异步通知来判断是否成功，并以此为依据修改您后台的订单状态。必须以异步通知通知为准。 需要注意的是  退款审核通知 只会在退款审核失败的情况下才会发送异步通知。
:::
