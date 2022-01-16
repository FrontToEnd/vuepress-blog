# 深入浅出TypeScript

本文是阅读小册 **《深入浅出TypeScript》** 的阅读笔记，对`TypeScript`感兴趣的同学请继续阅读吧。

## 原始类型

**TypeScript**的原始类型包括: **boolean、number、string、void、undefined、null、symbol、bigint。**

需要注意的是，`number`是类型，而`Number`是构造函数。

- 当函数没有返回值时，返回类型就是`void`。只有`null`和`undefined`可以赋给`void` 。
- 默认情况下 `null` 和 `undefined`是所有类型的子类型。开启`--strictNullChecks` 后，`null` 和 `undefined`只能赋值给 `any`和它们各自以及`void`。
- `number`和`bigint`类型的值不能互相赋值。

## 其他类型

1. `any`。绕过编译阶段的检查，避免使用。
2. `unknown` 。是 `any` 类型对应的安全类型。当 `unknown` 类型被确定是某个类型之前,它不能被进行任何操作，此时需要类型保护来完成类型的判断。
3. `never` 。`never` 类型表示的是那些永不存在的值的类型，`never`类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是 `never`的子类型或可以赋值给 `never`类型（除了`never`本身之外）。示例如下：

    ```tsx
    // 抛出异常的函数永远不会有返回值
    function error(message: string): never {
        throw new Error(message);
    }
    
    // 空数组，而且永远是空的
    const empty: never[] = []
    ```

4. 数组。用法示例：

    ```tsx
    const list: Array<number> = [1, 2, 3]
    const list: number[] = [1, 2, 3]
    ```

5. 元组。表示一个已知元素数量和类型的数组，各元素的类型不必相同。元组中包含的元素，必须与声明的类型一致，而且不能多、不能少，甚至顺序不能不符。堪称严格版的数组。

    ```tsx
    const x: [string, number] = ['hello', 0]
    
    // 上述元组可以看做为：
    interface Tuple extends Array<string | number> {
      0: string;
      1: number;
      length: 2;
    }
    ```

6. object。表示非原始类型。比如枚举、数组、元组都是object类型。

## 枚举类型

声明枚举类型时，如果没有显式的赋值，那么枚举值从0递增。如果显式赋值，那么后面的值从当前值递增。

```tsx
enum Direction {
    Up,
    Down,
    Left,
    Right
}
console.log(Direction.Up === 0) // true
```

枚举类型的值可以是字符串。枚举可以反向映射，也就是可以`key<=>value`。

### 常量枚举

```tsx
const enum Direction {
    Up = 'Up',
    Down = 'Down',
    Left = 'Left',
    Right = 'Right'
}

const a = Direction.Up;
```

好处是编译成`JavaScript`后，会直接去除`Direction`的声明，来提升性能。

### 联合枚举类型

```tsx
enum Direction {
    Up,
    Down,
    Left,
    Right
}

declare let a: Direction
```

将变量`a`声明为`Direction`类型，意味着声明了一个联合类型。也就是：

`Direction.Up | Direction.Down | Direction.Left | Direction.Right`

### 枚举合并

可以分开声明枚举，会自动合并。

## interface

接口可以用来描述参数的结构。接口不会去检查属性的顺序，只要相应的属性存在并且类型兼容即可。

### 可选属性和只读属性

```tsx
interface User {
    name: string
    age?: number // 可选属性
    readonly isMale: boolean // 只读属性
}
```

### 函数类型

```tsx
interface Say {
    (words: string) : string
}

interface User {
    name: string
    age?: number
    readonly isMale: boolean
    say: (words: string) => string
    say: Say // 或者使用接口描述函数类型
}
```

### 字符串索引签名

```tsx
interface Height {
  [name: string]: string // 属性值可以是任意字符串
}

interface Config {
   width?: number;
   height: Height,
   [propName: string]: any;
}
```

### 继承接口

```tsx
interface VIPUser extends User, SupperUser { // 可以继承多个接口
    broadcast: () => void
}
```

## 类

**TypeScript**的类加强了**JavaScript**中尚未引入的一些类的特性，下面进行总结。

### 抽象类

抽象类做为其它派生类的基类使用，它们一般不会直接被实例化。而且直接实例化会报错。此时需要通过子类继承抽象类。

`abstract` 关键字是用于定义抽象类和在抽象类内部定义抽象方法。

创建一个抽象类：

```tsx
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log('move');
    }
}
```

### 访问限定符

`TypeScript` 中有三类访问限定符，分别是: `public`、`private`、`protected`。

在 `TypeScript` 的类中，成员都默认为 `public`, 被此限定符修饰的成员是**可以被外部访问**。

当成员被设置为 `private`之后, 被此限定符修饰的成员是**只可以被类的内部访问**。

当成员被设置为 `protected`之后, 被此限定符修饰的成员是**只可以被类的内部以及类的子类访问**。

## 函数

`TypeScript` 为 `JavaScript` 函数添加了额外的功能，下面进行总结。

### 定义函数类型

