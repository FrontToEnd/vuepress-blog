# bpmn学习笔记

## Flowable是什么

`Flowable`是一个使用Java编写的**轻量级业务流程引擎**。`Flowable`流程引擎可用于部署**BPMN 2.0**流程定义（用于定义流程的行业XML标准）， 创建这些流程定义的流程实例，进行查询，访问运行中或历史的流程实例与相关数据等等。

具体可以查看[Flowable学习笔记](https://juejin.cn/post/6844904158231789582)。

了解了`Flowable`，接下来具体学习下这里提到的**BPMN**是什么。

## bpmn是什么

**业务流程模型注解**（Business Process Modeling Notation - BPMN）是业务流程模型的一种标准图形注解。这个标准是由**对象管理组**（Object Management Group - OMG）维护的。

BPMN规范的2.0版本允许添加精确的技术细节在**BPMN的图形和元素**中，同时制定BPMN元素的**执行语法**。通过使用**XML语言**来指定业务流程的可执行语法， BPMN规范已经演变为业务流程的语言， 可以执行在任何兼容BPMN2的流程引擎中， 同时依然可以使用强大的图形注解。

可使用 BPMN 表示内部和外部过程及协作，以帮助确定业务流程内的效率和问题。BPMN 图提供业务模型中的所有项目干系人（从业务分析员、开发者到业务经理）都可理解的常规表示法。

## BPMN基本对象

BPMN的基本对象包括以下几类：

- 任务（Tasks）:用来指代一个由人或计算设备来完成的活动，这些活动通过流程组合在一起而发挥效用。
- 编排（Choreographies）：编排图是某种类型的BPMN 协作图，该图将重点放在消息及参与者之间的消息序列上。使用编排图以通过可视方式将重点放在池或池对象之间的协作中的消息流上。
- 事件（Events）：用来表明流程的生命周期中发生了什么事。
- 网关（Gateways）：用来控制流程的流向。
- 流向/顺序流（Flow）：是连接两个流程节点的连线。

![BPMN的基本对象](https://img-node.oss-cn-shanghai.aliyuncs.com/images/bpmn基本类型.png)

下面是一个业务流程图的例子：

![业务流程图](https://img-node.oss-cn-shanghai.aliyuncs.com/images/业务流程图.png)

## BPMN规范

BPMN 2.0（Business Process Model and Notation）

- 是一套业务流程模型与符号建模标准
- 精准执行的语义来描述元素操作
- 以XML为载体，以符号可视化业务

[BPMN 2.0规范](https://juejin.cn/post/6941989026711175182)这篇文章详细的介绍了相关规范，可以访问链接进行学习。

## BPMN绘制

了解了**BPMN**基本对象，那怎么样才能进行可视化操作呢？这里要用到[BPMN.js](https://bpmn.io/toolkit/bpmn-js/)，可以很方便的将`bpmn-js`集成进vue项目，可以访问[官方demo页](https://demo.bpmn.io/new)进行体验。

核心用法如下：

```js
import BpmnViewer from 'bpmn-js';
import testXML from './test.xml';

const viewer = new BpmnViewer({ container: '#canvas' });

viewer.importXML(testXML, function(err) {
if (err) {
    console.log('error rendering', err);
} else {
    console.log('we are good!');
}
});
```

通过构造函数指定`DOM`容器，然后引入`xml`文件就可以进行绘制。具体的用法等实操过后，再进行记录。

## BPMN导出

当使用可视化工具制作好业务流程后，我们可以将流程保存为`xml`文件。大致流程如下：

```js
import Modeler from 'bpmn-js/lib/Modeler'

this.modeler = new Modeler({ container: '#canvas' });

handleExportXmlAction() {
    const _this = this
    this.modeler.saveXML({format: true}, function (err, xml) {
       // xml就是需要保存的文件流
       // 具体的下载细节
    })
},
```

## 总结

本文大致介绍了`BPMN`的概念和规范，方便我们在后续的开发中有的放矢。并且介绍了如何使用`bpmn-js`来绘制业务流程。不仅支持导入、导出，还支持**Undo**、**Redo**。

BPMN的概念非常多，元素就包括几十种，先学会使用最基本的元素，再扩大范围进行深入，这样更容易上手。

后续会将`bpmn-js`相关知识进行沉淀与总结，持续更新中。
