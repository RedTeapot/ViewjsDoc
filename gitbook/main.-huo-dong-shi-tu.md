活动视图，是指当前处于活动状态的视图，也是指当前可以被用户看到的视图。

在使用View.js构建的应用程序中，任何情况下都只有一个视图处于活动状态，因而活动视图会随用户浏览位置的变更而发生变化。

 
开发者可以通过API：View.getActiveView()获取当前的活动视图，如下所示：

```js
View.navTo("view1");
console.log(View.getActiveView().getId());// --> view1
 
View.navTo("view2");
console.log(View.getActiveView().getId());// --> view2
```