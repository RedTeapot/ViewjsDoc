# 视图

## 概述

视图，是 View.js 驱动的单页应用的单元载体，用于定义用户视觉上看到的一屏内容。

视觉上一个界面向另一个界面的切换，在技术上是同一 HTML 页面中，可见区域从一个 DIV 区块向另一个 DIV 区块的切换。这些动态被切换显示的 DIV 区块就是视图。

## 创建视图

作为页面的功能单元，每个视图都是唯一的，都有唯一的ID及命名空间以将其与其它视图区分开来。

通过为特定的 DIV 区块添加属性：`data-view-id` 来定义视图的ID，开发者即可完成视图的创建：

```markup
<!DOCTYPE HTML>
<html>
<head>
    <link rel = "stylesheet" href = "js/plugin/view/view.min.css"/>
    <link rel = "stylesheet" href = "css/main/view1.css"/>
</head>
<body>
    <!-- 定义 default 命名空间下，ID为 view1 的视图 -->
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
    
    <!-- 定义 my-namespace 命名空间下，ID为 view2 的视图-->
    <section
        data-view-id = "view2"
        data-view-namespace = "my-namespace">
        ...
    </section>

    <script type = "text/javascript" src = "js/plugin/view/view.min.js"></script>
</body>
</html>
```

上述代码展示了两个视图的创建。其中，ID 为 `view1` 和 `view2` 的两个 DOM 元素，分别是两个视图的内容骨架，他们共同定义了应用的视觉效果和使用体验。

当区块 `view1` 处于活动状态时，用户看到的是视图 `view1` 的表现效果；当活动视图（处于活动状态的视图）切换至 `view2` 时，用户看到的是视图 `view2` 的表现效果。

{% hint style="info" %}
检验视图创建是否成功，可以通过执行API：`View.ifExists(viewId: {String})` - 判断视图是否存在 得知。
{% endhint %}

## 赋能视图

视图在创建完成后，只具备了静态展现的能力，开发者需要手动开发脚本，实现视图内的数据展现和操作交互等，例如：

{% tabs %}
{% tab title="init.js" %}
```javascript
/**
 * 为视图 view1 赋能：视图初始化
 */
 
var view = View.ofId("view1");

var bodyObj = view.find(".body");
var nameInputObj = view.find(".name input"),
    addressInputObj = view.find(".address input");


/**
 * 查询并呈现用户信息
 */
var queryAndShowUserInfo = function(){
    $.post("/userInfo", {
        onsuccess: function(data){
            nameInputObj.value = data.userName || "";
            addressInputObj.value = data.address || "";
        }
    });
};

/**
 * 重置视图
 */
var resetView = function(){
    /* 清空输入框的内容 */
    nameInputObj.value = "";
    addressInputObj.value = "";

    /* 重置浏览位置，使其回到顶部 */
    bodyObj.scrollTop = 0;
};

/**
 * 视图进入时查询并展现用户信息
 * 'enter' 是 View.js 预置的事件，代表视图的进入
 */    
view.on("enter", queryAndShowUserInfo);

/**
 * 视图离开时重置视图
 *
 * 'leave' 是View.js 预置的事件，代表视图的离开
 */
view.on("leave", resetView);
```
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="action.js" %}
```javascript
/**
 * 为视图 view1 赋能：添加交互支持
 */
 
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
{% endtab %}
{% endtabs %}

{% hint style="info" %}
View.js 能够很友好地与其它 _非路由类_  框架并存，例如：jQuery, knockout, vue 等，开发者可以一如既往地按照传统开发方式使用这些框架。
{% endhint %}

## 访问视图

开发者可以通过访问 html 页面，并使用 `#` 符号指定视图信息来访问视图。

例如，URL：

> http://view-js.com/demo.html\#view1

表示 “访问定义在 demo.html 中的，命名空间为 `default`，ID 为 `view1` 的视图”。而对于URL：

> http://view-js.com/index.html\#view2@myNamespace

则表示 “访问定义在 index.html 中的，命名空间为 `myNamespace`，ID 为 `view2` 的视图”。其中，`@` 符号为 视图ID 与 视图命名空间的分隔符。

如果没有指定视图信息，那么页面打开后，View.js 将自动展现默认视图。

当活动视图发生变化时，View.js 将根据新的活动视图信息，实时构造新的 URL 并将其反馈到浏览器的地址栏中。

{% hint style="info" %}
视图当前仅支持 hash 形态的地址栏表示，且不支持自定义。出于简化开发的考虑，View.js 当前也并不打算变更这一特性。
{% endhint %}

## 注意事项

每个视图都是以渲染模板的姿态唯一存在的，开发者需要使用 “静态模板 + 动态填充数据” 的方式完成视图的功能开发。

开发者可以动态、灵活调整视图内部的 DOM 结构，但不能删除、或替换视图的根结点 DOM 元素。

