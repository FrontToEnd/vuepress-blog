# Ramda源码阅读

Ramda函数库是我们学习函数式编程的最佳开源项目，该库集成了大量的具有函数式编程思想的函数，确保我们写出没有副作用的函数。本文是笔者亲自阅读源码后的总结，以供大家参考。

中文官网直达链接：<https://ramda.cn/>

## 内部函数

## _curry1

```js
function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

module.exports = _curry1;
```

该函数是柯里化系列，用来处理fn的参数个数为1时的情况。

## _curry2

```js
function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;

      case 1:
        return _curry1(function (_b) {
          return fn(a, _b);
        });

      default:
        return fn(a, b);
    }
  };
}

module.exports = _curry2;
```

该函数是柯里化系列，用来处理fn的参数个数为2时的情况。

## _curry3

```js
function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;

      case 1:
        return _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        });

      case 2:
        return _curry1(function (_c) {
          return fn(a, b, _c);
        });

      default:
        return fn(a, b, c);
    }
  };
}

module.exports = _curry3;
```

该函数是柯里化系列，用来处理fn的参数个数为3时的情况。

## _concat

```js

/**
* Private `concat` function to merge two array-like objects.
* _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
* _concat([1, 2, 3]); //=> [1, 2, 3]
*/
function _concat(set1, set2) {
  set1 = set1 || [];
  set2 = set2 || [];
  var idx;
  var len1 = set1.length;
  var len2 = set2.length;
  var result = [];
  idx = 0;

  // 通过两个while循环分别将两个入参的值放入result数组
  while (idx < len1) {
    result[result.length] = set1[idx];
    idx += 1;
  }

  idx = 0;

  while (idx < len2) {
    result[result.length] = set2[idx];
    idx += 1;
  }

  return result;
}

module.exports = _concat;
```

## _assertPromise

```js
function _assertPromise(name, p) {
  if (p == null || !_isFunction(p.then)) {
    throw new TypeError('`' + name + '` expected a Promise, received ' + _toString(p, []));
  }
}

module.exports = _assertPromise;
```

用来判断传入的p是否为`promise`。具体方案是判断`p.then`是否是`function`。

## _isFunction

```js
function _isFunction(x) {
  var type = Object.prototype.toString.call(x);
  return type === '[object Function]' || type === '[object AsyncFunction]' || type === '[object GeneratorFunction]' || type === '[object AsyncGeneratorFunction]';
}

module.exports = _isFunction;
```

用来判断入参是否为函数。从中可以学到不止要判断`[object Function]`，还要判断其他三种情况。

## _toString

```js
function _toString(x, seen) {
  var recur = function recur(y) {
    var xs = seen.concat([x]);
    return _includes(y, xs) ? '<Circular>' : _toString(y, xs);
  }; //  mapPairs :: (Object, [String]) -> [String]


  var mapPairs = function (obj, keys) {
    return _map(function (k) {
      return _quote(k) + ': ' + recur(obj[k]);
    }, keys.slice().sort());
  };

  switch (Object.prototype.toString.call(x)) {
    case '[object Arguments]':
      return '(function() { return arguments; }(' + _map(recur, x).join(', ') + '))';

    case '[object Array]':
      return '[' + _map(recur, x).concat(mapPairs(x, reject(function (k) {
        return /^\d+$/.test(k);
      }, keys(x)))).join(', ') + ']';

    case '[object Boolean]':
      return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();

    case '[object Date]':
      return 'new Date(' + (isNaN(x.valueOf()) ? recur(NaN) : _quote(_toISOString(x))) + ')';

    case '[object Null]':
      return 'null';

    case '[object Number]':
      return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);

    case '[object String]':
      return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : _quote(x);

    case '[object Undefined]':
      return 'undefined';

    default:
      if (typeof x.toString === 'function') {
        var repr = x.toString();

        if (repr !== '[object Object]') {
          return repr;
        }
      }

      return '{' + mapPairs(x, keys(x)).join(', ') + '}';
  }
}

module.exports = _toString;
```

实现定制化的toString方法。

## _aperture

```js
function _aperture(n, list) {
  var idx = 0;

  // 相邻元素生成的n元组最多可以有limit项
  var limit = list.length - (n - 1);

  // n大于列表的长度，acc即为空数组
  var acc = new Array(limit >= 0 ? limit : 0);

  // acc数组的每一项是通过slice方法截取的数组片段，每个片段的长度为n
  while (idx < limit) {
    acc[idx] = Array.prototype.slice.call(list, idx, idx + n);
    idx += 1;
  }

  return acc;
}

module.exports = _aperture;
```

返回一个新列表，列表中的元素为由原列表相邻元素组成的 n 元组。如果 n 大于列表的长度，则返回空列表。

## _isInteger

```js
module.exports = Number.isInteger || function _isInteger(n) {
  return n << 0 === n;
};
```

判断给定参数是否为整数。这里采用原生的静态方法`Number.isInteger`进行判断，或者左移0位与原参数进行比较。如果n不为整数，左移0位就不与本身相等。

## _makeFlat

```js
function _makeFlat(recursive) {
  return function flatt(list) {
    var value, jlen, j;
    var result = [];
    var idx = 0;
    var ilen = list.length;

    while (idx < ilen) {
      if (_isArrayLike(list[idx])) {

        // recursive为true则进行递归，否则只减少一维
        value = recursive ? flatt(list[idx]) : list[idx];
        j = 0;
        jlen = value.length;

        // 递归返回或者list[idx]本身都是数组，所以这里可以通过循环在result数组末尾进行添加
        while (j < jlen) {
          result[result.length] = value[j];
          j += 1;
        }

      // 如果list[idx]不是数组，那么就逐个添加到result数组末尾
      } else {
        result[result.length] = list[idx];
      }

      idx += 1;
    }

    return result;
  };
}

module.exports = _makeFlat;
```

`_makeFlat`是一个helper函数，它根据传入的标志返回一级或完全递归的函数。

## _clone

```js

/**
 * Copies an object.
 *
 * @private
 * @param {*} value The value to be copied
 * @param {Array} refFrom Array containing the source references
 * @param {Array} refTo Array containing the copied source references
 * @param {Boolean} deep Whether or not to perform deep cloning.
 * @return {*} The copied value.
 */
function _clone(value, refFrom, refTo, deep) {
  var copy = function copy(copiedValue) {
    var len = refFrom.length;
    var idx = 0;

    while (idx < len) {
      if (value === refFrom[idx]) {
        return refTo[idx];
      }

      idx += 1;
    }

    refFrom[idx + 1] = value;
    refTo[idx + 1] = copiedValue;

    // 使用for...in来遍历对象以及原型链上的属性，支持深克隆
    for (var key in value) {
      copiedValue[key] = deep ? _clone(value[key], refFrom, refTo, true) : value[key];
    }

    return copiedValue;
  };

  // 通过type函数判断value的类型，内部使用Object.prototype.toString.call(value).slice(8, -1)
  switch (type(value)) {
    case 'Object':
      return copy({});

    case 'Array':
      return copy([]);

    case 'Date':
      return new Date(value.valueOf());

    case 'RegExp':
      return _cloneRegExp(value);

    default:
      return value;
  }
}

module.exports = _clone;
```

顾名思义，克隆函数。可以通过参数决定是否是深克隆。

## _isArrayLike

```js
/**
 * Tests whether or not an object is similar to an array.
 *
 * @private
 * @category Type
 * @category List
 * @sig * -> Boolean
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @example
 *
 *      _isArrayLike([]); //=> true
 *      _isArrayLike(true); //=> false
 *      _isArrayLike({}); //=> false
 *      _isArrayLike({length: 10}); //=> false
 *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */

var _isArrayLike =
/*#__PURE__*/
_curry1(function isArrayLike(x) {

  // 是数组
  if (_isArray(x)) {
    return true;
  }

  // 是falsy值
  if (!x) {
    return false;
  }

  // 不是对象
  if (typeof x !== 'object') {
    return false;
  }

  // 是字符串
  if (_isString(x)) {
    return false;
  }

  // 元素节点，比如div，只要有length属性且不为0，则为类数组
  if (x.nodeType === 1) {
    return !!x.length;
  }

  // 对象length属性值为0，认为是类数组
  if (x.length === 0) {
    return true;
  }


  // 对象length属性不为0，则必须有0和length - 1的属性，否则不为类数组
  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }

  return false;
});
```

从注释可以看出，如果x有数值的length属性，并且有两端的数值定义，那么就返回true，否则返回false。

## 可导出函数

## add

```js

/**
 *      R.add(2, 3);       //=>  5
 *      R.add(7)(10);      //=> 17
 */
var add =
_curry2(function add(a, b) {
  return Number(a) + Number(b);
});

module.exports = add;
```

该函数用来两数相加，支持柯里化。

## adjust

```js

/**
* R.adjust(1, R.toUpper, ['a', 'b', 'c', 'd']);      //=> ['a', 'B', 'c', 'd']
* R.adjust(-1, R.toUpper, ['a', 'b', 'c', 'd']);     //=> ['a', 'b', 'c', 'D']
*/
var adjust =
_curry3(function adjust(idx, fn, list) {

  // 支持负索引。当正索引大于等于数组长度或者负索引小于数组长度的负值，直接返回list
  // 注意后一个判断条件是小于，因为负索引是从-1开始而不是从-0开始
  if (idx >= list.length || idx < -list.length) {
    return list;
  }

  var start = idx < 0 ? list.length : 0;

  var _idx = start + idx;

  // 将原数组进行拷贝
  var _list = _concat(list);

  // 针对指定索引执行fn函数，并返回
  _list[_idx] = fn(list[_idx]);
  return _list;
});
```

将数组中指定索引处的值替换为经函数变换的值。支持柯里化。

## all

```js

/**
 *      const equals3 = R.equals(3);
 *      R.all(equals3)([3, 3, 3, 3]); //=> true
 *      R.all(equals3)([3, 3, 1, 3]); //=> false
 */
 var all =
_curry2(
function all(fn, list) {
  var idx = 0;

  while (idx < list.length) {

    // 如果list某一项被fn执行后返回false，则该函数返回false  
    if (!fn(list[idx])) {
      return false;
    }

    idx += 1;
  }

  return true;
});

module.exports = all;
```

如果列表中的所有元素都满足 predicate，则返回 true；否则，返回 false。

## always

```js

/**
 *      const t = R.always('Tee');
 *      t(); //=> 'Tee'
 */
var always =

_curry1(function always(val) {
  return function () {
    return val;
  };
});

module.exports = always;
```

返回一个返回恒定值的函数。注意，对于非原始值，返回的值是对原始值的引用。

## and

```js

/**
 *      R.and(true, true); //=> true
 *      R.and(true, false); //=> false
 */
var and =
_curry2(function and(a, b) {
  return a && b;
});

module.exports = and;
```

如果两个参数都是 true，则返回 true；否则返回 false。

## andThen

```js
var andThen =
_curry2(function andThen(f, p) {
  _assertPromise('andThen', p);

  return p.then(f);
});

module.exports = andThen;
```

将 onSuccess 函数应用于一个 fulfilled Promise 的内部值，并将计算结果放入新的 Promise 中返回。

## any

```js
var any =
_curry2(
function any(fn, list) {
  var idx = 0;

  // 如果list某一项被fn执行后返回true，则该函数返回true
  while (idx < list.length) {
    if (fn(list[idx])) {
      return true;
    }

    idx += 1;
  }

  return false;
});

module.exports = any;
```

只要列表中有一个元素满足 `predicate`，就返回 `true`，否则返回 `false`。该函数与`all`函数相反。

## aperture

```js

/**
 *R.aperture(2, [1, 2, 3, 4, 5]); //=> [[1, 2], [2, 3], [3, 4], [4, 5]]
 *R.aperture(3, [1, 2, 3, 4, 5]); //=> [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 *R.aperture(7, [1, 2, 3, 4, 5]); //=> []
 */

 var aperture =
/*#__PURE__*/
_curry2(_aperture);

module.exports = aperture;
```

返回一个新列表，列表中的元素为由原列表相邻元素组成的 n 元组。如果 n 大于列表的长度，则返回空列表。

## append

```js

/**
 *      R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
 *      R.append('tests', []); //=> ['tests']
 *      R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
 */
var append =
_curry2(function append(el, list) {
  return _concat(list, [el]);
});

module.exports = append;
```

在列表末尾拼接一个元素。需要注意`_concat`的第二个参数是`[el]`。

## apply

```js

/**
 *
 *   const nums = [1, 2, 3, -99, 42, 6, 7];
 *   R.apply(Math.max, nums); //=> 42
 */
var apply =
_curry2(function apply(fn, args) {
  return fn.apply(this, args);
});

module.exports = apply;
```

将函数 `fn` 作用于参数列表 `args`。`apply` 可以将变参函数转换为为定参函数。该函数支持柯里化。

## applyTo

```js

/**
 *      const t42 = R.applyTo(42);
 *      t42(R.identity); //=> 42
 *      t42(R.add(1)); //=> 43
 */
_curry2(function applyTo(x, f) {
  return f(x);
});

module.exports = applyTo;
```

接受一个值，并将一个函数作用于其上。

## ascend

```js

/**
 *      const byAge = R.ascend(R.prop('age'));
 *      const people = [
 *        { name: 'Emma', age: 70 },
 *        { name: 'Peter', age: 78 },
 *        { name: 'Mikhail', age: 62 },
 *      ];
 *      const peopleByYoungestFirst = R.sort(byAge, people);
 *        //=> [{ name: 'Mikhail', age: 62 },{ name: 'Emma', age: 70 }, { name: 'Peter', age: 78 }]
 */
var ascend =
_curry3(function ascend(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa < bb ? -1 : aa > bb ? 1 : 0;
});

module.exports = ascend;
```

由返回值可与 < 和 > 比较的函数，创建一个升序比较函数。使用柯里化从而方便接受fn，并将返回值传入接受比较函数的函数。

## assoc

```js

/**
 *R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
 */
var assoc =
_curry3(function assoc(prop, val, obj) {
  var result = {};

  // 使用for in遍历进行浅复制
  for (var p in obj) {
    result[p] = obj[p];
  }

  // 设置或者覆盖指定属性
  result[prop] = val;
  return result;
});

module.exports = assoc;
```

浅复制对象，然后设置或覆盖对象的指定属性。注意，该函数也会将 `prototype` 属性复制到新的对象中。

## assocPath

