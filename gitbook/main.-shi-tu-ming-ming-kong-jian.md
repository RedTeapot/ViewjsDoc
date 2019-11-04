# 视图命名空间

视图命名空间，是视图隶属的、限定了视图ID唯一性的抽象空间。

视图的唯一性，由 视图命名空间 和 视图ID 两部分决定。同一命名空间下的视图ID不能相同，但不同命名空间下的视图ID可以相同。

默认情况下，开发者在创建视图时不需要指定命名空间，视图命名空间将默认为：`default`。当多个相同ID的视图需要共存时，开发者才需要设定不同的命名空间。

视图命名空间的设定，通过在视图的布局骨架上声明 DOM 属性：`data-view-namespace` 完成。例如：

{% code-tabs %}
{% code-tabs-item title="main.html" %}
```markup
<section id = "home-page" data-view-namespace = "b2c-mall">
    ...
</section>

<section id = "home-page" data-view-namespace = "o2o-mall">
    ...
</section>
```
{% endcode-tabs-item %}
{% endcode-tabs %}

在执行视图跳转时，如果目标视图设定有命名空间，开发者需要同步指明目标视图所隶属的命名空间。如果目标视图的命名空间是 `default`，则无需显示声明。例如：

{% code-tabs %}
{% code-tabs-item title="main.html" %}
```markup
<!--
1. data-view-rel 指令用于指定跳转目标
2. "@" 符号是 视图ID 与 视图命名空间的分隔符
3. "!" 符号是 视图 与 视图选项的分隔符
4. 视图选项，是视图跳转时，在视图间传递参数的一种形式
-->

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
});
```
{% endcode-tabs-item %}
{% endcode-tabs %}

