伪视图，是并不存在，但可以指导View.js进行视图切换的视图。这些视图通常具有特殊含义，如：首页、上一个界面、后一个界面等。这些视图并不是固定的，是会随着浏览位置的变更而发生变化的。

View.js预置了如下几个伪视图：
>- “:back”。代表上一个浏览的视图
>- “:forward”。代表下一个浏览的视图
>- “:default-view”。代表当前页面的默认视图

使用方法如下所示：

```html
<!DOCTYPE HTML>
<html>
<head>
    <link rel = "stylesheet" href = "main.css"/>
</head>
<body>
    <section id = "home-page" data-view = "true" data-view-title="首页" data-view-default = "true">
        ...
    </section>
    <section id = "goods-detail" data-view = "true" data-view-title = "商品详情">
        <header>
            <span class = "nav-back" data-view-rel = ":back">返回</span>
            <span class = "goods-name">商品名称</span>
        </header>
        <div class = "body">
            //图文介绍
        </div>
    </section>
</body>
</html>
```

```js
View.navTo(":default-view");
View.navTo(":back");// --> 等同于 View.back()
View.navTo(":forward");// --> 等同于 View.forward()
```