```js

/**
 *R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
 *Any missing or non-object keys in path will be overridden
 *R.assocPath(['a', 'b', 'c'], 42, {a: 5}); //=> {a: {b: {c: 42}}}
 */
var assocPath =
_curry3(function assocPath(path, val, obj) {

  // path为空则直接返回val  
  if (path.length === 0) {
    return val;
  }

  // 保存第一个路径的值
  var idx = path[0];

  // 递归获取val
  if (path.length > 1) {
    // 如果obj不为空且具有指定索引的值，则成为下次递归的obj，否则下次递归的obj为空数组或者空对象  
    var nextObj = !isNil(obj) && _has(idx, obj) ? obj[idx] : _isInteger(path[1]) ? [] : {};
    val = assocPath(Array.prototype.slice.call(path, 1), val, nextObj);
  }

  // 递归终止条件
  // 如果obj为数组，则覆盖指定索引的值
  if (_isInteger(idx) && _isArray(obj)) {
    var arr = [].concat(obj);
    arr[idx] = val;
    return arr;
  } else {
  // 如果obj为对象，调用assoc方法进行设置或者覆盖对象的指定属性    
    return assoc(idx, val, obj);
  }
});

module.exports = assocPath;
```

浅复制对象，设置或覆盖即将创建的给定路径所需的节点，并将特定值放在该路径的末端。

## binary

```js

/**
* R.binary(f)(a, b, c) = f(a, b)
*/
var binary =
_curry1(function binary(fn) {

  // 将一个任意元（包括零元）的函数，封装成一个确定元数（参数个数）的函数。  
  return nAry(2, fn);
});

module.exports = binary;
```

将任意元函数封装为二元函数（只接受2个参数）中。任何额外的参数都不会传递给被封装的函数。

## both

```js

/**
 *      const gt10 = R.gt(R.__, 10)
 *      const lt20 = R.lt(R.__, 20)
 *      const f = R.both(gt10, lt20);
 *      f(15); //=> true
 *      f(30); //=> false
 *
 *      R.both(Maybe.Just(false), Maybe.Just(55)); // => Maybe.Just(false)
 *      R.both([false, false, 'a'], [11]); //=> [false, false, 11]
 */
var both =
_curry2(function both(f, g) {

  // 如果f为函数，则通过闭包获取arguments并执行与操作。
  return _isFunction(f) ? function _both() {
    return f.apply(this, arguments) && g.apply(this, arguments);

  // f不为函数则执行（暂时没搞懂，以后再补充）
  } : lift(and)(f, g);
});

module.exports = both;
```

该函数调用两个函数，并对两函数返回值进行与操作。若第一个函数结果为 `false-y` 值 (false, null, 0 等)，则返回该结果，否则返回第二个函数的结果。

## call

```js

/**
 *R.call(R.add, 1, 2); //=> 3
 */
var call =
curry(function call(fn) {

  // 使用slice截取剩余参数，并返回由剩余参数组成的数组
  return fn.apply(this, Array.prototype.slice.call(arguments, 1));
});
module.exports = call;
```

提取第一个参数作为函数，其余参数作为刚提取的函数的参数，调用该函数并将结果返回。

## chain

```js
var chain =
_curry2(
function chain(fn, monad) {

  // 第二个参数为函数的情况
  if (typeof monad === 'function') {
    return function (x) {
      return fn(monad(x))(x);
    };
  }

  return _makeFlat(false)(map(fn, monad));
});

module.exports = chain;
```

chain 将函数映射到列表中每个元素，并将结果连接起来。如果第二个参数是函数，chain(f, g)(x) 等价于 f(g(x), x)。要弄清楚该函数的源码，还需要深入了解内部函数`_makeFlat`和`map`。其中`_makeFlat`是一个helper函数，它根据传入的标志返回一级或完全递归的函数。这里不进行递归，也就是只会拍平一层。

## map

```js

/**
*const double = x => x * 2;
*R.map(double, [1, 2, 3]); //=> [2, 4, 6]
*R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
*/
var map =
_curry2(
function map(fn, functor) {
  switch (Object.prototype.toString.call(functor)) {

    // 如果第二个参数也是函数，那么map就相当于R.compose，将它们进行组合
    case '[object Function]':
      return curryN(functor.length, function () {
        return fn.call(this, functor.apply(this, arguments));
      });

    // 如果第二个参数为对象，使用内部方法_reduce将该函数应用到 functor 的每个值上，并返回新的对象
    case '[object Object]':
      return _reduce(function (acc, key) {
        acc[key] = fn(functor[key]);
        return acc;
      }, {}, keys(functor));

    // 默认调用_map，也就是functor为（类）数组的情况
    default:
      return _map(fn, functor);
  }
});

module.exports = map;
```

接收一个函数和一个 `functor`, 将该函数应用到 `functor` 的每个值上，返回一个具有相同形态的 `functor`。如果要进一步了解`map`方法的全貌，就需要深入到内部函数`_map`中。

## _map

```js
function _map(fn, functor) {
  var idx = 0;
  var len = functor.length;
  var result = Array(len);

  while (idx < len) {
    result[idx] = fn(functor[idx]);
    idx += 1;
  }

  return result;
}
```

内部函数`_map`通过遍历对数组或者类数组每一项应用fn函数，并返回新数组。

## clamp

```js

/**
*R.clamp(1, 10, -5) // => 1
*R.clamp(1, 10, 15) // => 10
*R.clamp(1, 10, 4)  // => 4
*/
var clamp =
_curry3(function clamp(min, max, value) {
  if (min > max) {
    throw new Error('min must not be greater than max in clamp(min, max, value)');
  }

  // 当value大于等于min或者value小于等于max时，返回value
  return value < min ? min : value > max ? max : value;
});

module.exports = clamp;
```

将数字限制在指定的范围内。

## clone

```js

/**
*const objects = [{}, {}, {}];
*const objectsClone = R.clone(objects);
*objects === objectsClone; //=> false
*objects[0] === objectsClone[0]; //=> false
*/
var clone =
_curry1(function clone(value) {

  // 如果value本身存在clone方法，则调用本身的方法；否则调用内部函数_clone
  return value != null && typeof value.clone === 'function' ? value.clone() : _clone(value, [], [], true);
});

module.exports = clone;
```

深复制。其值可能（嵌套）包含 `Array、Object、Number、String、Boolean、Date` 类型的数据。`Function` 通过引用复制。

## comparator

```js
/**
* const byAge = R.comparator((a, b) => a.age < b.age);
* const people = [
*   { name: 'Emma', age: 70 },
*   { name: 'Peter', age: 78 },
*   { name: 'Mikhail', age: 62 },
* ];
* const peopleByIncreasingAge = R.sort(byAge, people);
*   //=> [{ name: 'Mikhail', age: 62 },{ name: 'Emma', age: 70 }, { name: 'Peter', age: 78 }]
*/
var comparator =
_curry1(function comparator(pred) {
  return function (a, b) {

    // 比较函数， a < b则返回-1， a > b则返回1， 否则返回0
    return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
  };
});

module.exports = comparator;
```

由首个参数是否小于第二个参数的判断函数，生成一个比较函数。

## compose

```js
/**
 * @symb R.compose(f, g, h)(a, b) = f(g(h(a, b)))
*/
function compose() {
  if (arguments.length === 0) {
    throw new Error('compose requires at least one argument');
  }

  // 将参数反转，然后调用pipe，其中pipe是从左往右执行函数，后续继续分析pipe的源码
  return pipe.apply(this, reverse(arguments));
}

module.exports = compose;
```

从右往左执行函数组合（右侧函数的输出作为左侧函数的输入）。最后一个函数可以是任意元函数（参数个数不限），其余函数必须是一元函数。

## concat

```js

/**
*R.concat('ABC', 'DEF'); // 'ABCDEF'
*R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
*R.concat([], []); //=> []
*/
var concat =
_curry2(function concat(a, b) {
  if (_isArray(a)) {
    if (_isArray(b)) {

      // 如果a和b都是数组，则调用数组上的concat
      return a.concat(b);
    }

    // 类型不同直接报错
    throw new TypeError(toString(b) + ' is not an array');
  }

  if (_isString(a)) {
    if (_isString(b)) {

      // 如果a和b都是字符串，则直接相加
      return a + b;
    }

    // 类型不同直接报错
    throw new TypeError(toString(b) + ' is not a string');
  }

  // a的属性存在fantasy-land/concat则调用
  if (a != null && _isFunction(a['fantasy-land/concat'])) {
    return a['fantasy-land/concat'](b);
  }

  // a自身存在concat方法则调用自身方法
  if (a != null && _isFunction(a.concat)) {
    return a.concat(b);
  }

  // 上述分支都不满足，则报错
  throw new TypeError(toString(a) + ' does not have a method named "concat" or "fantasy-land/concat"');
});

module.exports = concat;
```

连接列表或字符串。`R.concat` 要求两个参数类型相同。若第一个参数自身存在 `concat` 方法，则调用自身的 `concat`。

## contains

```js
/**
 *  R.contains(3, [1, 2, 3]); //=> true
 *  R.contains(4, [1, 2, 3]); //=> false
 */

var contains =
/*#__PURE__*/
_curry2(_includes);

module.exports = contains;

var _indexOf =
/*#__PURE__*/
require("./_indexOf");

function _includes(a, list) {
  return _indexOf(list, a, 0) >= 0;
}

module.exports = _includes;
```

内部函数`_indexOf`是为了兼容低版本浏览器，而自己实现了索引查找。

## dec

```js
/**
 *  R.dec(42); //=> 41
 */
var dec =
/*#__PURE__*/
add(-1);
module.exports = dec;
```

简单明了，为了减1。

## defaultTo

```js
/**
 * const defaultTo42 = R.defaultTo(42);
 * defaultTo42(null);  //=> 42
 * defaultTo42(undefined);  //=> 42
 * defaultTo42(false);  //=> false
 */

var defaultTo =
/*#__PURE__*/
_curry2(function defaultTo(d, v) {
  return v == null || v !== v ? d : v;
});

module.exports = defaultTo;
```

通过柯里化缓存默认值。如果第二个参数不是 `null`、`undefined` 或 `NaN`，则返回第二个参数，否则返回第一个参数（默认值）。

## descend

```js
/**
 *  const byAge = R.descend(R.prop('age'));
 * const people = [{ name: 'Emma', age: 70 },{ name: 'Peter', age: 78 },{ name: 'Mikhail', age: 62 },];
 * const peopleByOldestFirst = R.sort(byAge, people);         //=> [{ name: 'Peter', age: 78 }, { name: 'Emma', age: 70 }, { name: 'Mikhail', age: 62 }]
 */
var descend =
/*#__PURE__*/
_curry3(function descend(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa > bb ? -1 : aa < bb ? 1 : 0; // 降序比较
});

module.exports = descend;
```

由返回值可与 `<` 和 `>` 比较的函数，创建一个降序比较函数。可以看出，该函数接受三个参数，第一个参数也是一个函数，用来执行第二和第三个参数。并按照降序比较的逻辑进行返回-1、1、0。
后两个参数通过排序方法`sort`来传递。

## difference

```js
/**
 * R.difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]
 * R.difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
 */
var difference =
/*#__PURE__*/
_curry2(function difference(first, second) {
  var out = []; // 初始化结果数组
  var idx = 0; // 初始化数组索引
  var firstLen = first.length; // 缓存数组长度
  var secondLen = second.length;
  var toFilterOut = new _Set(); // 声明集合存放不重复元素

  for (var i = 0; i < secondLen; i += 1) { // 将数组2存放到集合中
    toFilterOut.add(second[i]);
  }

  while (idx < firstLen) { // 循环数组1
    if (toFilterOut.add(first[idx])) { // 如果数组1的元素成功添加到集合中，意味着当前元素不存在于数组2
      out[out.length] = first[idx]; // 将数组1的当前元素放入结果数组末尾
    }

    idx += 1; // 索引累加，判断数组1的下个元素
  }

  return out; // 返回结果数组
});

module.exports = difference;
```

求差集。求第一个列表中，未包含在第二个列表中的任一元素的集合。对象和数组比较数值相等，而非引用相等。可以看出，通过数组1的元素能否成功添加到包含数组2元素的集合，来求出差集。

## dissoc

```js
/**
 * R.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}
 */
var dissoc =
/*#__PURE__*/
_curry2(function dissoc(prop, obj) {
  var result = {};

  for (var p in obj) {
    result[p] = obj[p]; // 对象的拷贝
  }

  delete result[prop]; // 删除指定属性
  return result; // 返回结果对象
});

module.exports = dissoc;
```

删除对象中指定 `prop` 属性。

## dissocPath

```js
/**
 * R.dissocPath(['a', 'b', 'c'], {a: {b: {c: 42}}}); //=> {a: {b: {}}}
 */
var dissocPath =
/*#__PURE__*/
_curry2(function dissocPath(path, obj) {
  switch (path.length) {
    case 0: // 路径是空数组，直接返回对象
      return obj;

    case 1: // 路径是一项，则直接删除当前项即可，底层调用数组的splice或对象的delete
      return _isInteger(path[0]) && _isArray(obj) ? remove(path[0], 1, obj) : dissoc(path[0], obj);

    default: // 超过一项需要递归来处理
      var head = path[0]; // 获取第一项
      var tail = Array.prototype.slice.call(path, 1); // 获取剩余项

      if (obj[head] == null) { // 如果第一项是null或undefined，直接返回不处理
        return obj;
      } else if (_isInteger(head) && _isArray(obj)) { // 逐步更新第一项所对象的值，分为数组和对象两种情况
        return update(head, dissocPath(tail, obj[head]), obj);
      } else {
        return assoc(head, dissocPath(tail, obj[head]), obj);
      }

  }
});

module.exports = dissocPath;
```

浅复制对象，删除返回对象中指定路径上的属性。在`remove`和`dissoc`、以及`update`和`assoc`中对对象进行了浅复制操作。

## divide

```js
/**
 * const reciprocal = R.divide(1);
 * reciprocal(4);   //=> 0.25
 */
var divide =
/*#__PURE__*/
_curry2(function divide(a, b) {
  return a / b;
});

module.exports = divide;
```

两数相除。等价于 a / b。

## drop

```js
var drop =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_dispatchable(['drop'], _xdrop, function drop(n, xs) {
  return slice(Math.max(0, n), Infinity, xs); // 截取数组的第n项到最后一项
}));

module.exports = drop;
```
删除给定 `list`，`string` 或者 `transducer/transformer`（或者具有 `drop` 方法的对象）的前 `n` 个元素。这里使用了数组的`slice`方法，丢弃前n个元素其实就是对数组执行`slice(Math.max(0, n), Infinity)`

## dropLastWhile

```js
/**
 *  R.dropLastWhile(x => x !== 'd' , 'Ramda'); //=> 'Ramd'
 */
function dropLastWhile(pred, xs) {
  var idx = xs.length - 1; // 初始化数组末尾索引，字符串同理

  while (idx >= 0 && pred(xs[idx])) { // 只要满足条件，就不断往前遍历，直到遇到第一个falsy值。
    idx -= 1;
  }

  return slice(0, idx + 1, xs); // 截取[0, idx]为新数组并返回
}

module.exports = dropLastWhile;
```

对 `list` 从后向前一直删除满足 `predicate` 的尾部元素，直到遇到第一个 `falsy` 值，此时停止删除操作。

## dropRepeatsWith

