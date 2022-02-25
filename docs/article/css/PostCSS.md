# PostCSS流程

## PostCSS的作用

[PostCSS](https://postcss.org/)主要做了三件事：

1. `parse`：把 CSS 文件的字符串解析成抽象语法树（Abstract Syntax Tree）的框架，解析过程中会检查 CSS 语法是否正确，不正确会给出错误提示。
2. `runPlugin`: 执行插件函数。PostCSS 本身不处理任何具体任务，它提供了以特定属性或者规则命名的事件。有特定功能的插件（如 `autoprefixer`、`CSS Modules`）会注册事件监听器。PostCSS 会在这个阶段，重新扫描 AST，执行注册的监听器函数。
3. `generate`: 插件对 AST 处理后，PostCSS 把处理过的 AST 对象转成 CSS string。

如果没有插件，那么初始传入的 CSS string 和 generate 生成的 CSS string 是一样的。

## parse

CSS 规则集（rule-set）由选择器和声明块组成：

- 选择器指向您需要设置样式的 HTML 元素。
- 声明块包含一条或多条用分号分隔的声明。
- 每条声明都包含一个 CSS 属性名称和一个值，以冒号分隔。
- 多条 CSS 声明用分号分隔，声明块用花括号括起来。

AST 用五类对象描述 CSS 语法。这里举个具体的例子，再打印出对应的 AST 结果，对照了解 AST 五类对象和 CSS 语法的对应关系。

`app.css` 文件中写如下内容：

```css
@import url('./app-02.css');

.container {
  color: red;
}
```

### ****Declaration 对象****

Declaration 对象用来描述 CSS 中的每一条声明语句。

- type 标记当前对象的类型
- parent 记录父对象的实例
- prop 记录声明中的属性名
- value 记录声明中的值
- raws 字段记录声明前的字符串、声明属性和值之间的符号的字符串
- 其余字段解释见代码中的注释。

上边 CSS 文件中的`color: red;`会被描述成如下对象：

```jsx
{
    parent: Rule,       // 外层的选择器被转译成 Rule 对象，是当前声明对象的 parent
    prop: "color",      // prop 字段记录声明的属性
    raws: {             // raws 字段记录声明前、后的字符串，声明属性和值之间的字符串，以及前边语句是否分号结束。
        before: '\n ',  // raws.before 字段记录声明前的字符串
        between: ': ', // raws.between 字段记录声明属性和值之间的字符串
    },
    source: {          // source 字段记录声明语句的开始、结束位置，以及当前文件的信息
        start: { offset: 45, column: 3, line: 4 },
        end: { offset: 55, column: 13, line: 4 },
        input: Input {
            css: '@import url('./app-02.css');\n\n.container {\n  color: red;\n}',
            file: '/Users/admin/temp/postcss/app.css',
            hasBOM: false,
            Symbol(fromOffsetCache): [0, 29, 30, 43, 57]
        }
    },
    Symbol('isClean'): false,  // Symbol(isClean) 字段默认值都是 false，用于记录当前对象关联的 plugin 是否执行。plugin 会在后续解释
    Symbol('my'): true,        // Symbol(my) 字段默认值都是 true，用于记录当前对象是否是对应对象的实例，如果不是，可以根据类型把对象的属性设置为普通对象的 prototype 属性
    type: 'decl',            // type 记录对象类型，是个枚举值，声明语句的 type 固定是 decl
    value: "red"             // value 字段记录声明的值
}
```

### ****Rule 对象****

Rule 对象是描述选择器的。

- type 记录对象的类型
- parent 记录父对象的实例
- nodes 记录子对象的实例
- selector 记录选择器的字符串
- raws 记录选择器前的字符串、选择器和大括号之间的字符串、最后一个声明和结束大括号之间的字符串
- 其余字段解释见代码中的注释。

上边 app.css 文件中`.container`经过 postcss 转译后的对象是：

```jsx
{
    nodes: [Declaration], // nodes 记录包含关系，Rule 对象包含 Declaration 对象
    parent: Root,        // 根对象是 Root 对象，是当前声明对象的 parent
    raws: {              // raws 字段记录如下
        before: '\n\n',  // raws.before 字段记录选择器前的字符串
        between: ' ',    // raws.between 字段记录选择器和大括号之间的字符串
        semicolon: true, // raws.semicolon 字段记录前置声明语句是正常分号结束
        after: '\n'      // raws.after 字段记录最后一个声明和结束大括号之间的字符串
    },
    selector:'.container', // selector 记录 selector
    source: {            // source 字段记录选择器语句的开始、结束位置，以及当前文件的信息
        start: { offset: 30, column: 1, line: 3 },
        input: Input {
            css: '@import url('./app-02.css');\n\n.container {\n  color: red;\n}',
            file: '/Users/admin/temp/postcss/app.css',
            hasBOM: false,
            Symbol(fromOffsetCache): [0, 29, 30, 43, 57]
        },
        end: { offset: 57, column: 1, line: 5 }
    },
    Symbol('isClean'): false,  // Symbol(isClean) 字段默认值都是 false，用于记录当前对象关联的 plugin 是否执行。plugin 会在后续解释
    Symbol('my'): true,        // Symbol(my) 字段默认值都是 true，用于记录当前对象是否是对应对象的实例，如果不是，可以根据类型把对象的属性设置为普通对象的 prototype
    type: 'rule'           // type 记录对象类型，是个枚举值，声明语句的 type 固定是 rule
}
```

### Root

Root 对象是 AST 对象的根对象。

- type 记录当前对象的类型
- nodes 属性记录子节点对应对象的实例。

上边 app.css 文件中 root 对象是：

```jsx
{
    nodes: [AtRule, Rule], // nodes 记录子对象（选择器和 @开头的对象），AtRule 对象会在后边提到
    raws: {                // raws 字段记录如下
        semicolon: false,  // raws.semicolon 最后是否是分号结束
        after: ''          // raws.after 最后的空字符串
    },
    source: {              // source 字段记录根目录语句的开始，以及当前文件的信息
        start: { offset: 0, column: 1, line: 1 },
        input: Input {
            css: '@import url('./app-02.css');\n\n.container {\n  color: red;\n}',
            file: '/Users/admin/temp/postcss/app.css',
            hasBOM: false,
            Symbol(fromOffsetCache): [0, 29, 30, 43, 57]
        }
    },
    Symbol('isClean'): false,  // Symbol(isClean) 字段默认值都是 false，用于记录当前对象关联的 plugin 是否执行。plugin 会在后续解释
    Symbol('my'): true,        // Symbol(my) 字段默认值都是 true，用于记录当前对象是否是对应对象的实例，如果不是，可以根据类型把对象的属性设置为普通对象的 prototype
    type: 'root'           // type 记录对象类型，是个枚举值，声明语句的 type 固定是 root
}
```

### ****AtRule 对象****

CSS 中除了选择器，还有一类语法是 `@` 开头的，例如 `@import`、`@keyframes`、`@font-face`，PostCSS 把这类语法解析成 AtRule 对象。

- type 记录当前对象的类型
- parent 记录当前对象的父对象
- name 记录`@`紧跟着的单词
- params 记录 name 值

例如 `@import url("./app-02.css");` 将被解析成如下对象：

```jsx
{
    name: "import",                  // name 记录 @ 紧跟着的单词
    params: "url('./app-02.css')",   // params 记录 name 值
    parent: Root,                    // parent 记录父对象
    raws: {                          // raws 字段记录如下
        before: '',                  // raws.before 记录 @语句前的空字符串
        between: '',                 // raws.between 记录 name 和 { 之间的空字符串
        afterName: '',                // raws.afterName 记录 name 和 @ 语句之间的空字符串
        after: '',                   // raws.after 记录大括号和上一个 rule 之间的空字符串
        semicolon: false             // raws.semicolon 上一个规则是否是分号结束
    },
    source: {                        // source 字段记录@语句的开始，以及当前文件的信息
        start: { offset: 0, column: 1, line: 1 },
        end: { offset: 27, column: 28, line: 1 },
        input: Input {
            css: '@import url('./app-02.css');\n\n.container {\n  color: red;\n}',
            file: '/Users/admin/temp/postcss/app.css',
            hasBOM: false,
            Symbol(fromOffsetCache): [0, 29, 30, 43, 57]
        }
    },
    Symbol('isClean'): false,  // Symbol(isClean) 字段默认值都是 false，用于记录当前对象关联的 plugin 是否执行。plugin 会在后续解释
    Symbol('my'): true,        // Symbol(my) 字段默认值都是 true，用于记录当前对象是否是对应对象的实例，如果不是，可以根据类型把对象的属性设置为普通对象的 prototype
    type: 'atrule'          // type 记录对象类型，是个枚举值，声明语句的 type 固定是 atrule
}
```

### ****Comment 对象****

css 文件中的注释被解析成 Comment 对象。text 字段记录注释内容。`/* 你好 */`
被解析成：

```jsx
{
    parent: Root,             // parent 记录父对象
    raws: {                   // raws 字段记录如下
        before: '',           // raws.before 记录注释语句前的空字符串
        left: ' ',            // raws.left 记录注释语句左侧的空字符串
        right: ' '            // raws.right 记录注释语句右侧的空字符串
    },
    source: {                 // source 字段记录注释语句的开始、结束位置，以及当前文件的信息
        start: {…}, input: Input, end: {…}
    },
    Symbol('isClean'): false,  // Symbol(isClean) 字段默认值都是 false，用于记录当前对象关联的 plugin 是否执行。plugin 会在后续解释
    Symbol('my'): true,        // Symbol(my) 字段默认值都是 true，用于记录当前对象是否是对应对象的实例，如果不是，可以根据类型把对象的属性设置为普通对象的 prototype
    text: '你好',             // text 记录注释内容
    type: 'comment'          // type 记录对象类型，是个枚举值，声明语句的 type 固定是 comment
}
```

### 关系

从上一段可以知道，CSS 被解析成 Declaration、Rule、Root、AtRule、Comment 对象。这些对象有很多公共方法，PostCSS 用了面向对象的继承思想，把公共方法和公共属性提取到了父类中。

Root、Rule、AtRule 都是可以有子节点的，都有 nodes 属性，他们三个继承自 Container 类，对 nodes 的操作方法都写在 Container 类中。Container、Declaration、Comment 继承自 Node 类，所有对象都有 Symbol('isClean')、Symbol('my')、raws、source、type 属性，都有toString()、error()等方法，这些属性和方法都定义在 Node 类中。

把CSS转换为AST的源码位置是：[postcss/lib/parser.js](https://github.com/postcss/postcss/blob/main/lib/parser.js#L33)中的`parse`方法。

## **runPlugin**

PostCSS 本身并不处理任何具体的任务，只有当我们为其附加各种插件之后，它才具有实用性。

PostCSS 在把 CSS string 解析成 AST 对象后，会扫描一边 AST 对象，每一种 AST 的对象都可以有对应的监听器。在遍历到某类型的对象时，如果有对象的监听器，就会执行其监听器。

### **第一类监听器**

PostCSS 提供的**「以特定属性或者规则命名」**的事件监听器，如下：

CHILDREAN 代表子节点的事件监听器。

```jsx
// root
['Root', CHILDREN, 'RootExit']

// AtRule
['AtRule', 'AtRule-import', CHILDREN, 'AtRuleExit', 'AtRuleExit-import']

// Rule
['Rule', CHILDREN, 'RuleExit']

// Declaration
['Declaration', 'Declaration-color', 'DeclarationExit', 'DeclarationExit-color']

// Comment
['Comment', 'CommentExit']
```

PostCSS 以深度优先的方式遍历 AST 树。

- 遍历到 Root 根对象，第一步会执行所有插件注册的 Root 事件监听器，第二步检查 Root 是否有子对象，如果有，则遍历子对象，执行子对象对应的事件监听器；如果没有子对象，则直接进入第三步，第三步会执行所有插件注册的 RootExit 事件监听器。插件注册的 Root、RootExit 事件的监听器只能是函数。函数的第一个参数是当前访问的 AST 的 Root 对象，第二个参数是 postcss 的 Result 对象和一些其他属性，通过 Result 对象可以获取 css string、opts 等信息。

```jsx
{
  Root: (rootNode, helps) => {},
  RootExit: (rootNode, helps) => {}
}

```

- 遍历到 Rule 对象，则和访问 Root 根对象是一样的逻辑，先执行所有插件注册的 Rule 事件监听器，再遍历子对象，最后执行所有插件注册的 RuleExit 事件监听器。插件注册的 Rule、RuleExit 事件的监听器只能是函数。

```jsx
{
  Rule: (ruleNode, helps) => {},
  RuleExit: (ruleNode, helps) => {}
}

```

- 遍历到 AtRule 对象。插件注册的 AtRule 的事件监听器可以是函数，也可以是对象。对象类型的监听器，对象属性的 key 是 AtRule 对象的 name 值，value 是函数。AtRuleExit 是一样的逻辑。事件的执行顺序是：`['AtRule', 'AtRule-import', CHILDREN, 'AtRuleExit', 'AtRuleExit-import']`。CHILDREAN 代表子节点的事件。``` // 函数 { AtRule: (atRuleNode, helps) => {} }

```jsx
// 对象
{
  AtRule: {
      import: (atRuleNode, helps) => {},
      keyframes: (atRuleNode, helps) => {}
  }
}

```

- 遍历到 Declaration 对象。插件注册的 Declaration 的事件监听器可以是函数，也可以是对象，对象属性的 key 是 Declaration 对象的 prop 值，value 是函数。DeclarationExitExit 是一样的逻辑。事件的执行顺序是：`['Declaration', 'Declaration-color', 'DeclarationExit', 'DeclarationExit-color']`。Declaration 没有子对象，只需要执行当前对象的事件，不需要深度执行子对象的事件。

```jsx
// 函数
{
  Declaration: (declarationNode, helps) => {}
}

// 对象
{
  Declaration: {
      color: (declarationNode, helps) => {},
      border: (declarationNode, helps) => {}
  }
}

```

- 遍历到 Comment 对象。依次执行所有插件注册的 Comment 事件监听器，再执行所有插件注册的 CommentExit 事件监听器。

### **第二类监听器**

除以特定属性或者规则命名的事件监听器，PostCSS 还有以下四个：

```jsx
{
  postcssPlugin: string,
  prepare: (result) => {},
  Once: (root, helps) => {},
  OnceExit: (root, helps) => {},
}

```

PostCSS 插件事件的整体执行是：`[prepare, Once, ...一类事件，OnceExit]`，postcssPlugin 是插件名称，不是事件监听器。

- postcssPlugin：字符串类型，插件的名字，在插件执行报错，提示用户是哪个插件报错了。
- prepare：函数类型，prepare 是最先执行的，在所有事件执行前执行的，插件多个监听器间共享数据时使用。prepare 的入参是 Result 对象，返回值是监听器对象，通过 Result 对象可以获取 css string、opts 等信息。

```jsx
{
  postcssPlugin: "PLUGIN NAME",
  prepare(result) {
    const variables = {};
    return {
      Declaration(node) {
        if (node.variable) {
          variables[node.prop] = node.value;
        }
      },
      OnceExit() {
        console.log(variables);
      },
    };
  },
};

```

- Once：函数类型，在 prepare 后，一类事件前执行，Once 只会执行一次。

```jsx
{
   Once: (root, helps) => {}
}

```

- OnceExit: 函数类型，在一类事件后执行，OnceExit 只会执行一次。

## **generate**

generate 的过程依旧是以深度优先的方式遍历 AST 对象，针对不同的实例对象进行字符串的拼接。算法对应源码中位置是：[postcss/lib/stringifier.js](https://github.com/postcss/postcss/blob/main/lib/stringifier.js#L27)中的`stringify`方法。

## 开发插件

[writing-a-plugin](https://github.com/postcss/postcss/blob/main/docs/writing-a-plugin.md)