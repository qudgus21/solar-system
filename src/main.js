import { mercury } from "./objects/orbit";
import { sun, planets } from "./objects/mesh";
import {
  canvas,
  scene,
  renderer,
  camera,
  clock,
  mouse,
  raycaster,
  preventDragClick,
} from "./objects/core";
import { state } from "./global";

const shootRaycaster = (e) => {
  if (preventDragClick.mouseMoved) return;

  mouse.x = (e.clientX / canvas.clientWidth) * 2 - 1;
  mouse.y = -((e.clientY / canvas.clientHeight) * 2 - 1);

  raycaster.setFromCamera(mouse, camera);

  reachRayToPlanet();
};

const reachRayToPlanet = () => {
  if (state.clickedPlanet) return;

  const checkedAllPlanetMeshes = raycaster.intersectObjects(
    planets.map((planet) => {
      return planet.mesh;
    })
  );

  for (const mesh of checkedAllPlanetMeshes) {
    let firstCheckedPlanet = planets.find(
      (planet) => planet.name === mesh.object.name
    );
    let offset = 2;

    firstCheckedPlanet.animateCameraToPlanet(offset);

    setTimeout(() => {
      state.clickedPlanet = planets.find(
        (planet) => planet.name === mesh.object.name
      );
    }, offset * 1000);

    break;
  }
};

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

  if (state.clickedPlanet) {
    state.clickedPlanet.planetTowerdsSun(elapsed);
  }

  renderer.render(scene, camera);
  renderer.setAnimationLoop(draw);
};

draw();

canvas.addEventListener("click", (e) => {
  shootRaycaster(e);
});
