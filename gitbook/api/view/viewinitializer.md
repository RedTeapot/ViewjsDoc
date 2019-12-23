---
description: View.js 初始化触发器
---

# ViewInitializer

## 签名

`(init: Function) => void`

## 入参

1. `init: Function` - 初始化动作执行句柄，由 View.js 提供，由 开发者 在恰当时机执行。

{% hint style="warning" %}
如果 init 方法没有被执行，则 View.js 将无法完成初始化。
{% endhint %}

## 返回

无。

