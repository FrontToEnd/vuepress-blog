# 产品优化

## 开启G-Zip压缩

* 安装compression-webpack-plugin插件

```
npm install compression-webpack-plugin --save-dev
// or
yarn add compression-webpack-plugin --dev
```

* vue.config.js配置

```js
// vue.config.js
const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  chainWebpack: config => {
    // ...
    if (process.env.NODE_ENV === 'production') {
      // #region 启用GZip压缩
      config
        .plugin('compression')
        .use(CompressionPlugin, {
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          cache: true
        })
        .tap(args => { })

      // #endregion
    }
  }
}
```

## 移除未使用的CSS

移除未使用的CSS，推荐的插件有[PurgeCSS](https://github.com/FullHuman/purgecss)、[UnCSS](https://github.com/giakki/uncss)、[Helium](https://github.com/geuis/helium-css)。这里介绍PurgeCSS的用法。

* 用法一：Vue CLI 插件

    该插件适用于vue-cli 3及以上版本。进入到使用vue-cli生成的项目，执行以下命令进行插件安装：

    ```
    vue add @fullhuman/purgecss
    ```

    安装成功后，项目的根路径会生成一个`postcss.config.css`文件(如果没有的话)，文件内容如下所示：

    ```js
    const IN_PRODUCTION = process.env.NODE_ENV === 'production'

    module.exports = {
    plugins: [
        IN_PRODUCTION && require('@fullhuman/postcss-purgecss')({
        content: [ `./public/**/*.html`, `./src/**/*.vue` ],
        defaultExtractor (content) {
            const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '')
            return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || []
        },
        whitelist: [],
        whitelistPatterns: [ /-(leave|enter|appear)(|-(to|from|active))$/, /^(?!(|.*?:)cursor-move).+-move$/, /^router-link(|-exact)-active$/, /data-v-.*/ ],
        })
    ],
    }

    ```

    可以根据实际需要，更改包含的文件和白名单。

* 用法二：webpack插件

    首先执行以下命令进行插件安装：

    ```
    npm i purgecss-webpack-plugin mini-css-extract-plugin -D
    ```

    同`mini-css-extract-plugin`插件配合使用：

    ```js
    const path = require('path')
    const glob = require('glob')
    const MiniCssExtractPlugin = require('mini-css-extract-plugin')
    const PurgecssPlugin = require('purgecss-webpack-plugin')

    const PATHS = {
    src: path.join(__dirname, 'src')
    }

    module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    optimization: {
        splitChunks: {
        cacheGroups: {
            styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
            }
        }
        }
    },
    module: {
        rules: [
        {
            test: /\.css$/,
            use: [
            MiniCssExtractPlugin.loader,
            "css-loader"
            ]
        }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
        filename: "[name].css",
        }),
        new PurgecssPlugin({
        paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
        }),
    ]
    }
    ```

## 优化代码库

如果引入了第三方代码库，但却只使用了个别的方法，那么引入整个代码库就会变得非常不明智，[这里](https://github.com/GoogleChromeLabs/webpack-libs-optimizations)收集了可以优化的第三方代码库的插件。我们以lodash的babel插件为例，具体用法可以点击链接查看。


[`babel-plugin-lodash`](https://github.com/lodash/babel-plugin-lodash)将Lodash的完整导入，替换为特定函数的导入。

```js
import _ from 'lodash';
_.map([1, 2, 3], i => i + 1);
```

↓

```js
import _map from 'lodash/map';
_map([1, 2, 3], i => i + 1);
```

注意：链式调用lodash插件将不会生效。比如：

```js
_([1, 2, 3]).map(i => i + 1).value();
```

## 客户端预渲染

  * 针对单页面应用的客户端预渲染，可以采用[`prerender-spa-plugin`](https://github.com/chrisvfritz/prerender-spa-plugin)。
  * 静态网站的生成可以使用[`VuePress`](https://vuepress.vuejs.org/zh/)。你所看到的本页面就是采用VuePress生成。
  * 通用的Webpack预渲染插件[`prerender-loader`](https://github.com/GoogleChromeLabs/prerender-loader)。

## 懒加载

### Web的原生懒加载

从chrome 76开始，可以使用新的`loading`属性来延迟加载新资源，而无需编写自定义的延迟加载代码或使用单独的JavaScript库。[这里](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Browser_compatibility)是浏览器的支持情况。可以看到IE和Safari不支持。[这里](https://web.dev/native-lazy-loading/)是对`loading`属性的具体介绍。

当前除了使用`loading`属性，有两种方法可以推迟加载屏幕外的图像和`iframe`：

  * 使用[`Intersection Observer API`](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)
  * 使用[`scroll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event), [`resize`](https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event), 或者[`orientationchange`](https://developer.mozilla.org/en-US/docs/Web/API/Window/orientationchange_event)事件处理程序

下面来看看`loading`属性的用法:

```html
<img src="image.png" loading="lazy" alt="image" width="200" height="200">
<iframe src="https://example.com" loading="lazy"></iframe>
```

`loading`属性支持三个值，分别是：
  * `auto:` 浏览器的默认延迟加载行为，与不声明该属性的相同。
  * `lazy:` 将资源的加载推迟到到达视口的计算距离为止。
  * `eager:` 不管资源在什么位置，立即加载该资源。

#### image loading

为了防止在下载延迟加载的图像时触发回流，请确保为元素添加`height`和`width`属性。或者通过内联样式进行指定。

```html
<img src="…" loading="lazy" alt="…" width="200" height="200">
<img src="…" loading="lazy" alt="…" style="height:200px; width:200px;">
<!-- lazy-loaded -->
```

使用`<picture>`元素定义的图像也可以延迟加载：

```html
<picture>
  <source media="(min-width: 800px)" srcset="large.jpg 1x, larger.jpg 2x">
  <img src="photo.jpg" loading="lazy">
</picture>
```
需要注意的是，目前只有`<img>`标签可以使用该属性，在存在`background-image`属性的标签上使用是不生效的。

#### iframe loading

根据是否隐藏`iframe`，`loading`属性对`iframe`的影响与对图像的影响不同。Chrome根据以下条件来确定`iframe`是否被隐藏：
  
  * iframe的宽高为**4px**或者更小。
  * `display: none` 或者 `visibility: hidden`被应用。
  * 使用负X或负Y定位将iframe置于屏幕外。

如果满足以上任意条件，Chrome就会认为它是隐藏的，并且大多数情况下不会延迟加载。未隐藏的`iframe`仅在它们位于加载距离阈值之内才会加载。

最后，可以通过以下代码来判断当前浏览器是否支持`loading`属性：

```js
if ('loading' in HTMLImageElement.prototype) {
  // supported in browser
} else {
  // fetch polyfill/third-party library
}
```

### 第三方库

  * [lazysizes](https://github.com/aFarkas/lazysizes)
  * [lozad](https://github.com/ApoorvSaxena/lozad.js)

## 性能审查

[Lighthouse](https://github.com/GoogleChrome/lighthouse/) 是一个通过提供诊断报告和优化建议来帮助开发者提升站点用户体验的自动化站点审查工具。该功能可以在 Chrome 的开发者工具中使用（目前在 Audits 标签中，后续该标签页会直接改为 Lighthouse），也可以通过 Node 命令行工具或者浏览器插件的方式来使用。

要尝试使用`Lighthouse Node CLI`，请使用以下命令：

```sh
npm install -g lighthouse
lighthouse https://www.example.com --view // Opens the HTML report in a browser after the run completes
```

在最新发布的6.0版本中，更新了一项很有用的审查功能，**未被使用的 JavaScript**。这个功能实际在几年前就有了，但是当时性能非常差因此被默认关闭了，现在收集这方面数据的性能有了很大提升，因此重新默认开启。

我们以公司[官网](http://www.zqykj.com/)为例，看看审查的具体流程：

全局安装`lighthouse`之后，输入以下命令开启审查：

```sh
lighthouse http://www.zqykj.com --view
```
执行后，会自动打开Chrome浏览器并进行分析，待分析结束后，会生成一个分析结果页面，点击[这里](https://fronttoend.github.io/f2e_standred/report.html)查看。

我们可以看到，一共包含了五大模块，分别是性能(Performance)、可访问性(Accessibility)、最佳实践(Best Practices)、SEO和PWA。以性能模块为例：

可以看到性能模块下分为四个子模块，分别为指标(Metrics)、优化建议(Opportunities)、诊断结果(Diagnostics)和已通过的审查(Passed audits)。

### 指标

Lighthouse 6.0 的报告引入了 3 个新的指标，其中两个 LCP 和 CLS 来自 5 月份新发布的 [Core Web Vitals](https://web.dev/vitals/) 衡量体系，另一个是 TBT。

#### Largest Contentful Paint(LCP)
即主内容渲染时间，是前 FCP 指标的一个有力补充，LCP 分数低于 2.5 秒会被认为是“好”的体验。

#### Cumlative Layout Shift(CLS)
累计布局变更/累计视觉变更，用来计算非预期的 UI 界面变更对用户操作的影响，CLS分数低于 0.10 被认为是“好”的体验。

#### Total Blocking Time(TBT)
总阻塞时间，用来量化加载的响应能力，累积主线程被阻塞并会影响用户操作反馈的总时间。TBT 也与 Core Web Vitals 中的 FID 指标相关联（First Input Delay 首次交互延迟）。

### 优化建议

该模块下是`lighthouse`给出的所有可优化的建议，帮助页面更快的加载。我们来看看可以进行优化的点：

  * Serve images in next-gen formats，即建议采用下一代的图像技术，像[WebP](https://caniuse.com/#feat=webp)这样的图像格式通常比PNG提供更好的压缩。比如说官网首页的banner图，该图片大小为1411KB，如果采用WebP，可以节省1268KB的资源加载，节省率达90%。
  * Eliminate render-blocking resources，即消除阻塞渲染的资源，建议延迟加载所有非必须的JS/CSS。[critters](https://github.com/GoogleChromeLabs/critters)可以提取关键的CSS并延迟加载其余的CSS。
  * Remove unused CSS，即移除未使用的CSS。
  * Remove unused JavaScript，即移除未使用的JavaScript。
  * 其余项包括预加载需要连接的站点，优化图像资源。

### 诊断结果

该模块下展示有关应用程序性能的更多信息。可以看到`Lighthouse`建议我们升级到HTTP/2、为静态资源设置更长的缓存期。


通过`lighthouse`进行项目的审查，可以快速准确的知道有哪些点可以去优化并改进，可以更好的有的放矢，做到事半功倍。
