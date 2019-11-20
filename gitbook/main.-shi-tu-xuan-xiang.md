# 视图选项

## 概述

视图选项，是 View.js 支持的第二种数据传导方式。

与视图参数不同的是，视图选项的传导媒介，是地址栏。其地址栏表现形态如下所示：

> _http://domain:port/context/path/to/html\#view-id@view-namespace!**option1=value1&option2=value2...**_

其中，`option1` 和 `option2` 即为视图选项。

{% hint style="info" %}
`#` 符号即为锚点，是视图ID的URL前缀；`@` 符号为 视图ID 与 视图命名空间的分隔符；`!` 符号为 视图 与 视图选项 的分隔符；`&` 符号为多个选项之间的分隔符；`=` 符号为 选项 key 与 选项 value 之间的分隔符。
{% endhint %}

{% hint style="warning" %}
地址栏只呈现当前活动视图所关联的视图选项。
{% endhint %}

开发者同样只能在 视图跳转 时指定视图选项。但支持指定视图选项的视图跳转 API 只包括：

1. `View.navTo()` 
2. `View.changeTo()`

并不包括：

1. `View.back()`
2. `View.forward()`



我们在上一章节中讲述了多视图协作时视图参数的使用方式，本文将就视图之间的参数传递问题做进一步的补充描述。

使用了视图参数的开发者会遇到的第一个问题，可能是：

> 视图参数在目标视图刷新后获取不到

是的，确实是这样。 作为最灵活、支持类型最全面的传参方式，视图参数的传递是临时性的，一次性的，是在内存中发生的。这意味着：

1. 视图刷新后，视图参数消失
2. 视图参数只能批量设置。亦即，第二次视图进入传递的视图参数会覆盖第一次传递的参数

为了解决问题1，View.js同步引入了【视图选项】概念，以作为视图参数的补充，满足开发者传参需要在刷新后依然可见的需求。

## 表现形式

和视图参数不同，通过视图选项传递的参数将实时提现在地址栏中。同时有别于queryString，视图选项的参数名和参数值，是附加在视图ID之后的，如下所示：

```text
http://mall.com/index.html#confirm-order!goodsId=G01&count=1
```

其中，字符：“!”是视图ID与选项的分隔符，视图选项的多个参数之间使用字符：“&”分隔。

## 传参方式

View.js为所有视图切换API均加上了参数传递支持，包括： 1. View.navTo\(\) 2. View.changeTo\(\) 3. View.back\(\) 4. View.forward\(\)

例如：

```javascript
View.navTo("confirm-order", {
    options: {
        goodsId: "G01",
        count: 1
    }
});
```

其中，对象：`{options: xxx}`是视图切换选项，使用关键字：`options` 指定视图选项这一选项。（除视图选项外，视图切换还有其它控制选项，后面的章节会有介绍。）

## 获取方法

View.js提供了多种方式获取视图选项：

```javascript
/* 获取所有选项 */
View.getActiveViewOptions();// -> {goodsId: "G01", count: "1"}

/* 获取单个选项 */
View.getActiveViewOption("count");// --> "1"
```

**开发者要留意的是，这两项API不是视图实例所拥有的，是宏观层面的API。**

此外，为简化开发者工作，View.js在视图实例上提供了智能化的API：`view.seekParameter({String} paramName)`，该方法按如下方式工作：

1. 从视图参数中查找名为goodsId的参数，有则返回，没有则执行步骤2；
2. 从视图选项中查找名为goodsId的参数，有则返回，没有则执行步骤3；
3. 从queryString中查找名为goodsId的参数，有则返回对应的取值，没有则返回null

例如：

```javascript
View.navTo("confirm-order", {
    params: {
        goodsId: "G01"
    },
    options: {
        count: 1
    }
});

view.seekParameter("goosId");// -> G01
view.seekParameter("count");// -> 1
```

需要注意的是，视图选项是与视图ID绑定在一起的，仅当绑定的视图是活动视图的时候，才可以通过API正确地获取到参数取值。 这样做还有另外一个好处，就是即便通过浏览器的前进后退按钮切换视图，视图选项也仍然可以在视图切换为活动状态时获取得到。

## 参数类型

与 [视图参数](https://blog.csdn.net/baozhang007/article/details/84886614) 相比，借助视图选项可以传递的参数类型，则要受限很多。与queryString类似，通过视图选项传递的参数在通过API索取时，所得到的取值类型均为 `String` 。

## 更新参数取值

在一些情况下，开发者需要响应用户的操作，将操作结果更新到视图选项中，以规避 “视图离开并重新进入时参数值被重置” 的问题。此时，开发者可以通过方法： `View.setActiveViewOption(name {String}, value {String})` 方法更新地址栏中的参数值。例如：

```javascript
/* 从 商品详情界面 进入 确认订单界面 */
View.navTo("confirm-order", {
    options: {
        goodsId: "G01",
        count: "2"
    }
});
// 此时地址栏将为：#confirm-order!goodsId=G01&count=2

/* 确认订单界面 */
View.setActiveViewOption("count", "3");
// 此时地址栏姜维：#confirm-order!goodsId=G01&count=3
```

