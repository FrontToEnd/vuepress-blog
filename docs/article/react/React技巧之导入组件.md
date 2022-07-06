# React技巧之导入组件

原文链接：[https://bobbyhadz.com/blog/react-import-component-from-another-file](https://bobbyhadz.com/blog/react-import-component-from-another-file)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

在React中，从其他文件中导入组件：

1. 从`A`文件中导出组件。比如说，`export function Button() {}` 。
2. 在`B`文件中导入组件。比如说，`import {Button} from './another-file'` 。
3. 在`B`文件中使用导入的组件。

## 命名导入导出

下面的例子是从一个名为`another-file.js`的文件中导入组件。

```jsx
// 👇️ named export
export function BigButton() {
  return (
    <button
      style={{padding: '2rem 1rem'}}
      onClick={() => console.log('big button')}
    >
      Big button
    </button>
  );
}

// 👇️ named export
export const SmallButton = () => {
  return (
    <button onClick={() => console.log('small button')}>Small button</button>
  );
};
```

下面是我们如何从一个名为`App.js`文件中导入组件。

```jsx
// 👇️ named import
import {BigButton, SmallButton} from './another-file';

export default function App() {
  return (
    <div>
      <BigButton />

      <hr />

      <SmallButton />
    </div>
  );
}
```

如有必要，请确保当前路径指向`another-file.js`模块。上面的例子假设`another-file.js`和`App.js`位于相同的目录下。

举例来说，如果`another-file.js`位于上层目录，你必须这样导入：`import {BigButton} from '../another-file'` 。

> 在导入组件时，我们使用大括号包裹组件名称。这被称为命名导入。
> 

`import/export`语法被称为JavaScript模块。为了能够从不同的文件中导入一个组件，必须使用命名的或默认的导出方式将其导出。上述例子使用了命名导出和导入。

命名和默认导入导出的主要不同之处在于，在每个文件中，你可以有多个命名导出，但只能有一个默认导出。

## 默认导入导出

让我们看一个例子，看看我们如何导入一个使用默认导出的组件。

```jsx
// 👇️ default export
export default function BigButton() {
  return (
    <button
      style={{padding: '2rem 1rem'}}
      onClick={() => console.log('big button')}
    >
      Big button
    </button>
  );
}
```

很重要：如果你导出一个变量（或者箭头函数）作为默认导出，你必须先声明再导出。你不能在同一行内声明变量同时默认导出变量。

```jsx
const BigButton = () =>  {
  return (
    <button
      style={{padding: '2rem 1rem'}}
      onClick={() => console.log('big button')}
    >
      Big button
    </button>
  );
}

// 👇️ default export
export default BigButton;
```

下面是如何使用默认导入来导入组件。

```jsx
// 👇️ default import
import BigButton from './another-file';

export default function App() {
  return (
    <div>
      <BigButton />
    </div>
  );
}
```

当导入组件时，我们也可以使用不同的名字，比如`Foo`。

```jsx
// 👇️ default import
import Foo from './another-file';

export default function App() {
  return (
    <div>
      <Foo />
    </div>
  );
}
```

这样也会生效，但会令人疑惑，因此应该避免。

> 根据我的经验，大多数现实世界的代码库只使用命名的导出和导入，因为它们更容易利用你的IDE进行自动完成和自动导入。
你也不必考虑哪些成员是用默认导出或命名导出的。
> 

## 混合导入导出

你也可以混合匹配，下面示例的文件使用了默认导出和命名导出。

```jsx
// 👇️ default export
export default function BigButton() {
  return (
    <button
      style={{padding: '2rem 1rem'}}
      onClick={() => console.log('big button')}
    >
      Big button
    </button>
  );
}

// 👇️ named export
export const SmallButton = () => {
  return (
    <button onClick={() => console.log('small button')}>Small button</button>
  );
};
```

下面是如何导入这两个组件。

```jsx
// 👇️ default and named imports
import BigButton, {SmallButton} from './another-file';

export default function App() {
  return (
    <div>
      <BigButton />

      <hr />

      <SmallButton />
    </div>
  );
}
```

我们使用默认导入来导入`BigButton`组件，使用命名导入来导入`SmallButton`组件。

请注意，每个文件只能有一个默认导出，但你可以根据需要有多个命名导出。