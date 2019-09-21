# 视图参数

正如前文所说，视图是View.js的核心概念，也是实现业务的核心载体。如果业务相对简单，每个视图都各自为营，彼此互相独立，那么问题不大，开发工作会相当轻松。但真实的世界里，终端往往是需要多个页面进行互相交互、彼此传递数据，共享信息的。比如这样的场景：

> 网购确认订单界面，需要与收货地址列表界面交互，使得用户在收货地址列表界面触摸特定收货地址后，界面自动切回确认订单界面，并把选定的收货地址信息呈现到界面上

View.js能够实现吗？当然能。这是View.js的实现效果：

![&#x5728;&#x8FD9;&#x91CC;&#x63D2;&#x5165;&#x56FE;&#x7247;&#x63CF;&#x8FF0;](https://img-blog.csdnimg.cn/20181207200158141.gif)

那么视图之间是如何协作呢？又是如何以一种清晰明了的规则保持视图之间较低的耦合关系的呢？借助视图参数。 视图参数，是指视图切换（亦即，活动视图发生变化）时，原视图（要离开的视图）向目标视图（要进入的视图）传递的参数。

作为视图交互的媒介和桥梁，视图参数支持所有类型，如：方法、数组、对象，以及DOM元素等，使得开发者不再受限于地址栏，突破地址栏只能传递类型简单，尺寸较小数据的限制，例如：

```javascript
View.navTo("detail", {params: {id: "001", count: 2, callback: function(){}});
View.back({params: {showHeader: true}});
```

其中，对象：`{params: xxx}`是视图切换选项，使用关键字：`params` 指定视图参数这一选项。（除视图参数外，视图切换还有其它控制选项，后面的章节会有介绍。）

View.js为所有视图切换API均加上了参数传递支持，包括：

1. `View.navTo()`
2. `View.changeTo()`
3. `View.back()`
4. `View.forward()`

目标视图则可以使用API：`view.hasParameter()`及`view.getParameter()`等方法检索相关参数，如：

```javascript
var view = View.ofId("detail");
view.hasParameter("id");// -> true
view.getParameter("count");// -> 2
view.seekParameter("callback");// -> function(){}
```

有了视图参数这一工具，对于文章开头提出的问题，我们就可以使用如下伪代码实现：

```javascript
/* 确认订单视图 */
View.navTo("recipient-list", {params: {
    selectCallback: function(recipient){
        //呈现收货人信息：recipient
    }
}});

/* 收货地址视图 */
Hammer(recipientListObj).on("tap", function(e){
    var recipentItemObj = getItemObj(e.srcEvent.target);    // 根据触摸位置获取对应的收货地址DOM
    var recipient = recipentItemObj .data;// 前文中附加data至dom中

    view.getParameter("selectCallback")(recipient);// 调用指定的“选择回调”
});
```

需要注意的是，视图参数区分大小写，且在离开后均会被清空，并不会保留。如果开发者需要持久化使用相关参数，则可以将其手动放至上下文中。

