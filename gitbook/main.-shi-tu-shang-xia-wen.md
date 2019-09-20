# 变量命名冲突
正如 [单页应用独有的问题](https://blog.csdn.net/baozhang007/article/details/81675945) 篇章所述，当将多个视图的功能糅合在一起提供单页的访问形式时，开发者需要手动管控可能出现多个视图之间的变量命名冲突问题。
视图之间的变量冲突，可以借助闭包解决，亦即将视图功能逻辑封装在一个外界不可见的黑盒子里，如下所示：

```js
;(function(){
	var viewId = "home-page";
	var view = View.ofId(viewId);
	
	var nameInputObj = view.find(".name input");
	//...
})();
```
其中第一个`;`字符用于作为一个分隔符规避多个脚本合并为同一个脚本时，拼接的语法出现错误的问题。

<br>

# 变量跨文件共享

对于喜欢把文件分散组织的开发者而言，另外可能比较重要的问题，是：
>如何在视图内分散组织的多个文件中共享变量？

本能的做法，是把变量安插在 `window` 上。这样做技术上的确可行，但风险非常大。因为你无法确保其它脚本会在什么时候附加相同的变量名上去，或者把安插在上面的变量移除掉。

要是有什么办法，能把这种 [全局载体] 的 [全局面] 缩小一下就好了。
视图的上下文应运而生。

视图上下文本质上是一个空对象：`{}`，所有需要跨文件共享的变量均可以通过API设置进来，然后在另外一个地方通过API读取到，例如：
```js
/* init.js */
/* 向视图实例的上下文中设置共享变量 */
view.context.set("goodsDetail", {name: 'xxxx'});
view.context.set("callback", function(){});

/* action.js */
Hammer(btnObj).on("tap", function(){
	/* 从视图实例的上下文中取出init.js设置的共享变量 */
	var callback = view.context.get("callback"),
		goodsDetail = view.context.get("goodsDetail");
		
	callback(goodsDetail);
});
```
上下文中存储的变量，可以是任意类型的变量，包括DOM对象等。
因为上下文是视图实例的私有“物品”，因而不同视图拥有不同的上下文，不同视图的上下文中也可以存储相同名称的数据。


<br>

# API操作
视图上下文是多实例的，每个视图都有自己的上下文。例如：
```js
var view1 = View.ofId("view1");
var ctx1 = view1.context;
console.log(ctx === view1.getContext()); // -> true

var ctx2 = View.ofId("view2").context;
console.log(ctx1 == ctx2);// -> false

ctx1.set("num", 123);
ctx2.set("num", 345);

console.log(ctx1.get("num")); // -> 123
console.log(ctx2.get("num")); // -> 345
```

虽然技术上可行，但我们并不建议开发者在一个视图中读取或设置另外一个视图上下文中的数据。这样的做法会加大视图之间的耦合度，不利于视图之间的分工协作。更合适的做法，是使用视图参数进行多视图之间的协作，开发者可以在下一篇 [视图参数](https://blog.csdn.net/baozhang007/article/details/84886614) 中查阅具体用法。

视图上下文支持如下操作：
```js
var ctx = View.ofId("view").context;

/* 设置 */
ctx.set("num", 123);
ctx.set("str", "string");
ctx.set("boolean", true);
ctx.set("callback", function(){return 'value';});

/* 获取 */
console.log(ctx.get("num")); // -> 123
console.log(ctx.get("str")); // -> 'string'
console.log(ctx.get("boolean")); // -> true
console.log(ctx.get("callback")()); // -> 'value'

/* 检查是否存在 */
console.log(ctx.has("num")); // -> true
console.log(ctx.has("num1")); // -> false

/* 移除 */
console.log(ctx.remove("str")); // -> 'string'
console.log(ctx.remove("str")); // -> undefined

/* 清空 */
ctx.clear();
console.log(ctx.has("num")); // -> false
```
