import { engine, Transform, MeshRenderer, MeshCollider, Material, VideoPlayer, InputAction, pointerEventsSystem, Entity } from '@dcl/sdk/ecs';
import * as utils from '@dcl-sdk/utils';
import { openExternalUrl } from '~system/RestrictedActions';
import { Quaternion, Color3, Color4, Vector3 } from '@dcl/sdk/math';
import { artImage14, artImage15, artImage21, artImage22, artImage23, artImage24, artImage25, artImage26, artImage27, artImage32, artImage37, artImage39, artImage40, artImage41, artImage5, artLink14, artLink15, artLink21, artLink22, artLink23, artLink24, artLink25, artLink26, artLink27, artLink32, artLink37, artLink5, artPos14, artPos15, artPos21, artPos22, artPos23, artPos24, artPos25, artPos26, artPos27, artPos32, artPos37, artPos39, artPos40, artPos41, artPos5, artRot14, artRot15, artRot21, artRot22, artRot23, artRot24, artRot25, artRot26, artRot27, artRot32, artRot37, artRot39, artRot40, artRot41, artRot5, artScale14, artScale15, artScale21, artScale22, artScale23, artScale24, artScale25, artScale26, artScale27, artScale32, artScale37, artScale39, artScale40, artScale41, artScale5, artTriggerPos14, artTriggerPos15, artTriggerPos21, artTriggerPos22, artTriggerPos23, artTriggerPos24, artTriggerPos25, artTriggerPos26, artTriggerPos27, artTriggerPos32, artTriggerPos37, artTriggerPos39, artTriggerPos40, artTriggerPos41, artTriggerPos5, artTriggerScale14, artTriggerScale15, artTriggerScale21, artTriggerScale22, artTriggerScale23, artTriggerScale24, artTriggerScale25, artTriggerScale26, artTriggerScale27, artTriggerScale32, artTriggerScale37, artTriggerScale39, artTriggerScale40, artTriggerScale41, artTriggerScale5, artVideo14, artVideo15, artVideo21, artVideo22, artVideo23, artVideo24, artVideo25, artVideo26, artVideo27, artVideo32, artVideo37, artVideo39, artVideo40, artVideo41, artVideo5, rooftopImage, rooftopUrl, rooftopVideo } from './artData';
import { isParty } from '../config';
import { createStream, stopStream, toggleStream } from '../playlist';

let videoPlayer: any = null;

export type VideoData = {
  room: number
  id: number
  position: Vector3,
  rotation: Vector3,
  scale: Vector3,
  image: string,
  video: string,
  hoverText: string,
  website: string,
  triggerScale: Vector3,
  triggerPosition: Vector3,
  audio: boolean,
}


export const videoCollection: VideoData[] = [
  //synth poem
  {
    room: 1,
    id: 5,
    position: artPos5,
    rotation: artRot5,
    scale: artScale5,
    image: artImage5,
    video: artVideo5,
    hoverText: 'Click',
    website: artLink5,
    triggerScale: artTriggerScale5,
    triggerPosition: artTriggerPos5,
    audio: true,
  },
 //idle hands
 {
  room: 2,
  id: 27,
  position: artPos27,
  rotation: artRot27,
  scale: artScale27,
  image: artImage27,
  video: artVideo27,
  hoverText: 'Click',
  website: artLink27,
  triggerScale: artTriggerScale27,
  triggerPosition: artTriggerPos27,
  audio: true,
},
//yawanawa
{
  room: 2,
  id: 25,
  position: artPos25,
  rotation: artRot25,
  scale: artScale25,
  image: artImage25,  
  video: artVideo25,
  hoverText: 'Click',
  website: artLink25,
  triggerScale: artTriggerScale25,
  triggerPosition: artTriggerPos25,
  audio: true,
},
//blackout
{
  room: 2,
  id: 26,
  position: artPos26,
  rotation: artRot26,
  scale: artScale26,
  image: artImage26,
  video: artVideo26,
  hoverText: 'Click',
  website: artLink26,
  triggerScale: artTriggerScale26,
  triggerPosition: artTriggerPos26,
  audio: true,
},
//Raindrops
{
  room: 1,
  id: 21,
  position: artPos21,
  rotation: artRot21,
  scale: artScale21,
  image: artImage21,
  video: artVideo21,
  hoverText: 'Click',
  website: artLink21,
  triggerScale: artTriggerScale21,
  triggerPosition: artTriggerPos21,
  audio: true,
},
//Harvest
{
  room: 1,
  id: 15,
  position: artPos15,
  rotation: artRot15,
  scale: artScale15,
  image: artImage15,
  video: artVideo15,
  hoverText: 'Click',
  website: artLink15,
  triggerScale: artTriggerScale15,
  triggerPosition: artTriggerPos15,
  audio: false,
},
//radial rotational study
{
  room: 1,
  id: 14,
  position: artPos14,
  rotation: artRot14,
  scale: artScale14,
  image: artImage14,
  video: artVideo14,
  hoverText: 'Click',
  website: artLink14,
  triggerScale: artTriggerScale14,
  triggerPosition: artTriggerPos14,
  audio: false,
},
//xcopy eye
{
  room: 1,
  id: 22,
  position: artPos22,
  rotation: artRot22,
  scale: artScale22,
  image: artImage22,
  video: artVideo22,
  hoverText: 'Click',
  website: artLink22,
  triggerScale: artTriggerScale22,
  triggerPosition: artTriggerPos22,
  audio: false,
},
//xcopy overlord
{
  room: 1,
  id: 23,
  position: artPos23,
  rotation: artRot23,
  scale: artScale23,
  image: artImage23,
  video: artVideo23,
  hoverText: 'Click',
  website: artLink23,
  triggerScale: artTriggerScale23,
  triggerPosition: artTriggerPos23,
  audio: false,
},
//watercolor
{
  room: 1,
  id: 24,
  position: artPos24,
  rotation: artRot24,
  scale: artScale24,
  image: artImage24,
  video: artVideo24,
  hoverText: 'Click',
  website: artLink24,
  triggerScale: artTriggerScale24,
  triggerPosition: artTriggerPos24,
  audio: false,
},
//beeple
{
  room: 3,
  id: 32,
  position: artPos32,
  rotation: artRot32,
  scale: artScale32,
  image: artImage32,
  video: artVideo32,
  hoverText: 'Click',
  website: artLink32,
  triggerScale: artTriggerScale32,
  triggerPosition: artTriggerPos32,
  audio: false,
},
// last selfie 
{
  room: 3,
  id: 37,
  position: artPos37,
  rotation: artRot37,
  scale: artScale37,
  image: artImage37,
  video: artVideo37,
  hoverText: 'Click',
  website: artLink37,
  triggerScale: artTriggerScale37,
  triggerPosition: artTriggerPos37,
  audio: false,
}
]

