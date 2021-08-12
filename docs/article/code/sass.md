# Sass使用代码片段

## for循环

```css
@for $i from 1 to 200 {
    .g-ball:nth-child(#{$i}) {
        $width: #{random(50)}px;
        
        width: $width;
        height: $width;
        left: calc(#{(random(70))}px - 55px);
    }
    
    .g-ball:nth-child(#{$i}) {
        animation: movetop 1s linear -#{random(3000)/1000}s infinite;
    }
}
```

## if语句

```css
@mixin triangle($size, $color, $direction) {
  height: 0;
  width: 0;

  border-color: transparent;
  border-style: solid;
  border-width: $size;

  @if $direction == up {
    border-bottom-color: $color;
  } @else if $direction == right {
    border-left-color: $color;
  } @else if $direction == down {
    border-top-color: $color;
  } @else if $direction == left {
    border-right-color: $color;
  } @else {
    @error "Unknown direction #{$direction}.";
  }
}

.next {
  @include triangle(5px, black, right);
}
```

## random()随机函数

```css
@function randomNum($max, $min: 0, $u: 1) {
    @return ($min + random($max)) * $u;
}

@function randomColor() {
    @return rgb(randomNum(255), randomNum(255), randomNum(255));
}

div {
    background: randomColor();
}
```

## 工具函数

### 颜色函数

```css
@function makelongrightshadow($color) {
    $val: 0px 0px $color;

    @for $i from 1 through 50 {
        $color: fade-out(desaturate($color, 1%), .02);
        $val: #{$val}, #{$i}px #{$i}px #{$color};
    }

    @return $val;
}

p{
   text-shadow: makelongrightshadow(hsla(14, 100%, 30%, 1));
}
```

### 数学函数

```css
@function fact($number) {
    $value: 1;
    @if $number>0 {
        @for $i from 1 through $number {
            $value: $value * $i;
        }
    }
    @return $value;
}

@function pow($number, $exp) {
    $value: 1;
    @if $exp>0 {
        @for $i from 1 through $exp {
            $value: $value * $number;
        }
    }
    @else if $exp < 0 {
        @for $i from 1 through -$exp {
            $value: $value / $number;
        }
    }
    @return $value;
}

@function rad($angle) {
    $unit: unit($angle);
    $unitless: $angle / ($angle * 0 + 1);
    @if $unit==deg {
        $unitless: $unitless / 180 * pi();
    }
    @return $unitless;
}

@function pi() {
    @return 3.14159265359;
}

@function sin($angle) {
    $sin: 0;
    $angle: rad($angle);
    // Iterate a bunch of times.
    @for $i from 0 through 20 {
        $sin: $sin + pow(-1, $i) * pow($angle, (2 * $i + 1)) / fact(2 * $i + 1);
    }
    @return $sin;
}

@function cos($angle) {
    $cos: 0;
    $angle: rad($angle);
    // Iterate a bunch of times.
    @for $i from 0 through 20 {
        $cos: $cos + pow(-1, $i) * pow($angle, 2 * $i) / fact(2 * $i);
    }
    @return $cos;
}

@function tan($angle) {
    @return sin($angle) / cos($angle);
}
```