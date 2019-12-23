# 视图跳转动画

## 概述

视图跳转动画，是指活动视图从一个视图切换至另外一个视图的过程中，展现给用户的动画效果。 

View.js 提供的默认样式中，是不含跳转动画的。

## 设置动画

设置视图跳转动画时，开发者需要了解到视图的四种进入方式：

1. 压入堆栈式进入
2. 替换栈顶式进入
3. 浏览器后退进入
4. 浏览器前进进入

如果视图的跳转动画是不区分进入方式的，如：渐隐渐显，那么开发者不需要考虑上述差异，按照固定的模式实现即可。但如果想要根据进入方式的不同，呈现差异化的跳转动画，开发者就需要捕获进入方式，然后做出不同的响应。

例如：

![&#x533A;&#x5206;&#x8FDB;&#x5165;&#x65B9;&#x5F0F;&#x7684;&#x89C6;&#x56FE;&#x8DF3;&#x8F6C;&#x52A8;&#x753B;](https://img-blog.csdnimg.cn/20190318185953112.gif)

技术上，View.js 建议开发者使用 CSS3 animation，结合少量脚本实现跳转动画。具体流程如下：

1. 使用 CSS，借助 animation、transition 等特性创建视图离开动画、视图进入动画
2. 有条件地（例如：DOM 元素的 `class` 含有特定取值时）为视图的 DOM 元素引用动画并确定动画播放时长
3. 通过 `View.setSwitchAnimation` 方法，以设置动画的“播放触发器”

对于动画的展现效果，以及动画的播放时长，View.js 均不加以限制，开发者可以自由定义。

{% hint style="warning" %}
由于 View.js 并不知道开发者定义的动画的播放时长，因此开发者需要在设置的动画播放触发器中使用定时器 **延迟相同时间** 后呈现界面。
{% endhint %}

下面，我们将从代码细节分析、说明动画的实现过程。

## 代码分析

### HTML + CSS

{% tabs %}
{% tab title="index.html" %}
```markup
<!-- 视图1的DOM骨架 -->
<section data-view-id = "page1" data-view-default = "true" >
    <header>
        <span class = "nav-back" data-view-rel = ":back"></span>
        Page 1
    </header>
    <h1>This is page 1.</h1>
    <div data-view-rel = "page2" class = "btn">Navigate to page 2.</div>
</section>

<!-- 视图2的DOM骨架 -->
<section data-viw-id = "page2">
    <header>
        <span class = "nav-back" data-view-rel = ":back"></span>
        Page 2
    </header>
    <h1>This is page 2.</h1>
    <div data-view-rel = "page3" class = "btn">Navigate to page 3.</div>
</section>

<!-- 视图3的DOM骨架 -->
<section data-view-id = "page3">
    <header>
        <span class = "nav-back" data-view-rel = ":back"></span>
        Page 3
    </header>
    <h1>This is page 3.</h1>
    <div data-view-rel = ":default-view" class = "btn">Navigate to page 1.</div>
</section>
```
{% endtab %}

{% tab title="" %}
```css
/**
 * 视图基本样式定义。
 * 所有视图重叠在一起，默认都不显示
 */
[data-view-id] {
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
[data-viw-id]:before{
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
 * 'active' 由 View.js 自动添加至活动视图
 */
[data-view-id].active {
    opacity: 1;
    z-index: 1;
}

/************** 定义动画 ***************/

/**
 * 定义动画：向左隐藏。
 * 当以 “压入堆栈” 的方式切换视图，包括执行浏览器前进动作，
 * 导致视图由活动状态变为非活动状态，需要向左淡出视野时触发。
 */
@keyframes hideToLeft{
    from{transform: translate3d(0, 0, 0); opacity: 1;}
    to{transform: translate3d(-50%, 0, 0); opacity: 1;}
}

/**
 * 定义动画：向左呈现。
 * 当以 “压入堆栈” 的方式切换视图，包括执行浏览器前进动作，
 * 导致视图由非活动状态变为活动状态，需要向左进入视野时触发。
 */
@keyframes showFromRight{
    from{transform: translate3d(100%, 0, 0); opacity: 1;}
    to{transform: translate3d(0, 0, 0); opacity: 1;}
}

/**
 * 定义动画：向右隐藏。
 * 当执行浏览器后退动作，
 * 导致视图由活动状态变为非活动状态，需要向右淡出视野时触发。
 */
@keyframes hideToRight{
    from{transform: translate3d(0, 0, 0); opacity: 1;}
    to{transform: translate3d(100%, 0, 0); opacity: 1;}
}

/**
 * 定义动画：向右呈现。
 * 当执行浏览器后退动作，
 * 导致视图由非活动状态变为活动状态，需要向右进入视野时触发。
 */
@keyframes showFromLeft{
    from{transform: translate3d(-50%, 0, 0); opacity: 1;}
    to{transform: translate3d(0, 0, 0); opacity: 1;}
}



/************** “有条件地” 引用动画 ***************/

[data-view-id].hideToLeft{
    animation: hideToLeft 0.6s ease-out;
}
[data-view-id].hideToLeft:before{
    display: block;
    animation: fadeIn 0.6s linear;
}
[data-view-id].showFromLeft{
    animation: showFromLeft 0.6s ease-out;
}
[data-view-id].showFromLeft:before{
    display: block;
    animation: fadeOut 0.6s linear;
}
[data-view-id].hideToRight{
    /* z-index要比活动视图的1更高，从而使其不会被活动视图覆盖 */
    z-index: 2;
    animation: hideToRight 0.6s ease-out;
}
[data-view-id].showFromRight{
    animation: showFromRight 0.6s ease-out;
}
```
{% endtab %}
{% endtabs %}

### JS

```javascript
;(function () {
    var timer;

    /**
     * 动画持续时长，需要与css中定义的动画时长一致
     * @type {number}
     */
    var animationDuration = 600;

    /**
     * 判断给定的对象是否包含指定名称的样式类
     */
    var hasClass = function (obj, clazz) {
        if (null == clazz || (clazz = String(clazz).trim()) === "")
            return false;

        if (obj.classList && obj.classList.contains)
            return obj.classList.contains(clazz);

        return new RegExp("\\b" + clazz + "\\b", "gim").test(obj.className);
    };

    /**
     * 为指定的对象添加样式类
     */
    var addClass = function (obj, clazz) {
        if (null == clazz || (clazz = String(clazz).trim()) === "" || hasClass(obj, clazz))
            return;

        if (obj.classList && obj.classList.add) {
            obj.classList.add(clazz);
            return;
        }

        obj.className = (obj.className.trim() + " " + clazz).trim();
    };

    /**
     * 为指定的对象删除样式类
     */
    var removeClass = function (obj, clazz) {
        if (null == clazz || (clazz = String(clazz).trim()) === "" || !hasClass(obj, clazz))
            return;

        if (obj.classList && obj.classList.remove) {
            obj.classList.remove(clazz);
            return;
        }

        clazz = String(clazz).toLowerCase();
        var arr = obj.className.split(/\s+/),
            str = "";
        for (var i = 0; i < arr.length; i++) {
            var tmp = arr[i];
            if (null == tmp || (tmp = tmp.trim()) === "")
                continue;

            if (tmp.toLowerCase() === clazz)
                continue;

            str += " " + tmp;
        }
        if (str.length > 0)
            str = str.substring(1);
        obj.className = str.trim();
    };


    /**
     * 清除给定DOM元素上声明的动画样式
     * @param {HTMLElement} obj
     */
    var clear = function (obj) {
        if (!obj)
            return;

        "hideToLeft, showFromRight, hideToRight, showFromLeft".split(/\s*,\s*/).forEach(function (className) {
            removeClass(obj, className);
        });
    };

    /**
     * @param {Object} meta 切换信息
     * @param {HTMLElement} meta.srcElement 视图切换时，要离开的当前视图对应的DOM元素。可能为null
     * @param {HTMLElement} meta.targetElement 视图切换时，要进入的目标视图对应的DOM元素
     * @param {String} type 视图切换方式
     * @param {String} trigger 视图切换触发器
     * @param {Function} render 渲染句柄
     */
    View.setSwitchAnimation(function (meta) {
        var srcElement = meta.srcElement,
            tarElement = meta.targetElement,
            type = meta.type,
            trigger = meta.trigger,
            render = meta.render;

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

        if (/\bsafari\b/i.test(navigator.userAgent) && (isHistoryBack || isHistoryForward) && trigger ===
            View.SWITCHTRIGGER_NAVIGATOR)
            return;

        /**
         * 视图切换动作是“替换堆栈”的方式，或浏览器不支持对history的操作
         */
        if (!View.checkIfBrowserHistorySupportsPushPopAction() || isChange) {
            addClass(srcElement, "fadeOut");
            addClass(tarElement, "fadeIn");
        } else if (isHistoryForward || isNav) {
            /**
             * 视图切换动作是“压入堆栈”的方式（浏览器前进，或代码触发）
             */

            addClass(srcElement, "hideToLeft");
            addClass(tarElement, "showFromRight");
        } else {
            /**
             * 视图切换动作是“弹出堆栈”的方式（浏览器后退）
             */

            addClass(srcElement, "hideToRight");
            addClass(tarElement, "showFromLeft");
        }

        /**
         * 动画播放完成后清除动画样式
         */
        clearTimeout(timer);
        timer = setTimeout(function () {
            clear(srcElement);
            clear(tarElement);
        }, animationDuration);
    });
})();
```

其中 `View.setSwitchAnimation()` 用于向 View.js 提供 “播放触发器”，告知 View.js 在何时播放什么动画：

1. 压入堆栈时，源视图向左滑动隐藏，目标视图从右向左显示
2. 弹出堆栈时，源视图向右滑动隐藏，目标视图从左向右显示



