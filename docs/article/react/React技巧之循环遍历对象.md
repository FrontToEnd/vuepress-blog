# React技巧之循环遍历对象

原文链接：[https://bobbyhadz.com/blog/react-loop-through-object](https://bobbyhadz.com/blog/react-loop-through-object)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 遍历对象的键

在React中循环遍历对象：

1. 使用`Object.keys()` 方法得到对象的键组成的数组。
2. 使用`map()`方法来迭代键组成的数组。

```jsx
export default function App() {
  const employee = {
    id: 1,
    name: 'Bob',
    salary: 123,
  };

  return (
    <div>
      {/* 👇️ iterate object KEYS */}
      {Object.keys(employee).map((key, index) => {
        return (
          <div key={index}>
            <h2>
              {key}: {employee[key]}
            </h2>

            <hr />
          </div>
        );
      })}

      <br />
      <br />
      <br />

      {/* 👇️ iterate object VALUES */}
      {Object.values(employee).map((value, index) => {
        return (
          <div key={index}>
            <h2>{value}</h2>

            <hr />
          </div>
        );
      })}
    </div>
  );
}
```

我们使用`Object.keys`方法得到对象的键组成的数组。

```jsx
const employee = {
  id: 1,
  name: 'Bob',
  salary: 123,
};

// 👇️ ['id', 'name', 'salary']
console.log(Object.keys(employee));

// 👇️ [1, 'Bob', 123]
console.log(Object.values(employee));
```

我们只可以在数组上调用`map()`方法。所以我们需要得到对象的键组成的数组，或者值组成的数组。

我们传递给`Array.map`方法的函数被调用，其中包含数组中的每个元素和当前迭代的索引。在上面的例子中，我们使用`index`作为元素上的`key`属性，如果可以的话，更好的方式是使用更加稳定的、独一无二的标识符。

当遍历对象的键时，使用对象的键作为`key`属性是安全可靠的，因为对象中的键保证是唯一的。

```jsx
export default function App() {
  const employee = {
    id: 1,
    name: 'Bob',
    salary: 123,
  };

  return (
    <div>
      {/* 👇️ iterate object KEYS */}
      {Object.keys(employee).map(key => {
        return (
          <div key={key}>
            <h2>
              {key}: {employee[key]}
            </h2>

            <hr />
          </div>
        );
      })}
    </div>
  );
}
```

然而，如果遍历对象的值，那么使用对象的值作为`key`属性是不安全的，除非你可以确保所有的值在对象中都是独一无二的。

由于性能的原因，React需要在内部使用`key`属性。这有助于库确保只重新渲染已经改变的数组元素。说到这里，你不会看到使用索引和一个稳定的、唯一的标识符之间有任何明显的区别，除非你要处理成千上万的数组元素。

## 遍历对象的值

在React中，循环遍历对象的值：

1. 使用`Object.values()` 方法得到对象的值组成的数组。
2. 使用`map()`方法迭代对象值组成的数组。

```jsx
export default function App() {
  const employee = {
    id: 1,
    name: 'Bob',
    salary: 123,
  };

  return (
    <div>
      {/* 👇️ iterate object VALUES */}
      {Object.values(employee).map((value, index) => {
        return (
          <div key={index}>
            <h2>{value}</h2>

            <hr />
          </div>
        );
      })}
    </div>
  );
}
```

### Object.values

我们使用`Object.values` 方法得到对象的值组成的数组。

```jsx
const employee = {
  id: 1,
  name: 'Bob',
  salary: 123,
};

// 👇️ [1, 'Bob', 123]
console.log(Object.values(employee));
```

如果你只想渲染对象的值，你可以使用此方法直接访问它们。

### **Object.entries**

你也可以使用`Object.entries` 方法来返回对象的键值对数组。

```jsx
export default function App() {
  const employee = {
    id: 1,
    name: 'Bob',
    salary: 123,
  };

  console.log(Object.entries(employee));

  return (
    <div>
      {Object.entries(employee).map(([key, value]) => {
        return (
          <div key={key}>
            <h2>
              {key}: {employee[key]}
            </h2>

            <hr />
          </div>
        );
      })}
    </div>
  );
}
```

下面是`Object.entries()`方法的输出。

```jsx
const employee = {
  id: 1,
  name: 'Bob',
  salary: 123,
};

// 👇️ [
//      ['id', 1],
//      ['name', 'Bob'],
//      ['salary', 123],
// ]
const result = Object.entries(employee);
console.log(result);
```

该方法返回一个包含键值对子数组的数组。

### Array.forEach()

另一种方法是使用`Array.forEach()`方法来迭代对象的键，并将JSX元素推送到一个数组中，然后我们进行渲染。

```jsx
export default function App() {
  const employee = {
    id: 1,
    name: 'Bob',
    salary: 123,
  };

  const results = [];

  Object.keys(employee).forEach(key => {
    results.push(
      <h2 key={key}>
        {key}: {employee[key]}
      </h2>,
    );
  });

  return (
    <div>
      {results}
    </div>
  );
}
```

`Array.forEach()`方法在每个键上都会被调用，然而`forEach()`方法返回`undefined`，所以我们不能直接在JSX代码中使用它。相反，我们把JSX元素推到一个数组中，然后再进行渲染。

需要注意的是，这是一个比较间接的方法，你不会在React应用程序中经常看到它的使用。