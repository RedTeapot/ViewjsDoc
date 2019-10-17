# 视图容器

视图容器，即为存放所有视图骨架的 DOM 容器。除非明确指定，否则 View.js 默认将 `document.body` 视为视图容器。

视图容器的作用，主要是为了限定视图的渲染范围、视觉位置，统一约束视图的外围轮廓等。通过调整视图容器的尺寸和位置，开发者可以实现不同的表现效果：

![&#x5728;&#x89C6;&#x56FE;&#x5BB9;&#x5668;&#x5185;&#x4F7F;&#x7528; padding &#x9884;&#x7559; footer &#x7684;&#x4F4D;&#x7F6E;](.gitbook/assets/1.gif)

![&#x5B9A;&#x4E49;&#x89C6;&#x56FE;&#x5BB9;&#x5668;&#x7684;&#x5C3A;&#x5BF8;](.gitbook/assets/2.gif)



开发者可以借助浏览器的开发者工具，通过识别 `data-view-container` 属性确定当前的视图容器，例如：

![&#x8BC6;&#x522B;&#x89C6;&#x56FE;&#x5BB9;&#x5668;1](.gitbook/assets/1.png)

也可以使用API得知：

![&#x8BC6;&#x522B;&#x89C6;&#x56FE;&#x5BB9;&#x5668;2](.gitbook/assets/2.png)



除此之外，视图容器还承载着 “表达 View.js 的初始化状态，以及当前活动视图” 的责任。这些信息的表达，通过在其 DOM 上附加相关属性完成，例如：

![&#x8868;&#x8FBE;&#x7684;&#x4FE1;&#x606F;&#x5728;&#x89C6;&#x56FE;&#x5207;&#x6362;&#x65F6;&#x7684;&#x6539;&#x53D8;](.gitbook/assets/3.gif)

其中 `data-view-state=ready` 表示 “View.js 已准备就绪”，`data-active-view-id` 代表当前活动视图的 ID，`data-active-view-namespace` 代表当前活动视图的命名空间。



