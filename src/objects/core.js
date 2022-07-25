import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { PreventDragClick } from "../helpers/PreventDragClick";
import {
  hiddenBackBtn,
  cameraZoomout,
  showSoundIcon,
  toogleSound,
} from "../helpers/utils";
import gsap from "gsap";
import { state } from "../global";

const factor = {
  canvas,
  scene,
  renderer,
  camera,
  sounds,
  gltfLoader,
  textureLoader,
  clock,
  preventDragClick,
};

const initialize = () => {
  const canvas = document.querySelector("canvas");
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGL1Renderer({
    canvas,
    antialias: true,
  });
  let camera;

  factor.canvas = canvas;
  factor.scene = scene;
  factor.renderer = renderer;

  const initializeHelper = () => {
    // const axesHelper = new THREE.AxesHelper(3);
    // scene.add(axesHelper);

    // const gridHelper = new THREE.GridHelper(5);
    // scene.add(gridHelper);
    factor.mouse = new THREE.Vector2();
    factor.raycaster = new THREE.Raycaster();
    factor.clock = new THREE.Clock();
    factor.preventDragClick = new PreventDragClick(canvas);
  };

  const initializeCamera = () => {
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 100;
    camera.position.y = 100;

    factor.camera = camera;
  };

  const initializeLight = () => {
    const ambientLight = new THREE.AmbientLight("white", 1);
    scene.add(ambientLight);
  };

  const initializeControl = () => {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxDistance = 240;
  };

  const initializeRenderer = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  };

  const initializeEvents = () => {
    window.addEventListener("resize", setSize);

    const $backBtn = document.querySelector(".back-btn");
    $backBtn.addEventListener("click", () => {
      hiddenBackBtn();
      cameraZoomout();
    });

    const $soundIcon = document.querySelector(".sound-wrapper");
    $soundIcon.addEventListener("click", (e) => {
      toogleSound(e);
    });
  };

  const initializeSound = () => {
    const fireSound = new Audio();
    const spaceBgm = new Audio();

    fireSound.src = "/sounds/fire.mp3";
    spaceBgm.src = "/sounds/space.mp3";

    factor.sounds = {
      fire: fireSound,
      space: spaceBgm,
    };
  };

  const setSize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  };

  const initializeLoader = () => {
    const loadingManager = new THREE.LoadingManager();

    factor.gltfLoader = new GLTFLoader();
    factor.textureLoader = new THREE.TextureLoader(loadingManager);

    const $loading = document.querySelector(".loading");
    const $startBtn = document.querySelector(".start-btn");
    const $loadingText = document.querySelector(".loading .text");
    const $c1 = document.querySelector(".loading .f-circle");
    const $c2 = document.querySelector(".loading .s-circle");
    const $c3 = document.querySelector(".loading .t-circle");
    $c1.style.animationPlayState = "paused";
    $c2.style.animationPlayState = "paused";
    $c3.style.animationPlayState = "paused";
    $startBtn.style.animationPlayState = "paused";

    //편법인데..
    gsap.to(camera.position, {
      duration: 2,
      z: 10,
      y: 0,
      onUpdate: () => {
        camera.lookAt(0, 0, 0);
      },
    });

    loadingManager.onStart = () => {};

    loadingManager.onProgress = () => {};

    loadingManager.onLoad = () => {
      setTimeout(() => {
        $loadingText.style.visibility = "hidden";
        $startBtn.style.display = "block";
        $c1.style.animationPlayState = "running";
        $c2.style.animationPlayState = "running";
        $c3.style.animationPlayState = "running";
        $startBtn.style.animationPlayState = "running";

        $startBtn.addEventListener("click", () => {
          $loading.remove();
          showSoundIcon();

          factor.sounds.fire.play();
          setTimeout(() => {
            factor.sounds.fire.pause();
            factor.sounds.space.play();
            factor.sounds.space.loop = true;
          }, 3500);

          setTimeout(() => {
            cameraZoomout();
            state.isLoad = true;
          }, 3500);
        });
      }, 1500);
    };

    loadingManager.onError = () => {};
  };

  initializeCamera();
  initializeSound();
  initializeLight();
  initializeControl();
  initializeRenderer();
  initializeLoader();
  initializeEvents();
  initializeHelper();
};

initialize();

export const canvas = factor.canvas;
export const scene = factor.scene;
export const renderer = factor.renderer;
export const camera = factor.camera;
export const sounds = factor.sounds;
export const gltfLoader = factor.gltfLoader;
export const textureLoader = factor.textureLoader;
export const clock = factor.clock;
export const mouse = factor.mouse;
export const raycaster = factor.raycaster;
export const preventDragClick = factor.preventDragClick;
