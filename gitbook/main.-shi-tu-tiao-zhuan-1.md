# 视图跳转（一）

## 概述

视图跳转，是指活动视图由一个视图转变为另外一个视图的过程。

开发者通过如下两种方式执行视图跳转：

1. 在跳转入口 DOM 元素上声明跳转指令：`data-view-rel`
2. 调用API：`View.navTo(targetViewId)` 或 `View.changeTo(targetViewId)`

例如：

```javascript
/* 跳转至 default 命名空间下的 targetViewId */
View.navTo("targetViewId");

/* 跳转至 targetViewNamespace 命名空间下的 targetViewId */
View.navTo("targetViewId", "targetViewNamespace");

/* 跳转至 targetViewNamespace 命名空间下的 targetViewId，并传递 视图参数（关键字：params） 和 视图选项（options） */
View.navTo("targetViewId", "targetViewNamespace", {
	params: {/* 'params' 为预留关键字，代表视图参数。视图参数可以传递任意类型的参数，但刷新后丢失 */
		param1: "paramValue",
		param2: {
			key: "value"
		},
		param3: document.body,
		callback: function(){}
	},

	options: {/* 'options' 为预留关键字，代表视图选项。视图选项只能传递字符串类型的参数，刷新后不会丢失 */
		option1: "optionValue"
	}
})
```



开发者可以通过API方法调用，或者声明DOM属性的方式实现视图跳转。视觉效果如下所示：

![&#x5728;&#x8FD9;&#x91CC;&#x63D2;&#x5165;&#x56FE;&#x7247;&#x63CF;&#x8FF0;](https://img-blog.csdnimg.cn/20190803225541748.gif)

> 开发者可以自行定义视图跳转时呈现的切换动画。更多信息请参阅 [\[视图切换动画\]](https://blog.csdn.net/baozhang007/article/details/88364811)

视图跳转时，View.js将自动调整地址栏中的hash部分，使其始终反映出当前的活动视图ID。如：

![&#x5728;&#x8FD9;&#x91CC;&#x63D2;&#x5165;&#x56FE;&#x7247;&#x63CF;&#x8FF0;](https://img-blog.csdnimg.cn/20190803230429461.gif)

其中，`SC_home-page_N0A` 和 `profile_N06` 等即为新活动视图的视图ID。

## 关联技术

开发者可以通过如下两种方式实现视图跳转：

> 1. 调用API
>
>    1.1 `View.navTo()` - 以 “压入堆栈” 的方式切换至目标视图。[\[方法介绍\]](http://wzhsoft.com/api.html#api_View-navTo)
>
>    1.2 `View.changeTo()` - 以 “替换栈顶” 的方式切换至目标视图。[\[方法介绍\]](http://wzhsoft.com/api.html#api_View-changeTo)
>
>    1.3 `View.back()` - 切换至上一个视图。[\[方法介绍\]](http://wzhsoft.com/api.html#api_View-back)
>
>    1.4 `View.forward()` - 前进至下一个视图。[\[方法介绍\]](http://wzhsoft.com/api.html#api_View-forward)
>
> 2. 声明DOM属性：`data-view-rel` [\[属性介绍\]](http://wzhsoft.com/attr.html#attr_data-view-rel)，和 `data-view-rel-type` [\[属性介绍\]](http://wzhsoft.com/attr.html#attr_data-view-rel-type)

无论是由API触发，还是声明属性交给View.js自行触发，这两种方式都会改变浏览历史或浏览位置。而 “压入堆栈” 和 “替换栈顶” 的差别，就在于如何影响用户的浏览历史。

## 压入堆栈

![&#x538B;&#x5165;&#x5806;&#x6808;](https://img-blog.csdnimg.cn/20181227133026900.png)

进入视图C后，用户需要执行两次回退操作，才能返回视图A。

## 替换栈顶

![&#x66FF;&#x6362;&#x5806;&#x6808;](https://img-blog.csdnimg.cn/20181227133127491.png)

进入视图C后，用户只需要一次回退操作就可以返回视图A。

在具体应用里，页面底部导航通常是 “替换栈顶” 式切换，以实现 “无论处于底部导航中的哪个界面，用户均可以通过单次返回退出应用” 的目的，例如：

![&#x5728;&#x8FD9;&#x91CC;&#x63D2;&#x5165;&#x56FE;&#x7247;&#x63CF;&#x8FF0;](https://img-blog.csdnimg.cn/20190804123239952.gif)

如果开发者想要避免 “一连串操作后返回不出去” 的现象，或者想要实现 “有预谋地规划用户导航” 的目的，就需要在执行视图跳转时清晰地知道用户在浏览堆栈中的位置，然后选择合适的跳转方法。

