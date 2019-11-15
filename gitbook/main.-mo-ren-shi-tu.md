# 默认视图

默认视图，即为页面加载完成后，第一个展现给用户的视图。

除非明确指定，否则 View.js 将使用视图容器的 DOM 树中，自上而下 顺序的第一个视图为默认视图。必要时，开发者可以使用 `data-view-default` 属性静态指定，如下所示：

```javascript
<!DOCTYPE HTML>
<html>
<head>
    <link rel = "stylesheet" href = "js/plugin/view/view.min.css"/>

    <link rel = "stylesheet" href = "css/main/view1.css"/>
    <link rel = "stylesheet" href = "css/main/view2.css"/>
</head>
<body>
    <section data-view-id = "view1" data-view-title="View title 1">
        ...
    </section>
    <section data-view-id = "view2" data-view-title = "View title 2" data-view-default = "true">
        ...
    </section>

    <script type = "text/javascript" src = "js/plugin/view/view.min.js"></script>
</body>
</html>
```

虽然视图 view1 先于 view2 存在，但由于明确指定了视图 view2 为默认视图，所以页面打开后，View.js 将自动展现 view2。

> 如果有多个视图被声明为默认视图，则 View.js 将依据 DOM 自上而下 的顺序，使用声明的第一个默认视图。

开发者也可以在 View.js 就绪前通过脚本动态指定，如下所示：

{% code title="init.js" %}
```javascript
View.beforeInit(function(){
    View.setAsDefault("home-page");

    console.log(View.getDefaultView().getId());// --> home-page
});
```
{% endcode %}

