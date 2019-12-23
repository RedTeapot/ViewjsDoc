# View

## static currentState

> 获取当前的浏览状态。

**签名：**

`View.currentState:` [`ViewState`](viewstate.md) 

**可用版本：**`1.6.2+`

**返回：**

当前的浏览状态，反映了当前活动视图的浏览信息。

## static context

> 公用数据存取上下文，用于跨视图存取数据。  
> 当需要抽取变量，使得可以跨视图访问时，开发者应当尽可能地使用公用上下文，而非 `window`，以降低变量污染的可能。

**签名：**

`View.context:` [`ViewContext`](viewcontext.md) 

**可用版本：**`1.6.2+`

**返回：**

公用的数据存取上下文。

## static checkIfBrowserHistorySupportsPushPopAction\(\)

> 判断浏览器的 `history` 对象是否支持 `pushState` API。

**签名：**

`View.checkIfBrowserHistorySupportsPushPopAction(): boolean`

**可用版本：**`1.6.2+`

**入参：**

无

**返回：**

`true` - 浏览器的 `history` 对象支持 `pushState` API。否则返回 `false`。

## static getViewContainerDomElement\(\)

> 获取视图容器对应的 DOM 元素。

**签名：**

`View.getViewContainerDomElement(): HTMLElement`

**可用版本：**`1.6.2+`

**入参：**

无**。**

**返回：**

视图容器对应的 DOM 元素。如果开发者没有另外设置，将返回 `document.body`。

## static find\(\)

> 从 DOM 树中获取匹配给定选择器的 DOM 元素。

**签名：**

`View.find(rootObj?: HTMLElement, selector: string): HTMLElement`

**可用版本：**`1.6.2+`

**入参：**

* `rootObj?: HTMLElement` - 检索 DOM 元素的根元素，可选。默认为视图容器。
* `selector: string` - 选择器。

**返回：**

给定根元素下，匹配给定选择器的 DOM 元素。如果没有 DOM 元素与之对应，则返回 `null` 。

**调用举例：**

```javascript
/**
 * 从 视图容器 中检索 class 名包含 btn 的 DOM 元素
 */
var btnObj = View.find(".btn");

/**
 * 从 containerObj 中检索 class 名包含 btn 的 DOM 元素
 */
btnObj = View.find(containerObj, ".btn");

```

## static findAll\(\)

> 从 DOM 树中获取匹配给定选择器的多个 DOM 元素。

**签名：**

`View.findAll(rootObj?: HTMLElement, selector: string): NodeList`

**可用版本：**`1.6.2+`

**入参：**

* `rootObj?: HTMLElement` - 检索 DOM 元素的根元素，可选。默认为视图容器。
* `selector: string` - 选择器。

**返回：**

给定根元素下，匹配给定选择器的多个 DOM 元素。

## static ofId\(\)

> 获取视图实例。

**签名：**

`View.ofId(viewId: string, viewNamespace?: string): View`

**可用版本：**`1.6.2+`

**入参：**

* `viewId: string` - 视图ID。
* `viewNamespace?: string` - 视图隶属的命名空间。可选，默认为：`default`。

**返回：**

匹配的视图实例。

{% hint style="warning" %}
如果视图容器中没有 DOM 元素与给定的 ID 和 命名空间 匹配，则抛出异常。
{% endhint %}

## static ifExists\(\)

> 判断视图是否存在。

**签名：**

`View.ifExists(viewId: string, viewNamespace?: string): boolean`

**可用版本：**`1.6.2+`

**入参：**

* `viewId: string` - 视图ID。
* `viewNamespace?: string` - 视图隶属的命名空间。可选，默认为：`default`。

**返回：**

`true` - 视图存在，`false` - 视图不存在。

{% hint style="warning" %}
如果在 View.js 完成初始化之前调用该方法，无论视图是否真正存在，都将返回 `false` 。
{% endhint %}

## static listAll\(\)

> 列举所有视图。

**签名：**

`View.listAll(viewName?: string): View[]`

**可用版本：**`1.6.2+`

**入参：**

* `viewName?: string` - 视图名称，可选。如果为空，则返回所有视图实例。否则返回声明为该名称的视图实例。不区分大小写。

**返回：**

匹配给定名称的，或者所有实例化的视图实例组成的数组。

## static listAllViewNames\(\)

> 列举被视图声明了的所有视图名称。

**签名：**

`View.listAllViewNames(): string[]`

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

被视图声明的所有视图名称。如果没有任何视图声明有视图名称，将返回空数组。

{% hint style="info" %}
视图名称在视图的 DOM 骨架上，使用 `data-view-name` 属性声明。
{% endhint %}

