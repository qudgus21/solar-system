import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const factor = {
  canvas,
  scene,
  renderer,
  camera,
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
  };

  const initializeCamera = () => {
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.y = 1.5;
    camera.position.z = 30;
    factor.camera = camera;
  };

  const initializeLight = () => {
    const ambientLight = new THREE.AmbientLight("white", 0.5);
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

  const setSize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  };

  const draw = () => {
    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  };

  initializeHelper();
  initializeCamera();
  initializeLight();
  initializeControl();
  initializeRenderer();
  initializeEvents();

  draw();
};

initialize();

export const canvas = factor.canvas;
export const scene = factor.scene;
export const renderer = factor.renderer;
export const camera = factor.canvas;
