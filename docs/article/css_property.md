# CSS @property初探

根据 [MDN -- CSS Property](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@property)，`@property CSS at-rule` 是 `CSS Houdini API` 的一部分, 它允许开发者显式地定义他们的 CSS 自定义属性，允许进行属性类型检查、设定默认值以及定义该自定义属性是否可以被继承。

`CSS Houdini` 又是什么呢，`CSS Houdini` 开放 CSS 的底层 API 给开发者，使得开发者可以通过这套接口自行扩展 CSS，并提供相应的工具允许开发者介入浏览器渲染引擎的样式和布局流程中，使开发人员可以编写浏览器可以解析的 CSS 代码，从而创建新的 CSS 功能。

## 示例

```html
<style>
@property --property-name {
  syntax: '<color>';
  inherits: false;
  initial-value: #fff;
}

p {
    color: var(--property-name);
}
</style>
```

解释如下：

- `@property --property-name` 中的 `--property-name` 就是自定义属性的名称，定义后可在 CSS 中通过 `var(--property-name)` 进行引用
- syntax：该自定义属性的语法规则，也可以理解为表示定义的自定义属性的类型
- inherits：是否允许继承
- initial-value：初始值

其中，`@property` 规则中的 `syntax` 和 `inherits` 描述符是必需的。

在 `JavaScript` 中的写法如下：

```js
<script>
CSS.registerProperty({
  name: "--property-name",
  syntax: "<color>",
  inherits: false,
  initialValue: "#c0ffee"
});
</script>
```

## 支持syntax的语法类型

- length
- number
- percentage
- length-percentage
- color
- image
- url
- integer
- angle
- time
- resolution
- transform-list
- transform-function
- custom-ident (a custom identifier string)

### syntax 中的 +、#、| 符号

定义的 `CSS @property` 变量的 `syntax` 语法接受一些特殊的类型定义。

`syntax: '<color#>'` ：接受逗号分隔的颜色值列表
`syntax: '<length+>'` ：接受以空格分隔的长度值列表
`syntax: '<length | length+>'`：接受单个长度或者以空格分隔的长度值列表

## 渐变

前置知识，背景的线性渐变和径向渐变不支持过渡，但是可以使用`@property`来实现。

```css
@property --houdini-colorA {
  syntax: '<color>';
  inherits: false;
  initial-value: #fff;
}
@property --houdini-colorB {
  syntax: '<color>';
  inherits: false;
  initial-value: #000;
}
.property {
    background: linear-gradient(45deg, var(--houdini-colorA), var(--houdini-colorB));
    transition: 1s --houdini-colorA, 1s --houdini-colorB;
    
    &:hover {
        --houdini-colorA: yellowgreen;
        --houdini-colorB: deeppink;
    }
}
```

需要关注的是，我们设定的过渡语句 `transition: 1s --houdini-colorA, 1s --houdini-colorB`，在这里，我们是针对 `CSS Houdini` 自定义变量设定过渡，而不是针对 `background` 设定过渡动画。
