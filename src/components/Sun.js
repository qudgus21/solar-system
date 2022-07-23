import * as THREE from "three";
import { scene, textureLoader } from "../core";

export class Sun {
  constructor(info) {
    //geometry
    this.geometry = new THREE.SphereGeometry(
      info.radius,
      info.particle,
      info.particle
    );

    //material
    this.texture = textureLoader.load(info.path);
    this.material = new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide,
      flatShading: true,
      map: this.texture,
    });

    //position
    this.positionArray = this.geometry.attributes.position.array;

    this.randomArray = [];
    for (let i = 0; i < this.positionArray.length; i += 3) {
      this.positionArray[i] =
        this.positionArray[i] + (Math.random() - 0.5) * 0.25;
      this.positionArray[i + 1] =
        this.positionArray[i + 1] + (Math.random() - 0.5) * 0.25;
      this.positionArray[i + 2] =
        this.positionArray[i + 2] + (Math.random() - 0.5) * 0.25;
      this.randomArray[i] = (Math.random() - 0.5) * 0.2;
      this.randomArray[i + 1] = (Math.random() - 0.5) * 0.2;
      this.randomArray[i + 2] = (Math.random() - 0.5) * 0.2;
    }

    //mesh
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    scene.add(this.mesh);
  }
}
