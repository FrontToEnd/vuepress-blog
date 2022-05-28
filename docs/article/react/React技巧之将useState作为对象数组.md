# React技巧之将useState作为对象数组

原文链接：[https://bobbyhadz.com/blog/react-typescript-usestate-empty-object](https://bobbyhadz.com/blog/react-typescript-usestate-empty-object)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 将useState作为对象数组

要在React中用一个对象数组来类型声明useState钩子，可以使用钩子泛型。比如说，`const [employees, setEmployees] = useState<{salary: number; name: string}[]>([])` ，state变量可以被初始化为一个空数组，只接受指定类型的对象。

```tsx
// App.tsx

import {useState} from 'react';

const App = () => {
  // 👇️ const employees: {salary: number;name: string;}[]
  const [employees, setEmployees] = useState<{salary: number; name: string}[]>(
    [],
  );

  return (
    <div>
      <button
        onClick={() =>
          setEmployees(prevEmployees => [
            ...prevEmployees,
            {salary: 100, name: 'Bob'},
          ])
        }
      >
        Add employee
      </button>

      {employees.map((employee, index) => {
        return (
          <div key={index}>
            <h2>
              salary: {employee.salary} / name: {employee.name}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default App;
```

我们使用泛型来准确的对`useState`钩子进行类型声明，同时使用空数组来初始化钩子。

![react-typescript-usestate-array-of-objects.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/57e84cd71cf34215908897392646766a~tplv-k3u1fbpfcp-watermark.image?)

如果我们不使用泛型，比如说，`useState<{salary: number; name: string}[]>([])` ，当对其输入钩子的时候，state变量的类型将会是`never[]` 。换句话说，就是一个永不包含任何元素的数组。

如果频繁调用`useState`钩子，你也可以使用类型别名或者接口。

```tsx
// App.tsx

import {useState} from 'react';

type Employee = {
  salary: number;
  name: string;
};

const App = () => {
  // 👇️ const employees: Employee[]
  const [employees, setEmployees] = useState<Employee[]>([]);

  return (
    <div>
      <button
        onClick={() =>
          setEmployees(prevEmployees => [
            ...prevEmployees,
            {salary: 100, name: 'Bob'},
          ])
        }
      >
        Add employee
      </button>

      {employees.map((employee, index) => {
        return (
          <div key={index}>
            <h2>
              salary: {employee.salary} / name: {employee.name}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default App;
```

我们将对象类型提取为一个类型别名，并将其作为`Employee[]`来对`useState`钩子进行类型声明。

如果我们试图向state数组添加一个不同类型的值，我们会得到一个类型检查错误。

```tsx
// App.tsx

import {useState} from 'react';

type Employee = {
  salary: number;
  name: string;
};

const App = () => {
  // 👇️ const employees: Employee[]
  const [employees, setEmployees] = useState<Employee[]>([]);

  // ⛔️ Argument of type '(prevEmployees: Employee[]) => (string | Employee)[]' is not assignable to parameter of type 'SetStateAction<Employee[]>'.
  setEmployees(prevEmployees => [...prevEmployees, 'Hello world']);

  return (
    <div>
      <button
        onClick={() =>
          setEmployees(prevEmployees => [
            ...prevEmployees,
            {salary: 100, name: 'Bob'},
          ])
        }
      >
        Add employee
      </button>

      {employees.map((employee, index) => {
        return (
          <div key={index}>
            <h2>
              salary: {employee.salary} / name: {employee.name}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default App;
```

这个例子向我们展示了，试图向一个类型为`Employee[]`的state数组添加一个字符串，会导致类型检查器报错。
