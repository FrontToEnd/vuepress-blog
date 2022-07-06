# React技巧之字符串插值

原文链接：[https://bobbyhadz.com/blog/react-string-interpolation](https://bobbyhadz.com/blog/react-string-interpolation)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

在React中，使用模板字面量进行字符串插值，比如说，`<div className={`text-white ${myClass}`}>` 。模板字面量以反引号为界限，允许我们使用美元符号和大括号`${expression}`语法来嵌入变量和表达式。

```jsx
import './App.css';

export default function App() {
  const myClass = 'bg-salmon';

  const name = 'James Doe';

  const num = 30;
  return (
    <div>
      <div className={`text-white ${myClass}`}>Some content here</div>

      <br />

      <div className={`text-white ${'hi'.length === 2 ? 'bg-salmon' : ''}`}>
        Some content here
      </div>

      <h2>Hello {name}</h2>

      <h2
        style={{
          padding: `${num + num}px`,
          backgroundColor: 'lime',
        }}
      >
        30 + 30 = {num + num}
      </h2>
    </div>
  );
}
```

下面是示例中的css声明。

```css
.bg-salmon {
  background-color: salmon;
}

.text-white {
  color: white;
}
```

![string-interpolation.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4897cc64aba1460e8713610d2079b846~tplv-k3u1fbpfcp-watermark.image?)

## 模板字面量

我们可以使用模板字面量在字符串中插入变量。需要注意的是，字符串是用反引号````包裹起来的，而不是用单引号。

美元符号和大括号语法允许我们使用占位符来求值。

```jsx
<div className={`text-white ${myClass}`}>Some content here</div>

<div className={`text-white ${'hi'.length === 2 ? 'bg-salmon' : ''}`}>
  Some content here
</div>
```

我们用大括号把模板字面量包裹起来，标志着一个必须被求值的表达式的开始。

> 开头和结尾的大括号之间的只是JavaScript代码，所以我们在模板字面量上使用的任何变量或表达式都会被求值。
> 

当你想在JSX代码中渲染变量或表达式时，你必须将代码包裹在大括号内。

```jsx
<h2>Hello {name}</h2>
```

### JSX之外

您也可以在JSX代码之外使用模板字面量。

```jsx
const num = 50;

const result = `${num + 50} percent`;

console.log(result); // 👉️ 100 percent
```

### 多行字符串

默认情况下，模板字面量将这些部分连接成一个字符串。你也可以在多行字符串中使用模板字面量来插入变量。

```jsx
const color1 = 'red';
const color2 = 'blue';

const poem = `roses are ${color1}
violets are ${color2}`;

console.log(poem);
// 👉️ roses are red
// 👉️ violets are blue
```

这是非常有用的，因为与连接字符串不同，我们不必在每一行都添加换行符。

### 调用函数

你甚至可以在模板字面量里面调用函数。

```jsx
import './App.css';

export default function App() {
  const subtract = (a, b) => {
    return a - b;
  };

  const myClass = 'bg-salmon';

  const num = 30;
  return (
    <div>
      <div
        style={{fontSize: `${subtract(60, 20)}px`}}
        className={`padding-${subtract(100, 80)} text-white ${myClass}`}
      >
        Some content here
      </div>
    </div>
  );
}
```

### 三元运算符

这里有一个示例，是在模板字面量里面使用三元运算符。

```jsx
const color1 = 'blue';
const color2 = 'red';

const result = `${color1.length > color2.length ? color1 : color2}`;

console.log(result); // 👉️ blue
```

三元运算符与`if/else`语句基本类似。问号前的部分会被求值，如果它返回一个真值，运算符会返回冒号前的值，否则会返回冒号后的值。

```jsx
import './App.css';

export default function App() {
  return (
    <div>
      <div className={`text-white ${'hi'.length === 2 ? 'bg-salmon' : ''}`}>
        Some content here
      </div>
    </div>
  );
}
```

示例中的三元运算符检查字符串`hi`的`length`属性是否等于2，如果等于2，则返回字符串`bg-salmon`，否则返回空字符串。

### 逻辑运算

你也可以在模板字面量中使用逻辑或(||)运算以及逻辑与(&&)运算。

```jsx
const num1 = 0;
const num2 = 100;

const result = `${num1 || num2}`;
console.log(result); // 👉️ 100
```

如果逻辑或运算的左侧是一个真值，那么便返回该值，否则返回右侧的值。

下面是在模板字面量中使用逻辑与运算的示例。

```jsx
const bool = true;
const str = 'hello';

const result = `${bool && str}`;
console.log(result); // 👉️ hello
```

如果逻辑与运算的左侧是一个假值，那么便返回该值，否则返回右侧的值。