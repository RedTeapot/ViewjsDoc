“比较优势”，是经济学的术语，是指生产者可以使用更低的机会成本生产产品或提供服务的的优势。

和其它框架相比，View.js为单页应用开发提供了的以下几个关键特性彰显了它的比较优势：

无需配置和开发，视图导航开箱可用
允许在视图切换时传递任意类型的参数
允许自定义视图切换动画
允许自定义视图配置
以事件驱动地形式完成视图功能的开发
View.js是为了简化移动端单页应用的功能开发而创建的，web前端开发者可以继续沿用既有技术栈，不会因为使用view.js而面临较大的冲击。

需要注意的是，和vue不同，对于使用View.js完成的单页应用，其HTML文档仍然由HTML、CSS和JS组成。开发者一如既往地需要手动建立html、css和js文件，并手动完成资源的引用。因为View.js的舞台，是浏览器装载文档之后的运行时环境。

# 视图导航

视图导航，在视图切换时由View.js自动完成。下面是一个例子

```js
/* 切换至商品详情视图 */
View.navTo("goods-detail", {
    options: {
        goodsId: "G01"
    }
});
```

视图切换后，页面URL将自动变更为：http://domain:port/context/index.html#goods-detail!goodsId=G01。

View.js当前仅支持hash形式的地址表示。

# 视图传参

View.js允许以视图为单位拆分任务，执行多人协作。视图之间使用参数完成协作。参数在进行视图切换时传递，如下所示：
```js
View.navTo("goods-detail", {
    options: {/* 使用options传递的参数将反馈到地址栏中，因此只能传递字符串类型的参数 */
        goodsId: "G01"
    }
});
 
View.navTo("delivery-address-list", {
    params: {/* 使用params传递的参数不会反馈到地址栏中，因此可以是任意被浏览器所支持的类型 */
        selectCallback: function(selectedAddress){
            //...
        }
    }
});
 
View.navTo("goods-detail", {
    params: {
        goodsId: "G01",
    },
    options: {
        goodsId: "G02"
    }
});
 
var view = View.ofId("goods-detail");
view.on("enter", function(){
    var goodsId = view.getParameter("goodsId");// --> G01
    goodsId = View.getActiveViewOption("goodsId");// --> G02
    goodsId = view.seekParameter("goodsId");// --> G01
});
```

# 视图配置

多数情况下，一个视图的表现和行为是固定的一种。但对于软件提供商，其同一产品在被多个客户购买时，会遇到“不同客户有不同需求，拒绝需求没收入，答应需求成本高”的窘境。而不同需求的差异点通常也并不高，可能也就只有10-30%左右的差别。但因为10%的差别，就要把源码硬拷贝2份，对于软件提供商而言，成本无疑高了许多。

View.js考虑到了这一点。

通过引入视图配置，开发者可以将视图开发为多种形态的综合体，最终以视图配置的方式指定视图的具体工作模式或表现形式。如下所示：

```js
var view = View.ofId("register");
 
/* 默认配置：密码最少位数 */
view.config.get("password-min-length").setValue(6);
 
/* 默认配置：密码最多位数 */
view.config.get("password-max-length").setValue(20);
 
/* -------------------------------------------- */
 
view.find(".submit").addEventListener("click", function(){
    var pwd = pwdObj.value.trim();
 
    var minLen = view.config.get("password-min-length").getValue(),
        maxLen = view.config.get("password-max-length").getValue();
 
    if(pwd.length < min){
        alert("密码长度不能少于" + minLen + "位");
        return;
    }
 
    if(pwd.length > max){
        alert("密码长度不能多于" + maxLen + "位");
        return;
    }
});
 
/* -------------------------------------------- */
 
/* 客户A的视图配置 */
 
/* 重载既有配置：密码最少位数 */
view.config.get("password-min-length").setValue(10, true);/* 第二个参数用于复写可能已经存在的值，如果不传且已经有值，则赋值无效，相当于什么也没做 */
 
/* 重载默认配置：密码最多位数 */
view.config.get("password-max-length").setValue(20, true);
 
/* -------------------------------------------- */
 
/* 客户B的视图配置 */
 
/* 重载既有配置：密码最少位数 */
view.config.get("password-min-length").setValue(4, true);
 
/* 重载默认配置：密码最多位数 */
view.config.get("password-max-length").setValue(10, true);
```

# 事件驱动

开发者通过监听视图的相关事件来决定执行特定操作的时机。View.js为每个视图实例预制了如下几个事件：

- ready - 视图就绪，在视图第一次进入时触发；
- beforeenter - 视图即将进入
- enter - 视图进入
- afterenter - 视图进入后
- leave - 视图离开

除此之外，开发者还可以根据自己的业务需要，自行发起并消费事件，如下所示：

```js
var view = View.ofId("myView");
view.on("myevent", function(e){
    view.logger.debug("Event name: {}, event data: {}", e.name, e.data);
});
//…
view.fire("myevent", {a: 1});//-> 0918 10:20:54 [View#myView]: Event name: null, event data: {"a":1}
```

# 引入即用

View.js并不借助npm才能使用，开发者可以引入对应的js和css文件即可开始使用。