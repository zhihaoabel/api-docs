---
outline: deep
---

<script lang="ts" setup>

import "./util/constants";

</script>

# 订阅支付

::: tip 订阅支付UI与直接直接支付共用同一个UI，所以保持 `subProductType`为`DIRECT`，其他配置请参考[SDK直接支付config字段说明](./sdk-pay#config)
```js
const options = {
    // ...
    config: {
        "subProductType": "DIRECT", // DIRECT - 直接支付，TOKEN - 绑卡并支付 // [!code warning]
        // ...
    }
    // ...
}
```
:::

### SDK订阅支付代码示例

SDK预授权扣款代码示例请参考[SDK直接支付代码示例](./sdk-pay#sdk直接支付代码示例)

### 订阅复购

订阅复购请参考两方支付[复购](api-direct-sub)接口

<style lang="css">



</style>