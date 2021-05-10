# 云析培训

## 介绍

云析是天网的可视化分析模块，技术栈采用了`WebGL + Canvas + pixiJS + WebAssembly`。本质就是基于实体与链接进行上图，生成可以进行分析操作的有向图。
云析仓库位于`tieshangongzhu`，依赖`shuiliandong`，是整个云析的核心仓库。

### 注意事项

由于云析已拆分为独立的仓库，因此在本地开发的过程中需要本地启动nginx模拟开发环境登录。目的是将云析需要的ELP和权限相关配置存储在本地，否则云析启动会报错。

### ELP

ELP包括entity、link、property。
前端存储于`localStorage`下的`globalElpModel`。

## 组成

云析的入口页面位于`analyticGraph.vue`。与业务相关的逻辑基本都在该页面。
初始化的总入口是`initMountedHandle`。该方法做了以下几件事：

1. 初始化了PixiRenderer，以及监听一系列的事件。
2. 调用loadGraphData，该方法会从后端加载图表，如果失败则前端创建临时图表，核心是调用了Chart。
3. 绑定一系列的快捷键。

### PixiRenderer

基于pixiJS，提供操作实体和链接的API，并做了以下几件事：

1. 监听`Graph`上的`changed`事件，并执行`onGraphChanged`回调函数，该方法内部对实体和链接做了增删改的操作。
2. 实现了`animationLoop`方法，`animationLoop`方法是建立在rAF（requestAnimationFrame）上的，实现了浏览器每次刷新的时候会执行内部的代码：

> * `animationLoop`内部包含了部分优化处理逻辑，以及真正的渲染操作核心是`this.renderer.render(this.stage)`，这段代码的本质就是将stage（pixijs中的顶层容器对象）作为渲染参数来渲染到页面；
> * 除了上面的`render`函数，其余所有文件的操作其实都是在操作对象，把`stage`容器中的自对象按正确的逻辑进行处理，不涉及到任何渲染；

### Chart

在Chart.js中，根据不同的条件创建不同的Graph（OriginGraph.js, RemoteGraph.js, FinalGraph.js），这三个都是都是`Graph`的子类，同时继承了`EventEmitter`类。意味着不同的图层实现了观察者模式，可以监听到指定的事件。

`Chart初始化`与调用`execute`时的操作:
![execute](https://img-node.oss-cn-shanghai.aliyuncs.com/images/execute.png)

以添加数据的方法`addSubGraph`为例，上图左侧是Chart代码初始化时调用栈的顺序，右侧是调用`execute`
时的顺序。当代码执行`this.chart.execute('addSubGraph')`时，流程如下：

1. 执行`Chart`里的`execute`方法，然后执行`this.commandManager.execute('addSubGraph')`。
2. 执行`CommandManager`里的`execute`方法，经过查找会执行`this.graphForRender.execute('addSubGraph')`。
3. `this.graphForRender` 实质是`Chart`里返回的`this.finalGraph`，按照上图左侧的调用栈顺序执行，最终会执行`OriginalGraph`里的`addSubGraph`方法。
4. 触发`Graph`的`this.emit('changed')`事件，由于在`pixiRenderer`监听了`changed`事件，因此会触发刚才提到的`onGraphChanged`回调函数，执行对实体链接的增删改操作。

## 优化

目前的云析有着较大的性能瓶颈，上图过多就会导致页面崩溃。目前已经在原有的基础上优化了一部分，但是尚未合到经侦版本当中。后续计划调研原生webGL上图能力，看看是否可以达到要求。
