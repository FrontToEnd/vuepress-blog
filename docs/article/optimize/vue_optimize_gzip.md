# Vue 项目优化实践-Gzip 篇

## 前端页面文件缓存

我们先来简单回顾下 http 缓存的知识：

- `HTTP1.0` 是通过`Expires`（文件过期时间）和`Last-Modified`（最近修改时间）来告诉浏览器进行缓存的，这两个字段都是  UTC  时间（绝对时间）。`Expires` 过期控制不稳定，因为浏览器端可以随意修改本地时间，导致缓存使用不精准。而且 `Last-Modified` 过期时间只能精确到秒。
- `HTTP1.1`  通过`Cache-Contorl`和  `Etag`（版本号）进行缓存控制。浏览器先检查  `Cache-Control`，如果有，则以`Cache-Control` 为准，忽略`Expires`。如果没有  `Cache-Control`，则以`Expires` 为准。

`Cache-Control` 除了可以设置 `max-age`（相对过期时间，以秒为单位）以外，还可以设置如下几种常用值:

- `public`，资源允许被中间服务器缓存。浏览器请求服务器时，如果缓存时间没到，中间服务器直接返回给浏览器内容，而不必请求源服务器。
- `private`，资源不允许被中间代理服务器缓存。浏览器请求服务器时，中间服务器都要把浏览器的请求透传给服务器。
- `no-cache`，不管本地副本是否过期，每次访问资源，浏览器都要向服务器询问，如果文件没变化，服务器只告诉浏览器继续使用缓存（304）。
- `no-store`，浏览器和中间代理服务器都不能缓存资源。每次访问资源，浏览器都必须请求服务器，并且，服务器不去检查文件是否变化，而是直接返回完整的资源。
- `must-revalidate`，本地副本过期前，可以使用本地副本；本地副本一旦过期，必须去源服务器进行有效性校验。
- `proxy-revalidate`，要求代理服务器针对缓存资源向源服务器进行确认。
- `s-maxage`：缓存服务器对资源缓存的最大时间。

现在 99%的浏览器都是 HTTP1.1 及以上版本，我们配置缓存就使用 `Cache-Contorl` 和 `Etag` 配合就好了。

## 服务器配置缓存

文件名带 hash 的(即 css、js、font 和 img 目录下的所有文件)设置一个月缓存，浏览器可以直接使用缓存不需要请求服务器。其他的文件（index.html 和 static 目录下的文件）设置为 `no-cache`，即每次都来服务器检查是否最新。nginx 配置如下：

```json
server {
    location = /index.html {
        add_header Cache-Control no-cache;
    }

    location ~ /static/ {
        add_header Cache-Control no-cache;
    }

    location ~ /(js/_|css/_|img/_|font/_) {
        expires 30d;
        add_header Cache-Control public;
    }
}
```

## 前端文件设置 gzip 压缩

首先需要安装一个 `webpack` 插件，作用是将大文件压缩成 `gzip` 的格式。执行一下命令进行安装：

```js
npm install --save-dev compression-webpack-plugin
```

安装成功后，在 `vue.config.js` 进行配置，配置如下：

```javascript
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// 可加入需要的其他文件类型，比如json
// 图片不要压缩，体积会比原来还大
const productionGzipExtensions = ["js", "css"];

module.exports = {
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      return {
        plugins: [
          new CompressionWebpackPlugin({
            // filename: '[path].gz[query]',
            algorithm: "gzip",
            test: new RegExp(
              "\\.(" + productionGzipExtensions.join("|") + ")$"
            ),
            threshold: 10240, //对超过10k的数据进行压缩
            minRatio: 0.6, // 压缩比例，值为0 ~ 1
          }),
        ],
      };
    }
  },
};
```

这样配置后，打包完的 js 和 css 文件就多了后缀名为 `gz` 的文件，下面是是否开启 `gzip` 压缩的文件大小对比：

| File                                 | Size      | Gzipped  |
| ------------------------------------ | --------- | -------- |
| dist\static\lib\echarts.4.0.6.min.js | 729.99KB  | 243.57KB |
| dis\static\lib\jquery.3.3.1.min.js   | 84.89KB   | 29.65KB  |
| dist\js\chuck-vendors.41428558.js    | 2316.10KB | 623.74KB |
| dist\js\app.aea87398.js              | 1701.24KB | 447.00KB |
| dist\css\app.c6e9f88a.css            | 464.43KB  | 137.84KB |
| dist\css\chunk-vendors.aa340280.css  | 263.42KB  | 38.56KB  |

