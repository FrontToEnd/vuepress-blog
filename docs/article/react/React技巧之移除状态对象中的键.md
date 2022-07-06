# React技巧之移除状态对象中的键

原文链接：[https://bobbyhadz.com/blog/react-remove-key-from-state-object](https://bobbyhadz.com/blog/react-remove-key-from-state-object)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

在React中，移除state对象中的键：

1. 使用`useState`钩子存储state对象。
2. 解构对象中需要移除的键，以及其他的属性。
3. 将state设置为其他属性。

## 解构

```jsx
import {useState} from 'react';

export default function App() {
  const initialState = {
    id: 1,
    name: 'Alice',
    salary: 100,
    department: 'development',
  };
  const [employee, setEmployee] = useState(initialState);

  const removeKey = () => {
    setEmployee(current => {
      // 👇️ remove salary key from object
      const {salary, ...rest} = current;

      return rest;
    });
  };

  return (
    <div>
      <button onClick={removeKey}>Click</button>

      <h4>{JSON.stringify(employee, null, 4)}</h4>

      <hr />

      <h2>name: {employee.name}</h2>
      <h2>department: {employee.department}</h2>
      <h2>salary: {employee.salary}</h2>
    </div>
  );
}
```

![remove-key-from-state-object.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c16f0e489274eb79aff32891badeeec~tplv-k3u1fbpfcp-watermark.image?)

为了移除`state`对象中的键，我们解构了指定的键以及其余参数，并更新`state`对象为其余参数。

## delete

同样的，你也可以使用`delete`操作符。

```jsx
import {useState} from 'react';

export default function App() {
  const initialState = {
    id: 1,
    name: 'Alice',
    salary: 100,
    department: 'development',
  };
  const [employee, setEmployee] = useState(initialState);

  const removeKey = () => {
    setEmployee(current => {
      // 👇️ create copy of state object
      const copy = {...current};

      // 👇️ remove salary key from object
      delete copy['salary'];

      return copy;
    });
  };

  return (
    <div>
      <button onClick={removeKey}>Click</button>

      <h4>{JSON.stringify(employee, null, 4)}</h4>

      <hr />

      <h2>name: {employee.name}</h2>
      <h2>department: {employee.department}</h2>
      <h2>salary: {employee.salary}</h2>
    </div>
  );
}
```

如果你决定使用`delete`操作符，请确保使用扩展语法(`…`)创建一份`state`对象的副本。我们使用扩展语法来解包对象的键值对到新的对象中，并创建了浅复制。

我们永远不应该在React中改变`state`对象或数组。

我们将函数传递到`setState` ，因为函数保证以当前(最新的)状态调用。

```jsx
const removeKey = () => {
  setEmployee(current => {
    // 👇️ create copy of state object
    const copy = {...current};

    // 👇️ remove salary key from object
    delete copy['salary'];

    return copy;
  });
};
```

当使用前一个状态计算下一个状态时，传递一个函数给`setState`。否则，如果我们所访问的`state`对象不代表最新的值，我们可能会得到一些奇怪的Race Condition。

## 总结

可以通过解构或者`delete`操作符来删除`state`对象中指定的键，同时需要在`setState`中传入函数，保证以最新的状态调用。