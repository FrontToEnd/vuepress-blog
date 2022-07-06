# React技巧之移除状态数组中的对象

原文链接：[https://bobbyhadz.com/blog/react-remove-object-from-state-array](https://bobbyhadz.com/blog/react-remove-object-from-state-array)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

在React中，移除state数组中的对象：

1. 使用`filter()`方法对数组进行迭代。
2. 在每次迭代中，检查条件是否匹配。
3. 将`state`设置为`filter`方法返回的新数组。

```jsx
import {useState} from 'react';

export default function App() {
  const initialState = [
    {id: 1, name: 'Alice', country: 'Austria'},
    {id: 2, name: 'Bob', country: 'Belgium'},
  ];

  const [employees, setEmployees] = useState(initialState);

  const removeSecond = () => {
    setEmployees(current =>
      current.filter(employee => {
        // 👇️ remove object that has id equal to 2
        return employee.id !== 2;
      }),
    );
  };

  return (
    <div>
      <button onClick={removeSecond}>Remove second</button>

      {employees.map(({id, name, country}) => {
        return (
          <div key={id}>
            <h2>name: {name}</h2>
            <h2>country: {country}</h2>

            <hr />
          </div>
        );
      })}
    </div>
  );
}
```

![react-remove-object-from-state-array.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39cdeb7f58f54193abc5046cc6005316~tplv-k3u1fbpfcp-watermark.image?)

## Array.filter

我们使用`useState` 钩子初始化`employees`状态变量。

我们传递给`Array.filter`方法的函数将在数组的每个元素中被调用。在每次迭代中，我们检查对象中的`id`属性是否不等于2，并返回结果。

```jsx
const initialState = [
  {id: 1, name: 'Alice', country: 'Austria'},
  {id: 2, name: 'Bob', country: 'Belgium'},
];

const filtered = initialState.filter(obj => {
  // 👇️ returns truthy for all elements that
  // don't have an id equal to 2
  return obj.id !== 2;
});

// 👇️ [{id: 1, name: 'Alice', country: 'Austria'}]
console.log(filtered);
```

`filter`方法返回一个新数组，该数组只包含回调函数返回真值的元素。

> 如果所有条件都不匹配，`Array.filter`函数将会返回空数组。
> 

我们将函数传递到`setState` ，因为函数保证以当前(最新的)状态调用。

```jsx
const removeSecond = () => {
  // 👇️ current is the current state array
  setEmployees(current =>
    current.filter(employee => {
      return employee.id !== 2;
    }),
  );
};
```

当使用前一个状态计算下一个状态时，传递一个函数给`setState`。否则，如果我们所访问的`state`数组不代表最新的值，我们可能会得到一些奇怪的Race Condition。

## 逻辑与

如果需要基于多个条件来移除`state`数组中的对象，可以使用逻辑与以及逻辑或操作符。

```jsx
const initialState = [
  {id: 1, name: 'Alice', country: 'Austria'},
  {id: 2, name: 'Bob', country: 'Belgium'},
  {id: 3, name: 'Carl', country: 'Austria'},
];

const [employees, setEmployees] = useState(initialState);

const remove = () => {
  setEmployees(current =>
    current.filter(employee => {
      return employee.id !== 3 && employee.id !== 2;
    }),
  );
};
```

我们使用了逻辑与操作符，如果两边的条件都满足，将会返回真值。

## 逻辑或

下面是使用逻辑或操作符的例子。

```jsx
const initialState = [
  {id: 1, name: 'Alice', country: 'Austria'},
  {id: 2, name: 'Bob', country: 'Belgium'},
  {id: 3, name: 'Carl', country: 'Austria'},
];

const [employees, setEmployees] = useState(initialState);

const remove = () => {
  setEmployees(current =>
    current.filter(employee => {
      return employee.name === 'Alice' || employee.name === 'Carl';
    }),
  );
};
```

2个条件中的任何一个都必须评估为真值，才能将该元素添加到新数组中。换句话说，如果对象上的`name`属性等于Alice或等于Carl，该对象将被添加到新数组中。所有其他的对象都会从数组中被过滤掉。