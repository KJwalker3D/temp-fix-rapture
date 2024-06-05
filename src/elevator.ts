import { engine, Transform, GltfContainer, ColliderLayer, pointerEventsSystem, InputAction, Entity } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'

// Elevator system
const elevator = engine.addEntity();
let isMoving = false;
let currentFloor = 0;

const floors = [
  { name: 'First Floor', height: 0 },
  { name: 'Mezzanine', height: 7.45 },
  { name: 'Second Floor', height: 15.45 },
  { name: 'Rooftop', height: 30.75 }
];

function calculateDuration(distance: number): number {
  return distance / 2.5; // Adjust as needed
}

async function moveToFloor(floorIndex: number): Promise<void> {
  if (isMoving) {
    throw new Error('Elevator is already in motion');
  }
  
  if (floorIndex === currentFloor) {
    return;
  }
  
  isMoving = true;
  
  const targetHeight = floors[floorIndex].height;
  const targetPosition = Vector3.create(-15.945, targetHeight, 0);
  
  const currentPosition = Transform.get(elevator).position;
  const distance = Vector3.distance(targetPosition, currentPosition);
  const duration = calculateDuration(distance);

  await new Promise<void>((resolve) => {
    utils.tweens.startTranslation(elevator, currentPosition, targetPosition, duration, utils.InterpolationType.LINEAR, () => {
      // Recreate the transform component with the new target position
      Transform.createOrReplace(elevator, { position: targetPosition });
      
      isMoving = false;
      currentFloor = floorIndex;
      console.log('Elevator reached floor:', floors[floorIndex].name);
      resolve();
    });
  });
}

export async function createElevator(): Promise<void> {
  Transform.create(elevator, { position: Vector3.create(-15.945, 0, 0) });
  GltfContainer.create(elevator, {
    src: 'models/elevator3.glb',
    visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS | ColliderLayer.CL_POINTER
  });
}
function createElevatorButtons(floorName: string, height: number) {
  const buttonEntity = engine.addEntity();
  const button = GltfContainer.create(buttonEntity, {
    src: 'models/elevatorButton.glb',
    visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS | ColliderLayer.CL_POINTER
  });

  const numberModel = engine.addEntity();
  let numberModelSrc = '';

  switch (floorName) {
    case 'First Floor':
      numberModelSrc = 'models/2.glb';
      break;
    case 'Mezzanine':
      numberModelSrc = 'models/M.glb';
      break;
    case 'Second Floor':
      numberModelSrc = 'models/3.glb';
      break;
    case 'Rooftop':
      numberModelSrc = 'models/4.glb';
      break;
    default:
      numberModelSrc = '';
  }

  Transform.create(numberModel, {
    position: Vector3.create(0, -0, 0),
    parent: buttonEntity,
    scale: Vector3.One() // Adjust scale as needed
  });

  GltfContainer.create(numberModel, {
    src: numberModelSrc
  });

  return buttonEntity;
}


function initializeElevatorButtons(): Entity[] {
  const buttons: Entity[] = [];
  const buttonOffsetX = -0.6;
  const buttonHeight = 0.5;

  floors.forEach((floor, index) => {
    const buttonEntity = createElevatorButtons(floor.name, floor.height);
    const buttonPositionX = 16.9 + buttonOffsetX * index;
    const buttonPositionY = 5 + buttonHeight;
  
    Transform.create(buttonEntity, {
      position: Vector3.create(buttonPositionX, buttonPositionY, 4),
      parent: elevator,
      scale: Vector3.create(1, 1, 1)
    });

    buttons.push(buttonEntity);
  
    pointerEventsSystem.onPointerDown(
      {
        entity: buttonEntity, 
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: `Go to ${floor.name}`,
          maxDistance: 12,
        },
      },
      () => {
        moveToFloor(index);
      }
    );
  });

  return buttons;
}

function createElevatorCallButton(floorName: string, height: number, isRightSide: boolean): Entity {
  const callButton = engine.addEntity();
  const xOffset = isRightSide ? 12.75 : -12.75;
  const position = Vector3.add(Vector3.create(xOffset, 0.85 + height, 1.75), isRightSide ? Vector3.Left() : Vector3.Right());

  Transform.create(callButton, {
    position: position,
    scale: Vector3.create(1, 1, 1)
  });

  GltfContainer.create(callButton, {
    src: 'models/elevatorCallButton.glb',
    visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS | ColliderLayer.CL_POINTER
  });

  return callButton;
}

interface ButtonPosition {
  xOffset: number;
  yOffset: number;
  zOffset: number;
  isRightSide: boolean;
}

export const buttonPositions: ButtonPosition[][] = [
  // array for ground floor
  [
    { xOffset: -8.6, yOffset: 0.8, zOffset: 4.9, isRightSide: true },
    { xOffset: 8.9, yOffset: 0.8, zOffset: 4.9, isRightSide: false },
  ],
  // mezzanine
  [
    { xOffset: -13.75, yOffset: 4.1, zOffset: 1.4, isRightSide: false },
    { xOffset: 13.75, yOffset: 4.1, zOffset: 1.4, isRightSide: true },
  ],
  // first floor
  [
    { xOffset: 1.1, yOffset: 3.9, zOffset: 1.4, isRightSide: true },
  ],
  // rooftop
  [
    { xOffset: 7.2, yOffset: 3.9, zOffset: 4.5, isRightSide: true },
  ]
];

function initializeElevatorCallButtons(): Entity[] {
  const buttons: Entity[] = [];

  for (let index = 0; index < floors.length; index++) {
    const positionsForFloor = buttonPositions[index];

    if (positionsForFloor) {
      for (let buttonIndex = 0; buttonIndex < positionsForFloor.length; buttonIndex++) {
        const position = positionsForFloor[buttonIndex];
        const floor = floors[index];

        const callButton = createElevatorCallButton(floor.name, floor.height, position.isRightSide);

        const callButtonPosition = Vector3.add(
          Vector3.create(position.xOffset, position.yOffset + floor.height, position.zOffset),
          position.isRightSide ? Vector3.Left() : Vector3.Right()
        );

        Transform.createOrReplace(callButton, {
          position: callButtonPosition,
          scale: Vector3.create(1, 1, 1),
        });

        pointerEventsSystem.onPointerDown(
          {
            entity: callButton,
            opts: {
              button: InputAction.IA_POINTER,
              hoverText: `Call Elevator`,
              maxDistance: 15,
            },
          },
          () => {
            if (currentFloor === index) {
              console.log(`Elevator is already at ${floor.name}`);
            } else {
              moveToFloor(index);
            }
          }
        );

        buttons.push(callButton);
      }
    }
  }

  return buttons;
}

export const ElevatorModule = {
  createElevator,
  moveToFloor,
  initializeElevatorButtons,
  initializeElevatorCallButtons
};
