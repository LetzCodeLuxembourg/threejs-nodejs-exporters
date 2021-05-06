module.exports = class FileReader {
  constructor() { }

  readAsDataURL(blob) {
    setTimeout(() => {
      const base64 = blob.buffer.toString('base64')
      this.result = `data:${blob.type};base64,` + base64

      this.onloadend && this.onloadend()
    })
  }

  readAsArrayBuffer(blob) {
    setTimeout(() => {
      var ab = new ArrayBuffer(blob.buffer.length);
      var view = new Uint8Array(ab);
      for (var i = 0; i < blob.buffer.length; ++i) {
        view[i] = blob.buffer[i];
      }
      this.result = ab
      this.onloadend && this.onloadend()
    })
  }
}