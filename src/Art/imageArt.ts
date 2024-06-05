import { InputAction, Material, MeshCollider, MeshRenderer, Transform, engine, pointerEventsSystem } from "@dcl/sdk/ecs";
import { Color3, Quaternion, Vector3 } from "@dcl/sdk/math";
import { openExternalUrl } from "~system/RestrictedActions";
import { artImage1, artImage10, artImage11, artImage12, artImage13, artImage16, artImage17, artImage18, artImage19, artImage2, artImage20, artImage28, artImage29, artImage3, artImage30, artImage31, artImage33, artImage34, artImage35, artImage36, artImage4, artImage6, artImage7, artImage8, artImage9, artLink1, artLink10, artLink11, artLink12, artLink13, artLink16, artLink17, artLink18, artLink19, artLink2, artLink20, artLink28, artLink29, artLink3, artLink30, artLink31, artLink33, artLink34, artLink35, artLink36, artLink4, artLink6, artLink7, artLink8, artLink9, artPos1, artPos10, artPos11, artPos12, artPos13, artPos16, artPos17, artPos18, artPos19, artPos2, artPos20, artPos28, artPos29, artPos3, artPos30, artPos31, artPos33, artPos34, artPos35, artPos36, artPos4, artPos6, artPos7, artPos8, artPos9, artRot1, artRot10, artRot11, artRot12, artRot13, artRot16, artRot17, artRot18, artRot19, artRot2, artRot20, artRot28, artRot29, artRot3, artRot30, artRot31, artRot33, artRot34, artRot35, artRot36, artRot4, artRot6, artRot7, artRot8, artRot9, artScale1, artScale10, artScale11, artScale12, artScale13, artScale16, artScale17, artScale18, artScale19, artScale2, artScale20, artScale28, artScale29, artScale3, artScale30, artScale31, artScale33, artScale34, artScale35, artScale36, artScale4, artScale6, artScale7, artScale8, artScale9 } from "./artData";
import { ArtHover } from "../components";

// For static images that aren't loaded in as NFTs
// Use server hosted images or paths to files in your project folder
export let logoImage = 'https://bafkreih4ndg6qpczqw2ardbrrdoj23t43hiegbceo36hbi3vjqskcoi4yu.ipfs.nftstorage.link/'



export type ImageData = {
  room: number,
  id: number,
  position: Vector3,
  rotation: Vector3,
  scale: Vector3
  image: string,
  hoverText: string,
  url: string,
  hasAlpha: boolean
}