一般来说，`TypeScript` 编译器是能『感知』到函数的类型，这也就是**类型推断**。我们也可以显示的定义函数类型，示例如下：

```tsx
// 加粗部分就是函数类型的定义
const add: **(a: number, b: number) => number** = (a: number, b: number) => a + b;
```

### 函数参数

函数参数包括**可选参数**、**默认参数**、**剩余参数**和**正常传入的参数**。

```tsx
const add = (a: number, b?: number) => a + (b ? b : 0) // 可选参数，类型为**联合类型number | undefined**
const add = (a: number, b = 1) => a + b // 默认参数
const add = (a: number, ...rest: number[]) => rest.reduce((a, b) => a + b, a) // 剩余参数rest
```

### 返回值

函数的返回值类型除了返回原始类型之外，一般还会经常返回 `any,nerver,void` 。

```tsx
function any (info: any): any {
  return info;
}

function error(message: string): never {
  throw new Error(message);
}

function void(): void {
  console.log('void');
}
```

### 重载

**函数重载**：**函数项名称相同**但输入输出类型或个数不同的**子程序**，它可以简单地称为一个单独功能可以执行多项任务的能力。

**TypeScript 的函数重载**： 为同一个函数提供**多个函数类型定义**来进行函数重载，目的是重载的 函数在调用的时候会进行**正确的类型检查**。

## 泛型

**泛型**给予开发者创造灵活、可重用代码的能力。

设计泛型的关键目的是**在成员之间提供有意义的约束**，这些成员可以是：类的实例成员、类的方法、函数参数和函数返回值。

举例如下：

```tsx
function getItem<T>(params: T): T {
  return params; // 传入参数类型和返回参数类型一致
}
```

### 泛型变量

```tsx
function getArrayLength<T>(arg: Array<T>) {
  console.log((arg as Array<any>).length)
  return arg;
}
```

### 泛型接口

泛型可以用于声明接口。

```tsx
interface returnItemFn<T> {
  (params: T): T
}

const returnItem: returnItemFn<number> = params => params // 使用泛型接口声明函数
```

### 泛型类

泛型除了可以在函数中使用，还可以在类中使用，它既可以作用于类本身，也可以作用于类的成员函数。

```tsx
class Stack<T> {
  private arr: T[] = []

  public push(item: T) {
    this.arr.push(item)
  }

  public pop() {
    this.arr.pop()
  }
}
```

### 泛型约束

我们可以用 `<T extends xx>` 的方式约束泛型。上述示例可以约束为接收`number`和`string`类型。

```tsx
type Params = number | string;

class Stack<T extends Params> {
  private arr: T[] = []

  public push(item: T) {
    this.arr.push(item)
  }

  public pop() {
    this.arr.pop()
  }
}
```

使用**索引类型**进行实现 `<U extends keyof T>`，我们用**索引类型** `keyof T` 把传入的对象的属性类型取出生成一个**联合类型**，这里的泛型 U 被约束在这个**联合类型**中。

```tsx
function getValue<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key];
}
```

使用**交叉类型**进行多类型约束。

```tsx
interface FirstInterface {
  one(): number
}

interface SecondInterface {
  two(): string
}

class Union<T extends FirstInterface & SecondInterface> {
  private genericProperty: T

  use() {
    this.genericProperty.one();
    this.genericProperty.two();
  }
}
```

### 泛型与new

默认情况下，泛型不能构造，需要**声明泛型为构造函数**。

```tsx
function factory<T>(type: { new(): T }): T {
  return new type();
}
```

参数 `type` 的类型 `{new(): T}` 就表示此泛型 T 是可被构造的。

## 类型断言和类型守卫

### 类型断言

使用类型断言告诉编译器我知道我在做什么，但是不要滥用。

```tsx
interface Person {
  name: string;
  age: number;
}

const person = {} as Person; // 类型断言为Person接口

person.name = 'xx';
person.age = 18;
```

双重断言可以规避编译器的一些报错，但是不建议使用。

```tsx
interface Person {
  name: string;
  age: number;
}

const person = 'xx' as any as Person; // 双重断言为Person接口
```

### 类型守卫

**类型守卫**就是缩小类型的范围。以下方式可以进行类型守卫：

1. `instanceof`

2. in

3. 字面量类型守卫

4. `typeof`

下面示例分别代表四种类型守卫：

```tsx
if (arg instanceof Person) {}
if ('name' in Person) {}
if (arg.name === 'chuck') {}
if (typeof name === 'string') {}
```

## 类型兼容性

**类型兼容性**用于确定一个类型是否能赋值给其他类型。

### 结构类型

`TypeScript` 里的类型兼容性是基于「结构类型」的，结构类型是一种只使用其成员来描述类型的方式。其基本规则是，如果 x 要兼容 y，那么 y 至少具有与 x 相同的属性。

### 函数参数兼容性

x 的每个参数必须能在 y 里找到对应类型的参数。注意：只看类型，不看参数名称。

```tsx
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK
x = y; // Error 不能将类型“(b: number, s: string) => number”分配给类型“(a: number) => number”。
```

