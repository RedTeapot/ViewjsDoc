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

{% hint style="info" %}
视图参数只能使用 js 传导，不能使用 dom 指令传到。
{% endhint %}

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

/**
 * 以“替换栈顶”的方式跳转至 my-namespace 命名空间下, ID为 targetVieWId 的视图
 */
View.changeTo("targetViewId", "my-namespace", {
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

{% hint style="info" %}
`View.back()` 和 `View.forward()` 同样支持视图参数。
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

正如前文所述，视图参数在视图离开后将被清空，开发者可以手动将其存放至 视图上下文 中，然后从上下文中检索。例如：

{% tabs %}
{% tab title="init.js" %}
```javascript
var view = View.ofId("targetViewId");

/**
 * 监听事件：“视图进入”，并在参数非空时，更新视图上下文
 */
view.on("enter", function(){
    var params = view.getParameter();
    if(null != params)
        /**
         * View 的每个实例都有其自己专用的数据存取上下文，
         * 开发者可以使用 viewInstance.context 取得该
         * 上下文
         */
        view.context.set("params", params);
    }
});

/**
 * 在视图离开后检索参数
 */
view.on("leave", function(){
    var params = view.getParameter();
    console.log(params); // -> null
    
    params = view.context.get("params");
    console.log(params.paramName1); // -> "boo"
});
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
参数名区分大小写
{% endhint %}

## 回调方法

开发者可以借助视图参数传递任意类型的参数，包括 `Funtion`，以实现更灵活的页面协作，例如：“选择收货地址”。

实现思路为：

1. 用户在 “确认订单” 页面点击 “收货人” 时，界面跳转至 “收货地址列表”，并传递回调方法：“用户点选特定收货地址时要执行的方法”，方法内部实现用户选择的收货地址的渲染等
2. “收货地址列表” 界面监听用户对 “收货地址” DOM 元素的点击事件，并在点击时执行收到的回调方法，并将DOM元素关联的收货地址信息传递进去

代码如下：

{% tabs %}
{% tab title="确认订单页面" %}
```javascript
var view = View.ofId("confirm-order");

var consigneeObj = view.find(".consignee"),
    consigneeNameObj = view.find(".consignee-name"),
    consigneePhoneObj = view.find(".consignee-phone"),
    consigneeAddressObj = view.find(".consignee-address");

/**
 * 点击 收货人 DOM元素时，跳转至收货地址列表界面
 */
Hammer(consigneeObj).on("tap", function(){/* Hammer.js 是一款优秀的第三方框架，用于处理触摸事件 */
    View.navTo("consignee-list", {
        params: {
            /**
            * 指定参数：“用户点选特定收货地址时要执行的方法”
            * 
            * 注：
            * 1. 参数名：'selectCallback' 由 确认订单 页面
            *    与 收货地址列表 界面共同约定
            * 
            * 2. 回调方法的参数：consignee 同样由两个页面共同
            *    约定，用于代表用户选择的收货地址信息
            */
            selectCallback: function(consignee){
                /* 将用户选择的收货地址信息更新至 确认订单 界面中 */
                consigneeNameObj.innerHTML = consignee.name;
                consigneePhoneObj.innerHTML = consignee.phone;
                consigneeAddressObj.innerHTML = consignee.address;
            }
        }
    });
});
```
{% endtab %}

{% tab title="收货地址列表界面" %}
```javascript
var view = View.ofId("consignee-list");

/** 收货地址列表 */
var consigneeListObj = view.find(".list");

/**
 * 在整个列表上创建监听，而非每个地址上分别创建，以减少监听器的个数
 */
Hammer(consigneeListObj).on("tap", function(e){
   var target = e.srcEvent.target;

   /* 如果点击的不是 收货地址上的“选择”按钮，则什么也不做 */
   if(!target.classList.contains("select"))
      return;

   /**
    * "data" 属性不是浏览器自带的，而是在构建收货地址的 DOM 元素时，
    * 由程序主动附加在“选择”按钮上的，用于关联对应收货地址信息的key
    */
   var consigneeData = target.data;

   /* 执行收到的回调方法 */
   var selectCallback = view.getParameter("selectCallback");
   if(typeof selectCallback === "function"){
      View.back();/* 返回到“确认订单”页面 */
      selectCallback(consigneeData);
   }
});
```
{% endtab %}
{% endtabs %}

