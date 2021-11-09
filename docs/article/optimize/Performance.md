# 性能优化指标

日常工作中，我们常常会对现有的项目进行优化，但需要我们考虑的是，优化都有哪些切入点，优化的指标是什么，我们需要关注哪些值得优化的地方？

这里就来总结一下当对项目进行性能优化时，我们需要怎么做。

## 常用的性能指标

常用的性能指标包括以下几个，下面来详细介绍。以下的性能指标的详细介绍可以通过[web.dev](https://web.dev/vitals/)查看。

- First Paint
- First Contentful Paint
- Largest Contentful Paint
- First Meaningful Paint
- First Input Delay
- Cumulative Layout Shift
- Time to Interactive
- DOMContentLoaded
- Load

### First Paint(FP) 首次绘制

首次渲染的时间点，可以视为白屏时间，比如完成背景色渲染的时间点。通常作为时间点最早的一个性能指标。

### First Contentful Paint(FCP) 首次内容绘制

首次有内容渲染的时间点，指标测量页面从开始加载到页面内容的任何部分在屏幕上完成渲染的时间。对于该指标，"内容"指的是文本、图像、`<svg>`元素或非白色的`<canvas>`元素。可以作为首屏时间。

一般来说，FCP的耗时要比FP的大，因为渲染内容需要耗费时间。

### Largest Contentful Paint (LCP) 最大内容绘制

最大内容绘制 (LCP) 指标会根据页面首次开始加载的时间点来报告可视区域内可见的最大图像或文本块完成渲染的相对时间。为了提供良好的用户体验，网站应该努力将最大内容绘制控制在**2.5** 秒或以内。

也就是说，LCP指标来说明页面上最核心的元素加载出来需要耗费的时间，这个时间最好不要超过**2.5**秒。

### First Meaningful Paint(FMP) 首次有效绘制

首次绘制有意义内容的时间。业界比较认可的方式是在加载和渲染过程中最大布局变动之后的那个绘制时间即为当前页面的 FMP。因为它计算相对复杂，且存在准确性等问题，Lighthouse 6.0 中被废弃。

### First Input Delay(FID) 首次输入延迟

首次输入延迟，测量交互性。为了提供良好的用户体验，页面的 `FID` 应为`100` 毫秒或更短。

`FID` 测量从用户第一次与页面交互（例如当他们单击链接、点按按钮或使用由 `JavaScript` 驱动的自定义控件）直到浏览器对交互作出响应，并实际能够开始处理事件处理程序所经过的时间。

一般来说，发生输入延迟（又称输入延时）是因为浏览器的主线程正忙着执行其他工作，所以（还）不能响应用户。可能导致这种情况发生的一种常见原因是浏览器正忙于解析和执行由您的应用程序加载的大型 JavaScript 文件。在此过程中，浏览器不能运行任何事件侦听器，因为正在加载的 JavaScript 可能会让浏览器去执行其他工作。

### Cumulative Layout Shift(CLS) 累积布局偏移

累积布局偏移，测量视觉稳定性。为了提供良好的用户体验，页面的 `CLS` 应保持在 `0.1`或更少。

`CLS` 测量整个页面生命周期内发生的所有意外布局偏移中最大一连串的布局偏移分数。

每当一个可见元素的位置从一个已渲染帧变更到下一个已渲染帧时，就发生了布局偏移。

### Time to Interactive(TTI) 可交互时间

TTI 指标测量页面从开始加载到主要子资源完成渲染，并能够快速、可靠地响应用户输入所需的时间。

### DOMContentLoaded(DCL)

DOM 加载完成即触发，不用等页面资源加载。

### Load(L)

页面及其依赖的资源全部加载完成的时间，包括所有的资源文件，如样式表和图片等。

## 性能名词

### Lab Data / SYN

`SYN` 即 `synthetic monitoring`，收集形式也有叫 `in the lab`

`Lab Data` 是在可控的条件下，特定的机型，特定的网络环境，收集的性能数据。一个使用场景是，新页面开发的时候，页面发布到生产环境中之前，是没办法基于真实用户做性能指标测量的，此时，想了解也没性能情况，可以通过 `Lab` 方式收集和检查。

### Field Data / RUM

`RUM` 即 `Real User Monitoring`，收集形式也有叫 `in the Filed`

`Lab` 的方式测量虽然能反应性能情况，但是真实用户因机型和网络情况各异，页面加载对于不同用户具有很大的不确定性，`Lab` 数据并不一定是真实用户的实际情况。而 `filed` 数据很好的解决了这个问题，有一定的代码侵入性，记录真实用户的性能数据，通过 `RUM` 数据可以发现一些 `Lab` 数据下很难暴露出来的性能异常。

### RAIL Model

- **R**: response
- **A**: animation
- **I**: idle
- **L**: load

`RAIL` 是 `Google` 提出的以用户为中心的一套性能模型，从各个维度反应一个网站的性能情况，同时提供一组性能目标供参考

- **Response**: 50ms 内对事件做出响应
- **Animation**: 动画 10 ms 内生成内一帧（每帧耗时 16ms，用户会感到动画流畅）
- **Idle**: 最大化的利用空闲时间
- **Load**: 在 5s 内完成内容传输并达到用户可交互

## 性能指标采集方法

具体的采集方法和优化策略可以查看[Web Vitals](https://web.dev/learn-web-vitals/)