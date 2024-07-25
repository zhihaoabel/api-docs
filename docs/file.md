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


</script>

# 下载结算文件

注意事项：<br>
1. 该接口返回的是文件流，响应头中Content-Type为application/octet-stream
2. 字符集只支持UTF-8
3. 建议将文件流写入后缀为csv的文件中


  <el-alert
    title="调用此接口之前，需先联系我们开通下载权限。"
    type="warning"
    show-icon>
  </el-alert>


请求地址、请求方式、请求头 可以参考：


<br>

|   <div style="text-align: left;">名称</div>| 内容                                                          |
|----------------|---------------------------------------------------------------|
| Request URL :   | https://sandbox-acq.onerway.com/v1/settlementFile/download  |
| Request Method : | <div style="color:var(--vp-c-brand-1);font-weight:500;"> POST  </div>                                                       |
| Content-Type : | <div style="color:var(--vp-c-brand-1);font-weight:500;">application/json      </div>                                       |

<br>

<div class="alertbox3">

::: tip  Content-Type: application/json; charset=UTF-8 错误   <br>Content-Type: application/json 正确 
:::

</div>


## 下载文件

#### Http header参数

<div class="custom-table bordered-table">

| 名称         | 类型     | 长度 | 必填  | 签名  | 描述                          |
|------------|--------|----|-----|-----|-----------------------------|
| merchantNo | String | 20 | Yes | Yes | 商户号。 商户注册时，OnerWay会为商户创建商户号 |
| date       | String | 8  | Yes | Yes | 结算日期，格式为`yyyyMMdd`           |
| currency   | String | 8  | Yes | Yes | 结算币种。 请参阅 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) 货币代码     |
| sign       | String | /  | Yes | No  | 签名字符串，请参阅[Sign](./sign)接口                         |
</div>


#### 文件内容说明

### 结算批次


<div class="custom-table bordered-table">

| 名称                         | 描述                  |
|----------------------------|---------------------|
| Settlement Date            | 按结算周期计算的结算日期        |
| Settlement Currency        | 给商户结算的币种            |
| Transaction Amount         | 以结算币种计的交易金额         |
| Refund Amount              | 发生退款交易且退款成功的金额      |
| Transaction Processing Fee | 支付交易收取的处理费          |
| Refund Processing Fee      | 退款交易收取的处理费          |
| Fee                        | 支付交易收取的手续费          |
| Interchange Fee            | 仅在 `IC++` 模式下有        |
| Scheme Fee                 | 仅在 `IC++ `模式下有        |
| Markup                     | 仅在 `IC++` 模式下有        |
| Deposit Release            | 返还的保证金金额            |
| Deposit                    | 保证金金额，到期返还          |
| Settlement Amount          | 结算金额，即交易金额和手续费轧差后净额 |

</div>



#### 结算明细


<div class="custom-table bordered-table">

| 名称                  | 描述                                     |
|---------------------|----------------------------------------|
| Settlement Date     | 按结算周期计算的结算日期                           |
| Settlement Batch ID | 结算批次号，一个结算批次只会有一个批次号                   |
| Transaction ID      | 交易订单号                                  |
| Merchant Order ID   | 商户交易订单号                                |
| Production Type     | 产品类型                                   |
| Card Type           | 卡类型或本地支付方式                             |
| APP ID              | 商户应用程序 `ID`。 商户注册网站时，`OnerWay`会为商户创建一个应用`id` |
| Transaction URL     | 商户交易网站                                 |
| Order_Currency      | 交易订单币种                                 |
| Order Amount        | 交易订单金额                                 |
| Transaction Type    | /                                      |
| Transaction Status  | /                                      |
| Settlement Currency | 给商户结算的币种                               |

</div>



#### 交易类型


<div class="custom-table bordered-table">

| 代码                       | 描述        |
|--------------------------|-----------|
| SALE                     | 支付交易      |
| REFUND                   | 退款交易      |
| CB                       | 拒付交易      |
| CB_CANCEL                | 拒付撤销交易    |
| CB_VOID                  | 拒付作废      |
| CB_APPEAL                | 拒付第一次申诉   |
| CB_APPEAL_SUCCESS        | 拒付第一次申诉成功 |
| CB_APPEAL_SECOND         | 拒付第二次申诉   |
| CB_APPEAL_SECOND_SUCCESS | 拒付第二次申诉成功 |
| CB_APPEAL_SECOND_FAILURE | 拒付第二次申诉失败 |
</div>


## 以下部分展示了文件下载代码示例：

### Request

 https://sandbox-acq.onerway.com/v1/settlementFile/download <Badge type="tip">POST</Badge>



```java

public void downLoad(@RequestParam("localFileName") String localFileName,HttpServletResponse response) {
        HttpClient client = new HttpClient();
        GetMethod get = null;
        FileOutputStream output = null;
        try {
            get = new GetMethod("https://sandbox-acq.onerway.com/v1/settlementFile/download");
            get.setRequestHeader("merchantNo", "500010");
            get.setRequestHeader("date", "20211026");
            get.setRequestHeader("currency", "USD");
            get.setRequestHeader("sign","...");
            MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();
            HttpConnectionManagerParams params = new HttpConnectionManagerParams();
            params.setConnectionTimeout( 20000 );
            params.setSoTimeout( 20000 );
            connectionManager.setParams(params);
            client = new HttpClient(connectionManager);
            HttpClientParams clientParams = new HttpClientParams();
            clientParams.setParameter("http.protocol.allow-circular-redirects", true);
            clientParams.setParameter("http.protocol.max-redirects", 4);
            client.setParams(clientParams);
            int i = client.executeMethod(get);
            if (200 == i) {
                File storeFile = new File(localFileName);
                output = new FileOutputStream(storeFile);
                output.write(get.getResponseBody());
            } else {
                System.out.println("DownLoad file occurs exception, the error code is :" + i);
            }
            InputStream inStream = new FileInputStream(localFileName);
            response.reset();
            response.setContentType("application/octet-stream");
            response.addHeader("Content-Disposition", "attachment; filename=\"" + localFileName + "\"");
            byte[] b = new byte[100];
            int len;
            try {
                while ((len = inStream.read(b)) > 0)
                    response.getOutputStream().write(b, 0, len);
                inStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if(output != null){
                    output.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            get.releaseConnection();
            client.getHttpConnectionManager().closeIdleConnections(0);
        }
    }


```


<div class="alertbox4">

::: tip 此示例仅限参考 请勿拿此示例直接请求。
:::

</div>

