import {
    Animator,
    engine,
    GltfContainer,
    Transform,
    ColliderLayer,
    MeshCollider
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'

let dj = engine.addEntity()
let djCreated = true

export function createDJ() {
    if (!djCreated) {
        dj = engine.addEntity()
        djCreated = true
    }

    GltfContainer.createOrReplace(dj, {
        src: 'models/rapture-dj.glb',
    })
    MeshCollider.create(dj)

    Transform.createOrReplace(dj, {
        position: Vector3.create(9.5, 37.22, 32),
        scale: Vector3.create(1.2, 1.2, 1.2),
        rotation: Quaternion.fromEulerDegrees(0, -90, 0)
    })
    Animator.createOrReplace(dj, {
        states: [{
            //name: "Complete",
            clip: "complete",
            playing: true,
            loop: true,
        }, {
           // name: "Dance",
            clip: "dance",
            playing: false,
            loop: true,
        }, {
           // name: "Idle",
            clip: "idle",
            playing: false,
            loop: true
        }, {
           // name: "Splat",
            clip: "splat",
            playing: false,
            loop: true
        }]
    })
}


export function removeDJ() {
    if (djCreated) {
        engine.removeEntity(dj)
        djCreated = false
    }
}