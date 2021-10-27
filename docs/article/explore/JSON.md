# 重学JSON.stringify

## 语法

`JSON.stringify()`方法将一个 `JavaScript` 对象或值转换为 `JSON` 字符串，如果指定了一个 `replacer` 函数，则可以选择性地替换值，或者指定的 `replacer` 是数组，则可选择性地仅包含数组指定的属性。

```js
JSON.stringify(value[, replacer [, space]])
```

**value**: 将要序列化成 一个 `JSON` 字符串的值。
**replacer**（可选）：如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；如果该参数为 null 或者未提供，则对象所有的属性都会被序列化。
**space**（可选）：指定缩进用的空白字符串，用于美化输出（pretty-print）；如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格；如果该参数为字符串（当字符串长度超过10个字母，取其前10个字母），该字符串将被作为空格；如果该参数没有提供（或者为 null），将没有空格。

返回值：一个表示给定值的JSON字符串。

异常：

- 当在循环引用时会抛出异常`TypeError` ("cyclic object value")（循环对象值）
- 当尝试去转换 `BigInt` 类型的值会抛出`TypeError` ("BigInt value can't be serialized in JSON")（BigInt值不能JSON序列化）

## 特性

### 特性一

1. `undefined`、任意的函数以及`symbol`值，出现在非数组对象的属性值中时在序列化过程中会被忽略
2. `undefined`、任意的函数以及`symbol`值出现在数组中时会被转换成 `null`。
3. `undefined`、任意的函数以及`symbol`值被单独转换时，会返回 `undefined`。

### 特性二

`布尔值、数字、字符串`的包装对象在序列化过程中会自动转换成对应的原始值。

```js
console.log(JSON.stringify([new Number(1), new String("前端"), new Boolean(false)]))

// [1,"前端",false]
```

### 特性三

所有以`symbol`为属性键的属性都会被完全忽略掉，即便 `replacer` 参数中强制指定包含了它们。

```js
console.log(JSON.stringify({
  [ Symbol('前端') ]: '前端',
}, (key, value) => {
  if (typeof key === 'symbol') {
    return value
  }
}))

 // undefined
```

### 特性四

`NaN` 和 `Infinity` 格式的数值及 `null` 都会被当做 `null`。

```js
console.log(JSON.stringify({num1: NaN, num2: Infinity, num3: null}))

// {"num1":null,"num2":null,"num3":null}
```

### 特性五

转换值如果有 `toJSON()` 方法，该方法定义什么值将被序列化。

```js
console.log(JSON.stringify({
  name: '前端',
  toJSON () {
    return 'JSON.stringify'
  }
}))

// "JSON.stringify"
```

### 特性六

Date 日期调用了 `toJSON()` 将其转换为了 `string` 字符串（同`Date.toISOString()`），因此会被当做字符串处理。

```js
console.log(JSON.stringify(new Date()))

// "2021-10-27T05:55:58.208Z"
```

### 特性七

对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。该特性对应上述语法小节的异常里。

### 特性八

其他类型的对象，包括`Map/Set/WeakMap/WeakSet`，仅会序列化**可枚举**的属性。

```js
console.log(JSON.stringify(Object.defineProperties({}, {
  name: {
    value: '前端',
    enumerable: true
  },
  sex: {
    value: 'boy',
    enumerable: false // 不可枚举
  },
})))

// {"name":"前端"}
```

### 特性九

当尝试去转换 `BigInt` 类型的值会抛出错误。

```js
console.log(JSON.stringify(BigInt(1)))

// TypeError: Do not know how to serialize a BigInt
```

## 总结

本文介绍了`JSON.stringify`的语法，以及该方法的九大特性。当我们使用`JSON.stringify`的时候，一定要注意特殊情况，防止出现属性和值丢失。
