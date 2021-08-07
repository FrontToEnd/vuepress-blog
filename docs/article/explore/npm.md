# NPM踩坑总结

## 管理镜像

由于国内网络环境的原因，在执行npm i安装项目依赖过程中，肯定会遇上安装过慢或安装失败的情况。这个时候，我们可以使用管理镜像的工具，以便于我们方便的切换镜像。这个工具就是`nrm`，它是一个可随时随地自由切换`「NPM镜像」`的管理工具。

> 安装

```sh
npm i nrm -g
```

> 查看镜像

```sh
nrm ls
```

> 使用镜像

```sh
nrm use <name>
```

> 查看当前镜像

```sh
nrm current
```

安装完`nrm`以后，我们可以执行`nrm ls`来查看默认配置的一些镜像，执行结果如下所示：

```sh
npm -------- https://registry.npmjs.org/
yarn ------- https://registry.yarnpkg.com/
cnpm ------- http://r.cnpmjs.org/
taobao ----- https://registry.npm.taobao.org/
nj --------- https://registry.nodejitsu.com/
npmMirror -- https://skimdb.npmjs.com/registry/
edunpm ----- http://registry.enpmjs.org/
```

如果需要切换到国内的镜像，我们就选择taobao，执行`nrm use taobao`即可指定淘宝的镜像，从而加快安装依赖包的速度。

切换成国内镜像后，这个时候执行`npm install`就可以全速安装了。

## node-sass安装

安装`node-sass`时，在install阶段会从Github上下载一个叫binding.node的文件，而「GitHub Releases」里的文件都托管在s3.amazonaws.com上，这个网址被墙了，所以又安装不了。

这时可以通过指定`sass_binary_site`的参数，它可设置Sass镜像地址，当然，这里我们指定为淘宝的镜像，就可以很快的安装了，命令如下：

```sh
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
```

下面是一些前端常用的模块，均可采用设置镜像的方式来加快安装的速度，整理如下：

```sh
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
npm config set sharp_dist_base_url https://npm.taobao.org/mirrors/sharp-libvips/
npm config set electron_mirror https://npm.taobao.org/mirrors/electron/
npm config set puppeteer_download_host https://npm.taobao.org/mirrors/
npm config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/
npm config set sentrycli_cdnurl https://npm.taobao.org/mirrors/sentry-cli/
npm config set sqlite3_binary_site https://npm.taobao.org/mirrors/sqlite3/
npm config set python_mirror https://npm.taobao.org/mirrors/python/
```

## 重新安装

有的时候可能会出现无权限删除已安装的模块，从而无法重新安装，这个时候就需要删除`node_modules`文件夹来重新安装了。但是windows上删除该文件夹很慢，我们可以借助工具来快速删除，这个工具叫做`rimraf`，node版本的`rm -rf`。

首先来全局安装：

```sh
npm i rimraf -g
```

我们可以在项目的`package.json`中添加执行命令，可以很方便的重新安装。

```js
{
  "scripts": {
    "reinstall": "rimraf node_modules && npm i"
  }
}
```

需要重新安装的时候，执行`npm run reinstall`。

## 总结

> 在安装依赖前，指定安装镜像，加快安装速度。

> 单独安装某些模块前，也可以单独指定镜像，防止安装失败。

> 可以使用rimraf快速重新安装。

## 参考资料

[聊聊 NPM 镜像那些险象环生的坑](https://mp.weixin.qq.com/s/2ntKGIkR3Uiy9cQfITg2NQ)