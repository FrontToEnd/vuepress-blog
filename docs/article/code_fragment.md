# 代码片段整理

## CSS 实现多行文本“展开收起”

```html
<div class="wrapper">
  <input id="exp1" class="exp"  type="checkbox">
        <div class="text">
            <label class="btn" for="exp1"></label>
            浮动元素是如何定位的
正如我们前面提到的那样，当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素。
在下面的图片中，有三个红色的正方形。其中有两个向左浮动，一个向右浮动。要注意到第二个向左浮动的正方形被放在第一个向左浮动的正方形的右边。如果还有更多的正方形这样浮动，它们会继续向右堆放，直到填满容器一整行，之后换行至下一行。
        </div>
    </div>

<div class="wrapper">
  <input id="exp2"  class="exp"  type="checkbox">
        <div class="text">
            
            <label class="btn" for="exp2"></label>
            浮动元素是如何定位的
正如我们前面提到的那样，当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素。
        </div>
    </div>
```

```css
.wrapper {
  display: flex;
  margin: 50px auto;
  width: 800px;
  overflow: hidden;
  border-radius: 8px;
  padding: 15px ;
  box-shadow: 20px 20px 60px #bebebe,
    -20px -20px 60px #ffffff;
}
.text {
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  /* display: flex; */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  position: relative;
}
.text::before {
  content: '';
  height: calc(100% - 24px);
  float: right;
}
.text::after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  background: #fff;
}
.btn{
  float: right;
  clear: both;
  margin-left: 10px;
  font-size: 16px;
  padding: 0 8px;
  background: #3F51B5;
  line-height: 24px;
  border-radius: 4px;
  color:  #fff;
  cursor: pointer;
  /* margin-top: -30px; */
}
.btn::before{
  content:'展开'
}
.exp{
  display: none;
}
.exp:checked+.text{
  -webkit-line-clamp: 999;
}
.exp:checked+.text::after{
  visibility: hidden;
}
.exp:checked+.text .btn::before{
  content:'收起'
}
```

