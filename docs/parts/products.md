[//]: # (#### Products)

<div class="custom-table bordered-table">

| 名称       | 类型     | 长度   | 必填  | 描述                                                                                                                                                                                                                                                                    |
|----------|--------|------|-----|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name     | String | 256  | Yes | 商品名称。                                                                                                                                                                                                                                                                 |
| price    | String | 1024 | Yes | 商品单价。                                                                                                                                                                                                                                                                 |
| num      | String | 20   | Yes | 商品数量。                                                                                                                                                                                                                                                                 |
| currency | String | 256  | Yes | 商品价格对应得货币。                                                                                                                                                                                                                                                            |
| type     | String | 256  | No  | 商品类型。请参考 <CustomPopover title="StoreProductTypeEnum" width="auto" reference="StoreProductTypeEnum" link="/apis/enums.html#storeproducttypeenum"><CustomTable :data="StoreProductTypeEnum.data" :columns="StoreProductTypeEnum.columns"></CustomTable></CustomPopover> |

</div>

::: tip `products` 必须为`JSON`字符串格式

**示例：**

<Badge type="warning">如果type为shipping_fee，折扣金额需要传负数</Badge>

::: code-group
```json [一般情况]
\"[{\\\"name\\\":\\\"Pro1\\\",\\\"price\\\":\\\"50.00\\\",\\\"num\\\":\\\"2\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"Pro2\\\",\\\"price\\\":\\\"100\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\"}]\"

```

```json [有折扣]
\"[{\\\"name\\\":\\\"Pro1\\\",\\\"price\\\":\\\"50.00\\\",\\\"num\\\":\\\"2\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"Pro2\\\",\\\"price\\\":\\\"100\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"discount\\\",\\\"price\\\":\\\"-10\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\",\\\"type\\\":\\\"discount\\\"}]\"

```


```json [有运费]
\"[{\\\"name\\\":\\\"Pro1\\\",\\\"price\\\":\\\"50.00\\\",\\\"num\\\":\\\"2\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"Pro2\\\",\\\"price\\\":\\\"100\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"shipping fee\\\",\\\"price\\\":\\\"10\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\",\\\"type\\\":\\\"shipping_fee\\\"}]\"

```

```json [有折扣和运费]
\"[{\\\"name\\\":\\\"Pro1\\\",\\\"price\\\":\\\"50.00\\\",\\\"num\\\":\\\"2\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"Pro2\\\",\\\"price\\\":\\\"100\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"shipping fee\\\",\\\"price\\\":\\\"10\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\",\\\"type\\\":\\\"shipping_fee\\\"},{\\\"name\\\":\\\"discount\\\",\\\"price\\\":\\\"-10\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\",\\\"type\\\":\\\"discount\\\"}]\"

```
**要注意的是 price * num = orderAmount（订单交易金额）**
:::