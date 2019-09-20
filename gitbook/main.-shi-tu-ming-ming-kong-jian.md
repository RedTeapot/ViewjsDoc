视图的唯一性，由 **视图命名空间** 和 **视图ID** 两部分决定。视图ID可以相同，但视图命名空间一定需要时空唯一。

默认情况下，开发者在创建视图时不需要指定命名空间，视图命名空间将默认为：`default`。当多个相同ID的视图需要共存时，开发者才需要设定不同的命名空间。

视图命名空间的设定，通过在视图的布局骨架上声明dom属性：`data-view-namespace` 完成。例如：
```html
	<section id = "home-page" data-view-namespace = "b2c-mall">
		...
	</section>
	<section id = "home-page" data-view-namespace = "o2o-mall">
	</section>
```
设定命名空间后，开发者在实现视图之间的跳转逻辑时，需要同步指明目标视图所隶属的命名空间。如果目标视图的命名空间是 `default`，则无需显示声明。

正如 [前文](https://blog.csdn.net/baozhang007/article/details/85171245) 所述，开发者有两种方式实现视图跳转：
1. 使用DOM属性：`data-view-rel` 显示声明
2. 使用API：`View.navTo()`, `View.changeTo()` 动态执行

当使用属性显示声明时，开发者需要使用 `data-view-rel-namespace` 属性指定目标视图所隶属的命名空间，例如：
```html
	<div data-view-rel = "goods-detail" data-view-rel-namespace = 'seller'>商品详情</div>
```

当使用API时，开发者需要在API中提供目标视图所隶属的命名空间，例如：
```js
	/* home-page 的视图命名空间为 default */
	View.navTo("home-page");
	
	/* goods-detail 的视图命名空间为 seller */
	View.navTo("goods-detail", "seller");
	
	/* confirm-order 的视图命名空间为 seller */
	View.changeTo("confirm-order", "seller", {params: {count: 1}});
```

当非`default`命名空间的视图在变为活动视图后，其视图命名空间将同步反映在地址栏中，形如下图所示：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190417201821420.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Jhb3poYW5nMDA3,size_16,color_FFFFFF,t_70)