export const imageArtCollection: ImageData[] = [
    // math art
  {
    room: 1,
    id: 1,
    position: artPos1,
    rotation: artRot1,
    scale: artScale1,
    image: artImage1,
    hoverText: 'Click',
    url: artLink1,
    hasAlpha: false
  },
  // autoglyph 372
  {
    room: 1,
    id: 2,
    position: artPos2,
    rotation: artRot2,
    scale: artScale2,
    image: artImage2,
    hoverText: 'Click',
    url: artLink2,
    hasAlpha: false
  },
  //autoglyph 444
  {
    room: 1,
    id: 3,
    position: artPos3,
    rotation: artRot3,
    scale: artScale3,
    image: artImage3,
    hoverText: 'Click',
    url: artLink3,
    hasAlpha: false
  },
  //light years 14 dmitri
  {
    room: 1,
    id: 4,
    position: artPos4,
    rotation: artRot4,
    scale: artScale4,
    image: artImage4,
    hoverText: 'Click',
    url: artLink4,
    hasAlpha: false
  },
  //fidenza 917
  {
    room: 1,
    id: 6,
    position: artPos6,
    rotation: artRot6,
    scale: artScale6,
    image: artImage6,
    hoverText: 'Click',
    url: artLink6,
    hasAlpha: false
  },
//fidenza 142
  {
    room: 1,
    id: 7,
    position: artPos7,
    rotation: artRot7,
    scale: artScale7,
    image: artImage7,
    hoverText: 'Click',
    url: artLink7,
    hasAlpha: false
  },
  //fidenza 198
  {
    room: 1,
    id: 8,
    position: artPos8,
    rotation: artRot8,
    scale: artScale8,
    image: artImage8,
    hoverText: 'Click',
    url: artLink8,
    hasAlpha: false
  },
  //qql 296
  {
    room: 1,
    id: 9,
    position: artPos9,
    rotation: artRot9,
    scale: artScale9,
    image: artImage9,
    hoverText: 'Click',
    url: artLink9,
    hasAlpha: false
  },
//garden monolith
  {
    room: 1,
    id: 10,
    position: artPos10,
    rotation: artRot10,
    scale: artScale10,
    image: artImage10,
    hoverText: 'Click',
    url: artLink10,
    hasAlpha: false
  },
  //anticyclone wmapan
  {
    room: 1,
    id: 11,
    position: artPos11,
    rotation: artRot11,
    scale: artScale11,
    image: artImage11,
    hoverText: 'Click',
    url: artLink11,
    hasAlpha: false
  },
  //meridian 728
  {
    room: 1,
    id: 12,
    position: artPos12,
    rotation: artRot12,
    scale: artScale12,
    image: artImage12,
    hoverText: 'Click',
    url: artLink12,
    hasAlpha: false
  },
//tectonics mpkoz
  {
    room: 1,
    id: 13,
    position: artPos13,
    rotation: artRot13,
    scale: artScale13,
    image: artImage13,
    hoverText: 'Click',
    url: artLink13,
    hasAlpha: false
  },
  //off script emily xie
  {
    room: 1,
    id: 16,
    position: artPos16,
    rotation: artRot16,
    scale: artScale16,
    image: artImage16,
    hoverText: 'Click',
    url: artLink16,
    hasAlpha: false
  },
  //metropolis 563
  {
    room: 1,
    id: 17,
    position: artPos17,
    rotation: artRot17,
    scale: artScale17,
    image: artImage17,
    hoverText: 'Click',
    url: artLink17,
    hasAlpha: false
  },
//metropolis 23
  {
    room: 1,
    id: 18,
    position: artPos18,
    rotation: artRot18,
    scale: artScale18,
    image: artImage18,
    hoverText: 'Click',
    url: artLink18,
    hasAlpha: false
  },
  //rings 586 dmittri che
  {
    room: 1,
    id: 19,
    position: artPos19,
    rotation: artRot19,
    scale: artScale19,
    image: artImage19,
    hoverText: 'Click',
    url: artLink19,
    hasAlpha: false
  },
//themes and variations
  {
    room: 1,
    id: 20,
    position: artPos20,
    rotation: artRot20,
    scale: artScale20,
    image: artImage20,
    hoverText: 'Click',
    url: artLink20,
    hasAlpha: false
  },
  //life in west america
  {
    room: 2,
    id: 28,
    position: artPos28,
    rotation: artRot28,
    scale: artScale28,
    image: artImage28,
    hoverText: 'Click',
    url: artLink28,
    hasAlpha: false
  },
//two daughters
  {
    room: 2,
    id: 29,
    position: artPos29,
    rotation: artRot29,
    scale: artScale29,
    image: artImage29,
    hoverText: 'Click',
    url: artLink29,
    hasAlpha: false
  },
  //minnesang
  {
    room: 2,
    id: 30,
    position: artPos30,
    rotation: artRot30,
    scale: artScale30,
    image: artImage30,
    hoverText: 'Click',
    url: artLink30,
    hasAlpha: false
  },
  // lost robbie
  {
    room: 2,
    id: 31,
    position: artPos31,
    rotation: artRot31,
    scale: artScale31,
    image: artImage31,
    hoverText: 'Click',
    url: artLink31,
    hasAlpha: false
  },
  //punk 1111
  {
    room: 3,
    id: 33,
    position: artPos33,
    rotation: artRot33,
    scale: artScale33,
    image: artImage33,
    hoverText: 'Click',
    url: artLink33,
    hasAlpha: false
  },
  //punk 3060
  {
    room: 3,
    id: 34,
    position: artPos34,
    rotation: artRot34,
    scale: artScale34,
    image: artImage34,
    hoverText: 'Click',
    url: artLink34,
    hasAlpha: false
  },
  //punk 3321
  {
    room: 3,
    id: 35,
    position: artPos35,
    rotation: artRot35,
    scale: artScale35,
    image: artImage35,
    hoverText: 'Click',
    url: artLink35,
    hasAlpha: false
  },
  //flyswatter
  {
    room: 3,
    id: 36,
    position: artPos36,
    rotation: artRot36,
    scale: artScale36,
    image: artImage36,
    hoverText: 'Click',
    url: artLink36,
    hasAlpha: false
  },

]


export function createImageArt(
  position: Vector3,
  rotation: Vector3,
  scale: Vector3,
  image: string, // can be path to image file or url to hosted image
  hoverText: string,
  url: string,
  hasAlpha: boolean
) {

  let entity = engine.addEntity()
  Transform.create(entity, {
    position: position,
    rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z),
    scale: scale
  })
  MeshRenderer.setPlane(entity)
  MeshCollider.setPlane(entity)

  pointerEventsSystem.onPointerDown(
    {
      entity: entity,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: hoverText,
        maxDistance: 16
      }
    },
    function () {
      openExternalUrl({
        url: url
      })
    }
  )

  const imageMaterial = Material.Texture.Common({ src: image });


  if (!hasAlpha) {

    Material.setPbrMaterial(entity, {
      texture: imageMaterial,
      roughness: 1,
      specularIntensity: 0,
      metallic: 0,
      emissiveColor: Color3.White(),
      emissiveIntensity: 0.5,
      emissiveTexture: imageMaterial,
    })
  }

  else if (hasAlpha) {

    Material.setPbrMaterial(entity, {
      texture: imageMaterial,
      roughness: 1,
      specularIntensity: 0,
      metallic: 0,
      transparencyMode: 1,
      alphaTexture: imageMaterial,
      alphaTest: 0.5,
      emissiveColor: Color3.White(),
      emissiveIntensity: 1,
      emissiveTexture: imageMaterial,

    })
  }

  return entity
}