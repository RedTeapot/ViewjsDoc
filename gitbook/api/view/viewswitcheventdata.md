---
description: 视图跳转事件关联的数据
---

# ViewSwitchEventData

## 属性

* ~~`currentView: View | null`~~ 离开的视图。已废弃，建议使用 `sourceView`
* `sourceView: View | null` - 离开的视图
* `type:` [`ViewSwitchType`](viewswitchtype.md) - 视图跳转的方式
* `trigger:` [`ViewSwitchTrigger`](viewswtichtrigger.md) - 视图跳转的触发来源
* `params: Object | null` - 视图跳转携带的视图参数
* `options: Object | null` - 视图跳转携带的视图选项



