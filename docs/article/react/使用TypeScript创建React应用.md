# 使用TypeScript创建React应用

文章链接：[https://bobbyhadz.com/blog/react-create-react-app-typescript](https://bobbyhadz.com/blog/react-create-react-app-typescript)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 目录

1. 使用TypeScript创建React应用-完整指南
2. 在React TypeScript项目中类型声明props
3. 在React TypeScript中使用useState钩子
4. 在React TypeScript项目中键入事件
5. 在React TypeScript项目中键入refs

## 使用TypeScript创建React应用-完整指南

要用Typescript创建一个React应用程序，需要运行`npx create-react-app` 命令，将`--template` 标记设置为`typescript`，比如`npx create-react-app my-ts-app --template typescript`。

```bash
npx create-react-app my-ts-app --template typescript
```

如果执行命令报错，试着使用**[create-react-app](https://create-react-app.dev/docs/adding-typescript/)**最新版本的命令。

```bash
npx create-react-app@latest my-ts-app --template typescript
```

如果你已经存在使用JavaScript编写的创建React应用的项目，运行下面的命令行来添加TS的支持。

```bash
# 👇️ with NPM
npm install --save typescript @types/node @types/react @types/react-dom @types/jest

# 👇️ with YARN
yarn add typescript @types/node @types/react @types/react-dom @types/jest
```

接着重命名`.js`文件扩展为`.tsx` 。`index.js`文件会变成`index.tsx`。

然后，在项目的根目录下，使用下面的配置来创建`tsconfig.json`文件。

```json
// tsconfig.json

{
  "compilerOptions": {
    "target": "es6",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src/**/*"]
}
```

确保重启你的开发服务器和你的IDE。

> 使用`.tsx`文件扩展而不是`.ts`扩展来包含JSX代码是非常重要的。
>

不出意外的话，你的项目会产生一堆类型错误。你不得不在继续开发或者构建项目之前修复他们。

比如说`index.tsx`文件，当创建一个应用根节点时，需要使用类型断言。

```tsx
// index.ts

const root = ReactDOM.createRoot(
  document.getElementById('root') as Element
);
```

## 在React TypeScript项目中类型声明props

使用类型别名或接口来类型声明组件的props。

```tsx
// App.tsx

import React from 'react';

interface EmployeeProps {
  name: string;
  age: number;
  country: string;
  children?: React.ReactNode; // 👈️ for demo purposes
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
  return (
    <div>
      <Employee name="Alice" age={29} country="Austria" />
    </div>
  );
}
```

`Employee`组件接收我们在`EmployeeProps`接口中定义的`name`，`age`，和`country` 三个props。

你可以使用问号标记将props标记为可选，也可以在函数定义里为props设置默认值。

```tsx
// App.tsx

import React from 'react';

interface EmployeeProps {
  name?: string; // 👈️ marked optional
  age?: number; // 👈️ marked optional
  country: string;
  children?: React.ReactNode; // 👈️ for demo purposes
}

// 👇️ default values for props
function Employee({name = 'Alice', age = 29, country}: EmployeeProps) {
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
      <Employee country="Austria" />
    </div>
  );
}
```

在`EmployeeProps`接口中，`name`和`age` 被标记为可选props。因此当使用组件时，他们不是必填的。

我们为`name`和`age`设置了默认值。所以如果使用组件时没有提供，那么组件就会使用默认值。

## 在React TypeScript中使用useState钩子

使用`useState`钩子上的泛型来类型声明它要存储的值。

```tsx
// App.tsx

import {useState} from 'react';

function App() {
  // 👇️ array of strings
  const [strArr, setStrArr] = useState<string[]>([]);

  // 👇️ an array of objects
  const [objArr, setObjArr] = useState<{name: string; age: number}[]>([]);

  setStrArr(['a', 'b', 'c']);

  setObjArr([{name: 'A', age: 1}]);

  return (
    <div className="App">
      <div>Hello world</div>
    </div>
  );
}

export default App;
```

上面的例子显示了如何将状态数组，类型声明为字符串数组或对象数组。

在React中使用TypeScript时，一定要确保显式地输入空数组。

## 在React TypeScript项目中键入事件

要在React TypeScript项目中键入一个事件，请将事件处理函数内联编写，并将鼠标悬停在`event`对象上以获得其类型。

```tsx
// App.tsx

const App = () => {

  // 👇️ onClick event is written inline
  // hover over the `event` parameter with your mouse
  return (
    <div>
      <button onClick={event => console.log(event)}>Click</button>
    </div>
  );
};

export default App;
```

TypeScript能够推断出事件的类型，当它被内联编写时。这是十分有用的，因为会在所有事件上生效。只需写一个你的事件处理程序的内联 "模拟 "实现，并将鼠标悬停在事件参数上以获得其类型。

> 一旦你知道事件的类型是什么，你就能够提取你的处理函数并正确的类型声明。
>

现在我们知道本例中`onClick`事件的正确类型是，`React.MouseEvent<HTMLButtonElement, MouseEvent>` 。这样就可以提取到我们的处理函数。

```tsx
// App.tsx

import React from 'react';

const App = () => {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    console.log(event.target);
    console.log(event.currentTarget);
  };

  return (
    <div>
      <button onClick={handleClick}>Click</button>
    </div>
  );
};

export default App;
```

需要注意的是，你可以用这种方法来获取所有事件的类型，而不仅仅是`onClick`事件。

只要你把事件处理函数内联编写，并用鼠标在事件参数上悬停，TypeScript就能推断出事件的类型。

## 在React TypeScript项目中键入refs

使用`useRef`钩子上的泛型，在React TypeScript中类型声明一个`ref`。

```tsx
// App.tsx

import {useEffect, useRef} from 'react';

export default function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  return (
    <div>
      <input ref={inputRef} />
    </div>
  );
}
```

我们在一个`input`元素上设置`ref`，所以我们使用了`HTMLInputElement`或`null`的类型，因为`ref`的初始值是`null`。

> 元素类型被统一命名为`HTML***Element`。一旦你开始输入`HTML...`，你的IDE应该能够用自动完成来帮助你。
>

一些常用的类型包括：`HTMLInputElement`, `HTMLButtonElement`, `HTMLAnchorElement`, `HTMLImageElement`, `HTMLTextAreaElement`, `HTMLSelectElement`等。
