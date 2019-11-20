# 视图配置

## 概述

视图配置，是存放在视图实例上的，用于供开发者检索、配置，以指导视图脚本工作模式、表现形态的工具。

借助视图配置，开发者可以将视图开发为多种形态的综合体，尽可能地提高代码复用度。

> 在相当一部分场景下，尤其是对于软件开发公司，以配置的方式满足不同客户的多样化诉求，会极大地降低维护成本，帮助开发人员规避 “代码存在多份硬拷贝” 的窘境，辅助企业不断实现产出的有效积累。

## 创建配置

开发者可以通过配置的获取方法自动创建一个原来不存在的配置，例如：

{% tabs %}
{% tab title="config.js" %}
```javascript
var view = View.ofId("myView");

/**
 * 每个视图实例上均有 "config" 属性，以供开发者获取视图配置句柄。
 *
 * 获取 key 为 "config-item" 的配置项。
 * 如果配置项并不存在，则 get 方法会在调用时将其自动创建出来。
 */
var config = view.config.get("config-item");

/**
 * 应用配置
 * 因为此时并没有提供应用逻辑，所以什么也不会发生。但也不会报错。
 */
config.apply();

/**
 * 通过API： setApplication(application: Function) 设置应用逻辑
 */
config.setApplication(function(value){
    console.log("Applying config: 'config-item' = " + value);
});

/**
 * 通过API：setValue(value: any) 设置配置项取值，并应用配置值
 */
config.setValue([666, "str"]);
config.apply(); // -> Applying config: 'config-item' = [666, "str"]
```
{% endtab %}
{% endtabs %}

## 应用配置

因为每个配置项的工作逻辑可能并不相同，所以应用配置前，开发者需要提供配置的应用逻辑，告诉 View.js 在应用配置时要执行的方法，例如：

```javascript
var view = View.ofId("myView");

var configItem = view.config.get("config-item");

/**
 * 应用配置
 * 因为此时并没有提供应用逻辑，所以什么也不会发生。但也不会报错。
 */
configItem.apply();

/**
 * 通过API： setApplication(application: Function) 设置应用逻辑
 */
configItem.setApplication(function(value){
    console.log("Applying config: 'config-item' = " + value);
});

/**
 * 通过API：setValue(value: any) 设置配置项取值，并应用配置值
 */
configItem.setValue([666, "str"]);
configItem.apply(); // -> Applying config: 'config-item' = [666, "str"]
```

除了 `apply()` 方法外，每个配置项还有 `reflectToDom()` 方法，用于样式使能的配置逻辑。

`reflectToDom()` 方法在调用时，View.js 将在视图的 DOM 元素上设置属性：`data-viewconfig_xx=yy` 。其中 `xx` 为配置项的key，`yy` 为配置项的取值。对应地，开发者需要据此撰写对应配置项取值的 css，否则方法调用并不会产生任何实质上的变化。

例如：

{% tabs %}
{% tab title="config.js" %}
```javascript
var view = View.ofId("myView");

/* 配置项：是否呈现 header */
view.config.get("if-show-header").setValue("false").reflecToDom();

/* 视图关联的DOM元素 */
var viewObj = view.getDomElement();
console.log(viewObj.getAttribute("data-viewconfig_if-show-header")); // -> "false"
```
{% endtab %}

{% tab title="view.scss" %}
```css
[data-view-id=myView]{
    /* 隐藏 header */
    &[data-viewconfig_if-show-header=false]{
        header{
            display: none;
        }
    }
}
```
{% endtab %}
{% endtabs %}

## 响应配置

上述的两种配置使用方式并不能满足开发者的所有需求。开发者可以只使用视图配置存放配置取值，然后在脚本中自定义使能逻辑。

例如，对于需求：

> 注册界面的密码长度，软件定制客户A要求在6-20位，软件定制客户B要求在4-10位。

可以使用如下代码实现：

{% tabs %}
{% tab title="视图脚本" %}
```javascript
var view = View.ofId("register");

/* 默认配置：密码最少位数 */
view.config.get("password-min-length").setValue(10);

/* 默认配置：密码最多位数 */
view.config.get("password-max-length").setValue(20);

/* 注册提交 */
view.find(".submit").addEventListener("click", function(){
    var pwd = pwdObj.value.trim();

    var minLen = view.config.get("password-min-length").getValue(),
        maxLen = view.config.get("password-max-length").getValue();

    if(pwd.length < min){
        alert("密码长度不能少于" + minLen + "位");
        return;
    }

    if(pwd.length > max){
        alert("密码长度不能多于" + maxLen + "位");
        return;
    }
});
```
{% endtab %}

{% tab title="客户A的配置" %}
```javascript
var view = View.ofId("register");

/* 重载既有配置：密码最少位数 */
/* 第二个参数用于复写可能已经存在的值，如果不传且已经有值，则赋值无效，相当于什么也没做 */
view.config.get("password-min-length").setValue(6, true);

/* 重载默认配置：密码最多位数 */
view.config.get("password-max-length").setValue(20, true);
```
{% endtab %}

{% tab title="客户B的配置" %}
```javascript
var view = View.ofId("register");

/* 重载既有配置：密码最少位数 */
/* 第二个参数用于复写可能已经存在的值，如果不传且已经有值，则赋值无效，相当于什么也没做 */
view.config.get("password-min-length").setValue(4, true);

/* 重载默认配置：密码最多位数 */
view.config.get("password-max-length").setValue(10, true);
```
{% endtab %}
{% endtabs %}

