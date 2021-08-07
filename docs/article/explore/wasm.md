# 前端云析布局集成 WebAssembly

## 引入 WASM

首先需要生成相应的 WASM，这块是直接让 C++的同学帮忙生成提供给前端。其中包括`layouter.js` 和`layouter.wasm` 两个文件。

为了 WASM 布局算法不影响浏览器渲染，这块使用了 HTML5 的标准[Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)，Web Worker 为 Web 内容在后台线程中运行脚本提供了一种简单的方法。线程可以执行任务而不干扰用户界面。

可以通[postMessage()](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker/postMessage)方法和[onmessage](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker/onmessage)事件处理函数触发 worker。

为了更好的使用 Web Worker，需要在 webpack 引入一个插件，首先来安装：

```javascript
npm install -D worker-plugin
```

然后在项目的`vue.config.js` 引入并使用，如下：

```javascript
const WorkerPlugin = require("worker-plugin");
// Adds native Web Worker bundling support to Webpack.
module.exports = {
  configureWebpack: {
    plugins: [
      // other plugins
      new WorkerPlugin({
        // use "self" as the global object when receiving hot updates.
        globalObject: "self", // <-- this is the default value
      }),
    ],
  },
};
```

## 踩坑

在开发环境下，由于我们是直接引入`layouter.js` 的，所以相对应的，`layouter.wasm`的路径是相对路径，但是目前来说，`webpack` 并没有很好的处理`wasm` 的`loader` ，所以`webpack` 并不会去主动处理`wasm` 文件，在这种情况下直接调用布局算法会发现路径不对。

解决办法是，在`layouter.js` 通过判断环境来处理：

```javascript
var wasmBinaryFile = "layouter.wasm";
if (!isDataURI(wasmBinaryFile)) {
  var isPro = process.env.NODE_ENV === "production";
  wasmBinaryFile = isPro
    ? locateFile(wasmBinaryFile)
    : "http://localhost:8082/static/layouter.wasm";
}
// 开发环境的路径因人而异，取决于wasm存放位置
```

第二个坑是打包时候的路径处理，同样的，因为`webpack` 不认识`wasm` 文件，我们需要将`wasm` 复制到 js 文件夹下，因为`layouter.js` 会被打包至 js 文件夹下。此时需要用到`copy-webpack-plugin` ，在**生产环境**下配置该插件：

```javascript
new CopyPlugin([
   { from: 'static/layouter.wasm', to: 'js/' },
]),
```

第三个坑是当打包好发布到生产环境后，依旧报错。通过一番定位，发现是由于去除了 console.\*函数，导致在`Web Worker` 中运行的`layouter.js` 中打印日志变成了调用`undefined` 。

去除 console.\*函数是项目中在生产环境引入了`terser-webpack-plugin` ，该插件是用来压缩 js 代码，是官方推荐的插件。我们来修改下配置：

```javascript
const TerserPlugin = require("terser-webpack-plugin"); // 压缩js代码，同时支持多进程压缩

module.exports.configureWebpack.optimization = {
  minimize: true,
  minimizer: [
    new TerserPlugin({
      parallel: true,
      terserOptions: {
        output: {
          comments: false, // remove comments
        },
        compress: {
          drop_console: false, // 由于wasm有打印日志，暂不去除console
          drop_debugger: true,
          pure_funcs: ["console.log"],
        },
      },
      extractComments: false,
    }),
  ],
};
```

主要就是把`drop_console: true` 改成`drop_console: false` 。

第四个坑是`nginx` 的配置。`nginx` 目前默认生成的`mine.types` 并不包含`wasm` 的格式，所以需要手动来添加。

我们期望`nginx` 遇到`wasm` 文件时，将它的`Content-Type` 设置为`Content-Type: application/wasm` 。找到 nginx 的`mine.types` 文件，在合适的位置添加：

```javascript
application/wasm                                 wasm;
```

然后重启`nginx` 。
