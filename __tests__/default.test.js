const NodeThreeExporter = require('../')
const THREE = require('three')
const USDZExporter = require('../USDZExporter')
const exporter = new NodeThreeExporter()

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

  expect(exporter.getLoader('OBJ').toEqual(exporter.objLoader))
  expect(exporter.getLoader('fbx').toEqual(exporter.fbxLoader))
  expect(exporter.getLoader('GLTF').toEqual(exporter.gltfLoader))
  expect(exporter.getLoader('glb').toEqual(exporter.gltfLoader))
  expect(exporter.getLoader('stl').toEqual(exporter.stlLoader))
  expect(exporter.getLoader('').toBeUndefined())
  expect(exporter.getLoader('usdz').toBeUndefined())
})