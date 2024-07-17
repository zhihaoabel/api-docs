[//]: # (### Subscription)

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