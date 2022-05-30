# React技巧之设置行内样式

原文链接：[https://bobbyhadz.com/blog/react-inline-styles](https://bobbyhadz.com/blog/react-inline-styles)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

在React中设置行内样式：

1. 将元素的`style` prop设置为对象。
2. 为元素的样式设置指定的属性和值。
3. 比如说，`<div style={{backgroundColor: 'salmon', color: 'white'}}>` 。

```jsx
// App.js

const App = () => {
  const stylesObj = {
    backgroundColor: 'lime',
    color: 'white',
  };

  const elementWidth = 150;

  return (
    <div>
      {/* 👇️ set inline styles directly */}
   {/* 👇️ 直接设置行内样式 */}
      <div style={{backgroundColor: 'salmon', color: 'white'}}>
        Some content
      </div>

      <br />

      {/* 👇️ set inline styles using an object variable */}
      {/* 👇️ 使用对象变量设置行内样式 */}
      <div style={stylesObj}>Some content</div>

      <br />

      {/* 👇️ set inline styles conditionally using a ternary */}
      {/* 👇️ 使用三元运算符设置行内样式 */}
      <div
        style={{
          backgroundColor: 'hi'.length === 2 ? 'violet' : 'mediumblue',
          color: 'hi'.length === 2 ? 'white' : 'mediumpurple',
        }}
      >
        Some content
      </div>

      <br />

      {/* 👇️ set inline styles interpolating a variable into a string */}
      {/* 👇️ 在字符串中插入变量，来设置行内样式 */
      <div
        style={{
          width: `${elementWidth}px`,
          backgroundColor: 'salmon',
          color: 'white',
        }}
      >
        Some content
      </div>
    </div>
  );
};

export default App;
```

上述代码示例展示了多种方式，用来在React的元素上设置行内样式。

## 方式

### 直接设置行内样式

第一个示例是直接在元素上设置行内样式。

```jsx
<div style={{backgroundColor: 'salmon', color: 'white'}}>
  Some content
</div>
```

需要注意的是，当在`style`对象上设置样式时，多单词属性诸如`background-color` 需要设置为驼峰样式。`style`属性的值被包装在两对花括号中。

> 行内样式的第一对花括号标志着表达式的开始，第二对花括号是包含样式和值的对象。

### 提取到变量中

第二个示例将样式对象提取到一个变量中。

```jsx
const App = () => {
  const stylesObj = {
    backgroundColor: 'lime',
    color: 'white',
  };

  return (
    <div>
      {/* 👇️ set inline styles using an object variable */}
      <div style={stylesObj}>Some content</div>
    </div>
  );
};

export default App;
```

当你有多个元素共享相同的样式时，你可以使用该方法。

### 三元运算符

在React中，可以使用三元运算符来有条件地设置行内样式。

```jsx
<div
  style={{
    backgroundColor: 'hi'.length === 2 ? 'violet' : 'mediumblue',
    color: 'hi'.length === 2 ? 'white' : 'mediumpurple',
  }}
>
  Some content
</div>
```

三元运算符与`if/else`语法非常相似。

> 问号前的部分会被计算，如果它返回一个真值(`truthy`)，运算符会返回冒号前的值，否则会返回冒号后的值。

示例中的三元运算符检查字符串`hi`的`length`属性是否等于`2` ，如果等于，则返回字符串`violet`作为`backgroundColor`属性的值；否则返回字符串`mediumblue`作为`backgroundColor`属性的值。

### 模板字符串

在设置行内样式时，还可以用字符串插入表达式或变量。

```jsx
const App = () => {
  const elementWidth = 150;

  return (
    <div>
      {/* 👇️ set inline styles interpolating a variable into a string */}
      <div
        style={{
          width: `${elementWidth}px`,
          backgroundColor: 'salmon',
          color: 'white',
        }}
      >
        Some content
      </div>
    </div>
  );
};

export default App;
```

在设置样式时，我们使用模板字面量来连接字符串和变量。示例中`div`元素的`width`属性被设置为`150px`。

> 请注意，字符串是用反引号``括起来的，而不是单引号。

美元符号标志和花括号语法允许我们使用占位符来求值。

### 包装器组件

React中一个常用的模式是提取父组件，使用预定义的样式来渲染`children` prop。

```jsx
function BoldText({children}) {
  return <span style={{fontWeight: 'bold'}}>{children}</span>;
}

const App = () => {
  return (
    <div>
      <p>
        Hello <BoldText>World</BoldText>
      </p>
    </div>
  );
};

export default App;
```

这是一个非常简单的示例，但是`BoldText`组件在一个元素上设置了一些样式，并渲染了它的`children`prop。

此方法通常用于定义具有通用样式的包装器组件。

### css文件

在React中编写行内样式的另一种选择是，在扩展名为`.css`的文件中编写样式。

```css
/* App.css */

.bg-salmon {
  background-color: salmon;
}

.text-white {
  color: white;
}

.font-lg {
  font-size: 2rem;
  padding: 10px 10px;
}
```

下面是导入并使用这些类的方式。

```jsx
// 👇️ import css file
import './App.css';

const App = () => {
  return (
    <div>
      <p className="bg-salmon text-white font-lg">hello world</p>
    </div>
  );
};

export default App;
```

> 当在React中导入全局`css`文件时，最佳实践是将`css`文件导入到`index.js`文件中。

`index.js`文件是React应用的入口，所以它总是会被运行。另一方面，如果将`css`文件导入到组件中，一旦组件被卸载，那么`css`样式可能会被移除。
