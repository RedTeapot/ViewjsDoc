# 活动视图

活动视图，是指当前处于活动状态、被用户看到的视图。

任何情况下，最多只有一个视图处于活动状态。开发者可以通过API：`View.getActiveView()` 获取当前的活动视图，如下所示：

{% code-tabs %}
{% code-tabs-item title="action.js" %}
```javascript
/* 导航到ID为 view1 的视图 */
View.navTo("view1");
console.log(View.getActiveView().getId());// --> view1

/* 导航到ID为 view2 的视图 */
View.navTo("view2");
console.log(View.getActiveView().getId());// --> view2
```
{% endcode-tabs-item %}
{% endcode-tabs %}

也可以使用借助API：`view.isActive()` 判定特定视图是否处于活动状态：

```javascript
/* 导航到ID为 view2 的视图 */
View.navTo("view2");
console.log(View.getActiveView().getId());// --> view2

console.log(View.ofId("view1").isActive());// --> false
console.log(View.ofId("view2").isActive());// --> true
```

