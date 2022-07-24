import * as THREE from "three";
import gsap from "gsap";
import { camera, clock, scene, textureLoader } from "../objects/core";
import { sun } from "../objects/meshe";

export class Planet {
  constructor(info) {
    //variable
    this.name = info.name;
    this.path = info.path;
    this.radius = info.radius;
    this.particle = info.particle;
    this.distanceX = info.distanceX;
    this.distanceY = info.distanceY;
    this.distanceZ = info.distanceZ;
    this.rotationOffset = info.rotationOffset;
    this.orbitOffset = info.orbitOffset;

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
    this.mesh.position.x = this.distanceX || this.mesh.position.x;
    this.mesh.position.y = this.distanceY || this.mesh.position.y;
    this.mesh.position.z = this.distanceZ || this.mesh.position.z;
    this.mesh.name = this.name;
    scene.add(this.mesh);

    //자전
    this.planetRotation = (offset) => {
      this.mesh.rotation.y += offset;
    };

    //공전
    this.planetOrbit = (elapsed, offset) => {
      this.mesh.position.x = Math.cos(elapsed / offset) * this.distanceX;
      this.mesh.position.z = Math.sin(elapsed / offset) * this.distanceX;
    };

    //행성으로 카메라 이동
    this.animateCameraToPlanet = (offset) => {
      gsap.to(camera.position, {
        duration: 2,
        x:
          Math.cos(
            (clock.getElapsedTime() * 3 + offset * 3) / this.orbitOffset
          ) *
          this.distanceX *
          1.2,
        y: this.mesh.position.y,
        z:
          Math.sin(
            (clock.getElapsedTime() * 3 + offset * 3) / this.orbitOffset
          ) *
          this.distanceX *
          1.2,
        onUpdate: () => {
          camera.lookAt(0, 0, 0);
        },
      });
    };

    //태양을 바라보기
    this.planetTowerdsSun = (time) => {
      camera.position.x =
        Math.cos(time / this.orbitOffset) * this.distanceX * 1.2;
      camera.position.y = this.mesh.position.y;
      camera.position.z =
        Math.sin(time / this.orbitOffset) * this.distanceX * 1.2;
      camera.lookAt(
        sun.mesh.position.x,
        sun.mesh.position.y,
        sun.mesh.position.z
      );
    };
  }
}
