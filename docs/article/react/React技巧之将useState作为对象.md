# React技巧之将useState作为对象

原文链接：[https://bobbyhadz.com/blog/react-type-usestate-object](https://bobbyhadz.com/blog/react-type-usestate-object)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 将useState作为对象

要在React中用一个对象来类型声明useState钩子，可以使用钩子泛型。比如说，`const [employee, setEmployee] = useState<{name: string; salary: number}>({name: '',salary: 0})` 。state变量只接收特定类型的键值对。

```tsx
// App.tsx

import {useEffect, useState} from 'react';

const App = () => {
  // 👇️ const employee: {name: string; salary: number;}
  const [employee, setEmployee] = useState<{name: string; salary: number}>({
    name: '',
    salary: 0,
  });

  useEffect(() => {
    setEmployee({name: 'James', salary: 100});
  }, []);

  return (
    <div>
      <h2>Name: {employee.name}</h2>
      <h2>Salary: {employee.salary}</h2>
    </div>
  );
};

export default App;
```

我们使用泛型来准确的类型声明`useState`钩子，同时使用一个对象来初始化钩子。

有时候你可能不想给对象所有的属性设置初始值。在这种情况下，你可以将属性标记为可选的。

```tsx
// App.tsx

import {useEffect, useState} from 'react';

const App = () => {
  // 👇️ mark salary as optional
  const [employee, setEmployee] = useState<{
    name: string; salary?: number
  }>({
    name: '',
  });

  useEffect(() => {
    setEmployee({name: 'James', salary: 100});
  }, []);

  return (
    <div>
      <h2>Name: {employee.name}</h2>
      <h2>Salary: {employee.salary}</h2>
    </div>
  );
};

export default App;
```

这里我们使用了`?`来将`salary`属性标记为可选的。此时该属性既可以是`undefined`，也可以是`number`类型。这就是为什么我们不需要在初始化`state`对象时提供该属性。

如果你为对象的所有属性提供了初始值，TypeScript将会推断`state`变量的类型。

```tsx
// App.tsx

import {useEffect, useState} from 'react';

const App = () => {
  // 👇️ const employee: {name: string;salary: number;}
  // ✅ typed correctly without a generic
  const [employee, setEmployee] = useState({
    name: '',
    salary: 0,
  });

  useEffect(() => {
    setEmployee({name: 'James', salary: 100});
  }, []);

  return (
    <div>
      <h2>Name: {employee.name}</h2>
      <h2>Salary: {employee.salary}</h2>
    </div>
  );
};

export default App;
```

我们为对象的所有属性传递了初始值，这使得TypeScript能够正确类型声明`employee`变量**。**

> 然而，最佳实践是总是显示的对`useState`钩子进行类型声明，特别是在处理数组和对象时。
>

在某些情况下，你可能不会事先知道你将在对象上设置的所有属性。

```tsx
// App.tsx

import {useEffect, useState} from 'react';

const App = () => {
  // 👇️ flexible object type
  const [employee, setEmployee] = useState<{[key: string]: any}>({});

  useEffect(() => {
    setEmployee({
      name: 'James',
      salary: 100,
      department: 'Dev',
      tasks: ['dev', 'test', 'ship'],
    });
  }, []);

  return (
    <div>
      <h2>Name: {employee.name}</h2>
      <h2>Salary: {employee.salary}</h2>
    </div>
  );
};

export default App;
```

`{[key: string]: any}`语法是TypeScript中的索引签名，被用于我们不知道一个类型的所有属性名称和值的形状时。当你事先不知道对象的所有属性时，可以使用该方法。

如果你想为对象属性设置多个类型，可以使用联合类型。

```tsx
// App.tsx

import {useEffect, useState} from 'react';

const App = () => {
  const [employee, setEmployee] = useState<{
    name: string;
    // 👇️ string OR number
    salary: string | number;
  }>({
    name: '',
    salary: '',
  });

  useEffect(() => {
    setEmployee({name: 'James', salary: 100});
  }, []);

  return (
    <div>
      <h2>Name: {employee.name}</h2>
      <h2>Salary: {employee.salary}</h2>
    </div>
  );
};

export default App;
```

我们使用联合类型将`salary`属性设置为`string`或者`number`类型。也可以把你传递给泛型的类型提取成一个类型别名或一个接口。

```tsx
// App.tsx

import {useEffect, useState} from 'react';

type Employee = {
  name: string;
  salary: number;
};

const App = () => {
  // 👇️ const employee: {name: string; salary: number;}
  const [employee, setEmployee] = useState<Employee>({
    name: '',
    salary: 0,
  });

  useEffect(() => {
    setEmployee({name: 'James', salary: 100});
  }, []);

  return (
    <div>
      <h2>Name: {employee.name}</h2>
      <h2>Salary: {employee.salary}</h2>
    </div>
  );
};

export default App;
```

`useState<Employee>`语法会更容易阅读，尤其是当处理大的对象时。
