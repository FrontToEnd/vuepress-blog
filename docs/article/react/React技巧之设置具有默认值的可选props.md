# React技巧之设置具有默认值的可选props

原文链接：[https://bobbyhadz.com/blog/react-optional-props-typescript](https://bobbyhadz.com/blog/react-optional-props-typescript)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

在React TypeScript中设置具有默认值的可选`props`：

1. 用问号将类型上的`props`标记为可选。
2. 在函数定义中对`props`进行解构时提供默认值。

## 详情

```tsx
// App.tsx

interface EmployeeProps {
  name?: string; // 👈️ marked optional
  age?: number; // 👈️ marked optional
  country: string; // 👈️ required (no question mark)
}

function Employee({name = 'Alice', age = 30, country}: EmployeeProps) {
  return (
    <div>
      <h2>{name}</h2>
      <h2>{age}</h2>
      <h2>{country}</h2>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <Employee name="Bob" age={29} country="Belgium" />

      <hr />

      <Employee country="Austria" />
    </div>
  );
}
```

我们标记了`name`和`age`属性作为可选的。这意味着不管有没有提供这两个属性，组件都是可使用的。

如果可选`prop`的值没有指定，会默认设置为`undefined`。没有为`prop`指定值，和设置值为`undefined`的效果是相同的。

我们还在`Employee`组件的定义中为`name`和`age`参数设置了默认值。

```tsx
function Employee({name = 'Alice', age = 30, country}: EmployeeProps) {
  return (
    <div>
      <h2>{name}</h2>
      <h2>{age}</h2>
      <h2>{country}</h2>
    </div>
  );
}
```

对象中的`name`属性的默认值为`Alice`，所以如果不提供`name` prop，它将被赋值为`Alice`。

你也可以通过把`props`所有属性都标记为可选，来将整个`props`对象设置为可选。

```tsx
// App.tsx

interface EmployeeProps {
  name?: string; // 👈️ all marked optional
  age?: number;
  country?: string;
}

function Employee({
  name = 'Alice',
  age = 30,
  country = 'Austria',
}: EmployeeProps) {
  return (
    <div>
      <h2>{name}</h2>
      <h2>{age}</h2>
      <h2>{country}</h2>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <Employee name="Bob" age={29} country="Belgium" />

      <hr />

      <Employee />
    </div>
  );
}
```

`EmployeeProps`类型中的所有属性都被标记为可选的，因此该组件可以在不提供任何`props`的情况下使用。

我们为`Employee`组件的所有`props`设置了默认值，所以如果有任何`props`被省略了，就会使用默认值。
