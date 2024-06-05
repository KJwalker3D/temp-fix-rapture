import {
    Animator,
    engine,
    GltfContainer,
    Transform,
    ColliderLayer
  } from '@dcl/sdk/ecs'
  import { Color4, Vector3, Quaternion } from '@dcl/sdk/math'

const dj = engine.addEntity()

  export function createDJ() {

    GltfContainer.createOrReplace(dj, {
        src: 'models/rapture-dj.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
    })
    Transform.createOrReplace(dj, {
        position: Vector3.create(9.5, 37.22, 32),
        scale: Vector3.create(1.2, 1.2, 1.2),
        rotation: Quaternion.fromEulerDegrees(0, -90, 0)
    })
    Animator.createOrReplace(dj, {
        states:[{
            clip: "complete",
            playing: true, 
            loop: true,
        }, {
            clip: "dance.",
            playing: false, 
            loop: true,
        }, {
            clip: "idle", 
            playing: false,
            loop: true
        }, {
            clip: "splat", 
            playing: false,
            loop: true
        }]
    })
  }

  export function removeDJ() {
    engine.removeEntity(dj)
  }