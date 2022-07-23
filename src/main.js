import * as THREE from "three";
import { Particle } from "./components/Particle";
import { Sun } from "./components/Sun";
import { Planet } from "./components/Planet";

import {
  canvas,
  scene,
  renderer,
  camera,
  sounds,
  clock,
  gltfLoader,
} from "./core";
import gsap from "gsap";

// 마지막에 추가
// setTimeout(() => {
//   gsap.to(camera.position, {
//     duration: 2,
//     z: 60,
//   });
// }, 1500);

const particle = new Particle({
  path: "images/particle.png",
  count: 10000,
  spread: 250,
});

const sun = new Sun({
  name: "sun",
  path: "textures/sun.png",
  radius: 5,
  particle: 40,
});

const mercury = new Planet({
  name: "mercury",
  path: "textures/mercury.jpeg",
  radius: 1.5,
  particle: 30,
  distanceX: 15,
});

const planets = [];
planets.push(mercury);

const draw = () => {
  const elapsed = clock.getElapsedTime() * 3;
  const delta = clock.getDelta();

  if (sun.mesh) {
    sun.sunSurfaceAnimation(elapsed);
    sun.planetRotation(0.0005);
  }

  if (mercury.mesh) {
    mercury.planetRotation(0.001);
    mercury.planetOrbit(elapsed, 20);
  }

  renderer.render(scene, camera);
  renderer.setAnimationLoop(draw);
};

draw();
