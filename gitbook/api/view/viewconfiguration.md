---
description: 视图配置 - 单个配置项。
---

# ViewConfiguration

## getName\(\)

> 获取配置项的名称。

**签名：**

`viewConfigInstance.getName(): string` 

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

配置项名称。

## getValue\(\)

> 获取配置项的取值。

**签名：**

`viewConfigInstance.getValue(dftValue?: any): any | undefined` 

**可用版本：**`1.6.2+`

**入参：**

* `dftValue?: any` - 配置项没有赋值时，将要使用的默认值。

**返回：**

配置项取值。如果配置项尚未赋值，且没有提供默认值，则返回 `undefined`，否则返回方法中指定的默认值。

## setValue\(\)

> 设置配置项的取值。

**签名：**

`viewConfigInstance.setValue(value: any, ifOverride?: boolean): ViewConfiguration` 

**可用版本：**`1.6.2+`

**入参：**

* `value: any` - 配置项取值。
* `ifOverride: boolean` - 如果配置项已经被赋值，是否覆盖既有取值。默认为：`false`。

**返回：**

实例本身，以供开发者链式调用。

## getApplication\(\)

> 获取设置的配置项的应用动作（通过 `apply()` 方法应用配置时所执行的动作）。

**签名：**

`viewConfigInstance.getApplication():` [`ViewConfigurationApplication` ](viewconfigurationapplication.md)`| undefined` 

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

设置的应用动作。如果没有设置，则返回 `undefined`。

## apply\(\)

> 应用配置，执行通过 `setApplication()` 方法设置的应用动作。

**签名：**

`viewConfigInstance.apply(): ViewConfiguration` 

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

实例本身，以供开发者链式调用。

{% hint style="info" %}
即使没有设置过应用动作，调用方法也不会报错，只是什么也不会发生。
{% endhint %}

## reflectToDom\(\)

> 将配置反映到 DOM 中，以借助 CSS 响应配置，如：显示/隐藏元素等。此时，视图的 DOM 骨架上将会创建属性：`data-viewconfig_name=value` ，并赋值为配置项取值的字符串表达。其中 `name` 为配置项的名称。

**签名：**

`viewConfigInstance.reflectToDom(): ViewConfiguration` 

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

实例本身，以供开发者链式调用。

