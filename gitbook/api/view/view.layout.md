---
description: 视图布局API
---

# View.layout

## getLayoutWidth\(\)

> 获取视图可布局空间的宽度，单位：像素。  
> 宽度等于视图容器的宽度，减去视图容器的左右内边距。  
> 视图的内容展现不应该超过该宽度。

**签名：**

`View.layout.getLayoutWidth(): number` 

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

视图可布局空间的宽度，单位：像素。

## getLayoutHeight\(\)

> 获取视图可布局空间的高度，单位：像素。  
> 宽度等于视图容器的高度，减去视图容器的上下内边距。  
> 视图的内容展现不应该超过该高度。

**签名：**

`View.layout.getLayoutHeight(): number` 

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

获取视图可布局空间的高度，单位：像素。

## getBrowserWidth\(\)

> 获取浏览器宽度，单位：像素。

**签名：**

`View.layout.getBrowserWidth(): number` 

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

浏览器宽度，单位：像素。

## getBrowserHeight\(\)

> 获取浏览器高度，单位：像素。

**签名：**

`View.layout.getBrowserHeight(): number` 

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

浏览器高度，单位：像素。

## isLayoutPortrait\(\)

> 判断布局空间是否为 potrait 模式：宽度小于等于高度。

**签名：**

`View.layout.isLayoutPortrait(): boolean` 

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

布局空间是否为 potrait 模式。

## isLayoutLandscape\(\)

> 判断布局空间是否为 landscape 模式：宽度大于高度。

**签名：**

`View.layout.isLayoutLandscape(): boolean` 

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

布局空间是否为 landscape 模式。

## isBrowserPortrait\(\)

> 判断浏览器是否为 potrait 模式：宽度小于等于高度。

**签名：**

`View.layout.isBrowserPortrait(): boolean` 

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

浏览器是否为 portrait 模式。

## isBrowserLandscape\(\)

> 判断浏览器是否为 landscape 模式：宽度大于高度。

**签名：**

`View.layout.isBrowserLandscape(): boolean` 

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

浏览器是否为 landscape 模式。

## getLayoutWidthHeightRatio\(\)

> 获取布局空间的宽高比。

**签名：**

`View.layout.getLayoutWidthHeightRatio(): number` 

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

布局空间的宽高比。

## getBrowserWidthHeightRatio\(\)

> 获取浏览器的宽高比。

**签名：**

`View.layout.getBrowserWidthHeightRatio(): number` 

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

浏览器的宽高比。

## getExpectedWidthHeightRatio\(\)

> 获取设置的、在PC上横屏浏览应用时，页面布局空间的宽高比。  
> PC 上横屏浏览时，View.js 默认将页面以 320 \* _568_ 分辨率（iPhone5 的分辨率）渲染。此时，视图容器的高度为浏览器窗口的高度，宽度为 `高度 / 568 * 320` ，并且水平居中。  
> 开发者可以使用 `data-view-whr` 属性 和 `View.layout.setExpectedWidthHeightRatio()` 设置为其它分辨率。

**签名：**

`View.layout.getExpectedWidthHeightRatio(): number` 

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

PC上横屏浏览应用时，页面布局空间的宽高比。

## setExpectedWidthHeightRatio\(\)

> 设置在PC上横屏浏览应用时，页面布局空间的宽高比。  
> PC 上横屏浏览时，View.js 默认将页面以 320 \* _568_ 分辨率（iPhone5 的分辨率）渲染。此时，视图容器的高度为浏览器窗口的高度，宽度为 `高度 / 568 * 320` ，并且水平居中。  
> 开发者可以使用 `data-view-whr` 属性 和 `View.layout.setExpectedWidthHeightRatio()` 设置为其它分辨率。

**签名：**

`View.layout.setExpectedWidthHeightRatio(): View.layout` 

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

`View.layout` - 以供开发者链式调用API。

## init\(\)

> 设置布局配置并初始化。

**签名：**

`View.layout.init(ops:` [`ViewLayoutInitOptions`](viewlayoutinitoptions.md)`): View.layout` 

**可用版本：**`1.6.2+`

**入参：**

* `ops` - 配置选项。可选。

**返回：**

`View.layout` - 以供开发者链式调用API。

## doLayout\(\)

> 根据当前的浏览模式和状态执行一次布局动作。

**签名：**

`View.layout.doLayout(async?: boolean): View.layout` 

**可用版本：**`1.6.2+`

**入参：**

* `async` - 是否异步执行。可选，默认为：`true`。

**返回：**

`View.layout` - 以供开发者链式调用API。

## addLayoutChangeListener\(\)

> 添加 “布局空间发生变化” 监听器。

**签名：**

`View.layout.addLayoutChangeListner(listener:` [`ViewLayoutChangeLisener`](viewlayoutchangelistener.md)`): View.layout` 

**可用版本：**`1.6.2+`

**入参：**

* `listener` - 监听器。

**返回：**

`View.layout` - 以供开发者链式调用API。

## removeLayoutChangeListener\(\)

> 移除 “布局空间发生变化” 监听器。

**签名：**

`View.layout.removeLayoutChangeListner(listener:` [`ViewLayoutChangeLisener`](viewlayoutchangelistener.md)`): View.layout` 

**可用版本：**`1.6.2+`

**入参：**

* `listener` - 监听器。

**返回：**

`View.layout` - 以供开发者链式调用API。

