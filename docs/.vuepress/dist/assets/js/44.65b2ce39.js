(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{863:function(s,t,a){"use strict";a.r(t);var n=a(77),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"前端自动化测试"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#前端自动化测试"}},[s._v("#")]),s._v(" 前端自动化测试")]),s._v(" "),a("h2",{attrs:{id:"什么是自动化测试"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#什么是自动化测试"}},[s._v("#")]),s._v(" 什么是自动化测试")]),s._v(" "),a("p",[s._v("在说什么是自动化测试之前，先考虑下什么是测试？测试其实就是在已经开发完成的软件之上采用"),a("strong",[s._v("人工或非人工")]),s._v("的方式验证软件是否符合工程预期，是否会造成用户/开发商损失等潜在问题的一种方式。进而的，自动化测试就是摆脱了人工这种刀耕火种的方式，使用现有的一些测试框架来进行自动化的执行代码，达到测试软件的目的。")]),s._v(" "),a("p",[s._v("总的来说，自动化测试可以大幅度提高测试效率，也更容易发现问题并及时修复。")]),s._v(" "),a("p",[s._v("如无特殊说明，"),a("strong",[s._v("下文中“测试”特指“自动化测试”")]),s._v("。")]),s._v(" "),a("h2",{attrs:{id:"为什么要测试"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#为什么要测试"}},[s._v("#")]),s._v(" 为什么要测试")]),s._v(" "),a("p",[s._v("测试的意义有下面几种：")]),s._v(" "),a("ol",[a("li",[s._v("提高代码质量")]),s._v(" "),a("li",[s._v("准确定位问题")]),s._v(" "),a("li",[s._v("方便迭代/重构")]),s._v(" "),a("li",[s._v("使产品符合预期")]),s._v(" "),a("li",[s._v("减少回归流程")]),s._v(" "),a("li",[s._v("提升开发信心")])]),s._v(" "),a("h2",{attrs:{id:"有哪些测试类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#有哪些测试类型"}},[s._v("#")]),s._v(" 有哪些测试类型")]),s._v(" "),a("p",[s._v("一般来说，一共有三种测试类型：单元测试（Unit Test）、集成测试（Integration Test）、UI测试（UI Test）。")]),s._v(" "),a("p",[s._v("其中，UI测试是被普遍使用的方式。UI测试（UI Test）只是对于前端的测试，是脱离真实后端环境的，仅仅只是将前端放在真实环境中运行，而后端和数据都应该使用 Mock 的。")]),s._v(" "),a("p",[s._v("更进一步的是单元测试，能够进行单元测试的组件就认为是低耦合的，可以复用的。")]),s._v(" "),a("p",[s._v("我们希望在产品中集成的就是单元测试，接下来重点分析。")]),s._v(" "),a("h2",{attrs:{id:"什么项目适合引入自动化测试"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#什么项目适合引入自动化测试"}},[s._v("#")]),s._v(" 什么项目适合引入自动化测试")]),s._v(" "),a("ol",[a("li",[s._v("公共库类的开发维护")]),s._v(" "),a("li",[s._v("中长期项目的迭代/重构")]),s._v(" "),a("li",[s._v("引用了不可控的第三方依赖")])]),s._v(" "),a("p",[s._v("尤其是中长期项目的迭代/重构，自动化测试就非常重要。因为功能的改变、人员的变动都是不可抗因素，通过集成自动化测试，可以最大限度的避免由于认知不足造成的理解偏差，防止代码“误入歧途”。")]),s._v(" "),a("h2",{attrs:{id:"怎么选择测试工具"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#怎么选择测试工具"}},[s._v("#")]),s._v(" 怎么选择测试工具")]),s._v(" "),a("p",[s._v("前端测试的框架可谓是百花齐放。")]),s._v(" "),a("ul",[a("li",[s._v("单元测试（Unit Test）有 Mocha, Ava, Karma, Jest, Jasmine 等。")]),s._v(" "),a("li",[s._v("集成测试（Integration Test）和 UI 测试（UI Test）有 ReactTestUtils, Test Render, Enzyme, React-Testing-Library, Vue-Test-Utils 等。")])]),s._v(" "),a("p",[s._v("其中，"),a("code",[s._v("vue-cli")]),s._v("脚手架使用的是"),a("code",[s._v("Vue-Test-Utils")]),s._v("，测试框架采用的"),a("code",[s._v("Jest")]),s._v("，它基于 "),a("code",[s._v("Jasmine")]),s._v("，至今已经做了大量修改并添加了很多特性，同样也是开箱即用，支持断言，仿真，快照等。那我们就以该框架为首选。")]),s._v(" "),a("h2",{attrs:{id:"jest基本语法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#jest基本语法"}},[s._v("#")]),s._v(" Jest基本语法")]),s._v(" "),a("p",[s._v("相信官方文档会更加的详细，这里送上"),a("a",{attrs:{href:"https://jestjs.io/zh-Hans/docs/getting-started",target:"_blank",rel:"noopener noreferrer"}},[s._v("传送门"),a("OutboundLink")],1),s._v("。")]),s._v(" "),a("h2",{attrs:{id:"项目集成自动化测试"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#项目集成自动化测试"}},[s._v("#")]),s._v(" 项目集成自动化测试")]),s._v(" "),a("h3",{attrs:{id:"安装vue-test-utils"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装vue-test-utils"}},[s._v("#")]),s._v(" 安装Vue Test Utils")]),s._v(" "),a("p",[s._v("首先，我们来安装自动化测试的依赖：")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" --save-dev @vue/test-utils @vue/cli-plugin-unit-jest\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("如果发现项目中已经安装了这两个依赖，可以选择升级到最新稳定版本版。防止出现版本不同导致的诡异bug，可以按照文章中的版本进行指定安装。本文的依赖版本为：")]),s._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"devDependencies"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"@vue/cli-plugin-unit-jest"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^4.5.13"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"@vue/test-utils"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^1.2.1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("p",[s._v("然后，安装"),a("code",[s._v("jest")]),s._v("测试框架，注意：直接安装最新版本会报错，报错信息为："),a("code",[s._v("this._environment.runScript is not a function")]),s._v("。经过排查发现，26版本以后就不存在"),a("code",[s._v("runScript")]),s._v("方法了，这里我们与"),a("code",[s._v("@vue/cli-plugin-unit-jest")]),s._v("里依赖的"),a("code",[s._v("jest")]),s._v("版本保持一致，采用24.9.0。")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" --save-dev jest@24.9.0,\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"在-jest-中处理单文件组件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#在-jest-中处理单文件组件"}},[s._v("#")]),s._v(" 在 Jest 中处理单文件组件")]),s._v(" "),a("p",[s._v("为了告诉 Jest 如何处理 "),a("code",[s._v("*.vue")]),s._v(" 文件，我们需要安装和配置 "),a("code",[s._v("vue-jest")]),s._v(" 预处理器：")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" --save-dev vue-jest\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("需要注意的是，如果你使用了 "),a("code",[s._v("Babel 7")]),s._v(" 或更高版本，需要安装：")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" --save-dev babel-core@^7.0.0-bridge.0\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("不出意外的话，我们的项目中肯定使用了ES Module的模块语法，此时就需要安装"),a("code",[s._v("babel-jest")]),s._v("：")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" --save-dev babel-jest\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("安装完必须的依赖，接下来需要在项目的根路径下新建"),a("code",[s._v("jest.config.js")]),s._v("，内容如下：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  moduleFileExtensions"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'js'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'jsx'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'json'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'vue'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  transform"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'^.+\\\\.vue$'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'vue-jest'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'.+\\\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'jest-transform-stub'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'^.+\\\\.jsx?$'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'babel-jest'")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  moduleNameMapper"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'^@/(.*)$'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'<rootDir>/src/$1'")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  snapshotSerializers"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'jest-serializer-vue'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  testMatch"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  collectCoverageFrom"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'src/utils/**/*.{js,vue}'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'!src/utils/request.js'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'src/views/**/*.{js,vue}'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'src/components/**/*.{js,vue}'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  coverageDirectory"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'<rootDir>/tests/unit/coverage'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  coverageReporters"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'lcov'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'text-summary'")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  testURL"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'http://localhost/'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  transformIgnorePatterns"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"node_modules/(?!(ant-design-vue"')]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('")/)"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br")])]),a("p",[s._v("配置的完整字段可以前往"),a("a",{attrs:{href:"https://jestjs.io/zh-Hans/docs/configuration",target:"_blank",rel:"noopener noreferrer"}},[s._v("jest官网"),a("OutboundLink")],1),s._v("学习，这里记录下上述用到的字段的含义：")]),s._v(" "),a("ul",[a("li",[a("strong",[s._v("moduleFileExtensions")]),s._v("：模块使用的文件扩展名数组。如果引入了模块而没有指定文件扩展名，则Jest将按照从左到右的顺序查找这些扩展名。")]),s._v(" "),a("li",[a("strong",[s._v("transform")]),s._v("：用于指定对应类型的文件转换器。比如这里"),a("code",[s._v(".vue")]),s._v("后缀的文件使用"),a("code",[s._v("vue-jest")]),s._v("进行转换，"),a("code",[s._v(".js")]),s._v("后缀的文件使用"),a("code",[s._v("babel-jest")]),s._v("进行转换。")]),s._v(" "),a("li",[a("strong",[s._v("moduleNameMapper")]),s._v("：用于设置引入时路径的别名，这里设置引入路径是 "),a("code",[s._v("@")]),s._v(" 开头的模块都到 "),a("code",[s._v("src")]),s._v(" 目录下查找。")]),s._v(" "),a("li",[a("strong",[s._v("snapshotSerializers")]),s._v("：用于设置快照序列化的模块名称。")]),s._v(" "),a("li",[a("strong",[s._v("testMatch")]),s._v("：用于指定测试文件，只有在这个列表里的文件才会被当成测试脚本。")]),s._v(" "),a("li",[a("strong",[s._v("collectCoverageFrom")]),s._v("：用于指定测试覆盖率收集的文件，只有在这个列表里的文件的测试覆盖率才会被统计。其中感叹号用来排除某些文件。")]),s._v(" "),a("li",[a("strong",[s._v("coverageDirectory")]),s._v("：Jest输出其覆盖文件的目录。在执行测试命令中添加"),a("code",[s._v("--coverage")]),s._v("可以让jest输入覆盖文件。以项目为例，我们可以执行以下命令："),a("code",[s._v("jest --clearCache && vue-cli-service test:unit --coverage")]),s._v("。")]),s._v(" "),a("li",[a("strong",[s._v("coverageReporters")]),s._v(": 在编写覆盖报告时，Jest使用的报告名称列表。")]),s._v(" "),a("li",[a("strong",[s._v("testURL")]),s._v("：此选项设置jsdom环境的URL。")]),s._v(" "),a("li",[a("strong",[s._v("transformIgnorePatterns")]),s._v("：用于指定文件转换器需要忽略的文件。")])]),s._v(" "),a("h3",{attrs:{id:"编写单元测试"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#编写单元测试"}},[s._v("#")]),s._v(" 编写单元测试")]),s._v(" "),a("p",[s._v("按照上面的配置，我们需要在项目的根目录新增"),a("code",[s._v("tests/unit")]),s._v("文件夹，同时新增以"),a("code",[s._v(".spec.js")]),s._v("为后缀名的文件用来编写单元测试。")]),s._v(" "),a("p",[s._v("接下来举例说明：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// time.js")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" dayjs "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"dayjs"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("revertTime")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("time")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("dayjs")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("time"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("format")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'YYYY-MM-DD HH:mm:ss'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("p",[s._v("我们有一个格式化时间为标准格式的方法，我们来测试下该方法是否可以正确返回。")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// formatTime.spec.js")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" revertTime "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'@/utils/time.js'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("describe")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Utils:revertTime'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" d "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Date")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'2021-07-07 15:17:00'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("it")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'format'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("expect")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("revertTime")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("d"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("toBe")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'2021-07-07 15:17:00'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br")])]),a("p",[s._v("核心语法为"),a("code",[s._v("expect")]),s._v("，通过传入需要测试的方法并且与预期值做比较，如果相等则测试通过。说明可以正确返回格式化的值。")]),s._v(" "),a("p",[s._v("当然这个例子比较简单，如果需要掌握更多的有关vue代码的测试，可以阅读"),a("code",[s._v("Vue Test Utils")]),s._v("的"),a("a",{attrs:{href:"https://vue-test-utils.vuejs.org/zh/guides/",target:"_blank",rel:"noopener noreferrer"}},[s._v("教程"),a("OutboundLink")],1)]),s._v(" "),a("h3",{attrs:{id:"执行单元测试"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#执行单元测试"}},[s._v("#")]),s._v(" 执行单元测试")]),s._v(" "),a("p",[s._v("我们编写好单元测试后，来通过命令执行测试脚本。执行以下命令：")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[s._v("jest --clearCache "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" vue-cli-service test:unit\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("为了更好的集成在项目中，我们应该在"),a("code",[s._v("package.json")]),s._v("中进行声明：")]),s._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"test:unit"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"jest --clearCache && vue-cli-service test:unit"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[s._v("如果要查看项目整体的测试覆盖率，修改为：")]),s._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"test:unit"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"jest --clearCache && vue-cli-service test:unit --coverage"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[s._v("执行命令后，我们根据控制台的输出来查看测试是否通过。如果测试通过，会输入类似于下面的结果：")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[s._v("Test Suites: "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" passed, "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" total\nTests:       "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" passed, "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" total\nSnapshots:   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" total\nTime:        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v(".656s\nRan all "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("test")]),s._v(" suites.\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("p",[s._v("至此，我们就成功的在项目中引入了自动化测试。")]),s._v(" "),a("h2",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[s._v("#")]),s._v(" 总结")]),s._v(" "),a("p",[s._v("本篇文章我们从为什么引入自动化测试的角度出发，分析了测试对我们项目带来的收益。不置可否，我们应该贯彻自动化测试，这也是目前前端工程化的必备流程之一。")]),s._v(" "),a("p",[s._v("然后分步骤介绍了如何在现有的项目中引入"),a("code",[s._v("jest")]),s._v("测试框架，方便大家按图索骥，一步步的执行。")]),s._v(" "),a("p",[s._v("最后，需要说明的是，我们是在现有的不断迭代/重构的产品中集成自动化测试。也就意味着，我们需要补偿这部分技术债，把现有的组件都补上一份自动化测试脚本。长远来看，这也有益于产品走的更远，发展的更好。")]),s._v(" "),a("h2",{attrs:{id:"补充"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#补充"}},[s._v("#")]),s._v(" 补充")]),s._v(" "),a("p",[s._v("发现一个"),a("code",[s._v("Jest")]),s._v("的可视化工具"),a("a",{attrs:{href:"https://github.com/Raathigesh/majestic",target:"_blank",rel:"noopener noreferrer"}},[s._v("majestic"),a("OutboundLink")],1),s._v("，原文是"),a("code",[s._v("Zero config GUI for Jest")]),s._v("。")]),s._v(" "),a("p",[s._v("可以通过链接访问，里面有详细的使用说明，在项目中不妨一试。")])])}),[],!1,null,null,null);t.default=e.exports}}]);