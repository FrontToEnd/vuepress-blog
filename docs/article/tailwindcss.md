# Vue项目引入tailwind.css

## 安装

```sh
npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
```

由于项目中依赖的组件库的postCSS版本是7.X，使用`npm install tailwindcss`安装的版本依赖postCSS的8.X，因此需要安装指定版本。

## 配置

```
npx tailwindcss init -p
```

通过执行以上命令来生成`tailwind.config.js`和`postcss.config.js`，如果项目中存在`postcss.config.js`，则只生成前者，不会覆盖已有配置文件。

`tailwind.config.js`位于项目的根目录，默认配置如下：

```js
// tailwind.config.js
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

修改`postcss.config.js`配置：

```js
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## 引入

在项目的公共CSS文件中添加如下配置，Tailwind将在构建时将这些指令替换为基于配置的设计系统生成的所有样式：

```css
/*! @import */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

请务必添加诡异的注释`/*! @import */`，避免在开发过程中`Chrome DevTools`中的性能问题。
最后在`./src/main.js`中引入css文件即可。

## 自定义

一般来说，开发过程中使用最多的无外乎`padding` 、`margin`、`width`、`height`等属性，这些属性有一个共性就是需要指定具体的值。`tailwind.config.js`可以在`theme`下指定特殊的值来覆盖默认值。

```js
// tailwind.config.js
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      borderWidth: {
        default: '1px',
        '0': '0',
        '2': '2px',
        '4': '4px',
      },
      spacing: {
        '5': '5px',
        '10': '10px',
        '15': '15px',
        '20': '20px',
        '25': '25px',
        '30': '30px',
      },
      colors: {
        'gray-border': "#e8e8e8",
        'gray-disabled': "#c5c8ce",
        'gray-background': "#f8f8f9",
        'blue-text': "rgba(25,118,253,.85)",
        'blue-primary': "#3B91FF",
        'blue-info': "#2db7f5",
        'green-success': "#19be6b",
        'yellow-warning': "#ff9900",
        'red-error': "#ed4014",
        'black-title': '#17233d',
        'black-content': '#515a6e'
      },
    },
  },
  plugins: [],
  prefix: 'tw-',
  important: false, // Tailwind with existing CSS that has high specificity selectors
}
```

以上配置是目前项目中暂时用到的自定义值。

## 优势

- 不用想破脑袋的去给`class`命名，不用给诸如只需要声明`flex`样式来增加一个`class`。
- css文件不再增长。使用`tailwind`，所有内容都是可重用的，因此几乎不需要编写新的CSS。
- 更安全的变更，`css`是全局性的，容易引发冲突；而`class`是局部的，不需要担心会产生冲突。

与内联样式相比，有以下优点：

- 有约束的设计。使用内联样式，每个值都是一个魔术数字。使用`Tailwind`，可以从预定义的设计系统中选择样式，这将使构建外观一致的UI变得更加容易。
- 响应式设计。不能以内联样式使用媒体查询，但是可以使用`Tailwind`的响应实用程序轻松构建完全响应的界面。
- 伪类。内联样式无法定位诸如悬停或焦点之类的状态，但是`Tailwind`的伪类变体使使用实用程序类对这些状态进行样式设置变得容易。
