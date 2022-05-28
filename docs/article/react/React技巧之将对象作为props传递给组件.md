# React技巧之将对象作为props传递给组件

原文链接：[https://bobbyhadz.com/blog/react-typescript-pass-object-as-props](https://bobbyhadz.com/blog/react-typescript-pass-object-as-props)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

在React TypeScript中将对象作为`props`传递给组件：

1. 为对象的类型定义一个接口。
2. 将一个指定类型的对象传递给子组件，例如：`<Employee {...obj} />` 。

```tsx
// App.tsx

interface EmployeeProps {
  name: string;
  age: number;
  country: string;
}

function Employee({name, age, country}: EmployeeProps) {
  return (
    <div>
      <h2>{name}</h2>
      <h2>{age}</h2>
      <h2>{country}</h2>
    </div>
  );
}

export default function App() {
  const obj = {name: 'Alice', age: 29, country: 'Austria'};

  return (
    <div>
      <Employee {...obj} />
    </div>
  );
}
```

## 详情

我们使用扩展运算符语法(`...`)将一个对象的属性作为`props`传递给一个组件。

`EmployeeProps`接口表示一个具有3个属性的对象。

> 思考这个语法的一个简单方法是，我们在预期有0个或更多键值对的地方取出对象的属性。
>

```tsx
// App.js

const obj2 = {...{a: 1, b: 2}};

console.log(obj2); // 👉️ {a: 1, b: 2}
```

现在`Employee` 组件可以解构并使用所有已传递的`props`。

有时你可能不会事先知道所有对象属性的名称和类型。

```tsx
// App.tsx

interface EmployeeProps {
  [key: string]: any; // 👈️ allows dynamic keys and values
  name: string;
  age: number;
  country: string;
}

function Employee({name, age, country, tasks, salary}: EmployeeProps) {
  return (
    <div>
      <h2>{name}</h2>
      <h2>{age}</h2>
      <h2>{country}</h2>
      <h2>{salary}</h2>

      <h2>{JSON.stringify(tasks)}</h2>
    </div>
  );
}

export default function App() {
  const obj = {name: 'Alice', age: 29, country: 'Austria'};

  // 👇️ can pass properties we haven't specified in advance
  const obj2 = {tasks: ['dev', 'test'], salary: 100};

  return (
    <div>
      <Employee {...obj} {...obj2} />
    </div>
  );
}
```

`{[key: string]: any}` 语法是`TypeScript`中的索引签名，当我们无法提前得知一个类型所有的属性和值的类型时，就可以使用该语法。

> 示例中的索引签名意味着，当对象被索引为`string`时，将会返回`any`类型的值。
>

示例中的`EmployeeProps` 意味着，可以向组件传递`name`、`age`和`country` 指定属性，也可以向组件传递其他指向任何类型值的动态键。
如果你想要一个具有动态键和值的对象，而不要必需属性，那么就移除`name`、`age`和`country`属性，只保留索引签名。

如果你把整个对象作为`prop`传递，你将不得不在子组件中访问该对象的属性。

```tsx
// App.tsx

interface EmployeeProps {
  data: { // 👈️ have to nest properties
    name: string;
    age: number;
    country: string;
  };
}

function Employee({data}: EmployeeProps) {
  return (
    <div>
      <h2>{data.name}</h2>
      <h2>{data.age}</h2>
      <h2>{data.country}</h2>
    </div>
  );
}

export default function App() {
  const obj = {name: 'Alice', age: 29, country: 'Austria'};

  // 👇️ passing data prop that is an object
  return (
    <div>
      <Employee data={obj} />
    </div>
  );
}
```

需要注意的是，我们必须在接口中指定`data`属性。

你可以通过更深一层的解构来避免访问`data`对象上的每个属性。

```tsx
// App.tsx

interface EmployeeProps {
  data: {
    name: string;
    age: number;
    country: string;
  };
}

// 👇️ destructure one level deeper
function Employee({data: {name, age, country}}: EmployeeProps) {
  return (
    <div>
      <h2>{name}</h2>
      <h2>{age}</h2>
      <h2>{country}</h2>
    </div>
  );
}

export default function App() {
  const obj = {name: 'Alice', age: 29, country: 'Austria'};

  return (
    <div>
      <Employee data={obj} />
    </div>
  );
}
```

然而，使用扩展运算符语法(`...`)来将对象的键值对拆包为`props`时，语法就干净多了。
