# 视图跳转（二）

## 关联事件及其顺序

视图跳转将按顺序执行下列动作： 1. View 触发 `beforechange` 事件（同步触发） 2. 当前视图触发 `leave` 事件（异步触发） 3. 目标视图触发 `beforeenter` 事件（同步触发） 4. [活动视图](https://blog.csdn.net/baozhang007/article/details/82985146) 切换为目标视图，目标视图添加样式类：`active`（同步执行） 5. 执行目标视图的 [布局动作](https://blog.csdn.net/baozhang007/article/details/88091953)（同步执行） 6. View 触发 `change` 事件（同步触发） 7. 目标视图触发 `ready` 事件（同步触发） 8. 目标视图触发 `enter` 事件（同步触发） 9. 目标视图触发 `afterenter` 事件（同步触发） 10. 在 [视图容器](https://blog.csdn.net/baozhang007/article/details/84497867) 上使用DOM属性标记当前的活动视图 11. View 触发 `afterchange` 事件（异步触发）

假定我们当前处于视图 A，对于如下事件监听：

```javascript
View.on("beforechange", function(){
    console.log("View: beforechange");
});
View.on("change", function(){
    console.log("View: change");
});
View.on("afterchange", function(){
    console.log("View: afterchange");
});

View.ofId("A").on("leave", function(){
    console.log("A: leave");
});
View.ofId("B").on("beforeenter", function(){
    console.log("B: beforeenter");
});
View.ofId("B").on("ready", function(){/* ready事件仅在视图第一次进入时触发 */
    console.log("B: ready");
});
View.ofId("B").on("enter", function(){
    console.log("B: enter");
});
View.ofId("B").on("afterenter", function(){
    console.log("B: afterenter");
});
```

在切换至视图 B 后，我们将会得到下面的结果

![&#x5728;&#x8FD9;&#x91CC;&#x63D2;&#x5165;&#x56FE;&#x7247;&#x63CF;&#x8FF0;](https://img-blog.csdnimg.cn/20190809204048147.jpg)

这些事件为开发者提供了干预入口，使得开发者可以将要执行的动作分层次按顺序分别执行。

## 跳转目标

View.js 当前支持如下几种跳转目标： 1. 视图 2. [视图群组](https://blog.csdn.net/baozhang007/article/details/83347321) 3. [伪视图](https://blog.csdn.net/baozhang007/article/details/82985652) 4. 外部链接

例如：

```javascript
/**
 * 跳转目标：视图
 * 等同于 View.navTo("targetView", "default");
 */
View.navTo("targetView");/* targetView 为目标视图的视图ID */

/**
 * 跳转目标：视图
 * 不同命名空间下可以声明相同ID的视图
 */
View.navTo("targetView", "my-namespace");/* my-namespace 为 targetView 的命名空间 */

/**
 * 跳转目标：视图
 * View.navTo() 同样支持 params 和 options 参数
 */
View.changeTo("targetView", {
    params: {/* params 参数可以传递任意类型，但视图刷新后丢失 */
        "attr1": 1,
        "obj": document.body,
        "callback": function(data){
            //do something with data
        }
    },
    options: {/* options 选项可以传递字符串类型参数，页面刷新后参数仍然存在 */
        "token": "token value"
    }
});

/**
 * 跳转目标：视图群组
 * 符号：“~” 用于告诉View.js后边跟随的是视图群组的名称
 * View.changeTo() 同样支持按相同的语法切换至视图群组
 */
View.navTo("~groupName");

/**
 * 跳转目标：伪视图
 * 支持的伪视图：
 * 1) :default-view - 默认视图
 * 2) :back - 上一个视图
 * 3) :forward - 下一个视图
 *
 * View.changeTo() 仅支持伪视图：":default"
 */
View.navTo(":default-view");

/**
 * 跳转目标：外部链接
 * 符号：“@” 用于告诉View.js后边跟随的是外部链接地址
 * 当跳转目标以 http，https 或 ftp 开头时，将自动识别为外部链接，不需要 "@" 符号
 */
View.navTo("@http://view-js.com");

/**
 * 跳转目标：外部链接
 * 如果跳转前的 URL 为 "http://domain/path/to/html/main.html"，
 * 跳转后的 URL 将为 "http://domain/path/to/html/sub/another.html"
 */
View.changeTo("@sub/another.html");
```

## 开发调测

当进行视图切换时，View.js 将在 web 控制台中实时输出跳转信息，包括： 1. 跳转方式（压入堆栈、替换堆栈，还是弹出栈顶） 2. 跳转传参 3. 视图的当前浏览位置

例如：

![&#x5728;&#x8FD9;&#x91CC;&#x63D2;&#x5165;&#x56FE;&#x7247;&#x63CF;&#x8FF0;](https://img-blog.csdnimg.cn/20190814230725909.gif)

![&#x5728;&#x8FD9;&#x91CC;&#x63D2;&#x5165;&#x56FE;&#x7247;&#x63CF;&#x8FF0;](https://img-blog.csdnimg.cn/20190814233159676.gif)

此外，View.js 提供了API：`View.ifCanGoBack()` 来检索当前是否处于栈顶，例如：

![&#x5728;&#x8FD9;&#x91CC;&#x63D2;&#x5165;&#x56FE;&#x7247;&#x63CF;&#x8FF0;](https://img-blog.csdnimg.cn/20190814231252164.gif)

![&#x5728;&#x8FD9;&#x91CC;&#x63D2;&#x5165;&#x56FE;&#x7247;&#x63CF;&#x8FF0;](https://img-blog.csdnimg.cn/20190814233937526.gif)

当浏览位置处于栈顶式，`View.back()` 以及 `data-view-rel=':back'` 在执行时将没有任何反应，开发者可以通过 `View.setNoViewToNavBackAction` 设定此时的表现，例如：

```javascript
/**
 * 该方法执行后，当执行 View.back() 或 点击 data-view-rel=':back' 元素时，
 * View.js 将执行给定的方法，此时浏览器将弹窗提示 “2”。
 */
View.setNoViewToNavBackAction(function(){
    alert(2)
});
```

## 其它能力

视图跳转在完成活动视图切换的同时，还具有如下功能： 1. 设置视图跳转动画 2. 在视图之间传递参数 3. 动态设置浏览器标题

我们将在后边的章节中分别介绍。

