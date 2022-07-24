import * as THREE from "three";
import { scene } from "../objects/core";

export class Orbit {
  constructor(info) {
    this.radius = info.radius;

    this.curve = new THREE.EllipseCurve(
      0,
      0,
      this.radius,
      this.radius,
      0,
      2 * Math.PI,
      false,
      0
    );

    this.points = this.curve.getPoints(100);
    this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
    this.material = new THREE.LineBasicMaterial({ color: "#dcdcdc" });
    this.ellipse = new THREE.Line(this.geometry, this.material);
    this.ellipse.rotation.x = Math.PI / 2;

    scene.add(this.ellipse);
  }
}
