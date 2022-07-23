import * as THREE from "three";
import { Particle } from "./Particle";
import { canvas, scene, renderer, camera } from "./core";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const particle = new Particle({
  count: 1500,
  path: "images/particle.png",
  spread: 50,
});

//태양 로드
const loader = new GLTFLoader();
loader.load("/models/sun/scene.gltf", (gltf) => {
  const sun = gltf.scene.children[0];
  console.log(sun.scale.set(0.5, 0.5, 0.5));
  scene.add(sun);
});
