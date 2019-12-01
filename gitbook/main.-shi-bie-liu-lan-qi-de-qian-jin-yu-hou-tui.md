# 识别浏览器的前进与后退

## 概述

在部分场景下，开发者可能需要得知视图的进入方式，捕获浏览器的前进和后退动作，以此补充、完善业务逻辑。虽然浏览器并没有对应的事件可以监听，但 View.js 可以通过追踪浏览信息，并对其进行先后顺序比较，间接将其反向推演出来。

## 浏览追踪

每次发生视图跳转时，View.js 都会记录如下关键信息并将其反映在 `history.state` 上：

1. 浏览流水
2. 浏览的视图的ID及命名空间
3. 携带的视图选项

例如：

![&#x6D4F;&#x89C8;&#x5143;&#x6570;&#x636E;](https://img-blog.csdnimg.cn/20190412132236515.png)

其中，`viewId` 和 `viewNamespace` 标记了浏览的视图，`sn` 浏览流水则标记了浏览发生的时间（时间戳的36进制 + 2位序列号），`options` 则记录了关联的视图选项。

当视图发生跳转切换时，View.js 便使用上述浏览信息不断更新历史堆栈，如下图所示：

![&#x6D4F;&#x89C8;&#x5806;&#x6808;](https://img-blog.csdnimg.cn/20190412135433191.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Jhb3poYW5nMDA3,size_16,color_FFFFFF,t_70)

## 顺序比较

当用户通过浏览器执行前进或后退浏览操作时，浏览器便会触发 `history` 的 `popstate` 事件，并将先前追踪并压入的浏览状态通过事件实例反馈给 View.js。

接着，View.js 将通过事件得到的浏览状态与当前状态进行比较，推演出视图的切换方式：

{% tabs %}
{% tab title="view.js源码" %}
```javascript
var stateChangeListener = function(e){
    //...
    var type;
    if(ViewState.isConstructorOf(e.state)){
        var popedNewState = e.state;
        //...

        /**
         * View.SWITCHTYPE_HISTORYBACK 代表后退
         * View.SWITCHTYPE_HISTORYFORWARD 代表前进
         */
        if(View.currentState != null)
                type = popedNewState.sn < View.currentState.sn? View.SWITCHTYPE_HISTORYBACK: View.SWITCHTYPE_HISTORYFORWARD;

    }
    //...
};

window.addEventListener(historyPushPopSupported? "popstate": "hashchange", stateChangeListener);
```
{% endtab %}
{% endtabs %}

## 动作捕获

对于 View.js 推演出来的跳转方式，开发者可以通过添加事件监听的方式获得。支持的事件包括：：

1. 视图实例的 `leave` 事件
2. 视图实例的 `ready` 事件
3. 视图实例的 `beforeenter` 事件
4. 视图实例的 `enter` 事件
5. 视图实例的 `afterenter` 事件
6. `View` 的 `beforechange` 事件
7. `View` 的 `change` 事件
8. `View` 的 `afterchange` 事件

例如：

{% tabs %}
{% tab title="init.js" %}
```javascript

/**
 * on 方法用于添加事件监听器
 * 'change' 事件代表活动视图发生了变更
 */
View.on("change", function(e){
    var switchType = e.data.type;
    
    switch(){
    /* “压入堆栈” 式跳转 */
    case View.SWITCHTYPE_VIEWNAV:
        doSth1();
        break;
    
    /* “替换栈顶” 式跳转 */
    case View.SWITCHTYPE_VIEWCHANGE:
        doSth2();
        break;
    
    /* 浏览器后退 */
    case View.SWITCHTYPE_HISTORYBACK:
        doSth3();
        break;
    
    /* 浏览器前进 */
    case View.SWITCHTYPE_HISTORYFORWARD:
        doSth4();
        break;
    }
});
```
{% endtab %}
{% endtabs %}

对于上文中描述的多个事件的发生顺序及业务含义，我们将在后面的篇章中详细介绍。

