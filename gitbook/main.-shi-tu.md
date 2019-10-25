# 视图

## 概述

视图，是用户视觉上看到的一页内容，也是由 View.js 驱动的单页应用的页面区块载体。视觉上一个界面向另一个界面的切换，在技术上则是同一 HTML 页面中，可见区域从一个 DIV 区块向另一个 DIV 区块的切换。这个 DIV 区块就是视图。

作为页面功能的单元载体，每个视图都是唯一的，都有唯一的ID及命名空间（开发者通常并不需要指定视图的命名空间，默认为 `default`）以将其与其它视图区分开来。

对于视图的内部组成，仍然由我们熟悉的html、js、css以及依赖的图片和音视频等静态资源组成。不同的是，这些html、js和css等都只单纯地描述了这一个视图的行为表现，对于不同视图以及页面的整体表现，需要开发者分别提供。

## 创建视图

通过为特定的 DIV 区块添加属性：`data-view-id` ，开发者即可完成视图的创建：

```markup
<!DOCTYPE HTML>
<html>
<head>
    <link rel = "stylesheet" href = "js/plugin/view/view.min.css"/>
    <link rel = "stylesheet" href = "css/main/view1.css"/>
</head>
<body>
    <section data-view-id = "view1">
        <header>个人资料</header>
        <div class = "body">
            <div class = "item name">
                <label>姓名：</label><input/>
            </div>
            <div class = "item address">
                <label>住址：</label><input/>
            </div>

            <div class = "btn">提交</div>
        </div>
    </section>
    <section data-view-id = "view2">
        ...
    </section>

    <script type = "text/javascript" src = "js/plugin/view/view.min.js"></script>
</body>
</html>
```

其中，ID为 `view1` 和 `view2`的两个DOM元素，分别是两个视图的内容骨架。当使用程序时，用户看到的视觉效果分别是由 `view1` 和 `view2` 提供的。当区块 `view1` 处于活动状态时，用户看到的是 `view1` 的表现效果；当活动视图（处于活动状态的视图）切换至 `view2` 时，用户看到的是 `view2` 的表现效果。

> 检验视图创建是否成功，可以在文档装载完毕后通过执行API：`View.ifExists(viewId: {String})` - 判断视图是否存在 得知；
>
> 检验视图是否处于活动状态，可以通过执行API：view.isActive\(\) 得知。也可以通过API：View.getActiveView\(\) 获取当前处于活动状态的视图实例。

## 赋能视图

视图创建完成后，开发者即可添加脚本，实现视图内的数据展现、操作交互等，例如：

{% code-tabs %}
{% code-tabs-item title="init.js" %}
```javascript
var view = View.ofId("view1");

var bodyObj = view.find(".body");
var nameInputObj = view.find(".name input"),
    addressInputObj = view.find(".address input");

/**
 * 视图进入时查询并展现用户信息
 */    
view.on("enter", function(){
    $.post("/userInfo", {
        onsuccess: function(data){
            nameInputObj.value = data.userName || "";
            addressInputObj.value = data.address || "";
        }
    });
});
```
{% endcode-tabs-item %}
{% endcode-tabs %}

{% code-tabs %}
{% code-tabs-item title="init.reset-view.js" %}
```javascript
var view = View.ofId("view1");

var bodyObj = view.find(".body");
var nameInputObj = view.find(".name input"),
    addressInputObj = view.find(".address input");

var resetView = function(){
    /* 清空输入框的内容 */
    nameInputObj.value = "";
    addressInputObj.value = "";

    /* 重置浏览位置，使其回到顶部 */
    bodyObj.scrollTop = 0;
};

/**
 * 视图离开时重置视图
 */
view.on("leave", resetView);
```
{% endcode-tabs-item %}
{% endcode-tabs %}

{% code-tabs %}
{% code-tabs-item title="action.js" %}
```javascript
var view = View.ofId("view1");

var nameInputObj = view.find(".name input");
var submitObj = view.find(".btn");

/**
 * 提交数据
 */
submitObj.addEventListener("click", function(){
    var name = nameInputObj.value.trim();
    //do something
});
```
{% endcode-tabs-item %}
{% endcode-tabs %}

View.js 能够很友好地与其它 _非路由类_ _\*\*_框架并存，例如：jQuery, knockout, vue 等，开发者可以一如既往地按照传统的开发方式使用这些框架。

## URL

//TODO

## 注意事项

{% hint style="warning" %}
无论什么时候，每个视图只有唯一的一个实例与之对应，其内容骨架不会发生变更或替换，其中DOM元素的状态、输入框的取值等自然也不会自动被重置。开发者需要自行维护好视图内DOM元素的状态，使其不至于在页面切换时出现脏数据等现象。我们的建议，是在恰当的时机，如 “视图离开时” 重置视图。
{% endhint %}

