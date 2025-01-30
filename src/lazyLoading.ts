import { Vector3, Quaternion } from '@dcl/sdk/math';
import { Entity, Transform, engine } from '@dcl/sdk/ecs';
import * as utils from '@dcl-sdk/utils';
import { createVideoArt, videoCollection } from './Art/videoArt';
import { createImageArt, imageArtCollection } from './Art/imageArt';
import { createKineticArt, kineticArtCollection } from './Art/kineticArt';
import {
  addBartenderManager,
  addDanceManager,
  addGalleryManager_1,
  addGalleryManager_2,
  addSitManager,
  startNpcDance,
  removeBartenderNpcs,
  removeDanceNpcs,
  removeGalleryNpcs_1,
  removeGalleryNpcs_2,
  removeSitNpcs,
  spawnNPCsBasedOnRoom,
  removeNPCsFromRoom,
  npcArrays
} from './npcs'
import { createStream, stopStream, toggleStream } from './playlist';
import { createFrontScreens, toggleFrontScreens, turnOffFrontScreens } from './frontPosters';
import { createDJ, removeDJ } from './dj';
import { isParty } from './config';
import { addEmoters, toggleEmoters, removeEmoters } from './emoteFurnis';


//let frontScreensActive = true;
let scene1active = true;

// Placeholder



export async function createLazyArea(
  position: Vector3,
  scale: Vector3,
  parentEntity: Entity,
  id: number
): Promise<Entity> {
  console.log(`Creating Lazy Area for ID: ${id}`);

  const areaEntity = engine.addEntity();
  Transform.create(areaEntity, { position, scale, parent: parentEntity });

  const boxEntity = engine.addEntity();
  Transform.create(boxEntity, { position, scale, parent: parentEntity });

  let createdVideos: Entity[] = [];
  let createdImages: Entity[] = [];
  let createdKinetics: Entity[] = [];

  console.log(`Adding trigger for Lazy Area ID: ${id}`);

  utils.triggers.addTrigger(
    boxEntity,
    utils.LAYER_2,
    utils.LAYER_1,
    [{ type: 'box', position, scale }],
    async () => {
      console.log(`Player entered Lazy Area ID: ${id}`);
      if (!scene1active) return;

      clearArtEntities(createdVideos, createdImages, createdKinetics);

      //spawnNPCsBasedOnRoom(id);
      await loadArtForRoom(id, createdVideos, createdImages, createdKinetics);

      if (id === 1) handleArea1Entry();
      if (id === 3) handleArea3Entry();
      if (id === 4) await handleRoofEntry();
    },
    () => {
      console.log(`Player left Lazy Area ID: ${id}`);
      handleAreaExit(id, createdVideos, createdImages, createdKinetics);
    }
  );

  return areaEntity;
}

async function loadArtForRoom(
  id: number,
  createdVideos: Entity[],
  createdImages: Entity[],
  createdKinetics: Entity[]
): Promise<void> {
  console.log(`Loading art for room ID: ${id}`);

  for (const video of videoCollection.filter((v) => v.room === id)) {
    console.log(`Loading video art for room ID: ${id}`);
    const videoArt: Entity = await createVideoArt(
      video.position,
      video.rotation,
      video.scale,
      video.image,
      video.video,
      video.hoverText,
      video.website,
      video.triggerScale,
      video.triggerPosition,
      video.audio
    );
    createdVideos.push(videoArt);
  }

  for (const imageArt of imageArtCollection.filter((i) => i.room === id)) {
    console.log(`Loading image art for room ID: ${id}`);
    const image: Entity = createImageArt(
      imageArt.position,
      imageArt.rotation,
      imageArt.scale,
      imageArt.image,
      imageArt.hoverText,
      imageArt.url,
      imageArt.hasAlpha
    );
    createdImages.push(image);
  }

  for (const kineticArt of kineticArtCollection.filter((k) => k.room === id)) {
    console.log(`Loading kinetic art for room ID: ${id}`);
    const kinetic: Entity = createKineticArt(
      kineticArt.position,
      kineticArt.rotation,
      kineticArt.scale,
      kineticArt.modelPath,
      kineticArt.hoverText
    );
    createdKinetics.push(kinetic);
  }
}

