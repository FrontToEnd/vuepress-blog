# 前端自动化测试

## 什么是自动化测试

在说什么是自动化测试之前，先考虑下什么是测试？测试其实就是在已经开发完成的软件之上采用**人工或非人工**的方式验证软件是否符合工程预期，是否会造成用户/开发商损失等潜在问题的一种方式。进而的，自动化测试就是摆脱了人工这种刀耕火种的方式，使用现有的一些测试框架来进行自动化的执行代码，达到测试软件的目的。

总的来说，自动化测试可以大幅度提高测试效率，也更容易发现问题并及时修复。

如无特殊说明，**下文中“测试”特指“自动化测试”**。

## 为什么要测试

测试的意义有下面几种：

1. 提高代码质量
2. 准确定位问题
3. 方便迭代/重构
4. 使产品符合预期
5. 减少回归流程
6. 提升开发信心

## 有哪些测试类型

一般来说，一共有三种测试类型：单元测试（Unit Test）、集成测试（Integration Test）、UI测试（UI Test）。

其中，UI测试是被普遍使用的方式。UI测试（UI Test）只是对于前端的测试，是脱离真实后端环境的，仅仅只是将前端放在真实环境中运行，而后端和数据都应该使用 Mock 的。

更进一步的是单元测试，能够进行单元测试的组件就认为是低耦合的，可以复用的。

我们希望在产品中集成的就是单元测试，接下来重点分析。

## 什么项目适合引入自动化测试

1. 公共库类的开发维护
2. 中长期项目的迭代/重构
3. 引用了不可控的第三方依赖

尤其是中长期项目的迭代/重构，自动化测试就非常重要。因为功能的改变、人员的变动都是不可抗因素，通过集成自动化测试，可以最大限度的避免由于认知不足造成的理解偏差，防止代码“误入歧途”。

## 怎么选择测试工具

前端测试的框架可谓是百花齐放。

- 单元测试（Unit Test）有 Mocha, Ava, Karma, Jest, Jasmine 等。
- 集成测试（Integration Test）和 UI 测试（UI Test）有 ReactTestUtils, Test Render, Enzyme, React-Testing-Library, Vue-Test-Utils 等。

其中，`vue-cli`脚手架使用的是`Vue-Test-Utils`，测试框架采用的`Jest`，它基于 `Jasmine`，至今已经做了大量修改并添加了很多特性，同样也是开箱即用，支持断言，仿真，快照等。那我们就以该框架为首选。

## Jest基本语法

