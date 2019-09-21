视图，是用户视觉上看到的一页内容，也是由 View.js 驱动的单页应用的页面区块载体。

视觉上一个界面向另一个界面的切换，在技术上则是同一HTML页面中一个视图区块向另一个视图区块的切换，如下图所示：


作为页面功能的单元载体，每个视图都是唯一的，都有唯一的ID及命名空间，以将其与其它视图区分开来。开发者通常并不需要指定视图的命名空间，默认为：default。

```html
<section data-view-id = "my-view">
    <header>标题</header>
    <div class = "body">正文区域</div>
</section>
```
>开发者可以使用 id 声明视图ID，也可以使用 data-view-id 声明视图ID

视图的内部组成，由我们熟悉的html、js、css以及依赖的图片和音视频等静态资源组成。不同的是，这些html、js和css等都只单纯地描述了这一个视图的行为表现，对于不同视图以及页面的整体表现，则需要开发者另外单独提供。

一个视图的目录组织有可能会是这样一个结构：

```
view2
  |--asset /* 资源 */
  |--img
      |--audio
      |--video
  |--js
      |--init.js /* 视图脚本 - 存放初始化脚本，如视图进入、离开时要执行的动作 */
      |--action.do-sth1.js /* 视图脚本 - 存放操作使能脚本，如：按钮点击等 */
      |--action.do-sth2.js /* 视图脚本 - 存放操作使能脚本，如：下拉刷新等 */
  |--css
      |--view.css /* 视图样式 */
```

上述目录结构并非是必须的，开发者可以根据自身需要和喜好，灵活地组织文件结构及命名。

大家可能注意到，上述目录结构是不包含视图的html片段的。这是因为 [HTML import](https://w3c.github.io/webcomponents/spec/imports/) 当前仍然处于草案阶段，尚未成为一项推荐标准从而可以指导浏览器普遍实现。为简单起见，我们暂且通过 “在页面中集中描述” 的方式定义视图的html骨架，如下所示：

```html
<!DOCTYPE HTML>
<html>
<head>
    <link rel = "stylesheet" href = "js/plugin/view/view.min.css"/>
 
    <link rel = "stylesheet" href = "css/main/view1.css"/>
    <link rel = "stylesheet" href = "css/main/view2.css"/>
</head>
<body>
    <section id = "view1" data-view = "true" data-view-default = "true" data-view-title="View title 1">
        ...
        <a data-view-rel = "view2">切换至view2</a>
    </section>
    <section id = "view2" data-view = "true" data-view-title = "View title 2">
        ...
    </section>
 
    <script type = "text/javascript" src = "js/plugin/view/view.min.js"></script>
 
    <!-- 使能view1操作 -->
    <script type = "text/javascript" src = "js/main/view1/init.js"></script>
    <script type = "text/javascript" src = "js/main/view1/action.js"></script>
 
    <!-- 使能view2操作 -->
    <script type = "text/javascript" src = "js/main/view2/init.js"></script>
    <script type = "text/javascript" src = "js/main/view2/action.do-sth1.js"></script>
    <script type = "text/javascript" src = "js/main/view2/action.do-sth2.js"></script>
</body>
</html>
```

其中，ID为"view1"和"view2"的两个DOM元素，便是两个视图的布局骨架。当使用程序时，用户看到的视觉效果分别是由view1和view2提供的。当区块 view1 活动时，用户看到的是 view1 的表现效果；当活动的视图切换至 view2 时，用户看到的是 view2 的表现效果。

概括来讲，只要使用世界通用的web知识为页面定义了骨架、撰写了样式、完成了交互逻辑，并将这些样式、脚本文件引入到目标页面中，页面就能如期正常工作。

>如果按照上面的例子实施项目的日常功能开发，将会给多人协作带来不便。这是因为多个视图的骨架，是在同一文件中手动添加的。而多人频繁修改同一文件，在版本控制中会大概率遇到冲突现象。但请放心，我们将会在不远的未来推出 开发工程，届时开发者可以在视图内部定义代码片段，最终集成到页面上即可。