# 伪视图

伪视图，是并不存在，但可以指导 View.js 进行视图切换的视图。

View.js 预置了如下几个伪视图：

> * `:back`。代表上一个浏览的视图
> * `:forward`。代表下一个浏览的视图
> * `:default-view`。代表当前页面的默认视图

开发者可以使用 伪视图 代替 明确的视图ID 以完成视图的切换动作。例如：

{% code-tabs %}
{% code-tabs-item title="main.html" %}
```markup
<!-- 返回至上一个视图 -->
<a data-view-rel = ":back">返回</a>

<!-- 前进至下一个视图 -->
<a data-view-rel = ":forward">前进</a>

<!-- 前进至首页 -->
<!-- 等同于 <a data-view-rel = ":default-view" data-view-rel = "nav">首页</a> -->
<a data-view-rel = ":default-view">首页</a>

<!-- 替换至首页 -->
<a data-view-rel = ":default-view" data-view-rel = "change">首页</a>
```
{% endcode-tabs-item %}
{% endcode-tabs %}

不仅在 html 文件中可以使用伪视图，开发者也可以在 js 文件中使用伪视图进行视图跳转：

{% code-tabs %}
{% code-tabs-item title="action.js" %}
```javascript
/* 返回至上一个视图。等同于：View.back() */
View.navTo(":back");

/* 前进至下一个视图。等同于：View.forward() */
View.navTo(":forward");

/* 前进至首页 */
View.navTo(":default-view");

/**
 * 替换至首页
 * View.changeTo() 只支持伪视图：":default-view"，不支持 ":back" 和 ":forward"
 */
View.changeTo(":default-view");
```
{% endcode-tabs-item %}
{% endcode-tabs %}

{% hint style="warning" %}
伪视图中的符号 “:” 是必需的。去掉 “:” 后，将代表视图ID，而非伪视图。
{% endhint %}

