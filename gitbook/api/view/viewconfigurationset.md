---
description: 视图配置 - 配置项集合。
---

# ViewConfigurationSet

## has\(\)

> 判断配置集合中是否含有给定名称的配置项。

**签名：**

`viewConfigSetInstance.has(name: string): boolean` 

**可用版本：**`1.6.2+`

**入参：**

* `name` - 配置项名称。

**返回：**

`true` - 集合含有给定名称的配置项。否则 `false`。

## get\(\)

> 获取给定名称对应的配置项实例。如果实例尚不存在，则自动创建后返回。

**签名：**

`viewConfigSetInstance.get(name: string):` [`ViewConfiguration`](viewconfiguration.md) 

**可用版本：**`1.6.2+`

**入参：**

* `name` - 配置项名称。

**返回：**

已经存在或新创建的配置项实例。

## applyAll\(\)

> 应用集合中的所有配置（执行所有配置项的应用动作）。

**签名：**

`viewConfigSetInstance.applyAll(): ViewConfigurationSet` 

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

实例本身，以供开发者链式调用。

{% hint style="info" %}
应用动作将以异步方式进行。
{% endhint %}

## listAll\(\)

> 列举集合中的所有配置项名称。

**签名：**

`viewConfigSetInstance.listAll(): string[]` 

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

所有配置项名称组成的数组。

