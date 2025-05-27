import {
  movePlayerTo,
  triggerEmote,
  triggerSceneEmote
} from '~system/RestrictedActions';
import {
  engine,
  Transform,
  pointerEventsSystem,
  InputAction,
  Entity,
  PointerEvents,
  PointerEventType,
  MeshCollider,
  GltfContainer,
  ColliderLayer,
  MeshRenderer
} from '@dcl/sdk/ecs';
import { Quaternion, Vector3 } from '@dcl/sdk/math';

const sitLoop = 'emotes/SitFancyLoop.glb';

const emoterConfigs = {
  rapture: [
    { position: Vector3.create(7.3, 1.2, 23), rotation: Quaternion.fromEulerDegrees(0, 90, 0), cameraTarget: Vector3.create(-32, -30, 5), scale: Vector3.create(4, 0.35, 1.5) },
    { position: Vector3.create(7.3, 1.2, 42), rotation: Quaternion.fromEulerDegrees(0, 90, 0), cameraTarget: Vector3.create(-32, -30, 5), scale: Vector3.create(4, 0.35, 1.5) },
    { position: Vector3.create(-6.9, 1.2, 23), rotation: Quaternion.fromEulerDegrees(0, 90, 0), cameraTarget: Vector3.create(32, -30, 5), scale: Vector3.create(4, 0.35, 1.5) },
    { position: Vector3.create(-6.9, 1.2, 42), rotation: Quaternion.fromEulerDegrees(0, 90, 0), cameraTarget: Vector3.create(32, -30, 5), scale: Vector3.create(4, 0.35, 1.5) }
  ],
  rooftop: [
  { position: Vector3.create(-6.5, 35, 7.65), rotation: Quaternion.fromEulerDegrees(0, 90, 0), cameraTarget: Vector3.create(-32, -30, 5), scale: Vector3.create(4, 0.5, 1) },
  { position: Vector3.create(-6.5, 35, 15.5), rotation: Quaternion.fromEulerDegrees(0, 90, 0), cameraTarget: Vector3.create(-32, -30, 5), scale: Vector3.create(4, 0.5, 1) },
  { position: Vector3.create(-6.5, 35, 48.3), rotation: Quaternion.fromEulerDegrees(0, 90, 0), cameraTarget: Vector3.create(-302, -30, 5), scale: Vector3.create(4, 0.5, 1) },
  { position: Vector3.create(-6.5, 35, 56.1), rotation: Quaternion.fromEulerDegrees(0, 90, 0), cameraTarget: Vector3.create(-310, -30, -106), scale: Vector3.create(4, 0.5, 1) },
  { position: Vector3.create(6.5, 35, 10.95), rotation: Quaternion.fromEulerDegrees(0, 90, 0), cameraTarget: Vector3.create(1200, -30, 9), scale: Vector3.create(4, 0.5, 1) },
  { position: Vector3.create(6.5, 35, 53), rotation: Quaternion.fromEulerDegrees(0, 90, 0), cameraTarget: Vector3.create(1200, -30, 9), scale: Vector3.create(4, 0.5, 1) },
  { position: Vector3.create(-9, 35, 5.75), rotation: Quaternion.fromEulerDegrees(0, 0, 0), cameraTarget: Vector3.create(-90, -30, 180), scale: Vector3.create(4, 0.5, 1) },
  { position: Vector3.create(-9, 35, 13.5), rotation: Quaternion.fromEulerDegrees(0, 0, 0), cameraTarget: Vector3.create(-90, -30, 180), scale: Vector3.create(4, 0.5, 1) },
  { position: Vector3.create(-9, 35, 46.35), rotation: Quaternion.fromEulerDegrees(0, 0, 0), cameraTarget: Vector3.create(-90, -30, 180), scale: Vector3.create(4, 0.5, 1) },
  { position: Vector3.create(-9, 35, 54.2), rotation: Quaternion.fromEulerDegrees(0, 0, 0), cameraTarget: Vector3.create(-90, -30, 180), scale: Vector3.create(4, 0.5, 1) },
  { position: Vector3.create(9, 35, 51), rotation: Quaternion.fromEulerDegrees(0, 0, 0), cameraTarget: Vector3.create(-90, -30, 180), scale: Vector3.create(4, 0.5, 1) },
  { position: Vector3.create(8.9, 35, 9), rotation: Quaternion.fromEulerDegrees(0, 0, 0), cameraTarget: Vector3.create(-90, -30, 180), scale: Vector3.create(4, 0.5, 1) },
  { position: Vector3.create(8.9, 35, 13), rotation: Quaternion.fromEulerDegrees(0, 0, 0), cameraTarget: Vector3.create(90, -30, -180), scale: Vector3.create(4, 0.5, 1) },
  { position: Vector3.create(8.9, 35, 55), rotation: Quaternion.fromEulerDegrees(0, 0, 0), cameraTarget: Vector3.create(90, -30, -180), scale: Vector3.create(4, 0.5, 1) },
  { position: Vector3.create(-8.9, 35, 58.1), rotation: Quaternion.fromEulerDegrees(0, 0, 0), cameraTarget: Vector3.create(90, -30, -180), scale: Vector3.create(4, 0.5, 1) },
  { position: Vector3.create(-8.9, 35, 50.2), rotation: Quaternion.fromEulerDegrees(0, 0, 0), cameraTarget: Vector3.create(90, -30, -180), scale: Vector3.create(4, 0.5, 1) },
  { position: Vector3.create(-8.9, 35, 17.5), rotation: Quaternion.fromEulerDegrees(0, 0, 0), cameraTarget: Vector3.create(90, -30, -180), scale: Vector3.create(4, 0.5, 1) },
  { position: Vector3.create(-8.9, 35, 9.6), rotation: Quaternion.fromEulerDegrees(0, 0, 0), cameraTarget: Vector3.create(90, -30, -180), scale: Vector3.create(4, 0.5, 1) }
  ],
  vons: [
    { position: Vector3.create(-8.5, 20, 36.9), rotation: Quaternion.fromEulerDegrees(0, 180, 0), cameraTarget: Vector3.create(-8, 28, 47), scale: Vector3.create(2.5, 0.5, 1) },
    { position: Vector3.create(-12.5, 20, 38), rotation: Quaternion.fromEulerDegrees(0, 15, 0), cameraTarget: Vector3.create(-3, 28, 47), scale: Vector3.create(1, 0.5, 1) },
    { position: Vector3.create(7.61, 20, 36.9), rotation: Quaternion.fromEulerDegrees(0, 180, 0), cameraTarget: Vector3.create(8, 28, 47), scale: Vector3.create(2.5, 0.5, 1) },
    { position: Vector3.create(11.62, 20, 36.9), rotation: Quaternion.fromEulerDegrees(0, 160, 0), cameraTarget: Vector3.create(3, 28, 47), scale: Vector3.create(1, 0.5, 1) },
    { position: Vector3.create(11, 20, 42.2), rotation: Quaternion.fromEulerDegrees(0, 125, 0), cameraTarget: Vector3.create(-32, 28, 5), scale: Vector3.create(1, 0.5, 1) },
    { position: Vector3.create(-1.75, 20, 46.5), rotation: Quaternion.fromEulerDegrees(0, 15, 0), cameraTarget: Vector3.create(0, 21, 48), scale: Vector3.create(1, 0.5, 1) },
    { position: Vector3.create(1.75, 20, 47), rotation: Quaternion.fromEulerDegrees(0, 15, 0), cameraTarget: Vector3.create(0, 21, 48), scale: Vector3.create(1, 0.5, 1) },
    { position: Vector3.create(-1.75, 20, 49.5), rotation: Quaternion.fromEulerDegrees(0, 15, 0), cameraTarget: Vector3.create(0, 21, 48), scale: Vector3.create(1, 0.5, 1) },
    { position: Vector3.create(1.75, 20, 49.5), rotation: Quaternion.fromEulerDegrees(0, 15, 0), cameraTarget: Vector3.create(0, 21, 48), scale: Vector3.create(1, 0.5, 1) }

  ]
};

