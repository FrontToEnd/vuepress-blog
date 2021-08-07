# 文件下载方法总结

## a标签下载

```js
// 转换为blob，方便文件下载
function dataUrlToBlob(base64, mimeType) {
  let bytes = window.atob(base64.split(",")[1]);
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeType });
}

function saveFile(blob, filename) {
  const a = document.createElement("a");
  a.download = filename;
  a.href = URL.createObjectURL(blob);
  a.click();
  URL.revokeObjectURL(a.href) // 删除引用，释放内存
}
```

代码核心就是使用**HTMLAnchorElement.download**属性，该属性值表示下载文件的名称。

## showSaveFilePicker API 下载

`showSaveFilePicker API` 是 `Window` 接口中定义的方法，调用该方法后会显示允许用户选择保存路径的文件选择器。该方法的签名如下所示：

```js
let FileSystemFileHandle = Window.showSaveFilePicker(options);
```

调用 `showSaveFilePicker` 方法之后，会返回一个 `FileSystemFileHandle` 对象。有了该对象，你就可以调用该对象上的方法来操作文件。比如调用该对象上的 `createWritable` 方法之后，就会返回 `FileSystemWritableFileStream` 对象，就可以把数据写入到文件中。

```js
async function saveFile(blob, filename) {
  try {
    const handle = await window.showSaveFilePicker({
      suggestedName: filename,
      types: [
        {
          description: "PNG file",
          accept: {
            "image/png": [".png"],
          },
        },
        {
          description: "Jpeg file",
          accept: {
            "image/jpeg": [".jpeg"],
          },
         },
      ],
     });
    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
    return handle;
  } catch (err) {
     console.error(err.name, err.message);
  }
}

function download() {
  if (!imgDataUrl) {
    alert("请先合成图片");
    return;
  }
  const imgBlob = dataUrlToBlob(imgDataUrl, "image/png");
  saveFile(imgBlob, "face.png");
}
```

美中不足的是，该API的兼容性不好。

## FileSaver 下载

该方法采用的是`FileSaver.js`开源库。我们可以使用它提供的 `saveAs` 方法来保存文件。

举例说明：

保存本地资源：

```js
let blob = new Blob(["大家好"], { type: "text/plain;charset=utf-8" });
saveAs(blob, "hello.txt");
```

还可以保存线上资源：

```js
saveAs("https://httpbin.org/image", "image.jpg");
```

## Zip下载

利用 `JSZip` 这个库，我们可以实现在客户端同时下载多个文件，然后把已下载的文件压缩成 Zip 包，并下载到本地的功能。

```js
const images = ["body.png", "eyes.png", "mouth.png"];
const imageUrls = images.map((name) => "../images/" + name);

async function download() {
  let zip = new JSZip();
  Promise.all(imageUrls.map(getFileContent)).then((contents) => { // 确保所以文件下载完成
    contents.forEach((content, i) => {
      zip.file(images[i], content); // 把已下载的文件添加到 zip 对象中
    });
    zip.generateAsync({ type: "blob" }).then(function (blob) { // 生成 Zip 文件
      saveAs(blob, "material.zip"); // FileSaver的API来保存文件
    });
  });
}

// 从指定的url上下载文件内容
function getFileContent(fileUrl) {
  return new JSZip.external.Promise(function (resolve, reject) {
    // 调用jszip-utils库提供的getBinaryContent方法获取文件内容
    JSZipUtils.getBinaryContent(fileUrl, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
```

## 附件形式下载

通过设置 `Content-Disposition` 响应头来指示响应的内容以何种形式展示，是以内联（inline）的形式，还是以附件（attachment）的形式下载并保存到本地。

```bash
Content-Disposition: inline
Content-Disposition: attachment
Content-Disposition: attachment; filename="mouth.png"
```

该下载形式需要后端进行相关设置，效果就是访问某链接浏览器就会自动开始下载。

```js
// attachment/file-server.js
const fs = require("fs");
const path = require("path");
const Koa = require("koa");
const Router = require("@koa/router");

const app = new Koa();
const router = new Router();
const PORT = 3000;
const STATIC_PATH = path.join(__dirname, "./static/");

// http://localhost:3000/file?filename=mouth.png
router.get("/file", async (ctx, next) => {
  const { filename } = ctx.query;
  const filePath = STATIC_PATH + filename;
  const fStats = fs.statSync(filePath);
  ctx.set({
    "Content-Type": "application/octet-stream",
    "Content-Disposition": `attachment; filename=${filename}`,
    "Content-Length": fStats.size,
  });
  ctx.body = fs.createReadStream(filePath);
});

// 注册中间件
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    // ENOENT（无此文件或目录）：通常是由文件操作引起的，这表明在给定的路径上无法找到任何文件或目录
    ctx.status = error.code === "ENOENT" ? 404 : 500;
    ctx.body = error.code === "ENOENT" ? "文件不存在" : "服务器开小差";
  }
});
app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`应用已经启动：http://localhost:${PORT}/`);
});
```

## base64下载

该方法的思路是获取文件的base64，然后转换为blob，再通过FileSaver的方法进行下载保存。

```js
function base64ToBlob(base64, mimeType) {
  let bytes = window.atob(base64);
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeType });
}
```

## chunked 下载

要使用分块传输编码，则需要在响应头配置 `Transfer-Encoding` 字段，并设置它的值为 `chunked` 或 `gzip, chunked`：

```bash
Transfer-Encoding: chunked
Transfer-Encoding: gzip, chunked
```

响应头 `Transfer-Encoding` 字段的值为 `chunked`，表示数据以**一系列分块**的形式进行发送。需要注意的是 `Transfer-Encoding` 和 `Content-Length` 这两个字段是互斥的，也就是说响应报文中这两个字段不能同时出现。

分块传输的编码规则：

- 每个分块包含分块长度和数据块两个部分；
- 分块长度使用 16 进制数字表示，以 \r\n 结尾；
- 数据块紧跟在分块长度后面，也使用 \r\n 结尾，但数据不包含 \r\n；
- 终止块是一个常规的分块，表示块的结束。不同之处在于其长度为 0，即 0\r\n\r\n。

```js
const chunkedUrl = "http://localhost:3000/file?filename=file.txt";

function download() {
  return fetch(chunkedUrl)
    .then(processChunkedResponse)
    .then(onChunkedResponseComplete)
    .catch(onChunkedResponseError);
}

function processChunkedResponse(response) {
  let text = "";
  let reader = response.body.getReader();
  let decoder = new TextDecoder();

  return readChunk();

  function readChunk() {
    return reader.read().then(appendChunks);
  }

  function appendChunks(result) {
    let chunk = decoder.decode(result.value || new Uint8Array(), {
      stream: !result.done,
    });
    console.log("已接收到的数据：", chunk);
    console.log("本次已成功接收", chunk.length, "bytes");
    text += chunk;
    console.log("目前为止共接收", text.length, "bytes\n");
    if (result.done) {
      return text;
    } else {
      return readChunk();
    }
  }
}

function onChunkedResponseComplete(result) {
  let blob = new Blob([result], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, "hello.txt");
}

function onChunkedResponseError(err) {
  console.error(err);
}
```
