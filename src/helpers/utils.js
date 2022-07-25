import { camera } from "../objects/core";
import gsap from "gsap";
import { state } from "../global";

export const showBackBtn = () => {
  const $backBtn = document.querySelector(".back-btn");
  $backBtn.style.visibility = "visible";
};

export const hiddenBackBtn = () => {
  const $backBtn = document.querySelector(".back-btn");
  $backBtn.style.visibility = "hidden";
};

export const cameraZoomout = () => {
  state.clickedPlanet = undefined;

  gsap.to(camera.position, {
    duration: 2,
    z: 100,
    y: 100,
    onUpdate: () => {
      camera.lookAt(0, 0, 0);
    },
  });
};
