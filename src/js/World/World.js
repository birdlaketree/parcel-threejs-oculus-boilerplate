import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Loop } from './system/Loop.js';
import { createRenderer } from './system/renderer.js';
import { createScene } from './components/scene.js';
import { createCamera, createDolly } from './components/camera.js';
import { createLights } from './components/lights.js';
import { blue } from './components/materials/blue.js';
import { cube } from './components/meshes/cube.js'
import { sphere } from './components/meshes/sphere.js'
import { createFloor } from './components/meshes/floor.js'
import { VrControls } from './system/VrControls.js'

class World {
  constructor() {
    this.renderer = createRenderer();
    this.scene = createScene(this.renderer);
    this.camera = createCamera();
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    const dolly = createDolly(this.camera, this.scene);
    dolly.position.set(0, 0, 0);

    const vrControls = new VrControls(this.renderer, dolly, this.camera);
    this.loop.updatables.push(vrControls);

    const floor = createFloor(this.scene);
    const lights = createLights(this.scene);
    const materialSphere1 = blue(0xeeee00);
    const materialSphere2 = blue(0x000000);
    const materialCube = blue(0xffffff);

    const nSphereItems = 80;
    for (let j = 0; j < nSphereItems; j++) {
      let radius = Math.random() * 100;
      let rnd = Math.random();
      let temp_sphere = sphere((rnd > 0.5) ? materialSphere1 : materialSphere2, radius);
      temp_sphere.position.x = Math.random() * 400 - 200;
      temp_sphere.position.y = Math.random() * radius * 8;
      temp_sphere.position.z = Math.random() * 400 - 200;
      this.scene.add( temp_sphere );
    }

    const nCubeItems = 160;
    for (let i = 0; i < nCubeItems; i++) {
      let width = Math.random() * 0.2;
      let depth = Math.random() * 0.2;
      let height = Math.random() * 200 * 4;
      let temp_cube = cube(materialCube, width, height, depth);
      temp_cube.position.x = Math.random() * 400 - 200;
      temp_cube.position.y = height/2;
      temp_cube.position.z = Math.random() * 400 - 200;
      this.scene.add( temp_cube );
    }
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}

export { World };