## static setAsDefault\(\)

> 设置给定的视图为默认视图。

**签名：**

`View.setAsDefault(viewId: string, viewNamespace?: string): View`

**可用版本：**`1.6.2+`

**入参：**

* `viewId: string` - 视图ID。
* `viewNamespace?: string` - 视图隶属的命名空间。可选，默认为：`default`。

**返回：**

`window.View` 以供开发者链式调用。

## static isDirectlyAccessible\(\)

> 判断所有视图默认是否可以直接访问。

**签名：**

`View.isDirectlyAccessible(): boolean`

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

`true` - 视图默认可以直接访问，`false` - 视图默认不可以直接访问。

{% hint style="info" %}
如果没有单独声明，视图将使用该默认值决定自己是否可以直接访问。
{% endhint %}

## static setIsDirectlyAccessible\(\)

> 设置所有视图默认是否可以直接访问。

**签名：**

`View.setIsDirectlyAccessible(isDirectlyAccessible: boolean): View`

**可用版本：**`1.6.2+`

**入参：**

* `isDirectlyAccessible: boolean` - 是否可以直接访问。

**返回：**

`window.View` 以供开发者链式调用。

## static setViewIsDirectlyAccessible\(\)

> 设置特定视图是否可以直接访问。

**签名：**

`View.setIsDirectlyAccessible(viewId: string, viewNamespace?: string, isDirectlyAccessible: boolean): View`

**可用版本：**`1.6.2+`

**入参：**

* `viewId: string` - 视图ID。
* `viewNamespace?: string` - 视图隶属的命名空间。可选，默认为：`default` 。
* `isDirectlyAccessible: boolean` - 是否可以直接访问。

**返回：**

`window.View` 以供开发者链式调用。

{% hint style="info" %}
有别于 `viewInstance.setIsDirectlyAccessible()` ，该方法可以在 View.js 完成初始化之前调用。
{% endhint %}

## static getActiveView\(\)

> 获取当前的活动视图。

**签名：**

`View.getActiveView(): View | null`

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

当前处于活动状态的视图。如果没有视图处于活动状态（如：View.js 尚未完成初始化），则返回 `null` 。

## static getDefaultView\(\)

> 获取默认视图。

**签名：**

`View.getDefaultView(): View | null`

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

默认视图。如果 View.js 尚未完成初始化，则返回 `null` 。

## static getSwitchAnimation\(\)

> 获取设置的视图跳转动画执行器。

**签名：**

`View.getSwitchAnimation():` [`ViewSwitchAnimation`](viewswitchanimation.md) `| null`

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

设置的视图跳转动画执行器。如果没有设置，则返回 `null` 。

## static setSwitchAnimation\(\)

> 设置视图跳转动画执行器。

**签名：**

`View.setSwitchAnimation(animation:` [`ViewSwitchAnimation`](viewswitchanimation.md)`): View`

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

`window.View` 以供开发者链式调用。

## static getActiveViewOptions\(\)

> 获取体现在地址栏中的，当前活动视图的视图选项集合。

**签名：**

`View.getActiveViewOptions(): Object | null`

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

当前活动视图的视图选项集合。视图选项以 key-value 的形式存放在集合中。如果没有任何视图选项，则返回 `null` 。

**调用举例：**

```javascript
var options = View.getActiveViewOptions();

var paramValue1 = options["param-name1"],
    paramvalue2 = options.paramName2;

```

## static hasActiveViewOptions\(\)

> 判断当前活动视图的视图选项集合中，是否含有给定键名的参数。

**签名：**

`View.hasActiveViewOptions(name: string): boolean`

**可用版本：**`1.6.2+`

**入参：**

* `name: string` - 参数的键名。

**返回：**

`true` - 视图选项集合不为 `null` ，且集合中含有 key 为给定键名的数据。否则，返回 `false` 。

## static getActiveViewOptions\(\)

> 从当前活动视图的视图选项集合中，获取给定键名的参数取值。

**签名：**

`View.getActiveViewOptions(name: string): string | null`

**可用版本：**`1.6.2+`

**入参：**

* `name: string` - 参数的键名。

**返回：**

参数取值。如果集合为 `null` ，或参数不存在，则返回 `null` 。

## static setActiveViewOptions\(\)

> 为当前活动视图设置视图选项。

**签名：**

`View.setActiveViewOptions(name: string, value: string): View`

**可用版本：**`1.6.2+`

**入参：**

* `name: string` - 参数的键名。
* `value: string` - 参数的取值。

**返回：**

`window.View` 以供开发者链式调用。

## static passBy\(\)

> “穿过”视图，用于在不渲染界面、不触发关联事件的情况下 “伪造” 视图的访问记录。

