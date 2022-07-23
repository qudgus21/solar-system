import * as THREE from "three";
import { Particle } from "./Particle";
import { canvas, scene, renderer, camera } from "./core";

const particle = new Particle({
  count: 1500,
  path: "images/particle.png",
  spread: 50,
});
