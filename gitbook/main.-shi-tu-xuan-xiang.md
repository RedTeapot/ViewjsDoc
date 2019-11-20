# 视图选项

## 概述

视图选项，是 View.js 支持的第二种数据传导方式。  
与视图参数不同的是，视图选项的传导媒介，是地址栏。其地址栏表现形态如下所示：

> _http://domain:port/context/path/to/html\#view-id@view-namespace!**option1=value1&option2=value2...**_

其中，`option1` 和 `option2` 即为视图选项。

开发者同样只能在 视图跳转 时指定视图选项。但支持指定视图选项的视图跳转 API 只包括：

1. `View.navTo()` 
2. `View.changeTo()`

## 参数赋值

视图选项的赋值，同时支持使用 js 传导来进行 和 使用 html 传导来进行。

对于 js 传导，使用预留关键字：`options` 在跳转指令中指定，例如：

{% tabs %}
{% tab title="action.js" %}
```javascript
/**
 * 以“替换栈顶”的方式跳转至 mall 命名空间下, ID为 goods-detail 的视图。
 *
 * 第一个和第二个参数指定了跳转目标；
 * 第三个参数指定了跳转控制选项，其中，关键字：'options' 用于指定视图选项集合。
 */
View.changeTo("goods-detail", "mall", {
    /**
     * 视图选项只支持字符串类型
     */
    options: {
        paramName1: "boo"
        paramName2: "bar"
    }
});
```
{% endtab %}
{% endtabs %}

对于 html 传导，在 `data-view-rel` 指令中，使用 `!` 符号追加至跳转目标后即可，例如：

{% tabs %}
{% tab title="main.html" %}
```markup
<!-- 跳转目标是 视图ID -->
<span data-view-rel = "goods-detail!id=ID666" data-view-rel-namespace = "mall">商品详情</span>

<!-- 跳转目标是 视图群组（~ 符号用于告诉 View.js 字符串："detail" 是 视图群组名称，而非 视图ID） -->
<span data-view-rel = "~detail!id=ID666" data-view-rel-namespace = "mall">商品详情</span>
```
{% endtab %}
{% endtabs %}

## 参数获取

由于视图选项的传导媒介是地址栏，而地址栏只能表达出当前活动视图的信息，所以开发者只能获取到当前活动视图所关联的视图选项。

用于获取当前活动视图的视图选项的API为：

1. `View.hasActiveViewOption(name: string): boolean` 判断视图选项中是否含有特定名称的参数
2. `View.getActiveViewOption(name: string): null|string` 获取视图选项中特定名称的参数
3. `View.getActiveViewOptions(): null|Object<string, string>` 获取视图选项描述的参数集合

例如：

{% tabs %}
{% tab title="init.js" %}
```javascript
var view = View.ofId("goods-detial", "mall");

view.on("enter", function(){
    var param1 = View.getActiveViewOption("paramName1"); // -> "boo"
    var param2 = View.getActiveViewOption("paramName2"); // -> "bar"
    var id = View.getActiveViewOption("id"); // -> "ID666"
    
    var options = View.getActiveViewOptions();
    console.log(options["paramName1"] === param1); // -> true
    console.log(options["paramName2"] === param1); // -> true
    console.log(options["id"] === param1); // -> true
});
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
参数名区分大小写
{% endhint %}

## 参数更新

部分情况下，开发者需要响应用户的操作，更新地址栏中的视图选项。对此，View.js 提供了API：`View.setActiveViewOption(name: string, value: string)` 来应对。例如：

{% tabs %}
{% tab title="main.js" %}
```javascript
var count = view.getActiveViewOption("count") || 1;


/**
 * 增加购买数量
 */
Hammer(plusObj).on("tap", function(){
    View.setActiveViewOption("count", String(++count));
});
```
{% endtab %}
{% endtabs %}

## 与 视图参数 的对比

由于视图选项是通过地址栏传导的，并且只能检索当前活动视图关联的视图选项，所以视图选项在如下几个方面与视图参数有所不同：

1. 参数个数受浏览器地址栏长度限制
2. 参数类型只能是 `string` 类型
3. 参数在页面刷新后仍然可以检索到
4. 参数在浏览器前进或后退时自动恢复

## 更智能的参数检索方法

为简化开发者的参数检索工作，View.js 提供了一个更智能的参数检索API：`View.seekParameter(name: string)`。

该方法如下方式工作：

1. 尝试从 视图参数 中检索同名参数，有则返回，没有则执行步骤2；
2. 尝试从 视图选项 中检索同名参数，有则返回，没有则执行步骤3；
3. 尝试从 queryString 中 检索同名参数，有则返回对应的取值，没有则返回 `null`。

例如：

{% tabs %}
{% tab title="action.js" %}
```javascript
/**
 * 从 商品详情 页面跳转至 确认订单 界面
 *
 * 跳转前，页面的URL为：http://domain/main.html?id=G01#goods-detail
 */
View.navTo("confirm-order", {
    params: {
        inventory: 100 /* 库存量：100 */
    },
    options: {
        count: 1 /* 购买个数：1 */
    }
});
```
{% endtab %}

{% tab title="init.js" %}
```javascript
var view = View.ofId("confirm-order");

/**
 * 跳转后，页面的URL为 http://domain/main.html?id=G01#confirm-order!count=1
 */
view.on("enter", function(){
    console.log(view.seekParameter("id")); // -> "G01"
    console.log(view.seekParameter("inventory")); // -> 100
    console.log(view.seekParameter("count")); // -> "1"
});
```
{% endtab %}
{% endtabs %}

