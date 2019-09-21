# 默认视图

当使用View.js构建的应用程序同时包含多个视图时，开发者可能需要明确指定页面加载完成后要默认呈现的第一个视图。

这个需要默认呈现的视图，就是默认视图。在没有明确指定时，View.js将默认使用DOM树中自上而下的第一个视图为默认视图。

必要时，开发者可以使用 data-view-default 属性静态指定，如下所示：

```javascript
<!DOCTYPE HTML>
<html>
<head>
    <link rel = "stylesheet" href = "js/plugin/view/view.min.css"/>

    <link rel = "stylesheet" href = "css/main/view1.css"/>
    <link rel = "stylesheet" href = "css/main/view2.css"/>
</head>
<body>
    <section id = "view1" data-view = "true" data-view-title="View title 1">
        ...
    </section>
    <section id = "view2" data-view = "true" data-view-title = "View title 2" data-view-default = "true">
        ...
    </section>

    <script type = "text/javascript" src = "js/plugin/view/view.min.js"></script>
</body>
</html>
```

虽然视图 view1 先于 view2 存在，但由于视图 view2 被开发者明确指定为默认视图，所以页面打开后，View.js将自动展现 view2。

如果有多个视图被静态声明为默认视图，则View.js将依据DOM自上而下的顺序，使用声明的第一个默认视图。

开发者也可以在页面加载完成前通过脚本动态指定，如下所示：

```javascript
View.beforeInit(function(){
    View.setAsDefault("home-page");

    console.log(View.getDefaultView().getId());// --> home-page
});
```

同时，为帮助开发者实现业务代码的松耦合，View.js允许开发者在执行视图切换操作时，使用 ":default-view" 伪视图代替具体的视图名，如下所示：

```javascript
View.beforeInit(function(){
    View.setAsDefault("home-page");
});

//...

View.navTo(":default-view");//等同于 View.navTo("home-page")
```