```js
function dropRepeatsWith(pred, list) {
  var result = [];
  var idx = 1;
  var len = list.length;

  if (len !== 0) {
    result[0] = list[0]; // 将list首项元素放入结果数组中，方便后续判断

    while (idx < len) { // 循环list
      if (!pred(last(result), list[idx])) { // 如果结果数组的最后一项和list当前去项不相等
        result[result.length] = list[idx]; // 则放入结果数组末尾
      }

      idx += 1; // 遍历list下一项
    }
  }

  return result;
}

var dropRepeats = dropRepeatsWith(equals);

module.exports = dropRepeats;

```

返回一个没有连续重复元素的 `list`。通过 `R.equals` 函数进行相等性判断。可以看出底层是使用`dropRepeatsWith`来实现。核心逻辑是通过比较结果数组的最后一项是否与list的当前元素是否相等，来决定这个元素是不是连续重复的。

## dropWhile

```js
/**
 * R.dropWhile(x => x !== 'd' , 'Ramda'); //=> 'da'
 */
function dropWhile(pred, xs) {
  var idx = 0;
  var len = xs.length;

  while (idx < len && pred(xs[idx])) {
    idx += 1;
  }

  return slice(idx, Infinity, xs);
}

module.exports = dropWhile;
```

对 `list` 从前向后删除满足 `predicate` 的头部元素，直到遇到第一个 `falsy` 值。与`dropLastWhile`类似，只不过这是从前往后进行删除。

## empty

```js
/**
 *  R.empty([1, 2, 3]);     //=> []
 * R.empty('unicorns');    //=> ''
 * R.empty({x: 1, y: 2});  //=> {}
 */
function empty(x) {
  return _isArray(x) ? [] : _isString(x) ? '' : _isObject(x) ? {} : _isArguments(x) ? function () {
    return arguments;
  }() : void 0 // else
  ;
};
```

根据传入参数的类型返回其对应的空值。Ramda 定义了各类型的空值如下：`Array ([])，Object ({})，String ('')，和 Arguments`。简化了一些内部属性的判断。其实就是通过三元运算符加上判断类型的函数，以此返回相应的空值。如果都不是，则返回`undefined`。

## eqBy

```js
/**
 * R.eqBy(Math.abs, 5, -5); //=> true
 */
var eqBy =
/*#__PURE__*/
_curry3(function eqBy(f, x, y) {
  return equals(f(x), f(y));
});

module.exports = eqBy;
```

接受一个函数和两个值，通过传入函数对两个值进行相等性判断。如果两个值的计算结果相等，则返回 `true` ；否则返回 `false` 。内部调用`equals`函数来判断传入函数执行两个值的结果。

## eqProps

```js
var eqProps =
/*#__PURE__*/
_curry3(function eqProps(prop, obj1, obj2) {
  return equals(obj1[prop], obj2[prop]);
});

module.exports = eqProps;
```

判断两个对象指定的属性值是否相等。通过 `R.equals` 函数进行相等性判断。可用作柯里化的 `predicate` 。`eqProps`同理，也是调用`equals`函数来判断。

## F

```js
/**
 * R.F(); //=> false
 */
var F = function () {
  return false;
};

module.exports = F;
```

恒定返回 `false` 的函数。忽略所有的输入参数。

## filter

```js
/**
 *  const isEven = n => n % 2 === 0;
 * R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
 * R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */
var filter = function (pred, filterable) {
  return _isObject(filterable) ? _reduce(function (acc, key) {
    if (pred(filterable[key])) {
      acc[key] = filterable[key];
    }

    return acc;
  }, {}, keys(filterable)) : // else
  _filter(pred, filterable);
}

module.exports = filter;
```

使用 `predicate` 遍历传入的 `Filterable`，返回满足 `predicate` 的所有元素的新的 `Filterable`。第二个参数自身存在 `filter` 方法，则调用自身的 `filter` 方法。这里只看不存在`filter`的处理方式。

分为对象和数组两种处理方式。如果是对象，那么使用内部函数`_reduce`，就像处理数组一样，将符合条件的属性放到新对象中。如果是数组，则调用内部函数`_filter`。实现如下：

```js
function _filter(fn, list) {
  var idx = 0;
  var len = list.length;
  var result = [];

  while (idx < len) { // 遍历list，如果满足条件则放入新数组
    if (fn(list[idx])) {
      result[result.length] = list[idx];
    }

    idx += 1;
  }

  return result;
}

module.exports = _filter;
```

## find

```js
/**
 * const xs = [{a: 1}, {a: 2}, {a: 3}];
 * R.find(R.propEq('a', 2))(xs); //=> {a: 2}
 */
var find = function find(fn, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (fn(list[idx])) { // 如果找到第一个符合条件的元素，则直接返回
      return list[idx];
    }

    idx += 1;
  }
}

module.exports = find;
```

查找并返回 `list` 中首个满足 `predicate` 的元素；如果未找到满足条件的元素，则返回 `undefined` 。若第二个参数自身存在 `find` 方法，则调用自身的 `find` 方法。这里重点看内部`find`的实现方式。核心就是循环`list`，找到第一个符合条件的元素，并返回。

## findIndex

```js
var findIndex = function findIndex(fn, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (fn(list[idx])) { // 如果找到第一个符合条件的元素，则直接返回当前索引
      return idx;
    }

    idx += 1;
  }

  return -1; // 找不到则返回-1
}

module.exports = findIndex;
```

查找并返回 `list` 中首个满足 `predicate` 的元素的索引；如果未找到满足条件的元素，则返回 -1 。

## flatten

```js
/**
 *  R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
 * //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 */
var flatten =
/*#__PURE__*/
_curry1(
/*#__PURE__*/
_makeFlat(true)); // 递归进行数组展开

module.exports = flatten;
```

获取 `list` 的所有元素（包含所有子数组中的元素），然后由这些元素组成一个新的数组。深度优先。核心是内部函数`_makeFlat`的实现，下面是代码：

```js
function _makeFlat(recursive) {
  return function flatt(list) {
    var value, jlen, j;
    var result = [];
    var idx = 0;
    var ilen = list.length;

    while (idx < ilen) {
      if (_isArrayLike(list[idx])) {
        value = recursive ? flatt(list[idx]) : list[idx]; // 如果递归则无限展开，否则只展开一层
        j = 0;
        jlen = value.length;

        while (j < jlen) {
          result[result.length] = value[j]; // 将处理过的值追加到结果数组末尾
          j += 1;
        }
      } else {
        result[result.length] = list[idx]; // 当前元素不是数组，则直接追加到结果数组末尾
      }

      idx += 1;
    }

    return result;
  };
}

module.exports = _makeFlat;
```

注意这里是深度优先。当遇到数组的某一项是数组时，递归调用`flatt`，并将返回值追加到结果数组当中。

## flip

```js
/**
 * const mergeThree = (a, b, c) => [].concat(a, b, c);
 * mergeThree(1, 2, 3); //=> [1, 2, 3]
 * R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
 */
var flip =
/*#__PURE__*/
_curry1(function flip(fn) {
  return curryN(fn.length, function (a, b) {
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = b;
    args[1] = a;
    return fn.apply(this, args);
  });
});

module.exports = flip;
```

交换函数前两个参数的位置。核心逻辑是浅复制形参，然后调换前两个参数的位置。最后将新的参数顺序传入`fn`中并执行。

## forEach

```js
var forEach =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_checkForMethod('forEach', function forEach(fn, list) {
  var len = list.length;
  var idx = 0;

  while (idx < len) {
    fn(list[idx]);
    idx += 1;
  }

  return list;
}));

module.exports = forEach;
```

遍历 `list`，对 `list` 中的每个元素执行方法 `fn`。还要注意, 不同于 `Array.prototype.forEach`，`Ramda` 的 `forEach` 会将原数组返回。
诚如官方文档所说，会将原数组进行返回。这样做可以进行函数组合。核心逻辑是，使用`while`遍历`list`，对每个元素执行方法fn。最后返回原数组。若第二个参数自身存在 `forEach` 方法，则调用自身的 `forEach` 方法。

## forEachObjIndexed

```js
var forEachObjIndexed =
/*#__PURE__*/
_curry2(function forEachObjIndexed(fn, obj) {
  var keyList = keys(obj); // 得到键组成的list
  var idx = 0;

  while (idx < keyList.length) { // 遍历键list
    var key = keyList[idx];
    fn(obj[key], key, obj); // 将(value, key, obj)传入fn并执行
    idx += 1;
  }

  return obj;
});

module.exports = forEachObjIndexed;
```

遍历 `object`，对 `object` 中的每对 `key` 和 `value` 执行方法 `fn`。由于对象本身不支持迭代，因此使用`Object.keys`得到键组成的`list`。然后遍历`list`依次获得对象中的键值对，然后传入fn中并执行。

## fromPairs

```js
/**
 * R.fromPairs([['a', 1], ['b', 2], ['c', 3]]); //=> {a: 1, b: 2, c: 3}
 */
var fromPairs =
/*#__PURE__*/
_curry1(function fromPairs(pairs) {
  var result = {};
  var idx = 0;

  while (idx < pairs.length) { // 遍历键值对
    result[pairs[idx][0]] = pairs[idx][1]; // 依次将键值对放入结果对象中，相同的键值对，后面的会覆盖前面的
    idx += 1;
  }

  return result;
});

module.exports = fromPairs;
```

由一系列 “键值对” 创建一个 `object`。如果某个键出现多次，选取最右侧的键值对。

## groupWith

```js
/**
 * R.groupWith(R.equals, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0], [1, 1], [2], [3], [5], [8], [13], [21]]
 * R.groupWith((a, b) => a + 1 === b, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0, 1], [1, 2, 3], [5], [8], [13], [21]]
 */
var groupWith =
/*#__PURE__*/
_curry2(function (fn, list) {
  var res = [];
  var idx = 0; // list的当前索引，理解为左指针
  var len = list.length;

  while (idx < len) { // 循环list
    var nextidx = idx + 1; // 初始化下一个索引，理解为右指针

    while (nextidx < len && fn(list[nextidx - 1], list[nextidx])) { // 索引不越界的同时，比较当前元素和下一个元素
      nextidx += 1; // 满足条件则索引累加，判断下一个元素与后面元素的关系
    }

    res.push(list.slice(idx, nextidx)); // 将满足条件的元素截取为新数组并放入结果数组末尾
    idx = nextidx; // 左指针指向右指针，开始下次循环
  }

  return res;
});

module.exports = groupWith;
```

通过给定的对比函数，将列表按顺序分割成多组子列表。对比函数只比较相邻元素。核心逻辑是利用双指针来确定满足对比函数的一组元素。比较巧妙的是，右指针默认指向当前左指针的下一个元素，而`slice`方法的第二个位置是不包含的。因此从下一个索引比较就避免了不包含的问题。

## gt

```js
/**
 * R.gt(2, 1); //=> true
 */
var gt =
/*#__PURE__*/
_curry2(function gt(a, b) {
  return a > b; // 使用大于判断
});

module.exports = gt;
```

如果首个参数大于第二个参数，返回 `true`；否则返回 `false`。利用柯里化使函数可以分别接受参数。

## gte

```js
var gte =
/*#__PURE__*/
_curry2(function gte(a, b) {
  return a >= b; // 使用大于等于判断
});

module.exports = gte;
```

如果首个参数大于或等于第二个参数，返回 `true`；否则返回 `false`。

## has

```js
/**
 * const hasName = R.has('name');
 * hasName({name: 'alice'});   //=> true
 */
var has =
/*#__PURE__*/
_curry2(function has(prop, obj) {
  return hasPath([prop], obj);
});

module.exports = has;
```

如果对象自身含有指定的属性，则返回 `true`；否则返回 `false`。内部是通过`hasPath`来实现的。

## hasPath

```js
/**
 *  R.hasPath(['a', 'b'], {a: {b: 2}});         // => true
 */
var hasPath =
/*#__PURE__*/
_curry2(function hasPath(_path, obj) {
  if (_path.length === 0 || isNil(obj)) {
    return false;
  }

  var val = obj;
  var idx = 0;

  while (idx < _path.length) {
    if (!isNil(val) && _has(_path[idx], val)) { // 如果当前对象不为空，且指定属性存在于对象中
      val = val[_path[idx]]; // 缓存指定属性对应的值，下一次循环时判断
      idx += 1;
    } else {
      return false;
    }
  }

  return true;
});

module.exports = hasPath;
```

检查对象中是否存在指定的路径。只检查对象自身的属性。可以看到，底层又反过来调用`_has`。个人愚见，其实可以直接递归调用`hasPath`，毕竟`_has`就是用`hasPath`实现的。

## hasIn

```js
var hasIn =
/*#__PURE__*/
_curry2(function hasIn(prop, obj) {
  return prop in obj;
});

module.exports = hasIn;
```

如果对象自身或其原型链上含有指定的属性，则返回 `true`；否则返回 `false`。实际上就是使用了`in`运算符进行判断。同时支持了函数柯里化。

## identical

```js
var identical =
/*#__PURE__*/
_curry2(_objectIs);

module.exports = identical;
```

如果两个参数是完全相同，则返回 `true`，否则返回 `false`。注意：这只是 ES6 `Object.is` 的柯里化版本而已。我们来看下`_objectIs`是如何实现的。

```js
function _objectIs(a, b) {
  // SameValue algorithm
  if (a === b) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return a !== 0 || 1 / a === 1 / b; // 0 和 -0 不是完全相同的
  } else {
    // Step 6.a: NaN == NaN
    return a !== a && b !== b; // NaN 和 NaN 是完全相同的
  }
}

module.exports = typeof Object.is === 'function' ? Object.is : _objectIs;
```

可以看出，如果`Object.is`存在则直接调用，否则调用内部函数。内部函数主要处理了恒等符号关于`+0`、`-0`以及`NaN`判断的问题。

## identity

```js
var identity =
/*#__PURE__*/
_curry1(_identity);

module.exports = identity;
```

将输入值原样返回。适合用作默认或占位函数。内部函数实现很简单，如下：

```js
function _identity(x) {
  return x;
}
```

## ifElse

```js
/**
 * const incCount = R.ifElse(
 *  R.has('count'),
 *  R.over(R.lensProp('count'), R.inc),
 *  R.assoc('count', 1)
 * );
 * incCount({});           //=> { count: 1 }
 * incCount({ count: 1 }); //=> { count: 2 }
 */
var ifElse =
/*#__PURE__*/
_curry3(function ifElse(condition, onTrue, onFalse) {
  return curryN(Math.max(condition.length, onTrue.length, onFalse.length), function _ifElse() {
    return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
  });
});

module.exports = ifElse;
```

根据 `condition predicate` 的返回值调用 `onTrue` 或 `onFalse` 函数。这里进行了柯里化的处理。其余逻辑就是普通的三元运算符加上函数的执行。

## inc

```js
var inc =
/*#__PURE__*/
add(1);
module.exports = inc;
```

很简单，函数的作用就是加1。符合原子化的操作。

## includes

