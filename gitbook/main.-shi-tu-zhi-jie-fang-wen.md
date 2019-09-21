一个视图是否可以 『直接访问』，是指使用含有视图位置的URL打开页面时，页面装载完毕后呈现的第一个页面是否即为URL中指定的视图。

如果是，则说明该视图是可以直接访问的，否则说明该视图是不能直接访问的。例如：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190612195932410.gif)

除非明确指定，否则每个视图都默认是『不能』直接访问的 。开发者可以通过属性 `data-view-directly-accessible` 指定视图是否可以直接访问，例如：
```html
<section
	data-view-id="page3"
	data-view-namespace = "my-namespace"
	data-view="true"
	data-view-directly-accessible="true">
	
	<header>
		<span class="nav-back" data-view-rel=":back"></span>
		Page 3
	</header>
	<h1>This is page 3 in namespace 'my-namespace'.</h1>
	<div
		data-view-rel="page1"
		data-view-rel-type = "nav"
		data-view-rel-namespace = "default"
		class="btn">Navigate to page 1.</div>
</section>
```

`data-view-directly-accessible` 属性不仅可以声明在视图的DOM节点上，也同样可以声明在 `html` 节点上：
- 当声明在视图DOM节点上时，可以用来指定视图的单个表现；
- 当声明在 `html` 节点上时，可以用来指定所有视图的默认表现，亦即视图没有声明 `data-view-directly-accessible` 属性时的表现；

亦即，上文描述的 “*除非明确指定，否则每个视图都默认是『不能』直接访问的* ” 现象，是开发者可以通过在 `html` 节点上声明 `data-view-directly-accessible` 属性，并将其赋值为 `true` 而改变的，例如：
```html
<!DOCTYPE html>

<!--
   设定所有视图默认为 “可以直接访问”
   如果没有在 html 节点上声明该属性，则所有视图默认为 “不能直接访问”
-->
<html data-directly-accessible = "true">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	
	<meta name="format-detection" content="telephone = no">
	<meta name="msapplication-tap-highlight" content="no">
	<meta name="viewport" content="user-scalable = no, initial-scale = 1, maximum-scale = 1, minimum-scale = 1, width = device-width">
</head>
<body>
	<!-- 可以直接访问 -->
	<section data-view-id="page1" data-view="true" data-view-default="true">
		...
	</section>
	
	<!-- 不能直接访问 -->
	<section data-view-id="page2" data-view="true"  data-view-directly-accessible="false">
		...
	</section>
	
	<!-- 可以直接访问 -->
	<section data-view-id="page3" data-view="true" data-view-directly-accessible="true">
		...
	</section>

	
	<script type = "text/javascript" src = "js/view.min.js"></script>
</body>
</html>
```