# 使用 Sentry 平台处理客户端异常日志

## 介绍

引用官方的描述，`Sentry` 的应用程序监视平台可为每位开发人员提供帮助诊断，修复和优化其代码的性能。

## 注册

首先进入[注册页面](https://sentry.io/signup/)注册一个账号，Email最好填公司的邮箱，方便接收告警信息。

注册成功后，选择`JavaScript` 语言，点击`Create Project` 。

## 引入

集成地址：[Sentry](https://docs.sentry.io/platforms/javascript/)

要将`Sentry` 与`Vue` 应用程序一起使用，需要使用Sentry的浏览器`JavaScript SDK` :`@sentry/browser` 。该`SDK` 将报告应用程序触发的任何未捕获的异常。

我们首先在项目中进行安装：

```javascript
npm install @sentry/browser
```

此外，`Vue` 集成将捕获引发错误的活动组件的名称和道具状态。这是通过Vue的`config.errorHandler` 钩子报告的。

Sentry 5.X版本的Vue集成位于`@sentry/integrations` ，下面来安装：

```javascript
npm install @sentry/integrations
```

然后在项目的入口文件内引入：

```javascript
import Vue from "vue";
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";


Sentry.init({
  dsn: "https://c9bee4513d4f44beb9a9603f8bfd7ba3@o437037.ingest.sentry.io/5399023",
  integrations: [new VueIntegration({ Vue, attachProps: true, logErrors: true })],
});
```

注意：`init` 方法里的`dsn` 是根据注册信息来生成的，无法公用。

在传递参数方面，`attachProps` 是可选的，默认为`true` 。如果设置为`false` ，`Sentry` 将禁止发送所有 `Vue` 组件的`props` 进行记录。`logErrors` 也是可选的，默认为`false` 。如果设置为`true` ，`Sentry` 将调用`Vue` 的`logError` 函数。如果不声明，这就意味着在Vue渲染器中发生的错误不会打印在控制台上，所以这里我们显式声明该参数。

到此，已经为项目成功引入了`Sentry` 。

## 配置

当引入完成后，启动项目，再回到刚才注册成功的页面，会有一个`Take me to my event` 的入口，点击进入就可以看到日常日志输出到控制台。

这里我创建了一个叫做`zqykj` 的监控项目，这里是[监控地址](https://sentry.io/organizations/zqykj/projects/)。主页如下所示：

![sentry](http://img-node.oss-cn-shanghai.aliyuncs.com/images/sentry.png)

如果需要在有新的错误信息的时候，想要及时获悉，需要配置一下告警规则。点击左侧的`Alerts` ，然后点击页面右上方的`Create Alert Rule` ，添加最基本的警告规则，这里选择第一条规则`An event is seen` 。然后选择发送邮件的对象，默认是发送给自己，也可以选择团队。速率限制选择5分钟，然后填入一个规则名称，最后保存。规则如图所示：

![sentryRule](http://img-node.oss-cn-shanghai.aliyuncs.com/images/sentryRule.png)

## 总结

`Sentry` 的引入可以很方便的监听到一些错误信息，可以清晰的看到错误信息的来源，包括浏览器信息、操作系统、出错的URL地址，以及栈信息。相信此工具可以极大的提高我们开发人员定位bug的效率。

最后，我们也可以选择将此工具配置到公司内网，Github地址为：[https://github.com/getsentry/onpremise](https://github.com/getsentry/onpremise) ，这部分超出了前端的范畴，在此不做记录。
