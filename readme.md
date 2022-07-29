# gif-frame-reducer

[![Build Status](https://github.com/gumlet/gif-resize/workflows/Node%20CI/badge.svg)](https://github.com/gumlet/gif-resize/actions)

> Nodejs plugin for [Gifsicle](https://www.lcdf.org/gifsicle/)

## Install

```
$ npm install gif-frame-reducer
```

## Usage

```js
const gifFrameReducer = require("gif-frame-reducer");
const fs = require("fs");

const buf = fs.readFileSync("avocado.gif");
gifFrameReducer({
  width: 200,
  max_frame: 10,
})(buf).then((data) => {
  console.log("'data' contains processed GIF.");
});
```

## API

### gifResize([options])(buffer)

Returns a promise for a buffer.

### options

Type: `Object`

##### width

Type: `number`

Resize GIF to given width in pixels. It maintains aspect ratio.

##### height

Type: `number`

Resize GIF to given height in pixels. It maintains aspect ratio.

##### stretch

Type: `boolean`

If this is set, and `width` and `height` both are provided, the GIF will be resized such that it exactly matches the dimensions provided. It won't match the aspect ratio.

##### timeout

Type: `number`<br>
Default: `0`

This is process timeout in milliseconds. If set to positive number, it will throw timeout error after that many milliseconds.

##### max_frame

Type: `number`<br>
Default: `null`

## License

MIT © [Gumlet](https://github.com/gumlet)
