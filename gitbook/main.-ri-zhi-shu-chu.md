# 日志输出

为辅助开发者更清晰地排查问题，View.js 为每个视图实例内置了格式化日志输出组件，开发者可以通过 `logger` 句柄直接使用。例如：

{% tabs %}
{% tab title="init.js" %}
```javascript
var view = View.ofId("myView");

// 1124 21:28:17 [View#myView]: debug
view.logger.debug("debug");

// 1124 21:28:29 [View#myView]: hello, world
view.logger.info("hello, {}", "world");

// 1124 21:28:41 [View#myView]: data: {a: 1}
view.logger.warn("data: {}", {a: 1});

// 1124 21:28:43 [View#myView]: error: {}
view.logger.error("error: \\{}");
```
{% endtab %}
{% endtabs %}

View.js 共支持如下 5 种级别的日志输出（级别从低到高）：

1. debug
2. log
3. info
4. warn
5. error

如上图所示，输出内容包括：

1. 月、日、时、分、秒组合成的时间信息
2. 日志实例名称，由字符："\[" 和 "\]" 包裹
3. 消息模板。亦即方法的第一个参数
4. 填充参数。第二个及后续的不定长参数，对应于消息模板中的占位符："{}"

   日志组件同样支持开发者脱离视图独立使用，如下所示：

   \`\`\`js /\*\*

5. View.Logger是日志组件的构造器。
6. ofName\({String} name\)方法用于获取指定名称对应的日志组件实例，
7. 如果该实例当前并不存在，则自动创建该实例。

   \*/

   var logger = View.Logger.ofName\("myLoggerInstance"\);

logger.debug\("hello, world"\);

\`\`\` ![&#x5728;&#x8FD9;&#x91CC;&#x63D2;&#x5165;&#x56FE;&#x7247;&#x63CF;&#x8FF0;](https://img-blog.csdnimg.cn/2019022415561785.png)