```js
var includes =
/*#__PURE__*/
_curry2(_includes);

module.exports = includes;
```

内部函数`_includes`实现如下：

```js
var _indexOf =
/*#__PURE__*/
require("./_indexOf");

function _includes(a, list) {
  return _indexOf(list, a, 0) >= 0;
}

module.exports = _includes;
```

只要列表中有一个元素等于指定值，则返回 `true`；否则返回 `false`。如果原生支持`indexOf`方法，则使用`indexOf`判断索引值是否大于等于0；否则通过 `R.equals` 函数进行相等性判断。

## indexOf

```js
/**
 * R.indexOf(3, [1,2,3,4]); //=> 2
 * R.indexOf(10, [1,2,3,4]); //=> -1
 */
var indexOf =
/*#__PURE__*/
_curry2(function indexOf(target, xs) {
  return typeof xs.indexOf === 'function' && !_isArray(xs) ? xs.indexOf(target) : _indexOf(xs, target, 0);
});

module.exports = indexOf;
```

返回给定元素在数组中首次出现时的索引值，如果数组中没有该元素，则返回 -1。当参数是数组时，走的其实是内部函数`_indexOf`，原因是IE9以下数组没有`indexOf`方法，因此需要自己实现。下面就具体看下实现：

```js
var equals =
/*#__PURE__*/
require("../equals");

function _indexOf(list, a, idx) {
  var inf, item; // Array.prototype.indexOf doesn't exist below IE9

  if (typeof list.indexOf === 'function') { // list上存在indexOf方法
    switch (typeof a) {
      case 'number':
        if (a === 0) {
          // manually crawl the list to distinguish between +0 and -0
          inf = 1 / a; // 使用+Infinity和-Infinity来区分+0和-0

          while (idx < list.length) {
            item = list[idx];

            if (item === 0 && 1 / item === inf) { // 处理+0和-0的问题，这里认为两者不相等
              return idx;
            }

            idx += 1;
          }

          return -1;
        } else if (a !== a) { // 使用 a !== a 且 b !== b 来比较NaN
          // NaN
          while (idx < list.length) {
            item = list[idx];

            if (typeof item === 'number' && item !== item) { // 处理NaN和NaN的问题，这里认为两者相等
              return idx;
            }

            idx += 1;
          }

          return -1;
        } // non-zero numbers can utilise Set


        return list.indexOf(a, idx); // 从指定索引开始查找
      // all these types can utilise Set

      case 'string':
      case 'boolean':
      case 'function':
      case 'undefined':
        return list.indexOf(a, idx); // 参数为上述四种类型时，正常查找

      case 'object':
        if (a === null) {
          // null can utilise Set
          return list.indexOf(a, idx); // 参数为null时，正常查找
        }

    }
  } // anything else not covered above, defer to R.equals


  // list上不存在indexOf方法
  while (idx < list.length) { // 退化为使用R.equals来判断值的相等
    if (equals(list[idx], a)) {
      return idx;
    }

    idx += 1;
  }

  return -1;
}

module.exports = _indexOf;
```

可以看出，优先考虑使用原生的`indexOf`方法，如果没有，则使用`R.equals`进行判断。

## init

```js
/**
 * R.init([1, 2, 3]);  //=> [1, 2]
 * R.init('abc');  //=> 'ab'
 */
var init =
/*#__PURE__*/
slice(0, -1);
module.exports = init;
```

返回 `list` 或 `string` 删除最后一个元素后的部分。本质就是使用`slice`截取掉最后一个元素。

## insert

```js
/**
 * R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]
 */
var insert =
/*#__PURE__*/
_curry3(function insert(idx, elt, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  var result = Array.prototype.slice.call(list, 0);
  result.splice(idx, 0, elt);
  return result;
});

module.exports = insert;
```

将元素插入到 `list` 指定索引处。注意，该函数是非破坏性的：返回处理后列表的拷贝。函数运行过程中不会破坏任何列表。既然是函数式编程，当然不能修改原数组啦。这里通过`slice`的方式复制了一份数组。如果传入的`idx`在`list`的范围内则不作处理，否则处理为`list`的长度。
按照MDN的定义，`idx`如果超出了数组的长度，则从数组末尾开始添加内容。如果是负值，则表示从数组末位开始的第几位。但是这里并没有兼容负数的情况。`splice`会修改原数组，因此需要拷贝一份。

## insertAll

```js
/**
 *  R.insertAll(2, ['x','y','z'], [1,2,3,4]); //=> [1,2,'x','y','z',3,4]
 */
var insertAll =
/*#__PURE__*/
_curry3(function insertAll(idx, elts, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  return [].concat(Array.prototype.slice.call(list, 0, idx), elts, Array.prototype.slice.call(list, idx));
});

module.exports = insertAll;
```

将元素插入到 `list` 指定索引处。注意，该函数是非破坏性的：返回处理后列表的拷贝。函数运行过程中不会破坏任何列表。有趣的是，跟`insert`不同，这里没有使用`splice`来添加多个值，因为第三个参数是可以添加多个值。这里采用了数组的截取加拼接的方式。首先截取插入部分以前的数组，然后截取插入部分以后的数组，再通过`concat`将三者按照顺序进行拼接并返回。
上述两个方法需要熟练掌握`slice`和`splice`的使用。

## intersection

```js
var intersection =
/*#__PURE__*/
_curry2(function intersection(list1, list2) {
  var lookupList, filteredList;

  if (list1.length > list2.length) {
    lookupList = list1;
    filteredList = list2;
  } else {
    lookupList = list2;
    filteredList = list1;
  }

  return uniq(_filter(flip(_includes)(lookupList), filteredList));
});

module.exports = intersection;
```
取出两个 list 中相同的元素组成的 set （集合：没有重复元素）。

## intersperse

```js
var intersperse =
/*#__PURE__*/
_curry2(
/*#__PURE__*/
_checkForMethod('intersperse', function intersperse(separator, list) {
  var out = [];
  var idx = 0;
  var length = list.length;

  while (idx < length) {
    if (idx === length - 1) {
      out.push(list[idx]);
    } else {
      out.push(list[idx], separator);
    }

    idx += 1;
  }

  return out;
}));
```

在列表的元素之间插入分割元素。核心思路是在新创建的`out`数组中，依次`push`遍历的当前元素以及分隔元素。如果索引位于数组末尾，则不添加分割元素。

## invertObj

```js

/**
 * const raceResults = {
       first: 'alice',
       second: 'jake'
     };
     R.invertObj(raceResults);
     //=> { 'alice': 'first', 'jake':'second' }
 */
var invertObj =
/*#__PURE__*/
_curry1(function invertObj(obj) {
  var props = keys(obj);
  var len = props.length;
  var idx = 0;
  var out = {};

  while (idx < len) {
    var key = props[idx];
    out[obj[key]] = key;
    idx += 1;
  }

  return out;
});

module.exports = invertObj;

```

将对象的键、值交换位置：值作为键，对应的键作为值。交换后的键会被强制转换为字符串。注意，如果原对象同一值对应多个键，采用最后遍历到的键。核心思路是拿到原对象的键集合，遍历该集合，将原对象的值转换为新对象`out`的键，原对象的键转换为新对象`out`的值。最终返回新对象。

## invert

```js
/**
     const raceResultsByFirstName = {
       first: 'alice',
       second: 'jake',
       third: 'alice',
     };
     R.invert(raceResultsByFirstName);
     //=> { 'alice': ['first', 'third'], 'jake':['second'] }
 */
var invert =
/*#__PURE__*/
_curry1(function invert(obj) {
  var props = keys(obj);
  var len = props.length;
  var idx = 0;
  var out = {};

  while (idx < len) {
    var key = props[idx];
    var val = obj[key];
    var list = _has(val, out) ? out[val] : out[val] = [];
    list[list.length] = key;
    idx += 1;
  }

  return out;
});
```

与 R.invertObj 类似，但会将值放入数组中，来处理一个键对应多个值的情况。该方法不会覆盖值，而是会放到数组中。核心逻辑是，判断新对象out里是否有原对象的值组成的属性，如果没有则以原对象的值为属性，空数组为值。如果有则往数组中追加值。

## is

```js
/**
     R.is(Object, {}); //=> true
     R.is(Number, 1); //=> true
     R.is(Object, 1); //=> false
     R.is(String, 's'); //=> true
     R.is(String, new String('')); //=> true
     R.is(Object, new String('')); //=> true
     R.is(Object, 's'); //=> false
     R.is(Number, {}); //=> false
 */
var is =
/*#__PURE__*/
_curry2(function is(Ctor, val) {
  return val != null && val.constructor === Ctor || val instanceof Ctor;
});
```

检测一个对象（val）是否是给定构造函数的实例。该函数会依次检测其原型链，如果存在的话。首先判断给定值是否不为`null`或者`undefined`，因为这两者没有原型。然后判断`Ctor`是否为给定值的构造函数，如果不是则查找原型链。而`instanceof`操作符刚好返回布尔值，因此直接返回结果即可。

## isEmpty

```js
/**
     R.isEmpty([1, 2, 3]);   //=> false
     R.isEmpty([]);          //=> true
     R.isEmpty('');          //=> true
     R.isEmpty(null);        //=> false
     R.isEmpty({});          //=> true
     R.isEmpty({length: 0}); //=> false
 */
var isEmpty =
/*#__PURE__*/
_curry1(function isEmpty(x) {
  return x != null && equals(x, empty(x));
});
```

检测给定值是否为其所属类型的空值，若是则返回 `true` ；否则返回 `false` 。可以看出，如果参数为`null`或者`undefined`，则返回`false`。然后判断参数和被empty处理后的是否相等，这里认为空数组、空对象等也是相等的。empty会将数组处理为空数组、对象处理为空对象、字符串处理为空字符串。

## isNil

```js

/**
     R.isNil(null); //=> true
     R.isNil(undefined); //=> true
     R.isNil(0); //=> false
     R.isNil([]); //=> false
 */
var isNil =
/*#__PURE__*/
_curry1(function isNil(x) {
  return x == null;
});
```

检测输入值是否为 null 或 undefined 。

## keys

```js
var hasEnumBug = !
/*#__PURE__*/
{
  toString: null
}.propertyIsEnumerable('toString');
var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString']; // Safari bug

var hasArgsEnumBug =
/*#__PURE__*/
function () {
  'use strict';

  return arguments.propertyIsEnumerable('length');
}();

var contains = function contains(list, item) {
  var idx = 0;

  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }

    idx += 1;
  }

  return false;
};

var keys = typeof Object.keys === 'function' && !hasArgsEnumBug ?
/*#__PURE__*/
_curry1(function keys(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
}) :
/*#__PURE__*/
_curry1(function keys(obj) {
  if (Object(obj) !== obj) {
    return [];
  }

  var prop, nIdx;
  var ks = [];

  var checkArgsLength = hasArgsEnumBug && _isArguments(obj);

  for (prop in obj) {
    if (_has(prop, obj) && (!checkArgsLength || prop !== 'length')) {
      ks[ks.length] = prop;
    }
  }

  if (hasEnumBug) {
    nIdx = nonEnumerableProps.length - 1;

    while (nIdx >= 0) {
      prop = nonEnumerableProps[nIdx];

      if (_has(prop, obj) && !contains(ks, prop)) {
        ks[ks.length] = prop;
      }

      nIdx -= 1;
    }
  }

  return ks;
});
```

返回给定对象所有可枚举的、自身属性的属性名组成的列表。注意，不同 JS 运行环境输出数组的顺序可能不一致。先看一下前置的方法，方法中使用了`propertyIsEnumerable`，根据MDN的解释，`propertyIsEnumerable()` 方法返回一个布尔值，表示指定的属性是否可枚举。不能枚举的属性的白名单包括`'constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'`共7个属性，这些不能枚举的属性需要我们牢记在心。
如果Object.keys存在，则使用该方法进行处理。如果不存在，则继续往下走。这里还有一个前置判断，那就是`Object(obj) !== obj`，这个逻辑可以用来判断obj是否为对象，如果不是对象，那么就不相等。此时直接返回空数组。
核心逻辑是：使用for...in遍历对象，如果属性是自有属性，并且length属性不可枚举，或者length属性可枚举但当前属性不是length属性时，将当前属性逐一放至新数组ks中。如果有枚举的bug，则判断不能枚举的值是否属于自有属性，并放至新数组ks中。

## keysIn

```js
var keysIn =
/*#__PURE__*/
_curry1(function keysIn(obj) {
  var prop;
  var ks = [];

  for (prop in obj) {
    ks[ks.length] = prop;
  }

  return ks;
});

```

返回给定对象所有属性（包括 prototype 属性）的属性名组成的列表。注意，不同 JS 运行环境输出数组的顺序可能不一致。其实核心就是使用for...in遍历自有属性以及原型链上的属性。

## last

```js
var last =
/*#__PURE__*/
nth(-1);
```

返回列表或字符串的最后一个元素。内部调用的是nth方法，该方法后续会进行介绍。主要逻辑其实就是如果是字符串，则使用charAt取最后一个字符，如果是数组，则取数组长度 - 1的那一项。

## lastIndexOf

```js
/**
     R.lastIndexOf(3, [-1,3,3,0,1,2,3,4]); //=> 6
     R.lastIndexOf(10, [1,2,3,4]); //=> -1
 */
var lastIndexOf =
/*#__PURE__*/
_curry2(function lastIndexOf(target, xs) {
  if (typeof xs.lastIndexOf === 'function' && !_isArray(xs)) {
    return xs.lastIndexOf(target);
  } else {
    var idx = xs.length - 1;

    while (idx >= 0) {
      if (equals(xs[idx], target)) {
        return idx;
      }

      idx -= 1;
    }

    return -1;
  }
});
```

返回数组中某元素最后一次出现的位置，如果数组中不包含该项则返回 -1 。通过 R.equals 函数进行相等性判断。如果数组自带`lastIndexOf`方法，则直接调用。否则初始化索引，从后往前进行对比，找到目标元素所在的索引。

## length

```js
var length =
/*#__PURE__*/
_curry1(function length(list) {
  return list != null && _isNumber(list.length) ? list.length : NaN;
});
```

通过 `list.length`，返回数组的大小（数组中元素的数量）。如果`list`不为`null`或者`undefined`，并且存在`length`属性时，返回数组长度；否则返回NaN。

## mapAccum

```js
/**
     const digits = ['1', '2', '3', '4'];
     const appender = (a, b) => [a + b, a + b];

     R.mapAccum(appender, 0, digits); //=> ['01234', ['01', '012', '0123', '01234']]
 */
var mapAccum =
/*#__PURE__*/
_curry3(function mapAccum(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = [];

  // 元组默认值为第二个参数acc
  var tuple = [acc];

  while (idx < len) {

    // 元组的第一项是累积值
    tuple = fn(tuple[0], list[idx]);

    // 元组的第二项是当前值，并保存到结果数组中
    result[idx] = tuple[1];
    idx += 1;
  }

  // 返回元组第一项累积值，以及结果数组组成的元组
  return [tuple[0], result];
});
```

