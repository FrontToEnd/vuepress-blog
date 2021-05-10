# Vue 项目优化实践-webpack 篇

## 体积分析

经过`webpack` 打包后的体积优化是一个很重要的点，比如引入的第三方库是否过大，能否对体积过大的库进行优化。此时需要用到一款插件，叫做`webpack-bundle-analyzer` 。它可以用交互式可缩放树形图显示`webpack`输出文件的大小，用起来非常的方便。

首先安装插件：

```javascript
npm install --save-dev webpack-bundle-analyzer
```

然后在`vue.config.js` 中引入：

```javascript
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  plugins: [new BundleAnalyzerPlugin()],
};
```

然后`npm run serve` 启动项目，此时会默认启动 [http://127.0.0.1:8888](http://127.0.0.1:8888)，页面里可以清晰的查看包占比的大小。建议只在**开发环境启用**，生产环境采用默认配置会打包失败。以`tieshangongzhu` 项目为例，打包结果中占比比较大的第三方库包括：`iview.js` 、`moment.js` 、`lodash.js` 等。下面介绍如何优化这些大的资源。

## 体积优化

这里介绍支持按需引入的`babel` 插件`babel-plugin-import` ，用来优化`lodash` 。

首先安装插件：

```javascript
npm install babel-plugin-import --save-dev
```

然后在`babel.config.js` 中的`plugins` 数组中添加一下配置：

```javascript
["import", { libraryName: "lodash", libraryDirectory: "" }];
```

通过上述配置就完成了`lodash` 的按需加载。

接着我们来优化`moment` ，通过分析页面查看可知，moment 很大部分占比是语言包，但我们基本用不到，于是我们可以借助`webpack`自带的插件来忽略语言包。配置如下：

```javascript
plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)];
```

通过上述配置即可去除语言包，减少大概 70%的大小。

## 多进程构建

大家都知道  `webpack`  是运行在  `node`  环境中，而  `node`  是单线程的。`webpack`  的打包过程是  `io`  密集和计算密集型的操作，如果能同时  `fork`  多个进程并行处理各个任务，将会有效的缩短构建时间。

这里采用`thread-loader` 进行多进程构建。

首先安装`loader` ：

```javascript
npm install --save-dev thread-loader
```

然后在`vue.config.js` 添加如下配置：

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["thread-loader", "babel-loader"],
      },
    ],
  },
};
```

然后执行`npm run build` ，统计打包时长。通过对比会发现，引入前打包耗时 37s，引入后打包耗时 18s。速度有了一倍的提升。通过查看可选项配置：

```javascript
options: {
      // the number of spawned workers, defaults to (number of cpus - 1) or
      // fallback to 1 when require('os').cpus() is undefined
      workers: 2,

      // number of jobs a worker processes in parallel
      // defaults to 20
      workerParallelJobs: 50,

      // additional node.js arguments
      workerNodeArgs: ['--max-old-space-size=1024'],

      // Allow to respawn a dead worker pool
      // respawning slows down the entire compilation
      // and should be set to false for development
      poolRespawn: false,

      // timeout for killing the worker processes when idle
      // defaults to 500 (ms)
      // can be set to Infinity for watching builds to keep workers alive
      poolTimeout: 2000,

      // number of jobs the poll distributes to the workers
      // defaults to 200
      // decrease of less efficient but more fair distribution
      poolParallelJobs: 50,

      // name of the pool
      // can be used to create different pools with elsewise identical options
      name: "my-pool"
    }
