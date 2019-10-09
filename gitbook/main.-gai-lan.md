# 概览

## 视图导航

视图导航，即 “将用户看到的视图切换到另外一个上去” 的过程，亦为活动视图发生改变的过程。

View.js提供了两种导航方式：编程式导航 和 声明式导航。例如：

{% code-tabs %}
{% code-tabs-item title="编程式.js" %}
```javascript
/* 切换至商品详情页面 */
View.navTo("goods-detail", {
    options: {/* 在 options 中指定的参数将体现在地址栏中，刷新后仍然存在 */
        goodsId: "G01"
    }
});
```
{% endcode-tabs-item %}

{% code-tabs-item title="声明式.js" %}
```javascript
<span data-view-rel = "goods-detail!goodsId=G01">商品详情</span>
```
{% endcode-tabs-item %}
{% endcode-tabs %}

在执行导航动作时，View.js将自动记录浏览堆栈和浏览顺序，并自动调整 URL 中的 hash，使其匹配新的活动视图信息，例如：

_http://domain:port/context/index.html\#goods-detail!goodsId=G01。_

> View.js当前仅支持hash形式的地址表示，出于简化运维人员工作以及降低开发复杂性的考虑，暂不考虑其它形式的地址表示



对于视图的导航目标，可以是视图、伪视图、视图群组和外部链接：

```javascript
/* 导航目标是：视图 */
View.navTo("targetViewId");

/* 导航目标是：伪视图 */
View.navTo(":default-view");/* 默认视图，通常是首页 */

/* 导航目标是：视图群组 */
View.navTo("~profile");

/* 导航目标是：外部链接 */
View.navTo("@http://www.baidu.com");
```

## 视图传参

View.js 允许以视图为单位拆分任务，执行多人协作。视图之间使用参数完成协作。参数在进行视图切换时传递，如下所示：

{% code-tabs %}
{% code-tabs-item title="1.js" %}
```javascript
View.navTo("goods-detail", {
    /**
     * 使用 options 传递的参数将反馈到地址栏中，
     * 因此只适合传递字符串类型的参数
     */
    options: {
        goodsId: "G01"
    }
});
```
{% endcode-tabs-item %}

{% code-tabs-item title="2.js" %}
```javascript
View.navTo("delivery-address-list", {
    /**
     * 使用 params 传递的参数不会反馈到地址栏中，
     * 因此可以是任意被浏览器所支持的类型
     */
    params: {
        selectCallback: function(selectedAddress){
            //...
        }
    }
});
```
{% endcode-tabs-item %}

{% code-tabs-item title="3.js" %}
```javascript
View.navTo("goods-detail", {
    params: {
        goodsId: "G01",
    },
    options: {
        goodsId: "G02"
    }
});

var view = View.ofId("goods-detail");
view.on("enter", function(){
    var goodsId = view.getParameter("goodsId");// --> G01
    goodsId = View.getActiveViewOption("goodsId");// --> G02
    goodsId = view.seekParameter("goodsId");// --> G01
});
```
{% endcode-tabs-item %}
{% endcode-tabs %}

> `options` 用于指定视图选项，`params` 用于指定视图参数

## 视图配置

多数情况下，一个视图的表现和行为是固定的一种。但开发者仍然可以在一个视图中实现多个效果，并以配置的方式在运行时决定使用哪一种。

例如：同一个注册页面，对于密码长度，不同的甲方要求执行不同的长度限制：

{% code-tabs %}
{% code-tabs-item title="register.config.js" %}
```javascript
var view = View.ofId("register");

/* 默认配置：密码最少位数 */
view.config.get("password-min-length").setValue(6);

/* 默认配置：密码最多位数 */
view.config.get("password-max-length").setValue(20);
```
{% endcode-tabs-item %}

{% code-tabs-item title="register.action.js" %}
```javascript
var view = View.ofId("register");
view.find(".submit").addEventListener("click", function(){
    var pwd = pwdObj.value.trim();

    var minLen = view.config.get("password-min-length").getValue(),
        maxLen = view.config.get("password-max-length").getValue();

    if(pwd.length < min){
        alert("密码长度不能少于" + minLen + "位");
        return;
    }

    if(pwd.length > max){
        alert("密码长度不能多于" + maxLen + "位");
        return;
    }
});
```
{% endcode-tabs-item %}

{% code-tabs-item title="客户A配置.js" %}
```javascript
var view = View.ofId("register");

/* 重载既有配置：密码最少位数 */
/* 第二个参数用于复写可能已经存在的值，如果不传且已经有值，则赋值无效，相当于什么也没做 */
view.config.get("password-min-length").setValue(10, true);

/* 重载默认配置：密码最多位数 */
view.config.get("password-max-length").setValue(20, true);
```
{% endcode-tabs-item %}

{% code-tabs-item title="客户B配置.js" %}
```
var view = View.ofId("register");

/* 重载既有配置：密码最少位数 */
/* 第二个参数用于复写可能已经存在的值，如果不传且已经有值，则赋值无效，相当于什么也没做 */
view.config.get("password-min-length").setValue(4, true);

/* 重载默认配置：密码最多位数 */
view.config.get("password-max-length").setValue(10, true);
```
{% endcode-tabs-item %}
{% endcode-tabs %}

## 视图上下文

视图上下文，即视图的数据存取上下文，用于供视图关联的脚本存取数据。例如：

```javascript
var view = View.ofId("myView");

view.context.set("gender", "male");
view.context.set("getGreeting", {callback: function(){return "Hi~"}});

var gender = view.context.get("gender"); // -> male
var greeting = view.context.get("getGreeting")(); //-> Hi~

var ifExists = view.context.has("getGreeting"); // -> true
view.context.remove("getGreeting");
ifExists = view.context.has("getGreeting"); // -> false

view.context.clear();
ifExists = view.context.has("gender"); // -> false
```

## 事件驱动

View.js为每个视图实例预置了关键事件，开发者可以据此决定特定操作的执行时机：

```javascript
var view = View.ofId("my-view");

/**
 * ready：视图就绪，仅在第一次进入时触发
 */
view.on("ready", function(){
    //初始化数据
});

/**
 * enter：进入视图，每次进入均会被触发。在 ready 之后触发
 */
view.on("enter", function(){
    var callback = view.getParameter("callback");
    callback();
});

/**
 * leave：离开视图，每次离开均会被触发
 */
view.on("leave", function(){
    //重置视图
});
```

* > 更多事件，以及事件触发顺序和差异等，参阅：TODO

除此之外，开发者还可以根据自己的业务需要，自行发起并消费事件，如下所示：

{% code-tabs %}
{% code-tabs-item title="init.js" %}
```javascript
var view = View.ofId("myView");
view.on("myevent", function(e){
    view.logger.debug("Event name: {}, event data: {}", e.name, e.data);
});
```
{% endcode-tabs-item %}

{% code-tabs-item title="action.js" %}
```javascript
var view = View.ofId("myView");
view.fire("myevent", {a: 1});
//控制台将输出： 0918 10:20:54 [View#myView]: Event name: null, event data: {"a":1}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

