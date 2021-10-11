# Ramda源码阅读

Ramda函数库是我们学习函数式编程的最佳开源项目，该库集成了大量的具有函数式编程思想的函数，确保我们写出没有副作用的函数。本文是笔者亲自阅读源码后的总结，以供大家参考。

中文官网直达链接：<https://ramda.cn/>

## 内部函数

### _curry1

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

### _curry2

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

### _curry3

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

### _concat

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

### _assertPromise

```js
function _assertPromise(name, p) {
  if (p == null || !_isFunction(p.then)) {
    throw new TypeError('`' + name + '` expected a Promise, received ' + _toString(p, []));
  }
}

module.exports = _assertPromise;
```

用来判断传入的p是否为`promise`。具体方案是判断`p.then`是否是`function`。

### _isFunction

```js
function _isFunction(x) {
  var type = Object.prototype.toString.call(x);
  return type === '[object Function]' || type === '[object AsyncFunction]' || type === '[object GeneratorFunction]' || type === '[object AsyncGeneratorFunction]';
}

module.exports = _isFunction;
```

用来判断入参是否为函数。从中可以学到不止要判断`[object Function]`，还要判断其他三种情况。

### _toString

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

### _aperture

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

### _isInteger

```js
module.exports = Number.isInteger || function _isInteger(n) {
  return n << 0 === n;
};
```

判断给定参数是否为整数。这里采用原生的静态方法`Number.isInteger`进行判断，或者左移0位与原参数进行比较。如果n不为整数，左移0位就不与本身相等。

### _makeFlat

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

### _clone

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

## 可导出函数

### add

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

### adjust

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

### all

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

### always

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

### and

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

### andThen

```js
var andThen =
_curry2(function andThen(f, p) {
  _assertPromise('andThen', p);

  return p.then(f);
});

module.exports = andThen;
```

将 onSuccess 函数应用于一个 fulfilled Promise 的内部值，并将计算结果放入新的 Promise 中返回。

### any

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

### aperture

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

### append

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

### apply

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

### applyTo

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

### ascend

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

### assoc

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

### assocPath

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

### binary

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

### both

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

### call

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

### chain

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

### map

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

### _map

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

### clamp

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

### clone

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
