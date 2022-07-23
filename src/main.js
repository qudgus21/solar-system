import * as THREE from "three";
import { Particle } from "./components/Particle";
import { Sun } from "./components/Sun";
import { canvas, scene, renderer, camera, sounds } from "./core";
import gsap from "gsap";

// setTimeout(() => {
//   gsap.to(camera.position, {
//     duration: 2,
//     z: 60,
//   });
// }, 1500);

const particle = new Particle({
  path: "images/particle.png",
  count: 6000,
  spread: 150,
});

const sun = new Sun({
  path: "textures/sun.png",
  radius: 5,
  particle: 40,
});

const clock = new THREE.Clock();

const sunSurfaceAnimation = () => {
  const elapsed = clock.getElapsedTime() * 3;
  for (let i = 0; i < sun.positionArray.length; i += 3) {
    sun.positionArray[i] +=
      Math.sin(elapsed + sun.randomArray[i] * 200) * 0.002;
    sun.positionArray[i + 1] +=
      Math.sin(elapsed + sun.randomArray[i] * 200) * 0.002;
    sun.positionArray[i + 2] +=
      Math.sin(elapsed + sun.randomArray[i] * 200) * 0.002;
  }
  sun.geometry.attributes.position.needsUpdate = true;
};

const draw = () => {
  sunSurfaceAnimation();

  renderer.render(scene, camera);
  renderer.setAnimationLoop(draw);
};

draw();
