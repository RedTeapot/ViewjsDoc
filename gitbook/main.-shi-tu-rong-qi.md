# 视图容器

## 概述

视图容器，即为存放所有视图骨架的 DOM 容器。除非明确指定，否则 View.js 默认将 `document.body` 视为视图容器。

视图容器的作用，主要是为了限定视图的渲染范围、视觉位置，统一约束视图的外围轮廓等。通过调整视图容器的尺寸和位置，开发者可以实现不同的表现效果：

![&#x5728;&#x89C6;&#x56FE;&#x5BB9;&#x5668;&#x5185;&#x4F7F;&#x7528; padding &#x9884;&#x7559; footer &#x7684;&#x4F4D;&#x7F6E;](.gitbook/assets/1.gif)

![&#x5B9A;&#x4E49;&#x89C6;&#x56FE;&#x5BB9;&#x5668;&#x7684;&#x5C3A;&#x5BF8;](.gitbook/assets/2.gif)



开发者可以借助浏览器的开发者工具，通过识别 `data-view-container` 属性确定当前的视图容器，例如：

![&#x8BC6;&#x522B;&#x89C6;&#x56FE;&#x5BB9;&#x5668;1](.gitbook/assets/1.png)

也可以使用API得知：

![&#x8BC6;&#x522B;&#x89C6;&#x56FE;&#x5BB9;&#x5668;2](.gitbook/assets/2.png)

## 状态表达

除此之外，视图容器还承载着 “表达 View.js 的初始化状态，以及当前活动视图” 的责任。这些信息的表达，通过在其 DOM 上附加相关属性完成，例如：

![&#x8868;&#x8FBE;&#x7684;&#x4FE1;&#x606F;&#x5728;&#x89C6;&#x56FE;&#x5207;&#x6362;&#x65F6;&#x7684;&#x6539;&#x53D8;](.gitbook/assets/3.gif)

其中 `data-view-state=ready` 表示 “View.js 已准备就绪”，`data-active-view-id` 代表当前活动视图的 ID，`data-active-view-namespace` 代表当前活动视图的命名空间。

## 其它控制

### 直接访问

开发者可以设定视图是否可以直接访问。

视图是否“可以直接访问”，是指视图在传播打开或刷新时，是否在页面装载完毕后第一个呈现给用户。

如果页面装载完毕后，用户看到的第一个视图不是被传播访问或刷新的视图，我们就说视图是“不能直接访问的”；反之，视图就是“可以直接访问的”。

开发者可以在视图容器的 DOM 结点上声明属性 `data-view-directly-accessible=true|false` 以设定“所有视图是否可以直接访问”，也可以在特定视图的骨架 DOM 结点上单独声明，以设定该视图的单独表现情况。例如：

```html
<body>
  <div data-view-container data-view-directly-accessible="true">
    <section data-view-id = "view1" data-view-directly-accessible = "false">
    </section>
    <section data-view-id = "view2" data-view-directly-accessible = "true">
    </section>
    <section data-view-id = "view3">
    </section>
  </div>
</body>
```

其中，`view1` 不能直接访问，`view2` 可以直接访问（响应自身配置），`view3` 可以直接访问（响应全局配置）。

View.js 默认将所有视图设定为“不能直接访问”。

### 渲染宽高比

View.js 提供了 `data-view-whr` 属性，以允许开发者设定视图在 PC 的桌面环境浏览时，视图容器渲染尺寸的宽高比。

当用户在移动端浏览网页时，这一属性并无作用。但当浏览环境是 PC 这一 “宽度大于高度” 的情况时，View.js 将调整视图容器的渲染效果，使其 “高度撑满，宽度按比例动态计算，水平居中”，如下所示：

![320/568](https://img-blog.csdnimg.cn/20190303200402825.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Jhb3poYW5nMDA3,size_16,color_FFFFFF,t_70)

View.js 默认将其设定为 "320/568"，即为 iPhone5 的宽高比。开发者可以按需在视图容器上调整属性值：

```html
<div data-view-container data-view-whr = "375/568">
    ...
</div>
```

其效果效果如下所示：

![375/568](https://img-blog.csdnimg.cn/20190303201217485.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Jhb3poYW5nMDA3,size_16,color_FFFFFF,t_70)