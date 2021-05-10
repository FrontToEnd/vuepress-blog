(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{825:function(s,t,a){"use strict";a.r(t);var n=a(77),r=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"css-property初探"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#css-property初探"}},[s._v("#")]),s._v(" CSS @property初探")]),s._v(" "),a("p",[s._v("根据 "),a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/@property",target:"_blank",rel:"noopener noreferrer"}},[s._v("MDN -- CSS Property"),a("OutboundLink")],1),s._v("，"),a("code",[s._v("@property CSS at-rule")]),s._v(" 是 "),a("code",[s._v("CSS Houdini API")]),s._v(" 的一部分, 它允许开发者显式地定义他们的 CSS 自定义属性，允许进行属性类型检查、设定默认值以及定义该自定义属性是否可以被继承。")]),s._v(" "),a("p",[a("code",[s._v("CSS Houdini")]),s._v(" 又是什么呢，"),a("code",[s._v("CSS Houdini")]),s._v(" 开放 CSS 的底层 API 给开发者，使得开发者可以通过这套接口自行扩展 CSS，并提供相应的工具允许开发者介入浏览器渲染引擎的样式和布局流程中，使开发人员可以编写浏览器可以解析的 CSS 代码，从而创建新的 CSS 功能。")]),s._v(" "),a("h2",{attrs:{id:"示例"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#示例"}},[s._v("#")]),s._v(" 示例")]),s._v(" "),a("div",{staticClass:"language-html line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("style")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),a("span",{pre:!0,attrs:{class:"token style"}},[a("span",{pre:!0,attrs:{class:"token language-css"}},[s._v("\n"),a("span",{pre:!0,attrs:{class:"token atrule"}},[a("span",{pre:!0,attrs:{class:"token rule"}},[s._v("@property")]),s._v(" --property-name")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("syntax")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'<color>'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("inherits")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" false"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("initial-value")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" #fff"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[s._v("p")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("color")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("var")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("--property-name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("style")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br")])]),a("p",[s._v("解释如下：")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("@property --property-name")]),s._v(" 中的 "),a("code",[s._v("--property-name")]),s._v(" 就是自定义属性的名称，定义后可在 CSS 中通过 "),a("code",[s._v("var(--property-name)")]),s._v(" 进行引用")]),s._v(" "),a("li",[s._v("syntax：该自定义属性的语法规则，也可以理解为表示定义的自定义属性的类型")]),s._v(" "),a("li",[s._v("inherits：是否允许继承")]),s._v(" "),a("li",[s._v("initial-value：初始值")])]),s._v(" "),a("p",[s._v("其中，"),a("code",[s._v("@property")]),s._v(" 规则中的 "),a("code",[s._v("syntax")]),s._v(" 和 "),a("code",[s._v("inherits")]),s._v(" 描述符是必需的。")]),s._v(" "),a("p",[s._v("在 "),a("code",[s._v("JavaScript")]),s._v(" 中的写法如下：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("script"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("CSS")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("registerProperty")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  name"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"--property-name"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  syntax"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"<color>"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  inherits"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  initialValue"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"#c0ffee"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("script"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("h2",{attrs:{id:"支持syntax的语法类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#支持syntax的语法类型"}},[s._v("#")]),s._v(" 支持syntax的语法类型")]),s._v(" "),a("ul",[a("li",[s._v("length")]),s._v(" "),a("li",[s._v("number")]),s._v(" "),a("li",[s._v("percentage")]),s._v(" "),a("li",[s._v("length-percentage")]),s._v(" "),a("li",[s._v("color")]),s._v(" "),a("li",[s._v("image")]),s._v(" "),a("li",[s._v("url")]),s._v(" "),a("li",[s._v("integer")]),s._v(" "),a("li",[s._v("angle")]),s._v(" "),a("li",[s._v("time")]),s._v(" "),a("li",[s._v("resolution")]),s._v(" "),a("li",[s._v("transform-list")]),s._v(" "),a("li",[s._v("transform-function")]),s._v(" "),a("li",[s._v("custom-ident (a custom identifier string)")])]),s._v(" "),a("h3",{attrs:{id:"syntax-中的-、-、-符号"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#syntax-中的-、-、-符号"}},[s._v("#")]),s._v(" syntax 中的 +、#、| 符号")]),s._v(" "),a("p",[s._v("定义的 "),a("code",[s._v("CSS @property")]),s._v(" 变量的 "),a("code",[s._v("syntax")]),s._v(" 语法接受一些特殊的类型定义。")]),s._v(" "),a("p",[a("code",[s._v("syntax: '<color#>'")]),s._v(" ：接受逗号分隔的颜色值列表\n"),a("code",[s._v("syntax: '<length+>'")]),s._v(" ：接受以空格分隔的长度值列表\n"),a("code",[s._v("syntax: '<length | length+>'")]),s._v("：接受单个长度或者以空格分隔的长度值列表")]),s._v(" "),a("h2",{attrs:{id:"渐变"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#渐变"}},[s._v("#")]),s._v(" 渐变")]),s._v(" "),a("p",[s._v("前置知识，背景的线性渐变和径向渐变不支持过渡，但是可以使用"),a("code",[s._v("@property")]),s._v("来实现。")]),s._v(" "),a("div",{staticClass:"language-css line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token atrule"}},[a("span",{pre:!0,attrs:{class:"token rule"}},[s._v("@property")]),s._v(" --houdini-colorA")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("syntax")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'<color>'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("inherits")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" false"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("initial-value")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" #fff"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token atrule"}},[a("span",{pre:!0,attrs:{class:"token rule"}},[s._v("@property")]),s._v(" --houdini-colorB")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("syntax")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'<color>'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("inherits")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" false"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("initial-value")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" #000"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".property")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("background")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("linear-gradient")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("45deg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("var")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("--houdini-colorA"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("var")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("--houdini-colorB"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("transition")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 1s --houdini-colorA"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" 1s --houdini-colorB"),a("span",{pre:!0,attrs:{class:"token selector"}},[s._v(";\n    \n    &:hover")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("--houdini-colorA")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" yellowgreen"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("--houdini-colorB")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" deeppink"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br")])]),a("p",[s._v("需要关注的是，我们设定的过渡语句 "),a("code",[s._v("transition: 1s --houdini-colorA, 1s --houdini-colorB")]),s._v("，在这里，我们是针对 "),a("code",[s._v("CSS Houdini")]),s._v(" 自定义变量设定过渡，而不是针对 "),a("code",[s._v("background")]),s._v(" 设定过渡动画。")])])}),[],!1,null,null,null);t.default=r.exports}}]);