**签名：**

`View.passBy(viewId: string, viewNamespace?: string): View`

**可用版本：**`1.6.2+`

**入参：**

* `viewId: string` - 视图ID。
* `viewNamespace?: string` - 视图隶属的命名空间。可选，默认为：`default` 。

**返回：**

`window.View` 以供开发者链式调用。

**调用举例：**

```javascript
/**
 * 导航至 我的银行卡列表 界面。
 *
 * 通过伪造 profile 的访问记录，实现 “虽然用户看到的是 银行卡列表 界面，
 * 但点击页面中的返回按钮，将返回到 个人中心 界面”的目的
 */
View.passBy("profile").navTo("my-bankcard-list");

/**
 * 1秒后页面将返回至 个人中心
 */
setTimeout(function(){
    View.back();
}, 1000);
```

## static navTo\(\)

> 以 压入堆栈 的方式跳转至目标视图。

**签名：**

`View.navTo(viewId: string, viewNamespace?: string, ctrl:` [`ViewSwitchCtrl`](viewswitchctrl.md)`): View`

**可用版本：**`1.6.2+`

**入参：**

* `viewId: string` - 视图ID，或视图名称，或伪视图，或外部链接。

> 支持的伪视图包括：
>
> * `:back` - 前进，等同于 `View.back()`；
> * `:forward` - 后退，等同于 `View.forward()` ；
> * `:default-view` - 默认视图；
>
> 例如：
>
> ```javascript
> /**
>  * 后退，等同于 View.back()
>  *
>  * 第一个参数指定了跳转目标；
>  * 第二个参数指定了跳转控制选项，其中，关键字：'params' 用于指定视图参数集合。
>  */
> View.navTo(":back", {
>     params: {
>         paramName1: "boo"
>     }
> });
>
> /**
>  * 后退，等同于 View.forward()
>  */
> View.navTo(":forward", {
>     params: {
>         paramName1: "boo"
>     }
> });
>
> /**
>  * 跳转至默认视图
>  * 第二个参数指定了跳转控制选项，其中，关键字：'options' 用于指定视图选项集合。
>  */
> View.navTo(":default-view", {
>     params: {
>         paramName1: "boo"
>     },
>     options: {
>         paramName2: "foo"
>     }
> });
> ```

> 当为视图名称时，需要使用 `~` 符号前缀，例如：
>
> ```javascript
> /**
>  * 跳转至视图名称为 profile 的第一个视图上去
>  */
> View.navTo("~profile"，{
>     params: {
>         param1: "value1"
>     },
>     options: {
>         param2: "value2"
>     }
> });
> ```

> 当为外部链接，且链接地址为完整路径时，可以直接赋值为链接地址，例如：
>
> ```javascript
> /**
>  * 跳转至完整的外部链接
>  */
> View.navTo("http://view-js.com");
> ```
>
> 如果外部链接地址不完整，则需要使用 `@` 符号前缀，例如：
>
> ```javascript
> /**
>  * 跳转至当前目录下的 index.html 页面
>  */
> View.navTo("@index.html");
> ```

* `viewNamespace?: string` - 视图隶属的命名空间。可选，默认为：`default` 。
* `ctrl?:` [`ViewSwitchCtrl`](viewswitchctrl.md) - 视图跳转控制。可选。

**返回：**

`window.View` 以供开发者链式调用。

**调用举例：**

```javascript
/**
 * 以“压入堆栈”的方式跳转至 myNamespace 命名空间下, ID为 targetVieWId 的视图
 *
 * 第一个参数指定了跳转目标；
 * 第二个参数指定了跳转控制选项，其中，关键字：'params' 用于指定视图参数集合，
 * 'options' 用于指定视图选项集合。
 */
View.navTo("targetViewId", "myNamespace", {

    /**
     * 开发者可以在视图参数集合指定任意数量的参数，参数取值可以是
     * 任意合法的js类型
     */
    params: {
        paramName1: "boo",/* 传导字符串 */
        paramName2: true,/* 传导枚举值 */
        paramName3: ['str', 123, false, new Object()],/* 传导数组 */
        paramName4: View.find(".container"),/* 传导DOM元素 */
        paramName5: function(data){doSth(data);}/* 传导回调方法 */
    },
    
    /**
     * 视图选项只支持字符串类型
     */
    options: {
        paramName1: "boo"
        paramName2: "bar"
    }
    
});
```

## static changeTo\(\)

> 以 替换栈顶 的方式跳转至目标视图。

**签名：**

`View.changeTo(viewId: string, viewNamespace?: string, ctrl:` [`ViewSwitchCtrl`](viewswitchctrl.md)`): View`

