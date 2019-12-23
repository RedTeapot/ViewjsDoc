# 初始化

通常情况下，View.js 将在页面被浏览器装载后，自动执行初始化动作。

初始化动作包括：

1. 执行初始化监听器

   监听器通过API：`View.beforeInit(callback: Function)` 添加。

2. 识别并标识操作系统类型

   在 `<html>` 结点上使用 `data-view-os` 属性自动标识识别到的操作系统。如：`data-view-os = "ios"`。

3. 确定视图容器

   如果没有元素声明为视图容器，则认定 `document.body` 为视图容器

4. 扫描文档，创建视图实例
5. 确定默认视图 如果没有视图显示声明为默认视图，将使用视图容器下，DOM 顺序上的第一个视图作为默认视图
6. 使能属性：`data-view-rel`
7. 使能属性：`data-view-whr`
8. 执行就绪监听器

   监听器通过API：`View.ready(callback: Function)` 添加。

9. 呈现地址栏中指定的视图

   如果视图是可以直接访问的，则将触发该视图的`ready`、`enter`等事件。

上述动作，默认将在 `document` 的 `DOMContentLoaded` 事件被触发时自动执行。开发者可以借助下面的 API 自主决定初始化时机：

{% tabs %}
{% tab title="view.js" %}
```javascript
/**
 * @typdef {Function} Initializer
 * @param {Function} init - 视图的初始化方法句柄。
 * 开发者需要在时机合适的时候主动调用该方法，使得 View.js 可以完成初始化。
 * 如果init方法没有被调用，则 View.js 不会被初始化。
 */

/**
 * 设置初始化器
 * @param {Initializer} 初始化器
 * @param {String} [execTime=domready] 提供的初始化器的执行时机
 *
 * 支持的初始化器执行时机包括：
 * 1) domready DOM就绪后自动执行（设置的callback）
 * 2) rightnow 立即执行（设置的callback）
 */
View.setInitializer({Initializer} callback, {String} execTime);
```
{% endtab %}
{% endtabs %}

例如：

{% tabs %}
{% tab title="init.js" %}
```javascript
View.setInitializer(function(init){
    /**
     * 向后端请求关键数据
     */
    $.post("/someuri", function(data){
        //...
        
        /**
         * 在必要条件准备完毕后，初始化 View.js
         */
        init();
        
        //...
    });
}, "rightnow");/* 'rightnow' 向 View.js 标明：立即执行提供的初始化动作 */
```
{% endtab %}
{% endtabs %}

