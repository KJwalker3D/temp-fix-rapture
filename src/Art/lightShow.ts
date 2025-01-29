import { Animator, Entity, GltfContainer, Transform, engine } from "@dcl/sdk/ecs"
import { Quaternion, Vector3 } from "@dcl/sdk/math"
import * as utils from '@dcl-sdk/utils'

const spiralLight = 'models/party-assets/espiralAzul.glb'
const spiralClip1 = 'espiral1'
const spiralClip2 = 'espiral2'
const spiralClip3 = 'espiral3'

const lightEntities: Entity[] = [engine.addEntity(), engine.addEntity()]

const LIGHT_ON_DURATION = 5 * 60 * 1000 // 5 minutes in milliseconds
let lightStartTime: number | null = null
let isLightOn: boolean = false


// set up spirals once
lightEntities.forEach((entity, index) => {
    Transform.create(entity, {
        position: index === 0
        ? Vector3.create(8.24, 35.16, 32.16)
        : Vector3.create(-9.53, 35.28, 32),
        rotation: index === 0
        ? Quaternion.fromEulerDegrees(0, 90, 0)
        : Quaternion.fromEulerDegrees(0, -90, 0),
        scale: Vector3.create(0.25, 0.25, 0.25)
    })

    GltfContainer.create(entity, { src: spiralLight })

    Animator.create(entity, {
        states: [
            { clip: spiralClip1, playing: false, loop: true },
            { clip: spiralClip2, playing: false, loop: true },
            { clip: spiralClip3, playing: false, loop: true }
        ]
    })
})

function showSpiral(): void {
    if (isLightOn) return

    lightEntities.forEach(entity => {
        Animator.getMutable(entity).states.forEach(state => {
            state.playing = state.clip === spiralClip1
        })
    })

    isLightOn = true
    lightStartTime = Date.now()
    console.log("spiral activated")
}

function hideSpiral(): void {
    if (!isLightOn) return

    lightEntities.forEach(entity => {
        Animator.getMutable(entity).states.forEach(state => state.playing = false)
    })

    isLightOn = false
    lightStartTime = null
    console.log("spiral light deactivated")
}

function checkSpiralTiming(): void {
    const now = new Date()
    const currentMinutes = now.getMinutes()
    const currentSeconds = now.getSeconds()

    console.log(`Checking time: ${currentMinutes}:${currentSeconds}`)

     // Activate at the start of an hour
     if (currentMinutes === 0 && currentSeconds === 0 && lightStartTime === null) {
        showSpiral()
    }
    
    // Turn off after duration
    if (lightStartTime !== null && Date.now() - lightStartTime > LIGHT_ON_DURATION) {
        hideSpiral()
    }

}

utils.timers.setInterval(checkSpiralTiming, 10000)
export { showSpiral, hideSpiral }