// Conditionally add default roof screens if isParty is false
if (!isParty) {
  videoCollection.push(
    {
      room: 4,
      id: 39,
      position: artPos39,
      rotation: artRot39,
      scale: artScale39,
      image: rooftopImage,
      video: rooftopVideo,
      hoverText: 'Play / Pause',
      website: rooftopUrl,
      triggerScale: artTriggerScale39,
      triggerPosition: artTriggerPos39,
      audio: false,
    },
    {
      room: 4,
      id: 41,
      position: artPos41,
      rotation: artRot41,
      scale: artScale41,
      image: rooftopImage,
      video: rooftopVideo,
      hoverText: 'Play / Pause',
      website: rooftopUrl,
      triggerScale: artTriggerScale41,
      triggerPosition: artTriggerPos41,
      audio: false,
    },
    {
      room: 4,
      id: 40,
      position: artPos40,
      rotation: artRot40,
      scale: artScale40,
      image: rooftopImage,
      video: rooftopVideo,
      hoverText: 'Play / Pause',
      website: rooftopUrl,
      triggerScale: artTriggerScale40,
      triggerPosition: artTriggerPos40,
      audio: false,
    },
  
  );
}



export async function createVideoArt(
  position: Vector3,
  rotation: Vector3,
  scale: Vector3,
  image: string,
  video: string,
  hoverText: string,
  website: string,
  triggerScale: Vector3,
  triggerPosition: Vector3,
  audio: boolean,
) {

  const entity = engine.addEntity();
  MeshRenderer.setPlane(entity);
  MeshCollider.setPlane(entity);

  let isImage = true;

  Transform.createOrReplace(entity, {
    position: position,
    rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z),
    scale: scale,

  });



  const imageMaterial = Material.Texture.Common({ src: image });
  Material.setPbrMaterial(entity, {
    texture: imageMaterial,
    roughness: 1,
    specularIntensity: 0,
    metallic: 0,
    emissiveColor: Color3.White(),
    emissiveIntensity: 1,
    emissiveTexture: imageMaterial,
  });

  
   VideoPlayer.create(entity, {
      src: video,
      playing: false,
      loop: true,
    });


  pointerEventsSystem.onPointerDown(
    {
      entity: entity,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: hoverText,
      },
    },
    function () {
      console.log('clicked artwork');
      VideoPlayer.getMutableOrNull(entity)
      
      VideoPlayer.getMutable(entity).playing = !VideoPlayer.getMutable(entity).playing
      openExternalUrl({
        url: website,
      });
    }
  );




  const artTrigger = utils.addTestCube(
    {
      position: triggerPosition,
      scale: triggerScale,
    },
    undefined,
    undefined,
    Color4.create(1, 1, 1, 0),
    undefined,
    true
  );
  utils.triggers.addTrigger(
    artTrigger,
    utils.NO_LAYERS,
    utils.LAYER_1,
    [
      {
        type: 'box',
        scale: triggerScale,
      },
    ],
    function (otherEntity) {
      if (otherEntity) {
        // Toggle between image and video
        const videoTexture = Material.Texture.Video({ videoPlayerEntity: entity });
        if (isImage) {
          VideoPlayer.createOrReplace(entity, {
            src: video,
            playing: true,
            loop: true,
          });
          Material.deleteFrom(entity);
          Material.setPbrMaterial(entity, {
            texture: videoTexture,
            roughness: 1,
            specularIntensity: 0,
            metallic: 0,
            emissiveColor: Color3.White(),
            emissiveIntensity: 1,
            emissiveTexture: videoTexture,
          });
         
          isImage = false;
          if (audio) {
            stopStream(); // Toggle audio play state
          }
        }
      }
    },
    function (onExit) {
      if (onExit) {
        if (!isImage) {
          Material.deleteFrom(entity);
          VideoPlayer.deleteFrom(entity);
          let mat = Material.Texture.Common({
            src: image,
          });
          Material.setPbrMaterial(entity, {
            texture: Material.Texture.Common({
              src: image,
            }),
            roughness: 1,
            specularIntensity: 0,
            metallic: 0,
            emissiveColor: Color3.White(),
            emissiveIntensity: 1,
            emissiveTexture: mat,
          });
          isImage = true;
          if (audio === true) {
            createStream(); // Toggle audio play state
          }
        }
      }
      //utils.triggers.enableDebugDraw(true)
    }

  );



  return entity;

}

export function removeVideos(entity: Entity) {
  if (entity != null) {

    engine.removeEntity(entity)
  }
}