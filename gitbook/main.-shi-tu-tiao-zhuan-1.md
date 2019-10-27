# 视图跳转（一）

## 概述

视图跳转，是指活动视图由一个视图转变为另外一个视图的过程。

开发者通过如下两种方式执行视图跳转：

1. 在跳转入口 DOM 元素上声明跳转指令：`data-view-rel`
2. 调用API：`View.navTo(targetViewId)` 或 `View.changeTo(targetViewId)`

例如：

{% code-tabs %}
{% code-tabs-item title="main.html" %}
```
<!-- :back 为伪视图，代表上一个视图 -->
<a class = "nav-back" data-view-rel = ":back">返回</a>
<!-- :default-view 为伪视图，代表默认视图 -->
<a class = "nav-home" data-view-rel = ":default-view">首页</a>

<!-- 跳转至 order 命名空间下ID为 settle-order 的视图，并使用视图选项传递参数：orderId -->
<div class = "btn" data-view-rel = "settle-order@order!orderId=ORD01">结算</div>
```
{% endcode-tabs-item %}

{% code-tabs-item title="action.js" %}
```javascript
/* 跳转至 default 命名空间下的 targetViewId */
View.navTo("targetViewId");

/* 跳转至 targetViewNamespace 命名空间下的 targetViewId */
View.navTo("targetViewId", "targetViewNamespace");

/* 跳转至 targetViewNamespace 命名空间下的 targetViewId，并传递 视图参数（关键字：params） 和 视图选项（options） */
View.navTo("targetViewId", "targetViewNamespace", {
    params: {/* 'params' 为预留关键字，代表视图参数。视图参数可以传递任意类型的参数，但刷新后丢失 */
        param1: "paramValue",
        param2: {
            key: "value"
        },
        param3: document.body,
        callback: function(){}
    },

    options: {/* 'options' 为预留关键字，代表视图选项。视图选项只能传递字符串类型的参数，刷新后不会丢失 */
        option1: "optionValue"
    }
})
```
{% endcode-tabs-item %}
{% endcode-tabs %}

## 底层技术

View.js 使用浏览器的 `history` API完成视图跳转。

`history.pushState()` 方法使能 `View.navTo()` 方法 和 `data-view-rel-type` 的 `nav` 取值；`history.replaceState()` 方法使能 `View.changeTo()` 方法 和 `data-view-rel-type` 的 `change` 取值。

> `data-view-rel` 指令用于指定跳转目标；`data-view-rel-type = nav | change` 用于指定视图的跳转方式：压入堆栈（`nav`） 或 替换栈顶（`change`）。
>
> `View.navTo()` 用于以“压入堆栈”的方式执行视图跳转；`View.changeTo()` 用于以“替换栈顶”的方式执行视图跳转
>
> “压入堆栈” 和 “替换栈顶” 的差别，在于如何影响用户的浏览位置。

{% hint style="warning" %}
堆栈或栈顶的变化，直接决定了页面的返回路径，因而需要开发者格外注意，否则很容易会让终端用户掉入无法返回的陷阱中。
{% endhint %}

### 压入堆栈

![&#x538B;&#x5165;&#x5806;&#x6808;](https://img-blog.csdnimg.cn/20181227133026900.png)

进入视图C后，用户需要执行两次回退操作，才能返回视图A。

### 替换栈顶

![&#x66FF;&#x6362;&#x5806;&#x6808;](https://img-blog.csdnimg.cn/20181227133127491.png)

进入视图C后，用户只需要一次回退操作就可以返回视图A。

在具体应用里，页面底部导航通常是 “替换栈顶” 式切换，以实现 “无论处于底部导航中的哪个界面，用户均可以通过单次返回退出应用” 的目的，例如：

![&#x5728;&#x8FD9;&#x91CC;&#x63D2;&#x5165;&#x56FE;&#x7247;&#x63CF;&#x8FF0;](https://img-blog.csdnimg.cn/20190804123239952.gif)

如果开发者想要避免 “一连串操作后返回不出去” 的现象，或者想要实现 “有预谋地规划用户导航” 的目的，就需要在执行视图跳转时清晰地知道用户在浏览堆栈中的位置，然后选择合适的跳转方法。