当参数为可选时，如果是严格检测模式，那么**可选类型无法兼容必选类型**，因为可选类型可能是`undefined` 。

### 枚举类型兼容性

枚举与数字类型相互兼容。

```tsx
enum Status {
  Ready,
  Waiting
}

let status = Status.Ready;
let num = 0;

status = num;
num = status;
```

### 类的类型兼容性

仅仅只有实例成员和方法会相比较，构造函数和静态成员不会被检查。

```tsx
class Animal {
  feet: number;
  constructor(name: string, numFeet: number) {}
}

class Size {
  feet: number;
  constructor(meters: number) {}
}

let a: Animal;
let s: Size;

a = s; // OK
s = a; // OK
```

私有的和受保护的成员必须来自于相同的类。

### 泛型类型兼容性

泛型本身就是不确定的类型,它的表现根据**是否被成员使用而不同**。

```tsx
interface Person<T> { // 没有被成员使用，ok

}

let x : Person<string>
let y : Person<number>

x = y // ok
y = x // ok

interface Person<T> { // 被成员name使用，不ok
    name: T
}

let x : Person<string>
let y : Person<number>

x = y // 不能将类型“Person<number>”分配给类型“Person<string>”。
y = x // 不能将类型“Person<string>”分配给类型“Person<number>”。
```

## 高级类型

### 交叉类型

**交叉类型**是将多个类型合并为一个类型。它包含了所需的所有类型的特性。

交叉类型可以方便我们进行混入对象的属性：

```tsx
interface IAnyObject {
    [prop: string]: any
}

function mixin<T extends IAnyObject, U extends IAnyObject>(first: T, second: U): T & U {
    const result = <T & U>{};
    for (let id in first) {
      (<T>result)[id] = first[id];
    }
    for (let id in second) {
      if (!result.hasOwnProperty(id)) {
        (<U>result)[id] = second[id];
      }
    }
  
    return result;
  }
  
  const x = mixin({ a: 'hello' }, { b: 42 });
  
  // 现在 x 拥有了 a 属性与 b 属性
  const a = x.a;
  const b = x.b;
```

### 联合类型

**联合类型**表示一个值可以是几种类型之一。

```tsx
const wrapRaf = ref<HTMLDivElement | null>(null); // vue3中声明一个dom元素的引用

const fn = (a?: number) => {} // 可选参数a的类型就是联合类型 number | undefined
```

### 类型别名

**类型别名**会给一个类型起个新名字，类型别名有时和接口很像，但是可以作用于原始值、联合类型、元组以及其它任何你需要手写的类型。

```tsx
type some = boolean | number;
type Container<T> = { value: T };
type Tree<T> = { // 属性中引用自己
    value: T;
    left: Tree<T>;
    right: Tree<T>;
}
```

如何区分类型别名和接口？

`interface`只能用于**定义对象类型**，而 `type`的声明方式除了对象之外还可以**定义交叉、联合、原始类型**等，类型声明的方式适用范围显然更加广泛。

但是`interface`也有其特定的用处：

- `interface`方式可以实现接口的 `extends`和 `implements`
- `interface`可以实现接口合并声明

## 可辨识联合类型

首先介绍下**字面量类型**和**类型字面量**的概念。两者没有什么关系，但是名字很像容易混淆。

### 字面量类型

**字面量**（Literal Type）主要分为 **真值字面量类型**（boolean literal types）,**数字字面量类型**（numeric literal types）,**枚举字面量类型**（enum literal types）,**大整数字面量类型**（bigInt literal types）和**字符串字面量类型**（string literal types）。

```tsx
const a: 886 = 886; // ok
const site: 'chuck' = 'chuck'; // ok
```

字面量类型要和实际值的字面量一一对应，如果不一致就会报错。字面量类型有何作用？

当其与联合类型结合的时候，可以达到模拟枚举的效果：

```tsx
type Direction = 'North' | 'East' | 'South' | 'West'; // 该类型别名只有指定的四个方向值
```

### 类型字面量

**类型字面量**(Type Literal)跟 JavaScript 中的对象字面量的语法很相似。

```tsx
type Foo = {
  baz: [
    number,
    'chuck'
  ];
  toString(): string;
  readonly [Symbol.iterator]: 'github';
  0x1: 'foo';
  "bar": 12n;
};
```

一定程度上类型字面量可以代替接口。

### 可辨识联合类型

```tsx
type UserAction = | {
    id: number
    action: 'delete'
    info: Info
} |
{
    action: 'create'
    info: Info
}

const UserReducer = (userAction: UserAction) => {
    switch (userAction.action) { // 可辨识的标签
        case 'delete':
            console.log(userAction.id);
            break;
        default:
            break;
    }
}
```

实现上述模式需要满足：

- 具有普通的单例类型属性—可辨识的特征,上文中就是 `delete` 与 `create` 两个有唯一性的字符串字面量
- 一个类型别名包含**联合类型**
- 类型守卫的特性,比如我们必须用 `if` `switch` 来判断 `userAction.action` 是属于哪个类型作用域即 `delete` 与 `create`

