import { triggerSceneEmote } from '~system/RestrictedActions'
import { engine, Transform, MeshCollider, MeshRenderer, pointerEventsSystem, InputAction, ColliderLayer, Entity } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { CameraMode, CameraModeArea, CameraType } from '@dcl/sdk/ecs';
import { movePlayerTo } from '~system/RestrictedActions'
import * as utils from '@dcl-sdk/utils'



//first eprson cam value Vector3.create(8, 1, 23)
const firstPersonCam = engine.addEntity();
const thirdPersonCam = engine.addEntity();
const camera = engine.CameraEntity

let isThirdPerson= true
let hasInteracted = false

function checkCameraMode() {
  if (!engine.CameraEntity || !Transform.has(engine.CameraEntity)) return;

  const cameraEntity = CameraMode.get(engine.CameraEntity);

  isThirdPerson = cameraEntity.mode === CameraType.CT_THIRD_PERSON;
}

engine.addSystem(checkCameraMode);

export function toggleCamera() {
  isThirdPerson = !isThirdPerson;
  const playerPos = Transform.getMutable(engine.PlayerEntity).position;
  const targetCamera = isThirdPerson ? CameraType.CT_THIRD_PERSON : CameraType.CT_FIRST_PERSON;
  const rotationAngle = isThirdPerson ? 180 : 0;

  adjustRotation(engine.CameraEntity, playerPos, targetCamera, rotationAngle);
}

function adjustRotation(targetEntity: Entity, targetPosition: Vector3, cameraType: CameraType, rotationAngle: number) {
  Transform.createOrReplace(targetEntity, {
    position: targetPosition,
    rotation: Quaternion.fromEulerDegrees(0, rotationAngle, 0)
  });

  CameraMode.createOrReplace(targetEntity, {
    mode: cameraType,
  });
}

function switchCameraType(targetEntity: Entity, targetPosition: Vector3, cameraType: CameraType, rotationAngle: number) {
  // Additional logic for transitioning between camera types
  adjustRotation(targetEntity, targetPosition, cameraType, rotationAngle);
}



const vonsEmoters: Entity[] = [];
const raptureEmoters: Entity[] = [];
const rooftopEmoters: Entity[] = [];

export function addSofaEmoter(
  position: Vector3,
  rotation: Quaternion,
  cameraTarget: Vector3,
  scale: Vector3 = Vector3.One(), // Default scale if not provided
  sitEmote: string,
  sitLoopEmote: string,
  sitDuration: number,
  emoterArray: Entity[]
) {
  const emoter = engine.addEntity();
  Transform.createOrReplace(emoter, {
    position: position,
    scale: scale,
    rotation: rotation,
  });
  //MeshRenderer.setBox(emoter);
  MeshCollider.setBox(emoter);
  pointerEventsSystem.onPointerDown(
    {
      entity: emoter,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: 'Sit',
        maxDistance: 6,
      },
    },
    () => {
      const player = engine.PlayerEntity;
      const playerPos = Transform.getMutable(player).position;
      checkCameraMode()
      if (!isThirdPerson) {
        toggleCamera()
      }
      switchCameraType(thirdPersonCam, playerPos, CameraType.CT_THIRD_PERSON, 180);
      movePlayerTo({
        newRelativePosition: playerPos,
        cameraTarget: cameraTarget,
      });
      triggerSceneEmote({ src: sitEmote, loop: false });
      console.log('triggered emote');
      utils.timers.setTimeout(() => {
        triggerSceneEmote({
          src: sitLoopEmote,
          loop: true,
        });
      }, sitDuration);
    }
  );
  console.log('added emoter');
  emoterArray.push(emoter);
  return emoter;
}

export function removeSofaEmoters(emoterArray: Entity[]) {
  for (const emoter of emoterArray) {
    engine.removeEntity(emoter);
  }
  emoterArray.length = 0;
  console.log('removed emoters');
}


