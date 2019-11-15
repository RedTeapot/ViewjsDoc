---
description: View.js 支持 视图参数 和 视图选项 两种数据传递媒介。本文将介绍第一种传递媒介：视图参数。
---

# 视图参数

## 概述

视图参数，是借助内存传导的，用于在视图之间交换数据，实现跨页面协作的数据传递媒介。

开发者只能在 视图跳转 时指定视图参数。支持指定视图参数的视图跳转 API 包括：

1. `View.navTo` 
2. `View.changeTo`
3. `View.back()`
4. `View.forward()`

## 参数赋值

视图参数使用预留关键字：`params` 指定，例如：

{% tabs %}
{% tab title="action.js" %}
```javascript
/**
 * 以“压入堆栈”的方式跳转至 default 命名空间下, ID为 targetVieWId 的视图
 *
 * 第一个参数指定了跳转目标；
 * 第二个参数指定了跳转控制选项，其中，关键字：'params' 用于指定视图参数集合。
 */
View.navTo("targetViewId", {

    /**
     * 开发者可以在视图参数集合指定任意数量的参数，参数取值可以是
     * 任意合法的js类型
     */
    params: {
        paramName1: "boo",/* 传导字符串 */
        paramName2: true,/* 传导枚举值 */
        paramName3: ['str', 123, false, new Object()],/* 传导数组 */
        paramName4: View.find(".container"),/* 传导DOM元素 */
        paramName5: function(data){doSth(data);}/* 传导回调方法 */
    }
});
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
视图参数在视图离开后清空（检索参数将得到 `null`），开发者可以将参数存放在 视图上下文 中，以使得视图离开后仍然可以使用视图参数。
{% endhint %}

## 参数检索

View.js 提供了如下 API 以供开发者检索视图参数：

1. `view.hasParameter(name: string): boolean` 用于判断视图参数中是否含有指定名称的参数
2. `view.getParameter(name?: string): null|any` 获取视图参数中指定名称的参数取值。如果没有指定参数名，则返回整个参数集合。

例如：

{% tabs %}
{% tab title="init.js" %}
```javascript
var view = View.ofId("targetViewId");

/**
 * 视图进入时检索参数
 */
view.on("enter", function(){
    var param1 = view.getParameter("paramName1"); // -> "boo"
    var param2 = view.getParameter("paramName2"); // -> true
    var param3 = view.getParameter("paramName3"); // -> ['str', 123, false, {}]
    var param4 = view.getParameter("paramName4"); // -> HTMLDivElement
    var param5 = view.getParameter("paramName5"); // -> function(){...}
    
    var params = view.getParameter();
    console.log(params["paramName1"] === param1); // -> true
    console.log(params["paramName2"] === param2); // -> true
    console.log(params["paramName3"] === param3); // -> true
    console.log(params["paramName4"] === param4); // -> true
    console.log(params["paramName5"] === param5); // -> true
```
{% endtab %}
{% endtabs %}

正如前文所说，视图是View.js的核心概念，也是实现业务的核心载体。如果业务相对简单，每个视图都各自为营，彼此互相独立，那么问题不大，开发工作会相当轻松。但真实的世界里，终端往往是需要多个页面进行互相交互、彼此传递数据，共享信息的。比如这样的场景：

> 网购确认订单界面，需要与收货地址列表界面交互，使得用户在收货地址列表界面触摸特定收货地址后，界面自动切回确认订单界面，并把选定的收货地址信息呈现到界面上

View.js能够实现吗？当然能。这是View.js的实现效果：

![&#x5728;&#x8FD9;&#x91CC;&#x63D2;&#x5165;&#x56FE;&#x7247;&#x63CF;&#x8FF0;](https://img-blog.csdnimg.cn/20181207200158141.gif)

那么视图之间是如何协作呢？又是如何以一种清晰明了的规则保持视图之间较低的耦合关系的呢？借助视图参数。 视图参数，是指视图切换（亦即，活动视图发生变化）时，原视图（要离开的视图）向目标视图（要进入的视图）传递的参数。

作为视图交互的媒介和桥梁，视图参数支持所有类型，如：方法、数组、对象，以及DOM元素等，使得开发者不再受限于地址栏，突破地址栏只能传递类型简单，尺寸较小数据的限制，例如：

```javascript
View.navTo("detail", {params: {id: "001", count: 2, callback: function(){}});
View.back({params: {showHeader: true}});
```

其中，对象：`{params: xxx}`是视图切换选项，使用关键字：`params` 指定视图参数这一选项。（除视图参数外，视图切换还有其它控制选项，后面的章节会有介绍。）

View.js为所有视图切换API均加上了参数传递支持，包括：

1. `View.navTo()`
2. `View.changeTo()`
3. `View.back()`
4. `View.forward()`

目标视图则可以使用API：`view.hasParameter()`及`view.getParameter()`等方法检索相关参数，如：

```javascript
var view = View.ofId("detail");
view.hasParameter("id");// -> true
view.getParameter("count");// -> 2
view.seekParameter("callback");// -> function(){}
```

有了视图参数这一工具，对于文章开头提出的问题，我们就可以使用如下伪代码实现：

```javascript
/* 确认订单视图 */
View.navTo("recipient-list", {params: {
    selectCallback: function(recipient){
        //呈现收货人信息：recipient
    }
}});

/* 收货地址视图 */
Hammer(recipientListObj).on("tap", function(e){
    var recipentItemObj = getItemObj(e.srcEvent.target);    // 根据触摸位置获取对应的收货地址DOM
    var recipient = recipentItemObj .data;// 前文中附加data至dom中

    view.getParameter("selectCallback")(recipient);// 调用指定的“选择回调”
});
```

需要注意的是，视图参数区分大小写，且在离开后均会被清空，并不会保留。如果开发者需要持久化使用相关参数，则可以将其手动放至上下文中。

