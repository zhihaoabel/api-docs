[//]: # (### Subscription)

<div class="custom-table bordered-table">

| 名称             | 类型     | 长度  | 必填  | 签名 | 描述                                                     |
|----------------|--------|-----|-----|----|--------------------------------------------------------|
| requestType    | String | 1   | Yes | YES | 订阅类型：0 - 首购, 收银台仅支持首次购买。                     |
| merchantCustId | String | 50  | YES  | YES | 顾客ID |
| expireDate     | String | 10  | YES  | YES | 过期日期，格式为yyyy-MM-dd   |
| frequencyType  | String | 1   | YES  | YES | 订阅频率类型，仅支持按天订阅，所以写死为"D" |
| frequencyPoint | String | 2   | YES  | YES | 订阅频率点数，表示多少天进行一次扣款 |
| contractId     | String | 20  | YES  | YES | 订阅合同id。<br/><CMNote data="requestType为1时必填。"></CMNote> |
| tokenId        | String | 300 | YES  | YES | 订阅令牌id。<br/><CMNote data="requestType为1时必填。"></CMNote> |

</div>