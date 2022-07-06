# React技巧之理解Eslint规则

原文链接：[https://bobbyhadz.com/blog/react-hooks-exhaustive-deps](https://bobbyhadz.com/blog/react-hooks-exhaustive-deps)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 起因

当我们在`effect`钩子中缺少依赖时，`react-hooks/exhaustive-deps`规则会警告我们。要摆脱这个警告，可以把函数或变量声明移到`useEffect`钩子里面，把每次渲染都会变化的数组和对象记忆存储，或者禁用这个规则。

下面是一个如何引起警告的例子。

```jsx
import React, {useEffect, useState} from 'react';

export default function App() {
  const [address, setAddress] = useState({country: '', city: ''});

  // 👇️ objects/arrays are different on re-renders
  // they are compared by reference (not by contents)
  const obj = {country: 'Germany', city: 'Hamburg'};

  useEffect(() => {
    setAddress(obj);
    console.log('useEffect called');

    // ⛔️ React Hook useEffect has a missing dependency: 'obj'.
    // Either include it or remove the dependency array. eslintreact-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Country: {address.country}</h1>
      <h1>City: {address.city}</h1>
    </div>
  );
}
```

代码片段的问题在于，我们在`useEffect`钩子内部使用了`obj`变量，但是我们没有把它包含在依赖数组里。

最明显的解决方法是将`obj`变量添加到`useEffect`钩子的依赖数组中。

然而，在这种情况下，它会导致一个错误，因为对象和数组在JavaScript中是通过引用进行比较的。

`obj`变量是一个对象，在每次重新渲染时都有相同的键值对，但它每次都指向内存中的不同位置，所以它将无法通过相等检查，并导致无限重渲染循环。

> 在JavaScript中，数组也是通过引用进行比较的。
> 

## 禁用

绕过 "React Hook useEffect has a missing dependency "的警告的一个方法是禁用单行或整个文件的`eslint`规则。

```jsx
import React, {useEffect, useState} from 'react';

export default function App() {
  const [address, setAddress] = useState({country: '', city: ''});

  // 👇️ objects/arrays are different on re-renders
  const obj = {country: 'Germany', city: 'Hamburg'};

  useEffect(() => {
    setAddress(obj);
    console.log('useEffect called');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Country: {address.country}</h1>
      <h1>City: {address.city}</h1>
    </div>
  );
}
```

依赖数组上方的注释禁用了单行的 `react-hooks/exhausting-deps` 规则。

> 当`useEffect`钩子作为第二参数传递一个空数组时，它只在组件挂载时被调用。
> 

## 移动到钩子内部

另一个解决办法是，将变量或者函数声明移动到`useEffect`钩子内部。

```jsx
import React, {useEffect, useState} from 'react';

export default function App() {
  const [address, setAddress] = useState({country: '', city: ''});

  useEffect(() => {
    // 👇️ move object / array / function declaration
    // inside of the useEffect hook
    const obj = {country: 'Germany', city: 'Hamburg'};

    setAddress(obj);
    console.log('useEffect called');
  }, []);

  return (
    <div>
      <h1>Country: {address.country}</h1>
      <h1>City: {address.city}</h1>
    </div>
  );
}
```

我们将对象的变量声明移动到`useEffect`钩子内部。这样就消除了警告，因为这个钩子不再依赖外部对象。

## 移动到组件外部

另一种不怎么常用，但是最好了解一下的解决办法是，将函数或者变量的声明移动到组件的外部。

```jsx
import React, {useEffect, useState} from 'react';

// 👇️ move function/variable declaration outside of component
const obj = {country: 'Germany', city: 'Hamburg'};

export default function App() {
  const [address, setAddress] = useState({country: '', city: ''});

  useEffect(() => {
    setAddress(obj);
    console.log('useEffect called');
  }, []);

  return (
    <div>
      <h1>Country: {address.country}</h1>
      <h1>City: {address.city}</h1>
    </div>
  );
}
```

这样是有用的，是因为每当组件重新渲染时，变量不会重新创建。在所有的渲染中，变量指向相同的内存地址，因此useEffect钩子不需要将其作为依赖数组进行跟踪。

## 使用useMemo

另一种解决办法是，使用`useMemo`钩子得到一个记忆值。

```jsx
import React, {useMemo, useEffect, useState} from 'react';

export default function App() {
  const [address, setAddress] = useState({country: '', city: ''});

  // 👇️ get memoized value
  const obj = useMemo(() => {
    return {country: 'Germany', city: 'Hamburg'};
  }, []);

  useEffect(() => {
    setAddress(obj);
    console.log('useEffect called');

    // 👇️ safely include in dependencies array
  }, [obj]);

  return (
    <div>
      <h1>Country: {address.country}</h1>
      <h1>City: {address.city}</h1>
    </div>
  );
}
```

我们使用了`useMemo`钩子来获取在渲染期间不会改变的记忆值。

> `useMemo`钩子接收一个函数，该函数返回一个记忆值，将依赖数组作为参数。如果其中一个依赖有改变，该钩子就会重新计算记忆值。
> 

请注意，如果你正在使用一个函数，你将使用`useCallback`钩子来获得一个在渲染期间不会改变的记忆化回调。

```jsx
import React, {useMemo, useEffect, useState, useCallback} from 'react';

export default function App() {
  const [address, setAddress] = useState({country: '', city: ''});

  // 👇️ get memoized callback
  const sum = useCallback((a, b) => {
    return a + b;
  }, []);

  // 👇️ get memoized value
  const obj = useMemo(() => {
    return {country: 'Germany', city: 'Santiago'};
  }, []);

  useEffect(() => {
    setAddress(obj);
    console.log('useEffect called');

    console.log(sum(100, 100));

    // 👇️ safely include in dependencies array
  }, [obj, sum]);

  return (
    <div>
      <h1>Country: {address.country}</h1>
      <h1>City: {address.city}</h1>
    </div>
  );
}
```

`useCallback`钩子接收一个内联回调函数和一个依赖数组，并返回一个记忆化的回调版本，只有当其中一个依赖发生变化时才会改变。

如果这些建议对你的使用情况都不起作用，你总是可以用注释来使警告闭嘴。