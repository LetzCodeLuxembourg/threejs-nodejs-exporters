URL.createObjectURL = function (blob) {
  const base64 = blob.buffer.toString('base64')
  const completedURI = `data:${blob.type};base64,` + base64;
  return completedURI
}

URL.revokeObjectURL = function () { }