import * as THREE from "three";
import { Mesh } from "three";
import { cm, geo } from "./common";
import { Particle } from "./Particle";
import { canvas, scene, renderer, camera } from "./core";

const particle = new Particle({});

const count = 1500;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(count * 3);
for (let i = 0; i < positions.length; i++) {
  positions[i] = (Math.random() - 0.5) * 50;
}
geometry.computeBoundingSphere();

let particleTexture = new THREE.TextureLoader().load("images/particle.png");

geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  size: 0.1,
  color: "white",
  map: particleTexture,
  transparent: true,
  alphaMap: particleTexture,
  depthWrite: false,
});

const mesh = new THREE.Points(geometry, material);

scene.add(mesh);
