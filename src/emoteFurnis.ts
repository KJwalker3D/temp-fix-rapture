import { movePlayerTo, triggerEmote, triggerSceneEmote } from '~system/RestrictedActions';
import { engine, Transform, MeshCollider, pointerEventsSystem, InputAction, Entity, MeshRenderer } from '@dcl/sdk/ecs';
import { Quaternion, Vector3 } from '@dcl/sdk/math';
import * as utils from '@dcl-sdk/utils';

// Emoter configs
const emoterConfigs = {
  vons: [
    { position: Vector3.create(10, 19.7, 36.64), rotation: Quaternion.fromEulerDegrees(0, 0, 0), cameraTarget: Vector3.create(-9.5, -30, -47.8), scale: Vector3.create(2.2, 1, 1) },
    { position: Vector3.create(7, 19.75, 39.644), rotation: Quaternion.fromEulerDegrees(0, 90, 0), cameraTarget: Vector3.create(9.5, -30, 70.8), scale: Vector3.create(1, 1, 0.7) },

    { position: Vector3.create(10, 19.7, 59.655), rotation: Quaternion.fromEulerDegrees(0, 0, 0), cameraTarget: Vector3.create(-9.5, -30, -47.8), scale: Vector3.create(2.2, 1, 1) },
    { position: Vector3.create(9, 19.75, 56.837), rotation: Quaternion.fromEulerDegrees(0, 45, 0), cameraTarget: Vector3.create(9.5, -30, 70.8), scale: Vector3.create(1, 1, 0.7) },

    { position: Vector3.create(-11, 19.7, 59.655), 
      rotation: Quaternion.fromEulerDegrees(0, 0, 0), cameraTarget: Vector3.create(-9.5, -30, -47.8), scale: Vector3.create(2.2, 1, 1) },
    { position: Vector3.create(-9, 19.75, 56.82), 
      rotation: Quaternion.fromEulerDegrees(0, 125, 0), cameraTarget: Vector3.create(9.5, -30, 160.8), scale: Vector3.create(1, 1, 0.7) },
   
    { position: Vector3.create(-10.5, 19.7, 36.64), 
      rotation: Quaternion.fromEulerDegrees(0, 0, 0), cameraTarget: Vector3.create(-9.5, -30, -160.8), scale: Vector3.create(2.2, 1, 1) },
    { position: Vector3.create(-7, 19.75, 39.644), 
      rotation: Quaternion.fromEulerDegrees(0, 90, 0), cameraTarget: Vector3.create(9.5, -30, 160.8), scale: Vector3.create(1, 1, 0.7) },

  ],
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
    //{ position: Vector3.create(-9, 34.8, 5.75), rotation: Quaternion.fromEulerDegrees(0, 0, 0), cameraTarget: Vector3.create(-90, -30, 180), },
    { position: Vector3.create(-9, 35, 13.5), rotation: Quaternion.fromEulerDegrees(0, 0, 0), cameraTarget: Vector3.create(-90, -30, 180), scale: Vector3.create(4, 0.5, 1) },
    { position: Vector3.create(-9, 35, 46.35), rotation: Quaternion.fromEulerDegrees(0, 0, 0), cameraTarget: Vector3.create(-90, -30, 180), scale: Vector3.create(4, 0.5, 1) },
    { position: Vector3.create(-9, 35, 54.2), rotation: Quaternion.fromEulerDegrees(0, 0, 0), cameraTarget: Vector3.create(-90, -30, 180), scale: Vector3.create(4, 0.5, 1) },
    { position: Vector3.create(9, 35, 51), rotation: Quaternion.fromEulerDegrees(0, 0, 0), cameraTarget: Vector3.create(-90, -30, 180), scale: Vector3.create(4, 0.5, 1) },
    //{ position: Vector3.create(8.9, 34.8, 9), rotation: Quaternion.fromEulerDegrees(0, 0, 0), cameraTarget: Vector3.create(-90, -30, 180) },
    { position: Vector3.create(8.9, 35, 13), rotation: Quaternion.fromEulerDegrees(0, 0, 0), cameraTarget: Vector3.create(90, -30, -180), scale: Vector3.create(4, 0.5, 1) },
    { position: Vector3.create(8.9, 35, 55), rotation: Quaternion.fromEulerDegrees(0, 0, 0), cameraTarget: Vector3.create(90, -30, -180), scale: Vector3.create(4, 0.5, 1) },
    { position: Vector3.create(-8.9, 35, 58.1), rotation: Quaternion.fromEulerDegrees(0, 0, 0), cameraTarget: Vector3.create(90, -30, -180), scale: Vector3.create(4, 0.5, 1) },
    { position: Vector3.create(-8.9, 35, 50.2), rotation: Quaternion.fromEulerDegrees(0, 0, 0), cameraTarget: Vector3.create(90, -30, -180), scale: Vector3.create(4, 0.5, 1) },
    { position: Vector3.create(-8.9, 35, 17.5), rotation: Quaternion.fromEulerDegrees(0, 0, 0), cameraTarget: Vector3.create(90, -30, -180), scale: Vector3.create(4, 0.5, 1) },
    { position: Vector3.create(-8.9, 35, 9.6), rotation: Quaternion.fromEulerDegrees(0, 0, 0), cameraTarget: Vector3.create(90, -30, -180), scale: Vector3.create(4, 0.5, 1) }

  ],
};

const emoterCollections: Record<string, Entity[]> = {
  vons: [],
  rapture: [],
  rooftop: [],
};


// Emotes
//const sitEmote = 'emotes/Sit.glb';
const sitLoop = 'emotes/SitFancyLoop.glb';
//const sitFancy = 'emotes/Sit-fancy.glb';


function createEmoter(config: { position: Vector3, rotation: Quaternion, scale: Vector3, cameraTarget: Vector3 }, sitDuration: number): Entity {
  const emoter = engine.addEntity();
  Transform.createOrReplace(emoter, {
    position: config.position,
    rotation: config.rotation,
    scale: config.scale,
  });
  //debug:
  //MeshRenderer.setBox(emoter)
  MeshCollider.setBox(emoter);

 // const player = engine.PlayerEntity;

  function onPointerDown() {
    const player = engine.PlayerEntity;
    const playerTransform = Transform.getMutable(player);
    const initialPosition = Vector3.clone(playerTransform.position);

    console.log("Triggering emote on player:", player);

   // triggerEmote({ predefinedEmote: "dab" }); // Test with a predefined emote

    movePlayerTo({
        newRelativePosition: playerTransform.position,
        cameraTarget: config.cameraTarget,
    });

    triggerSceneEmote({ src: sitLoop, loop: true });
    

    const distanceCheckInterval = utils.timers.setInterval(() => {
        const distance = Vector3.distance(initialPosition, playerTransform.position);
        if (distance > 0.15) {
            console.log("Player moved, stopping emote");
            triggerEmote({ predefinedEmote: "wave" }); // Change emote to something visible
           // utils.timers.clearTimeout(sitTimer);
            utils.timers.clearInterval(distanceCheckInterval);
        }
    }, 500);
}


  pointerEventsSystem.onPointerDown({
    entity: emoter,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: 'Sit',
      maxDistance: 6,
    },
  }, onPointerDown);

  return emoter;
}

type EmoterType = keyof typeof emoterConfigs;

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

export function toggleVonsEmoters() {
  //toggleEmoters('vons');
  // add these back in once furni location is approved
}

export function toggleRaptureEmoters() {
  toggleEmoters('rapture');
}

export function toggleRooftopEmoters() {
  toggleEmoters('rooftop');
}


