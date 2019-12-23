---
description: 日志工具类，用于格式化输出信息至控制台。
---

# View.Logger

## static ofName\(\)

> 获取给定名称对应的实例。如果实例尚不存在，则自动创建后返回。

**签名：**

`View.Logger.ofName(name: string): View.Logger` 

**可用版本：**`1.6.2+`

**入参：**

* `name: string` - 实例名称。

**返回：**

已经存在或新创建的实例。

## debug\(\)

> 以 debug 级别输出日志信息。

**签名：**

`loggerInstance.debug(tmpl: string, ...params): View.Logger` 

**可用版本：**`1.6.2+`

**入参：**

* `tmpl: string` - 模板字符串。
* `...params: any` - 填充模板字符串中占位符的数据。

**返回：**

空。

**调用举例：**

```javascript
var logger = View.Logger.ofName("myLogger");

var tmpl = "hello, {}";

// -> '1215 20:32:35 [myLogger]: hello, world'
logger.debug(tmpl, "world");

// -> '1215 20:32:36 [myLogger]: hello, [{"foo":"foo"}]'
logger.debug(tmpl, [{foo: "foo"}]);

// -> '1215 20:34:57 [myLogger]: 1-12, 2-true, 3-{}'
logger.debug("1-{}, 2-{}, 3-\\{}", 12, true, "str");
```

## log\(\)

> 以 info 级别输出日志信息。

**签名：**

`loggerInstance.log(tmpl: string, ...params): View.Logger` 

**可用版本：**`1.6.2+`

**入参：**

* `tmpl: string` - 模板字符串。
* `...params: any` - 填充模板字符串中占位符的数据。

**返回：**

空。

## info\(\)

> 以 info 级别输出日志信息。

**签名：**

`loggerInstance.info(tmpl: string, ...params): View.Logger` 

**可用版本：**`1.6.2+`

**入参：**

* `tmpl: string` - 模板字符串。
* `...params: any` - 填充模板字符串中占位符的数据。

**返回：**

空。

## warn\(\)

> 以 warn 级别输出日志信息。

**签名：**

`loggerInstance.warn(tmpl: string, ...params): View.Logger` 

**可用版本：**`1.6.2+`

**入参：**

* `tmpl: string` - 模板字符串。
* `...params: any` - 填充模板字符串中占位符的数据。

**返回：**

空。

## error\(\)

> 以 error 级别输出日志信息。

**签名：**

`loggerInstance.error(tmpl: string, ...params): View.Logger` 

**可用版本：**`1.6.2+`

**入参：**

* `tmpl: string` - 模板字符串。
* `...params: any` - 填充模板字符串中占位符的数据。

**返回：**

空。



