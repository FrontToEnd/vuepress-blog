# 前端培训

## HTML

[HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML)（超文本标记语言——HyperText Markup Language）是构成 Web 世界的一砖一瓦。它定义了网页内容的含义和结构。除 HTML 以外的其它技术则通常用来描述一个网页的表现与展示效果（如 [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS)），或功能与行为（如 [JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)）。

下面是一个标准的HTML页面的结构：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title></title>
    <link href="example.css" rel="stylesheet">
</head>
<body>
    <div></div>
    <script src="example.js"></script>
</body>
</html>
```

### DOM

[DOM](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model/Introduction)（Document Object Model——文档对象模型）是用来呈现以及与任意 HTML 或 XML文档交互的API。DOM 是载入到浏览器中的文档模型，以节点树的形式来表现文档，每个节点代表文档的构成部分（例如:页面元素、字符串或注释等等）。

### 元素

[HTML元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)列表。

## CSS

**层叠样式表** (Cascading Style Sheets，缩写为 [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS)），是一种样式表语言，用来描述 [HTML](https://developer.mozilla.org/zh-CN/docs/HTML) 或 [XML](https://developer.mozilla.org/zh-CN/docs/XML_介绍)（包括如 [SVG](https://developer.mozilla.org/zh-CN/docs/SVG)、[MathML](https://developer.mozilla.org/zh-CN/docs/Web/MathML)、[XHTML](https://developer.mozilla.org/zh-CN/docs/XHTML) 之类的 XML 分支语言）文档的呈现。CSS 描述了在屏幕、纸质、音频等其它媒体上的元素应该如何被渲染的问题。

### CSSOM

**[CSSOM](https://developer.mozilla.org/zh-CN/docs/Web/API/CSS_Object_Model)(CSS Object Model)** 是一组允许用JavaScript操纵CSS的API。 它是继DOM和HTML API之后，又一个操纵CSS的接口，从而能够动态地读取和修改CSS样式。

### 选择器

[选择器](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Getting_started/Selectors)是用来选择要在DOM中哪些元素上使用CSS的规则。其中选择器包括ID选择器、类选择器、伪类选择器。下面是一个ID选择器的例子：

```css
#myId {
  width: 100px;
  height: 100px;
}
```

其中，ID选择器的权重大于类选择器，一般开发中常用的是类选择器，避免因为权重问题造成CSS覆盖。下图详细说明了CSS规则：

![img](https://mdn.mozillademos.org/files/16483/css-declaration.png)

### 布局

[CSS布局](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout)允许我们拾取网页中的元素，并且控制它们相对正常布局流、周边元素、父容器或者主视口/窗口的位置。布局包括浮动、定位、flex布局、grid布局、媒体查询等。

### 动画

[CSS动画](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation)使得可以将从一个CSS样式配置转换到另一个CSS样式配置。动画包括两个部分:描述动画的样式规则和用于指定动画开始、结束以及中间点样式的关键帧。下面是一个动画的例子：

```css
animation: 3s linear 1s infinite alternate slidein;
@keyframes slidein {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
```

### JavaScript

**[JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) ( JS** ) 是一种具有函数优先的轻量级，解释型或即时编译型的编程语言。这里推荐系统性的学习MDN上的教学以及阮一峰老师写的[ES6入门](https://es6.ruanyifeng.com/)。

总的来说，JS包含以下部分：

- **[标准对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects)**

标准的内置对象例如 `Array`, `Boolean`, `Date`, `Error`, `Function`, `JSON`, `Math`, `Number`, `Object`, `RegExp`, `String`, `Map`, `Set`, `WeakMap` , `WeakSet` 以及其他对象

- **[表达式和运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators)**

运算符的作用：`instanceof`, `typeof`, `new`, `this`，[运算符优先级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)，以及其他运算符。

- **[语句和声明](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements)**

了解 `do-while`, `for-in`, `for-of`, `try-catch`, `let`, `var`, `const`, `if-else`, `switch` 以及其他语句和关键字的作用。

- **[函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions)**

学习如何使用 JavaScript 函数来开发你的应用。

## Vue

学习Vue最好的途径就是[官网](https://cn.vuejs.org/index.html)。它的优点包括：

- 轻量级框架：只关注视图层，是一个构建数据的视图集合，大小只有几十kb；
- 简单易学：国人开发，中文文档，不存在语言障碍 ，易于理解和学习；
- 双向数据绑定：保留了angular的特点，在数据操作方面更为简单；
- 组件化：保留了react的优点，实现了html的封装和重用，在构建单页面应用方面有着独特的优势；
- 视图，数据，结构分离：使数据的更改更为简单，不需要进行逻辑代码的修改，只需要操作数据就能完成相关操作；
- 虚拟DOM：dom操作是非常耗费性能的，不再使用原生的dom操作节点，极大解放dom操作，但具体操作的还是dom不过是换了另一种方式；
- 运行速度更快：相比较与react而言，同样是操作虚拟dom，就性能而言，vue存在很大的优势。

### Vue生命周期

总共分为8个阶段创建前/后，载入前/后，更新前/后，销毁前/后。

> 创建前/后：在beforeCreate阶段，vue实例的挂载元素el和数据对象data都为undefined，还未初始化。在created阶段，vue实例的数据对象data有了，el和数据对象data都为undefined，还未初始化。
> 载入前/后：在beforeMount阶段，vue实例的$el和data都初始化了，但还是挂载之前为虚拟的dom节点，data.message还未替换。在mounted阶段，vue实例挂载完成，data.message成功渲染。
> 更新前/后：当data变化时，会触发beforeUpdate和updated方法
> 销毁前/后：在执行destroy方法后，对data的改变不会再触发周期函数，说明此时vue实例已经解除了事件监听以及和dom的绑定，但是dom结构依然存在

### 模板文件

项目开发中，默认选择使用模板文件开发，也就是采用.vue后缀的模板文件。模板文件格式为：

```js
<template>
    <div id="myTemplate">
      <span v-if="isSpan">这是span</span>
      <div v-show="isDiv">这是div</div>
      <div v-for="item in iterator" :key="item.id">
          <span @click="clickEvent">{{item.name}}</span>
      </div>
      <div @click="getDom" ref="dom"></div>
    </div>
</template>


<script>
export default {
    name: 'myTemplate',
    data() {
        return {
            isSpan: false,
            isDiv: true,
            iterator: [
                {
                    name: 'zqy1',
                    id: 1,
                },
                {
                    name: 'zqy2',
                    id: 2,
                },
                {
                    name: 'zqy3',
                    id: 3,
                },
            ],
        };
    },
    props: {}, // 父子组件传参
    computed: {}, // 计算属性
    watch: {
        obj: {
            handler(newName, oldName) {
              console.log('obj.a changed');
            },
            immediate: true, // 组件加载立即触发回调函数执行
            deep: true // 深入观察，监听器会一层层的往下遍历，给对象的所有属性都加上这个监听器
        }
    }, // 监听属性变化
    methods: {
        clickEvent() {}, // 点击事件
        getDom() {
            const dom = this.$refs.dom;
        },
    },
    beforeCreate() {}, // 以下均为生命周期钩子函数
    created() {},
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    //...
};
</script>


<style lang="scss">
    #myTemplate { /*css命名空间，防止覆盖*/
        .classRule {}
    }
