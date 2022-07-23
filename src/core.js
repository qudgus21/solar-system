import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const factor = {
  canvas,
  scene,
  renderer,
  camera,
  sounds,
  gltfLoader,
  textureLoader,
  clock,
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
    const axesHelper = new THREE.AxesHelper(3);
    scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper(5);
    scene.add(gridHelper);

    factor.clock = new THREE.Clock();
  };

  const initializeCamera = () => {
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.y = 1.5;
    camera.position.z = 60;
    // camera.position.z = 10;
    factor.camera = camera;
  };

  const initializeLight = () => {
    const ambientLight = new THREE.AmbientLight("white", 1);
    scene.add(ambientLight);
  };

  const initializeControl = () => {
    const controls = new OrbitControls(camera, renderer.domElement);
  };

  const initializeRenderer = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  };

  const initializeEvents = () => {
    window.addEventListener("resize", setSize);
  };

  const initializeSound = () => {
    const fireSound = new Audio();
    fireSound.src = "/sounds/fire.mp3";

    factor.sounds = {
      fire: fireSound,
    };
  };

  const setSize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  };

  const initializeLoader = () => {
    factor.gltfLoader = new GLTFLoader();
    factor.textureLoader = new THREE.TextureLoader();
  };

  initializeHelper();
  initializeSound();
  initializeCamera();
  initializeLight();
  initializeControl();
  initializeRenderer();
  initializeLoader();
  initializeEvents();
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
