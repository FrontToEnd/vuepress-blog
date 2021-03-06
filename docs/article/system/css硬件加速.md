# css硬件加速

近些年，我们总是听到硬件加速，以及它如何帮助我们提升网页的动画性能，让网页动画变得更好，在移动端更流畅。那么什么是硬件加速？如何触发硬件加速呢？

## 定义

`css`大部分样式还是通过`cpu`来计算的，但 `css`中也有一些 `3d`的样式和动画的样式，计算这些样式同样有很多重复且大量的计算任务，可以交给`gpu`来跑。

那么，使用`gpu`来渲染`css`的技术就是硬件加速。

## 触发

浏览器在处理下面的 `css` 的时候，会使用 `gpu` 渲染：

- transform
- opacity
- filter
- will-change

注意的是 `gpu` 硬件加速是需要新建图层的，而把该元素移动到新图层是个耗时操作，同时也会增加内存的使用。因此不能滥用硬件加速。

## 属性详情

CSS`transform`属性允许你旋转，缩放，倾斜或平移给定元素。这是通过修改CSS视觉格式化模型的坐标空间来实现的。

一般来说，可以通过指定以下属性来显示声明使用硬件加速：

```css
transform: rotate3d(0, 0, 0);
```

`opacity`属性指定了一个元素的**不透明度**。

当`opacity`属性的值应用于某个元素上时，是把这个元素（包括它的内容）当成一个**整体**看待，即使这个值没有被子元素继承。因此，一个元素和它包含的子元素都会具有和元素背景相同的透明度，哪怕这个元素和它的子元素有不同的`opacity`属性值。

使用`opacity`属性，当属性值不为1时，会把元素放置在一个新的**层叠上下文**中。

根据属性的定义，可以通过以下方式来显示声明使用硬件加速：

```css
opacity: 0.99;
```

`filter`CSS属性将模糊或颜色偏移等图形效果应用于元素。

最常用的应该是哀悼日时，通过设置`filter: grayscale(100%);`进行全站的灰化。

可以通过以下方式来显示声明使用硬件加速：

```css
filter: opacity(100%);
```

`will-change`提供了一种告知浏览器该元素会有哪些变化的方法，这样浏览器可以在元素属性真正发生变化之前提前做好对应的优化准备工作。

使用该属性**需要注意**：

- 不要将 `will-change` 应用到太多元素上。
- 有节制地使用。
- 不要过早应用 `will-change` 优化。
- 给它足够的工作时间。

如果我们需要使用`opacity`来开启硬件加速，可以这么声明：

```css
will-change: opacity;
opacity: 0.99;
```

## 验证

如果我们指定了上述的属性，接下来如何进行验证是否生效呢？

步骤如下：

1. 打开`Chrome`的开发者工具；
2. 打开`Rendering`面板；
3. 勾选`Layer borders`；

然后会发现页面上出现蓝色和黄色的框。蓝色的是 `cpu` 渲染的，而黄色的是 `gpu` 渲染的。

## 总结

本文总结了触发CSS硬件加速的方式，以及属性的详情介绍。同时还介绍了验证硬件加速是否生效的方法。

最后需要我们注意的是，要有节制的使用硬件加速， 给它足够的工作时间。

## 补充

`CSS` 动画（`Web` 动画同理）优化的第一条准则就是让需要动画的元素生成了自己独立的 `GraphicsLayer`，强制开始 `GPU` 加速。而我们需要知道是，`GPU` 加速的本质是利用让元素生成了自己独立的 `GraphicsLayer`，降低了页面在渲染过程中重绘重排的开销。

生成自己的独立的 `GraphicsLayer` 有以下方式：

- 3D 或透视变换(perspective、transform) CSS 属性
- 使用加速视频解码的
- 拥有 3D (WebGL) 上下文或加速的 2D 上下文的 元素
- 混合插件(如 Flash)
- 对自己的 opacity 做 CSS 动画或使用一个动画变换的元素
- 拥有加速 CSS 过滤器的元素
- 元素有一个包含复合层的后代节点(换句话说，就是一个元素拥有一个子元素，该子元素在自己的层里)
- 元素有一个 z-index 较低且包含一个复合层的兄弟元素(换句话说就是该元素在复合层上面渲染)
