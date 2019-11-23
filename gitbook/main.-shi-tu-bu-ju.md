# 视图布局

## 概述

作为用户视觉的页面载体，每个视图都可能拥有自己独特的布局结构，例如：

![&#x79FB;&#x52A8;&#x7AEF;&#x5E38;&#x89C1;&#x5E03;&#x5C40;&#x7ED3;&#x6784;](https://img-blog.csdnimg.cn/20190303194147538.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Jhb3poYW5nMDA3,size_16,color_FFFFFF,t_70)

大多数情况下，开发者使用 css 就可以完成页面布局。但有的时候，开发者需要使用 js 进行动态布局，并且要响应布局空间的大小变化（例如：窗口大小的变化），触发布局动作的再次执行。

为简化开发者的开发工作，View.js按如下方式供开发者实现动态布局：

1. 开发者通过 API 向 View.js 提供布局动作
2. View.js 自动检测布局空间的变化，在必要的时候触发布局动作的执行

## 布局动作

布局动作，即为 View.js 为视图进行动态布局时要调用的方法。每个视图都有属于自己的布局动作，因此开发者需要分别设置。

View.js 在执行布局动作时，将传入开发者可使用的布局空间的宽度和高度。开发者应当确保视图内的元素不会超出这一空间大小，否则将会带来糟糕的视觉体验。

可布局空间的大小，受视图容器的尺寸和内边距影响。其中：

> 可布局宽度 = 视图容器.`clientWidth` - 视图容器.`padddingLeft` - 视图容器.`paddingRight`
>
> 可布局高度 = 视图容器.`clientHeight` - 视图容器.`paddingTop` - 视图容器.`paddingBottom`

源码如下：

{% tabs %}
{% tab title="View.js源码片段" %}
```javascript
/**
 * 获取布局宽度
 */
var getLayoutWidth = function(){
	var containerObj = getViewContainerObj();
	var style = util.getComputedStyle(containerObj);
	var paddingLeft = Number(style.paddingLeft.replace(/px/, "")),
		paddingRight = Number(style.paddingRight.replace(/px/, ""));
	if(isNaN(paddingLeft))
		paddingLeft = 0;
	if(isNaN(paddingRight))
		paddingRight = 0;
	return containerObj.clientWidth - paddingLeft - paddingRight;
};

/**
 * 获取布局高度
 */
var getLayoutHeight = function(){
	var containerObj = getViewContainerObj();
	var style = util.getComputedStyle(containerObj);
	var paddingTop = Number(style.paddingTop.replace(/px/, "")),
		paddingBottom = Number(style.paddingBottom.replace(/px/, ""));
	if(isNaN(paddingTop))
		paddingTop = 0;
	if(isNaN(paddingBottom))
		paddingBottom = 0;
	return containerObj.clientHeight - paddingTop - paddingBottom;
};
```
{% endtab %}
{% endtabs %}

> 之所以减去内边距，是考虑到开发者 “需要在视图容器内创建多视图共用的 footer” 的可能，从而用于为 footer 预留空间，实现 footer 与视图内容的无缝衔接。



开发者可以通过API：  
`view.setLayoutAction(action: Function, ifLayoutWhenLayoutChanges?: boolean = true)`   
设定布局动作。如：

{% tabs %}
{% tab title="init.layout.js" %}
```javascript
var view = View.ofId("myView");

var headerObj = view.find("header"),
    bodyObj = view.find(".body");

view.setLayoutAction(function(){
    /**
     * 可滚动区域的高度 = 布局空间总高度 - header高度
     */
    var totalHeight = View.layout.getLayoutHeight();
    var height = totalHeight - headerObj.offsetHeight;

    bodyObj.style.height = height + "px";
});
```
{% endtab %}
{% endtabs %}

布局动作会在视图的每次进入前（ `enter` 事件触发前）执行。如果视图是第一次进入，则在 `ready` 事件触发前执行。

此外，在布局的功能设计上，View.js假定不同分辨率下所需要执行的布局动作是不同的。

View.js支持分别为如下几种场景设定不同的布局动作：

1. 移动设备的竖屏模式
2. 移动设备的横屏模式
3. 平板设备的竖屏模式
4. 平板设备的横屏模式
5. PC设备的竖屏模式
6. PC设备的横屏模式

设定布局动作后，View.js自动完成设备类型及设备方向的识别并调用对应的布局动作。例如：

```javascript
/* 初始化：设置布局参数 */
View.layout.init({
    autoReLayoutWhenResize: true, /* 当视口尺寸发生变化时，是否自动重新布局 */

    layoutAsMobilePortrait: function(){},/* 手机环境下以 竖屏 方式使用应用时的布局方式 */
    layoutAsMobileLandscape: function(){},/* 手机环境下以 横屏 方式使用应用时的布局方式 */
    layoutAsTabletLandscape: function(){},/* 平板环境下以 竖屏 方式使用应用时的布局方式 */
    layoutAsTabletPortrait: function(){},/* 平板环境下以 横屏 方式使用应用时的布局方式 */
    layoutAsPcPortrait: function(){},/* PC桌面环境下以 竖屏 方式使用应用时的布局方式 */
    layoutAsPcLandscape: function(){}/* PC桌面环境下以 横屏 方式使用应用时的布局方式 */
});

/* 根据初始化时设置的各个模式下的浏览方式，结合设备当前的浏览方向和设备类型自动进行布局 */
View.layout.doLayout();
```

默认情况下，View.js假定移动设备的竖屏模式、移动设备的横屏模式、平板设备的竖屏模式和平板设备的横屏模式表现一致，均为：

> 宽度渲染为浏览器宽度，高度自动

而在PC上浏览时，除非开发者通过 `View.layout.init()` 方法指定了【PC横屏的布局方式】，否则View.js默认将页面以的 320 \* 568 分辨率（iPhone5 的分辨率）渲染。亦即，PC横屏浏览时，View.js将根据浏览器高度动态计算可用高度，并根据iPhone5的分辨率计算宽度，然后将界面水平居中呈现；PC纵屏浏览时，将其以移动设备的竖屏模式对待。相关View.js源码如下所示：

```javascript
/**
 * 以手机版式下的竖屏模式（宽小于高）进行布局。this：视图容器DOM元素
 * @param {Number} width 布局空间的宽度
 * @param {Number} height 布局空间的高度
 */
var layoutAsMobilePortrait_dft = function(width, height){
    var viewContainerObj = this;
    var s = viewContainerObj.style;

    s.width = width + "px";
    s.height = height + "px";
};
var layoutAsMobilePortrait = layoutAsMobilePortrait_dft;

/**
 * 以手机版式下的横屏模式（宽大于高）进行布局。this：视图容器DOM元素
 * @param {Number} width 布局空间的宽度
 * @param {Number} height 布局空间的高度
 */
var layoutAsMobileLandscape_dft = layoutAsMobilePortrait;
var layoutAsMobileLandscape = layoutAsMobileLandscape_dft;

/**
 * 以平板版式下的竖屏模式（宽小于高）进行布局。this：视图容器DOM元素
 * @param {Number} width 布局空间的宽度
 * @param {Number} height 布局空间的高度
 */
var layoutAsTabletPortrait_dft = layoutAsMobilePortrait;
var layoutAsTabletPortrait = layoutAsTabletPortrait_dft;

/**
 * 以平板版式下的横屏模式（宽大于高）进行布局。this：视图容器DOM元素
 * @param {Number} width 布局空间的宽度
 * @param {Number} height 布局空间的高度
 */
var layoutAsTabletLandscape_dft = layoutAsMobileLandscape;
var layoutAsTabletLandscape = layoutAsTabletLandscape_dft;

/**
 * 以PC版式下的竖屏模式（宽小于高）进行布局。this：视图容器DOM元素
 * @param {Number} width 布局空间的宽度
 * @param {Number} height 布局空间的高度
 */
var layoutAsPcPortrait_dft = layoutAsMobilePortrait;
var layoutAsPcPortrait = layoutAsPcPortrait_dft;

/**
 * 以PC版式下的横屏模式（宽大于高）进行布局。this：视图容器DOM元素
 * @param {Number} width 布局空间的宽度
 * @param {Number} height 布局空间的高度
 */
var layoutAsPcLandscape_dft = layoutAsMobileLandscape;
var layoutAsPcLandscape = layoutAsPcLandscape_dft;

/**
 * 以手机版式进行布局（自动判断横竖屏）
 */
var layoutAsMobile = function(){
    var width = getBrowserWidth(), height = getBrowserHeight();
    var f = isBrowserLandscape()? layoutAsMobileLandscape: layoutAsMobilePortrait;
    util.try2Call(f, getViewContainerObj(), width, height);
};

/**
 * 以平板版式进行布局（自动判断横竖屏）
 */
var layoutAsTablet = function(){
    var width = getBrowserWidth(), height = getBrowserHeight();
    var f = isBrowserLandscape()? layoutAsTabletLandscape: layoutAsTabletPortrait;
    util.try2Call(f, getViewContainerObj(), width, height);
};

/**
 * 以PC版式进行布局（自动判断横竖屏）
 */
var layoutAsPC = function(){
    var width = getBrowserWidth(), height = getBrowserHeight();
    if(isBrowserPortrait())
        util.try2Call(layoutAsPcPortrait, getViewContainerObj(), width, height);
    else if(layoutAsPcLandscape === layoutAsPcLandscape_dft){/* 没有指定自定义的PC横屏布局办法，则以蓝图手机版式布局 */
        width = height * expectedWidthHeightRatio;
        util.try2Call(layoutAsMobilePortrait, getViewContainerObj(), width, height);
    }else
        util.try2Call(layoutAsPcLandscape, getViewContainerObj(), width, height);
};
```

PC浏览效果：

![&#x5728;&#x8FD9;&#x91CC;&#x63D2;&#x5165;&#x56FE;&#x7247;&#x63CF;&#x8FF0;](https://img-blog.csdnimg.cn/20190303200402825.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Jhb3poYW5nMDA3,size_16,color_FFFFFF,t_70)

如果开发者不希望使用 320 \* 568 的分辨率，则可以通过在html节点上声明 `data-view-whr` 属性以设定期望的视图宽高比。例如：

```markup
<html data-view-whr = "375/568">
    ...
</html>
```

效果如下所示：

![&#x5728;&#x8FD9;&#x91CC;&#x63D2;&#x5165;&#x56FE;&#x7247;&#x63CF;&#x8FF0;](https://img-blog.csdnimg.cn/20190303201217485.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Jhb3poYW5nMDA3,size_16,color_FFFFFF,t_70)