const emoterCollections: Record<string, Entity[]> = {
  rapture: [],
  rooftop: [],
  vons: []
};

export function createEmoter(config: {
  position: Vector3
  rotation: Quaternion
  scale: Vector3
  cameraTarget: Vector3
}, sitDuration: number): Entity {
  const emoter = engine.addEntity()

  Transform.createOrReplace(emoter, {
    position: config.position,
    rotation: config.rotation,
    scale: config.scale
  })

  // Set only CL_POINTER for interaction collider
  MeshCollider.setBox(emoter, [ColliderLayer.CL_PHYSICS, ColliderLayer.CL_POINTER])
 // MeshRenderer.setBox(emoter)


pointerEventsSystem.onPointerDown(
  {
    entity: emoter,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Sit',
      maxDistance: 6
    }
  },
  () => {
    const player = engine.PlayerEntity

    movePlayerTo({
      newRelativePosition: Vector3.add(config.position, Vector3.create(0, 0.1, 0)),
      cameraTarget: config.cameraTarget
    })

    triggerSceneEmote({ src: sitLoop, loop: true })
  }
)


  return emoter
}



export type EmoterType = keyof typeof emoterConfigs;

export function addEmoters(type: EmoterType): void {
  const configs = emoterConfigs[type];
  const collection = emoterCollections[type];
  configs.forEach(config => {
    const emoter = createEmoter(config, 8000);
    collection.push(emoter);
  });
}

export function removeEmoters(type: EmoterType): void {
  const collection = emoterCollections[type];
  collection.forEach(emoter => engine.removeEntity(emoter));
  collection.length = 0;
}

export function toggleEmoters(type: EmoterType): void {
  if (emoterCollections[type].length === 0) {
    addEmoters(type);
  } else {
    removeEmoters(type);
  }
}

export function toggleRaptureEmoters() {
  toggleEmoters('rapture');
}

export function toggleRooftopEmoters() {
  toggleEmoters('rooftop');
}

export function toggleVonsEmoters() {
  toggleEmoters('vons');
}
