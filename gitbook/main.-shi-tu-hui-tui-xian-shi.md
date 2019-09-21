# 视图回退显示

View.js允许开发者设定视图是否可以『直接访问』，亦即：

> 是否可以根据视图的URI位置打开视图

我们来看一个可以直接打开的例子：

![&#x5728;&#x8FD9;&#x91CC;&#x63D2;&#x5165;&#x56FE;&#x7247;&#x63CF;&#x8FF0;](https://img-blog.csdnimg.cn/20190304133001243.gif)

如上图所示，视图：“attr\_data-view-rel”便是可以直接访问的。

我们再来看一个不能直接打开的例子：

![&#x5728;&#x8FD9;&#x91CC;&#x63D2;&#x5165;&#x56FE;&#x7247;&#x63CF;&#x8FF0;](https://img-blog.csdnimg.cn/20190306131714874.gif)

其中，视图：`ProfileSubPage` 和 `Page2` 均是不能直接访问，均在刷新后离开切换到了其它视图。亦即，这两个视图将显示动作回退至其它视图。

之所以 `ProfileSubPage` 视图在刷新后回退至 `Profile` 视图，而不是像 `Page2` 一样切换至首页，是因为该视图使用属性：`data-view-rel` 设定了回退视图（亦即，该视图不能直接访问时需要展现的视图），源码如下所示：

```markup
<section id = "profile-sub" data-view = "true" data-view-directly-accessible = "false" data-view-fallback = "profile">
    <header>
        <span class = "nav-back" data-view-rel = ":back"></span>
        ProfileSubPage
    </header>
    <h1>This is a sub page for profile.</h1>
    <div data-view-rel = "page3" class = "btn">Navigate to page 3.</div>
</section>
```

注：

> `data-view-fallback` 属性需要声明在视图的布局骨架上； 设定的回退视图也可以是不能直接访问的，此时View.js将以链条的形式自动向上查找可以直接访问的视图

有了这个特性的辅助，开发者就可以将复杂的功能拆分为多个子步骤，在多个视图中分别实施了。

