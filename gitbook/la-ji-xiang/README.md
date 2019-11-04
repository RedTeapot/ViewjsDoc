# 垃圾箱

一个视图的目录组织有可能会是这样一个结构：

```text
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

大家可能注意到，上述目录结构是不包含视图的html片段的。这是因为 [HTML import](https://w3c.github.io/webcomponents/spec/imports/) 当前仍然处于草案阶段，尚未成为一项推荐标准从而可以指导浏览器普遍实现。为简单起见，我们暂且通过 “在页面中集中描述” 的方式定义视图的html骨架，如下所示

```markup
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



细心的开发者可能已经发觉，如果按照上面的例子实施项目的日常功能开发，将会给多人协作带来不便。这是因为多个视图的骨架，是在同一文件中【手动】添加的。而多人频繁修改同一文件，在版本控制中会大概率遇到冲突现象。但请放心，我们将会在后面的章节中介绍一种更智能，更利于产出积累，实现持续集成的做法：将视图 【安装 】到界面中。



概括来讲，只要使用世界通用的web知识为页面定义了骨架、撰写了样式、完成了交互逻辑，并将这些样式、脚本文件引入到目标页面中，页面就能如期正常工作。
