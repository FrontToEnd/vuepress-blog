(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{858:function(s,t,a){"use strict";a.r(t);var n=a(77),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"bpmn学习笔记"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bpmn学习笔记"}},[s._v("#")]),s._v(" bpmn学习笔记")]),s._v(" "),a("h2",{attrs:{id:"flowable是什么"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#flowable是什么"}},[s._v("#")]),s._v(" Flowable是什么")]),s._v(" "),a("p",[a("code",[s._v("Flowable")]),s._v("是一个使用Java编写的"),a("strong",[s._v("轻量级业务流程引擎")]),s._v("。"),a("code",[s._v("Flowable")]),s._v("流程引擎可用于部署"),a("strong",[s._v("BPMN 2.0")]),s._v("流程定义（用于定义流程的行业XML标准）， 创建这些流程定义的流程实例，进行查询，访问运行中或历史的流程实例与相关数据等等。")]),s._v(" "),a("p",[s._v("具体可以查看"),a("a",{attrs:{href:"https://juejin.cn/post/6844904158231789582",target:"_blank",rel:"noopener noreferrer"}},[s._v("Flowable学习笔记"),a("OutboundLink")],1),s._v("。")]),s._v(" "),a("p",[s._v("了解了"),a("code",[s._v("Flowable")]),s._v("，接下来具体学习下这里提到的"),a("strong",[s._v("BPMN")]),s._v("是什么。")]),s._v(" "),a("h2",{attrs:{id:"bpmn是什么"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bpmn是什么"}},[s._v("#")]),s._v(" bpmn是什么")]),s._v(" "),a("p",[a("strong",[s._v("业务流程模型注解")]),s._v("（Business Process Modeling Notation - BPMN）是业务流程模型的一种标准图形注解。这个标准是由"),a("strong",[s._v("对象管理组")]),s._v("（Object Management Group - OMG）维护的。")]),s._v(" "),a("p",[s._v("BPMN规范的2.0版本允许添加精确的技术细节在"),a("strong",[s._v("BPMN的图形和元素")]),s._v("中，同时制定BPMN元素的"),a("strong",[s._v("执行语法")]),s._v("。通过使用"),a("strong",[s._v("XML语言")]),s._v("来指定业务流程的可执行语法， BPMN规范已经演变为业务流程的语言， 可以执行在任何兼容BPMN2的流程引擎中， 同时依然可以使用强大的图形注解。")]),s._v(" "),a("p",[s._v("可使用 BPMN 表示内部和外部过程及协作，以帮助确定业务流程内的效率和问题。BPMN 图提供业务模型中的所有项目干系人（从业务分析员、开发者到业务经理）都可理解的常规表示法。")]),s._v(" "),a("h2",{attrs:{id:"bpmn基本对象"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bpmn基本对象"}},[s._v("#")]),s._v(" BPMN基本对象")]),s._v(" "),a("p",[s._v("BPMN的基本对象包括以下几类：")]),s._v(" "),a("ul",[a("li",[s._v("任务（Tasks）:用来指代一个由人或计算设备来完成的活动，这些活动通过流程组合在一起而发挥效用。")]),s._v(" "),a("li",[s._v("编排（Choreographies）：编排图是某种类型的BPMN 协作图，该图将重点放在消息及参与者之间的消息序列上。使用编排图以通过可视方式将重点放在池或池对象之间的协作中的消息流上。")]),s._v(" "),a("li",[s._v("事件（Events）：用来表明流程的生命周期中发生了什么事。")]),s._v(" "),a("li",[s._v("网关（Gateways）：用来控制流程的流向。")]),s._v(" "),a("li",[s._v("流向/顺序流（Flow）：是连接两个流程节点的连线。")])]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-node.oss-cn-shanghai.aliyuncs.com/images/bpmn%E5%9F%BA%E6%9C%AC%E7%B1%BB%E5%9E%8B.png",alt:"BPMN的基本对象"}})]),s._v(" "),a("p",[s._v("下面是一个业务流程图的例子：")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://img-node.oss-cn-shanghai.aliyuncs.com/images/%E4%B8%9A%E5%8A%A1%E6%B5%81%E7%A8%8B%E5%9B%BE.png",alt:"业务流程图"}})]),s._v(" "),a("h2",{attrs:{id:"bpmn规范"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bpmn规范"}},[s._v("#")]),s._v(" BPMN规范")]),s._v(" "),a("p",[s._v("BPMN 2.0（Business Process Model and Notation）")]),s._v(" "),a("ul",[a("li",[s._v("是一套业务流程模型与符号建模标准")]),s._v(" "),a("li",[s._v("精准执行的语义来描述元素操作")]),s._v(" "),a("li",[s._v("以XML为载体，以符号可视化业务")])]),s._v(" "),a("p",[a("a",{attrs:{href:"https://juejin.cn/post/6941989026711175182",target:"_blank",rel:"noopener noreferrer"}},[s._v("BPMN 2.0规范"),a("OutboundLink")],1),s._v("这篇文章详细的介绍了相关规范，可以访问链接进行学习。")]),s._v(" "),a("h2",{attrs:{id:"bpmn绘制"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bpmn绘制"}},[s._v("#")]),s._v(" BPMN绘制")]),s._v(" "),a("p",[s._v("了解了"),a("strong",[s._v("BPMN")]),s._v("基本对象，那怎么样才能进行可视化操作呢？这里要用到"),a("a",{attrs:{href:"https://bpmn.io/toolkit/bpmn-js/",target:"_blank",rel:"noopener noreferrer"}},[s._v("BPMN.js"),a("OutboundLink")],1),s._v("，可以很方便的将"),a("code",[s._v("bpmn-js")]),s._v("集成进vue项目，可以访问"),a("a",{attrs:{href:"https://demo.bpmn.io/new",target:"_blank",rel:"noopener noreferrer"}},[s._v("官方demo页"),a("OutboundLink")],1),s._v("进行体验。")]),s._v(" "),a("p",[s._v("核心用法如下：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" BpmnViewer "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'bpmn-js'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" testXML "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'./test.xml'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" viewer "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("BpmnViewer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" container"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'#canvas'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\nviewer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("importXML")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("testXML"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("err")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("err"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'error rendering'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" err"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("else")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'we are good!'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br")])]),a("p",[s._v("通过构造函数指定"),a("code",[s._v("DOM")]),s._v("容器，然后引入"),a("code",[s._v("xml")]),s._v("文件就可以进行绘制。具体的用法等实操过后，再进行记录。")]),s._v(" "),a("h2",{attrs:{id:"bpmn导出"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bpmn导出"}},[s._v("#")]),s._v(" BPMN导出")]),s._v(" "),a("p",[s._v("当使用可视化工具制作好业务流程后，我们可以将流程保存为"),a("code",[s._v("xml")]),s._v("文件。大致流程如下：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" Modeler "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'bpmn-js/lib/Modeler'")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("modeler "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Modeler")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" container"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'#canvas'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("handleExportXmlAction")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" _this "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("this")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("modeler"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("saveXML")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("format"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("err"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" xml")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n       "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// xml就是需要保存的文件流")]),s._v("\n       "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 具体的下载细节")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br")])]),a("h2",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[s._v("#")]),s._v(" 总结")]),s._v(" "),a("p",[s._v("本文大致介绍了"),a("code",[s._v("BPMN")]),s._v("的概念和规范，方便我们在后续的开发中有的放矢。并且介绍了如何使用"),a("code",[s._v("bpmn-js")]),s._v("来绘制业务流程。不仅支持导入、导出，还支持"),a("strong",[s._v("Undo")]),s._v("、"),a("strong",[s._v("Redo")]),s._v("。")]),s._v(" "),a("p",[s._v("BPMN的概念非常多，元素就包括几十种，先学会使用最基本的元素，再扩大范围进行深入，这样更容易上手。")]),s._v(" "),a("p",[s._v("后续会将"),a("code",[s._v("bpmn-js")]),s._v("相关知识进行沉淀与总结，持续更新中。")])])}),[],!1,null,null,null);t.default=e.exports}}]);