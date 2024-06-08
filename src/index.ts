import { engine } from "@dcl/sdk/ecs";
import { setupUi } from './ui'
import { ElevatorModule, createElevator } from './elevator'
import {  addVonsEmoters } from './emoteFurnis'
import { createAllLazyAreas } from './lazyLoading'
import { artHoverSystem, changeArtHoverSystem, createArtHovers } from './Art/artHover'
import { createBuilding } from "./components";
import { createStream, stopStream } from "./playlist";
import { createFrontScreens } from "./frontPosters";
import * as utils from '@dcl-sdk/utils';
import VLM from "vlm-dcl";
import { isParty } from "./config";


export function main() {
  createElevator()
  const elevatorButtons = ElevatorModule.initializeElevatorButtons();
  const callButtons = ElevatorModule.initializeElevatorCallButtons();
  //addRaptureEmoters();
  //addVonsEmoters();
  //addRooftopEmoters()
  createAllLazyAreas()
  createArtHovers()
  engine.addSystem(artHoverSystem)
  engine.addSystem(changeArtHoverSystem)
  createBuilding()
  createStream()
  //stopStream()
  createFrontScreens()
  //VLM.init()
  utils.timers.setTimeout(() => {
    setupUi()
  }, 7000)
}
