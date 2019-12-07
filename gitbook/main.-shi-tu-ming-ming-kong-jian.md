# 视图命名空间

## 概述

视图命名空间，是视图隶属的、限定了视图ID唯一性的抽象空间。

视图的唯一性，由 视图命名空间 和 视图ID 两部分决定。同一命名空间下的视图ID不能相同，但不同命名空间下的视图ID可以相同。

默认情况下，开发者在创建视图时不需要指定命名空间，视图命名空间将默认为：`default`。当多个相同ID的视图需要共存时，开发者才需要设定不同的命名空间。

## 声明命名空间

视图命名空间的声明，通过在视图的布局骨架上添加 DOM 属性：`data-view-namespace` 完成。例如：

{% tabs %}
{% tab title="main.html" %}
```markup
<!-- b2c-mall 命名空间下，ID为 home-page 的视图 -->
<section
    data-view-id = "home-page"
    data-view-namespace = "b2c-mall">
    ...
</section>

<!-- o2o-mall 命名空间下，ID为 home-page 的视图 -->
<section
    data-view-id = "home-page"
    data-view-namespace = "o2o-mall">
    ...
</section>
```
{% endtab %}
{% endtabs %}

在执行视图跳转时，如果目标视图设定有命名空间，开发者需要将其显式描述出来。如果其命名空间是默认的 `default`，则无需显示声明。

例如：

{% tabs %}
{% tab title="main.html" %}
```markup
<!--
跳转至 order 命名空间下ID为 order-list 的视图。

1. data-view-rel 指令用于指定跳转目标
2. "@" 符号是 视图ID 与 视图命名空间 的分隔符
-->
<div class = "btn"
    data-view-rel = "order-list@order"
>订单列表</div>

<!-- 跳转至 default 命名空间下ID为 profile 的视图。 -->
<div data-view-rel = "profile">个人中心</div>
```
{% endtab %}

{% tab title="action.js" %}
```javascript
/* 跳转至 default 命名空间下的 profile 视图 */
View.navTo("profile");

/* 跳转至 order 命名空间下的 order-list 视图 */
View.navTo("order-list", "order");

```
{% endtab %}
{% endtabs %}