## 服务器配置 gzip 压缩

Nginx 服务器的配置文件 `nginx.conf` 的 `http` 模块：

```
server {
  # 开启gzip on为开启，off为关闭
  gzip on;
  # 检查是否存在请求静态文件的gz结尾的文件，如果有则直接返回该gz文件内容，不存在则先压缩再返回
  gzip_static on;
  # 设置允许压缩的页面最小字节数，页面字节数从header头中的Content-Length中进行获取。
  # 默认值是0，不管页面多大都压缩。
  # 建议设置成大于10k的字节数，配合compression-webpack-plugin
  gzip_min_length 10k;
  # 对特定的MIME类型生效,其中'text/html’被系统强制启用
  gzip_types text/javascript application/javascript text/css application/json;
  # Nginx作为反向代理的时候启用，开启或者关闭后端服务器返回的结果
  # 匹配的前提是后端服务器必须要返回包含"Via"的 header头
  # off(关闭所有代理结果的数据的压缩)
  # expired(启用压缩,如果header头中包括"Expires"头信息)
  # no-cache(启用压缩,header头中包含"Cache-Control:no-cache")
  # no-store(启用压缩,header头中包含"Cache-Control:no-store")
  # private(启用压缩,header头中包含"Cache-Control:private")
  # no_last_modefied(启用压缩,header头中不包含"Last-Modified")
  # no_etag(启用压缩,如果header头中不包含"Etag"头信息)
  # auth(启用压缩,如果header头中包含"Authorization"头信息)
  # any - 无条件启用压缩
  gzip_proxied any;
  # 请求加个 vary头，给代理服务器用的，有的浏览器支持压缩，有的不支持，所以避免浪费不支持的也压缩
  gzip_vary on;
  # 同 compression-webpack-plugin 插件一样，gzip压缩比（1~9），
  # 越小压缩效果越差，但是越大处理越慢，一般取中间值
  gzip_comp_level 6;
  # 获取多少内存用于缓存压缩结果，‘16  8k’表示以8k*16 为单位获得。
  # PS: 如果没有.gz文件，是需要Nginx实时压缩的
  gzip_buffers 16 8k;
  # 注：99.99%的浏览器基本上都支持gzip解压了，所以可以不用设这个值,保持系统默认即可。
  gzip_http_version 1.1;
}
```

配置完 `nginx` 然后进行重启，如果此时发现报错信息是 `unknown directive "gzip_static"` ，意味着 `nginx` 没有安装该模块，解决办法如下：
进入到 nginx 安装目录，执行以下命令：

进入到 nginx 安装目录，执行以下命令：

```javascript
./configure --with-http_gzip_static_module
```

然后执行：

```javascript
make && make install
```

关闭 nginx：

```javascript
systemctl stop nginx
```

启动 nginx：

```javascript
systemctl start nginx
```

## 检查 gzip 是否生效

浏览器文件请求的请求头包含字段 `Accept-Encoding: gzip` 代表浏览器支持 `gzip` 压缩文件，文件响应头包含字段 `Content-Encoding: gzip` 代表返回的是压缩文件。

上面 `nginx` 配置 `gzip_static on;` 当我们不在  `nginx`  开启 `gzip_static` 的时候，发现生产的 `gz` 文件并没有被运行。`gzip_static` 是会自动执行 `gz` 文件的，这样的就避免了通过 `gzip` 自动压缩。换句话说，开启之后 `nginx` 会优先使用我们的 `gz` 文件。

如果 `nginx` 使用了已有的 `gz` 文件，那么这个请求的 `etag` 值不带有 `W/`，反之，如果文件是 `nginx` 压缩的，`etag` 值则会带有 `W/`。我们以刚才罗列的 `app.aea87398.js` 为例，下面是 `Response Headers` ：

```
Cache-Control: max-age=2592000
Cache-Control: public
Content-Encoding: gzip
Content-Length: 455941
Content-Type: application/javascript
Date: Thu, 06 Aug 2020 03:17:24 GMT
Etag: "5f2b6d5e-6f505"
Expires: Sat, 05 Sep 2020 03:17:24 GMT
Last-Modified: Thu, 06 Aug 2020 02:39:26 GMT
Server: nginx/1.9.9
Vary: Accept-Encoding
```

会发现 `Etag` 的值为`"5f2b6d5e-6f505"` ，该值不以 `W/` 开头，则意味着使用了我们自己打包生成的 `gz` 文件。
