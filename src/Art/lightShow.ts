import { Animator, GltfContainer, Transform, engine } from "@dcl/sdk/ecs"
import { Quaternion, Vector3 } from "@dcl/sdk/math"


const spiralLight = 'models/party-assets/espiralAzul.glb'
const spiralClip1 = 'espiral1'
const spiralClip2 = 'espiral2'
const spiralClip3 = 'espiral3'


const lightEntity = engine.addEntity()
const lightEntity2 = engine.addEntity()

export function showSpiral() {
    Transform.create(lightEntity, {
        position: Vector3.create(8.24, 35.16, 32.16),
        rotation: Quaternion.fromEulerDegrees(0, 90, 0),
        scale: Vector3.create(.25, .25, .25)

    })
    GltfContainer.create(lightEntity, {
        src: spiralLight
    })
    Animator.create(lightEntity, {
        states: [
            {
                clip: spiralClip1,
                playing: true,
                loop: true
            },
            {
                clip: spiralClip2,
                playing: false,
                loop: true
            },
            {
                clip: spiralClip3,
                playing: false,
                loop: true
            }
        ]
    })

}