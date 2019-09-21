# 概述
视图跳转，是指用户看到的界面切换为另一个界面的过程，亦即活动视图转移的过程（同一时刻，只有一个视图处于活动状态）。

开发者可以通过API方法调用，或者声明DOM属性的方式实现视图跳转。视觉效果如下所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190803225541748.gif)
> 开发者可以自行定义视图跳转时呈现的切换动画。更多信息请参阅 [\[视图切换动画\]](https://blog.csdn.net/baozhang007/article/details/88364811)

视图跳转时，View.js将自动调整地址栏中的hash部分，使其始终反映出当前的活动视图ID。如：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190803230429461.gif)

其中，`SC_home-page_N0A` 和 `profile_N06` 等即为新活动视图的视图ID。

<br/>

# 关联技术

开发者可以通过如下两种方式实现视图跳转：
>1. 调用API
>1.1 `View.navTo()` - 以 “压入堆栈” 的方式切换至目标视图。[\[方法介绍\]](http://wzhsoft.com/api.html#api_View-navTo)
>1.2 `View.changeTo()` - 以 “替换栈顶” 的方式切换至目标视图。[\[方法介绍\]](http://wzhsoft.com/api.html#api_View-changeTo)
>1.3 `View.back()` - 切换至上一个视图。[\[方法介绍\]](http://wzhsoft.com/api.html#api_View-back)
>1.4 `View.forward()` - 前进至下一个视图。[\[方法介绍\]](http://wzhsoft.com/api.html#api_View-forward)
>2. 声明DOM属性：`data-view-rel` [\[属性介绍\]](http://wzhsoft.com/attr.html#attr_data-view-rel)，和 `data-view-rel-type` [\[属性介绍\]](http://wzhsoft.com/attr.html#attr_data-view-rel-type)
> 


无论是由API触发，还是声明属性交给View.js自行触发，这两种方式都会改变浏览历史或浏览位置。而 “压入堆栈” 和 “替换栈顶” 的差别，就在于如何影响用户的浏览历史。
# 压入堆栈：
![压入堆栈](https://img-blog.csdnimg.cn/20181227133026900.png)

进入视图C后，用户需要执行两次回退操作，才能返回视图A。


# 替换栈顶：
![替换堆栈](https://img-blog.csdnimg.cn/20181227133127491.png)

进入视图C后，用户只需要一次回退操作就可以返回视图A。

在具体应用里，页面底部导航通常是 “替换栈顶” 式切换，以实现 “无论处于底部导航中的哪个界面，用户均可以通过单次返回退出应用” 的目的，例如：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190804123239952.gif)


如果开发者想要避免 “一连串操作后返回不出去” 的现象，或者想要实现 “有预谋地规划用户导航” 的目的，就需要在执行视图跳转时清晰地知道用户在浏览堆栈中的位置，然后选择合适的跳转方法。
