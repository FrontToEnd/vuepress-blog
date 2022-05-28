# React技巧之将函数作为props传递

原文链接：[https://bobbyhadz.com/blog/react-typescript-pass-function-as-prop](https://bobbyhadz.com/blog/react-typescript-pass-function-as-prop)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

在React TypeScript中将函数作为`props`传递：

1. 在组件的接口中为函数属性定义一个类型。
2. 在父组件中定义函数。
3. 将函数作为prop传递给子组件。

```tsx
// App.tsx

interface ButtonProps {
  sum: (a: number, b: number) => number;
  logMessage: (message: string) => void;

  // 👇️ turn off type checking
  doSomething: (params: any) => any;
}

function Container({sum, logMessage, doSomething}: ButtonProps) {
  console.log(sum(10, 15));

  logMessage('hello world');

  doSomething('abc');

  return <div>Hello world</div>;
}

const App = () => {
  const sum = (a: number, b: number) => {
    return a + b;
  };

  const logMessage = (message: string) => {
    console.log(message);
  };

  return (
    <div>
      <Container sum={sum} logMessage={logMessage} doSomething={logMessage} />
    </div>
  );
};

export default App;
```

## 详情

这个例子向我们展示了在使用`TypeScript`的情况下，如何将函数作为props传递给`React`组件。

函数`sum`接收两个类型为`number`的参数，并返回`number`类型。

函数`logMessage` 接收类型为`string`的参数，且没有返回值。

> `doSomething`函数被用来展示，如果你不想将函数作为`props`传递时进行类型检查，你可以将其关闭。
>

`any`类型有效地关闭了类型检查，因此该函数可以被传递任何类型的参数，并且可以返回任何类型的值。如果使用类型别名进行类型声明，该语法依然奏效。

```tsx
// App.tsx

type ButtonProps = {
  sum: (a: number, b: number) => number;
  logMessage: (message: string) => void;

  // 👇️ turn off type checking
  doSomething: (params: any) => any;
};
```

非常重要的是，实际函数的类型要与我们在`ButtonProps`中指定的类型一致。如果不匹配，我们将得到一个类型检查错误。

一个比较常见的做法是，把事件处理函数作为props传递。

```tsx
// App.tsx

type ButtonProps = {
  handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

function Container({handleClick}: ButtonProps) {
  return <div onClick={handleClick}>Hello world</div>;
}

const App = () => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log('element clicked');
  };

  return (
    <div>
      <Container handleClick={handleClick} />
    </div>
  );
};

export default App;
```

这个代码片断和之前的代码片断，唯一看起来不同的是`event`对象的类型。该类型根据元素和事件的不同而不同（如`onChange`、`onClick`等等）。

你可以在IDE中编写处理函数，并将鼠标悬停在`event`参数上来弄清楚`event`的类型。

```tsx
// App.tsx

interface ButtonProps {
  handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function Container({handleClick}: ButtonProps) {
  // 👇️ wrote event handler inline
  return <div onClick={event => console.log(event)}>Hello world</div>;
}
```

![react-get-type-of-event.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c15f9c5f5bb42c09e5572b3e9a0ce45~tplv-k3u1fbpfcp-watermark.image?)

另一个弄清楚prop类型的好方法是，在IDE中右击它并点击 "Go to Definition（跳转到定义）"。

![style-prop-cssproperties.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/342927bba0df49fb8b969f1e016a05d5~tplv-k3u1fbpfcp-watermark.image?)