mapAccum 的行为类似于 map 和 reduce 的组合；它将迭代函数作用于列表中的每个元素，从左往右传递经迭代函数计算的累积值，并将最后的累积值和由所有中间的累积值组成的列表一起返回。

## mapAccumRight

```js
/**
     const digits = ['1', '2', '3', '4'];
     const appender = (a, b) => [b + a, b + a];

     R.mapAccumRight(appender, 5, digits); //=> ['12345', ['12345', '2345', '345', '45']]
 */
var mapAccumRight =
/*#__PURE__*/
_curry3(function mapAccumRight(fn, acc, list) {
  var idx = list.length - 1;
  var result = [];
  var tuple = [acc];

  // 从列表最后一项开始遍历，其余逻辑跟mapAccum类似
  while (idx >= 0) {
    tuple = fn(tuple[0], list[idx]);
    result[idx] = tuple[1];
    idx -= 1;
  }

  return [tuple[0], result];
});
```

mapAccumRight 的行为类似于 `map` 和 `reduce` 的组合；它将迭代函数作用于列表中的每个元素，从右往左传递经迭代函数计算的累积值，并将最后的累积值和由所有中间的累积值组成的列表一起返回。

和 mapAccum 类似，除了列表遍历顺序是从右往左的。

## mapObjIndexed

```js
/**
     const xyz = { x: 1, y: 2, z: 3 };
     const prependKeyAndDouble = (num, key, obj) => key + (num * 2);

     R.mapObjIndexed(prependKeyAndDouble, xyz); //=> { x: 'x2', y: 'y4', z: 'z6' }
 */
var mapObjIndexed =
/*#__PURE__*/
_curry2(function mapObjIndexed(fn, obj) {
  return _reduce(function (acc, key) {
    acc[key] = fn(obj[key], key, obj);
    return acc;
  }, {}, keys(obj));
});
```

Object 版本的 map。mapping function 接受三个参数： (value, key, obj) 。如果仅用到参数 value，则用 map 即可。可以看出，其实核心采用了内部方法_reduce来实现，只要了解了`_reduce`的实现逻辑，再来看就非常简单了。
学习完`_reduce`的实现，再回过头来看，可以发现这里是针对对象的键组成的数组来`reduce`，将fn处理后的结果赋值给`acc[key]`，并最终返回acc累积的对象。

## _reduce

```js

// 处理（类）数组的reduce
function _arrayReduce(xf, acc, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {

    // 执行xf(acc, list[idx])，并将结果更新到acc上
    acc = xf['@@transducer/step'](acc, list[idx]);

    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }

    idx += 1;
  }

  // 最终返回acc
  return xf['@@transducer/result'](acc);
}

// 可迭代对象的reduce
function _iterableReduce(xf, acc, iter) {
  var step = iter.next();

  while (!step.done) {

    // 执行xf(acc, step.value)，并将结果更新到acc上
    acc = xf['@@transducer/step'](acc, step.value);

    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }

    // 继续迭代下一步
    step = iter.next();
  }

  // 最终返回acc
  return xf['@@transducer/result'](acc);
}

// 调用obj上指定的方法
function _methodReduce(xf, acc, obj, methodName) {
  return xf['@@transducer/result'](obj[methodName](bind(xf['@@transducer/step'], xf), acc));
}

// 处理可迭代的标记
var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';
export default function _reduce(fn, acc, list) {
  if (typeof fn === 'function') {

    // 再原型上添加'@@transducer/init'、'@@transducer/result'、'@@transducer/step'方法，方便后续的判断
    fn = _xwrap(fn);
  }

  // 如果是数组或者类数组，则走该分支
  if (_isArrayLike(list)) {
    return _arrayReduce(fn, acc, list);
  }

  // 如果原型链上有'fantasy-land/reduce'方法，则走这里
  if (typeof list['fantasy-land/reduce'] === 'function') {
    return _methodReduce(fn, acc, list, 'fantasy-land/reduce');
  }

  // 如果数据是可迭代的，则走这里
  if (list[symIterator] != null) {
    return _iterableReduce(fn, acc, list[symIterator]());
  }

  // 如果是生成器，也就是可迭代的
  if (typeof list.next === 'function') {
    return _iterableReduce(fn, acc, list);
  }

  // 如果支持reduce，则走这里
  if (typeof list.reduce === 'function') {
    return _methodReduce(fn, acc, list, 'reduce');
  }

  // 处理不了，直接报错
  throw new TypeError('reduce: list must be array or iterable');
}
```

## match

```js
var match =
/*#__PURE__*/
_curry2(function match(rx, str) {
  return str.match(rx) || [];
});
```

正则匹配字符串。注意，如果没有匹配项，则返回空数组。和 String.prototype.match 不同，后者在没有匹配项时会返回 `null`。 其实就是使用字符串的`match`方法，如果该方法返回的`null`，则做兜底处理，直接返回空数组。

## mathMod

```js
/**
     R.mathMod(-17, 5);  //=> 3
     R.mathMod(17, 5);   //=> 2
     R.mathMod(17, -5);  //=> NaN
     R.mathMod(17, 0);   //=> NaN
     R.mathMod(17.2, 5); //=> NaN
     R.mathMod(17, 5.3); //=> NaN
 */
var mathMod =
/*#__PURE__*/
_curry2(function mathMod(m, p) {
  if (!_isInteger(m)) {
    return NaN;
  }

  if (!_isInteger(p) || p < 1) {
    return NaN;
  }

  return (m % p + p) % p;
});
```

mathMod 和算术取模操作类似，而不像 % 操作符 （或 R.modulo）。所以 -17 % 5 等于 -2，而 mathMod(-17, 5) 等于 3 。`mathMod` 要求参数为整型，并且当模数等于 0 或者负数时返回 NaN 。
有几个限制条件需要注意。如果第一个参数不是整型，则直接返回NaN。如果第二个参数不是整型，或者小于1时，也直接返回NaN。

## max

```js
/**
     R.max(789, 123); //=> 789
     R.max('a', 'b'); //=> 'b'
 */
var max =
/*#__PURE__*/
_curry2(function max(a, b) {
  return b > a ? b : a;
});
```

这个正如其名，返回两个参数中的较大值。

## maxBy

```js
/**
     //  square :: Number -> Number
     const square = n => n * n;

     R.maxBy(square, -3, 2); //=> -3
 */
var maxBy =
/*#__PURE__*/
_curry3(function maxBy(f, a, b) {
  return f(b) > f(a) ? b : a;
});
```

接收一个函数和两个值，返回使给定函数执行结果较大的值。与`max`函数类似，这里接收函数来处理参数。

## mean

```js
/**
     R.mean([2, 7, 9]); //=> 6
     R.mean([]); //=> NaN
 */
var mean =
/*#__PURE__*/
_curry1(function mean(list) {
  return sum(list) / list.length;
});
```

返回给定数字列表的平均值。该函数是用来处理List的，内部调用了`sum`函数，而`sum`函数的内部调用了`reduce(add, 0)`，也就是说，是通过`reduce`逐步累加计算出总和。如果传入空数组，那么`reduce`的结果便是0，`list`的长度也是0，`0 / 0`的结果为NaN。

## median

```js
/**
     R.median([2, 9, 7]); //=> 7
     R.median([7, 2, 10, 9]); //=> 8
     R.median([]); //=> NaN
 */
var median =
/*#__PURE__*/
_curry1(function median(list) {
  var len = list.length;

  if (len === 0) {
    return NaN;
  }

  var width = 2 - len % 2;
  var idx = (len - width) / 2;
  return mean(Array.prototype.slice.call(list, 0).sort(function (a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }).slice(idx, idx + width));
});
```

返回给定数字列表的中位数。这里采用`sort`对数组进行排序，然后分割出数组的中间部分求出平均值。因为`sort`会改变原数组，所以采用`Array.prototype.slice.call(list, 0)`进行浅复制。当数组为偶数项时，`width = idx + 2`，当数组为奇数项时，`width = idx + 1`。

## memoizeWith

```js
/**
     let count = 0;
     const factorial = R.memoizeWith(R.identity, n => {
       count += 1;
       return R.product(R.range(1, n + 1));
     });
     factorial(5); //=> 120
     factorial(5); //=> 120
     factorial(5); //=> 120
     count; //=> 1
 */
var memoizeWith =
/*#__PURE__*/
_curry2(function memoizeWith(mFn, fn) {
  var cache = {};
  return _arity(fn.length, function () {
    var key = mFn.apply(this, arguments);

    if (!_has(key, cache)) {
      cache[key] = fn.apply(this, arguments);
    }

    return cache[key];
  });
});
```

创建一个新函数，当调用时，会执行原函数，输出结果；并且缓存本次的输入参数及其对应的结果。 后续，若用相同的参数对缓存函数进行调用，不会再执行原函数，而是直接返回该参数对应的缓存值。
`memoizeWith` 接受两个函数，第一个会将输入参数序列化为缓存键值对的“键值”，第二个是需要缓存的函数。内部是通过闭包cache对象来缓存执行过的函数。如果第一个参数的结果存在于cache中，则直接返回缓存的结果。

## mergeAll

```js
/**
     R.mergeAll([{foo:1},{bar:2},{baz:3}]); //=> {foo:1,bar:2,baz:3}
     R.mergeAll([{foo:1},{foo:2},{bar:2}]); //=> {foo:2,bar:2}
 */
var mergeAll =
/*#__PURE__*/
_curry1(function mergeAll(list) {
  return _objectAssign.apply(null, [{}].concat(list));
});
```

将对象类型列表合并为一个对象。从源码里可以看出，是将空对象`{}`拼接到`list`前面，并调用`_objectAssign`来实现合并。`list`里每一项都会作为内部方法的参数，包括新拼接的空对象。下面就看下`_objectAssign`的实现。
回过头来看，`mergeAll`通过接收一个数组来合并对象，只需将拼接了空对象的数组传递给apply的第二个参数，就可以实现拼接N个对象。

## _objectAssign

```js
function _objectAssign(target) {

  // 不能转换undefined或者null
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  // 显示将第一个参数转换为对象，以此为基准进行合并
  var output = Object(target);
  var idx = 1;

  // 缓存所有参数的个数
  var length = arguments.length;

  // 从第二个参数开始遍历
  while (idx < length) {
    var source = arguments[idx];

    if (source != null) {
      for (var nextKey in source) {
        if (_has(nextKey, source)) {
          // 对象上的自有属性会浅拷贝到output对象中，意味着同名属性后面会覆盖前面的
          output[nextKey] = source[nextKey];
        }
      }
    }

    idx += 1;
  }

  // 返回合并后的对象
  return output;
}

// 优先使用对象的原生方法assign，如果没有则使用_objectAssign
export default typeof Object.assign === 'function' ? Object.assign : _objectAssign;
```

可以将`_objectAssign`看作是对`assign`的实现。

## mergeLeft

```js
/**
     R.mergeLeft({ 'age': 40 }, { 'name': 'fred', 'age': 10 });
     //=> { 'name': 'fred', 'age': 40 }
 */
var mergeLeft =
/*#__PURE__*/
_curry2(function mergeLeft(l, r) {
  return _objectAssign({}, r, l);
});
```

合并两个对象的自身属性（不包括 `prototype` 属性）。如果某个 `key` 在两个对象中都存在，使用前一个对象对应的属性值。按照上面分析的`_objectAssign`的实现，后面对象的同名属性会覆盖前面的，因此如果想以前一个对象属性为基准，将前一个对象放到靠后的位置即可。

## mergeRight

```js
/**
     R.mergeRight({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
     //=> { 'name': 'fred', 'age': 40 }
 */
var mergeRight =
/*#__PURE__*/
_curry2(function mergeRight(l, r) {
  return _objectAssign({}, l, r);
});
```

合并两个对象的自身属性（不包括 prototype 属性）。如果某个 key 在两个对象中都存在，使用后一个对象对应的属性值。与`mergeLeft`类似，合并顺序相反。

## mergeWithKey

```js
/**
     let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
     R.mergeWithKey(concatValues,
                    { a: true, thing: 'foo', values: [10, 20] },
                    { b: true, thing: 'bar', values: [15, 35] });
     //=> { a: true, b: true, thing: 'bar', values: [10, 20, 15, 35] }
 */
var mergeWithKey =
/*#__PURE__*/
_curry3(function mergeWithKey(fn, l, r) {
  var result = {};
  var k;

  for (k in l) {
    // 处理l中的自有属性，如果当前属性也存在于r中，则使用fn进行处理
    if (_has(k, l)) {
      result[k] = _has(k, r) ? fn(k, l[k], r[k]) : l[k];
    }
  }

  for (k in r) {
    // 处理r中的自有属性，仅处理结果对象中尚不存在的属性
    // 如果结果对象中已存在，只能说明该属性是l和r中共有的，已被fn处理过，不能进行覆盖
    if (_has(k, r) && !_has(k, result)) {
      result[k] = r[k];
    }
  }

  // 返回合并后的对象
  return result;
});
```

使用给定的两个对象自身属性（不包括 prototype 属性）来创建一个新对象。

如果某个 key 在两个对象中都存在，则使用给定的函数对该 key 和每个对象该 key 对应的 value 进行处理，处理结果作为新对象该 key 对应的值。

## mergeWith

```js
/**
     R.mergeWith(R.concat,
                 { a: true, values: [10, 20] },
                 { b: true, values: [15, 35] });
     //=> { a: true, b: true, values: [10, 20, 15, 35] }
 */
var mergeWith =
/*#__PURE__*/
_curry3(function mergeWith(fn, l, r) {
  return mergeWithKey(function (_, _l, _r) {
    return fn(_l, _r);
  }, l, r);
});
```

使用给定的两个对象自身属性（不包括 prototype 属性）来创建一个新对象。

如果某个 key 在两个对象中都存在，则使用给定的函数对每个对象该 key 对应的 value 进行处理，处理结果作为新对象该 key 对应的值。

可以看出，内部其实调用的还是`mergeWithKey`函数。当不需要自定义fn函数时，可以使用`mergeWith`。

## mergeDeepWithKey

```js
/**
     let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
     R.mergeDeepWithKey(concatValues,
                        { a: true, c: { thing: 'foo', values: [10, 20] }},
                        { b: true, c: { thing: 'bar', values: [15, 35] }});
     //=> { a: true, b: true, c: { thing: 'bar', values: [10, 20, 15, 35] }}
 */
var mergeDeepWithKey =
/*#__PURE__*/
_curry3(function mergeDeepWithKey(fn, lObj, rObj) {
  return mergeWithKey(function (k, lVal, rVal) {

    // 如果两者都是对象，则递归继续处理
    if (_isObject(lVal) && _isObject(rVal)) {
      return mergeDeepWithKey(fn, lVal, rVal);
    } else {
      // 否则使用给定的fn处理
      return fn(k, lVal, rVal);
    }
  }, lObj, rObj);
});
```

