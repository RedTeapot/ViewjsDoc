---
description: 视图跳转信息
---

# ViewSwitchInfo

## 属性

* `srcElement: HTMLElement | null` - 源视图的 DOM 骨架。如果视图是直接访问进入的，则为 `null`
* `targetElement: HTMLElement` - 目标视图的 DOM 骨架
* `type:` [`ViewSwitchType`](viewswitchtype.md) - 视图跳转的方式
* `trigger:` [`ViewSwitchTrigger`](viewswtichtrigger.md) - 视图跳转的触发来源
* `render: Function` - 界面渲染动作

{% hint style="warning" %}
界面渲染动作，由 View.js 提供，包含了活动视图的切换和关联事件的触发等，开发者需要根据动画的播放效果，在恰当的时机，例如：动画播放完毕后，执行该方法。
{% endhint %}