</style
```

这里推荐使用WebStrom进行项目开发，因为2019版之后，对vue支持语法高亮，也内嵌了vue模板，对开发十分友好。

## 技术栈

- [Lodash](https://lodash.com/)

Lodash通过减少数组、数字、对象、字符串等操作的麻烦，使JavaScript变得更容易。

Lodash的模块化方法非常适合:

> 迭代数组、对象和字符串
> 操作和测试值
> 创建复合函数

- [moment](https://momentjs.com/)

用于解析、验证、操作和格式化日期的轻量级JavaScript日期库。

- [Axios](https://github.com/axios/axios)

*Axios* 是一个基于 promise 的 HTTP 库,可以用在浏览器和 node.js 中。

- [Vue](https://cn.vuejs.org/v2/guide/)
- [Vue Router](https://router.vuejs.org/zh/)

`Vue Router`是`Vue`  官方的路由管理器。它和 `Vue`的核心深度集成，让构建单页面应用变得易如反掌。

- [Vuex](https://vuex.vuejs.org/zh/)

`Vuex`是一个专为 `Vue.js`应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

- [Vue cli](https://cli.vuejs.org/zh/)

`Vue CLI`是一个基于 `Vue.js` 进行快速开发的完整系统。可以快速的创建一个拥有诸多配置的初始化项目。

- [iview](https://www.iviewui.com/)

是一套基于`Vue.js`的开源 UI 组件库，主要服务于 PC 界面的中后台产品。

- [webpack](https://webpack.docschina.org/)

`webpack`是一个模块打包器。`webpack` 的主要目标是将 `JavaScript` 文件打包在一起,打包后的文件用于在浏览器中使用。

- [Babel](https://www.babeljs.cn/)

`Babel`  是一个`JavaScript`  编译器。最大的用途用于将`ES6`  的代码编译为`ES5`  ，便于代码在低级浏览器中运行。

- [postcss](https://www.postcss.com.cn/)

是一个用 `JavaScript`   工具和插件转换 `CSS`   代码的工具。最大的用途是利用从 [caniuse](https://caniuse.com/)   网站获取的数据为 CSS 规则添加特定厂商的前缀。[Autoprefixer](https://github.com/postcss/autoprefixer)自动获取浏览器的流行度和能够支持的属性，并根据这些数据帮你自动为 CSS 规则添加前缀。

- [Sass](https://www.sass.hk/)

专业级CSS扩展语言，最大的特性是支持变量、支持嵌套、可以混入代码。

- [Eslint](https://eslint.bootcss.com/)

ESLint最初是由[Nicholas C. Zakas](http://nczonline.net/) 于2013年6月创建的开源项目。它的目标是提供一个插件化的javascript代码检测工具。

- [NodeJS](https://nodejs.org/zh-cn/)

Node.js® 是一个基于 [Chrome V8 引擎](https://v8.dev/) 的 JavaScript 运行时。在项目中的用途主要是用来安装依赖、启动项目、打包项目。

- [TypeScript](https://www.typescriptlang.org/zh/)

TypeScript 是一个开源的编程语言，通过在 `JavaScript`  （世界上最常用的语言之一） 的基础上添加静态类型定义构建而成。

类型提供了一种描述对象形状的方法。可以帮助提供更好的文档，还可以让 TypeScript 验证你的代码可以正常工作。

在 TypeScript 中，不是每个地方都需要标注类型，因为类型推断允许您无需编写额外的代码即可获得大量功能。