## 装饰器

**装饰器**(decorator)最早在 `Python` 中被引入,它的主要作用是给一个已有的方法或类扩展一些新的行为，而不是去直接修改它本身。

该语法推进较为缓慢，需要进行配置方可使用。

在 `JavaScript` 中我们需要 `Babel` 插件 `babel-plugin-transform-decorators-legacy` 来支持 `decorator`,而在 Typescript 中我们需要在 `tsconfig.json` 里面开启支持选项 `experimentalDecorators` 。

1. 目前装饰器本质上是一个函数,`@expression` 的形式其实是一个语法糖, expression 求值后必须也是一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。
2. `JavaScript`中的 `Class`其实也是一个语法糖。

## 高级类型

### 索引类型

先来了解两个类型操作符：**索引类型查询操作符**和**索引访问操作符**。

`keyof`，即索引类型查询操作符，我们可以用 `keyof`作用于泛型 `T` 上来获取泛型 `T` 上的所有 `public`属性名构成联合类型。

```tsx
class Images {
    public src: string = 'https://www.google.com.hk/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
    public alt: string = '谷歌'
    public width: number = 500
}

type propsNames = keyof Images // type propsNames = 'src' | 'alt' | 'width'
```

与 `JavaScript`种访问属性值的操作类似，访问类型的操作符也是通过 `[]` 来访问的，即 `T[K]`。

实现TS版的`pick`函数：

```tsx
function pick<T, K extends keyof T>(o: T, names: K[]): T[K][] {
	return names.map(n => o[n]);
}
```

### 映射类型

**映射类型**的语法是`[K in Keys]`:

- `K`：类型变量，依次绑定到每个属性上，对应每个属性名的类型
- `Keys`：字符串字面量构成的联合类型，表示一组属性名（的类型）

实现TS的可选类型函数：

```tsx
type partial<T> = { [K in keyof T]?: T[K] }
```

### 条件类型

**条件类型**表示非统一的类型,以一个条件表达式进行类型关系检测，从而在两种类型中选择其一:

```tsx
T extends U ? X : Y
```

上面的代码可以理解为: 若 `T` 能够赋值给 `U`，那么类型是 `X`，否则为 `Y`,有点类似于`JavaScript`中的三元条件运算符。

### 条件类型与联合类型

条件类型有一个特性,就是「分布式有条件类型」，但是分布式有条件类型是有前提的，条件类型里待检查的类型必须是`naked type parameter：裸类型参数` 。

**分布式有条件类型**在实例化时会自动分发成联合类型。

```tsx
// 裸类型参数,没有被任何其他类型包裹即T
type NakedUsage<T> = T extends boolean ? "YES" : "NO"
type Distributed = NakedUsage<number | boolean> //  等价于NakedUsage<number> | NakedUsage<boolean> =  "NO" | "YES"
```

当我们给类型`NakedUsage`加入联合类型`number | boolean`时,它的结果返回`"NO" | "YES"`,相当于联合类型中的`number`和`boolean`分别赋予了`NakedUsage<T>`然后再返回出一个联合类型。类似于`Array.map()` 。

```tsx
type Diff<T, U> = T extends U ? never : T; // 找出T类型中U不包含的部分

type R = Diff<"a" | "b" | "c" | "d", "a" | "c" | "f">; // "b" | "d"

type Filter<T, U> = T extends U ? T : never; // filter方法

type NonNullable<T> = Diff<T, null | undefined>; // 剔除null和undefined
```

### 条件类型与映射类型

编写工具类型，作用为：将interface中**函数类型**的**名称**取出来。

```tsx
interface Part {
    id: number;
    name: string;
    subparts: Part[];
    updatePart(newName: string): void;
}

type R = FunctionPropertyNames<Part>;

type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]
```

1、首先看大括号里面的：`[K in keyof T]`遍历整个泛型，得到所有的`key`；`T[K]` 就是所有的`value`；

2、用条件类型验证`value`是不是`Function` ，如果是，将`key`当作新接口的值进行存储；如果不是，则将`never`当作新接口的值存储。此时大括号里的就会是：

```tsx
type R = {
	id: never;
  name: never;
  subparts: never;
  updatePart: "updatePart"; // 该类型是Function，所以接口的值是泛型的key
}
```

3、使用`[keyof T]` 依次取出上面生成的接口里的`value` 。可以理解为对象的大括号取值。如果`value`为`never`，则不返回任何类型；如果不是`never`，则直接返回。

### infer关键字

`infer` 是工具类型和底层库中非常常用的关键字，表示**在 extends 条件语句中待推断的类型变量** 。

```tsx
type ParamType<T> = T extends (param: infer P) => any ? P : T;
```

如果 `T` 能赋值给 `(param: infer P) => any`，则结果是`(param: infer P) => any`类型中的参数 `P`，否则返回为 `T`,`infer P`表示待推断的函数参数。

```tsx
type ReturnType<T> = T extends (...args: any[]) => infer P ? P : any;
```

如果`T`能赋值给函数类型，则返回函数的返回类型。通过`infer P`来提取函数的返回类型。

