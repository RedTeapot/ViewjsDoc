# 视图标题

## 概述

视图标题，是声明在视图 DOM 元素上的，用于在视图切换为活动状态时，展示在浏览器标签页上的窗口标题。

借助视图标题，开发者可以轻松实现 “进入不同页面显示不同标题” 的效果，如下所示：

![&#x6D4F;&#x89C8;&#x5668;&#x6807;&#x9898;&#x7684;&#x81EA;&#x52A8;&#x5207;&#x6362;](https://img-blog.csdnimg.cn/2019030318183622.gif)

## 声明标题

开发者只需在视图的 DOM 元素上声明 `data-view-title` 属性，并赋值为期望的标题即可声明视图标题。例如：

{% tabs %}
{% tab title="view.html" %}
```markup
<section
    data-view-id="view-title"
    data-view-title="视图标题">
    <!-- ... -->
</section>
```
{% endtab %}
{% endtabs %}

如果当前的活动视图没有声明视图标题，View.js 将自动使用在初始化阶段捕获的文档标题更新浏览器标题。

## 修改标题

View.js 允许开发者动态修改视图标题，例如：

{% tabs %}
{% tab title="action.js" %}
```javascript
var view = View.ofId("myView");

/* 设置新的标题 */
view.setTitle("新的标题");

/* 获取当前的视图标题 */
console.log(view.getTitle()); // -> "新的标题"
```
{% endtab %}
{% endtabs %}

在动态设置视图标题时，如果视图当前处于活动状态，则浏览器标题也将同步发生变化。

## 注意事项

当开发者为视图声明了视图标题后，View.js将在 视图进入 时自动使用设定的视图标题改写浏览器标题。在视图离开之后，进入下一个视图之前自动恢复浏览器标题。

需要注意的是，用于执行恢复动作的浏览器标题，是在视图初始化时自动捕获的。（除非开发者另行设定，否则 View.js 将在`DOMContentLoaded`事件发生时执行初始化动作。）

开发者可以通过 `View.setDocumentTitle(title: string)` 主动通知View.js 其需要捕获的浏览器标题。

{% hint style="info" %}
如果当前的活动视图并没有声明视图标题，则浏览器上呈现的文档标题将自动变更为新设置的文档标题。
{% endhint %}

