const NodeThreeExporter = require('../')
const THREE = require('three')
const USDZExporter = require('../USDZExporter')
const fs = require('fs')

const exporter = new NodeThreeExporter()
jest.setTimeout(60 * 1000)

test('create class instantion', () => {

  expect(exporter.gltfLoader).toBeInstanceOf(THREE.GLTFLoader)
  expect(exporter.fbxLoader).toBeInstanceOf(THREE.FBXLoader)
  expect(exporter.objLoader).toBeInstanceOf(THREE.OBJLoader)
  expect(exporter.stlLoader).toBeInstanceOf(THREE.STLLoader)
  expect(exporter.gltfExporter).toBeInstanceOf(THREE.GLTFExporter)
  expect(exporter.usdzExporter).toBeInstanceOf(USDZExporter)

  expect(typeof exporter.generate).toEqual('function')
  expect(typeof exporter.parse).toEqual('function')
  expect(typeof exporter.load).toEqual('function')
})

test('getLoader method', () => {

  expect(exporter.getLoader('OBJ')).toEqual(exporter.objLoader)
  expect(exporter.getLoader('fbx')).toEqual(exporter.fbxLoader)
  expect(exporter.getLoader('GLTF')).toEqual(exporter.gltfLoader)
  expect(exporter.getLoader('glb')).toEqual(exporter.gltfLoader)
  expect(exporter.getLoader('stl')).toEqual(exporter.stlLoader)
  expect(exporter.getLoader('')).toBeUndefined()
  expect(exporter.getLoader('usdz')).toBeUndefined()
})

test('toArrayBuffer method', () => {
  const buffer = Buffer.from('mocked data')
  expect(exporter.toArrayBuffer(buffer)).toBeInstanceOf(ArrayBuffer)
})

test('prepareData method', () => {
  const buffer = Buffer.from('mocked data')

  expect(exporter.prepareData(buffer, 'obj')).toEqual('mocked data')
  expect(exporter.prepareData(buffer, 'other_format')).toBeInstanceOf(ArrayBuffer)
})

test('generate gltf method', done => {

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const cube = new THREE.Mesh(geometry, material)

  function onComplete(buffer) {
    expect(Buffer.isBuffer(buffer)).toEqual(true)
    expect(Buffer.byteLength(buffer)).toBeGreaterThan(1000)
    done()
  }

  exporter.generate('gltf', cube, onComplete)
})

test('generate usdz method', done => {

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const cube = new THREE.Mesh(geometry, material)

  function onComplete(buffer) {
    expect(Buffer.isBuffer(buffer)).toEqual(true)
    expect(Buffer.byteLength(buffer)).toBeGreaterThan(1000)
    done()
  }

  exporter.generate('usdz', cube, onComplete)
})

const formats = ['fbx', 'glb', 'gltf', 'obj', 'stl']
formats.forEach(format => {
  test('parse ' + format, done => {
    const buffer = fs.readFileSync(__dirname + '/model.' + format)
    exporter.parse(format, buffer, model => {
      expect(model).toBeTruthy()
      done()
    })
  })
})

// If parse method is working, load method will working too because THREE after file load use parse method.