# 视图布局

## 概述

作为用户视觉的页面载体，每个视图都可能拥有自己独特的布局结构，例如：

![&#x79FB;&#x52A8;&#x7AEF;&#x5E38;&#x89C1;&#x5E03;&#x5C40;&#x7ED3;&#x6784;](https://img-blog.csdnimg.cn/20190303194147538.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Jhb3poYW5nMDA3,size_16,color_FFFFFF,t_70)

大多数情况下，开发者使用 css 就可以完成页面布局。但有的时候，开发者需要使用 js 进行动态布局，并且要响应布局空间的大小变化，触发布局动作的再次执行。

为简化开发者的开发工作，View.js 按如下方式供开发者实现动态布局：

1. 开发者通过 API 向 View.js 提供布局动作
2. View.js 自动检测布局空间的变化，在必要的时候触发布局动作的执行

## 布局动作

布局动作，即为 View.js 为视图进行动态布局时要调用的方法。每个视图都有属于自己的布局动作，因此开发者需要分别设置。

View.js 在执行布局动作时，将传入可使用布局空间的宽度和高度。开发者应当确保视图内的元素不会超出这一空间大小，否则将会带来糟糕的视觉体验。

可布局空间的大小，受视图容器的尺寸和内边距影响。其中：

> 可布局宽度 = 视图容器.`clientWidth` - 视图容器.`padddingLeft` - 视图容器.`paddingRight`
>
> 可布局高度 = 视图容器.`clientHeight` - 视图容器.`paddingTop` - 视图容器.`paddingBottom`

之所以减去内边距，是考虑到开发者 “需要在视图容器内创建多视图共用的 footer” 的可能，从而用于为 footer 预留空间，实现 footer 与视图内容的无缝衔接。

开发者可以通过API：  
`view.setLayoutAction(action: Function, ifLayoutWhenLayoutChanges?: boolean = true)`   
设定布局动作。如：

{% tabs %}
{% tab title="init.layout.js" %}
```javascript
var view = View.ofId("myView");

var headerObj = view.find("header"),
    bodyObj = view.find(".body"),
    btnObj = view.find(".btn");

/**
 * 设置布局动作
 * @param {Number} layoutWidth 可布局空间的宽度
 * @param {Number} layoutHeight 可布局空间的高度
 */
view.setLayoutAction(function(layoutWidth, layoutHeight){
    /**
     * 可滚动区域的高度 = 布局空间总高度 - header高度 - 底部按钮的高度     */
    var height = layoutHeight - headerObj.offsetHeight - btnObj.offsetHeight;

    bodyObj.style.height = height + "px";
});
```
{% endtab %}
{% endtabs %}

设置布局动作后，View.js 将在视图每次进入时，`enter` 事件触发前自动触发布局动作的执行。

如果视图在活动状态下需要再次布局，开发者需要手动执行布局方法。例如：

{% tabs %}
{% tab title="init.js" %}
```javascript
var view = View.ofId("myView");

var btnObj = view.find(".btn");

/**
 * 根据数据状态确定是否需要呈现固定在页面底部的操作按钮。
 *
 * 由于按钮是固定在页面底部的，所以按钮显示或隐藏时，需要
 * 同步调整按钮上方可滚动区域的大小，使得页面内容在视觉上
 * 能够撑满整个空间。
 *
 * 这里展示的样例，是假定 “按钮是通过高度计算的方式而固定
 * 在底部” 的。如果按钮是通过 css 以绝对定位的方式固定的
 * ，就不需要这样做了。
 */
var ifShowBtnObj = true;
//...
btnObj.style.display = ifShowBtnObj? "block": "none";

/**
 * view.getLayoutAction() 可以获取先前设置的布局动作
 */
var layoutAction = view.getLayoutAction();

/**
 * 手动触发布局动作的再次执行
 */
layoutAction();
```
{% endtab %}
{% endtabs %}

## 场景化布局

在布局的功能设计上，View.js 假定不同浏览场景下需要展现的布局是不同的，允许开发者为此分别设置。

> 与 “布局动作，用于实现单个视图的动态调整” 所不同，场景化布局，多用于调整视图容器的显示效果，实现整个应用统一调整。

View.js 支持如下几种场景：

1. 使用 移动设备 在 竖屏模式 下浏览
2. 使用 移动设备 在 横屏模式 下浏览
3. 使用 平板设备 在 竖屏模式 下浏览
4. 使用 平板设备 在 横屏模式 下浏览
5. 使用 PC设备 在 类竖屏模式（窗口宽度小于等于高度） 下浏览
6. 使用 PC设备 在 类横屏模式（窗口宽度大于高度） 下浏览

开发者可以通过 API：`View.layout.init` 分别设置这几个不同场景下的布局动作，以实现场景化布局的目的。例如：

{% tabs %}
{% tab title="init.js" %}
```javascript
View.layout.init({
    /**
     * 当视口尺寸发生变化时，是否自动重新布局
     */
    autoReLayoutWhenResize: true, 

    /**
     * 使用 移动设备 在 竖屏模式 下浏览时的布局动作
     */
    layoutAsMobilePortrait: function(){doSth1();},
    /**
     * 使用 移动设备 在 横屏模式 下浏览时的布局动作
     */
    layoutAsMobileLandscape: function(){doSth2();},
    
    /**
     * 使用 平板设备 在 竖屏模式 下浏览时的布局动作
     */
    layoutAsTabletLandscape: function(){doSth3();},
    /**
     * 使用 平板设备 在 横屏模式 下浏览时的布局动作
     */
    layoutAsTabletPortrait: function(){doSth4();},
    
    /**
     * 使用 PC设备 在 类竖屏模式 下浏览时的布局动作
     */
    layoutAsPcPortrait: function(){doSth5();},
    /**
     * 使用 PC设备 在 类横屏模式 下浏览时的布局动作
     */
    layoutAsPcLandscape: function(){doSth6();}
});
```
{% endtab %}
{% endtabs %}

在实际运行时，View.js 将自动完成设备类型及设备方向的识别，并调用开发者设置的对应的布局动作。

{% hint style="warning" %}
开发者设置该方法后，`data-view-whr` 属性将失效。
{% endhint %}

默认情况下，View.js 假定移动设备的竖屏模式、移动设备的横屏模式、平板设备的竖屏模式、平板设备的横屏模式，PC的类竖屏模式表现一致，均为：

> 视图容器的宽度，等于浏览器宽度；  
> 视图容器的高度，等于浏览器高度；

而在 PC 上横屏浏览时，View.js 默认将页面以 320 \* 568 分辨率（iPhone5 的分辨率）渲染。此时，视图容器的高度为浏览器窗口的高度，宽度为 `高度 / 568 * 320`，并且水平居中。

形如：

![&#x9ED8;&#x8BA4;&#x7684; PC &#x7C7B;&#x6A2A;&#x5C4F;&#x5E03;&#x5C40;&#x6548;&#x679C;](https://img-blog.csdnimg.cn/20190303200402825.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Jhb3poYW5nMDA3,size_16,color_FFFFFF,t_70)

如果开发者不希望使用 320 \* 568 的分辨率，则可以通过在视图容器的 DOM 节点上声明 `data-view-whr` 属性以设定期望的视图宽高比。例如：

{% tabs %}
{% tab title="main.html" %}
```markup
<body data-view-container data-view-whr = "375/568">
    ...
</body>
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
'whr' 是 'width height ratio' 的缩写，用于表示 “宽度与高度的比值”。
{% endhint %}



效果如下所示：

![&#x5BBD;&#x9AD8;&#x6BD4;&#x4E3A; 375/568 &#x4E0B;&#x7684; PC &#x7C7B;&#x6A2A;&#x5C4F;&#x5E03;&#x5C40;&#x6548;&#x679C;](https://img-blog.csdnimg.cn/20190303201217485.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Jhb3poYW5nMDA3,size_16,color_FFFFFF,t_70)

