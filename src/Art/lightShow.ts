import { Animator, Entity, GltfContainer, Transform, engine } from "@dcl/sdk/ecs"
import { Quaternion, Vector3 } from "@dcl/sdk/math"
import * as utils from '@dcl-sdk/utils'

const spiralLight = 'models/party-assets/espiralAzul.glb'
const spiralClip1 = 'espiral1'
const spiralClip2 = 'espiral2'
const spiralClip3 = 'espiral3'

const lightEntity: Entity = engine.addEntity()
const lightEntity2: Entity = engine.addEntity()

let lightStartTime: number | null = null
const LIGHT_ON_DURATION = 5 * 60 * 1000 // 5 minutes in milliseconds

let isLightOn: boolean = false

function showSpiral() {
    if (!isLightOn) {

        Transform.create(lightEntity, {
            position: Vector3.create(8.24, 35.16, 32.16),
            rotation: Quaternion.fromEulerDegrees(0, 90, 0),
            scale: Vector3.create(.25, .25, .25)
        })
        Transform.create(lightEntity2, {
            position: Vector3.create(-9.53, 35.28, 32),
            rotation: Quaternion.fromEulerDegrees(0, -90, 0),
            scale: Vector3.create(.25, .25, .25)
        })
        GltfContainer.create(lightEntity, {
            src: spiralLight
        })
    
        GltfContainer.create(lightEntity2, {
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
    
        Animator.create(lightEntity2, {
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

        isLightOn = true

    }
}

function hideSpiral() {
    if (isLightOn) {
        GltfContainer.deleteFrom(lightEntity)
        Animator.deleteFrom(lightEntity)
        Transform.deleteFrom(lightEntity)

        GltfContainer.deleteFrom(lightEntity2)
        Animator.deleteFrom(lightEntity2)
        Transform.deleteFrom(lightEntity2)


        isLightOn = false
    }
}

export function toggleSpiral(dt: number) {
    const currentTime = new Date()
    const currentMinutes = currentTime.getMinutes()
    const currentSeconds = currentTime.getSeconds()
    console.log(`Time is ${currentMinutes}:${currentSeconds}`);

    // Check if it's on the hour and we haven't already started the light
    if (currentMinutes === 0 && currentSeconds === 0 && lightStartTime === null) {
        showSpiral()
        lightStartTime = Date.now()
        console.log('show spiral')
    }

    // Check if the light should be turned off
    if (lightStartTime !== null && Date.now() - lightStartTime > LIGHT_ON_DURATION) {
        hideSpiral()
        lightStartTime = null
        console.log('hide spiral')
    }
}

// Synchronize light status for new players
engine.addSystem(() => {
    if (isLightOn && !GltfContainer.has(lightEntity)) {
        showSpiral()
    } else if (!isLightOn && GltfContainer.has(lightEntity)) {
        hideSpiral()
    }
})

// Optionally, you can export the functions for manual control if needed
export { showSpiral, hideSpiral }
