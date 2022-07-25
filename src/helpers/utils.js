import { camera, sounds } from "../objects/core";
import gsap from "gsap";
import { state } from "../global";

export const showBackBtn = () => {
  const $backBtn = document.querySelector(".back-btn");
  $backBtn.style.visibility = "visible";
};

export const hiddenBackBtn = () => {
  const $backBtn = document.querySelector(".back-btn");
  sounds.fire.pause();
  $backBtn.style.visibility = "hidden";
};

export const showSoundIcon = () => {
  const $soundIcon = document.querySelector(".sound-wrapper");
  $soundIcon.style.visibility = "visible";
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

export const toogleSound = (e) => {
  const soundState = e.target.src.split("/").pop().split(".")[0];
  if (soundState === "volume") {
    sounds.space.pause();
    sounds.fire.pause();
    e.target.src = "/images/mute.png";
  } else {
    sounds.space.play();
    e.target.src = "/images/volume.png";
  }
};

export const zoominToSun = () => {
  showBackBtn();
  gsap.to(camera.position, {
    duration: 2,
    z: 10,
    y: 0,
    x: 0,
    onUpdate: () => {
      camera.lookAt(0, 0, 0);
    },
    onComplete: () => {
      sounds.fire.play();
    },
  });
};