```tsx
type ConstuctorParameters<T extends new (...args: any[]) => any> = T extends new (...args: infer P) => any ? P : never;
```

1、`new (...args: any[]) => any` 指构造函数。

2、`infer P` 表示待推断的构造函数参数，如果`T`是构造函数，就返回构造函数的类型参数`P`，否则返回`never`。

### infer的应用

将元组转换为联合类型。

```tsx
type ELementOf<T> = T extends Array<infer E> ? E : never;

type TTuple = [string, number];

type ToUnion = ElementOf<TTuple>; // string | number;
```

将联合类型转换为交叉类型。

```tsx
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

type Result = UnionToIntersection<string | number>;
```

## 常用工具类型

将属性全部变为**可选**。

```tsx
type Partial<T> = { [K in keyof T]?: T[K] };
```

上述工具只能转换一层，无法转换嵌套属性。因此需要**类型递归**。

```tsx
type DeepPartial<T> = {
	[U in keyof T]?: T[U] extends Object ? DeepPartial<T[U]> : T[U];
}
// 当value为对象类型，则递归调用
```

`+和-`两个关键字用于映射类型中给属性添加修饰符，比如`-?`就代表将可选属性变为必选，`-readonly`代表将只读属性变为非只读。

下面的工具类型用来将属性全部变为**必选**。

```tsx
type Required<T> = { [P in keyof T]-?: T[P] };
```

### Exclude

```tsx
type Exclude<T, U> = T extends U ? never : T;

type TT = Exclude<1 | 2, 1 | 3>; // 2
```

`Exclude` 的作用是从`T`中排除出**可分配**给`U`的元素。也就是说，如果`T`不能赋值给`U`，则返回该值。如果有多个值不能赋值，则`TT`是联合类型。

### Omit

```tsx
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

type Foo = Omit<{ name: string, age: number }, 'name'> // { age: number }
```

`Omit`的作用是忽略`T`中的某些属性。

### Compute

```tsx
type Compute<A extends any> = A extends Function ? A : { [K in keyof A]: A[K] };

type R1 = Compute<{ x: 'x' } & { y: 'y' }> // {x: "x", y: "y"}

type R2 = Compute<{ x: 'x'; y: 'y1' } & { y: 'y' }> // {x: "x", y: never}
```

`Compute`的作用是将交叉类型合并。

### Merge

```tsx
type Merge<O1 extends object, O2 extends object> = Compute<O1 & Omit<O2, keyof O1>>;

type O1 = {
  name: string;
  id: string;
};

type O2 = {
  id: number;
  from: string;
};

type R2 = Merge<O1, O2>; // {name: string, id: string, from: string}
```

`Merge<O1, O2>`的作用是将两个对象的属性合并。通过实现可以看出，先忽略掉`O2`中存在于`O1`的属性，然后再与`O1`合并。因此重复的属性是以`O1`里的类型为准，所以上面示例中`id`属性是`string`类型。

### Extract

Extract from T those types that are assignable to U.也就是提取`T`中可以赋值给`U`的属性。

```tsx
type Extract<T, U> = T extends U ? T : never;
```

### Intersection

```tsx
type Intersection<T extends object, U extends object> = Pick<
  T,
  Extract<keyof T, keyof U> & Extract<keyof U, keyof T>
>;

type Props = { name: string; age: number; visible: boolean };
type DefaultProps = { age: number };

type DuplicatedProps = Intersection<Props, DefaultProps>; // { age: number; }
```

`Intersection<T, U>`的作用是取`T`的属性，此属性同样也存在与`U` 。

通过实现可以看出，先提取公用的属性，然后从`T`中进行取出。因此同样属性名的，以`T`为准。

### Overwrite

```tsx
type Overwrite<
  T extends object,
  U extends object,
  I = Diff<T, U> & Intersection<U, T>
> = Pick<I, keyof I>;

// From T, pick a set of properties whose keys are in the union K
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

`Overwrite<T, U>`顾名思义,是用`U`的属性覆盖`T`的相同属性。

通过属性可以看出，核心实现是`Diff<T, U> & Intersection<U, T>` 。将**差集**和**交集**进行**交叉**，交集以`U`中属性的类型为准。然后将交叉类型进行`Pick`。

### Mutable

```tsx
type Mutable<T> = { -readonly [P in keyof T]: T[P] }

// Make all properties in T readonly
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

`Mutable`将 `T` 的所有属性的 `readonly` 移除。

### Record

```tsx
// Construct a type with a set of properties K of type T
type Record<K extends keyof any, T> = {
    [P in K]: T;
};

type K = 'A' | 'B' | 'C';

// {A: {id: number}, B: {id: number}, C: {id: number}}
type result = Record<K, { id: number }>
```

`Record` 允许从 `Union` 类型中创建新类型，`Union` 类型中的值用作新类型的属性。

