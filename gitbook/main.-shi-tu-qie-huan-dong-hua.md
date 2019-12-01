# 视图跳转动画

## 概述

视图跳转动画，是指活动视图从一个视图切换至另外一个视图的过程中，展现给用户的动画效果。 

View.js 提供的默认样式中，是不含跳转动画的。

## 效果预览

我们来看两个例子：

[动画1](http://wzhsoft.com/demo/view-switch-animation/1/index.html)（点击体验）

![&#x5728;&#x8FD9;&#x91CC;&#x63D2;&#x5165;&#x56FE;&#x7247;&#x63CF;&#x8FF0;](https://img-blog.csdnimg.cn/20190318185939367.gif)

[动画2](http://wzhsoft.com/demo/view-switch-animation/2/index.html)（点击体验）

![&#x5728;&#x8FD9;&#x91CC;&#x63D2;&#x5165;&#x56FE;&#x7247;&#x63CF;&#x8FF0;](https://img-blog.csdnimg.cn/20190318185953112.gif) 

开发者也可以选择不应用动画，效果如下图所示： ![&#x5728;&#x8FD9;&#x91CC;&#x63D2;&#x5165;&#x56FE;&#x7247;&#x63CF;&#x8FF0;](https://img-blog.csdnimg.cn/20190318190725879.gif)



细心的读者可能已经发现，在 [前文给的例子](https://blog.csdn.net/baozhang007/article/details/88364811) 中，通过点击浏览器的前进与后台按钮，我们可以触发不同的视觉切换效果。这是如何实现的呢？答案是：

> 1. View.js实时追踪浏览信息
> 2. View.js监听`history`的`popstate`事件，通过比对最新的浏览信息和弹出的浏览信息得出视图浏览的先后顺序
> 3. View.js根据比较结果，得出视图切换类型：
>
>    3.1 `View.SWITCHTYPE_HISTORYFORWARD` - 由浏览器前进操作触发
>
>    3.2 `View.SWITCHTYPE_HISTORYBACK`- 由浏览器后退操作触发
>
>    3.3 `View.SWITCHTYPE_VIEWNAV` - 由视图切换：`View.navTo()` 操作触发
>
>    3.4 `View.SWITCHTYPE_VIEWCHANGE` - 由视图切换：`View.changeTo()` 操作触发
>
> 4. 开发者监听 `change` 事件，根据 `type` 应用不同的视图切换动画

通过对比，我们可以清晰地观察到：动画点缀会使得视图切换生动许多。那么，我们该如何开发视图切换动画呢？

通常情况下，开发者需要按照如下流程完成视图切换动画的开发：

> 1. 使用css，借助 animation、transition 等属性创建视图离开动画、视图进入动画
> 2. 『有条件地』引用动画并确定动画播放时长
> 3. 在页面就绪时调用View.js提供的 `View.setSwitchAnimation` 方法，以设置动画的『播放触发器』

以下是动画2的源码（已在注释中详细描述各个步骤的执行）。



## 效果实现

开发者在设定视图切换效果时，便可以通过比较结果决定对应的渲染动画，例如：

```javascript
/**
 * @param {HTMLElement} srcElement 视图切换时，要离开的当前视图对应的DOM元素。可能为null
 * @param {HTMLElement} tarElement 视图切换时，要进入的目标视图对应的DOM元素
 * @param {String} type 视图切换方式
 * @param {Function} render 渲染句柄
 */
View.setSwitchAnimation(function(srcElement, tarElement, type, render){

    var isNav = type === View.SWITCHTYPE_VIEWNAV,
        isChange = type === View.SWITCHTYPE_VIEWCHANGE,
        isHistoryBack = type === View.SWITCHTYPE_HISTORYBACK,
        isHistoryForward = type === View.SWITCHTYPE_HISTORYFORWARD;

    //...
});
```

## HTML

```markup
<!-- 视图1的DOM骨架 -->
<section id = "page1" data-view = "true" data-view-default = "true" >
    <header>
        <span class = "nav-back" data-view-rel = ":back"></span>
        Page 1
    </header>
    <h1>This is page 1.</h1>
    <div data-view-rel = "page2" class = "btn">Navigate to page 2.</div>
</section>

<!-- 视图2的DOM骨架 -->
<section id = "page2" data-view = "true">
    <header>
        <span class = "nav-back" data-view-rel = ":back"></span>
        Page 2
    </header>
    <h1>This is page 2.</h1>
    <div data-view-rel = "page3" class = "btn">Navigate to page 3.</div>
</section>

<!-- 视图3的DOM骨架 -->
<section id = "page3" data-view = "true">
    <header>
        <span class = "nav-back" data-view-rel = ":back"></span>
        Page 3
    </header>
    <h1>This is page 3.</h1>
    <div data-view-rel = ":default-view" class = "btn">Navigate to page 1.</div>
</section>
```

DOM骨架定义了视图的基本结构。开发视图骨架是使用View.js开发视图的第一要务。

## CSS

```css
/**
 * 定义动画
 */
@keyframes hideToLeft{
    from{transform: translate3d(0, 0, 0); opacity: 1;}
    to{transform: translate3d(-50%, 0, 0); opacity: 1;}
}
@keyframes showFromRight{
    from{transform: translate3d(100%, 0, 0); opacity: 1;}
    to{transform: translate3d(0, 0, 0); opacity: 1;}
}
@keyframes hideToRight{
    from{transform: translate3d(0, 0, 0); opacity: 1;}
    to{transform: translate3d(100%, 0, 0); opacity: 1;}
}
@keyframes showFromLeft{
    from{transform: translate3d(-50%, 0, 0); opacity: 1;}
    to{transform: translate3d(0, 0, 0); opacity: 1;}
}

/**
 * 视图容器水平居中
 */
[data-view-container]{
    position: relative;
    margin: 0 auto;
}
/**
 * 所有视图重叠在一起，默认都不显示
 */
*[data-view=true] {
    opacity: 0;
    z-index: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    background: #F3F3F3;
    box-shadow: 0 0 70px rgba(0, 0, 0, 0.3);
}
/**
 * 视图隐藏时要呈现的半透明黑色蒙层。默认不显示
 */
*[data-view=true]:before{
    opacity: 0;
    content: "";
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
}
/**
 * 活动视图可见
 */
*[data-view=true].active {
    opacity: 1;
    z-index: 1;
}

/**
 * 有条件地引用动画
 */


/* 视图含有hideToLeft样式类时播放hideToLeft动画 */
.view.hideToLeft{
    animation: hideToLeft 0.6s ease-out;
}
/* 视图向左隐藏时逐渐显示半透明黑色蒙层 */
.view.hideToLeft:before{
    display: block;
    animation: fadeIn 0.6s linear;
}

/* 视图含有showFromLeft样式类时播放showFromLeft动画 */
.view.showFromLeft{
    animation: showFromLeft 0.6s ease-out;
}
/* 视图取消隐藏时逐渐关闭半透明黑色蒙层 */
.view.showFromLeft:before{
    display: block;
    animation: fadeOut 0.6s linear;
}

/**
 * 视图含有hideToRight样式类时播放hideToRight动画。
 * z-index要比活动视图的1更高，从而使其不会被活动视图覆盖
 */
.view.hideToRight{
    z-index: 2;
    animation: hideToRight 0.6s ease-out;
}

/* 视图含有showFromRightn样式类时播放showFromRightn动画 */
.view.showFromRight{
    animation: showFromRight 0.6s ease-out;
}
```

其中

> 1. `fadeOut`，`hideToLeft`，`hideToRight` 定义了视图的离开动画，亦即视图由活动状态变为非活动状态时要执行的动画；
> 2. `fadeIn`，`showFromRight`，`showFromeLeft` 定义了视图的进入动画，亦即视图由非活动状态变为活动状态时要执行的动画；
> 3. `.view.hideToLeft`，`.view.hideToRight` 定义了视图离开动画的播放时机：在视图根节点DOM元素含有对应样式类时播放动画；
> 4. `.view.showFromLeft`，`.view.showFromeRight` 定义了视图进入动画的播放时机：在视图根节点DOM元素含有对应样式类时播放动画；

```css

```

## JS

```javascript
;(function(){
    var timer;

    /**
     * 动画持续时长，需要与css中定义的动画时长一致
     * @type {number}
     */
    var animationDuration = 600;

    /**
     * 清除给定DOM元素上声明的动画样式
     * @param {HTMLElement} obj
     */
    var clear = function(obj){
        if(!obj)
            return;

        "hideToLeft, showFromRight, hideToRight, showFromLeft".split(/\s*,\s*/).forEach(function(className){
            obj.classList.remove(className);
        });
    };

    /**
     * @param {HTMLElement} srcElement 视图切换时，要离开的当前视图对应的DOM元素。可能为null
     * @param {HTMLElement} tarElement 视图切换时，要进入的目标视图对应的DOM元素
     * @param {String} type 视图切换方式
     * @param {Function} render 渲染句柄
     */
    View.setSwitchAnimation(function(srcElement, tarElement, type, render){
        /**
         * 动画播放前清除可能存在的动画样式
         */
        clear(srcElement);
        clear(tarElement);

        /**
         * 调用View.js传递而来的渲染句柄，完成活动视图的切换，包括：
         * 1. 视图参数的传递
         * 2. 活动视图样式类的切换
         * 3. leave，ready、enter等事件的触发
         */
        render();

        var isNav = type === View.SWITCHTYPE_VIEWNAV,
            isChange = type === View.SWITCHTYPE_VIEWCHANGE,
            isHistoryBack = type === View.SWITCHTYPE_HISTORYBACK,
            isHistoryForward = type === View.SWITCHTYPE_HISTORYFORWARD;

        if(isHistoryForward || isNav){
            /**
             * 视图切换动作是“压入堆栈”的方式（浏览器前进，或代码触发）
             */

            srcElement.classList.add("hideToLeft");
            tarElement.classList.add("showFromRight");
        }else{
            /**
             * 视图切换动作是“弹出堆栈”的方式（浏览器后退）
             */

            srcElement.classList.add("hideToRight");
            tarElement.classList.add("showFromLeft");
        }

        /**
         * 动画播放完成后清除动画样式
         */
        clearTimeout(timer);
        timer = setTimeout(function(){
            clear(srcElement);
            clear(tarElement);
        }, animationDuration);
    });
})();
```

其中 `View.setSwitchAnimation()` 用于向View.js提供『播放触发器』，告知View.js在何时播放什么动画：

> 1. 压入堆栈时，源视图向左滑动隐藏，目标视图从右向左显示
> 2. 弹出堆栈时，源视图向右滑动隐藏，目标视图从左向右显示

其中，『压入堆栈式』的视图切换可能由如下几种行为触发：

> 1. 开发者调用API：`View.navTo({String} targetViewId:目标视图ID)`
> 2. 开发者调用API：`View.forward()` - 向前查阅视图，等同于 `history.forward()`
> 3. 用户点击声明有`data-view-rel`属性的元素，且`data-view-rel-type` 取值为 `nav`（没有声明 `data-view-rel-type` 属性时，默认为`nav`）
> 4. 用户点击浏览器中的前进按钮

『替换堆栈式』的视图切换则由如下几种行为触发：

> 1. 开发者调用API：`View.changeTo({String} targetViewId:目标视图ID)`
> 2. 用户点击声明有`data-view-rel`属性的元素，且`data-view-rel-type` 取值为 `change`（没有声明 `data-view-rel-type` 属性时，默认为`nav`）

有关视图跳转的详细介绍，请查阅 [视图跳转（一）](https://blog.csdn.net/baozhang007/article/details/85160272) 和 [视图跳转（二）](https://blog.csdn.net/baozhang007/article/details/85171245)。

