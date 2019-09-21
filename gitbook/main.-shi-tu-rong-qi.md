# 视图容器

在使用View.js开发移动端应用时，我们通常以视图为单位拆分并实施对应的功能开发。一个视图完整的包括了一个单独的界面所要展现的所有内容。也就是说，视觉上一个页面中的所有内容，都是一个特定的视图所提供的。虽然视图之间可能含有视觉上的共性元素，但出于简化问题的考虑，View.js并不打算支持视图内局部元素的跨视图复用。

针对“多个视图的视图正文中含有视觉相同的元素”的场景，View.js建议开发者将其在不同视图中分别定义。但对于视图正文之外的其它边界位置，如视图上方、视图下方等用于执行跨视图任务的区域，开发者则可以利用View.js提供的“视图容器”实现这种“页面局部区块是单页应用”的特性。

例如，对于所有视图都需要在底部展现导航入口的场景，开发者就可以按照下面代码展现的方式组织DOM：

```markup
<!DOCTYPE HTML>
<html>
<head>
    <link rel = "stylesheet" href = "main.css"/>
</head>
<body>
    <div data-view-container>
        <section id = "view1" data-view = "true" >
        ...
        </section>
        <section id = "view2" data-view = "true" >
            ...
        </section>  </section>ion>
    </div>
    <footer>
        <span>首页</span>
        <span>分类</span>
        <span>购物车</span>
        <span>我的</span>
    </footer>
</body>
</html>
```

其中，data-view-container属性用于告知View.js视图容器的位置。除非额外指定，否则View.js将使使用document.body作为视图容器。

同样地，在使用View.js完成诸如PC管理后台的功能开发时，开发者可以将主操作区域使用视图容器整合在一起，而将操作区域之外的顶部导航和侧边导航作为多视图共享使用的DOM单独定义。