function clearArtEntities(videos: Entity[], images: Entity[], kinetics: Entity[]): void {
  [...videos, ...images, ...kinetics].forEach((entity) => engine.removeEntity(entity));
  videos.length = images.length = kinetics.length = 0;
}

function handleArea1Entry(): void {
 // if (frontScreensActive) turnOffFrontScreens();
  addGalleryManager_1();
  addEmoters('rapture');
}


function handleArea3Entry(): void {
 // if (frontScreensActive) turnOffFrontScreens();
  addGalleryManager_2();
  addEmoters('vons');
}

async function handleRoofEntry(): Promise<void> {
 // if (frontScreensActive) turnOffFrontScreens();

  // Clean up rooftop NPCs and reset states
  console.log('Removing existing rooftop NPCs...');
  removeDanceNpcs();
  removeSitNpcs();
  removeEmoters('rooftop');

  // Add new NPCs and managers
  addDanceManager(); // Adds dancers to npcArrays[1]
  addSitManager();
  createDJ();
  addEmoters('rooftop'); // Add rooftop emoters

  // Delay to ensure NPC initialization
  await new Promise<void>((resolve) => {
      utils.timers.setTimeout(() => {
          resolve();
      }, 1000);
  });

  // Debug: Log npcArrays[1] before restarting animations
  console.log('Rooftop dancers after reentry:', npcArrays[1]);

  // Restart dance animations for rooftop dancers
  if (npcArrays[1] && npcArrays[1].length > 0) {
      console.log('Restarting dance animations for rooftop dancers...');
      startNpcDance(npcArrays[1]);
  } else {
      console.log('No rooftop dancers found in npcArrays[1].');
  }

  // Handle party mode
  if (isParty) {
      console.log('Entering Roof (Party Mode)');
      stopStream();
  } else {
      console.log('Entering Roof (Non-Party Mode)');
      await toggleStream();
  }
}



function handleAreaExit(id: number, videos: Entity[], images: Entity[], kinetics: Entity[]): void {
  clearArtEntities(videos, images, kinetics);

  if (id === 4) {
      toggleStream();
      removeDJ();
      console.log(`Exiting Roof (ID: ${id})`);
      removeSitNpcs();
      removeDanceNpcs(); // Ensure dancers are removed when exiting the roof
      removeEmoters('rooftop');
  } else if (id === 1) {
      removeGalleryNpcs_1();
      toggleEmoters('rapture');
      //createFrontScreens();
  } else if (id === 3) {
      toggleEmoters('vons');
      removeGalleryNpcs_2();
      //createFrontScreens();
  } else {
    console.log(`Default case: Recreating front screens`);
     // createFrontScreens();
  }
}


export function createAllLazyAreas(): void {
  console.log("created lazy areas")
  const lazyAreas = [
    { id: 4, position: Vector3.create(-0.5, 17.5, 15.5), scale: Vector3.create(31.5, 10, 64) },
    { id: 3, position: Vector3.create(-0.5, 11.5, 24), scale: Vector3.create(32, 13, 27.7) },
    { id: 2, position: Vector3.create(-0.5, 11.5, 8.75), scale: Vector3.create(31, 13, 32) },
    { id: 1, position: Vector3.create(-0.5, 3, 16), scale: Vector3.create(32, 18, 60) },
  ];

  lazyAreas.forEach((area) => {
    const parentEntity = engine.addEntity();
    Transform.create(parentEntity, { position: Vector3.One(), scale: Vector3.One() });
    createLazyArea(area.position, area.scale, parentEntity, area.id);
  });
}

//utils.triggers.enableDebugDraw(true);
