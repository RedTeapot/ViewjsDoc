在正式介绍视图配置的功能作用之前，我们先来看一看我们在面临『相似而又不同』的需求时，我们是如何处理的。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190220214934986.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Jhb3poYW5nMDA3,size_16,color_FFFFFF,t_70)
如上图所示，我们同时面临3个需求需要满足（这些需求可能是同时提出的，也可能是一个需求满足后而又提出的其它需求），这些需求有相当一部分是重合，可以共用的，但是彼此时间又互有差异之处。

通常的做法，是先满足一个需求，然后将重叠部分的逻辑硬拷贝多份，转而以其为基础分别实现需求B和需求C。

这样做当然可行，但潜在的维护成本就会一下子高出了很多.因为我们都清醒地认识到当代码衍生出多个副本的时候，开发团队就难免会遇到代码同步的问题：

> 在副本A中发现的故障，需要同步在副本B、副本C中解决；
> 在副本B中丰富的功能，需要同步至副本A、副本C中；

随着项目的进一步开展和功能的进一步丰富，将会出现 “相比功能开发或故障解决而言，代码同步工作会耗费更多的精力”的情况。虽然我们耿耿于怀，越来越担心，但似乎一直找不到合适、优雅的解决办法。

怎么办？
先从思路上做出改变：

> 将需求A、需求B和需求C合并开发，使用配置决定工作模式

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190220220951149.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Jhb3poYW5nMDA3,size_16,color_FFFFFF,t_70)
亦即，开发者可以将需求A和需求B，以及需求C在同一载体上同时实现，然后借助配置工具通过配置决定功能的具体工作模式。
对View.js而言，这个载体就是视图，配置工具，就是视图配置。

借助视图配置，开发者可以将视图开发为多种形态的综合体，最终以视图配置的方式指定视图的具体工作模式或表现形式。
例如，开发者可以使用视图配置轻松实现如下需求：

> 注册界面的密码长度，软件定制客户A要求在6-20位，软件定制客户B要求在4-10位。

代码如下所示：
```js
var view = View.ofId("register");
 
/* 默认配置：密码最少位数 */
view.config.get("password-min-length").setValue(10);
 
/* 默认配置：密码最多位数 */
view.config.get("password-max-length").setValue(20);

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
```

客户A的配置：
```js

/* 重载既有配置：密码最少位数 */
view.config.get("password-min-length").setValue(6, true);/* 第二个参数用于复写可能已经存在的值，如果不传且已经有值，则赋值无效，相当于什么也没做 */
 
/* 重载默认配置：密码最多位数 */
view.config.get("password-max-length").setValue(20, true);
```

客户B的配置：
```js

/* 重载既有配置：密码最少位数 */
view.config.get("password-min-length").setValue(4, true);/* 第二个参数用于复写可能已经存在的值，如果不传且已经有值，则赋值无效，相当于什么也没做 */
 
/* 重载默认配置：密码最多位数 */
view.config.get("password-max-length").setValue(10, true);
```

----
[\[第一篇\]](https://blog.csdn.net/baozhang007/article/details/81587648)
[\[上一篇 - 初始化\]](https://blog.csdn.net/baozhang007/article/details/87387097) [\[下一篇 - 日志输出\]](https://blog.csdn.net/baozhang007/article/details/87903508)