**可用版本：**`1.6.2+`

**入参：**

* `viewId: string` - 视图ID，或视图名称，或伪视图，或外部链接。

> 支持的伪视图包括：
>
> * `:default-view` - 默认视图；

> 例如：
>
> ```javascript
> /**
>  * 跳转至默认视图
>  * 第二个参数指定了跳转控制选项，其中，关键字：'options' 用于指定视图选项集合。
>  */
> View.changeTo(":default-view", {
>     params: {
>         paramName1: "boo"
>     },
>     options: {
>         paramName2: "foo"
>     }
> });
> ```

> 当为视图名称时，需要使用 `~` 符号前缀，例如：
>
> ```javascript
> /**
>  * 跳转至视图名称为 profile 的第一个视图上去
>  */
> View.changeTo("~profile"，{
>     params: {
>         param1: "value1"
>     },
>     options: {
>         param2: "value2"
>     }
> });
> ```

> 当为外部链接，且链接地址为完整路径时，可以直接赋值为链接地址，例如：
>
> ```javascript
> /**
>  * 跳转至完整的外部链接
>  */
> View.changeTo("http://view-js.com");
> ```
>
> 如果外部链接地址不完整，则需要使用 `@` 符号前缀，例如：
>
> ```javascript
> /**
>  * 跳转至当前目录下的 index.html 页面
>  */
> View.changeTo("@index.html");
> ```

* `viewNamespace?: string` - 视图隶属的命名空间。可选，默认为：`default` 。
* `ctrl?:` [`ViewSwitchCtrl`](viewswitchctrl.md) - 视图跳转控制。可选。

**返回：**

`window.View` 以供开发者链式调用。

## static setNoViewToNavBackAction\(\)

> 设置在“没有视图可以继续向前返回”的情况下，尝试返回时要执行的动作。  
> 开发者可以借助该特性，实现 “没有页面可以继续向前返回时，跳转至首页” 的效果。

**签名：**

`View.setNoViewToNavBackAction(action: Function): View`

**可用版本：**`1.6.2+`

**入参：**

* `action: Function` - 要执行的动作。

**返回：**

`window.View` 以供开发者链式调用。

**调用举例：**

```javascript
View.setNoViewToNavBackAction(function(){
    View.changeTo(":default-view");
});
```

## static back\(\)

> 返回至上一个视图。

**签名：**

`View.back(ctrl?:` [`ViewBackForwardCtrl`](viewbackforwardctrl.md)`): View`

**可用版本：**`1.6.2+`

**入参：**

* `ctrl?:` [`ViewBackForwardCtrl`](viewbackforwardctrl.md) - 视图跳转控制。可选。

**返回：**

`window.View` 以供开发者链式调用。

## static forward\(\)

> 前进至下一个视图。

**签名：**

`View.forward(ctrl?:` [`ViewBackForwardCtrl`](viewbackforwardctrl.md)`): View`

**可用版本：**`1.6.2+`

**入参：**

* `ctrl?:` [`ViewBackForwardCtrl`](viewbackforwardctrl.md) - 视图跳转控制。可选。

**返回：**

`window.View` 以供开发者链式调用。

## static setDocumentTitle\(\)

> 设置文档标题。  
> 在视图之间发生跳转时，View.js 会自动使用目标视图定义的标题更新文档标题。如果目标视图没有定义标题，则会使用初始化阶段捕获的浏览器标题呈现。如果初始化阶段的文档不是文档的最终标题，开发者需要在适当时机执行该方法。  
> View.js 默认在 `DOMContentloaded` 事件触发后进行初始化。

**签名：**

`View.setDocumentTitle(title: string): View`

**可用版本：**`1.6.2+`

**入参：**

* `title: string` - 文档标题。

**返回：**

`window.View` 以供开发者链式调用。

## static reDoLayout\(\)

> 执行所有视图的布局动作。  
> 每个视图实例都可以通过 `setLayoutAction()` 方法设置自己的布局动作。布局动作默认在视图进入时由 View.js 自动执行。必要时，开发者可以通过调用本方法强制所有视图重新布局。

**签名：**

`View.reDoLayout(): View`

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

`window.View` 以供开发者链式调用。

## static ifCanGoBack\(\)

> 判断是否可以继续向前返回。亦即，历史堆栈中，是否还有更早的视图浏览记录。

**签名：**

`View.ifCanGoBack(): boolean`

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

`true` - 可以继续向前返回；`false` - 已经返回到底了。

## static beforeInit\(\)

> 添加 View.js 初始化前要执行的处理器。

**签名：**

`View.beforeInit(action: Function): View`

