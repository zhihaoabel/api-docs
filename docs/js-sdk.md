---
outline: deep
---

<script setup>

</script>

# JS SDK

[JS SDK下载](https://v3-doc.pacypay.com/javascripts/pacypay-v1.0.5.zip)

## 引入JS SDK

1. 引入方式一

    在需要调用JS SDK的页面中引入[JS SDK](https://v3-doc.pacypay.com/javascripts/pacypay-v1.0.5.zip)

    ```html
    <script src="pacypay.js"></script>
    ```

2. 引入方式二

   以 import / require 的方式导入

    ```javascript
    import Pacypay from './pacypay.js'

    const Pacypay = require('./pacypay.js')
    ```

3. 初始化SDK

在所需页面中新增一个id为pacypay_checkout的div元素块，作为收银台嵌入的容器
