import {
  engine,
  Transform,
  GltfContainer,
  ColliderLayer,
  pointerEventsSystem,
  InputAction,
  Entity,
  PointerEventType,
  MeshCollider
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

// Elevator system
const elevator = engine.addEntity()
let isMoving = false
let currentFloor = 0

const floors = [
  { name: 'First Floor', height: 0 },
  { name: 'Mezzanine', height: 7.45 },
  { name: 'Second Floor', height: 15.45 },
  { name: 'Rooftop', height: 30.75 }
]

const floorButtonMap: Map<number, Entity> = new Map()
const callButtonMap: Map<number, Entity[]> = new Map()

function calculateDuration(distance: number): number {
  return distance / 2.5
}

function moveToFloor(floorIndex: number): void {
  if (isMoving || floorIndex === currentFloor) return

  isMoving = true

  const targetHeight = floors[floorIndex].height
  const targetPosition = Vector3.create(-15.945, targetHeight, 0)

  const currentPosition = Transform.getMutable(elevator).position
  const distance = Vector3.distance(targetPosition, currentPosition)
  const duration = calculateDuration(distance)

  let elapsed = 0
  engine.addSystem(function moveElevator(dt: number) {
    elapsed += dt
    const t = Math.min(elapsed / duration, 1)
    const newPos = Vector3.lerp(currentPosition, targetPosition, t)
    Transform.getMutable(elevator).position = newPos

    if (t >= 1) {
      isMoving = false
      currentFloor = floorIndex
      return false
    }
    return true
  })
}

export function createElevator(): void {
  Transform.create(elevator, { position: Vector3.create(-15.945, 0, 0) })
  GltfContainer.create(elevator, {
    src: 'models/elevator3.glb',
    visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
  })
  //MeshCollider.setBox(elevator, [ColliderLayer.CL_PHYSICS])
}

function createElevatorButton(floorIndex: number): Entity {
  const buttonEntity = engine.addEntity()
  const buttonModelSrc = [
    'models/2.glb',
    'models/M.glb',
    'models/3.glb',
    'models/4.glb'
  ][floorIndex]

  Transform.create(buttonEntity, {
    position: Vector3.create(16.9 - 0.6 * floorIndex, 5.5, 4),
    parent: elevator
  })

  GltfContainer.create(buttonEntity, {
    src: 'models/elevatorButton.glb',
    visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS | ColliderLayer.CL_POINTER
  })

  MeshCollider.setBox(buttonEntity, [ColliderLayer.CL_PHYSICS, ColliderLayer.CL_POINTER])

  if (buttonModelSrc) {
    const numberModel = engine.addEntity()
    Transform.create(numberModel, { position: Vector3.Zero(), parent: buttonEntity })
    GltfContainer.create(numberModel, { src: buttonModelSrc })
  }

  floorButtonMap.set(floorIndex, buttonEntity)

  pointerEventsSystem.onPointerDown(
    {
      entity: buttonEntity,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: `Go to ${floors[floorIndex].name}`,
        maxDistance: 12
      }
    },
    () => moveToFloor(floorIndex)
  )

  return buttonEntity
}

function initializeElevatorButtons(): void {
  floors.forEach((_floor, index) => createElevatorButton(index))
}

function createCallButton(floorIndex: number, position: Vector3): Entity {
  const callButton = engine.addEntity()

  Transform.create(callButton, {
    position: Vector3.create(position.x, floors[floorIndex].height + position.y, position.z)
  })

  GltfContainer.create(callButton, {
    src: 'models/elevatorCallButton.glb',
    visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS | ColliderLayer.CL_POINTER
  })

  MeshCollider.setBox(callButton, [ColliderLayer.CL_PHYSICS, ColliderLayer.CL_POINTER])

  pointerEventsSystem.onPointerDown(
    {
      entity: callButton,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: 'Call Elevator',
        maxDistance: 16
      }
    },
    () => {
      if (currentFloor === floorIndex) {
        console.log('Elevator is already at this floor')
      } else {
        moveToFloor(floorIndex)
      }
    }
  )

  return callButton
}

function initializeElevatorCallButtons(): void {
  const positions = [
    [Vector3.create(-8.6, 0.8, 4.9), Vector3.create(8.9, 0.8, 4.9)],
    [Vector3.create(-13.75, 4.1, 1.4), Vector3.create(13.75, 4.1, 1.4)],
    [Vector3.create(1.1, 3.9, 1.4)],
    [Vector3.create(7.2, 3.9, 4.5)]
  ]

  positions.forEach((floorPositions, floorIndex) => {
    callButtonMap.set(floorIndex, floorPositions.map(pos => createCallButton(floorIndex, pos)))
  })
}

export const ElevatorModule = {
  createElevator,
  moveToFloor,
  initializeElevatorButtons,
  initializeElevatorCallButtons
}
