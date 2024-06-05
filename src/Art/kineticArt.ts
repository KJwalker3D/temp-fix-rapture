import { Quaternion, Vector3 } from "@dcl/sdk/math";
import { Animator, engine, Transform, GltfContainer, ColliderLayer, pointerEventsSystem, InputAction, TransformType } from "@dcl/sdk/ecs";
import * as utils from '@dcl-sdk/utils';
import { openExternalUrl } from "~system/RestrictedActions";
import { artLink38, artModel38, artPos38, artRot38, artScale38, artTitle38 } from "./artData";

// Paths to 3D models and animation names


export type KineticData = {
    room: number
    id: number
    position: Vector3,
    rotation: Vector3,
    scale: Vector3,
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
    },
]



export function createKineticArt(
    position: Vector3,
    rotation: Vector3,
    scale: Vector3,
    modelPath: string,
    hoverText: string
) {

    let entity = engine.addEntity();
    Transform.create(entity, {
        position: position,
        rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z),
        scale: scale
    })

    Animator.create(entity, {
        states: [ 
            {
                clip: 'default',
                playing: true,
                speed: 0.5,
                loop: true
            }
       ]}
    )

    GltfContainer.create(entity, {
        src: modelPath,
        invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
        visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
    })

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
          //  let start = artScale38
          //  let end = Vector3.create(artScale38.x * 1.3, artScale38.y * 1.3, artScale38.z * 1.3,)
            openExternalUrl({
                url: artLink38
            })
           // utils.tweens.startScaling(entity, start, end, 10)
          //  utils.timers.setTimeout(() => {
           //     utils.tweens.startScaling(entity, end, start, 10)
           // }, 20000
           // )
        }
    );
   
    return entity
}

