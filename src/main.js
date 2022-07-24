import * as THREE from "three";
import { sun, planets } from "./objects/meshe";
import { PreventDragClick } from "./helpers/PreventDragClick";
import { canvas, scene, renderer, camera, clock } from "./objects/core";
import gsap from "gsap";

// 마지막에 추가
// setTimeout(() => {
//   gsap.to(camera.position, {
//     duration: 2,
//     z: 60,
//   });
// }, 1500);

const preventDragClick = new PreventDragClick(canvas);

//행성 클릭
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let clickedPlanet;

function checkIntersects() {
  if (preventDragClick.mouseMoved) return;
  if (clickedPlanet) return;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(
    planets.map((planet) => {
      return planet.mesh;
    })
  );

  for (const item of intersects) {
    let temp = planets.find((planet) => planet.name === item.object.name);

    gsap.to(camera.position, {
      duration: 2,
      x:
        Math.cos((clock.getElapsedTime() * 3 + 6) / temp.orbitOffset) *
        temp.distanceX *
        1.2,
      y: item.object.position.y,
      z:
        Math.sin((clock.getElapsedTime() * 3 + 6) / temp.orbitOffset) *
        temp.distanceX *
        1.2,
      onUpdate: () => {
        camera.lookAt(0, 0, 0);
      },
    });

    // clickedPlanet = item.object;

    setTimeout(() => {
      clickedPlanet = planets.find(
        (planet) => planet.name === item.object.name
      );
    }, 2000);

    break;
  }
}

const draw = () => {
  const elapsed = clock.getElapsedTime() * 3;

  if (sun.mesh) {
    sun.sunSurfaceAnimation(elapsed);
    sun.planetRotation(0.0008);
  }

  planets.forEach((planet) => {
    if (planet.mesh) {
      planet.planetRotation(planet.rotationOffset);
      planet.planetOrbit(elapsed, planet.orbitOffset);
    }
  });

  if (clickedPlanet) {
    camera.position.x =
      Math.cos(elapsed / clickedPlanet.orbitOffset) *
      clickedPlanet.distanceX *
      1.2;
    camera.position.y = clickedPlanet.mesh.position.y;
    camera.position.z =
      Math.sin(elapsed / clickedPlanet.orbitOffset) *
      clickedPlanet.distanceX *
      1.2;
    camera.lookAt(
      sun.mesh.position.x,
      sun.mesh.position.y,
      sun.mesh.position.z
    );
  }

  // this.mesh.position.x = Math.cos(elapsed / offset) * this.distanceX;
  // this.mesh.position.z = Math.sin(elapsed / offset) * this.distanceX;

  renderer.render(scene, camera);
  renderer.setAnimationLoop(draw);
};

draw();

canvas.addEventListener("click", (e) => {
  mouse.x = (e.clientX / canvas.clientWidth) * 2 - 1;
  mouse.y = -((e.clientY / canvas.clientHeight) * 2 - 1);
  checkIntersects();
});
