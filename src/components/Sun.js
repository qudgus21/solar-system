import * as THREE from "three";
import { Planet } from "./Planet";
import { scene, textureLoader } from "../objects/core";

export class Sun extends Planet {
  constructor(info) {
    super(info);
    //position
    this.positionArray = this.geometry.attributes.position.array;
    this.randomArray = [];
    for (let i = 0; i < this.positionArray.length; i += 3) {
      this.positionArray[i] =
        this.positionArray[i] + (Math.random() - 0.5) * 0.25;
      this.positionArray[i + 1] =
        this.positionArray[i + 1] + (Math.random() - 0.5) * 0.25;
      this.positionArray[i + 2] =
        this.positionArray[i + 2] + (Math.random() - 0.5) * 0.25;
      this.randomArray[i] = (Math.random() - 0.5) * 0.2;
      this.randomArray[i + 1] = (Math.random() - 0.5) * 0.2;
      this.randomArray[i + 2] = (Math.random() - 0.5) * 0.2;
    }

    //animation
    this.sunSurfaceAnimation = (elapsed) => {
      for (let i = 0; i < this.positionArray.length; i += 3) {
        this.positionArray[i] +=
          Math.sin(elapsed + this.randomArray[i] * 200) * 0.002;
        this.positionArray[i + 1] +=
          Math.sin(elapsed + this.randomArray[i] * 200) * 0.002;
        this.positionArray[i + 2] +=
          Math.sin(elapsed + this.randomArray[i] * 200) * 0.002;
      }
      this.geometry.attributes.position.needsUpdate = true;
    };
  }
}
