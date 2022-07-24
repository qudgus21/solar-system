import { Planet } from "../components/Planet";
import { Particle } from "../components/Particle";
import { Sun } from "../components/Sun";

export const particle = new Particle({
  path: "images/particle.png",
  count: 10000,
  spread: 260,
});

export const sun = new Sun({
  name: "sun",
  path: "textures/sun.png",
  radius: 5,
  particle: 40,
});

export const mercury = new Planet({
  name: "mercury",
  path: "textures/mercury.jpeg",
  radius: 1.5,
  particle: 32,
  distanceX: 15,
  distanceZ: 15,
  rotationOffset: 0.008,
  orbitOffset: 5,
});

export const venus = new Planet({
  name: "venus",
  path: "textures/venus.jpeg",
  radius: 2,
  particle: 32,
  distanceX: -30,
  distanceZ: 15,
  rotationOffset: 0.009,
  orbitOffset: 10,
});

const earth = new Planet({
  name: "earth",
  path: "textures/earth.jpeg",
  radius: 2,
  particle: 32,
  distanceX: 45,
  rotationOffset: 0.009,
  orbitOffset: 20,
});

export const mars = new Planet({
  name: "mars",
  path: "textures/mars.jpeg",
  radius: 2,
  particle: 32,
  distanceX: -60,
  rotationOffset: 0.009,
  orbitOffset: 28,
});

export const jupiter = new Planet({
  name: "jupiter",
  path: "textures/jupiter.jpeg",
  radius: 2,
  particle: 32,
  distanceX: 80,
  rotationOffset: 0.013,
  orbitOffset: 38,
});

export const saturn = new Planet({
  name: "saturn",
  path: "textures/saturn.png",
  radius: 2,
  particle: 32,
  distanceX: -105,
  rotationOffset: 13,
  orbitOffset: 60,
});

export const uranus = new Planet({
  name: "uranus",
  path: "textures/uranus.jpeg",
  radius: 2,
  particle: 32,
  distanceX: 145,
  rotationOffset: 0.009,
  orbitOffset: 80,
});

export const neptune = new Planet({
  name: "neptune",
  path: "textures/neptune.jpeg",
  radius: 2,
  particle: 32,
  distanceX: -170,
  rotationOffset: 0.01,
  orbitOffset: 100,
});

export const planets = [
  mercury,
  venus,
  earth,
  mars,
  jupiter,
  saturn,
  uranus,
  neptune,
];
