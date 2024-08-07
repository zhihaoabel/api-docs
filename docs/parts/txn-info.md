[//]: # (### TransactionInformation)

<div class="custom-table bordered-table">

| 名称             | 类型     | 长度  | 必填  | 描述                                                                                                                                                                                              |
|----------------|--------|-----|-----|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| firstName      | String | 64  | Yes | 名 (虚拟商品可不传)                                                                                                                                                                                     |
| lastName       | String | 64  | Yes | 姓 (虚拟商品可不传)                                                                                                                                                                                     |
| jpFirstName    | String | 64  | No  | （日文片假名）名                                                                                                                                                                                        |
| jpLastName     | String | 64  | No  | （日文片假名）姓                                                                                                                                                                                        |
| phone          | String | 32  | Yes | 电话号码   (虚拟商品的可不传)                                                                                                                                                                               |
| email          | String | 256 | Yes | 电子邮件                                                                                                                                                                                            |
| postalCode     | String | 32  | Yes | 邮政编码  (虚拟商品可不传)                                                                                                                                                                                 |
| address        | String | 256 | Yes | 地址    (虚拟商品可不传)                                                                                                                                                                                 |
| country        | String | 64  | Yes | 国家。 请参阅 [ISO 3166](https://en.wikipedia.org/wiki/ISO_3166-1)。 <br>   <CMExample data="美国 is US "></CMExample>                                |
| province       | String | 64  | Yes | 州。 当国家是美国 \(US\) 或加拿大 \(CA\) 时必填。 请参阅 [ISO 3316](https://en.wikipedia.org/wiki/ISO_3166-1)。 <br>  <CMExample data="美属萨摩亚 is AS"></CMExample> |
| city           | String | 64  | Yes | 城市 (虚拟商品可不传)                                                                                                                                                                                    |
| street         | String | 64  | No  | 街道                                                                                                                                                                                              |
| number         | String | 64  | No  | 门牌号                                                                                                                                                                                             |
| identityNumber | String | 64  | No  | 证件号码                                                                                                                                                                                            |
| birthDate      | String | 64  | No  | 出生日期，格式为 `yyyy/MM/dd`                                                                                                                                                                           |

</div>