```

可以看到，默认是启用`cpus - 1` 个`worker` 来实现多进程打包。

## 多进程并行压缩代码

上面我们提到了多进程打包，接下来应用一下可以并行压缩`JavaScript` 代码的插件。

`webpack`默认提供了`UglifyJS`插件来压缩`JS`代码，但是它使用的是单线程压缩代码，也就是说多个`js`文件需要被压缩，它需要一个个文件进行压缩。所以说在正式环境打包压缩代码速度非常慢(因为压缩`JS`代码需要先把代码解析成用`Object`抽象表示的`AST`语法树，再应用各种规则分析和处理`AST`，导致这个过程耗时非常大)。

这里介绍一款可以并行压缩代码的插件：`terser-webpack-plugin` 。

首先安装插件：

```javascript
npm install terser-webpack-plugin --save-dev
```

然后在`vue.config.js` 中添加配置，注意该配置位于`configureWebpack` 下，并且建议在生产环境开启。

```javascript
optimization: {
    minimize: true,
    minimizer: [
        new TerserPlugin({
            parallel: true,
            terserOptions: {
                output: {
                    comments: false, // remove comments
                },
                compress: {
                    warnings: false,
                    drop_console: true,
                    drop_debugger: true,
                    pure_funcs: ['console.log'], // remove console.log
                },
            },
            extractComments: false,
        }),
    ],
},
```

按照上述配置后，即可开启并行压缩 js 代码的功能。需要注意的是，V8 在系统上有内存的限制，默认情况下，32 位系统限制为 512M，64 位系统限制为 1024M。因为如果不加以限制，大型项目构建的时候可能会出现内存溢出的情况。也就是说，可能无法开启并行压缩的功能。但是压缩代码的功能还是可以正常使用的。

## 利用缓存提升二次构建速度

这里讨论下在`webpack`中如何利用缓存来提升二次构建速度。

在`webpack`中利用缓存一般有以下几种思路：

- `babel-loader`开启缓存
- 使用`cache-loader`
- 使用`hard-source-webpack-plugin`

这里重点介绍下第三种。`HardSourceWebpackPlugin`  为模块提供了中间缓存，缓存默认的存放路是: `node_modules/.cache/hard-source`。

配置  `hard-source-webpack-plugin`后，首次构建时间并不会有太大的变化，但是从第二次开始，构建时间大约可以减少  `80%`左右。

首先安装插件：

```javascript
npm install --save-dev hard-source-webpack-plugin
```

然后在`vue.config.js` 中添加配置，建议配置在开发环境，生产环境可能没有效果。

```javascript
module.exports = {
  plugins: [new HardSourceWebpackPlugin()],
};
```

在第二次执行`npm run serve` 后，可以看到终端会有以下字样：

```javascript
[hardsource:5e5f2c56] Using 144 MB of disk space.
[hardsource:5e5f2c56] Tracking node dependencies with: package-lock.json.
[hardsource:5e5f2c56] Reading from cache 5e5f2c56...
```

也就意味着构建从硬盘中读取缓存，加快了构建速度。

## 缩小构建目标

主要是`exclude`  与  `include`的使用：

- exclude: 不需要被解析的模块
- include: 需要被解析的模块

用的比较多的是排除`/node_modules/` 模块。需要注意的是，`exclude` 权重更高，`exclude` 会覆盖 `include` 里的配置。

## 减少文件搜索范围

这个主要是`resolve`相关的配置，用来设置模块如何被解析。通过`resolve`的配置，可以帮助`Webpack`快速查找依赖，也可以替换对应的依赖。

- `resolve.modules`：告诉  `webpack`  解析模块时应该搜索的目录
- `resolve.mainFields`：当从  `npm`  包中导入模块时（例如，`import * as React from 'react'`），此选项将决定在  `package.json`  中使用哪个字段导入模块。根据  `webpack`  配置中指定的  `target`  不同，默认值也会有所不同
- `resolve.mainFiles`：解析目录时要使用的文件名，默认是`index`
- `resolve.extensions`：文件扩展名

```javascript
resolve: {
    alias: {
      react: path.resolve(__dirname, './node_modules/react/umd/react.production.min.js')
    }, //直接指定react搜索模块，不设置默认会一层层的搜寻
    modules: [path.resolve(__dirname, 'node_modules')], //限定模块路径
    extensions: ['.js'], //限定文件扩展名
    mainFields: ['main'] //限定模块入口文件名
}
```

## 预编译资源模块

在使用`webpack`进行打包时候，对于依赖的第三方库，比如`vue`，`vuex`等这些不会修改的依赖，我们可以让它和我们自己编写的代码分开打包，这样做的好处是每次更改本地代码的文件的时候，`webpack`只需要打包项目本身的文件代码，而不会再去编译第三方库。

那么第三方库在第一次打包的时候只打包一次，以后只要我们不升级第三方包的时候，那么`webpack`就不会对这些库去打包，这样的可以快速的提高打包的速度。其实也就是**预编译资源模块**。

`webpack`中，我们可以结合`DllPlugin`  和  `DllReferencePlugin`插件来实现。

### `DllPlugin` 是什么

`DLLPlugin`  插件是在一个额外独立的`webpack`设置中创建一个只有`dll`的`bundle`，也就是说我们在项目根目录下除了有`vue.config.js`，还会新建一个`webpack.dll.config.js`文件。

`webpack.dll.config.js`的作用是把所有的第三方库依赖打包到一个`bundle`的`dll`文件里面，还会生成一个名为  `manifest.json`文件。该`manifest.json`的作用是用来让  `DllReferencePlugin`  映射到相关的依赖上去的。

### `DllReferencePlugin` 又是什么

这个插件是在`vue.config.js`中使用的，该插件的作用是把刚刚在`webpack.dll.config.js`中打包生成的`dll`文件引用到需要的预编译的依赖上来。

什么意思呢？就是说在`webpack.dll.config.js`中打包后比如会生成  `vendor.dll.js`文件和`vendor-manifest.json`文件，`vendor.dll.js`文件包含了所有的第三方库文件，`vendor-manifest.json`文件会包含所有库代码的一个索引，当在使用`vue.config.js`文件打包`DllReferencePlugin`插件的时候，会使用该`DllReferencePlugin`插件读取`vendor-manifest.json`文件，看看是否有该第三方库。

`vendor-manifest.json`文件就是一个第三方库的映射而已。

话不多说，接下来看看怎么应用到项目中。

首先我们来编写`webpack.dll.config.js` 文件，内容如下：

```javascript
const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    vendor: [
      "vue/dist/vue.runtime.esm.js",
      "vuex",
      "vue-router",
      "vue-resource",
      "iview",
    ], // 这里是vue项目依赖的库
    util: ["lodash", "jquery", "moment"], // 这里是与框架无关的第三方库
  },
  output: {
    filename: "[name].dll.js",
    path: path.resolve(__dirname, "dll"),
    library: "dll_[name]",
  },
  plugins: [
    new CleanWebpackPlugin(), // clean-webpack-plugin目前已经更新到2.0.0，不需要传参数path
    new webpack.DllPlugin({
      name: "dll_[name]",
      path: path.join(__dirname, "dll", "[name].manifest.json"),
      context: __dirname,
    }),
  ],
};
```

在项目根目录上新建`webpack.dll.config.js` ，填写以上内容，同时还需要安装`CleanWebpackPlugin` ，步骤省略。

然后我们需要运行命令将第三方库打包到`dll` 文件夹下，该文件夹位于项目根目录。

执行命令如下：

```javascript
webpack --config ./webpack.dll.config.js
```

执行上述命令时如果提示`Do you want to install 'webpack-cli' (yes/no)` ，输入`yes` 进行安装`webpack-cli` 。成功后会发现项目根目录生成`dll` 文件夹。文件夹下包含：

```javascript
-util.dll.js - util.manifest.json - vendor.dll.js - vendor.manifest.json;
```

为了生成`dll` 文件夹方便，在`package.json`里面再添加一条脚本：

```javascript
"scripts": {
    "build:dll": "webpack --config ./webpack.dll.config.js",
},
```

以后就可以执行`npm run build:dll`来生成 了。

接下来需要在`vue.config.js` 中添加以下代码：

```javascript
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin'); // 如果未安装请先安装


