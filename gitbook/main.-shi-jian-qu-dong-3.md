# 事件驱动（三）

作为一种设计模式和开发方式，事件驱动能够让开发者松散地拆分文件，将文件按性质等分散存储，从而规避大文件的存在。 除了上文中描述的自带事件，开发者也可以借助View.js提供的API实现自定义事件。关键API如下：

1. `view.fire({String} name, {*} data, {Boolean} async)` - 实例发起事件
2. `View.fire({String} name, {*} data, {Boolean} async)` - 宏观发起事件

其中 `name` 即为事件名，`data` 即为事件携带的数据，供监听者获取，`async` 是否以“同步”的方式触发事件（同步触发事件时，所有监听器都执行完毕后才会执行后续表达式）。例如：

{% tabs %}
{% tab title="init.js" %}
```javascript
var view = View.ofId("goods-detail");

view.on("enter", function(){
    view.fire("goodsDetail.obtained", {
        goodsDetail: {id: 'G01', name: '名称', shopId: 'S01'}
    });
});
```
{% endtab %}

{% tab title="init.show-goods-detail.js" %}
```javascript
var view = View.ofId("goods-detail");

view.on("goodsDetail.obtained", function(e){
    // {goodsDetail: {id: 'G01', name: '名称', shopId: 'S01'}})
    var evtData = e.data;
    var goodsDetail = evtData.goodsDetail;

    view.logger.debug("Obtained goods detail: {}", goodsDetail);
    
    //呈现商品详情
    //...
});
```
{% endtab %}

{% tab title="init.show-shop-detail.js" %}
```javascript
var view = View.ofId("goods-detail");

view.on("goodsDetail.obtained", function(e){
    var shopId = e.data.goodsDetail.shopId;
    
    //查询并呈现店铺详情
    //...
});
```
{% endtab %}
{% endtabs %}

如上所示，借助事件驱动，我们能够实现【查询一个接口，获取多方面数据，多方面数据在不同文件中分别处理】的特性。这种特性非常有用，能够让我们在排查问题时更快地定位到目标位置。分散存储的各个文件短小单一，非常有利于工程的维护和迭代。

对于自定义事件中携带的业务数据，除在监听句柄中可以直接获取外，View.js 还提供了单独的API，使得开发者即使没有监听事件也可以获取到事件数据：`view.getLatestEventData({String} evtName)`。方法返回值等同于监听句柄中的`e.data`。

