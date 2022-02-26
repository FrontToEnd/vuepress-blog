# CSS隐藏元素方式

原文链接：[https://mp.weixin.qq.com/s/1tvY3ROEuXgH41tPE5iMuw](https://mp.weixin.qq.com/s/1tvY3ROEuXgH41tPE5iMuw)

## **opacity 和 filter: opacity()**

opacity: N 和 filter: opacity(N) 属性可以传递一个 0 到 1 之间的数字，或者 0% 和 100% 之间的百分比，对应地表示完全透明和完全不透明。

- opacity: N：该属性用来设置元素的透明度；
- filter: opacity(N) ：filter属性用来设置元素的滤镜，opacity是滤镜的透明度，用来设置元素的透明度。

```css
div {
    opacity: 0;
}

div {
    filter: opacity(0%);
}
```

在现代浏览器中，这两者之间几乎没有实际的区别，但如果同时应用多种效果（模糊、对比度、灰度等）时，应该使用 filter 属性。

注意：opacity 可以设置动画并提供出色的性能，但页面上保留完全透明的元素可能会触发事件。

![opacity](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/58aca6d5-d8a0-4a84-98a0-e5119277cba0/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220226T083900Z&X-Amz-Expires=86400&X-Amz-Signature=e919587c5d0feadbaf41ee1b6aab99d5496672ae452de3ad5504f4999a2eb35a&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

## **color alpha 透明度**

可以将元素的color、background-color 和 border-color 等属性设置为rgba(0,0,0,0)，这样就会使元素完全透明：

```css
div {
  color: rgba(0,0,0,0);
  background-color: rgba(0,0,0,0);
}
```

这三个属性都是支持设置动画效果的，需要注意，透明度不能应用于带有背景图片的元素，除非它们是使用 linear-gradient 或类似方法生成的。

Alpha 通道可以设置为：

- transparent：完全透明（中间不能插入动画）；
- rgba(r, g, b, a)：红色、绿色、蓝色和 alpha；
- hsla(h, s, l, a)：色相、饱和度、亮度和 alpha；
- #RRGGBBAA 或 #RGBA。

![color](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/156041cd-1385-4cf6-8642-6861bdd1d12e/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220226T084055Z&X-Amz-Expires=86400&X-Amz-Signature=22cc66f763e3d7f222ef5583765b45aa67e70fb4c5240c55af81ecbfc2005bb4&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

## **transform**

transform 属性可以用于元素的平移、缩放、旋转或倾斜等。可以使用 scale(0) 或者 translate(-9999px, 0px) 属性值来将元素隐藏：

```css
div {
  transform: scale(0);
}

div {
  translate(-9999px, 0px)
}
```

transform 属性提供了出色的性能和硬件加速，因为元素被有效地移动到了单独的层中，并且可以在 2D 或 3D 中进行动画处理。原始的布局空间会保持原样，并不会受影响。使用这种方式隐藏的元素不会触发任何事件。

![transform](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/577853c0-f3d8-429a-bbb0-f94aaa912593/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220226T084131Z&X-Amz-Expires=86400&X-Amz-Signature=55964349973c9f97a37a2b01c5c7e115647d8834ae619770c2ca50428a5d83c4&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

## **clip-path**

clip-path 属性可以创建一个剪辑区域，用于确定元素的哪些部分是可见的。使用 `clip-path: circle(0)`可以将元素进行隐藏。

```css
div {
  clip-path: circle(0);
}
```

clip-path为添加动画效果提供了空间，不过它只能在现代浏览器中使用。

![clip-path](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c036df09-6c64-4540-8ff3-3f02b8f1366a/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220226T084152Z&X-Amz-Expires=86400&X-Amz-Signature=e374820589a0470b6b4441bc5e79aa98ec4ec09e30892662e840db9d0dafe23a&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

## **visibility: hidden**

visibility 属性可以设置为 visible 或 hidden 来显示和隐藏元素。

```css
div {
  visibility: hidden;
}
```

除非使用collapse值，否则元素使用的空间保持不变。

![visibility](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/691d17db-1291-47f3-9bbf-1d22f51fb379/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220226T084213Z&X-Amz-Expires=86400&X-Amz-Signature=d115cde0a7f335573afce07a3ca37b14adf60e5125a73f6400387854773dab5b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

## **display: none**

display 可能是最常用的元素隐藏方法 。当其值为 none 时元素就隐藏了。被隐藏的元素不会在页面中占据位置，也不会响应绑定的监听事件。

```css
div {
   display: none;
}
```

然而，在大多数情况下，display 可能是最糟糕的 CSS 属性。除非使用 `position:absolute` 将元素移出文档流，或者采用contain属性，否则它的隐藏过程无法设置动画，并将触发页面重新布局。

![none](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a9266efe-6b17-4cb2-995a-87e7e15813ab/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220226T084235Z&X-Amz-Expires=86400&X-Amz-Signature=a7e353ca5fecc1d213ab1b23e983caac4283162ed50b3df345334dd9f8ddaef7&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

## **z-index**

可以通过将元素的 z-index 属性设置为负值，以实现元素的隐藏。这实际上就是将元素放在了我们看不到的层。

```css
div {
   z-index: -1;
}
```

![z-index](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d1396f88-a272-4fbf-b003-345bd1f26e63/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220226T084257Z&X-Amz-Expires=86400&X-Amz-Signature=1fe830d0942f21f2a8648905874b237ce6580885504fcde3df3ca8a5167c1a3e&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

## **position**

position属性允许使用top、bottom、left、right 从页面中的默认位置移动元素。因此，绝对定位的元素可以通过左键：-9999px 等值移出屏幕。

```css
div {
   position: absolute;
   left: -999px;
}
```

![position](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a92ec300-af66-49ce-ad4f-b6049d481f66/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220226T084328Z&X-Amz-Expires=86400&X-Amz-Signature=cd64455f9287682360dcc96da08e9a12606b053c2989585fe937e6e9af96a1f1&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

## **覆盖另一个元素**

通过在元素的上面放置与背景颜色相同的元素，可以在视觉上隐藏一个元素。下面来使用::after伪元素来实现：

```css
div::after {
  position: absolute;
  content: '';
  top: 0;
  bottom: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
}
```

![absolute](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/4e204039-9f14-431e-90ac-1b09005efc0e/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220226T084402Z&X-Amz-Expires=86400&X-Amz-Signature=4f501db0049bc99880cd4f72c0e5c26ed2b5f1472cd3a8ec2457464198b96540&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

## **缩小尺寸**

可以通过使用width、height、padding、border-width 或 font-size 来缩小元素的尺寸以实现元素的隐藏。可能还需要应用 overflow: hidden; 来确保内容不会溢出。

![absolute](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f009791c-a22f-4738-b411-394d92612c56/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220226T084429Z&X-Amz-Expires=86400&X-Amz-Signature=6d4747183279be7dd273b0db4691f0173abce2285d39eb13816d60de3dcd7bed&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)
