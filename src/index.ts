import { ColliderLayer, engine, GltfContainer, InputAction, MeshCollider, MeshRenderer, pointerEventsSystem, Transform } from "@dcl/sdk/ecs";
import { setupUi } from './ui'
import { ElevatorModule, createElevator } from './elevator'
import { addEmoters } from './emoteFurnis'
import { createAllLazyAreas } from './lazyLoading'
import { artHoverSystem, changeArtHoverSystem, createArtHovers } from './Art/artHover'
import { createBuilding } from "./components";
import { createStream, stopStream } from "./playlist";
import { createFrontScreens } from "./frontPosters";
import * as utils from '@dcl-sdk/utils';
import VLM from "vlm-dcl";
import { isParty } from "./config";
import { LSCQuesting, QUEST_ID, STEP_ID, TASK_ID } from "./questing";
import { Vector3, Quaternion } from "@dcl/sdk/math";
import { LSCQUEST_EVENTS, LSCQuestAction, LSCQuestConnect, lscQuestEvent } from "lsc-questing-dcl"





	const myEgg = engine.addEntity()
  GltfContainer.create(myEgg, {
    src: "models/egg.glb",
    invisibleMeshesCollisionMask: ColliderLayer.CL_POINTER
  })
	Transform.create(myEgg, {
		position: Vector3.create(1.45, 22.1, 61.15),
		rotation: Quaternion.fromEulerDegrees(0, 90, 0),
		scale: Vector3.create(11, 11, 11)
	})

	pointerEventsSystem.onPointerDown(
		{
			entity: myEgg,
			opts: { button: InputAction.IA_POINTER, hoverText: 'Collect Egg' }
		},
		function () {
			console.log("clicked egg")
            LSCQuestAction(QUEST_ID, STEP_ID, TASK_ID)
            console.log('Egg clicked!!')
      
		}
	)
	// add an on click trigger for the egg


export function main() {
  createElevator()
  createFrontScreens()
  const elevatorButtons = ElevatorModule.initializeElevatorButtons();
  const callButtons = ElevatorModule.initializeElevatorCallButtons();

  createAllLazyAreas()
  createArtHovers()
  engine.addSystem(artHoverSystem)
  engine.addSystem(changeArtHoverSystem)
  createBuilding()
   createStream()

   if (isParty) {
    VLM.init({})
    //console.log(VLM.getState)

  }
  utils.timers.setTimeout(() => {
    setupUi()
  }, 7000)


  // Quest
  //createEgg()
  LSCQuesting()
}