**可用版本：**`1.6.2+`

**入参：**

* `action: Function` - 处理器。

**返回：**

`window.View` 以供开发者链式调用。

{% hint style="info" %}
所有处理器均以 同步 的方式被触发。
{% endhint %}

## static ready\(\)

> 添加 View.js 就绪后要执行的处理器。

**签名：**

`View.ready(action: Function): View`

**可用版本：**`1.6.2+`

**入参：**

* `action: Function` - 处理器。

**返回：**

`window.View` 以供开发者链式调用。

{% hint style="info" %}
所有处理器均以 同步 的方式被触发。
{% endhint %}

## static setInitializer\(\)

> 设置 View.js 的初始化触发器。

**签名：**

`View.setInitializer(initializer:` [`ViewInitializer`](viewinitializer.md)`, execTime?:` [`ViewInitializeTime`](viewinitializetime.md)`): View`

**可用版本：**`1.6.2+`

**入参：**

* `initializer:` [`ViewInitializer`](viewinitializer.md) - 初始化触发器。
* `execTime?:` [`ViewInitializeTime`](viewinitializetime.md) - 触发器的执行时机。默认为：`'domready'` 。

**返回：**

`window.View` 以供开发者链式调用。

## static on\(\)

> 添加宏观事件监听器。预置的宏观事件包括：  
> 1. `beforechange` - 活动视图即将切换（同步触发）  
> 2. `change` - 活动视图正在切换（同步触发）  
> 3. `afterchange` - 活动视图切换完成（异步触发）
>
> 开发者也可以使用该方法监听自定义事件。

**签名：**

`View.on(eventName: string, handle:` [`ViewEventListener`](vieweventlistener.md)`): View`

**可用版本：**`1.6.2+`

**入参：**

* `eventName: string` - 事件名称。
* `handle:` [`ViewEventListener`](vieweventlistener.md) - 事件监听器 。

**返回：**

`window.View` 以供开发者链式调用。

**调用举例：**

```javascript
/**
 * 监听预置事件
 */
View.on("change", function(e){
    var info = e.data;
    
    /**
     * 跳转到的目标视图
     */
    var targetView = e.data.targetView;
    //...
});

/**
 * 监听自定义事件
 */
View.on("myEvent", function(e){
    var data = e.data;
    // doSth(data);
});
```

## static off\(\)

> 移除宏观事件监听器。预置的宏观事件包括：  
> 1. `beforechange` - 活动视图即将切换（同步触发）  
> 2. `change` - 活动视图正在切换（同步触发）  
> 3. `afterchange` - 活动视图切换完成（异步触发）

**签名：**

`View.off(eventName: string, handle:` [`ViewEventListener`](vieweventlistener.md)`): View`

**可用版本：**`1.6.2+`

**入参：**

* `eventName: string` - 事件名称。
* `handle:` [`ViewEventListener`](vieweventlistener.md) - 事件监听器 。

**返回：**

`window.View` 以供开发者链式调用。

## static fire\(\)

> 发起宏观事件。

**签名：**

`View.fire(eventName: string, data?: any): View`

**可用版本：**`1.6.2+`

**入参：**

* `eventName: string` - 事件名称。
* `data?: any` - 事件关联数据 。

**返回：**

`window.View` 以供开发者链式调用。

**调用举例：**

```javascript
/**
 * 监听 "myEvent" 事件
 */
View.on("myEvent", function(e){
    console.log(e.data["key2"]);
});

/**
 * 触发事件："myEvent"，并携带自定义数据
 */
View.fire("myEvent", {
    "key1": "value1",
    "key2": 123,
    "key3": true
});

// 控制台异步输出 123
```

## static SWITCHTYPE\_HISTORYFORWARD

> 视图切换方式：浏览器前进。只读。

**签名：**

`View.SWITCHTYPE_HISTORYFORWARD: string` 

**可用版本：**`1.6.2+`

## static SWITCHTYPE\_HISTORYBACK

> 视图切换方式：浏览器后退。只读。

**签名：**

`View.SWITCHTYPE_HISTORYBACK: string` 

**可用版本：**`1.6.2+`

## static SWITCHTYPE\_VIEWNAV

> 视图切换方式：“压入堆栈” 式前进。只读。

**签名：**

`View.SWITCHTYPE_VIEWNAV: string` 

**可用版本：**`1.6.2+`

## static SWITCHTYPE\_VIEWCHANGE

> 视图切换方式：“替换栈顶” 式前进。只读。

**签名：**

`View.SWITCHTYPE_VIEWCHANGE: string` 

**可用版本：**`1.6.2+`

## static SWITCHTRIGGER\_APP

