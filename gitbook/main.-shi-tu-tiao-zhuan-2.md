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

{% tabs %}
{% tab title="init.js" %}
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
{% endtab %}
{% endtabs %}

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
2. 视图名称
3. 视图实例（`1.7.0+` 可用）
4. 伪视图
5. 外部链接地址

 例如：

{% code title="action.js" %}
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
 * 以“压入堆栈”方式跳转至 my-namespace 命名空间下，ID 为 targetView 的视图
 * 跳转目标：视图
 *
 * 不同命名空间下可以声明相同ID的视图
 */
View.navTo(View.ofId("targetView", "my-namespace"));

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
     * options 为预留关键字，代表 视图选项。
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
 * 跳转目标：视图名称
 *
 * 符号：“~” 用于告诉 View.js 后边跟随的，是视图的名称
 *
 * View.changeTo() 同样支持按相同的语法进行跳转
 */
View.navTo("~viewName");

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
{% endcode %}

## 跳转拦截

从 `1.7.0` 开始，View.js 支持开发者通过添加拦截器的方式，在宏观层面拦截视图跳转动作。例如：

```javascript
/**
 * 添加视图跳转拦截器
 * 拦截器通过返回 true 或 false 告知 View.js 是否继续执行视图跳转动作
 */
View.addSwitchInterceptor(function(meta){
    if(user.isLogined())
        return true;
    
    toast("请登录");
    //...
    
    return false;
});
```

{% hint style="info" %}
如果添加了多个拦截器，View.js 将按添加顺序顺序执行拦截器。如果上一个拦截器返回 `false`，下一个拦截器不会继续执行。
{% endhint %}

## 跳转效果优化

由于视图跳转完成的，只是活动视图DOM骨架的切换。而开发者一般在视图进入时才开始加载数据，所以会呈现出 “页面结构先变化，而后才填充数据” 的非原子性展示效果。

为了缓解这一不友好的体验，从 `1.7.0` 开始，View.js 允许开发者在进入视图前预先执行异步请求，在得到数据后再执行视图跳转动作。

例如：

{% tabs %}
{% tab title="商品详情" %}
```javascript
var view = View.ofId("goods-detail");

/**
 * 商品详情 视图使用该API描述自己所需要的数据的获取方式。
 * 其它视图则使用该视图中由 View.js 创建的标准 fetchData() 
 * 方法执行数据加载动作。
 * 
 * resolve：由 View.js 提供，供开发者执行的，用于告知 View.js 数据加载完成的方法；
 * reject：由 View.js 提供，供开发者执行的，用于告知 Viewjs 数据加载失败的方法。
 */
view.setDataFetchAction(function(resolve, reject){
    var goodsId = view.seekParameter("goods-id");

    /* 加载商品详情 */
    var promise1 = new Promise(function(_resolve, _reject){
        callApi("get-goods-detail", {
            id: "GOODS1",
            
            onsuccess: function(data){
                _resolve(data);
            },
            onerror: function(err){
                _reject(err);
            }
        })
    });
    
    /* 加载商品评论 */
    var promise2 = new Promise(function(_resolve, _reject){
        callApi("get-goods-comments", {
            id: "GOODS1",
            
            onsuccess: function(data){
                _resolve(data);
            },
            onerror: function(err){
                _reject(err);
            }
        })
    });
    
    /* 数据加载成功或失败后通知 View.js */
    Promise.all([promise1, promise2]).then(resolve, reject);
});


/* 视图进入后，根据传入的数据渲染界面，不再执行网络加载，从而带来完整性体验 */
view.on("enter", function(){
    /* 参数由 商品列表 界面传入 */
    var datas = view.getParameter("preloadedDatas");

    var goodsDetal = datas[0],
        goodsComments = dats[1];
    
    /* 呈现商品详情 */
    showGoodsDetail(goosdDetail);
    
    /* 呈现商品评论 */
    showGoodsComments(goodsComments);
});
```
{% endtab %}

{% tab title="商品列表" %}
```javascript
var view = View.ofId("goods-list");

/* 商品详情的入口 */
var goods1Obj = view.find(".list .detail[data-id=GOODS1]");

/**
 * 进入 商品详情 视图。
 * 进入前，预先加载 商品详情 所需要的数据。
 */
goods1Obj.addEventListener("click", function(){
    var targetView = View.ofId("goods-detail");
    
    /**
     * 加载数据（数据的加载方法由目标视图自行描述）
     */
    loading.show();
    var thenable = targetView.fetchData();
    thenable.then(function(datas){/* 数据加载成功 */
        loading.hide();
        
        /* 将数据传入 商品详情 视图 */
        View.navTo(targetView, {
            preloadedDatas: datas
        });
    }, function(err){/* 数据加载失败 */
        loading.hide();
        
        /* 提示错误后停留在 商品列表 视图 */
        toast(err);
    });
});
```
{% endtab %}
{% endtabs %}

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

当浏览位置处于栈顶时，`View.back()` 以及 `data-view-rel=':back'` 在执行时将没有任何反应，开发者可以通过API： `View.setNoViewToNavBackAction(action: Function)` 设定此时的表现，亦即： “没有更多页面可回退时将要执行的动作” 。例如：

{% code title="init.js" %}
```javascript
/**
 * 当执行 View.back() 或 点击 data-view-rel=':back' 元素时，
 * 如果没有更早的浏览信息，浏览器将弹窗提示 “2”。
 */
View.setNoViewToNavBackAction(function(){
    alert(2);
});
```
{% endcode %}

## 其它能力

视图跳转在完成活动视图切换的同时，还具有如下功能：

1. 设置视图跳转动画
2. 在视图之间传递参数
3. 动态设置浏览器标题 

我们将在后边的章节中分别介绍。

