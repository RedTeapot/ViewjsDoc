# 伪视图

伪视图，是并不真实存在，但具有逻辑含义、可以指导 View.js 进行视图切换的视图。

View.js 预置了如下几个伪视图：

> * `:back`，代表 “上一个浏览的视图”
> * `:forward`，代表 “下一个浏览的视图”
> * `:default-view`，代表 “当前页面的默认视图”

{% hint style="warning" %}
伪视图中的符号 “:” 是必需的。去掉 “:” 后，将代表视图ID，而非伪视图。
{% endhint %}

使用示例：

{% code title="main.html" %}
```markup
<!-- 返回至上一个视图 -->
<a data-view-rel = ":back">返回</a>

<!-- 前进至下一个视图 -->
<a data-view-rel = ":forward">前进</a>

<!-- 前进至首页 -->
<!-- 等同于 <a data-view-rel = ":default-view" data-view-rel-type = "nav">首页</a> -->
<!-- data-view-rel-type = 'nav|change' 用于指定切换方式：“压入堆栈|替换栈顶” -->
<a data-view-rel = ":default-view">首页</a>

<!-- 替换至首页 -->
<a data-view-rel = ":default-view" data-view-rel = "change">首页</a>
```
{% endcode %}

开发者也可以在 js 文件中使用伪视图进行视图跳转：

{% code title="action.js" %}
```javascript
/**
 * 返回至上一个视图。等同于：View.back()
 * 支持 params - 视图参数，不支持 options - 视图选项
 */
View.navTo(":back"， {
   params: {
      param1: 'value1',
      callback: function(){}
   }
});

/**
 * 前进至下一个视图。等同于：View.forward()
 * 支持 params - 视图参数，不支持 options - 视图选项
 */
View.navTo(":forward");

/**
 * 替换至首页
 * 支持 params - 视图参数，支持 options - 视图选项
 */
View.changeTo(":default-view");
```
{% endcode %}

{% hint style="warning" %}
1. `:back` 和 `:forward` 支持API：`View.navTo()` 调用，不支持 `View.changeTo()` 调用；
2. `:default-view` 同时支持API：`View.navTo()` 和 `View.changeTo()` 调用。
{% endhint %}

\`\`