> 视图跳转动作触发来源：应用程序。只读。

**签名：**

`View.SWITCHTRIGGER_APP: string` 

**可用版本：**`1.6.2+`

## static SWITCHTRIGGER\_NAVIGATOR

> 视图跳转动作触发来源：浏览器。只读。

**签名：**

`View.SWITCHTRIGGER_NAVIGATOR: string` 

**可用版本：**`1.6.2+`

## id

> 获取视图的ID。只读。

**签名：**

`viewInstance.id: string` 

**可用版本：**`1.6.2+`

**返回：**

视图的ID。

## namespace

> 获取视图隶属的命名空间。只读。

**签名：**

`viewInstance.namespace: string` 

**可用版本：**`1.6.2+`

**返回：**

视图隶属的命名空间。

{% hint style="info" %}
除非另外声明，否则视图的命名空间将默认为：`default` 。
{% endhint %}

## logger

> 获取视图内置的日志句柄。只读。

**签名：**

`viewInstance.logger:` [`View.Logger`](view.logger.md) 

**可用版本：**`1.6.2+`

**返回：**

视图内置的日志数据句柄。

## config

> 获取视图内置的配置集合。只读。

**签名：**

`viewInstance.config:` [`ViewConfigurationSet`](viewconfigurationset.md) 

**可用版本：**`1.6.2+`

**返回：**

视图内置的配置集合。

## context

> 获取视图内置的数据存取上下文。只读。

**签名：**

`viewInstance.context:` [`ViewContext`](viewcontext.md) 

**可用版本：**`1.6.2+`

**返回：**

视图内置的数据存取上下文。

## getId\(\)

> 获取视图的ID，等同于 `id` 属性。

**签名：**

`viewInstance.getId(): string` 

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

视图的ID。

## getNamespace\(\)

> 获取视图隶属的命名空间，等同于 `namespace` 属性。

**签名：**

`viewInstance.getNamespace(): string` 

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

视图隶属的命名空间。

{% hint style="info" %}
除非另外声明，否则视图的命名空间将默认为：`default` 。
{% endhint %}

## getContext\(\)

> 获取视图内置的数据存取上下文，等同于 `context` 属性。

**签名：**

`viewInstance.getContext():` [`ViewContext`](viewcontext.md) 

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

视图内置的数据存取上下文。

## clearContext\(\)

> 清空视图内置的数据存取上下文，移除上下文内的所有数据。

**签名：**

`viewInstance.clearContext(): View`

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

视图实例本身，以供开发者链式调用。

## getDomElement\(\)

> 获取视图的 DOM 骨架元素。

**签名：**

`viewInstance.getDomElement(): HTMLElement`

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

视图的 DOM 骨架元素。

## getName\(\)

> 获取视图的名称。视图名称，通过在视图的 DOM 骨架元素上声明 `data-view-name` 属性完成声明。  
> 该方法向后兼容 `data-view-group` 属性。

**签名：**

`viewInstance.getName(): string | null`

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

视图在 DOM 骨架上声明的名称。

## getGroupName\(\)

> 获取视图隶属的群组名称。视图群组名称，通过在视图的 DOM 骨架元素上声明 `data-view-group` 属性完成声明。  
> 该方法，以及 `data-view-group` 属性已废弃，请使用 `getName()` 方法和 `data-view-name` 属性。

**签名：**

`viewInstance.getGroupName(): string | null`

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

视图隶属的群组名称。

## find\(\)

> 在视图的 DOM 骨架元素内部查找匹配给定选择器的 DOM 元素。

**签名：**

`viewInstance.find(selector: string): HTMLElement | null`

**可用版本：**`1.6.2+`

**入参：**

* `selector: string` - css 选择器

**返回：**

视图内匹配的 DOM 元素。如果没有元素与给定的选择器相匹配，则返回 `null` 。

## findAll\(\)

> 在视图的 DOM 骨架元素内部查找匹配给定选择器的 DOM 元素集合。

**签名：**

`viewInstance.findAll(selector: string): NodeList`

**可用版本：**`1.6.2+`

**入参：**

* `selector: string` - css 选择器

**返回：**

视图内匹配的 DOM 元素列表。

## setLayoutAction\(\)

> 设置视图的布局动作。

**签名：**

`viewInstance.setLayoutAction(action: Function): View`

**可用版本：**`1.6.2+`

**入参：**

* `action: Function` - 布局动作

**返回：**

视图实例本身，以供开发者链式调用。

**调用举例：**

