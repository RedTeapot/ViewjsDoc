---
description: 视图上下文，用于存取数据，避免变量污染。
---

# ViewContext

## has\(\)

> 判断上下文中是否含有给定键名的数据。

**签名：**

`viewContextInstance.has(name: string): boolean` 

**可用版本：**`1.6.2+`

**入参：**

* `name: string` - 数据在上下文中的唯一键名。

**返回：**

`true` - 上下文中含有给定键名的数据。否则 `false`。

## set\(\)

> 向上下文中添加或更新数据。如果给定键名的数据尚不存在，则添加数据，否则覆盖键名对应的既有数据。

**签名：**

`viewContextInstance.set(name: string, value: any): ViewContext` 

**可用版本：**`1.6.2+`

**入参：**

* `name: string` - 数据在上下文中的唯一键名。
* `value: any` - 要设置的数据。

**返回：**

实例本身，以供开发者链式调用API。

## get\(\)

> 从上下文中获取给定键名对应的数据。如果键名在上下文中并不存在，则返回 `undefined`。

**签名：**

`viewContextInstance.get(name: string): any | undefined` 

**可用版本：**`1.6.2+`

**入参：**

* `name: string` - 数据在上下文中的唯一键名。

**返回：**

键名对应的数据。如果数据尚不存在，则返回 `undefined`。

## remove\(\)

> 从上下文中移除给定键名对应的数据，并返回被移除的数据。如果数据尚不存在，则返回 `undefined`。

**签名：**

`viewContextInstance.remove(name: string): any | undefined` 

**可用版本：**`1.6.2+`

**入参：**

* `name: string` - 数据在上下文中的唯一键名。

**返回：**

键名对应的数据。如果数据尚不存在，则返回 `undefined`。

## clear\(\)

> 清空上下文中，移除上下文中的所有数据。

**签名：**

`viewContextInstance.clear(): ViewContext` 

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

实例本身，以供开发者链式调用API。

## listKeys\(\)

> 列举上下文中的所有键名。

**签名：**

`viewContextInstance.listKeys(): string[]` 

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

上下文中所有键名组成的数组。

## size\(\)

> 获取上下文中存放的数据个数。

**签名：**

`viewContextInstance.size(): number` 

**可用版本：**`1.6.2+`

**入参：**

无。

**返回：**

上下文中存放的数据个数。

