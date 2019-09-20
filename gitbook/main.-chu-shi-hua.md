通常情况下，使用View.js驱动的单页应用，在其页面打开，亦即html载体被浏览器装载后，将自动执行初始化动作。

初始化动作包括：

1. 执行初始化监听器
	> 监听器通过API：`View.beforeInit({Function} callback)` 添加
2. 识别并标识操作系统类型识别并标识操作系统类型
	> 亦即，在html结点上使用 `data-view-os` 属性自动标识识别到的操作系统。如：data-view-os = "ios"
3. 识别 [视图容器](https://blog.csdn.net/baozhang007/article/details/84497867)
	>如果没有元素声明为视图容器，则认定`document.body`为视图容器
4. 扫描文档，根据DOM声明创建视图实例
5. 确定 [默认视图](https://blog.csdn.net/baozhang007/article/details/82984244)
6. 使能属性：data-view-rel
7. 使能属性：data-view-whr
8. 执行就绪监听器
	> 监听器通过API：`View.ready({Function} callback)` 添加
9. 呈现地址栏中指定的视图
	> 如果该视图是可以直接访问的，则将触发该视图的`ready`、`enter`等事件。
	> "可以直接访问"，意为该视图被切换为 [活动视图](https://blog.csdn.net/baozhang007/article/details/82985146) 后，如果用户将地址栏的地址传播给他人，他人输入该地址打开页面后看到的第一个视图即为该视图。
	> 

<br/>

上述动作，默认将在`document`的`DOMContentLoaded`事件被触发时执行。开发者可以借助以下API自主决定初始化时机：
```js
/**
 * @typdef {Function} Initializer
 * @param {Function} init - 视图的初始化方法句柄。
 * 开发者需要在时机合适的时候主动调用该方法，使得View.js可以完成初始化。
 * 如果init方法没有被调用，则View.js不会被初始化。
 */
 
/**
 * 设置初始化器
 * @param {Initializer} 初始化器
 * @param {String} [execTime=domready] 提供的初始化器的执行时机
 * 可识别的字面量包括：
 * 1) domready DOM就绪后自动执行
 * 2) rightnow 立即执行
 */
View.setInitializer({Initializer} callback, {String} execTime);
```
例如：
```js
View.setInitializer(function(init){
	$.post("/someuri", function(data){
		//...
		init();/* 初始化View.js */
		//...
	});
}, "rightnow");
```