点击[这里](https://codepen.io/fronttoend/pen/qBrRBgE)查看效果。

## 前端生成水印

### 重复DOM覆盖实现

该方法需要使用js生成很多div，对性能有一定的影响。

```html
<!DOCTYPE html> 
<html> 
    <head> 
        <meta charset="utf-8"> 
        <title></title> 
        <style> 
            #watermark-box { 
                position: fixed; 
                top: 0; 
                bottom: 0; 
                left: 0; 
                right: 0; 
                font-size: 24px; 
                font-weight: 700; 
                display: flex; 
                flex-wrap: wrap; 
                overflow: hidden; 
                user-select: none; 
                pointer-events: none; 
                opacity: 0.1; 
                z-index: 999;
            } 
            .watermark { 
                text-align: center; 
            } 
        </style> 
    </head> 
    <body> 
        <div> 
            <h2> 机密内容- 机密内容- 机密内容- 机密内容- 机密内容- 机密内容- </h2> 
            <br /> 
            <h2> 机密内容- 机密内容- 机密内容- 机密内容- 机密内容- 机密内容- </h2> 
            <br /> 
            <h2 onclick="alert(1)"> 机密内容- 机密内容- 机密内容- 机密内容- 机密内容- 机密内容- 机密内容- </h2> 
            <br /> 
        </div> 
        <div id="watermark-box"> 
        </div> 
        <script> 
            function doWaterMark(width, height, content) { 
                let box = document.getElementById("watermark-box"); 
                let boxWidth = box.clientWidth, 
                    boxHeight = box.clientHeight; 
                for (let i = 0; i < Math.floor(boxHeight / height); i++) { 
                    for (let j = 0; j < Math.floor(boxWidth / width); j++) { 
                        let next = document.createElement("div") 
                        next.setAttribute("class", "watermark") 
                        next.style.width = width + 'px' 
                        next.style.height = height + 'px' 
                        next.innerText = content 
                        box.appendChild(next) 
                    } 
                } 
            } 
            window.onload = doWaterMark(300, 100, '水印123') 
        </script> 
    </body> 
</html>

```

### canvas绘制

第一步还是在页面上覆盖一个固定定位的盒子，然后创建一个canvas画布，绘制出一个水印区域，将这个水印通过toDataURL方法输出为一个图片，将这个图片设置为盒子的背景图，通过`background-repeat：repeat`；样式实现填满整个屏幕的效果。

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
        <div id="info" onclick="alert(1)" >
            123
        </div>
        <script>
           (function () {
              function __canvasWM({
                container = document.body,
                width = '300px',
                height = '200px',
                textAlign = 'center',
                textBaseline = 'middle',
                font = "20px Microsoft Yahei",
                fillStyle = 'rgba(184, 184, 184, 0.6)',
                content = '水印',
                rotate = '45',
                zIndex = 10000
              } = {}) {
                const args = arguments[0];
                const canvas = document.createElement('canvas');
        
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                const ctx = canvas.getContext("2d");
        
                ctx.textAlign = textAlign;
                ctx.textBaseline = textBaseline;
                ctx.font = font;
                ctx.fillStyle = fillStyle;
                ctx.rotate(Math.PI / 180 * rotate);
                ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 2);
        
                const base64Url = canvas.toDataURL();
                const __wm = document.querySelector('.__wm');
        
                const watermarkDiv = __wm || document.createElement("div");
                const styleStr = `
                  position:fixed;
                  top:0;
                  left:0;
                  bottom:0;
                  right:0;
                  width:100%;
                  height:100%;
                  z-index:${zIndex};
                  pointer-events:none;
                  background-repeat:repeat;
                  background-image:url('${base64Url}')`;
        
                watermarkDiv.setAttribute('style', styleStr);
                watermarkDiv.classList.add('__wm');
        
                if (!__wm) {
                  container.insertBefore(watermarkDiv, container.firstChild);
                }
                
                if (typeof module != 'undefined' && module.exports) {  //CMD
                    module.exports = __canvasWM;
                } else if (typeof define == 'function' && define.amd) { // AMD
                    define(function () {
                      return __canvasWM;
                    });
                } else {
                    window.__canvasWM = __canvasWM;
                }
              })();
                
            // 调用
            __canvasWM({
              content: '水印123'
            });
        </script>
    </body>
</html>
```

上述两个方法有个致命缺点，那就是可以通过删除DOM元素来达到去除水印的目的，因此需要监听DOM元素的变化，这里可以使用`MutationObserver`。`MutationObserver`是变动观察器，字面上就可以理解这是用来观察节点变化的。`MutationObserver` API 用来监视 DOM 变动，DOM 的任何变动，比如子节点的增减、属性的变动、文本内容的变动，这个 API 都可以得到通知。

修改后代码如下：

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
        <div id="info" onclick="alert(1)">
                123
        </div>
        <script>
           (function () {
              function __canvasWM({
                container = document.body,
                width = '300px',
                height = '200px',
                textAlign = 'center',
                textBaseline = 'middle',
                font = "20px Microsoft Yahei",
                fillStyle = 'rgba(184, 184, 184, 0.6)',
                content = '水印',
                rotate = '45',
                zIndex = 10000
              } = {}) {
                const args = arguments[0];
                const canvas = document.createElement('canvas');
        
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                const ctx = canvas.getContext("2d");
        
                ctx.textAlign = textAlign;
                ctx.textBaseline = textBaseline;
                ctx.font = font;
                ctx.fillStyle = fillStyle;
                ctx.rotate(Math.PI / 180 * rotate);
                ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 2);
        
                const base64Url = canvas.toDataURL();
                const __wm = document.querySelector('.__wm');
        
                const watermarkDiv = __wm || document.createElement("div");
                const styleStr = `
                  position:fixed;
                  top:0;
                  left:0;
                  bottom:0;
                  right:0;
                  width:100%;
                  height:100%;
                  z-index:${zIndex};
                  pointer-events:none;
                  background-repeat:repeat;
                  background-image:url('${base64Url}')`;
        
                watermarkDiv.setAttribute('style', styleStr);
                watermarkDiv.classList.add('__wm');
        
                if (!__wm) {
                  container.style.position = 'relative';
                  container.insertBefore(watermarkDiv, container.firstChild);
                }
                
                const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
                if (MutationObserver) {
                  let mo = new MutationObserver(function () {
                    const __wm = document.querySelector('.__wm');
                    // 只在__wm元素变动才重新调用 __canvasWM
                    if ((__wm && __wm.getAttribute('style') !== styleStr) || !__wm) {
                      // 避免一直触发
                      mo.disconnect();
                      mo = null;
                    __canvasWM(JSON.parse(JSON.stringify(args)));
                    }
                  });
        
                  mo.observe(container, {
                    attributes: true,
                    subtree: true,
                    childList: true
                  })
                }
        
              }
        
              if (typeof module != 'undefined' && module.exports) {  //CMD
                module.exports = __canvasWM;
              } else if (typeof define == 'function' && define.amd) { // AMD
                define(function () {
                  return __canvasWM;
                });
              } else {
                window.__canvasWM = __canvasWM;
              }
            })();
        
            // 调用
            __canvasWM({
              content: '水印123'
            });
        </script>
    </body>
</html>
```

当然，不管前端怎么设置，也是没有办法100%保证安全的，因为可以通过禁用`JavaScript`来防止水印的加载。

### 图片添加水印

在图片上加水印的实现思路是，图片加载成功后画到canvas中，随后在canvas中绘制水印，完成后通过canvas.toDataUrl()方法获得base64并替换原来的图片路径。

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
    <div id="info" onclick="alert(1)">
        <img />
    </div>
    <script>
       (function() {
         function __picWM({
           url = '',
           textAlign = 'center',
           textBaseline = 'middle',
           font = "20px Microsoft Yahei",
           fillStyle = 'rgba(184, 184, 184, 0.8)',
           content = '水印',
           cb = null,
           textX = 100,
           textY = 30
         } = {}) {
           const img = new Image();
           img.src = url;
           img.crossOrigin = 'anonymous';
           img.onload = function() {
                 const canvas = document.createElement('canvas');
                 canvas.width = img.width;
                 canvas.height = img.height;
                 const ctx = canvas.getContext('2d');

                 ctx.drawImage(img, 0, 0);
                 ctx.textAlign = textAlign;
                 ctx.textBaseline = textBaseline;
                 ctx.font = font;
                 ctx.fillStyle = fillStyle;
                 ctx.fillText(content, img.width - textX, img.height - textY);

                 const base64Url = canvas.toDataURL();
                 cb && cb(base64Url);
           }
         }

        if (typeof module != 'undefined' && module.exports) {  //CMD
           module.exports = __picWM;
         } else if (typeof define == 'function' && define.amd) { // AMD
           define(function () {
                 return __picWM;
           });
         } else {
           window.__picWM = __picWM;
         }
             
       })();

       // 调用
       __picWM({
           url: './a.png',
           content: '水印水印',
           cb: (base64Url) => {
                 document.querySelector('img').src = base64Url
           },
       });

    </script>
    </body>
</html>
```
