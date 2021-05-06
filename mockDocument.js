const { createCanvas, Image } = require('canvas')

global.Image = Image
global.HTMLImageElement = Image
global.document = {
  createElementNS: (src, element) => {
    if (element === 'img') {
      const img = new Image()
      img.addEventListener = (evt, func) => {
        if (evt === 'load') img.onload = func.bind(img)
      }
      img.removeEventListener = () => { }
      return img
    }
  },
  createElement: name => {
    if (name === 'canvas') {
      const canvas = createCanvas()
      canvas.toBlob = (func, mimeType) => {
        const data = canvas.toDataURL(mimeType)
        const blob = new Blob([data], { type: mimeType })
        func(blob)
      }

      return canvas
    }
  }
}