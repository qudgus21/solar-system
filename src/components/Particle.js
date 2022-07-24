import * as THREE from "three";
import { scene } from "../objects/core";

export class Particle {
  constructor(info) {
    this.count = info.count;
    this.path = info.path;
    this.spread = info.spread;

    //geometry
    this.geometry = new THREE.BufferGeometry();
    this.positions = new Float32Array(this.count * 3);
    for (let i = 0; i < this.positions.length; i++) {
      this.positions[i] = (Math.random() - 0.5) * this.spread;
    }
    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(this.positions, 3)
    );

    //material
    this.particleTexture = new THREE.TextureLoader().load(this.path);
    this.material = new THREE.PointsMaterial({
      size: 0.17,
      color: "white",
      map: this.particleTexture,
      transparent: true,
      alphaMap: this.particleTexture,
      depthWrite: false,
    });

    //mesh
    this.mesh = new THREE.Points(this.geometry, this.material);

    scene.add(this.mesh);
  }
}
