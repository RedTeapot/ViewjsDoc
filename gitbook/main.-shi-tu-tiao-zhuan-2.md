# 视图跳转（二）

## 关联事件

View.js 在执行视图跳转时，将按顺序执行如下动作：

1. 同步触发 `View` 的 `beforechange` 事件
2. 异步触发 当前活动视图 的 `leave` 事件
3. 同步触发 目标视图 的 `beforeenter` 事件
4. 隐藏当前活动视图，展现目标视图
5. 同步触发 目标视图 的布局动作
6. 同步触发 `View` 的 `change` 事件
7. 同步触发 目标视图 的 `ready` 事件
8. 同步触发 目标视图 的 `enter` 事件
9. 同步触发 目标视图 的 `afterenter` 事件
10. 更新视图容器上标记的活动视图信息
11. 异步触发 `View` 的 `afterchange` 事件

> 附加在 `window` 上的全局变量 `View`，以及每个 `View` 的实例，均是事件驱动的，均支持API：  
> 1. 添加事件监听：`on(evtName: string, handle: Function)`   
> 2. 移除事件监听：`off(evtName: string, handle: Function)`  
> 3. 发起事件：`fire(evtName: string, evtData?: any)`

假定我们当前处于视图 A ，对于浏览路径：A → B 及如下事件监听：

{% code-tabs %}
{% code-tabs-item title="init.js" %}
```javascript
var viewA = View.ofId("A"),
    viewB = View.ofId("B");

var log = function(msg){
    return function(){
        console.log(msg);
    };
};

View.on("beforechange", log("View: beforechange"));
View.on("change", log("View: change"));
View.on("afterchange", log("View: afterchange"));

viewA.on("leave", log("A: leave"));
viewB.on("beforeenter", log("B: beforeenter"));
viewB.on("ready", log("B: ready"));/* ready 事件仅在视图第一次进入时触发 */
viewB.on("enter", log("B: enter"));
viewB.on("afterenter", log("B: afterenter"));
```
{% endcode-tabs-item %}
{% endcode-tabs %}

在切换至视图 B 后，我们将会得到下面的结果

![&#x4E8B;&#x4EF6;&#x89E6;&#x53D1;&#x987A;&#x5E8F;](https://img-blog.csdnimg.cn/20190809204048147.jpg)

View.js 预置的这些事件，是为了提供干预入口，使得开发者能够尽可能地找到贴切、恰当的时机执行程序任务。

通常来讲：

1. 实例的 `ready` 事件，由于只在视图第一次进入时触发，多用于实现不需要反复进行的数据加载
2. 实例的 `enter` 事件，多用于实现 “每次进入视图均重新加载、渲染数据”
3. 实例的 `leave`, `beforeenter` 和 `afterenter`，多用于 “重置页面内容，或准备页面环境”
4. `View` 的 `beforechange`, `change` 和 `afterchange`，多用于 “实现视图跳转动画，或执行其它宏观处理”

## 跳转目标

View.js 当前支持如下几种跳转目标：

1. 视图ID
2. 视图群组名称
3. 伪视图
4. 外部链接地址

 例如：

{% code-tabs %}
{% code-tabs-item title="action.js" %}
```javascript
/**
 * 以“压入堆栈”方式跳转至 default 命名空间下，ID 为 targetView 的视图
 * 等同于 View.navTo("targetView", "default");
 *
 * 跳转目标：视图 
 */
View.navTo("targetView");

/**
 * 以“压入堆栈”方式跳转至 my-namespace 命名空间下，ID 为 targetView 的视图
 * 跳转目标：视图
 *
 * 不同命名空间下可以声明相同ID的视图
 */
View.navTo("targetView", "my-namespace");

/**
 * 以“切换栈顶”方式跳转至 default 命名空间下，ID 为 targetView 的视图，
 * 并使用 params 关键字和 options 关键字传递参数
 *
 * 跳转目标：视图
 */
View.changeTo("targetView", {
    /**
     * params 为预留关键字，代表 视图参数。
     * 视图参数可以传递任意类型的数据，但在视图刷新后丢失。
     */
    params: {
        "attr1": 1,
        "obj": document.body,
        "callback": function(data){
            //do something with data
        }
    },
    
    /**
     * options为预留关键字，代表 视图选项。
     * 视图选项只能传递字符串类型的数据，页面刷新后参数仍然存在。
     */
    options: {
        "token": "token123"
    }
});

/**
 * 跳转目标：伪视图
 *
 * 支持的伪视图：
 * 1) :default-view - 默认视图
 * 2) :back - 上一个视图
 * 3) :forward - 下一个视图
 *
 * View.changeTo() 仅支持伪视图：":default-view"
 */
View.navTo(":default-view");

/**
 * 跳转目标：视图群组
 *
 * 符号：“~” 用于告诉 View.js 后边跟随的，是视图群组的名称
 *
 * View.changeTo() 同样支持按相同的语法切换至视图群组
 */
View.navTo("~groupName");

/**
 * 跳转目标：外部链接
 *
 * 符号：“@” 用于告诉 View.js 后边跟随的，是外部链接地址
 * 当跳转目标以 http，https 或 ftp 开头时，将自动识别为外部链接，不需要 "@" 符号
 *
 * View.changeTo() 同样支持按相同的语法跳转至外部链接
 */
View.navTo("@http://view-js.com");

/**
 * 跳转目标：外部链接
 *
 * 如果跳转前的 URL 为 "http://domain/path/to/html/main.html"，
 * 跳转后的 URL 将为 "http://domain/path/to/html/sub/another.html"
 */
View.changeTo("@sub/another.html");
```
{% endcode-tabs-item %}
{% endcode-tabs %}

## 开发调测

当进行视图切换时，View.js 将在 web 控制台中实时输出跳转信息，包括：

1. 跳转方式（压入堆栈、替换堆栈，还是弹出栈顶）
2. 跳转传参
3. 视图的当前浏览位置

例如：

![&#x5F00;&#x53D1;&#x8C03;&#x6D4B;1](https://img-blog.csdnimg.cn/20190814230725909.gif)

![&#x5F00;&#x53D1;&#x8C03;&#x6D4B;2](https://img-blog.csdnimg.cn/20190814233159676.gif)

此外，View.js 提供了API：`View.ifCanGoBack()` 来检索当前是否处于栈顶，例如：

![&#x5F00;&#x53D1;&#x8C03;&#x6D4B;3](https://img-blog.csdnimg.cn/20190814231252164.gif)

![&#x5F00;&#x53D1;&#x8C03;&#x6D4B;4](https://img-blog.csdnimg.cn/20190814233937526.gif)

当浏览位置处于栈顶时，`View.back()` 以及 `data-view-rel=':back'` 在执行时将没有任何反应，开发者可以通过 `View.setNoViewToNavBackAction(action: Function)` 设定此时的表现，例如：

{% code-tabs %}
{% code-tabs-item title="init.js" %}
```javascript
/**
 * 当执行 View.back() 或 点击 data-view-rel=':back' 元素时，
 * 如果没有更早的浏览信息，浏览器将弹窗提示 “2”。
 */
View.setNoViewToNavBackAction(function(){
    alert(2);
});
```
{% endcode-tabs-item %}
{% endcode-tabs %}

## 其它能力

视图跳转在完成活动视图切换的同时，还具有如下功能：

1. 设置视图跳转动画
2. 在视图之间传递参数
3. 动态设置浏览器标题 

我们将在后边的章节中分别介绍。

