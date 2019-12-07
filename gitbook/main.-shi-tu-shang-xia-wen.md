# 视图上下文

## 概述

视图上下文，是绑定在每个视图实例上的，用于供视图内部脚本存取数据用的私有变量空间。通过使用视图上下文，开发者可以轻松规避 “全局变量污染” 的困境。

> 视图上下文本质上是一个空对象：`{}`。

## 存取数据

视图上下文提供了一系列的API，供开发者存取数据，如下所示：

{% tabs %}
{% tab title="main.js" %}
```javascript
var view = View.ofId("myView");

/* 获取数据存取上下文 */
var ctx1 = view.getContext();
var ctx2 = view.context;

/* 两种方式等价 */
console.log(ctx1 === ctx2); // -> true

/**
 * 存放数据。支持链式调用
 */
ctx1.set("string", "str").set("array", ["str", false]);

/**
 * 获取数据量
 */
console.log(ctx1.size()); // -> 2

/**
 * 列举key
 */
console.log(ctx1.listKeys()); // -> ["string", "array"]

/**
 * 判断是否含有数据
 */
console.log(ctx1.has("string")); // -> true
console.log(ctx1.has("object")); // -> false

/**
 * 获取数据
 */
console.log(ctx1.get("string")); // -> "str"
console.log(ctx1.get("object")); // -> undefined

/**
 * 删除数据
 */
console.log(ctx1.remove("string")); // -> "str"
console.log(ctx1.remove("string")); // -> undefined

/**
 * 清空数据
 */
ctx1.clear();
console.log(ctx1.get("array")); // -> undefined
```
{% endtab %}
{% endtabs %}

不仅视图实例具有上下文，View.js 也为全局变量：`View` 提供了上下文。开发者可以通过API：`View.context` 获取，例如：

{% tabs %}
{% tab title="main.js" %}
```javascript
var ctx = View.context;

/* 存放数据 */
ctx.set("key", ["str", 666, document.body, function(){}]);

/* 获取数据 */
console.log(ctx.get("key")[2] === document.body); // -> true

// ctx.listKeys(), ctx.remove(), ctx.has()...
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
开发者可以在视图上下文中存放任意数量、任意类型的数据。
{% endhint %}

因为上下文是视图实例的私有“物品”，因而不同视图拥有不同的上下文，不同视图的上下文中也可以使用相同的 key 存取数据。

## 使用建议

虽然技术上可行，但我们并不建议开发者在一个视图中读取或设置另外一个视图上下文中的数据。这样的做法会加大视图之间的耦合度，不利于视图之间的分工协作。更合适的做法，是使用 视图参数 或 视图选项 ，以参数传导的方式进行多视图之间的协作。

