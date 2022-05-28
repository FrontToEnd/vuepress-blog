# React技巧之具有空对象初始值的useState

原文链接：[https://bobbyhadz.com/blog/react-typescript-usestate-empty-object](https://bobbyhadz.com/blog/react-typescript-usestate-empty-object)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 类型声明useState

要在React中用一个空对象的初始值来类型声明`useState`钩子，可以使用钩子泛型。比如说：`const [employee, setEmployee] = useState<{[key: string]: any}>({})` 。`state`变量将被类型化为一个具有动态属性和值的对象。

```tsx
// App.tsx

import {useEffect, useState} from 'react';

const App = () => {
  // 👇️ const employee: {[key: string]: any;}
  const [employee, setEmployee] = useState<{[key: string]: any}>({});

  useEffect(() => {
    setEmployee({
      name: 'Alice',
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

`{[key: string]: any}`是`TypeScript`中的索引签名语法，当我们不清楚一个类型的所有属性名称和值的时候，就可以使用索引签名。

> 示例中的索引签名意味着，当一个对象的索引是`string`时，将返回类型为`any`的值。
>

当你事先不知道对象的所有属性时，你可以使用这种方法。

你可以尝试用一个索引签名来覆盖一个特定属性的类型。

```tsx
// App.tsx

import {useEffect, useState} from 'react';

type Employee = {
  [key: string]: any;
  age?: number;
  tasks?: string[];
};

const App = () => {
  // 👇️ const employee: {[key: string]: any;}
  const [employee, setEmployee] = useState<Employee>({});

  useEffect(() => {
    setEmployee({
      name: 'Alice',
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

我们将`age`和`tasks`属性标记为可选，并明确的为它们指定了类型。可选属性既可以拥有`undefined`值，也可以拥有指定的类型。这就是为什么我们仍然能够将`state`对象初始化为空对象。

> 然而，为我们事先知道的属性提供类型是十分有用的，因为`age`和`tasks`属性只能被设置为指定的类型。
>

如果对象的属性可以是多个类型，那么就是用联合类型。

```tsx
import {useEffect, useState} from 'react';

type Employee = {
  [key: string]: any;
  // 👇️ age is number OR string
  age?: number | string;
  tasks?: string[] | number[];
};

const App = () => {
  // 👇️ const employee: {[key: string]: any;}
  const [employee, setEmployee] = useState<Employee>({});

  useEffect(() => {
    setEmployee({
      name: 'Alice',
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

我们使用了联合类型来将`age`属性设置为`number`类型或者`string`类型。

你可以重复上述过程，根据实际情况来包括尽可能多的类型。