export function addVonsEmoters() {
  const sitLoop = 'emotes/SitFancyLoop.glb';
  const sitFancy = 'emotes/Sit-fancy.glb';

  //NE
  const vNE = addSofaEmoter(
    Vector3.create(9.75, 19.7, 47.5),
    Quaternion.fromEulerDegrees(0, 25, 0),
    Vector3.create(-9.5, -30, -47.8),
    Vector3.create(2.2, 1, 0.7),
    sitFancy,
    sitLoop,
    8000,
    vonsEmoters
  );

    //SE
    const vSE = addSofaEmoter(
      Vector3.create(9.75, 19.7, 41),
      Quaternion.fromEulerDegrees(0, -25, 0),
      Vector3.create(9.5, -30, 70.8),
      Vector3.create(2.2, 1, 0.7),
      sitFancy,
      sitLoop,
      8000,
      vonsEmoters
    );

      //NW
      const vNW = addSofaEmoter(
      Vector3.create(-12, 19.7, 58.25),
      Quaternion.fromEulerDegrees(0, -25, 0),
      Vector3.create(-9.5, -30, -47.8),
      Vector3.create(2.2, 1, 0.7),
      sitFancy,
      sitLoop,
      8000,
      vonsEmoters
  );

      //facing NW sofa
      const vNWW = addSofaEmoter(
        Vector3.create(-12, 19.7, 51.5),
        Quaternion.fromEulerDegrees(0, 25, 0),
        Vector3.create(9.5, -30, 160.8),
        Vector3.create(2.2, 1, 0.7),
        sitFancy,
        sitLoop,
        8000,
        vonsEmoters
    );

     //facing SW sofa
     const vSWW = addSofaEmoter(
      Vector3.create(-11.75, 19.7, 46.75),
      Quaternion.fromEulerDegrees(0, -30, 0),
      Vector3.create(-9.5, -30, -160.8),
      Vector3.create(2.2, 1, 0.7),
      sitFancy,
      sitLoop,
      8000,
      vonsEmoters
  );

       //SW sofa
       const vSW = addSofaEmoter(
        Vector3.create(-12, 19.7, 39.75),
        Quaternion.fromEulerDegrees(0, 30, 0),
        Vector3.create(9.5, -30, 160.8),
        Vector3.create(2.2, 1, 0.7),
        sitFancy,
        sitLoop,
        8000,
        vonsEmoters
    );
    vonsEmoters.push()
}

export function toggleVonsEmoters(): void {
  if (vonsEmoters.length === 0) {
    // Add Vons emoters if not already added
    addVonsEmoters();
  } else {
    // Remove Vons emoters if already added
     
      removeSofaEmoters(vonsEmoters);
    
  }
}

export function addRaptureEmoters() {

  const sitEmote = 'emotes/Sit.glb';
  const sitLoop = 'emotes/Sit-loop.glb';

  //NW
  const sofaNW = addSofaEmoter(
    Vector3.create(7.3, 1.2, 23),
    Quaternion.fromEulerDegrees(0, 90, 0),
    Vector3.create(-32, -30, 5),
    Vector3.create(4, 0.5, 1.5),
    sitEmote,
    sitLoop,
    900,
    raptureEmoters
  );


  //SW
  const sofaSW = addSofaEmoter(
    Vector3.create(7.3, 1.2, 42),
    Quaternion.fromEulerDegrees(0, 90, 0),
    Vector3.create(-32, -30, 5),
    Vector3.create(4, 0.5, 1.5),
    sitEmote,
    sitLoop,
    900,
    raptureEmoters
  );


  //NE
  const sofaNE = addSofaEmoter(
    Vector3.create(-6.9, 1.2, 23),
    Quaternion.fromEulerDegrees(0, 90, 0),
    Vector3.create(32, -30, 5),
    Vector3.create(4, 0.5, 1.2),
    sitEmote,
    sitLoop,
    900,
    raptureEmoters
  );


   //SE
   const sofaSE = addSofaEmoter(
    Vector3.create(-6.9, 1.2, 42),
    Quaternion.fromEulerDegrees(0, 90, 0),
    Vector3.create(32, -30, 5),
    Vector3.create(4, 0.5, 1.2),
    sitEmote,
    sitLoop,
    900,
    raptureEmoters
  );
  raptureEmoters.push()
  
}

