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

# 获取绑定Token列表



请求地址、请求方式、请求头 可以参考：

<br>

|   <div style="text-align: left;">名称</div>| 内容                                                          |
|----------------:|:---------------------------------------------------------------|
| Request URL :    | https://sandbox-acq.onerway.com/v1/txn/queryTokenList  |
| Request Method : | <div style="color:var(--vp-c-brand-1);font-weight:500;"> POST  </div>                                                        |
| Content-Type :  | <div style="color:var(--vp-c-brand-1);font-weight:500;">application/json      </div>                                        |

<br>

<div class="alertbox3">

::: tip  Content-Type: application/json; charset=UTF-8 错误   <br>Content-Type: application/json 正确 
:::

</div>


## 交易订单查询

#### 请求参数

<div class="custom-table bordered-table">

| 名称             | 类型     | 长度 | 必填  | 签名  | 描述                                                                                                         |
|----------------|--------|----|-----|-----|------------------------------------------------------------------------------------------------------------|
| merchantNo     | String | 20 | Yes | Yes | 商户号。 商户注册时， `OnerWa `y会为商户创建商户号                                                                            |
| appId          | String | 20 | No  | Yes | 商户应用程序 ID。 商户注册网站时，OnerWay会为商户创建一个应用 `id `。不传时，默认查询商户号下所有绑定的 `token `信息。传入时，查询指定 `appId `下的绑定的 `toke `n信息。 |
| merchantCustId | String | 50 | Yes | Yes | 客户在商户的唯一标识                                                                                                 |
| sign           | String | /  | Yes | No  | 签名字符串，请参阅  签名字符串，请参阅[Sign](./sign.html)                                                                         |                                   |

</div>


#### 响应参数

<div class="custom-table bordered-table">

| 名称       | 类型     | 签名 | 描述                        |
|----------|--------|----|---------------------------|
| respCode | String | No | 来自 `Onerway `的响应码           |
| respMsg  | String | No | 来自` Onerway` 的响应信息          |
| data     | Map    | No | 响应数据。 请参阅对象 BindTokenInfo    <CustomPopover title="BindTokenInfo" width="auto" reference="BindTokenInfo" link="/apis/api-direct-tokenList.html#bindtokeninfo" ></CustomPopover> |

</div>

#### BindTokenInfo

<div class="custom-table bordered-table">

| 名称         | 类型     | 签名 | 描述                              |
|------------|--------|----|---------------------------------|
| merchantNo | String | No | 商户号。 商户注册时，OnerWay会为商户创建商户号     |
| tokenInfos | List   | No | token明细列表。请参阅对象 TokenDetailInfo    <CustomPopover title="TokenDetailInfo" width="auto" reference="TokenDetailInfo" link="/apis/api-direct-tokenList.html#tokendetailinfo" ></CustomPopover> |

</div>


#### TokenDetailInfo

<div class="custom-table bordered-table">

| 名称            | 类型     | 签名 | 描述                                     |
|---------------|--------|----|----------------------------------------|
| id            | String | No | 绑定信息`id`（可用于解绑操作）                        |
| tokenId       | String | No | 绑卡令牌`id `                                |
| appId         | String | No | 商户应用程序 `ID`。 商户注册网站时，OnerWay会为商户创建一个应用id |
| cardNumber    | String | No | 卡号（格式为：前六****后四）                       |
| paymentMethod | String | No | 具体支付方式，包括卡和本地支付类型                      |
| year          | String | No | 卡号年份，例如： 2021                          |
| month         | String | No | 卡号月份，例如：03                             |
</div>

## 以下部分展示了交易订单查询的请求示例：

### Request

https://sandbox-acq.onerway.com/v1/txn/queryTokenList<Badge type="tip">POST</Badge>



::: code-group

```json [请求参数]
{
  "merchantNo": "800102",
  "merchantCustId": "abc8264",
  "appId": "1473924727352147968",
  "sign": "..."
}

```


```json [响应参数]
{
  "respCode": "20000",
  "respMsg": "Success",
  "data": {
    "merchantNo": "800102",
    "tokenInfos": [
      {
        "id": "1770320739990843396",
        "tokenId": "e8301b7e44b12f4dca9f4eeb8a8874d16e4125ba8283c30c5cf94ddfefaad3b5",
        "appId": "1473924727352147968",
        "cardNumber": "445653******1096",
        "paymentMethod": "VISA",
        "year": "2026",
        "month": "03"
      }
    ]
  }
}


```

<div class="alertbox4">

::: tip 此示例仅限参考 请勿拿此示例直接请求。
:::

</div>
