# 活动视图

## 概述

活动视图，是指当前处于活动状态、被用户看到的视图。

任何情况下，最多只有一个视图处于活动状态。开发者可以通过API：`View.getActiveView()` 获取当前的活动视图，如下所示：

{% tabs %}
{% tab title="JavaScript" %}
```javascript
/* 导航到ID为 view1 的视图 */
View.navTo("view1");
var activeView = View.getActiveView();
console.log(activeView.getId());// -> 'view1'

/* 导航到ID为 view2 的视图 */
View.navTo("view2");
activeView = View.getActiveView();
/**
 * id 属性只读，与 getId() 方法功能相同，
 * 均用于获取视图的ID
 */
console.log(activeView.id);// -> 'view2'
```
{% endtab %}
{% endtabs %}

也可以使用借助API：`view.isActive()` 判定特定视图是否处于活动状态：

{% tabs %}
{% tab title="init.js" %}
```javascript
/* 导航到ID为 view2 的视图 */
View.navTo("view2");
console.log(View.getActiveView().id);// -> 'view2'

console.log(View.ofId("view1").isActive());// -> false
console.log(View.ofId("view2").isActive());// -> true
```
{% endtab %}
{% endtabs %}

