细心的读者可能已经发现，在 [前文给的例子](https://blog.csdn.net/baozhang007/article/details/88364811) 中，通过点击浏览器的前进与后台按钮，我们可以触发不同的视觉切换效果。这是如何实现的呢？答案是：
>1. View.js实时追踪浏览信息
>2. View.js监听`history`的`popstate`事件，通过比对最新的浏览信息和弹出的浏览信息得出视图浏览的先后顺序
>3. View.js根据比较结果，得出视图切换类型：
>3.1 View.SWITCHTYPE_HISTORYFORWARD - 由浏览器前进操作触发
>3.2 View.SWITCHTYPE_HISTORYBACK - 由浏览器后退操作触发
>3.3 View.SWITCHTYPE_VIEWNAV - 由视图切换：View.navTo操作触发
>3.4 View.SWITCHTYPE_VIEWCHANGE - 由视图切换：View.changeTo操作触发
>4. 开发者根据type应用不同的视图切换动画

# 浏览追踪
每次发生视图切换操作，View.js都会记录如下关键信息并将其反映在浏览状态：`history.state` 上：
>1. 视图ID
>2. 浏览流水

例如：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190412132236515.png)

其中，视图ID标记了浏览的视图，浏览流水则标记了浏览发生的时间（时间戳的36进制 + 2位序列号）。下面是View.js生成浏览流水的源代码：
```js
var getUniqueString = (function(){
	var i = 0;

	return function(){
		var n = Date.now();
		var s = n.toString(36);
		var p = "00" + (i++).toString(36);
		p = p.substring(p.length - 2);

		return (s + p).toUpperCase();
	};
})();
```
当视图发生切换时，上述浏览信息便不断的更新历史堆栈，如下图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190412135433191.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Jhb3poYW5nMDA3,size_16,color_FFFFFF,t_70)

# 顺序比较
当用户通过浏览器执行前进或后退浏览操作时，浏览器便会触发 `history` 的 `popstate` 事件，并将对应的先前追踪并压入的浏览状态通过事件实例反馈给View.js，如下文源码：
```js
var stateChangeListener =  function(e){
	//...
	if(ViewState.isConstructorOf(e.state)){
		var popedNewState = e.state;
		//...
	}
	//...
};

window.addEventListener(historyPushPopSupported? "popstate": "hashchange", stateChangeListener);
```
接着，View.js将通过 `popstate` 事件得到的浏览状态与当前状态进行比较，得出视图的切换方式：
```js
var stateChangeListener =  function(e){
	//...
	var type;
	if(ViewState.isConstructorOf(e.state)){
		var popedNewState = e.state;
		//...
		
		/* View.currentState描述内容等同于history.state */
		if(View.currentState != null)
				type = popedNewState.sn < View.currentState.sn? View.SWITCHTYPE_HISTORYBACK: View.SWITCHTYPE_HISTORYFORWARD;

	}
	//...
};
```

# 效果实现
开发者在设定视图切换效果时，便可以通过比较结果决定对应的渲染动画，例如：
```js
/**
 * @param {HTMLElement} srcElement 视图切换时，要离开的当前视图对应的DOM元素。可能为null
 * @param {HTMLElement} tarElement 视图切换时，要进入的目标视图对应的DOM元素
 * @param {String} type 视图切换方式
 * @param {Function} render 渲染句柄
 */
View.setSwitchAnimation(function(srcElement, tarElement, type, render){
	
	var isNav = type === View.SWITCHTYPE_VIEWNAV,
		isChange = type === View.SWITCHTYPE_VIEWCHANGE,
		isHistoryBack = type === View.SWITCHTYPE_HISTORYBACK,
		isHistoryForward = type === View.SWITCHTYPE_HISTORYFORWARD;
	
	//...
});
```

此外，如下事件也会反馈对应的视图切换方式，以供开发者使用：
>1. View#leave
>2. View#ready
>3. View#beforeenter
>4. View#enter
>5. View#afterenter
>6. View.beforechange
>7. View.change
>8. View.afterchange

至此，开发者就完成了浏览器的前进与后退的识别操作。
