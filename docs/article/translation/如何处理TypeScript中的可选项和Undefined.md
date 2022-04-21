# 如何处理TypeScript中的可选项和Undefined

原文链接：[https://spin.atomicobject.com/2022/03/28/optional-undefined-typescript/](https://spin.atomicobject.com/2022/03/28/optional-undefined-typescript/)

作者：[MATTIE BEHRENS](https://spin.atomicobject.com/author/mattie-behrens/)

正文从这里开始~

和`JavaScript`打交道就意味着和`undefined`打交道。如果一直留意这个问题，会让我们的大脑崩溃。然而，不注意的话就会在程序中引入bug。谢天谢地，`TypeScript`是一款很好用的工具，来帮助你处理此类问题，并且写出更健壮的代码。

## 什么是undefined？

在项目中设置`TypeScript`的严格模式，将会检查代码中的所有潜在问题。我建议你尽可能的让`TypeScript`更为严格(`strict`)。

`undefined`通常会出现在几个关键地方：

1. 对象中未初始化或者不存在的属性
2. 函数中被忽略的可选参数
3. 用来表明请求值丢失的返回值
4. 可能未被初始化的变量

`TypeScript`拥有处理上述所有问题的工具。

## 告诉TypeScript属性是否是可选

使用`JavaScript`进行编程，肯定遇到过`undefined is not a function`此类错误。

当你对一个对象访问并不存在的属性时，`JavaScript`将会返回`undefined`，而不是报错。

在`TypeScript`严格模式下，这意味着下面几种情况。首先，如果你不告诉`TypeScript`一个属性是可选的，`TypeScript`会期望这个值被显式设置。

```tsx
type Foo = {
    bar: number;
}

const a: Foo = {}; // This is an error:
// Property 'bar' is missing in type '{}' but required in type 'Foo'.
// ts(2741)

const b: Foo = { bar: 11 } // This works!;
```

在类型、接口或类的定义中，在属性名称中添加`?`将会把该属性标记为**可选**的。

```tsx
type Foo = {
    bar?: number;
}

const a: Foo = {}; // This is now OK!

const b: Foo = { bar: 11 }; // This is still OK.

const c: Foo = { bar: undefined }; // This is also OK, somehow…?
```

上面示例中`c`的情况很有趣。如果你在IDE中把鼠标悬停在`Foo`上，你会看到`TypeScript`实际上已经把`bar`定义为`number | undefined`的联合类型。

尽管`a`和`c`是不同的对象，但是访问`a.bar`和`c.bar`的结果是相同的，都是`undefined`。

### 它是可选的。现在怎么办？

当然，当你遇到可选属性时，`TypeScript`会强制你去处理它。

```tsx
type Foo = {
    bar?: number;
}

function addOne(foo: Foo): number {
    return foo.bar + 1; // This is an error:
    // Object is possibly 'undefined'. ts(2532)
}
```

有好几种办法去解决这个问题。但最好的解决方式，与在`JavaScript`中的解决方式相同：检查你获取的值是否是你所期望的。

`TypeScript`可以理解这类检查，并可以使用它们来收窄对特定代码类型的检查范围（类型收窄）。

我们可以对`bar`属性使用 `typeof`， 用来检查它是否是`undefined`。

```tsx
function addOne(foo: Foo): number {
    if (typeof foo.bar !== 'undefined') {
        return foo.bar + 1;
    }
    throw new Error('bar is undefined');
}
```

这种类型检查，不仅支持上面提到的`a`对象，其中`a`对象没有`bar`属性。而且也支持`c`对象，用来表明`bar`属性是`undefined` 。

`TypeScript`也会注意这段代码。在`if`子句中，会把`bar`属性的类型收窄为`number`。

`TypeScript`也会让你使用真值检查来“逃离”，就像这样：

```tsx
function addOne(foo: Foo): number {
    if (foo.bar) {
        return foo.bar + 1;
    }
    throw new Error('bar is undefined');
}
```

需要注意的是，这段代码有一个很隐蔽的bug，那就是`0`是假值(falsy)。如果你传值为`{ foo: 0 }` ，这段代码就会抛出异常。

## 函数和方法可以具有可选参数

函数和方法可以具有可选参数，正如类型、接口和类也可以具有可选参数一样。函数和方法的可选参数也使用`?`进行标记：

```tsx
function add(a: number, b?: number): number { … }
```

在这种情况下，我们实际上没有太多的内容来讨论如何处理`b`参数。因为如果不是由调用者来提供，它将是`undefined`。而它的类型是`number | undefined` ，正如我们的可选属性一样。所以我们可以使用同样的**类型守卫**来处理它。

我稍微更改了一下代码流程，用来说明`TypeScript`的**流程控制分析**是相当灵活的。

```tsx
function add(a: number, b?: number): number {
    if (typeof b === 'undefined') return a;
    return a + b;
}
```

## 缺少某样东西时的返回值

`undefined`也可以从一些核心语言的调用中返回。严格的`TypeScript`会发现这里潜在的bug。

```tsx
function hello(who: string): string {
    return 'Hello, ' + who;
}

function helloStartingWith(letter: string): string {
    const people = ['Alice', 'Bob', 'Carol'];
    const person = people.find(name => name.startsWith(letter));
    return hello(person); // This is the error:
    // Argument of type 'string | undefined' is not assignable to
    // parameter of type 'string'.
    //  Type 'undefined' is not assignable to type 'string'.ts(2345)
}
```

现在的问题是，`person`变量的类型不是`string`，而是`string | undefined` 的联合类型。这是因为`Array.prototype.find` 在没有找到指定值的情况下会返回`undefined`。

## 使用可选链

在现代`TypeScript`中（当然也包括现代`JavaScript`），有一些优雅的功能，可以让你的生活更加轻松。假设你有一个较为复杂的类型：

```tsx
type Foo = {
    bar?: Bar
}

type Bar = {
    baz?: Baz
}

type Baz = {
    qux?: number
}
```

当嵌套不深时，我们可以使用`typeof`来进行检查。但是看看下面的表达式：

```tsx
foo.bar?.baz?.qux
```

可以肯定的是，它是`number`或者`undefined` 。如果`bar`、`baz`或`qux`中的任何一个缺失或未定义，它的最终结果将是后者`undefined` 。如果在所有属性都存在的情况下抵达表达式的末尾，最终结果将是`qux`的`number`类型的值。

这被称为**可选链**。当可选链遇到`undefined`或者`null`时，就会停止求值。

实话实说，这个例子有点刻意为之。但是在`JavaScript`框架中，对可能尚未初始化的变量进行属性访问是很常见的。或是在编写`lambda`表达式时，代码会被类型守卫弄得很臃肿。可选链`?.` 简直就是简化代码的神器。

## 断言的存在

当谈论到类时，`TypeScript`的分析可以标记那些没有显式初始化的属性，这可以为你省去一些麻烦。如果你正在使用的框架在代码运行之前，要确保你对这些属性进行设置，那么它也会产生一些麻烦。

虽然你可以把这些属性用`?`设置为可选的，从而使编译器满意。但你也会因为不得不写类型保护，从而使自己不满意。

如果你确定这些属性肯定会被设置，那么你可以使用`!` 来进行断言。`TypeScript`会认为你知道你在说些什么。

```tsx
class Foo {
    bar!: number; // This is OK, but
    baz: number;  // This isn't:
    // Property 'baz' has no initializer and is not definitely
    // assigned in the constructor. ts(2564)
}
```

## 处理可选性

你别无选择，只能在`JavaScript`中处理可选性和未定义的问题。但好消息是，有很多工具可以用来处理它们。`TypeScript`使我的`JavaScript`代码变得比以前更加健壮，而且该语言的持续发展使一切变得更好。