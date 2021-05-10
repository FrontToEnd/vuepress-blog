# Vue 项目优化实践-规范篇

## 持久化存储

使用 [`localForage`](https://github.com/localForage/localForage) 来实现本地存储，该库会优先使用 `IndexedDB` 以扩大本地存储空间，并采用优雅降级方案，处理了异常情况。
`localStorage` 有存储限制，所以在存储空间用完的情况下，进行 `setItem` 操作就会报 `QuotaExceededError` 的错。
事实上，在某些浏览器（如 iOS 11 的 Safari 浏览器）的无痕模式下，`localStorage` 也是无法读写的，进行 `setItem` 操作会报一样的 `QuotaExceededError` 错。

建议：

* 用 `try...catch` 包裹 `setItem` 操作。
* 转存至`vuex`。

## Editorconfig 具体配置

配置文件 `.editorconfig`

```bash
root = true

[*]
indent_style = space                    # 输入的 tab 都用空格代替
indent_size = 2                         # 一个 tab 用 2 个空格代替
end_of_line = lf                        # 换行符使用 unix 的换行符 \n
charset = utf-8                         # 字符编码 utf-8
trim_trailing_whitespace = true         # 去掉每行末尾的空格
insert_final_newline = true             # 每个文件末尾都加一个空行

[*.md]
trim_trailing_whitespace = false        # .md 文件不去掉每行末尾的空格
```

## Prettier 规范

具体配置如下：

```js
// prettier.config.js
module.exports = {
  // 在ES5中有效的结尾逗号（对象，数组等）
  trailingComma: 'none',
  // 不使用缩进符，而使用空格
  useTabs: false,
  // tab 用两个空格代替
  tabWidth: 2,
  // 仅在语法可能出现错误的时候才会添加分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 在Vue文件中缩进脚本和样式标签。
  vueIndentScriptAndStyle: true,
  // 一行最多 100 字符
  printWidth: 100,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 换行符使用 lf
  endOfLine: 'lf'
}
```

## git-commit 规范

通过提交规范插件 [`vue-cli-plugin-commitlint`](https://github.com/luoxue-victor/commitlint) 进行代码的提交规范（该插件基于 `conventional-changelog-angular` 进行了修改/封装）。
具体用法参考github链接。

## ESlint 规范

每个规则对应的 `0，1，2` 分别表示 `off, warning, error` 三个错误级别。
具体配置如下：

```js
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6, // 指定ECMAScript的版本为 6
    parser: "@typescript-eslint/parser", // 解析 ts
    sourceType: "module"
  },
  // 全局变量
  globals: {
    window: true,
    document: true,
    wx: true
  },
  // 兼容环境
  env: {
    browser: true
  },
  // 插件
  extends: ["plugin:vue/essential", "@vue/standard"],
  // 规则
  rules: {
    // 末尾不加分号，只有在有可能语法错误时才会加分号
    semi: 0,
    // 箭头函数需要有括号 (a) => {}
    "arrow-parens": 0,
    // 两个空格缩进， switch 语句中的 case 为 1 个空格
    indent: [
      "error",
      2,
      {
        SwitchCase: 1
      }
    ],
    // 关闭不允许回调未定义的变量
    "standard/no-callback-literal": 0,
    // 关闭副作用的 new
    "no-new": "off",
    // 关闭每行最大长度小于 80
    "max-len": 0,
    // 函数括号前面不加空格
    "space-before-function-paren": ["error", "never"],
    // 关闭要求 require() 出现在顶层模块作用域中
    "global-require": 0,
    // 关闭关闭类方法中必须使用this
    "class-methods-use-this": 0,
    // 关闭禁止对原生对象或只读的全局对象进行赋值
    "no-global-assign": 0,
    // 关闭禁止对关系运算符的左操作数使用否定操作符
    "no-unsafe-negation": 0,
    // 关闭禁止使用 console
    "no-console": 0,
    // 关闭禁止末尾空行
    "eol-last": 0,
    // 关闭强制在注释中 // 或 /* 使用一致的空格
    "spaced-comment": 0,
    // 关闭禁止对 function 的参数进行重新赋值
    "no-param-reassign": 0,
    // 强制使用一致的换行符风格 (linebreak-style)
    "linebreak-style": ["error", "unix"],
    // 关闭全等 === 校验
    "eqeqeq": "off",
    // 禁止使用拖尾逗号
    "comma-dangle": ["error", "never"],
    // 关闭强制使用骆驼拼写法命名约定
    "camelcase": 0
  }
};
```

## ignore 规范

### gitignore 规范

同步到远程仓库时予以忽略的文件及文件夹。基础配置如下，各项目也可以根据需求自行调整。

```bash
.DS_Store
node_modules
/dist

# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

### eslintignore 规范

`eslint` 校验时予以忽略的文件及文件夹。基础配置如下，各项目也可以根据需求自行调整。

```bash
node_modules
dist/
test/
lib/
es/
```

## Vue 项目目录规范

```bash
├── dist                        // [生成] 打包目录
├── src                         // [必选] 开发目录
│    ├── views                  // [必选] 页面组件，不允许有其他类型组件混入
│    ├── components             // [必选] 业务组件必须写在这里
│    ├── libs                   // [可选] 公共库（一般用于对一些库的封装）
│    ├── utils                  // [可选] 工具库（用于一些函数方法之类的库）
│    ├── assets                 // [可选] 公共资源（被项目引用的经过webpack处理的资源）
│    ├── store                  // [可选] 数据存储 vuex
│    ├── route                  // [可选] 路由
│    ├── style                  // [可选] 公共样式
│    ├── App.vue                // [必选] 根组件
│    └── main.(js|ts)           // [必选] 入口文件
├── public                      // [必选] 不会被webpack编译的资源
│    ├── index.html             // [必选] 模板
│    └── logo.png               // [可选] 项目 logo
├── config                      // [可选] 配置目录
├── mock                        // [可选] mock 数据
├── test                        // [可选] 测试代码
├── docs                        // [可选] 文档
│── .gitignore                  // [必选] git 忽略的文件
│── .editorconfig               // [必选] 编译器配置
│── .npmignore                  // [可选] 如果是 npm 包是必选
│── jsconfig.json               // [可选] 用于 vscode 配置
├── README.md                   // [必选] 导读
├── package.json                // [必选] 大家都懂
└── ......                      // [可选] 一些工具的配置，如果 babel.config.js 等
```

`components` 只写公共组件，页面附带组件写在 `views` 内。

## 流程规范

### npm 包版本号规则

主版本号.次版本号.修订号

版本号递增规则如下：

* 主版本号：当做了不兼容的 API 修改，
* 次版本号：当做了向下兼容的功能性新增，
* 修订号：当做了向下兼容的问题修正。先行版本号及版本编译信息可以加到“主版本号.次版本号.修订号”的后面，作为延伸。
* 当主版本号升级后，次版本号和修订号需要重置为 0，次版本号进行升级后，修订版本需要重置为 0。

关于测试版本后缀命名：

* alpha：初期内测版，可能比较不稳定, 如：1.0.0-alpha.1。
* beta：中期内测，但会持续加入新的功能。
* rc：Release Candidate，发行候选版本。RC 版不会再加入新的功能了，主要着重于除错，处在 beta 版之后，正式版之前

### semver：semantic version 语义化版本

* 固定版本：例如 1.0.1、1.2.1-beta.0 这样表示包的特定版本的字符串
* 范围版本：是对满足特定规则的版本的一种表示，例如 1.0.3-2.3.4、1.x、^0.2、>1.4

### 语义化说明

用到的语义化字符有：~、>、<、=、>=、<=、-、||、x、X、*

```bash
- '^2.1.1' // 2.x最新版本(主版本号锁定)
- '~2.1.1' // 2.1.x最新版本号(主和次版本号锁定)
- '>2.1'   // 高于2.1版本的最新版本
- '1.0.0 - 1.2.0' // 两个版本之间最新的版本（必须要有空格）
- '*'      // 最新的版本号
- '3.x'    // 对应x部分最新的版本号
```

`npm install` 默认安装 ^x.x.x 类型的版本，用于兼容大版本下最新的版本。