合并两个对象的自身属性（不包括 prototype 属性）。如果某个 key 在两个对象中都存在：

- 并且两个关联的值都是对象，则继续递归合并这两个值。
- 否则，使用给定函数对该 key 和对应的两个值进行处理，并将返回值作为该 key 的新值。

如果某 key 只存在于一个对象中，该键值对将作为结果对象的键值对。可以发现内部调用的是`mergeWithKey`函数。

## mergeDeepLeft

```js
/**
     R.mergeDeepLeft({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
                     { age: 40, contact: { email: 'baa@example.com' }});
     //=> { name: 'fred', age: 10, contact: { email: 'moo@example.com' }}
 */
var mergeDeepLeft =
/*#__PURE__*/
_curry2(function mergeDeepLeft(lObj, rObj) {
  return mergeDeepWithKey(function (k, lVal, rVal) {
    return lVal;
  }, lObj, rObj);
});
```

合并两个对象的自身属性（不包括 prototype 属性）。如果某个 key 在两个对象中都存在：

- 并且两个值都是对象，则继续递归合并这两个值。
- 否则，采用第一个对象的值。

内部调用的是`mergeDeepWithKey`函数，fn处理方式就是以`lVal`为准。

## mergeDeepRight

```js
/**
     R.mergeDeepRight({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
                      { age: 40, contact: { email: 'baa@example.com' }});
     //=> { name: 'fred', age: 40, contact: { email: 'baa@example.com' }}
 */
var mergeDeepRight =
/*#__PURE__*/
_curry2(function mergeDeepRight(lObj, rObj) {
  return mergeDeepWithKey(function (k, lVal, rVal) {
    return rVal;
  }, lObj, rObj);
});
```

合并两个对象的自身属性（不包括 prototype 属性）。如果某个 key 在两个对象中都存在：

- 并且两个值都是对象，则继续递归合并这两个值。
- 否则，采用第二个对象的值。

同理，内部调用的是`mergeDeepWithKey`函数，fn处理方式就是以`rVal`为准。

## mergeDeepWith

```js
/**
     R.mergeDeepWith(R.concat,
                     { a: true, c: { values: [10, 20] }},
                     { b: true, c: { values: [15, 35] }});
     //=> { a: true, b: true, c: { values: [10, 20, 15, 35] }}
 */
var mergeDeepWith =
/*#__PURE__*/
_curry3(function mergeDeepWith(fn, lObj, rObj) {
  return mergeDeepWithKey(function (k, lVal, rVal) {
    return fn(lVal, rVal);
  }, lObj, rObj);
});
```

合并两个对象的自身属性（不包括 prototype 属性）。如果某个 key 在两个对象中都存在：

- 并且两个关联的值都是对象，则继续递归合并这两个值。
- 否则，使用给定函数对两个值进行处理，并将返回值作为该 key 的新值。

如果某 key 只存在于一个对象中，该键值对将作为结果对象的键值对。

## min

```js
var min =
/*#__PURE__*/
_curry2(function min(a, b) {
  return b < a ? b : a;
});
```

返回两个参数的较小者，支持柯里化。

## minBy

```js
var minBy =
/*#__PURE__*/
_curry3(function minBy(f, a, b) {
  return f(b) < f(a) ? b : a;
});
```

接收一个函数和两个值，返回使给定函数执行结果较小的值，支持柯里化。

## modulo

```js
var modulo =
/*#__PURE__*/
_curry2(function modulo(a, b) {
  return a % b;
});
```

用第一个参数除以第二个参数，并返回余数。注意，该函数是 JavaScript-style 的求模操作。数学求模另见 mathMod。不同之处在于，-17 % 5 等于 -2，而 mathMod(-17, 5) 等于 3。

## move

```js
/**
     R.move(0, 2, ['a', 'b', 'c', 'd', 'e', 'f']); //=> ['b', 'c', 'a', 'd', 'e', 'f']
     R.move(-1, 0, ['a', 'b', 'c', 'd', 'e', 'f']); //=> ['f', 'a', 'b', 'c', 'd', 'e'] list rotation
 */
var move =
/*#__PURE__*/
_curry3(function (from, to, list) {
  // 缓存list长度
  var length = list.length;

  // 复制list，防止修改原数组
  var result = list.slice();

  // 处理负索引，当索引为负，则length加上负索引
  var positiveFrom = from < 0 ? length + from : from;
  var positiveTo = to < 0 ? length + to : to;

  // 将from索引所在元素从result中删除，并记录在item变量
  var item = result.splice(positiveFrom, 1);

  // 如果处理后的索引依旧小于0或者大于等于数组长度，那索引是无效的，直接返回原数组
  // 由于from索引处的元素已经被摘出来，因此需要拼接的数组为[[0, positiveTo), item, [positiveTo, list.length)]
  return positiveFrom < 0 || positiveFrom >= list.length || positiveTo < 0 || positiveTo >= list.length ? list : [].concat(result.slice(0, positiveTo)).concat(item).concat(result.slice(positiveTo, list.length));
});
```

将列表中 from 索引处的元素移动到索引 to 处。可以看出支持负索引，大部分逻辑是处理极端情况，具体的分析看注释。

## multiply

```js
/**
     const double = R.multiply(2);
     const triple = R.multiply(3);
     double(3);       //=>  6
     triple(4);       //=> 12
     R.multiply(2, 5);  //=> 10
 */
var multiply =
/*#__PURE__*/
_curry2(function multiply(a, b) {
  return a * b;
});
```

两数相乘，等价于柯里化的 a * b 。

## nAry

```js
/**
     const takesTwoArgs = (a, b) => [a, b];

     takesTwoArgs.length; //=> 2
     takesTwoArgs(1, 2); //=> [1, 2]

     const takesOneArg = R.nAry(1, takesTwoArgs);
     takesOneArg.length; //=> 1
     // Only `n` arguments are passed to the wrapped function
     takesOneArg(1, 2); //=> [1, undefined]
 */
var nAry =
/*#__PURE__*/
_curry2(function nAry(n, fn) {
  switch (n) {
    case 0:
      return function () {
        return fn.call(this);
      };

    case 1:
      return function (a0) {
        return fn.call(this, a0);
      };

    case 2:
      return function (a0, a1) {
        return fn.call(this, a0, a1);
      };

    case 3:
      return function (a0, a1, a2) {
        return fn.call(this, a0, a1, a2);
      };

    case 4:
      return function (a0, a1, a2, a3) {
        return fn.call(this, a0, a1, a2, a3);
      };

    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.call(this, a0, a1, a2, a3, a4);
      };

    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.call(this, a0, a1, a2, a3, a4, a5);
      };

    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6);
      };

    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7);
      };

    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8);
      };

    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
      };

    default:
      throw new Error('First argument to nAry must be a non-negative integer no greater than ten');
  }
});
```

将一个任意元（包括零元）的函数，封装成一个确定元数（参数个数）的函数。任何多余的参数都不会传入被封装的函数。

由源码可以看出，最多可以处理10个参数的函数，超过10个参数就直接抛出错误。核心还是通过闭包缓存fn，通过switch语句走到不同的分支。分支内的函数只接收指定个数的参数，多余的参数都会被丢弃。然后通过fn.call(this)的方式来调用传入的fn函数。call的后续参数个数取决于n。

## negate

```js
/**
     R.negate(42); //=> -42
 */
var negate =
/*#__PURE__*/
_curry1(function negate(n) {
  return -n;
});
```

取反操作。简单明了，无须解释。

## none

```js
/**
     const isEven = n => n % 2 === 0;
     const isOdd = n => n % 2 === 1;

     R.none(isEven, [1, 3, 5, 7, 9, 11]); //=> true
     R.none(isOdd, [1, 3, 5, 7, 8, 11]); //=> false
 */
var none =
/*#__PURE__*/
_curry2(function none(fn, input) {
  return all(_complement(fn), input);
});

function _complement(f) {
  return function () {
    return !f.apply(this, arguments);
  };
}
```

如果列表中的元素都不满足 predicate，返回 true；否则返回 false。

若第二个参数自身存在 none 方法，则调用自身的 none 方法。可以看出内部是对第二个参数的每个元素调用内部函数_complement。内部函数_complement就做了一件事，那就是将每个参数传入fn并执行，最终取反。

## not

```js
var not =
/*#__PURE__*/
_curry1(function not(a) {
  return !a;
});
```

显而易见，逻辑非运算。

## nth

```js
/**
 *   const list = ['foo', 'bar', 'baz', 'quux'];
     R.nth(1, list); //=> 'bar'
     R.nth(-1, list); //=> 'quux'
     R.nth(-99, list); //=> undefined

     R.nth(2, 'abc'); //=> 'c'
     R.nth(3, 'abc'); //=> ''
 */
var nth =
/*#__PURE__*/
_curry2(function nth(offset, list) {
  var idx = offset < 0 ? list.length + offset : offset;  // 支持负数
  return _isString(list) ? list.charAt(idx) : list[idx]; // 如果是字符串，则使用charAt来获取指定索引的字符；如果是数组，则通过索引来直接访问
});
```

返回列表或字符串的第 n 个元素。如果 n 为负数，则返回索引为 length + n 的元素。兼容处理了列表和字符串。

经过测试发现，如果字符串也直接使用`list[idx]`来获取的话，倘若索引不在字符串长度范围内，则返回undefined；如果使用charAt，则返回空字符串。

## nthArg

```js
/**
     R.nthArg(1)('a', 'b', 'c'); //=> 'b'
     R.nthArg(-1)('a', 'b', 'c'); //=> 'c'
 */
var nthArg =
/*#__PURE__*/
_curry1(function nthArg(n) {
  var arity = n < 0 ? 1 : n + 1;
  return curryN(arity, function () {
    return nth(n, arguments);
  });
});
```

返回一个函数，该函数返回它的第 n 个参数。

## o

```js
var o =
/*#__PURE__*/
_curry3(function o(f, g, x) {
  return f(g(x));
});
```

o 是一个柯里化组合函数，返回一元函数。与 compose 不同的是，传递给 o 的最右边的函数为一元函数。
可以看出，R.o(f, g, x) = f(g(x))。从右到左执行函数组合。

## objOf

```js
/**
     const matchPhrases = R.compose(
       R.objOf('must'),
       R.map(R.objOf('match_phrase'))
     );
     matchPhrases(['foo', 'bar', 'baz']); //=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}
 */
var objOf =
/*#__PURE__*/
_curry2(function objOf(key, val) {
  var obj = {};
  obj[key] = val;
  return obj;
});
```

创建一个包含单个键值对的对象。第一个参数为键，第二个参数为值。最终返回单个键值对的对象。

## of

```js
/**
     R.of(null); //=> [null]
     R.of([42]); //=> [[42]]
 */
var of =
/*#__PURE__*/
_curry1(_of);

function _of(x) {
  return [x];
}
```

将给定值作为元素，封装成单元素数组。R.of 与 ES6 的 of 不同。

## omit

```js
/**
 * R.omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
 */
var omit =
/*#__PURE__*/
_curry2(function omit(names, obj) {
  var result = {};
  var index = {};
  var idx = 0;
  var len = names.length;

  while (idx < len) {
    index[names[idx]] = 1; // 将参数一指定的key放入index对象
    idx += 1;
  }

  for (var prop in obj) {
    if (!index.hasOwnProperty(prop)) { // 遍历参数二对象，并排除index对象中的key
      result[prop] = obj[prop]; // 将剩余key放入结果对象中，并返回
    }
  }

  return result;
});
```

删除对象中给定的 keys 对应的属性。核心逻辑可以看做是计算两个对象的差集。

## once

```js
var once =
/*#__PURE__*/
_curry1(function once(fn) {
  var called = false;
  var result;
  return _arity(fn.length, function () {
    if (called) {
      return result;
    }

    called = true;
    result = fn.apply(this, arguments);
    return result;
  });
});
```

创建一个只执行一次的函数。如果没有执行过，则执行fn，并将结果存储到result，同时将called置为true。等后续再次执行时，直接返回result。_arity的作用是返回一个新函数。

## or

```js
/**
     R.or(true, false); //=> true
     R.or(false, true); //=> true
 */
var or =
/*#__PURE__*/
_curry2(function or(a, b) {
  return a || b;
});
```

逻辑或运算，只要有一个参数为真（truth-y），就返回 true；否则返回 false。

## pair

```js
/**
 * R.pair('foo', 'bar'); //=> ['foo', 'bar']
 */
var pair =
/*#__PURE__*/
_curry2(function pair(fst, snd) {
  return [fst, snd];
});
```

接收两个参数，fst 和 snd，返回数组 [fst, snd]。

## partial

```js
/**
     const multiply2 = (a, b) => a * b;
     const double = R.partial(multiply2, [2]);
     double(2); //=> 4
 */

var partial =
/*#__PURE__*/
_createPartialApplicator(_concat);
```

部分应用。

接收两个参数：函数 f 和 参数列表，返回函数 g。当调用 g 时，将初始参数和 g 的参数顺次传给 f，并返回 f 的执行结果。

源码分为两部分解读，首先是_concat：

```js
/**
 *  _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 */
export default function _concat(set1, set2) {
  set1 = set1 || [];
  set2 = set2 || [];
  var idx;
  var len1 = set1.length;
  var len2 = set2.length;
  var result = [];
  idx = 0;

  while (idx < len1) {
    result[result.length] = set1[idx];
    idx += 1;
  }

  idx = 0;

  while (idx < len2) {
    result[result.length] = set2[idx];
    idx += 1;
  }

  return result;
}
```

可以看出，_concat的作用与Array.concat的作用相同，依次将两个参数内数组元素放入result数组中。通过result[result.length]来为数组追加元素。

其次是_createPartialApplicator：

```js
export default function _createPartialApplicator(concat) {
  return _curry2(function (fn, args) {
    return _arity(Math.max(0, fn.length - args.length), function () {
      return fn.apply(this, concat(args, arguments));
    });
  });
}
```

这个函数稍微有些复杂。主要是做了柯里化以及返回新函数的处理。核心逻辑是存储第一次传入的参数args，并且返回一个参数个数为fn.length - args.length的新函数。等新函数传入相应参数并调用后，最终会将两次传入的参数args以及arguments进行拼接，从而执行fn函数。

综上，偏函数会返回一个新的函数，这个函数接收剩余的参数，执行该函数会最终将所有参数进行拼接，并调用fn函数。

## partialRight

```js
var partialRight =
_createPartialApplicator(flip(_concat));
```

与partial作用相似，只不过partialRight是先拼接后面的参数，再拼接第一次传入的参数。这里通过flip来调换参数拼接的顺序。

## path

```js
/**
 * R.path(['a', 'b'], {a: {b: 2}}); //=> 2
 * R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
 */
var path =
/*#__PURE__*/
_curry2(function path(pathAr, obj) {
  return paths([pathAr], obj)[0];
});
```

取出给定路径上的值。内部是直接调用了paths函数，并取其第一项。后面会继续分析paths函数，此处不表。

