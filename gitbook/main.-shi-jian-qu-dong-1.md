# 引语
事件驱动是View.js的核心特性，是View.js的框架逻辑与业务逻辑糅合的主要桥梁，同时也是开发者驱动业务、实现多人协作的首要入口。借助事件驱动，开发者可以以相对低廉的成本，较为宽松的耦合实现绝大部分业务逻辑的功能开发，并能够与此同时保持工程松散、灵活的文件组织。对于注重工程可维护性的开发人员和管理人员而言，View.js尤其有用。

# 事件驱动语法
添加监听：`xx.on([evtName], function(e){});`

移除监听：`xx.off([evtName], function(e){});`

# 事件驱动对象
因为View.js的工作单位是视图，所以每个视图实例均支持事件驱动。同时，为便于开发者从宏观上控制视图表现，View框架也添加了事件驱动支持，亦即，变量：`window.View` 也支持 `on(evtName, handle)`, `off(evtName, handle)` 方法。

如：
```js
/* 实例监听 */
var view = View.ofId("home-page");
view.on("enter", function(e){
	view.logger.debug("视图进入");
});

/* 宏观监听 */
View.on("beforechange", function(e){
	console.log(e.sourceView.id + " -> " + e.targetView.id);
});
```
# 实例事件
View.js的每个视图都会在特定时机由框架触发以下事件：

 1. beforeenter - 视图即将进入（目标视图尚未被激活为活动视图）
 2. ready - 视图就绪（目标视图已被激活为活动视图）
 4. enter - 视图进入
 5. afterenter - 视图进入完成
 6. leave - 视图离开

# 宏观事件
View.js提供了以下几项宏观事件，以辅助开发者实现视图实例之外的宏观控制：

 1. beforechange - 活动视图即将切换
 2. change - 活动视图发生变化
 3. afterchange - 活动视图切换结束

这些事件各有各的用途，分别对应视图切换中的各个环节，用于辅助开发者以松耦合的方式指定业务逻辑的执行顺序或在恰当的时机渲染、重置视图等。

关于这些事件的具体使用场景和彼此之间的差异等，我们将在下文中详细阐述。