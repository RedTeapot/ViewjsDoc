# 事件驱动（二）

## 实例事件：enter - 视图进入

`enter` 事件在指定的视图被切换为活动状态，亦即成为活动视图时触发。 开发者可以监听该事件完成数据在该视图上的请求和展现。例如：

```javascript
var view = View.ofId("goods-detail");
view.on("enter", function(e){
    // 根据参数查询并呈现商品详情
});
```

`enter` 事件在视图每次进入时都会被触发。

## 实例事件：ready - 视图就绪

`ready` 事件在视图第一次进入，`enter` 事件触发之前触发。 通过监听该事件，开发者可以为视图添加一次性执行的业务逻辑，如数据初始化等。例如：

```javascript
var view = View.ofId("bind-bankCard")
view.on("ready", function(e){
    /**
     * 请求并缓存绑定银行卡时可选的银行列表，
     * 后续使用缓存的银行列表，减少与服务器的通讯
     */
    view.context.set("supportedBankList", bankList);
});
```

需要注意的是，`ready` 事件仅会在视图第一次进入时触发一次。

## 实例事件：leave - 视图离开

`leave` 事件在活动视图已完成切换，新活动视图的 `ready` 及 `enter` 事件触发之前触发。 开发者可借助该事件重置视图，如清空输入框等。例如：

```javascript
var view = View.ofId("bind-bankCard");

/**
 * 重置视图
 */
var resetView = function(){
    //xxx.value = "";
    //xxx.disabled = false;
    //...
};

view.on("leave", function(e){
    resetView();
});
```

`leave` 事件触发后，新的活动视图的 `beforeenter` 事件才会被触发。

## 实例事件：beforeenter、afterenter

`beforeenter` 在 `ready` 之后，`enter` 之前触发；`afterenter` 在 `enter` 之后触发。

## 宏观事件：beforechange

`beforechange` 事件在活动视图发生变化之前触发，用于告知开发者活动视图即将发生切换。 宏观事件不在实例上监听，需要在对象 `window.View` 上监听。例如：

```javascript
View.on("beforechange", function(e){
    console.log(e.sourceView.id + "-->" + e.targetView.id);
});
```

该事件在当前活动视图的 `leave` 事件之前触发。

## 宏观事件：change

与 `beforechange` 事件相似，`change` 事件同样可以用于告知开发者活动视图的切换。不同的是，`change` 事件在新活动视图的 `beforeenter` 事件之后，`ready` 事件之前触发。

## 宏观事件：afterchange

`afterchange` 在活动视图切换完成，亦即新活动视图的 `afterenter` 事件之后触发。

概括来讲，事件及关键动作的触发顺序为： 

1.  **`View.beforechange`** 
2.  `view.leave` 
3.  `view.beforeenter` 
4.  活动视图切换，新活动视图重新布局 
5. **`View.change`** 
6. `view.ready` 
7. `view.enter` 
8. `view.afterenter`
9. **`View.afterchange`**

开发者可根据业务需要和流程设计，选择恰当的事件执行特定的动作，从而以流水线的方式完成视图的功能开发。