## pathOr

```js
/**
 *   R.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
 *   R.pathOr('N/A', ['a', 'b'], {c: {b: 2}}); //=> "N/A"
 */
var pathOr =
/*#__PURE__*/
_curry3(function pathOr(d, p, obj) {
  return defaultTo(d, path(p, obj));
});
```

如果非空对象在给定路径上存在值，则将该值返回；否则返回给定的默认值。defaultTo会在第二参数为null、undefined或者NaN时返回默认值d。

## paths

```js
/**
     R.paths([['a', 'b'], ['p', 0, 'q']], {a: {b: 2}, p: [{q: 3}]}); //=> [2, 3]
     R.paths([['a', 'b'], ['p', 'r']], {a: {b: 2}, p: [{q: 3}]}); //=> [2, undefined]
 */
var paths =
/*#__PURE__*/
_curry2(function paths(pathsArray, obj) {
  return pathsArray.map(function (paths) { // 遍历参数一（二维数组）
    var val = obj;
    var idx = 0;
    var p;

    while (idx < paths.length) { // 遍历每一项数组路径
      if (val == null) { // 中途发现取的值为null或者undefined，则说明此路不通，提前返回。
        return;
      }

      p = paths[idx]; // 取出数组路径的当前项
      val = _isInteger(p) ? nth(p, val) : val[p]; // 如果当前路径是数字，说明要取数组的某个索引下的值；如果是字符串，则直接通过中括号语法取值，并重新赋值给val，方便后续循环判断
      idx += 1;
    }

    return val;
  });
});
```

提取对象中指定路径数组（paths）上的对应的值（values）。核心逻辑是针对于路径数组在对象上一条路走到底，直到提前发现走不通或者走到尽头并返回该值。

## pick

```js
/**
     R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
     R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
 */
var pick =
/*#__PURE__*/
_curry2(function pick(names, obj) {
  var result = {};
  var idx = 0;

  while (idx < names.length) { // 遍历键数组
    if (names[idx] in obj) { // 如果指定键存在于对象中
      result[names[idx]] = obj[names[idx]]; // 则将所对应的属性赋值给新对象的同名键中
    }

    idx += 1;
  }

  return result;
});
```

返回对象的部分拷贝，其中仅包含指定键对应的属性。如果某个键不存在，则忽略该属性。

## pickAll

```js
/**
 *   R.pickAll(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *   R.pickAll(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, e: undefined, f: undefined}
 */
var pickAll =
/*#__PURE__*/
_curry2(function pickAll(names, obj) {
  var result = {};
  var idx = 0;
  var len = names.length;

  while (idx < len) {
    var name = names[idx];
    result[name] = obj[name];
    idx += 1;
  }

  return result;
});
```

与 pick 类似，但 pickAll 会将不存在的属性以 key: undefined 键值对的形式返回。这里没有进行names[idx] in obj的判断，因此不存在的属性会取值为undefined，同时赋值给新对象的同名键。

## pickBy

```js
/**
     const isUpperCase = (val, key) => key.toUpperCase() === key;
     R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
 */
var pickBy =
/*#__PURE__*/
_curry2(function pickBy(test, obj) {
  var result = {};

  for (var prop in obj) { // 遍历对象
    if (test(obj[prop], prop, obj)) { // key满足参数一
      result[prop] = obj[prop]; // 拷贝满足条件的键值对到新对象
    }
  }

  return result;
});
```

返回对象的部分拷贝，其中仅包含 key 满足 predicate 的属性。

## pipe

```js
/**
    const f = R.pipe(Math.pow, R.negate, R.inc);

    f(3, 4); // -(3^4) + 1
 */
export default function pipe() {
  if (arguments.length === 0) {
    throw new Error('pipe requires at least one argument');
  }

  return _arity(arguments[0].length, reduce(_pipe, arguments[0], tail(arguments)));
}


export default function _pipe(f, g) {
  return function () {
    return g.call(this, f.apply(this, arguments));
  };
}
```

从左往右执行函数组合。第一个函数可以是任意元函数（参数个数不限），其余函数必须是一元函数。内部使用了几个函数，包括返回新函数的_arity；reduce处理所有参数；返回除第一个参数外的剩余参数数组的tail，以及内部函数_pipe。_pipe的作用是从左到右依次执行传入的函数。

## pluck

```js
/**
     R.pluck(0, [[1, 2], [3, 4]]);               //=> [1, 3]
     R.pluck('val', {a: {val: 3}, b: {val: 5}}); //=> {a: 3, b: 5}
 */
var pluck =
/*#__PURE__*/
_curry2(function pluck(p, list) {
  return map(prop(p), list);
});
```

从列表内的每个对象元素中取出特定名称的属性，组成一个新的列表。它等价于 R.map(R.prop(k), f)。也就是说，内部逻辑是遍历list，对每一项执行prop(p)。而prop函数实际上就是运行的path函数。

题外话，经常将pluck和pick搞混，按照字面意思pluck就是拔的意思，而pick是选择的意思。因此pick返回的是键值对，而pluck只返回属性组成的列表。

## prepend

```js
/**
 * R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
 */
var prepend =
/*#__PURE__*/
_curry2(function prepend(el, list) {
  return _concat([el], list);
});
```

在列表头部之前拼接一个元素。内部调用_concat进行数组拼接。按照这个思路，在列表尾部拼接一个元素也是很方便的。

## product

```js
/**
 * R.product([2,4,6,8,100,1]); //=> 38400
 */
var product = reduce(multiply, 1);
```

列表中的所有元素相乘。内部是调用reduce让列表中元素两两相乘，并给出了初始累积值1。

## prop

```js
/**
     R.prop('x', {x: 100}); //=> 100
     R.prop('x', {}); //=> undefined
     R.prop(0, [100]); //=> 100
 */
var prop =
/*#__PURE__*/
_curry2(function prop(p, obj) {
  return path([p], obj);
});
```

取出对象中指定属性的值。如果不存在，则返回 undefined。内部调用了path获取指定路径上的值。

## props

```js
/**
     R.props(['x', 'y'], {x: 1, y: 2}); //=> [1, 2]
     R.props(['c', 'a', 'b'], {b: 2, a: 1}); //=> [undefined, 1, 2]
 */
var props =
/*#__PURE__*/
_curry2(function props(ps, obj) {
  return ps.map(function (p) {
    return path([p], obj);
  });
});
```

返回 prop 的数组：输入为 keys 数组，输出为对应的 values 数组。values 数组的顺序与 keys 的相同。与prop不同的是，此处多了一个map处理，因此返回的是一个数组。

## range

```js
/**
 *  R.range(1, 5);    //=> [1, 2, 3, 4]
 */
var range =
/*#__PURE__*/
_curry2(function range(from, to) {
  if (!(_isNumber(from) && _isNumber(to))) { // 参数类型异常，抛出错误
    throw new TypeError('Both arguments to range must be numbers');
  }

  var result = [];
  var n = from;

  while (n < to) { // 结束条件不包括等于to，因此最终结果也不包括to
    result.push(n); // 依次将递增的n放入结果数组
    n += 1;
  }

  return result;
});
```

返回从 from 到 to 之间的所有数的升序列表。左闭右开（包含 from，不包含 to）。

## reduce

```js
var reduce =
/*#__PURE__*/
_curry3(_reduce);
```

左折叠操作。遍历列表，相继调用二元迭代函数（参数为累积值和从数组中取出的当前元素），将本次迭代结果作为下次迭代的累积值。返回最终累积值。可以用 R.reduced 提前终止遍历操作。

这个函数属于老面孔了，很多函数内部都会调用，因此要重点掌握。我们已经分析过_reduce的实现了，想要复习的可以回过头去看看。

## reduced

```js
/**
    R.reduce(
      (acc, item) => item > 3 ? R.reduced(acc) : acc.concat(item),
      [],
      [1, 2, 3, 4, 5]) // [1, 2, 3]
 */
var reduced =
/*#__PURE__*/
_curry1(_reduced);


function _reduced(x) {
  return x && x['@@transducer/reduced'] ? x : {
    '@@transducer/value': x,
    '@@transducer/reduced': true
  };
}
```

返回一个封装的值，该值代表 reduce 或 transduce 操作的最终结果。

返回值是一个黑盒：不保证其内部结构的稳定性。

在_reduce的实现中，有一个关键逻辑如下：

```js
if (acc && acc['@@transducer/reduced']) {
  acc = acc['@@transducer/value'];
  break;
}
```

可以看出，如果是经过reduced处理过的，则直接返回@@transducer/value所对应的累积值，并中断循环。因此可以用 R.reduced 提前终止遍历操作。

## reduceRight

```js
/**
 *   R.reduceRight(R.subtract, 0, [1, 2, 3, 4]) // => (1 - (2 - (3 - (4 - 0)))) = -2
     //    -               -2
     //   / \              / \
     //  1   -            1   3
     //     / \              / \
     //    2   -     ==>    2  -1
     //       / \              / \
     //      3   -            3   4
     //         / \              / \
     //        4   0            4   0
 */
var reduceRight =
/*#__PURE__*/
_curry3(function reduceRight(fn, acc, list) {
  var idx = list.length - 1; // 从右往左遍历

  while (idx >= 0) {
    acc = fn(list[idx], acc); // 处理函数的第一个参数为列表的当前值，第二个参数才为累计值
    idx -= 1;
  }

  return acc;
});
```

右折叠操作。类似于 reduce，除了遍历列表的顺序是从右向左的。

## reduceWhile

```js
var reduceWhile =
/*#__PURE__*/
_curryN(4, [], function _reduceWhile(pred, fn, a, list) {
  return _reduce(function (acc, x) {
    return pred(acc, x) ? fn(acc, x) : _reduced(acc);
  }, a, list);
});
```

与 reduce 类似， reduceWhile 会遍历列表，相继调用二元迭代函数，并返回最终累积值。reduceWhile 在每次调用迭代函数前，先使用 predicate 进行判断，如果 predicate 返回 false ，则提前终止遍历操作，并返回当前累积值。

可以看出，这里具备提前终止遍历的功能，内部就是采用_reduced来提前终止，是否终止取决于pred(acc, x)返回的布尔值。

## remove

```js
/**
 * R.remove(2, 3, [1,2,3,4,5,6,7,8]); //=> [1,2,6,7,8]
 */
var remove =
/*#__PURE__*/
_curry3(function remove(start, count, list) {
  var result = Array.prototype.slice.call(list, 0); // 对原数组进行拷贝，防止修改原数组
  result.splice(start, count); // 使用splice来删除count个元素，从start索引开始删
  return result;
});
```

删除列表中从 start 开始的 count 个元素。注意，该操作是非破坏性的：不改变原列表，返回处理后列表的拷贝。

## repeat

```js
/**
 * R.repeat('hi', 5); //=> ['hi', 'hi', 'hi', 'hi', 'hi']
 */
var repeat =
/*#__PURE__*/
_curry2(function repeat(value, n) {
  return times(always(value), n);
});
```

生成包含 n 个同一元素的数组。内部借助了times函数和always函数。其中times函数会执行n次fn函数，fn也就是第一参数。always函数返回一个返回恒定值的函数。

如果是对象进行重复，那么引用的是同一对象。

## replace

```js
var replace =
/*#__PURE__*/
_curry3(function replace(regex, replacement, str) {
  return str.replace(regex, replacement);
});
```

替换字符串的子串或正则匹配到的值。本质就是将字符串的replace方法柯里化。

## reverse

```js
/**
 * R.reverse([1, 2, 3]);  //=> [3, 2, 1]
 * R.reverse('abc');      //=> 'cba'
 */
var reverse =
/*#__PURE__*/
_curry1(function reverse(list) {
  return _isString(list) ? list.split('').reverse().join('') : Array.prototype.slice.call(list, 0).reverse();
});
```

对列表或字符串的排列顺序取反。如果是字符串，则转换为数组取反后再转换为字符串；如果是数组则拷贝后取反，因为取反会改变原数组。

## scan

```js
/**
     const numbers = [1, 2, 3, 4];
     const factorials = R.scan(R.multiply, 1, numbers); //=> [1, 1, 2, 6, 24]
 */
var scan =
/*#__PURE__*/
_curry3(function scan(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = [acc]; // 将初始累积值放入结果数组中

  while (idx < len) {
    acc = fn(acc, list[idx]); // 执行fn，并更新累积值
    result[idx + 1] = acc; // 将最新的累积值放入结果数组尾部
    idx += 1;
  }

  return result;
});
```

Scan 与 reduce 类似，但会将每次迭代计算的累积值记录下来，组成一个列表返回。

## slice

```js
/**
 * R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 */
var slice =
/*#__PURE__*/
_curry3(
/*#__PURE__*/
_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
  return Array.prototype.slice.call(list, fromIndex, toIndex);
}));
```

取出给定的列表或字符串（或带有 slice 方法的对象）中，从 fromIndex（包括）到 toIndex（不包括）的元素。本质还是使用数组的slice方法。

## sort

```js
/**
 * const diff = function(a, b) { return a - b; };
 * R.sort(diff, [4,2,7,5]); //=> [2, 4, 5, 7]
 */
var sort =
/*#__PURE__*/
_curry2(function sort(comparator, list) {
  return Array.prototype.slice.call(list, 0).sort(comparator);
});
```

使用比较函数对列表进行排序。注意，返回的是列表的拷贝，不会修改原列表。因为原生的sort方法会修改原数组，因此这里对原数组进行拷贝。

## sortBy

```js
var sortBy =
/*#__PURE__*/
_curry2(function sortBy(fn, list) {
  return Array.prototype.slice.call(list, 0).sort(function (a, b) {
    var aa = fn(a);
    var bb = fn(b);
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  });
});
```

根据给定的函数对列表进行排序。与sort函数类似，只是这里的比较逻辑是根据fn执行后的结果来决定的。

## sortWith

```js
var sortWith =
/*#__PURE__*/
_curry2(function sortWith(fns, list) {
  return Array.prototype.slice.call(list, 0).sort(function (a, b) {
    var result = 0;
    var i = 0;

    while (result === 0 && i < fns.length) { // 第一次或者后续比较结果相等时
      result = fns[i](a, b);
      i += 1;
    }

    return result;
  });
});
```

依据比较函数列表对输入列表进行排序。适合有多个维度比较时使用。当fns函数中的结果为0时，也就意味着当前比较的属性值相等，此时就会继续采用后续的比较方式。

## split

```js
/**
 * R.split('.', 'a.b.c.xyz.d'); //=> ['a', 'b', 'c', 'xyz', 'd']
 */
var split =
/*#__PURE__*/
invoker(1, 'split');
```

根据指定的分隔符将字符串拆分为字符串类型的数组。本质就是调用字符串上的split方法。

## splitAt

```js
/**
 * R.splitAt(1, [1, 2, 3]);          //=> [[1], [2, 3]]
 * R.splitAt(5, 'hello world');      //=> ['hello', ' world']
 */
var splitAt =
/*#__PURE__*/
_curry2(function splitAt(index, array) {
  return [slice(0, index, array), slice(index, length(array), array)];
});
```