学习类型工具，可以阅读[utility-types](https://github.com/piotrwitek/utility-types)和[type-challenges](https://github.com/type-challenges/type-challenges)

## 编译器

`TypeScript`有自己的**编译器**,这个编译器主要有以下部分组成：

- Scanner 扫描器
- Parser 解析器
- Binder 绑定器
- Emitter 发射器
- Checker 检查器

**扫描器**通过扫描源代码生成token流：

```txt
SourceCode（源码）+ 扫描器 --> Token 流
```

**解析器**将token流解析为抽象语法树(AST)：

```txt
Token 流 + 解析器 --> AST（抽象语法树）
```

**绑定器**将AST中的声明节点与相同实体的其他声明相连形成符号(Symbols),符号是语义系统的主要构造块：

```txt
AST + 绑定器 --> Symbols（符号）
```

**检查器**通过符号和AST来验证源代码语义：

```txt
AST + 符号 + 检查器 --> 类型验证
```

最后我们通过**发射器**生成JavaScript代码：

```txt
AST + 检查器 + 发射器 --> JavaScript 代码
```

## 编写声明文件

### 使用第三方d.ts

`Github` 上有一个库[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)它定义了市面上主流的`JavaScript` 库的 `d.ts` ,而且我们可以很方便地用 `npm`引入这些 `d.ts`。

同时可以通过[search](https://www.typescriptlang.org/dt/search) 来搜索使用的库是否具有声明文件。

```tsx
npm install --save-dev @types/node
```

如果没有第三方的声明文件，就需要手动编写`d.ts`文件。

### 编写d.ts文件

关键字 `declare` 表示声明的意思，我们可以用它来做出各种声明：

- `declare var` 声明全局变量
- `declare function` 声明全局方法
- `declare class` 声明全局类
- `declare enum` 声明全局枚举类型
- `declare namespace` 声明（含有子属性的）全局对象
- `interface` 和 `type` 声明全局类型

### 声明变量

```tsx
declare const jQuery: (selector: string) => any;
```

### 声明函数

```tsx
declare function jQuery(selector: string): any;
```

### 声明类

```tsx
declare class Person {
  name: string;
  constructor(name: string);
  say(): string;
}
```

### 声明枚举

```tsx
declare enum Directions {
  Up,
  Down,
  Left,
  Right
}
```

### 声明interface 和 type

```tsx
interface AjaxSettings {
    method?: 'GET' | 'POST'
    data?: any;
}
declare namespace jQuery {
    function ajax(url: string, settings?: AjaxSettings): void;
}
```

### 声明合并

可以组合多个声明语句，它们会不冲突的合并起来。

```tsx
declare function jQuery(selector: string): any;
declare namespace jQuery {
    function ajax(url: string, settings?: any): void;
}
```

### 自动生成声明文件

如果库的源码本身就是由 `ts` 写的，那么在使用 `tsc` 脚本将 `ts` 编译为 `js` 的时候，添加 `declaration` 选项，就可以同时也生成 `.d.ts` 声明文件了。

我们可以在命令行中添加 `--declaration`（简写 `-d`），或者在 `tsconfig.json` 中添加 `declaration` 选项。

```tsx
// tsconfig.json
{
    "compilerOptions": {
        "module": "commonjs",
        "outDir": "lib", // 输出目录
        "declaration": true, // 生成声明文件
    }
}
```

## 手写events声明文件

Node's event emitter for all engines.仓库地址为：[event](https://github.com/browserify/events)

声明文件放至项目的根目录下，命名为`index.d.ts` 。

```tsx
// index.d.ts
export type Listener = (...args: any[]) => void;
export type Type = string | symbol

export class EventEmitter {
  static listenerCount(emitter: EventEmitter, type: Type): number;
  static defaultMaxListeners: number;

  eventNames(): Array<Type>;
  setMaxListeners(n: number): this;
  getMaxListeners(): number;
  emit(type: Type, ...args: any[]): boolean;
  addListener(type: Type, listener: Listener): this;
  on(type: Type, listener: Listener): this;
  once(type: Type, listener: Listener): this;
  prependOnceListener(type: Type, listener: Listener): this;
  removeListener(type: Type, listener: Listener): this;
  off(type: Type, listener: Listener): this;
  removeAllListeners(type?: Type): this;
  listeners(type: Type): Listener[];
  listenerCount(type: Type): number;
  prependListener(type: Type, listener: Listener): this;
  rawListeners(type: Type): Listener[];
}
```

## tsconfig.json

`tsconfig.json`详细配置说明。

```jsx
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es5" /* target用于指定编译之后的版本目标: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */,
    "module": "commonjs" /* 用来指定要使用的模块标准: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */,
    "lib": ["es6", "dom"] /* lib用于指定要包含在编译中的库文件 */,
    "allowJs": true,                       /* allowJs设置的值为true或false，用来指定是否允许编译js文件，默认是false，即不编译js文件 */
    "checkJs": true,                       /* checkJs的值为true或false，用来指定是否检查和报告js文件中的错误，默认是false */
    "jsx": "preserve",                     /* 指定jsx代码用于的开发环境: 'preserve', 'react-native', or 'react'. */
    "declaration": true,                   /* declaration的值为true或false，用来指定是否在编译的时候生成相应的".d.ts"声明文件。如果设为true，编译每个ts文件之后会生成一个js文件和一个声明文件。但是declaration和allowJs不能同时设为true */
    "declarationMap": true,                /* 值为true或false，指定是否为声明文件.d.ts生成map文件 */
    "sourceMap": true,                     /* sourceMap的值为true或false，用来指定编译时是否生成.map文件 */
    "outFile": "./dist/main.js",           /* outFile用于指定将输出文件合并为一个文件，它的值为一个文件路径名。比如设置为"./dist/main.js"，则输出的文件为一个main.js文件。但是要注意，只有设置module的值为amd和system模块时才支持这个配置 */
    "outDir": "./dist",                    /* outDir用来指定输出文件夹，值为一个文件夹路径字符串，输出的文件都将放置在这个文件夹 */
    "rootDir": "./",                       /* 用来指定编译文件的根目录，编译器会在根目录查找入口文件，如果编译器发现以rootDir的值作为根目录查找入口文件并不会把所有文件加载进去的话会报错，但是不会停止编译 */
    "composite": true,                     /* 是否编译构建引用项目  */
    "removeComments": true,                /* removeComments的值为true或false，用于指定是否将编译后的文件中的注释删掉，设为true的话即删掉注释，默认为false */
    "noEmit": true,                        /* 不生成编译文件，这个一般比较少用 */
    "importHelpers": true,                 /* importHelpers的值为true或false，指定是否引入tslib里的辅助工具函数，默认为false */
    "downlevelIteration": true,            /* 当target为'ES5' or 'ES3'时，为'for-of', spread, and destructuring'中的迭代器提供完全支持 */
    "isolatedModules": true,               /* isolatedModules的值为true或false，指定是否将每个文件作为单独的模块，默认为true，它不可以和declaration同时设定 */

    /* Strict Type-Checking Options */
    "strict": true /* strict的值为true或false，用于指定是否启动所有类型检查，如果设为true则会同时开启下面这几个严格类型检查，默认为false */,
    "noImplicitAny": true,                 /* noImplicitAny的值为true或false，如果我们没有为一些值设置明确的类型，编译器会默认认为这个值为any，如果noImplicitAny的值为true的话。则没有明确的类型会报错。默认值为false */
    "strictNullChecks": true,              /* strictNullChecks为true时，null和undefined值不能赋给非这两种类型的值，别的类型也不能赋给他们，除了any类型。还有个例外就是undefined可以赋值给void类型 */
    "strictFunctionTypes": true,           /* strictFunctionTypes的值为true或false，用于指定是否使用函数参数双向协变检查 */
    "strictBindCallApply": true,           /* 设为true后会对bind、call和apply绑定的方法的参数的检测是严格检测的 */
    "strictPropertyInitialization": true,  /* 设为true后会检查类的非undefined属性是否已经在构造函数里初始化，如果要开启这项，需要同时开启strictNullChecks，默认为false */
    "noImplicitThis": true,                 /* 当this表达式的值为any类型的时候，生成一个错误 */
    "alwaysStrict": true,                  /* alwaysStrict的值为true或false，指定始终以严格模式检查每个模块，并且在编译之后的js文件中加入"use strict"字符串，用来告诉浏览器该js为严格模式 */

    /* Additional Checks */
    "noUnusedLocals": true,                /* 用于检查是否有定义了但是没有使用的变量，对于这一点的检测，使用eslint可以在你书写代码的时候做提示，你可以配合使用。它的默认值为false */
    "noUnusedParameters": true,            /* 用于检查是否有在函数体中没有使用的参数，这个也可以配合eslint来做检查，默认为false */
    "noImplicitReturns": true,             /* 用于检查函数是否有返回值，设为true后，如果函数没有返回值则会提示，默认为false */
    "noFallthroughCasesInSwitch": true,    /* 用于检查switch中是否有case没有使用break跳出switch，默认为false */

    /* Module Resolution Options */
    "moduleResolution": "node",            /* 用于选择模块解析策略，有'node'和'classic'两种类型' */
    "baseUrl": "./",                       /* baseUrl用于设置解析非相对模块名称的基本目录，相对模块不会受baseUrl的影响 */
    "paths": {},                           /* 用于设置模块名称到基于baseUrl的路径映射 */
    "rootDirs": [],                        /* rootDirs可以指定一个路径列表，在构建时编译器会将这个路径列表中的路径的内容都放到一个文件夹中 */
    "typeRoots": [],                       /* typeRoots用来指定声明文件或文件夹的路径列表，如果指定了此项，则只有在这里列出的声明文件才会被加载 */
    "types": [],                           /* types用来指定需要包含的模块，只有在这里列出的模块的声明文件才会被加载进来 */
    "allowSyntheticDefaultImports": true,  /* 用来指定允许从没有默认导出的模块中默认导入 */
    "esModuleInterop": true /* 通过为导入内容创建命名空间，实现CommonJS和ES模块之间的互操作性 */,
    "preserveSymlinks": true,              /* 不把符号链接解析为其真实路径，具体可以了解下webpack和nodejs的symlink相关知识 */

    /* Source Map Options */
    "sourceRoot": "",                      /* sourceRoot用于指定调试器应该找到TypeScript文件而不是源文件位置，这个值会被写进.map文件里 */
    "mapRoot": "",                         /* mapRoot用于指定调试器找到映射文件而非生成文件的位置，指定map文件的根路径，该选项会影响.map文件中的sources属性 */
    "inlineSourceMap": true,               /* 指定是否将map文件的内容和js文件编译在同一个js文件中，如果设为true，则map的内容会以//# sourceMappingURL=然后拼接base64字符串的形式插入在js文件底部 */
    "inlineSources": true,                 /* 用于指定是否进一步将.ts文件的内容也包含到输入文件中 */

    /* Experimental Options */
    "experimentalDecorators": true         /* 用于指定是否启用实验性的装饰器特性 */
    "emitDecoratorMetadata": true,         /* 用于指定是否为装饰器提供元数据支持，关于元数据，也是ES6的新标准，可以通过Reflect提供的静态方法获取元数据，如果需要使用Reflect的一些方法，需要引入ES2015.Reflect这个库 */
  }
  "files": [], // files可以配置一个数组列表，里面包含指定文件的相对或绝对路径，编译器在编译的时候只会编译包含在files中列出的文件，如果不指定，则取决于有没有设置include选项，如果没有include选项，则默认会编译根目录以及所有子目录中的文件。这里列出的路径必须是指定文件，而不是某个文件夹，而且不能使用* ? **/ 等通配符
  "include": [],  // include也可以指定要编译的路径列表，但是和files的区别在于，这里的路径可以是文件夹，也可以是文件，可以使用相对和绝对路径，而且可以使用通配符，比如"./src"即表示要编译src文件夹下的所有文件以及子文件夹的文件
  "exclude": [],  // exclude表示要排除的、不编译的文件，它也可以指定一个列表，规则和include一样，可以是文件或文件夹，可以是相对路径或绝对路径，可以使用通配符
  "extends": "",   // extends可以通过指定一个其他的tsconfig.json文件路径，来继承这个配置文件里的配置，继承来的文件的配置会覆盖当前文件定义的配置。TS在3.2版本开始，支持继承一个来自Node.js包的tsconfig.json配置文件
  "compileOnSave": true,  // compileOnSave的值是true或false，如果设为true，在我们编辑了项目中的文件保存的时候，编辑器会根据tsconfig.json中的配置重新生成文件，不过这个要编辑器支持
  "references": [],  // 一个对象数组，指定要引用的项目
}
```

## ESLint

全局安装`eslint`。

```jsx
npm install -g eslint
```

初始化配置文件。

```jsx
eslint --init
```

选择TS和Airbnb风格代码校验，会生成`.eslintrc.js` ：

```jsx
module.exports = {
  env: { // 用于指定环境
    browser: true,
    es6: true,
    node: true,
  },
  extends: [ // 字符串或字符串数组，数组中每个配置项继承它前面的配置。
    'airbnb-base',
  ],
  globals: { // 脚本在执行期间访问的额外的全局变量
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser', // 解析器
  parserOptions: { // parser 解析代码时的配置参数
    ecmaVersion: 2020, // 指定es版本
    sourceType: 'module', // 指定资源类型为ECMAScript 模块
  },
  plugins: [ // 第三方插件，插件名称可以省略 eslint-plugin- 前缀
    '@typescript-eslint',
  ],
  rules: { // 具体规则的配置，可以用来进行覆盖或者修改指定规则
  },
};
```

eslint的配置文件可以是以下形式：

- `.eslintrc.js`(输出一个配置对象)
- `.eslintrc.yaml`
- `.eslintrc.yml`
- `.eslintrc.json`（`ESLint`的`JSON`文件允许`JavaScript`风格的注释）
- `.eslintrc`（可以是`JSON`也可以是`YAML`）
- `package.json`（在`package.json`里创建一个`eslintConfig`属性，在那里定义你的配置）

优先级按顺序由高到低。

`extend`和`plugin`的区别：

`extend`提供的是 `eslint`现有规则的一系列**预设**，而 `plugin` 则提供了除预设之外的**自定义规则**，当你在 `eslint` 的规则里找不到合适的的时候，就可以借用插件来实现。

### eslint总结

- `env`: 预定义那些环境需要用到的全局变量，可用的参数是：`es6`、`broswer`、`node`等
- `extends`: 指定扩展的配置，配置支持递归扩展，支持规则的覆盖和聚合
- `plugins`: 配置那些我们想要`Linting`规则的插件。
- `parser`: 默认`ESlint`使用`Espree`作为解析器，我们也可以用其他解析器在此配置
- `parserOptions`: 解析器的配置项
- `rules`: 自定义规则，可以覆盖掉`extends`的配置
- `globals`： 脚本在执行期间访问的额外的全局变量

## 总结

以上就是通读完小册后整理的笔记，接下来要开始通读`TypeScript`官方文档，下篇见。
