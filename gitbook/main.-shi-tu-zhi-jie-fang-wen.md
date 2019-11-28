# 视图直接访问

## 概述

视图是否可以 直接访问，是指视图处于活动状态时，页面在刷新并装载完成后，呈现的第一个视图，是否即为刷新前的活动视图。

如果是，则说明该视图是可以直接访问的，否则说明该视图是不能直接访问的。

如果一个视图是可以直接访问的，那么这个视图就具备了传播能力：传播后仍然能够直接访问得到。

例如：

![&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x8BBF;&#x95EE; &#x548C; &#x4E0D;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x8BBF;&#x95EE;&#x7684;&#x89C6;&#x56FE;&#x5728;&#x9875;&#x9762;&#x5237;&#x65B0;&#x540E;&#x7684;&#x8868;&#x73B0;](https://img-blog.csdnimg.cn/20190612195932410.gif)

## 设置单个视图

除非明确指定，否则每个视图都默认是『不能』直接访问的 。

开发者可以通过属性 `data-view-directly-accessible` 指定视图是否可以直接访问，例如：

{% tabs %}
{% tab title="view.html" %}
```markup
<section
    data-view-id="myView"
    data-view-namespace = "my-namespace"
    data-view-directly-accessible="true">

    
</section>
```
{% endtab %}
{% endtabs %}

开发者也可以通过 API 动态设置：

{% tabs %}
{% tab title="init.js" %}
```javascript
var view = View.ofId("myView");

/**
 * 设置视图为 “可以直接访问”
 */
view.setAsDirectlyAccessible(true);

/**
 * 判断视图当前是否可以直接访问
 */
console.log(view.isDirectlyAccessible()); // -> true
```
{% endtab %}
{% endtabs %}

## 设置所有视图

开发者可以通过将 `data-view-directly-accessible` 属性声明在视图容器的 DOM 节点上，实现 “控制所有视图默认表现” 的目的。例如：

{% tabs %}
{% tab title="index.html" %}
```markup
<body data-view-container
    data-view-directly-accessible = "true">
    
    <section
        data-view-id="myView"
        data-view-namespace = "my-namespace"
        data-view-directly-accessible="true">
    </section>
    
    <section
        data-view-id="myView2"
        data-view-namespace = "my-namespace"
        data-view-directly-accessible="false">
    </section>
    
    
    <section data-view-id="myView3">
    </section>
</body>
```
{% endtab %}
{% endtabs %}

如果特定视图单独做出了配置，则最终结果以视图配置为准。

以上面的代码为例，视图 `myView2` 是不能直接访问的，而视图 `myView` 和视图 `myView3` 则是可以直接访问的。

与单个视图一样，开发者同样可以使用 API 动态设置所有视图的默认表现：

```javascript
/**
 * 设置所有视图默认可以直接访问。
 */
View.setIsDirectlyAccessible(true);


/**
 * 判断所有视图默认是否可以直接访问
 */
console.log(View.isDirectlyAccessible()); // -> true
```

