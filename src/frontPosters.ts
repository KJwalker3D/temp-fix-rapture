import { engine, MeshRenderer, Transform, Material } from "@dcl/sdk/ecs";
import { Vector3, Quaternion, Color4 } from "@dcl/sdk/math";
import { sceneParent } from "./components";


const frontScreenLeft = engine.addEntity();
const frontScreenRight = engine.addEntity();
let frontScreensVisible = true;
let frontScreensInstanced = true;
const poster = 'https://bafkreib2v56py6d6obf2x35oviiw2fvomojszplmk6wxao3fzkfgg66vba.ipfs.nftstorage.link/'
//const posterGrandOpening = 'https://bafkreihkuxqjzixdqpojsgck6s76mhjcajfqaeuvc4hh3tujr5efz3hqfa.ipfs.nftstorage.link/'
// const gucciPoster = 'https://bafkreiaaz54z55k3jh6csucc3zxmvmmsnu3r4ow2x3h4b736dzux5bfbee.ipfs.nftstorage.link/'

const gucciPoster = 'https://bafkreib2v56py6d6obf2x35oviiw2fvomojszplmk6wxao3fzkfgg66vba.ipfs.nftstorage.link/'



export function createFrontScreens() {
    
    MeshRenderer.setPlane(frontScreenLeft);
    
    Transform.createOrReplace(frontScreenLeft, {
    position: Vector3.create(12.345, -19.25, 18.01),
    scale: Vector3.create(4.15, 7.5, 4),
    rotation: Quaternion.fromEulerDegrees(0, 180, 0),
    parent: sceneParent
    });
    
    
    
    Material.setPbrMaterial(frontScreenLeft, {
    texture: Material.Texture.Common({
      src: poster
    }),
    roughness: 1, 
    specularIntensity: 0,
    metallic: 0,
    
    emissiveTexture: Material.Texture.Common({
      src: poster
    }),
    emissiveColor: Color4.White(),
    emissiveIntensity: 1,
    })


    
    MeshRenderer.setPlane(frontScreenRight);
    
    Transform.createOrReplace(frontScreenRight, {
    position: Vector3.create(-12.355, -19.25, 18.01),
    scale: Vector3.create(4.15, 7.5, 4),
    rotation: Quaternion.fromEulerDegrees(0, 180, 0),
    parent: sceneParent
    });
    
    Material.setPbrMaterial(frontScreenRight, {
    texture: Material.Texture.Common({
      src: gucciPoster
    }),
    roughness: 1, 
    specularIntensity: 0,
    metallic: 0,
    emissiveTexture: Material.Texture.Common({
      src: gucciPoster
    }),
    emissiveColor: Color4.White(),
    emissiveIntensity: 1,
    })
    frontScreensVisible = true
    
    }
    
    export function turnOffFrontScreens() {
    engine.removeEntity(frontScreenLeft)
    
    engine.removeEntity(frontScreenRight)
    frontScreensVisible = false
    }

    export function toggleFrontScreens() {
        if (!frontScreensVisible) {
          createFrontScreens()
        }
        else if (frontScreensVisible) {
        turnOffFrontScreens()
        }
        }