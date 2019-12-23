---
description: 视图布局初始化控制选项
---

# ViewLayoutInitOptions

## 可选选项

* `autoReLayoutWhenResize: boolean` 当布局空间发生变化时，是否自动重新布局。 默认值：`true`。
* `layoutAsMobilePortrait: Function` 当使用 移动设备 在 竖屏模式 下浏览应用时，需要执行的场景化布局动作。 默认动作：视图容器的宽度赋值为浏览器宽度，高度赋值为浏览器高度。
* `layoutAsMobileLandscape: Function` 当使用 移动设备 在 横屏模式 下浏览应用时，需要执行的场景化布局动作。 默认动作：视图容器的宽度赋值为浏览器宽度，高度赋值为浏览器高度。
* `layoutAsTabletPortrait: Function` 当使用 平板设备 在 竖屏模式 下浏览应用时，需要执行的场景化布局动作。 默认动作：视图容器的宽度赋值为浏览器宽度，高度赋值为浏览器高度。
* `layoutAsTabletLandscape: Function` 当使用 平板设备 在 横屏模式 下浏览应用时，需要执行的场景化布局动作。 默认动作：视图容器的宽度赋值为浏览器宽度，高度赋值为浏览器高度。
* `layoutAsPcPortrait: Function` 当使用 PC设备 在 类竖屏模式（窗口宽度小于等于高度）下浏览应用时，需要执行的场景化布局动作。 默认动作：视图容器的宽度赋值为浏览器宽度，高度赋值为浏览器高度。
* `layoutAsPcLandscape: Function` 当使用 PC设备 在 类横屏模式（窗口宽度大于高度）下浏览应用时，需要执行的场景化布局动作。 默认动作：视图容器的高度赋值为浏览器高度，宽度赋值为 `高度 / 宽高比`，其中 `宽高比` 通过 `View.layout.setExpectedWidthHeightRatio()`  设置。默认宽高比为 `320 / 568`。

