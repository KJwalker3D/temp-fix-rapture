import {
  ColliderLayer,
  GltfContainer,
  InputAction,
  Material,
  MeshCollider,
  MeshRenderer,
  Schemas,
  TextureWrapMode,
  Transform,
  VideoPlayer,
  engine,
  pointerEventsSystem,
  Entity,
  PointerEvents,
  PointerEventType
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion, Color4 } from '@dcl/sdk/math'

// Components
export const ArtHover = engine.defineComponent('artHover', { visible: Schemas.Boolean })
export const VonsArt = engine.defineComponent('vonsart', { visible: Schemas.Boolean })
export const Cube = engine.defineComponent('cube-id', {
  artTitle: Schemas.String,
  artDescription: Schemas.String
})

// Create Building
export function createBuilding() {
  const building = engine.addEntity()
  Transform.create(building, {
    position: Vector3.create(-16, 0, 0),
    rotation: Quaternion.fromEulerDegrees(0, 180, 0)
  })

  GltfContainer.create(building, {
    src: 'models/rapture-new4.glb'
  })

  MeshCollider.create(building, {
    collisionMask: ColliderLayer.CL_PHYSICS | ColliderLayer.CL_POINTER
  })
}

// Base Scene Entity
export const sceneParent = engine.addEntity()
Transform.create(sceneParent, {
  position: Vector3.create(-13, 38.75, 32),
  scale: Vector3.create(1.5, 1.5, 1.5),
  rotation: Quaternion.fromEulerDegrees(0, 90, 0)
})

export const aspectRatio = 9 / 16
export const videoSource = 'https://player.vimeo.com/external/905949518.m3u8?s=6c752565cae32acc3b1699149645a354daf67212&logging=false'

const mosaic = engine.addEntity()
const sideScreenLeft = engine.addEntity()
const sideScreenRight = engine.addEntity()

let roofScreensVisible = false
let roofScreensInstanced = false

// Video texture
const videoTexture = Material.Texture.Video({
  videoPlayerEntity: mosaic,
  wrapMode: TextureWrapMode.TWM_REPEAT
})

// Switch to video material
export function switchScreenMaterial() {
  Material.setPbrMaterial(mosaic, {
    texture: videoTexture,
    roughness: 1,
    specularIntensity: 0,
    metallic: 0,
    emissiveTexture: videoTexture,
    emissiveColor: Color4.White(),
    emissiveIntensity: 5
  })

  VideoPlayer.createOrReplace(mosaic, {
    src: videoSource,
    playing: true,
    volume: 1,
    loop: false
  })
}

// Toggle roof screens
export function toggleRoofScreens() {
  if (!roofScreensInstanced) {
    createRoofScreens()
    roofScreensVisible = true
  } else if (roofScreensInstanced && roofScreensVisible) {
    // turnOffRoofScreens()
    roofScreensVisible = false
  } else if (roofScreensInstanced && !roofScreensVisible) {
    // turnOnRoofScreens()
    roofScreensVisible = true
  }
}

// Create rooftop screens
export function createRoofScreens() {
  roofScreensInstanced = true

  // Mosaic setup
  VideoPlayer.createOrReplace(mosaic, {
    src: videoSource,
    playing: true,
    volume: 1,
    loop: true
  })

  Material.setPbrMaterial(mosaic, {
    texture: videoTexture,
    roughness: 1,
    specularIntensity: 0,
    metallic: 0,
    emissiveTexture: videoTexture,
    emissiveColor: Color4.White(),
    emissiveIntensity: 1
  })

  Transform.createOrReplace(mosaic, {
    position: Vector3.Zero(),
    scale: Vector3.create(9, 5, 3),
    rotation: Quaternion.fromEulerDegrees(0, 180, 0),
    parent: sceneParent
  })

  MeshRenderer.setPlane(mosaic)
  MeshCollider.create(mosaic, {
    collisionMask: ColliderLayer.CL_POINTER | ColliderLayer.CL_PHYSICS
  })

// Enable pointer interaction on the entity
PointerEvents.create(mosaic, {
  pointerEvents: [
    {
      eventType: PointerEventType.PET_DOWN,
      eventInfo: {
        button: InputAction.IA_POINTER,
        hoverText: 'Play/Pause',
        maxDistance: 10
      }
    }
  ]
})

// Register the callback
pointerEventsSystem.onPointerDown(mosaic, () => {
  const mutable = VideoPlayer.getMutable(mosaic)
  mutable.playing = !mutable.playing
})

  // Side screen left
  createScreen(sideScreenLeft, Vector3.create(6.9, 0.7, -1.6), Vector3.create(5, 3, 3), Quaternion.fromEulerDegrees(0, 180, -90))

  // Side screen right
  createScreen(sideScreenRight, Vector3.create(-6.9, 0.7, -1.6), Vector3.create(5, 3, 5), Quaternion.fromEulerDegrees(0, 180, 90))
}

function createScreen(entity: Entity, pos: Vector3, scale: Vector3, rot: Quaternion) {
  VideoPlayer.createOrReplace(entity, {
    src: videoSource,
    playing: true,
    volume: 1,
    loop: true
  })

  Material.setPbrMaterial(entity, {
    texture: videoTexture,
    roughness: 1,
    specularIntensity: 0,
    metallic: 0,
    emissiveTexture: videoTexture,
    emissiveColor: Color4.White(),
    emissiveIntensity: 1
  })

  Transform.createOrReplace(entity, {
    position: pos,
    scale: scale,
    rotation: rot,
    parent: sceneParent
  })

  MeshRenderer.setPlane(entity)
  MeshCollider.create(entity, {
    collisionMask: ColliderLayer.CL_POINTER | ColliderLayer.CL_PHYSICS
  })

// Enable pointer interaction on the entity
PointerEvents.create(entity, {
  pointerEvents: [
    {
      eventType: PointerEventType.PET_DOWN,
      eventInfo: {
        button: InputAction.IA_POINTER,
        hoverText: 'Play/Pause',
        maxDistance: 10
      }
    }
  ]
})

// Register the callback
pointerEventsSystem.onPointerDown(entity, () => {
  const mutable = VideoPlayer.getMutable(entity)
  mutable.playing = !mutable.playing
})
}

// Turn off screens
export function turnOffRoofScreens() {
  VideoPlayer.deleteFrom(mosaic)
  // Optionally delete side screens too
  // VideoPlayer.deleteFrom(sideScreenLeft)
  // VideoPlayer.deleteFrom(sideScreenRight)
}

// Turn on screens again
export function turnOnRoofScreens() {
  VideoPlayer.createOrReplace(mosaic, {
    src: videoSource,
    playing: true,
    volume: 1,
    loop: true
  })

  VideoPlayer.createOrReplace(sideScreenLeft, {
    src: videoSource,
    playing: true,
    volume: 1,
    loop: true
  })

  VideoPlayer.createOrReplace(sideScreenRight, {
    src: videoSource,
    playing: true,
    volume: 1,
    loop: true
  })
}

// Format time utility
export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
