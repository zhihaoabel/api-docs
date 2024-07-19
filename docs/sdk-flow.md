---
outline: deep
---

<script lang="ts" setup>



</script>

# 接入流程

## 接入流程

1. 客户端获取顾客的订单信息
2. 将订单信息发送给服务端
3. 服务端请求Onerway [下单](./sdk-do-transaction)接口，获取 `transactionId`
4. 将 `transactionId` 发送给客户端
5. 客户端加载 Onerway `JavaScript` 库
6. 通过 `transactionId` 配置SDK渲染收银台
7. 等待接收支付结果

<style lang="css">



</style>