在指定的索引处拆分列表或者字符串。其实就是通过slice分两段截取字符串或者列表。然后拼接成一个数组。需要注意slice的分片范围是左闭右开。

## splitEvery

```js
/**
 * R.splitEvery(3, [1, 2, 3, 4, 5, 6, 7]); //=> [[1, 2, 3], [4, 5, 6], [7]]
 * R.splitEvery(3, 'foobarbaz'); //=> ['foo', 'bar', 'baz']
 */
var splitEvery =
/*#__PURE__*/
_curry2(function splitEvery(n, list) {
  if (n <= 0) { // 指定长度不符合要求，直接报错
    throw new Error('First argument to splitEvery must be a positive integer');
  }

  var result = [];
  var idx = 0;

  while (idx < list.length) {
    result.push(slice(idx, idx += n, list)); // 通过slice分批次切片，直到索引越过列表长度
  }

  return result;
});
```

将列表拆分成指定长度的子列表集。核心逻辑是通过slice不断地切片，直到索引越过列表长度。

## splitWhen

```js
/**
 * R.splitWhen(R.equals(2), [1, 2, 3, 1, 2, 3]);   //=> [[1], [2, 3, 1, 2, 3]]
 */
var splitWhen =
/*#__PURE__*/
_curry2(function splitWhen(pred, list) {
  var idx = 0;
  var len = list.length;
  var prefix = [];

  while (idx < len && !pred(list[idx])) { // 将不满足条件的元素放入prefix数组中，直到遍历整个数组或者满足条件为止
    prefix.push(list[idx]);
    idx += 1;
  }

  return [prefix, Array.prototype.slice.call(list, idx)]; // 将不满足条件的数组，以及从满足条件的索引开始到数组末尾的部分数组组合成列表返回
});
```

查找列表中首个满足 predicate 的元素，在该处将列表拆分为两部分。首个满足 predicate 的元素包含在后一部分。

## startsWith

```js
/**
 * R.startsWith('a', 'abc')                //=> true
 * R.startsWith('b', 'abc')                //=> false
 */
var startsWith =
/*#__PURE__*/
_curry2(function (prefix, list) {
  return equals(take(prefix.length, list), prefix);
});
```

检查列表是否以给定的值开头。通过截取list长度为prefix.length的部分，与前缀进行相等比较，以此来判断是否以给定的值开头。

## subtract

```js
/**
 * R.subtract(10, 8); //=> 2
 */
var subtract =
/*#__PURE__*/
_curry2(function subtract(a, b) {
  return Number(a) - Number(b);
});
```

首个参数减去第二个参数。将两个参数显示转换为number并相减。

## sum

```js
/**
 * R.sum([2,4,6,8,100,1]); //=> 121
 */
var sum =
/*#__PURE__*/
reduce(add, 0);
```

对数组中所有元素求和。使用reduce和add的组合来达到求和的目的。这也是reduce的经典应用。

## symmetricDifference

```js
var symmetricDifference =
/*#__PURE__*/
_curry2(function symmetricDifference(list1, list2) {
  return concat(difference(list1, list2), difference(list2, list1));
});
```

求对称差集。所有不属于两列表交集元素的集合，其元素在且仅在给定列表中的一个里面出现。分别找出list1和list2、list2和list1的差集，然后合并。

## T

```js
/**
 *  R.T(); //=> true
 */
var T = function () {
  return true;
};
```

恒定返回 true 的函数。忽略所有的输入参数。

## tail

```js
/**
 * R.tail([1, 2, 3]);  //=> [2, 3]
 * R.tail([1, 2]);     //=> [2]
 */
var tail = slice(1, Infinity);
```

删除列表中的首个元素。如果第一个参数自身存在 slice 方法，则调用自身的 slice 方法。通过slice截取除首个元素外的其他所有元素。

## take

```js
/**
 * R.take(1, ['foo', 'bar', 'baz']); //=> ['foo']
 */
var take = function take(n, xs) {
  return slice(0, n < 0 ? Infinity : n, xs);
}
```

返回列表的前 n 个元素、字符串的前n个字符。 通过slice截取前n个元素或者字符。

## takeLast

```js
/**
 * R.takeLast(1, ['foo', 'bar', 'baz']); //=> ['baz']
 */
var takeLast =
/*#__PURE__*/
_curry2(function takeLast(n, xs) {
  return drop(n >= 0 ? xs.length - n : 0, xs);
});
```

返回列表的后 n 个元素。如果 n > list.length，则返回 list.length 个元素。本质依旧是通过slice来截取元素。

## test

```js
/**
 * R.test(/^x/, 'xyz'); //=> true
 */
var test =
/*#__PURE__*/
_curry2(function test(pattern, str) {
  if (!_isRegExp(pattern)) { // 判断参数一是否为正则对象
    throw new TypeError('‘test’ requires a value of type RegExp as its first argument; received ' + toString(pattern));
  }

  return _cloneRegExp(pattern).test(str); // 拷贝正则对象进行检测
});
```

检测字符串是否匹配给定的正则表达式。核心是调用正则对象上的test方法来检测是否匹配。

这里用到了两个内置函数，值得学习一下：

```js
export default function _isRegExp(x) {
  return Object.prototype.toString.call(x) === '[object RegExp]';
}

export default function _cloneRegExp(pattern) {
  return new RegExp(pattern.source, (pattern.global ? 'g' : '') + (pattern.ignoreCase ? 'i' : '') + (pattern.multiline ? 'm' : '') + (pattern.sticky ? 'y' : '') + (pattern.unicode ? 'u' : ''));
}
```

_isRegExp采用了最常用的方式来判断某个变量是否为指定类型。可以看出，正则对象的toString字符串为'[object RegExp]'。

_cloneRegExp用来拷贝正则对象。这里用到了正则对象原型上的一系列属性，分别为：

- RegExp.prototype.source。source 属性返回一个值为当前正则表达式对象的模式文本的字符串，该字符串不会包含正则字面量两边的斜杠以及任何的标志字符。这刚好也是RegExp构造函数的第一个参数接受的内容。
- RegExp.prototype.global。针对字符串中所有可能的匹配项测试正则表达式，还是仅针对第一个匹配项。global 属性表明正则表达式是否使用了 "g" 标志。global 的值是布尔对象，如果使用了 "g" 标志，则返回 true；否则返回 false。
- RegExp.prototype.ignoreCase。匹配文本的时候是否忽略大小写。ignoreCase 属性表明正则表达式是否使用了 "i" 标志。ignoreCase 的值是布尔对象，如果使用了"i" 标志，则返回 true；否则，返回 false。
- RegExp.prototype.multiline。是否进行多行搜索。multiline 属性表明正则表达式是否使用了 "m" 标志。multiline 是一个布尔对象，如果使用了 "m" 标志，则返回 true；否则，返回 false。
- RegExp.prototype.sticky。sticky 属性反映了搜索是否具有粘性（ 仅从正则表达式的 lastIndex 属性表示的索引处搜索 ）。sticky 的值是 Boolean ，并在 y 标志使用时为真; 否则为假。如果一个表达式同时指定了 sticky 和 global，其将会忽略 global 标志。
- RegExp.prototype.unicode。Unicode 功能是否开启。unicode 属性表明正则表达式带有"u" 标志。 unicode 的值是 Boolean，并且如果使用了 "u" 标志则为 true；否则为 false。"u" 标志开启了多种 Unicode 相关的特性。使用 "u" 标志，任何 Unicode 代码点的转义都会被解释。

上述属性，除source外，其余都是返回布尔值且为只读属性，不可以修改。

## thunkify

```js
/**
 * R.thunkify((a, b) => a + b)(25, 17)(); //=> 42
 */
var thunkify =
/*#__PURE__*/
_curry1(function thunkify(fn) {
  return curryN(fn.length, function createThunk() {
    var fnArgs = arguments;
    return function invokeThunk() {
      return fn.apply(this, fnArgs);
    };
  });
});
```

创建一个 thunk 版本的函数。 thunk 会延迟计算直到需要其结果，从而实现惰性求值。

柯里化取决于第一个参数fn的实参个数。当参数个数达到时，会返回一个函数，执行该函数就会执行fn函数，也就是fn.apply(this, fnArgs)。通过闭包保存了fn接受的所有参数。

## times

```js
/**
 * R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
 * 
 * R.times(f, 2) = [f(0), f(1)]
 */
var times =
/*#__PURE__*/
_curry2(function times(fn, n) {
  var len = Number(n); // 需要执行的次数，显示转换为数值
  var idx = 0;
  var list;

  if (len < 0 || isNaN(len)) { // 如果数值不符合要求，则抛出范围报错
    throw new RangeError('n must be a non-negative number'); // n必须是非负数
  }

  list = new Array(len); // 生成指定长度的数组

  while (idx < len) {
    list[idx] = fn(idx); // 依次为fn传入参数，并更新list数组。参数范围是0~n-1
    idx += 1;
  }

  return list;
});
```

执行输入的函数 n 次，返回由函数执行结果组成的数组。fn 为一元函数，n 次调用接收的参数为：从 0 递增到 n-1 。

## toPairs

```js
/**
 *  R.toPairs({a: 1, b: 2, c: 3}); //=> [['a', 1], ['b', 2], ['c', 3]]
 */
var toPairs =
/*#__PURE__*/
_curry1(function toPairs(obj) {
  var pairs = [];

  for (var prop in obj) {
    if (_has(prop, obj)) { // 只处理自有属性
      pairs[pairs.length] = [prop, obj[prop]]; // 传入键值对组成的数组
    }
  }

  return pairs;
});
```

将一个对象的属性转换成键、值二元组类型的数组，只处理对象自身的属性。注意：不同 JS 运行环境输出数组的顺序可能不一致。

## toPairsIn

```js
var toPairsIn =
/*#__PURE__*/
_curry1(function toPairsIn(obj) {
  var pairs = [];

  for (var prop in obj) {
    pairs[pairs.length] = [prop, obj[prop]];
  }

  return pairs;
});
```

将一个对象的属性转换成键、值二元组类型的数组，包括原型链上的属性。没有使用_has进行过滤，因此使用for in包括原型链上的属性。

## toString

```js
/**
 * R.toString(42); //=> '42'
 * R.toString([1, 2, 3]); //=> '[1, 2, 3]'
 * R.toString('abc'); //=> '"abc"'
 * R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
 */
var toString =
/*#__PURE__*/
_curry1(function toString(val) {
  return _toString(val, []);
});
```

返回代表输入元素的字符串。求得的输出结果应该等价于输入的值。

如果输入值是 [object Object] 对象，且自身含有 toString 方法（不是 Object.prototype.toString 方法），那么直接调用这个方法求返回值。

核心是调用了_toString函数，下面就来具体看看：

```js
export default function _toString(x, seen) {
  var recur = function recur(y) { // 递归处理
    var xs = seen.concat([x]);
    return _includes(y, xs) ? '<Circular>' : _toString(y, xs);
  }; //  mapPairs :: (Object, [String]) -> [String]


  var mapPairs = function (obj, keys) { // 返回键值对拼接的字符串组成的数组
    return _map(function (k) {
      return _quote(k) + ': ' + recur(obj[k]);
    }, keys.slice().sort());
  };

  switch (Object.prototype.toString.call(x)) { // 判断传入的类型
    case '[object Arguments]': // 函数参数
      return '(function() { return arguments; }(' + _map(recur, x).join(', ') + '))'; // 拼接一个IIFE

    case '[object Array]': // 数组，拼接为[x,x,x]格式的字符串
      return '[' + _map(recur, x).concat(mapPairs(x, reject(function (k) {
        return /^\d+$/.test(k);
      }, keys(x)))).join(', ') + ']';

    case '[object Boolean]': // 布尔值，如果是构造函数，则返回构造函数字符串，否则返回布尔值本身字符串
      return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();

    case '[object Date]': // 日期对象，返回相应的构造函数拼接字符串，比如'new Date("2022-02-03T04:05:06.000Z")'
      return 'new Date(' + (isNaN(x.valueOf()) ? recur(NaN) : _quote(_toISOString(x))) + ')';

    case '[object Null]': // null则返回null字符串
      return 'null';

    case '[object Number]': // 数值，如果是构造函数则拼接构造函数，否则判断是否为-0，如果是则返回'-0'，不是则返回10进制组成的字符串
      return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);

    case '[object String]': // 字符串，如果是构造函数则拼接构造函数，否则再给字符串包裹一层引号
      return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : _quote(x);

    case '[object Undefined]': // undefined则返回undefined字符串
      return 'undefined';

    default: // 上面都不满足时
      if (typeof x.toString === 'function') { // 调用自身提供的toString
        var repr = x.toString();

        if (repr !== '[object Object]') { // 如果结果为原始类型，则直接返回
          return repr;
        }
      }

      return '{' + mapPairs(x, keys(x)).join(', ') + '}'; // 没有toString方法时，拼接为大括号包裹的逗号分隔的键或者键值对
  }
}
```

## transpose

```js
/**
 *  R.transpose([[1, 2, 3], ['a', 'b', 'c']]) //=> [[1, 'a'], [2, 'b'], [3, 'c']] 
 */
var transpose =
/*#__PURE__*/
_curry1(function transpose(outerlist) {
  var i = 0;
  var result = [];

  while (i < outerlist.length) {
    var innerlist = outerlist[i]; // 二维数组的每项内部数组
    var j = 0;

    while (j < innerlist.length) { // 遍历内部数组
      if (typeof result[j] === 'undefined') { // 如果结果二维数组里的某项数组不存在，则初试为空数组
        result[j] = [];
      }

      result[j].push(innerlist[j]); // 依次将内部数组中元素逐个放入result的对应索引数组中
      j += 1;
    }

    i += 1;
  }

  return result;
});
```

二维数组行列转置。输入 n 个长度为 x 的数组，输出 x 个长度为 n 的数组。

## trim

```js
/**
 * R.trim('   xyz  '); //=> 'xyz'
 */
var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' + '\u2029\uFEFF';
var zeroWidth = '\u200b';
var hasProtoTrim = typeof String.prototype.trim === 'function';

var trim = !hasProtoTrim ||
/*#__PURE__*/
ws.trim() || !
/*#__PURE__*/
zeroWidth.trim() ?
/*#__PURE__*/
_curry1(function trim(str) {
  var beginRx = new RegExp('^[' + ws + '][' + ws + ']*');
  var endRx = new RegExp('[' + ws + '][' + ws + ']*$');
  return str.replace(beginRx, '').replace(endRx, '');
}) :
/*#__PURE__*/
_curry1(function trim(str) {
  return str.trim();
});
```

删除字符串首、尾两端的空白字符。针对于特殊字符进行了处理，比如说零宽字符、换行符、制表符、特殊空白字符等等。可以看出特殊的字符有十几种，在严格校验的场景下需要做特殊处理。

