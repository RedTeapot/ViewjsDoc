# 日志输出

为辅助开发者更清晰地排查问题，View.js 为每个视图实例内置了格式化日志输出组件，开发者可以通过 `logger` 句柄直接使用。例如：

{% tabs %}
{% tab title="init.js" %}
```javascript
var view = View.ofId("myView");

// 1124 21:28:17 [View#myView]: debug
view.logger.debug("debug");

// 1124 21:28:29 [View#myView]: hello, wo
// 第一个参数为消息模板，其中 '{}' 为占位符，
// 按从左到右的顺序分别对应第二个开始的填充数rld
view.logger.info("hello, {}", "world");

// 1124 21:28:41 [View#myView]: data: {a: 1}, time: 12:21
view.logger.warn("data: {}, time: {}", {a: 1}, "12:21");

// 可以使用 '\' 输出 '{}'
// 1124 21:28:43 [View#myView]: error: {}
view.logger.error("error: \\{}");
```
{% endtab %}
{% endtabs %}

View.js 共支持 5 种级别的日志输出（级别从低到高）：

1. `debug`
2. `log`
3. `info`
4. `warn`
5. `error`

开发者可以根据消息的重要性分别调用不同的方法。

无论是哪种日志级别，其输出的消息结构是相同的，均包括：

1. 月、日、时、分、秒组合成的时间信息
2. 日志实例名称，由字符："\[" 和 "\]" 包裹
3. 消息模板。亦即方法的第一个参数
4. 填充参数。第二个及后续的不定长参数，对应于消息模板中的占位符："{}"



除视图实例内置的日志实例句柄外，开发者也可以手动创建新的实例：

{% tabs %}
{% tab title="init.js" %}
```javascript
var logger = View.Logger.ofName("myLogger");

// 1124 21:29:31 [myLogger]: hello, world!
logger.debug("hello, world!");

/**
 * 如果相同名称的实例已经存在，
 * Logger.ofName(name: string) 将返回已经存在的实例。
 * 如果实例尚不存在，则使用给定的名称自动创建一个。
 */
var logger2 = View.Logger.ofName("myLogger");
console.log(logger1 === logger2); // -> true
```
{% endtab %}
{% endtabs %}

