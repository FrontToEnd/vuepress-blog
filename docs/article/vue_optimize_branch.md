# Vue 项目优化实践-优化逻辑判断

## 嵌套层级优化

重点：提前 return 掉无效条件，减少嵌套层级，更容易理解和维护。

```javascript
function supply(fruit, quantity) {
  const redFruits = ["apple", "strawberry", "cherry", "cranberries"];
  if (!fruit) throw new Error("没有水果啦"); // 条件 1: 当 fruit 无效时，提前处理错误
  if (!redFruits.includes(fruit)) return; // 条件 2: 当不是红色水果时，提前 return

  console.log("红色水果");

  // 条件 3: 水果数量大于 10 个
  if (quantity > 10) {
    console.log("数量大于 10 个");
  }
}
```

## 多条件分支的优化处理

当编写有多个判断条件的代码时，第一反应就是使用`if else` 或者`switch case` ，但是这两者都非常的冗长，可以借助`Object` 的`{ key: value }` 或者`Map` 的数据结构进行优化。

如果页面上展示的数据存在先后顺序，那么就需要使用`Map` 来存储，因为`Map` 存储的数据是有序的，而`Object` 存储的是无序的。

```javascript
// Object
const fruitColor = {
  red: ["apple", "strawberry"],
  yellow: ["banana", "pineapple"],
  purple: ["grape", "plum"],
};
function pick(color) {
  return fruitColor[color] || [];
}
// Map
const fruitColor = new Map()
  .set("red", ["apple", "strawberry"])
  .set("yellow", ["banana", "pineapple"])
  .set("purple", ["grape", "plum"]);

function pick(color) {
  return fruitColor.get(color) || [];
}
```

也可以通过更加语义化的方式定义对象。

```javascript
// 使用Array.filter()
const fruits = [
  { name: "apple", color: "red" },
  { name: "strawberry", color: "red" },
  { name: "banana", color: "yellow" },
  { name: "pineapple", color: "yellow" },
  { name: "grape", color: "purple" },
  { name: "plum", color: "purple" },
];

function pick(color) {
  return fruits.filter((f) => f.color === color);
}
```

## 使用数组新特性优化

### 多条件判断

```javascript
// bad
function judge(fruit) {
  if (
    fruit === "apple" ||
    fruit === "strawberry" ||
    fruit === "cherry" ||
    fruit === "cranberries"
  ) {
    console.log("red");
  }
}
// good
// 使用Array.includes()
const redFruits = ["apple", "strawberry", "cherry", "cranberries"];
function judge(type) {
  if (redFruits.includes(fruit)) {
    console.log("red");
  }
}
```

### 数组所有项是否都满足

```javascript
// Array.every()
const fruits = [
  { name: "apple", color: "red" },
  { name: "banana", color: "yellow" },
  { name: "grape", color: "purple" },
];
const isAllRed = fruits.every((f) => f.color === "red");
```

### 数组某一项是否满足

```javascript
// Array.some()
const fruits = [
  { name: "apple", color: "red" },
  { name: "banana", color: "yellow" },
  { name: "grape", color: "purple" },
];
const isAllRed = fruits.some((f) => f.color === "red");
```

### 使用解构和默认参数

适用于参数为对象的情况

```javascript
// bad
const buyFruit = (fruit, amount) => {
  fruit = fruit || {};
  if (!fruit.name || !fruit.price) {
    return;
  }
};
// good
const buyFruit = ({ name, price } = {}, amount) => {
  if (!name || !prices) {
    return;
  }
};
```