```javascript
var view = View.ofId("myView");

var headerObj = view.find("header"),
    bodyObj = view.find(".body");

/**
 * 设置布局动作：
 * 主内容高度 = 总高度 - 头部高度
 */
view.setLayoutAction(function(){
    /* 布局空间的高度 */
    var availableHeight = View.layout.getLayoutHeight();
    
    bodyObj.style.height = (availableHeight - headerObj.offsetHeight) + "px";
});
```

## getLayoutAction\(\)

> 获取设置的视图布局动作。

**签名：**

`viewInstance.getLayoutAction(): Function`

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

设置的视图布局动作。

{% hint style="info" %}
如果开发者没有设置布局动作，该方法将返回一个空方法。
{% endhint %}

## hasParameter\(\)

> 判断视图参数中是否含有给定键名的参数。

**签名：**

`viewInstance.hasParameter(paramName: string): boolean`

**可用版本：**`1.6.2+`

**入参：**

* `paramName: string` - 参数的键名。区分大小写。

**返回：**

`true` - 视图参数中有给定键名的参数；`false` - 没有给定键名的参数。

{% hint style="info" %}
方法应该在视图是活动状态时调用，否则永远会得到 `false` 。因为视图参数将会在视图离开被重置。
{% endhint %}

## getParameter\(\)

> 获取视图参数。

**签名：**

`viewInstance.getParameter(paramName?: string): any | null`

**可用版本：**`1.6.2+`

**入参：**

* `paramName?: string` - 参数的键名，可选。如果没有指定该参数，将返回所有视图参数构成的集合。区分大小写。

**返回：**

视图参数中匹配给定键名的参数取值。如果没有指定参数键名，则返回整个参数集合。如果视图跳转时没有指定视图参数，则返回 `null` 。

## seekParameter\(\)

> 搜寻视图收到的参数。

**签名：**

`viewInstance.seekParameter(paramName: string): any | null`

**可用版本：**`1.6.2+`

**入参：**

* `paramName: string` - 参数的键名。

**返回：**

视图参数，或视图选项，或地址栏 queryString 中匹配给定键名的参数取值 。

{% hint style="info" %}
该方法如下方式工作：

1. 尝试从 视图参数 中检索同名参数，有则返回，没有则执行步骤2；
2. 尝试从 视图选项 中检索同名参数，有则返回，没有则执行步骤3；
3. 尝试从 queryString 中 检索同名参数，有则返回对应的取值，没有则返回 `null`。
{% endhint %}

**调用举例：**

{% tabs %}
{% tab title="action.js" %}
```javascript
/**
 * 从 商品详情 页面跳转至 确认订单 界面
 *
 * 跳转前，页面的URL为：http://domain/main.html?id=G01#goods-detail
 */
View.navTo("confirm-order", {
    params: {
        inventory: 100 /* 库存量：100 */
    },
    options: {
        count: 1 /* 购买个数：1 */
    }
});
```
{% endtab %}

{% tab title="init.js" %}
```javascript
var view = View.ofId("confirm-order");

/**
 * 跳转后，页面的URL为 http://domain/main.html?id=G01#confirm-order!count=1
 */
view.on("enter", function(){
    console.log(view.seekParameter("id")); // -> "G01"
    console.log(view.seekParameter("inventory")); // -> 100
    console.log(view.seekParameter("count")); // -> "1"
});
```
{% endtab %}
{% endtabs %}

## isReady\(\)

> 判断视图是否已经就绪。

**签名：**

`viewInstance.isReady(): boolean`

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

`true` - 视图已经就绪；`false` - 视图尚未就绪 。

{% hint style="info" %}
视图在第一次进入时，`enter` 事件触发前变为就绪状态。关联事件名称为：`ready` 。
{% endhint %}

## isActive\(\)

> 判断视图是否处于活动状态，亦即视图当前是否为活动视图。

**签名：**

`viewInstance.isActive(): boolean`

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

`true` - 视图处于活动状态；`false` - 视图没有处于活动状态 。

## isDefault\(\)

> 判断视图是否是默认视图。

**签名：**

`viewInstance.isDefault(): boolean`

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

`true` - 视图是默认视图；`false` - 视图不是默认视图 。

## isDirectlyAccessible\(\)

> 判断视图是否可以直接访问。

**签名：**

`viewInstance.isDirectlyAccessible(): boolean`

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

`true` - 视图可以直接访问；`false` - 视图不可以直接访问 。

## setAsDirectlyAccessible\(\)

> 设置视图是否可以直接访问。

**签名：**

`viewInstance.setDirectlyAccessible(isDirectlyAccessible?: boolean): View`

**可用版本：**`1.6.2+`

**入参：**

* `isDirectlyAccessible?: boolean` - 是否可以直接访问，可选。默认为：`true` 。

**返回：**

视图本身，以供开发者链式调用。

