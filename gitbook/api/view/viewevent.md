---
description: 事件
---

# ViewEvent

## 公共属性

* `type: string` - 事件类型（亦即，事件名称），例如：`enter` - 视图进入
* `timestamp: string` - 事件触发时间的时间戳
* `data: any`- 事件关联数据

## 宏观 beforechange 事件

**事件含义**

活动视图即将切换。

**发生对象**

`window.view`

**触发方式**

同步触发。

**关联数据**

\`\`[`ViewSwitchEventData`]()\`\`

## 宏观 change 事件

**事件含义**

活动视图正在切换。

**发生对象**

`window.view`

**触发方式**

同步触发。

**关联数据**

\`\`[`ViewSwitchEventData`]()\`\`

## 宏观 afterchange 事件

**事件含义**

活动视图切换完成。

**发生对象**

`window.view`

**触发方式**

异步触发。

**关联数据**

\`\`[`ViewSwitchEventData`]()

## 实例 beforeenter 事件

**事件含义**

视图即将进入。

**发生对象**

视图实例。

**触发方式**

同步触发。

**关联数据**

\`\`[`ViewInstanceEnterEventData`]()\`\`

## 实例 ready 事件

**事件含义**

视图就绪（第一次进入时触发）。

**发生对象**

视图实例。

**触发方式**

同步触发。

**关联数据**

\`\`[`ViewInstanceEnterEventData`]()\`\`

## 实例 enter 事件

**事件含义**

视图进入。

**发生对象**

视图实例。

**触发方式**

同步触发。

**关联数据**

\`\`[`ViewInstanceEnterEventData`]()\`\`

## 实例 afterenter 事件

**事件含义**

视图进入完成。

**发生对象**

视图实例。

**触发方式**

同步触发。

**关联数据**

\`\`[`ViewInstanceEnterEventData`]()\`\`

## 实例 leave 事件

**事件含义**

视图离开。

**发生对象**

视图实例。

**触发方式**

异步触发。

**关联数据**

\`\`[`ViewInstanceLeaveEventData`]()\`\`

