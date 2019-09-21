# 视图标题

视图标题，是由每个视图分别声明，展示在浏览器标签页上的、独立的窗口标题。开发者可以借助视图标题实现 『进入不同页面展现不同标题』 的效果，如下图所示：

![&#x5728;&#x8FD9;&#x91CC;&#x63D2;&#x5165;&#x56FE;&#x7247;&#x63CF;&#x8FF0;](https://img-blog.csdnimg.cn/2019030318183622.gif)

实现上述效果，开发者只需要在视图的DOM节点上声明`data-view-title`属性并将视图标题赋值为属性值即可，如下图所示：

```markup
<section id="doc_what-is-spa"
    data-view="true"
    data-view-title="什么是单页应用">
    <header>
        <a class="nav-back" data-view-rel=":back"></a>
        <span>什么是单页应用</span>
    </header>
    <div class="body">
        <p>单页应用，是指将用户视觉上的多个页面（以下简称“视图”）在技术上使用一个载体来实现的应用。放到web前端环境中，这个载体就是单独的html文件。</p>
    </div>
    <footer><div class="btn next" data-view-rel="doc_impl-spa">下一节</div></footer>
</section>
```

当开发者为视图声明了视图标题后，View.js将在视图进入时自动使用设定的视图标题改写浏览器标题。在视图离开之后，进入下一个视图之前自动恢复浏览器标题。

需要注意的是，用于执行恢复动作的浏览器标题，是在视图初始化时自动捕获的（除非开发者另行设定，否则View.js将在`DOMContentLoaded`事件发生时自动初始化）。如果这一特性无法满足开发者，开发者则可以通过`View.setDocumentTitle({String} title)`主动通知View.js对应的浏览器标题。相关View.js源码如下所示：

```javascript
View.setDocumentTitle = function(title){
    if(util.isEmptyString(title, true)){
        globalLogger.warn("Invalid document title: " + title);
        return View;
    }

    document.title = documentTitle = title;
    return View;
};
```