export function toggleRaptureEmoters(): void {
  if (raptureEmoters.length === 0) {
    // Add Rapture emoters if not already added
    addRaptureEmoters();
  } else {
    // Remove Rapture emoters if already added
    
      removeSofaEmoters(raptureEmoters);
   
  }
}

export function addRooftopEmoters() {

  const sitEmote = 'emotes/Sit.glb';
  const sitFancy = 'emotes/Sit-fancy.glb';
  const sitLoop = 'emotes/Sit-loop.glb';

  //SW
  const rSW = addSofaEmoter(
    Vector3.create(-6.5, 34.8, 7.65),
    Quaternion.fromEulerDegrees(0, 90, 0),
    Vector3.create(-32, -30, 5),
    Vector3.create(4, 0.5, 1),
    sitEmote,
    sitLoop,
    1000,
    rooftopEmoters
  );

   //SW
   const rSWW = addSofaEmoter(
    Vector3.create(-6.5, 34.8, 15.5),
    Quaternion.fromEulerDegrees(0, 90, 0),
    Vector3.create(-32, -30, 5),
    Vector3.create(4, 0.5, 1),
    sitEmote,
    sitLoop,
    1000,
    rooftopEmoters
  );

     //SW
     const rSWWW = addSofaEmoter(
      Vector3.create(-6.5, 34.8, 48.3),
      Quaternion.fromEulerDegrees(0, 90, 0),
      Vector3.create(-302, -30, 5),
      Vector3.create(4, 0.5, 1),
      sitEmote,
      sitLoop,
      1000,
      rooftopEmoters
    );


     //SW
     const rSWWWW = addSofaEmoter(
      Vector3.create(-6.5, 34.8, 56.1),
      Quaternion.fromEulerDegrees(0, 90, 0),
      Vector3.create(-310, -30, -106),
      Vector3.create(4, 0.5, 1),
      sitEmote,
      sitLoop,
      1000,
      rooftopEmoters
    );

      //SW
      const rSWWWWW = addSofaEmoter(
    Vector3.create(6.5, 34.8, 10.95),
    Quaternion.fromEulerDegrees(0, 90, 0),
    Vector3.create(1200, -30, 9),
    Vector3.create(4, 0.5, 1),
    sitEmote,
    sitLoop,
    1000,
    rooftopEmoters
     );


       //SW
       const rSWWWWWW = addSofaEmoter(
        Vector3.create(6.5, 34.8, 53),
        Quaternion.fromEulerDegrees(0, 90, 0),
        Vector3.create(1200, -30, 9),
        Vector3.create(4, 0.5, 1),
        sitEmote,
        sitLoop,
        1000,
        rooftopEmoters
      );


        //SW
        const rSWWWWWWW =addSofaEmoter(
    Vector3.create(-9, 34.8, 5.75),
    Quaternion.fromEulerDegrees(0, 0, 0),
    Vector3.create(-90, -30, 180),
    Vector3.create(4, 0.5, 1),
    sitEmote,
    sitLoop,
    1000,
    rooftopEmoters
  );


  const rSWWWWWWWW = addSofaEmoter(
    Vector3.create(-9, 34.8, 13.5),
    Quaternion.fromEulerDegrees(0, 0, 0),
    Vector3.create(-90, -30, 180),
    Vector3.create(4, 0.5, 1),
    sitEmote,
    sitLoop,
    1000,
    rooftopEmoters
  );

  const rSWWWWWWWWW =addSofaEmoter(
    Vector3.create(-9, 34.8, 46.35),
    Quaternion.fromEulerDegrees(0, 0, 0),
    Vector3.create(-90, -30, 180),
    Vector3.create(4, 0.5, 1),
    sitEmote,
    sitLoop,
    1000,
    rooftopEmoters
  );


  const rSWWWWWWWWWW = addSofaEmoter(
    Vector3.create(-9, 34.8, 54.2),
    Quaternion.fromEulerDegrees(0, 0, 0),
    Vector3.create(-90, -30, 180),
    Vector3.create(4, 0.5, 1),
    sitEmote,
    sitLoop,
    1000,
    rooftopEmoters
  );

  const rSWWWWWWWWWWW = addSofaEmoter(
    Vector3.create(9, 34.8, 51),
    Quaternion.fromEulerDegrees(0, 0, 0),
    Vector3.create(-90, -30, 180),
    Vector3.create(4, 0.5, 1),
    sitEmote,
    sitLoop,
    1000,
    rooftopEmoters
  );

  const rSWWWWWWWWWWWW = addSofaEmoter(
    Vector3.create(8.9, 34.8, 9),
    Quaternion.fromEulerDegrees(0, 0, 0),
    Vector3.create(-90, -30, 180),
    Vector3.create(4, 0.5, 1),
    sitEmote,
    sitLoop,
    1000,
    rooftopEmoters
  );

  const rSWWWWWWWWWWWWW = addSofaEmoter(
    Vector3.create(8.9, 34.8, 13),
    Quaternion.fromEulerDegrees(0, 0, 0),
    Vector3.create(90, -30, -180),
    Vector3.create(4, 0.5, 1),
    sitEmote,
    sitLoop,
    1000,
    rooftopEmoters
  );

  const rSWWWWWWWWWWWWWW = addSofaEmoter(
    Vector3.create(8.9, 34.8, 55),
    Quaternion.fromEulerDegrees(0, 0, 0),
    Vector3.create(90, -30, -180),
    Vector3.create(4, 0.5, 1),
    sitEmote,
    sitLoop,
    1000,
    rooftopEmoters
  );

  const rSWWWWWWWWWWWWWWW = addSofaEmoter(
    Vector3.create(-8.9, 34.8, 58.1),
    Quaternion.fromEulerDegrees(0, 0, 0),
    Vector3.create(90, -30, -180),
    Vector3.create(4, 0.5, 1),
    sitEmote,
    sitLoop,
    1000,
    rooftopEmoters
  );

  const rSWWWWWWWWWWWWWWWW = addSofaEmoter(
    Vector3.create(-8.9, 34.8, 50.2),
    Quaternion.fromEulerDegrees(0, 0, 0),
    Vector3.create(90, -30, -180),
    Vector3.create(4, 0.5, 1),
    sitEmote,
    sitLoop,
    1000,
    rooftopEmoters
  );

  const rSWWWWWWWWWWWWWWWWW = addSofaEmoter(
    Vector3.create(-8.9, 34.8, 17.5),
    Quaternion.fromEulerDegrees(0, 0, 0),
    Vector3.create(90, -30, -180),
    Vector3.create(4, 0.5, 1),
    sitEmote,
    sitLoop,
    1000,
    rooftopEmoters
  );

  const rSWWWWWWWWWWWWWWWWWWW = addSofaEmoter(
    Vector3.create(-8.9, 34.8, 9.6),
    Quaternion.fromEulerDegrees(0, 0, 0),
    Vector3.create(90, -30, -180),
    Vector3.create(4, 0.5, 1),
    sitEmote,
    sitLoop,
    1000,
    rooftopEmoters
  );
 // rooftopEmoters.push()
}

export function toggleRooftopEmoters(): void {
  if (rooftopEmoters.length === 0) {
    // Add rooftop emoters if not already added
    addRooftopEmoters();
  } else {
    // Remove rooftop emoters if already added
    for (const emoter of rooftopEmoters) {
      removeSofaEmoters(rooftopEmoters);
    }
  }
}
