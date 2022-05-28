# React技巧之将useState作为字符串数组

原文链接：[https://bobbyhadz.com/blog/react-typescript-usestate-empty-object](https://bobbyhadz.com/blog/react-typescript-usestate-empty-object)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 将useState作为字符串数组

要在React中用一个字符串数组来类型声明useState钩子，可以使用钩子泛型。比如说，`const [names, setNames] = useState<string[]>([])` 。state变量可以被初始化为一个空数组，或者只接收字符串值的字符串数组。

```tsx
// App.tsx

import {useState} from 'react';

const App = () => {
  // 👇️ const names: string[]
  const [names, setNames] = useState<string[]>([]);

  return (
    <div>
      <button onClick={() => setNames(prevNames => [...prevNames, 'Bob'])}>
        Add name
      </button>

      {names.map((element, index) => {
        return (
          <div key={index}>
            <h2>{element}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default App;
```

我们使用泛型来准确的对`useState`钩子进行类型声明，同时使用空数组来初始化钩子。

![react-usestate-string-array-typescript.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/710fc801799042c4899e32779384ed8f~tplv-k3u1fbpfcp-watermark.image?)
如果我们不使用泛型，比如说，`useState<string[]>([])` 。当输入钩子的时候，state变量的类型将会是`never[]` 。换句话说，就是一个永不包含任何元素的数组。

如果只为数组传入空字符串，TypeScript将会对state变量进行类型推断。

```tsx
// App.tsx

import {useState} from 'react';

const App = () => {
  // 👇️ const names: string[]
  const [names, setNames] = useState(['']);

  return (
    <div>
      <button onClick={() => setNames(prevNames => [...prevNames, 'Bob'])}>
        Add name
      </button>

      {names.map((element, index) => {
        return (
          <div key={index}>
            <h2>{element}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default App;
```

请注意，我们甚至不需要使用泛型来对状态变量进行类型声明。TypeScript能够根据提供的初始值来推断类型。

> 然而，最好的做法是总是明确地类型声明useState钩子，特别是在处理数组和对象时。
>

如果尝试对state数组添加一个不同类型的值，我们将会得到一个类型检查错误。

```tsx
// App.tsx

import {useState} from 'react';

const App = () => {
  // 👇️ const names: string[]
  const [names, setNames] = useState<string[]>([]);

  // ⛔️ Argument of type '(prevNames: string[]) => (string | number)[]' is not
  // assignable to parameter of type 'SetStateAction<string[]>'.
  setNames(prevNames => [...prevNames, 1000]);

  return (
    <div>
      <button onClick={() => setNames(prevNames => [...prevNames, 'Bob'])}>
        Add name
      </button>

      {names.map((element, index) => {
        return (
          <div key={index}>
            <h2>{element.toUpperCase()}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default App;
```

这个例子展示了，试图向一个类型为`string[]`的state数组添加一个数字会导致类型检查器出错。
