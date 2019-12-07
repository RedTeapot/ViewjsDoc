# 视图名称

## 概述

视图名称的作用，是为了辅助开发者实现 “使用抽象名称，而非确切的视图ID完成视图跳转” 的效果。

通常情况下，开发者并不需要声明视图名称。但当开发者实现了视图的动态集成，并且相同作用的视图可能存在多个的时候，通过使用视图名称，基本就可以不用修改代码，便能保证视图之间动态集成的有效性了。

> 如果使用确切的视图ID，开发者会面临 “如何得知跳转的目标视图ID是否已集成到页面中” 这一问题。为此不得不借助视图配置，或分别撰写跳转代码，这样就降低了代码的有效复用度。

当使用视图名称执行视图跳转时，View.js 将自动检索所有声明为给定名称的视图，并将检索到的第一个作为目标视图跳转过去。例如：

{% tabs %}
{% tab title="main.html" %}
```markup
<section
    data-view-id = "home-page"
    data-view-title = "首页"
>
    <!--
    导航至 商品详情。
    '~' 符号用于告诉 View.js 'goods-detail' 是视图名称
    -->
    <a data-view-rel = "~goods-detail">商品详情</a>
</section>

<section
    data-view-id = "goods-detail_01"
    data-view-title = "商品详情"
></section>
```
{% endtab %}

{% tab title="action.js" %}
```javascript
/* 导航至 商品详情 */
View.navTo("~goods-detail");
```
{% endtab %}
{% endtabs %}

当用户点击 “商品详情” 链接时，View.js 将自动跳转至 `goods-detial_01` 视图。





