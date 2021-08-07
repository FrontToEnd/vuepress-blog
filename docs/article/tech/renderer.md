# 云析上图流程汇总

## 流程总览

![云析流程](https://img-node.oss-cn-shanghai.aliyuncs.com/images/Sequence.png)

### Chart.js

首先，云析模块的主页面位于`tieshangongzhu`仓库的`analyticGraph.vue`文件，当打开云析页面时，会调用`Chart.js`的`createTemporaryChart`静态方法用来新建一个临时图表，其中接收8个参数，具体含义如下：

![Chart](https://img-node.oss-cn-shanghai.aliyuncs.com/images/Chart.png)

在执行上述类的静态方法的同时，内部执行了`Chart`的构造函数以及`ChartMetadata`构造函数。`ChartMetadata`类是用来存储一些元信息，可通过`Chart`的实例对象调用`getChartMetadata()`方法来获取这些元信息。
`Chart`类接收4个参数，具体含义如下：

![newChart](https://img-node.oss-cn-shanghai.aliyuncs.com/images/newChart.png)

在实例化`Chart`的时候，会创建空的各个图层，首先创建`OriginalGraph`，然后根据`ChartMetadata`里存储的是否进行叶子结点合并以及是否进行链接合并，来决定是否创建`EntityMergingGraph`和`LinkMergingGraph`。最后创建`FinalGraph`并将上述实例化对象传入。
然后，`Chart`内部会实例化`CommandManager`，该类用来记录管理前进后退操作，默认最多记录5条。

此外，在`Chart`、`OriginalGraph`、`EntityMergingGraph`、`LinkMergingGraph`、`FinalGraph`以及`CommandManager`里都存在着`execute`方法，如果在当前类里找不到相应的方法，那么就会去传入的参数里面找，可以把`Chart`创建各个图层理解为入栈操作，最先入栈的是`OriginalGraph`，最后入栈的是`CommandManager`。把执行`execute`理解为出栈操作，因此最先执行到`CommandManager`,最后执行`OriginalGraph`。

下图演示了`Chart`初始化与调用`execute`时的操作：
![execute](https://img-node.oss-cn-shanghai.aliyuncs.com/images/execute.png)

### CommandManager.js

`CommandManager`类接收一个参数，`Chart`的上下文`this`，可以更方便的操作`Chart`。主要是用来记录前进与撤销操作，默认可以记录的操作有：

* addSubGraph/removeSubGraph：添加与删除子图操作；
* hideSubGraph/showAll：隐藏与展示子图操作；
* setLayoutType：布局操作；
* fullLinkMerge/linkUnmerge：链接合并与取消合并操作；
* linkEliminate：链接消元操作；
* setEntityBorder：设置实体边框操作；
* setEntityScale：设置实体缩放操作；
* setLinkColor：设置链接颜色操作；
* setLinkWidth：设置链接宽度操作；
* clearStyle：清空上述四种样式操作；
* lock：设置实体锁定状态操作；
* unLock：设置实体解锁状态操作；

### Graph.js

该类继承自`EventEmitter`,可以实现事件监听。内部实现了对实体与链接的增删改查、显示隐藏、设置属性等等操作，同时存储了`elpData`。所有图层的事件都会经过该类进行触发，然后由该类里的方法修改最终生成的实体与链接。

### FinalGraph.js

`FinalGraph`类继承自基类`Graph`，并接收一个参数，该参数可以是`OriginalGraph`、`EntityMergingGraph`、`LinkMergingGraph`，传入什么参数取决于是否进行叶子结点合并以及是否进行链接合并。具体来说，如果`needLinkMerge`为`true`，则传入`LinkMergingGraph`的实例对象，如果`needEntityMerge`为`true`，则传入`EntityMergingGraph`的实例对象，都为`false`则传入`OriginalGraph`的实例对象。

在该类中，主要操作包括监听了由`Graph`emit出的`changed`事件，执行对实体与链接的增删改查、显示隐藏、设置属性等等操作。中转了`elp-changed`、`collection-add`、`collection-remove`等事件到`Chart`中。将大部分对图数据的操作包裹为`Promise`，方便进行异步调用。

### LinkMergingGraph.js

`LinkMergingGraph`类继承自基类`Graph`，并接收三个参数，具体参数含义如下：
![LinkMergingGraph](https://img-node.oss-cn-shanghai.aliyuncs.com/images/LinkMergingGraph.png)
在该类中，主要操作包括链接合并规则的设置与读取、链接样式的设置、链接合并与取消合并，同样也监听了由`Graph`emit出的事件，对链接进行增删改查，但是最终都是调用基类`Graph`的方法，将数据存储在`Graph`里。

### EntityMergingGraph.js

`EntityMergingGraph`类继承自基类`Graph`，并接收两个参数，具体含义如下：
![EntityMergingGraph](https://img-node.oss-cn-shanghai.aliyuncs.com/images/EntityMergingGraph.png)
该类的作用与`LinkMergingGraph`的作用类似。

### OriginalGraph.js

`OriginalGraph`类继承自基类`Graph`，并接收三个参数，具体含义如下：
![OriginalGraph](https://img-node.oss-cn-shanghai.aliyuncs.com/images/OriginalGraph.png)
在该类中，会执行添加、删除、隐藏、展示子图的操作，以及设置实体与链接的样式。

## 图层总结

经过上面的概述可以发现，对实体链接的许多操作在很多图层里同时存在，那么真实调用的顺序是怎么样的？以全部显示`showAll`方法为例：
首先分为两个阶段，分别是图层初始化阶段与方法调用阶段。
![initRender](https://img-node.oss-cn-shanghai.aliyuncs.com/images/initRender.png)

可以看到，在第二步与第三步的时候，都监听了`graph`实例对象的`changed`事件。而在`Graph.js`中，会监听`FinalGraph`实例上的`changed`方法，同时触发回调函数，在回调函数内会广播`graph`实例上的`changed`事件，所有监听了`graph`实例对象`changed`事件的地方都会响应。

在代码执行阶段，首先在`analyticGraph.vue`里会调用`this.chart.execute('showAll')`,然后会经由`CommandManager`、`FinalGraph`、`OriginalGraph`，在`OriginalGraph`里触发`showAll`，在`Graph.js`里去执行`showLink`方法。接下来广播`changed`事件，在`FinalGraph`里会捕获该事件并广播`changed`事件。由上图第五步可知，渲染层的`Graph.js`会去监听`FinalGraph`实例上`changed`事件，因此最终会触发第二、三步里的回调，执行`onGraphChanged`事件，进行`webGL`的渲染。

### 两个Graph的区别

注意这里跟`Chart`打交道的`Graph`与渲染使用的`Graph`是两个不同的文件，与`Chart`相关的`Graph`主要是存储实体与链接并对其进行操作，与渲染相关的`Graph`主要是监听事件，并通知到各个图层去执行具体的方法。

## 上图时间分析

### 页面初始化

首先，云析页面初始化的时候，WebGL已初始化完毕，包括`NodeContainer`和`LinkContainer`已经把实体和链接所需的纹理与顶点缓存至`pixiRenderer`当中，使用的是`pixi`提供的`pixi-gl-core`库。初始化webGL的时间在100ms左右。

### 上图中

然后在上图的过程中，以1w实体，2w链接为例，整体的时间为4s。其中耗时较多的执行方法包括，

1. `OriginalGraph`里的添加子图方法`addSubGraph`耗时160ms
2. `ForceLayoutInNGraph.js`里监听`graph`变化的回调函数`onGraphChanged`耗时146ms
3. `ForceLayoutInNGraph.js`里与默认布局有关的方法`step`耗时312ms
4. `pixiRenderer.js`里的`onGraphChanged`函数耗时2.2s
5. `pixi.js`里内置的渲染webGL的方法`WebGLRenderer.js`耗时848ms
6. 云析UI页面`analyticGraph.vue`里监听graph变化的函数`graphChangeListener`耗时150ms

优化方向：
> 1、优化默认布局相关代码，缩减2、3的耗时；
> 2、`pixiRenderer.js`里的`onGraphChanged`占总耗时的一半以上，是因为针对上图的每个实体和链接都进行了初始化的操作，考虑将初始化的操作放入js原生提供的`web worker`内，采用额外的线程执行代码，防止阻塞主线程，该方案需要进一步研究；

### 上图后

上完图后，当数据量较多的时候，针对实体的拖拽等操作会有明显的卡顿，经查看浏览器的火焰图发现，是因为`pixi.js`的核心库`InteractionManager`会不断的监听鼠标的事件，包括鼠标移动、单击落下、单击抬起的操作，当鼠标移动的时候，会不断的触发`onPointerMove`事件，该事件每次执行时间在70-100ms之间，阻塞了前端动画事件的执行，由此产生卡顿。

优化方向：
> 1、尝试修改自定义事件文件`customizedEventHandling.js`的逻辑，优化事件的监听，避免频繁触发，产生阻塞。

## 总结

总体来看，优化方向不涉及到webGL的优化，主要还是以修改业务代码为主；在`pixijs`的基础上，对性能进行优化。
