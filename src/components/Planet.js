import * as THREE from "three";
import { scene, textureLoader } from "../core";

export class Planet {
  constructor(info) {
    //variable
    this.name = info.name;
    this.path = info.path;
    this.radius = info.radius;
    this.particle = info.particle;
    this.distanceX = info.distanceX || 0;
    this.distanceY = info.distanceY || 0;
    this.distanceZ = info.distanceZ || 0;

    //geometry
    this.geometry = new THREE.SphereGeometry(
      this.radius,
      this.particle,
      this.particle
    );

    //material
    this.texture = textureLoader.load(this.path);
    this.material = new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide,
      flatShading: true,
      map: this.texture,
    });

    //mesh
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x += this.distanceX;
    this.mesh.position.x += this.distanceX;
    this.mesh.position.x += this.distanceX;
    this.mesh.name = this.name;
    scene.add(this.mesh);

    //자전
    this.planetRotation = (offset) => {
      this.mesh.rotation.y += offset || 0.001;
    };

    //공전
    this.planetOrbit = (elapsed, offset) => {
      this.mesh.position.x = Math.cos(elapsed / offset || 20) * 15;
      this.mesh.position.z = Math.sin(elapsed / offset || 20) * 15;
    };
  }
}
