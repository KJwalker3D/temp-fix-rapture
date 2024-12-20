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
import { toggleSpiral } from "./Art/lightShow";


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
  if (isParty) {
    VLM.init({})
    //console.log(VLM.getState)

  }
  utils.timers.setTimeout(() => {
    setupUi()
  }, 7000)
  engine.addSystem(toggleSpiral)
//toggleSpiral()
}
