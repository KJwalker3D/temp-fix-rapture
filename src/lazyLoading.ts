import { Vector3, Quaternion } from '@dcl/sdk/math'
import { Entity, Transform, engine } from '@dcl/sdk/ecs'
import * as utils from '@dcl-sdk/utils'
import { createVideoArt, videoCollection } from './Art/videoArt'
import { createImageArt, imageArtCollection } from './Art/imageArt'
import { createKineticArt, kineticArtCollection } from './Art/kineticArt'
import { addBartenderManager, addDanceManager, removeBartenderNpcs, removeDanceNpcs, spawnNPCsBasedOnRoom } from './npcs'
import { createStream, stopStream, toggleStream } from './playlist'
import { toggleFrontScreens } from './frontPosters'
import { createDJ, removeDJ } from './dj'
import { isParty } from './config'


export let scene1active = true

export async function createLazyArea(position: Vector3, scale: Vector3, parentPos: Entity, id: number,) {
  const entity = engine.addEntity()

  Transform.create(entity, {
    position: position,
    scale: scale,
    parent: parentPos
  })


  const box = engine.addEntity()
  Transform.create(box, { parent: parentPos, scale: scale })


  let createdVideos: Entity[] = []

  let createdImages: Entity[] = []

  let createdKinetic: Entity[] = []

   utils.triggers.addTrigger(
    box,
    utils.LAYER_2,
    utils.LAYER_1,
    [{
      type: 'box',
      position: position,
      scale: scale
    }],
    async () => {
      if (scene1active) {
        console.log(`ACTIVE`)
        console.log(`ENTERED ` + id)

        createdVideos = []
        createdImages = []
        createdKinetic = []

        spawnNPCsBasedOnRoom(id);

        for (const video of videoCollection) {
          if (video.room === id) {
            const videoArt = await createVideoArt(video.position, video.rotation, video.scale, video.image, video.video, video.hoverText, video.website, video.triggerScale, video.triggerPosition, video.audio)
            createdVideos.push(videoArt)
          }
        }
  
        for (const imageArt of imageArtCollection) {
          if (imageArt.room === id) {
            const image = createImageArt(imageArt.position, imageArt.rotation, imageArt.scale, imageArt.image, imageArt.hoverText, imageArt.url, imageArt.hasAlpha)
            createdImages.push(image)
          }
        }
        for (const kineticArt of kineticArtCollection) {
          if (kineticArt.room === id) {
            const kinetic = createKineticArt(kineticArt.position, kineticArt.rotation, kineticArt.scale, kineticArt.modelPath, kineticArt.hoverText)
            createdKinetic.push(kinetic)
          }
        }
   
        if (id === 1) {
          toggleFrontScreens()
        }
        if (id === 3) {
          addBartenderManager()
        } if (id === 4 && !isParty) {
          await toggleStream()
          console.log('enter roof no party')
          addDanceManager()
          createDJ()
        } else if (id === 4 && isParty) {
          stopStream()
          addDanceManager()
          createDJ()
          console.log('enter roof party')

        }

      }
    },
    () => {
      console.log('LEFT')

      removeBartenderNpcs()
      removeDanceNpcs()

      for (const videoArt of createdVideos) {
        engine.removeEntity(videoArt)
      }
      for (const image of createdImages) {
        engine.removeEntity(image)
      }
      for (const kinetic of createdKinetic) {
        engine.removeEntity(kinetic)
      }
   
      if (id === 1) {
        toggleFrontScreens()
      }
      if (id === 4 && !isParty) {
        toggleStream()
        removeDJ()
        console.log('exit roof no party')
      } else if (id === 4 && isParty) {
        createStream()
        removeDJ()
        console.log('exit roof yes party')
      }

      createdVideos = []
      createdImages = []
      createdKinetic = []
    }
  )
  //utils.triggers.enableDebugDraw(true)

  return entity
}



export function createAllLazyAreas() {

  const lazyAreaRapture = engine.addEntity()
  Transform.create(lazyAreaRapture, {
    position: Vector3.One(),
    scale: Vector3.One(),
  })

  const lazyAreaHope = engine.addEntity()
  Transform.create(lazyAreaHope, {
    position: Vector3.One(),
    scale: Vector3.One(),
  })


  const lazyAreaVons = engine.addEntity()
  Transform.create(lazyAreaVons, {
    position: Vector3.One(),
    scale: Vector3.One(),
  })

  const lazyAreaRoof = engine.addEntity()
  Transform.create(lazyAreaRoof, {
    position: Vector3.One(),
    scale: Vector3.One(),
  })


  createLazyArea(Vector3.create(-1, 45, 32), Vector3.create(32, 20, 60), lazyAreaRoof, 4)
  createLazyArea(Vector3.create(-1, 24, 48.75), Vector3.create(32, 10, 27.7), lazyAreaVons, 3)
  createLazyArea(Vector3.create(-1, 24, 17), Vector3.create(31, 10, 32), lazyAreaHope, 2)
  createLazyArea(Vector3.create(-1, 5, 32), Vector3.create(32, 22, 60), lazyAreaRapture, 1)

}