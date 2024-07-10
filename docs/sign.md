---
outline: deep
---

<script lang="ts" setup>
import CustomTable from "./components/element-ui/CustomTable.vue";
import { ElIcon } from 'element-plus';

const tableData = [
   {
       params: 'test1',
       sign: 'YES',
   },
   {
        params: 'test2',
        sign: 'NO',
   },
   {
        params: 'test3',
        sign: 'YES',
   },
   {
        params: 'test4',
        sign: 'YES',
   },
   {
        params: 'test5',
        sign: 'YES',
   },
   {
        params: 'test6',
        sign: 'YES',
   },
];
const columns = [
    {
        prop: 'params',
        label: '参数',
    },
    {
        prop: 'sign',
        label: '签名',
    },
];
</script>

# 签名

在支付过程中，签名通常应用于交易请求和响应。商家使用秘钥对交易数据进行组装签名。这确保了支付信息的安全和可靠性。

**签名方式**：`sha256`

## 签名过程

1. 获取商户秘钥 ：登入Onerway后台 >> 点击"账户中心" >> "账户信息" >> 获取页面上Secret key 的值

[//]: # (![]&#40;./fetch-secret.png&#41;{data-zoomable})

2. 需要签名的数据：**首先获取请求参数中“签名”列为“YES”的参数**
   。所有非空请求参数，根据参数名称的ASCII码排序，然后以vaule1vaule2vaule3...的方式将值拼接起来，再在字符串末尾加上商户秘钥；

3. 将上述字符串转换为`UTF-8`格式；

4. 将字符串进行 `sha256` 签名 ；


::: warning 异步通知有单独的签名方式
:::

### 签名示例

<CustomTable :data="tableData" :columns="columns"></CustomTable>

```json
// 未排序的参数
{
  "test3": "test3value",
  "test2": "test2value",
  "test1": "0",
  "test5": "",
  "test4": "test4value",
  "test6": null
}
```

### 1. **首先获取`签名`列为`YES`以及值为不空的参数**

即剔除掉`test2`，`test5`，`test6`

```text
{
  "test2": "test2value", // [!code --]
  "test1": "0",
  "test3": "test3value",
  "test5": "", // [!code --]
  "test4": "test4value",
  "test6": null // [!code --]
}
```

### 2. **将参数字段升序排序**

```text
{
  "test1": "0",
  "test2": "test2value", // [!code --]
  "test3": "test3value",
  "test4": "test4value",
  "test5": "", // [!code --]
  "test6": null // [!code --]
}
```

### 3. **然后将值拼接成字符串**

`0test3valuetest4value`

### 4. **在拼接字符串的末尾加上商户秘钥**

**商户密钥**: `3b5e10b65bff4172a5b9ca2d2ec00a6e`

**拼接后的字符串**: `0test3valuetest4value3b5e10b65bff4172a5b9ca2d2ec00a6e`

### 5. 最后进行`sha256`签名

`836831ae68fce5e61d4a64363bb72c636efe6e94b62ecaa8d1c95fc58cc9cbed`

## 加签代码示例

::: code-group

```php [hash.php]
/*  
$params 需要加签的数据; 
参数类型一维数组array;
  
$PrivateKey 商户秘钥;
参数类型字符串;  
*/
//ASCII码排序加密
    function ASCII_HASH($params){
        $PrivateKey = trim($this->config->get('payment_pacypayment_secret'));
        if(!empty($params)){
        $p =  ksort($params);
        $badkey = array('originTransactionId','originMerchantTxnId','customsDeclarationAmount','customsDeclarationCurrency','paymentMethod','walletTypeName','periodValue','tokenExpireTime','sign');
        if($p){
            $strs = '';
            foreach ($params as $k=>$val){
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

```java [hash.java]
import lombok.extern.slf4j.Slf4j;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.TreeMap;

@Slf4j
public class HashUtil {

    public static void main(String[] args) {
        TreeMap<String, Object> params = new TreeMap();
        params.put("merchantNo","800135");
        params.put("test","yesdas1dsa");
        params.put("bizContent","dsaaass1dsag");
        params.put("as","12334567");
        params.put("bc","098754");

        // TODO: 改成自己的商户密钥
        String secret = "你的商户密钥";
        // 将请求参数和商户密钥拼接成字符串
        String data = concatValue(params) + secret;
        // 生成签名
        String sign = hash(data);
        System.out.println("生成的签名 = " + sign);
    }
    
    /**
     * 剔除空值和sign参数，拼接value成字符串
     *
     * @param data 请求参数
     * @return 拼接的字符串
     */
    public static String concatValue(TreeMap<String, Object> data) {
        StringBuilder sb = new StringBuilder();
        for (String key : data.keySet()) {
            if (data.get(key) != null && !data.get(key).equals("") && !key.equals("sign")) {
                sb.append(data.get(key));
            }
        }
        return sb.toString();
    }
    
    /**
     * 将拼接的字符串进行SHA-256加密
     *
     * @param concatStr 拼接的字符串
     * @return 加密后的字符串
     */
    public static String hash(String concatStr) {
        String sign = null;
        final String algorithm = "SHA-256";

        try {
            MessageDigest md = MessageDigest.getInstance(algorithm);
            System.out.println("拼接的字符串 = " + concatStr);
            md.update(concatStr.getBytes(StandardCharsets.UTF_8));
            sign = byte2Hex(md.digest());
        } catch (NoSuchAlgorithmException e) {
            log.error("Error: NoSuchAlgorithmException, Algorithm {} is not available", algorithm, e);
        } catch (Exception e) {
            log.error("Error while encrypting message: {}", e.getMessage());
        }
        return sign;
    }
    
    /**
     * 将字节数组转换为十六进制字符串表示形式。
     *
     * @param bytes 需要转换的字节数组
     * @return 字节数组的十六进制字符串表示形式
     */
    public static String byte2Hex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte value : bytes) {
            String hexValue = Integer.toHexString(value & 0xFF);
            if (hexValue.length() == 1) {
                sb.append("0");
            }
            sb.append(hexValue);
        }
        return sb.toString();
    }
}
```

```python [hash.py]
import hashlib
from collections import OrderedDict


class HashUtil:
    @staticmethod
    def concat_value(data):
        """
        剔除空值和sign参数，拼接value成字符串
        """
        return ''.join(str(value) for key, value in data.items() if value is not None and key != 'sign')

    @staticmethod
    def hash(concat_str):
        """
        将拼接的字符串进行SHA-256加密
        """
        try:
            # Encode the concatenated string to bytes
            concat_bytes = concat_str.encode('utf-8')
            # Create a SHA-256 hash object
            sha_signature = hashlib.sha256(concat_bytes).hexdigest()
            print("Concatenated String:", concat_str)
            return sha_signature
        except Exception as e:
            print("Error while encrypting message:", str(e))
            return None

    @staticmethod
    def byte2hex(bytes_val):
        """
        将字节数组转换为十六进制字符串表示形式。
        """
        return ''.join(f'{byte:02x}' for byte in bytes_val)


if __name__ == "__main__":
    params = OrderedDict([
        ("merchantNo", "800135"),
        ("test", "yesdas1dsa"),
        ("bizContent", "dsaaass1dsag"),
        ("as", "12334567"),
        ("bc", "098754"),
    ])

    # TODO: 改成自己的商户密钥
    secret = "你的商户密钥"
    # 将请求参数和商户密钥拼接成字符串
    data = HashUtil.concat_value(params) + secret
    # 生成签名
    sign = HashUtil.hash(data)
    print("生成的签名 =", sign)
```

:::
