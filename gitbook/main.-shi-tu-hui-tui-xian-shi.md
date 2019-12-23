# 回退视图

## 概述

回退视图，并非是视图的某一种类型，而是指在不可直接访问的视图上指定的，页面刷新后将要显示的视图，亦即，需要回退显示的视图。

回退视图通常需要设置为逻辑距离上比较近的视图。例如：

![&#x89C6;&#x56FE;&#x7684;&#x56DE;&#x9000;&#x663E;&#x793A;](.gitbook/assets/1%20%282%29.gif)

在上图中，“个人中心子页面” 是不可直接访问的，但由于设定了其回退视图为 “个人中心”，所有页面刷新后展现的，是个人中心界面。

如果没有设置回退视图，那么页面将在刷新后呈现默认视图。

## 设置回退视图

开发者可以使用属性： `data-view-fallback` 指定回退视图。例如：

{% tabs %}
{% tab title="main.html" %}
```markup
<!-- 设置回退视图为 default 命名空间下ID为 profile 的视图 -->
<section data-view-id = "profile-sub-page"
    data-view-title = "个人中心子页面"
    data-view-directly-accessible = "false"
    
    data-view-fallback = "profile"
></section>
```
{% endtab %}
{% endtabs %}

如果回退视图的命名空间不是默认的 `default`，开发者可以通过声明 `data-view-fallback-namespace` 属性指定回退视图的命名空间。例如：

{% tabs %}
{% tab title="main.html" %}
```markup
<!-- 设定回退视图为 myNamespace 命名空间下ID为 profile 的视图 -->
<section data-view-id = "profile-sub-page"
    data-view-title = "个人中心子页面"
    data-view-directly-accessible = "false"
    
    data-view-fallback = "profile"
    data-view-fallback-namespace = "myNamespace"
></section>
```
{% endtab %}
{% endtabs %}

`data-view-fallback` 不仅可以用来指定确切的视图ID，也可以设定为 `:default-view` 伪视图。

{% hint style="info" %}
开发者通常不需要这样做，因为不声明回退视图，就能实现 “页面刷新后呈现默认视图” 的效果。
{% endhint %}

除 DOM 指令外，View.js 也允许开发者通过 API 动态设置回退视图。例如：

{% tabs %}
{% tab title="init.js" %}
```javascript
var view = View.ofId("myView");

/**
 * 设置 myView 的回退视图为 default 命名空间下ID为 profile
 * 的视图
 */
view.setFallbackViewId("profile");

/**
 * 设置 myView 的回退视图为 myNamespace 命名空间下ID为 profile
 * 的视图
 */
view.setFallbackViewId("profile", "myNamespace");
```
{% endtab %}
{% endtabs %}

无论是通过 API 动态设置，还是借助 DOM 指令静态设置，View.js 并不要求设置的回退视图必须可以直接访问。

如果设置的回退视图不能直接访问，View.js 将逐级回退，直到找到最近的，可以直接访问的视图。如果回退链路上的所有视图都不能直接访问，View.js 将回退显示默认视图。

开发者可以通过 API：`view.getFallbackView()` 得知回退显示的最终视图。例如：

{% tabs %}
{% tab title="init.js" %}
```javascript
var subPageView = View.ofId("subPage"),
    subPageCenterView = View.ofId("subPageCenter");

/**
 * 视图：subPageCenter 不可直接访问
 */
subPageView.setFallbackViewId("subPageCenter");

/**
 * 视图：profile 可以直接访问
 */
subPageCenterView.setFallbackViewId("profile");

var fbView = subPageView.getFallbackView();
console.log(fbView.id); // -> profile
```
{% endtab %}
{% endtabs %}

