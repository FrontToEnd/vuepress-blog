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