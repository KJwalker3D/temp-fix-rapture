import { Quaternion, Vector3 } from "@dcl/sdk/math"
import {
  Animator,
  engine,
  Transform,
  GltfContainer,
  pointerEventsSystem,
  InputAction
} from "@dcl/sdk/ecs"
import { openExternalUrl } from "~system/RestrictedActions"
import {
  artLink38,
  artModel38,
  artPos38,
  artRot38,
  artScale38,
  artTitle38
} from "./artData"

export type KineticData = {
  room: number
  id: number
  position: Vector3
  rotation: Vector3
  scale: Vector3
  modelPath: string
  animationClip?: string | null
  hoverText: string
}

export const kineticArtCollection: KineticData[] = [
  {
    room: 1,
    id: 38,
    position: artPos38,
    rotation: artRot38,
    scale: artScale38,
    modelPath: artModel38,
    hoverText: artTitle38
  }
]

export function createKineticArt(
  position: Vector3,
  rotation: Vector3,
  scale: Vector3,
  modelPath: string,
  hoverText: string
) {
  const entity = engine.addEntity()

  Transform.create(entity, {
    position,
    rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z),
    scale
  })

  Animator.create(entity, {
    states: [
      {
        //name: "Default",
        clip: "default",
        playing: true,
        speed: 0.5,
        loop: true
      }
    ]
  })

  GltfContainer.create(entity, {
    src: modelPath
  })

  pointerEventsSystem.onPointerDown(
    entity,
    () => {
      console.log("clicked artwork")
      openExternalUrl({ url: artLink38 })
    },
    {
      button: InputAction.IA_POINTER,
      hoverText: hoverText,
      maxDistance: 10
    }
  )

  return entity
}
