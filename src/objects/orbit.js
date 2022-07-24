import { Orbit } from "../components/Orbit";

export const mercury = new Orbit({
  radius: 15,
});

export const venus = new Orbit({
  radius: 30,
});

const earth = new Orbit({
  radius: 45,
});

export const mars = new Orbit({
  radius: 60,
});

export const jupiter = new Orbit({
  radius: 80,
});

export const saturn = new Orbit({
  radius: 105,
});

export const uranus = new Orbit({
  radius: 145,
});

export const neptune = new Orbit({
  radius: 170,
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
