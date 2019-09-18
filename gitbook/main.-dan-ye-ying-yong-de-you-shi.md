我们先来个直观的体验。

![](https://img-blog.csdn.net/20180831203737695?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Jhb3poYW5nMDA3/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

由于技术架构的不同，单页应用有着多项多页应用无法比拟的优势，例如：

- “页面”切换速度快；
- 支持复杂类型的数据传递，如：DOM元素、Object对象、回调方法等；
- 可为页面切换过程添加转场动画 ；
- 资源不需要重复加载

# “页面”切换速度快

这里的“页面”，是用户角度的页面，是视觉上占据了屏幕一屏内容的页面。技术上与之对应的，只是文档中预先存在的一个区块而已，如下所示：

![](https://img-blog.csdn.net/20180831205546866?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Jhb3poYW5nMDA3/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

页面切换，从多页应用中一系列资源的加载和呈现，变为了单页应用中活动视图（用户可见的区块部分）的更换。效率和速度自然不言而喻。

# 复杂类型的数据传递

因为浏览器渲染的DOM文档没有变化，所以活动视图的切换过程可以携带任意被浏览器支持的js类型。例如：

```js
View.navTo("address-list", {
    params: {
        selectCallback: function(selectedAddress){
            //Do something with selected address...
        }
    }
});
```

效果如下所示：

![](https://img-blog.csdn.net/20180904132759770?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Jhb3poYW5nMDA3/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

# 添加转场动画

转场动画，可以使用CSS实现，也可以用JS实现，或者是两者的结合体。

这是一个在View框架下用CSS实现的例子：

![](https://img-blog.csdn.net/2018090911130612?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Jhb3poYW5nMDA3/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

不仅如此，View还会告诉开发者目标视图的进入方式： 是主动进入的，还是浏览器后退进入的。这样我们可以实现下面这样的效果：

![](https://img-blog.csdn.net/20180909114814440?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Jhb3poYW5nMDA3/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

同学们可以去 [这里](http://wzhsoft.com/#demos) 探究一二。

单页应用的这些优势逐个叠加在一起，造就了H5更为接近原生App的体验。对于想要保持尽量好的用户体验的同时，又要节省研发成本的团队而言，无疑是一个不错的选择。

虽然成本相对较高，但没有付出，又哪里能有收获呢？