为辅助开发者更清晰地排查问题，View.js内置了格式化日志输出组件，输出效果如下图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190224152904243.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Jhb3poYW5nMDA3,size_16,color_FFFFFF,t_70)

每个视图实例均含有名为logger的实例句柄，开发者可以直接使用。
支持的日志级别包括（级别从低到高）：

 1. debug
 2. log
 3. info
 4. warn
 5. error

如上图所示，输出内容包括：

 1. 月、日、时、分、秒组合成的时间信息
 2. 日志实例名称，由字符："[" 和 "]" 包裹
 3. 消息模板。亦即方法的第一个参数
 4. 填充参数。第二个及后续的不定长参数，对应于消息模板中的占位符："{}"
 
 日志组件同样支持开发者脱离视图独立使用，如下所示：
```js
/**
 * View.Logger是日志组件的构造器。
 * ofName({String} name)方法用于获取指定名称对应的日志组件实例，
 * 如果该实例当前并不存在，则自动创建该实例。
 */
var logger = View.Logger.ofName("myLoggerInstance");

logger.debug("hello, world");
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019022415561785.png)