const dllReference = (config) => {
    config.plugin('vendorDll')
        .use(webpack.DllReferencePlugin, [{
            context: __dirname,
            manifest: require('./dll/vendor.manifest.json'),
        }]);


    config.plugin('utilDll')
        .use(webpack.DllReferencePlugin, [{
            context: __dirname,
            manifest: require('./dll/util.manifest.json'),
        }]);


    config.plugin('addAssetHtml')
        .use(AddAssetHtmlPlugin, [ // add-asset-html-webpack-plugin插件必须在html-webpack-plugin之后使用，因此这里要用webpack-chain来进行配置
            [
                {
                    filepath: require.resolve(path.resolve(__dirname, 'dll/vendor.dll.js')),
                    outputPath: 'dll',
                    publicPath: '/dll', // 这里的公共路径与项目配置有关，如果顶层publicPath下有值，请添加到dll前缀
                },
                {
                    filepath: require.resolve(path.resolve(__dirname, 'dll/util.dll.js')),
                    outputPath: 'dll',
                    publicPath: '/dll', // 这里的公共路径与项目配置有关，如果顶层publicPath下有值，请添加到dll前缀
                },
            ],
        ])
        .after('html'); // 'html'代表html-webpack-plugin，是因为@vue/cli-servide/lib/config/app.js里是用plugin('html')来映射的
};


module.exports = {
    publicPath: '/', // 顶层publiePath在这里
    chainWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') { // 在开发环境中不使用dllPlugin是因为chrome的vue devtool是不能检测压缩后的vue源码，不方便代码调试
            dllReference(config);
        }
    }
```
