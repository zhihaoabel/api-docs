---
outline: deep
---

<script lang="ts" setup>

</script>

# 预授权扣款

::: tip 订阅支付UI与直接支付共用同一个UI，所以保持 `subProductType`为`DIRECT`，其他配置请参考[SDK直接支付config字段说明](./sdk-pay#config)
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

### SDK预授权扣款代码示例

SDK预授权扣款代码示例请参考[SDK直接支付代码示例](./sdk-pay#sdk直接支付代码示例)

### 扣款

后续扣款请参考两方支付的[授权请款](./api-direct-auth-capture)接口

<style lang="css">



</style>