相信官方文档会更加的详细，这里送上[传送门](https://jestjs.io/zh-Hans/docs/getting-started)。

## 项目集成自动化测试

### 安装Vue Test Utils

首先，我们来安装自动化测试的依赖：

```sh
npm install --save-dev @vue/test-utils @vue/cli-plugin-unit-jest
```

如果发现项目中已经安装了这两个依赖，可以选择升级到最新稳定版本版。防止出现版本不同导致的诡异bug，可以按照文章中的版本进行指定安装。本文的依赖版本为：

```json
"devDependencies": {
    "@vue/cli-plugin-unit-jest": "^4.5.13",
    "@vue/test-utils": "^1.2.1",
}
```

然后，安装`jest`测试框架，注意：直接安装最新版本会报错，报错信息为：`this._environment.runScript is not a function`。经过排查发现，26版本以后就不存在`runScript`方法了，这里我们与`@vue/cli-plugin-unit-jest`里依赖的`jest`版本保持一致，采用24.9.0。

```sh
npm install --save-dev jest@24.9.0,
```

### 在 Jest 中处理单文件组件

为了告诉 Jest 如何处理 `*.vue` 文件，我们需要安装和配置 `vue-jest` 预处理器：

```sh
npm install --save-dev vue-jest
```

需要注意的是，如果你使用了 `Babel 7` 或更高版本，需要安装：

```sh
npm install --save-dev babel-core@^7.0.0-bridge.0
```

不出意外的话，我们的项目中肯定使用了ES Module的模块语法，此时就需要安装`babel-jest`：

```sh
npm install --save-dev babel-jest
```

安装完必须的依赖，接下来需要在项目的根路径下新建`jest.config.js`，内容如下：

```js
module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  collectCoverageFrom: ['src/utils/**/*.{js,vue}', '!src/utils/request.js', 'src/views/**/*.{js,vue}', 'src/components/**/*.{js,vue}'],
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  coverageReporters: [
    'lcov',
    'text-summary'
  ],
  testURL: 'http://localhost/',
  transformIgnorePatterns: [
    "node_modules/(?!(ant-design-vue"
    + ")/)",
  ]
}
```

配置的完整字段可以前往[jest官网](https://jestjs.io/zh-Hans/docs/configuration)学习，这里记录下上述用到的字段的含义：

- **moduleFileExtensions**：模块使用的文件扩展名数组。如果引入了模块而没有指定文件扩展名，则Jest将按照从左到右的顺序查找这些扩展名。
- **transform**：用于指定对应类型的文件转换器。比如这里`.vue`后缀的文件使用`vue-jest`进行转换，`.js`后缀的文件使用`babel-jest`进行转换。
- **moduleNameMapper**：用于设置引入时路径的别名，这里设置引入路径是 `@` 开头的模块都到 `src` 目录下查找。
- **snapshotSerializers**：用于设置快照序列化的模块名称。
- **testMatch**：用于指定测试文件，只有在这个列表里的文件才会被当成测试脚本。
- **collectCoverageFrom**：用于指定测试覆盖率收集的文件，只有在这个列表里的文件的测试覆盖率才会被统计。其中感叹号用来排除某些文件。
- **coverageDirectory**：Jest输出其覆盖文件的目录。在执行测试命令中添加`--coverage`可以让jest输入覆盖文件。以项目为例，我们可以执行以下命令：`jest --clearCache && vue-cli-service test:unit --coverage`。
- **coverageReporters**: 在编写覆盖报告时，Jest使用的报告名称列表。
- **testURL**：此选项设置jsdom环境的URL。
- **transformIgnorePatterns**：用于指定文件转换器需要忽略的文件。

### 编写单元测试

按照上面的配置，我们需要在项目的根目录新增`tests/unit`文件夹，同时新增以`.spec.js`为后缀名的文件用来编写单元测试。

接下来举例说明：

```js
// time.js
import dayjs from "dayjs";

export function revertTime(time) {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
}
```

我们有一个格式化时间为标准格式的方法，我们来测试下该方法是否可以正确返回。

```js
// formatTime.spec.js
import { revertTime } from '@/utils/time.js'
describe('Utils:revertTime', () => {
  const d = new Date('2021-07-07 15:17:00')

  it('format', () => {
    expect(revertTime(d)).toBe('2021-07-07 15:17:00')
  })
})
```

核心语法为`expect`，通过传入需要测试的方法并且与预期值做比较，如果相等则测试通过。说明可以正确返回格式化的值。

当然这个例子比较简单，如果需要掌握更多的有关vue代码的测试，可以阅读`Vue Test Utils`的[教程](https://vue-test-utils.vuejs.org/zh/guides/)

### 执行单元测试

我们编写好单元测试后，来通过命令执行测试脚本。执行以下命令：

```sh
jest --clearCache && vue-cli-service test:unit
```

为了更好的集成在项目中，我们应该在`package.json`中进行声明：

```json
"scripts": {
    "test:unit": "jest --clearCache && vue-cli-service test:unit",
},
```

如果要查看项目整体的测试覆盖率，修改为：

```json
"scripts": {
    "test:unit": "jest --clearCache && vue-cli-service test:unit --coverage",
},
```

执行命令后，我们根据控制台的输出来查看测试是否通过。如果测试通过，会输入类似于下面的结果：

```sh
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        3.656s
Ran all test suites.
```

至此，我们就成功的在项目中引入了自动化测试。

## 总结

本篇文章我们从为什么引入自动化测试的角度出发，分析了测试对我们项目带来的收益。不置可否，我们应该贯彻自动化测试，这也是目前前端工程化的必备流程之一。

然后分步骤介绍了如何在现有的项目中引入`jest`测试框架，方便大家按图索骥，一步步的执行。

最后，需要说明的是，我们是在现有的不断迭代/重构的产品中集成自动化测试。也就意味着，我们需要补偿这部分技术债，把现有的组件都补上一份自动化测试脚本。长远来看，这也有益于产品走的更远，发展的更好。
