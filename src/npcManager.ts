import { AvatarShape, TransformType } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import *  as  npc from 'dcl-npc-toolkit'



class NPC {

    lostNpc: any
    sitNpc: any
    lostStartingPos: TransformType = { position: Vector3.create(-0.5, 34.8, 59.75), rotation: Quaternion.fromEulerDegrees(0, 180, 0), scale: Vector3.One() }

    lostFollowPath: Vector3[] = []
    lostCanTalk: boolean = true// false
    lostToTalaSystemInstance: any
    hasLostReachedTala: boolean = false

    constructor() {
        this.createLost(this.lostStartingPos)
    }

    createLost(t: TransformType) {
        this.lostNpc = npc.create(
            t,
            {
                type: npc.NPCType.AVATAR,
                onActivate: () => {
                    if (this.lostCanTalk) { }
                },
                coolDownDuration: 3,
                reactDistance: 2
            }
        )
        AvatarShape.getMutable(this.lostNpc).name = ""
    }


}

export const NPCManager = new NPC()