## setTitle\(\)

> 设置视图标题。当视图变为活动状态，View.js 将自动使用设置的视图标题更新浏览器标题。

**签名：**

`viewInstance.setTitle(title: string): View`

**可用版本：**`1.6.2+`

**入参：**

* `title: string` - 视图标题。

**返回：**

视图本身，以供开发者链式调用。

{% hint style="info" %}
如果活动视图没有设置视图标题，View.js 将使用初始化阶段捕获的浏览器标题更新浏览器标题。
{% endhint %}

## getTitle\(\)

> 获取设置的视图标题。

**签名：**

`viewInstance.getTitle(): string | null`

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

设置的视图标题。如果尚未设置过标题，则返回 `null` 。

## setFallbackViewId\(\)

> 设置回退视图的ID（及命名空间）。

**签名：**

`viewInstance.setFallbackViewId(viewId: string, viewNamespace?: string): View`

**可用版本：**`1.6.2+`

**入参：**

* `viewId: string` - 要回退显示的视图的ID。
* `viewNamespace?: string` - 要回退显示的视图隶属的命名空间，可选。默认为： `default` 。

**返回：**

视图本身，以供开发者链式调用。

## getFallbackView\(\)

> 获取最终要回退显示的视图。

**签名：**

`viewInstance.getFallbackViewId(): View`

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

最终回退显示的视图。

## on\(\)

> 添加视图实例事件监听器。预置的实例事件包括：  
> 1. `leave` - 离开视图（异步触发）  
> 2. `beforeenter` - 即将进入视图（同步触发）  
> 3. `ready` - 视图就绪（同步触发）  
> 4. `enter` - 进入视图（同步触发）  
> 5. `afterenter` - 视图已经进入（同步触发）  
>   
> 开发者也可以使用该方法监听自定义事件。

**签名：**

`viewInstance.on(eventName: string, handle:` [`ViewEventListener`](vieweventlistener.md)`): View`

**可用版本：**`1.6.2+`

**入参：**

* `eventName: string` - 事件名称。
* `handle:` [`ViewEventListener`]() - 事件监听器 。

**返回：**

当前视图实例，以供开发者链式调用。

**调用举例：**

```javascript
var view = View.ofId("myView");

/**
 * 监听预置事件
 */
myView.on("enter", function(e){
    var id = view.seekParameter("id");
    // doSth(id);
});

/**
 * 监听自定义事件
 */
viwe.on("myEvent", function(e){
    var data = e.data;
    // doSth(data);
});
```

## off\(\)

> 移除视图实例事件监听器。预置的实例事件包括：  
> 1. `leave` - 离开视图（异步触发）  
> 2. `beforeenter` - 即将进入视图（同步触发）  
> 3. `ready` - 视图就绪（同步触发）  
> 4. `enter` - 进入视图（同步触发）  
> 5. `afterenter` - 视图已经进入（同步触发）

**签名：**

`viewInstance.off(eventName: string, handle:` [`ViewEventListener`](vieweventlistener.md)`): View`

**可用版本：**`1.6.2+`

**入参：**

* `eventName: string` - 事件名称。
* `handle:` [`ViewEventListener`](vieweventlistener.md) - 事件监听器 。

**返回：**

当前视图实例，以供开发者链式调用。

## fire\(\)

> 发起视图实例事件。

**签名：**

`viewInstance.fire(eventName: string, data?: any): View`

**可用版本：**`1.6.2+`

**入参：**

* `eventName: string` - 事件名称。
* `data?: any` - 事件关联数据 。

**返回：**

当前视图实例，以供开发者链式调用。

**调用举例：**

```javascript
var view = View.ofId("myView");

/**
 * 监听 "myEvent" 事件
 */
view.on("myEvent", function(e){
    console.log(e.data["key2"]);
});

/**
 * 触发事件："myEvent"，并携带自定义数据
 */
view.fire("myEvent", {
    "key1": "value1",
    "key2": 123,
    "key3": true
});

// 控制台异步输出 123
```

## getLatestEventData\(\)

> 获取给定名称的事件最后一次触发时携带的数据。

**签名：**

`viewInstance.getLatestEventData(eventName: string): any`

**可用版本：**`1.6.2+`

**入参：**

* `eventName: string` - 事件名称。

**返回：**

事件最后一次触发时所携带的数据。

**调用举例：**

```javascript
var view = View.ofId("myView");

/**
 * 触发事件："myEvent"，并携带自定义数据
 */
view.fire("myEvent", {
    "key1": "value1",
    "key2": 123,
    "key3": true
});

// -> 'value1'
console.log(view.getLatestEventData("myEvent").key1);
```

