# threejs-node-exporters

Nodejs libary to generate gltf/usdz models from threejs objects.

## Usage

### Basic usage

```javascript
const THREE = require('three')
const NodeThreeExporter = require('threejs-node-exporters')
const fs = require('fs')

//generate cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 )
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} )
const cube = new THREE.Mesh( geometry, material )

const exporter = new NodeThreeExporter()

const onComplete = buffer => {
  // do what you want with your model ex. save
  fs.writeFileSync('./model.gltf', buffer)
}

// generate buffer
exporter.generate('gltf', cube, onComplete)
```

### Load model from url

```javascript
const THREE = require('three')
const NodeThreeExporter = require('threejs-node-exporters')

const exporter = new NodeThreeExporter()

const onLoad = model => {
  // you can do anything with model ex. change material and add to scene
  const scene = new THREE.Scene()
  model.material = new THREE.MeshBasicMaterial( {color: 0x00ff00} )
  scene.add(model)

  exporter.generate('usdz', scene, buffer=>{...})
}

exporter.load('URL', onLoad)
```

### Load model from file

```javascript
const THREE = require('three')
const NodeThreeExporter = require('threejs-node-exporters')
const fs = require('fs')

const file = fs.readFileSync('./model.obj')

const onParse = model => {
  ...
}

const exporter = new NodeThreeExporter()

exporter.parse('obj', file, onParse)
```

### API

#### `.generate(format, object, onComplete, onError)`

* **format(string)** - format of generating file, available: usdz, gltf
* **object** - Threejs Object3D
* **onComplete(func)**: callback that will be execute after buffer generate, providing buffer
* **onError(func)**: callback, execute when generating fails

#### `.load(url, onComplete, onError)`
* **url** - url to model, available files format: gltf, glb, obj, fbx, stl
* **onComplete(func)**: callback that will be execute after file load, providing loaded 3D object
* **onError(func)**: callback, execute when loading fails

#### `.load(format, buffer, onComplete, onError)`
* **format(string)** - format of parsing buffer, available: gltf, glb, obj, fbx, stl
* **buffer** - model file buffer,
* **onComplete(func)**: callback that will be execute after file parse, providing parsed 3D object
* **onError(func)**: callback, execute when parse fails