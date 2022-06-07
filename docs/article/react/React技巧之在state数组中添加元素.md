# React技巧之在state数组中添加元素

原文链接：[https://bobbyhadz.com/blog/react-push-to-state-array](https://bobbyhadz.com/blog/react-push-to-state-array)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

在React中使用扩展语法，将元素添加到`state`数组中。比如说，`setNames(current => [...current, 'Carl'])` 。扩展语法会解包`state`数组中现存的元素，到一个新数组中。我们可以在其中添加其他元素。

```jsx
import {useState} from 'react';

export default function App() {
  const [names, setNames] = useState(['Alice', 'Bob']);

  const handleClick = () => {
    // 👇️ push to end of state array
    setNames(current => [...current, 'Carl']);

    // 👇️ spread an array into the state array
    // setNames(current => [...current, ...['Carl', 'Delilah']]);

    // 👇️ push to beginning of state array
    // setNames(current => ['Zoey', ...current]);
  };

  return (
    <div>
      <div>
        <button onClick={handleClick}>Push to state array</button>
      </div>

      {names.map((element, index) => {
        return (
          <div key={index}>
            <h2>{element}</h2>
          </div>
        );
      })}
    </div>
  );
}
```

![push-to-state-array.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/28f2bbd8fea34241969f52e11579d2cb~tplv-k3u1fbpfcp-watermark.image?)

## 添加元素

这里我们使用`useState`钩子来管理`state`数组。注意，我们给`setState`传递了一个函数，因为函数会保证以当前(最新的)状态调用。

```jsx
setNames(current => [...current, 'Carl']);
```

当使用前一个状态计算下一个状态时，向`setState`传递一个函数。

> 否则，如果我们所访问的`state`数组不代表最新的值，我们可能会得到一些奇怪的竞态条件。
>

我们使用扩展运算符语法，来将已有数组中的元素解包到新数组中。

```jsx
const arr = ['Alice', 'Bob'];

const arr2 = [...arr, 'Carl'];

console.log(arr2); // 👉️ ['Alice', 'Bob', 'Carl']
```

上面的例子创建了一个原始数组的浅复制。在React中，不允许修改原始`state`数组，因此我们不能直接使用`push()`方法。

## 添加对象

请注意，这种方法也可以用来将一个对象推送到一个`state`数组。

```jsx
import {useState} from 'react';

export default function App() {
  const initialState = [
    {id: 1, name: 'Alice'},
    {id: 2, name: 'Bob'},
  ];
  const [employees, setEmployees] = useState(initialState);

  const handleClick = () => {
    // 👇️ push object to end of state array
    setEmployees(current => [...current, {id: 3, name: 'Carl'}]);

    // 👇️ spread an array of objects into the state array
    // setEmployees(current => [
    //   ...current,
    //   ...[
    //     {id: 3, name: 'Carl'},
    //     {id: 4, name: 'Delilah'},
    //   ],
    // ]);

    // 👇️ push object to beginning of state array
    // setEmployees(current => [{id: 3, name: 'Zoey'}, ...current]);
  };

  return (
    <div>
      <div>
        <button onClick={handleClick}>Push to state array</button>
      </div>

      {employees.map((element, index) => {
        return (
          <div key={index}>
            <h2>{element.name}</h2>
          </div>
        );
      })}
    </div>
  );
}
```

同样的方法可以用来将一个对象推送到一个`state`数组。我们只需将state数组中的元素解包到一个新数组中，并添加指定的对象即可。
