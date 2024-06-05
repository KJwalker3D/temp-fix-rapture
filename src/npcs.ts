
import { Color3, Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { AvatarShape, Entity, Transform, engine } from '@dcl/sdk/ecs'
import { NPCManager } from './npcManager'



// Von's Lounge bartender
let bartenderNpcs: Entity[] = []
let bartenderNpcT: any = [
    // vons bartender
    { position: Vector3.create(-0.5, 19.5, 60), rotation: Quaternion.fromEulerDegrees(0, 180, 0), scale: Vector3.One() },
]

let skinColors: Color4[] = [
    Color4.create(1, 0.792, 0.584, 1), // RGB: (255, 202, 149) Light
    Color4.create(0.906, 0.651, 0.486, 1), // RGB: (231, 166, 124) Mid
    Color4.create(0.482, 0.282, 0.227, 1), // RGB: (123, 72, 58) Dark
    Color4.create(0.471, 0.384, 0.212, 1), // RGB: (120, 98, 54) Olive
    Color4.create(1, 0.769, 0.651, 1), // RGB: (255, 197, 166) Pale

]

const hairColors: Color4[] = [
    Color4.create(0.839, 0.569, 0.345, 1), // RGB: (214, 145, 88) Light Brown
    Color4.create(0.588, 0.424, 0.369, 1), // RGB: (150, 108, 94) Dark Brown
    Color4.create(0.988, 0.812, 0.435, 1), // RGB: (252, 207, 111) Blonde
    Color4.create(0.506, 0.333, 0.243, 1), // RGB: (129, 85, 62) Chestnut
    Color4.create(0.788, 0.663, 0.529, 1), // RGB: (201, 169, 135) Auburn
    Color4.create(0.906, 0.757, 0.675, 1), // RGB: (231, 193, 172) Light Brown
    Color4.create(0.584, 0.482, 0.345, 1), // RGB: (149, 123, 88) Dark Blonde
];


let danceNpcs: Entity[] = []
let danceNpcT: any = [



    // upper floor
    { position: Vector3.create(2, 35.45, 30), rotation: Quaternion.fromEulerDegrees(0, 90, 0), scale: Vector3.One() },

    // rooftop
    { position: Vector3.create(0, 35.45, 33.5), rotation: Quaternion.fromEulerDegrees(0, 140, 0), scale: Vector3.One() },
    { position: Vector3.create(-3, 35.45, 27.5), rotation: Quaternion.fromEulerDegrees(0, 10, 0), scale: Vector3.One() },
    { position: Vector3.create(-2, 35.45, 29.5), rotation: Quaternion.fromEulerDegrees(0, 50, 0), scale: Vector3.One() },
    { position: Vector3.create(-4, 35.45, 28.75), rotation: Quaternion.fromEulerDegrees(0, 180, 0), scale: Vector3.One() },
    { position: Vector3.create(3, 35.45, 31), rotation: Quaternion.fromEulerDegrees(0, 10, 0), scale: Vector3.One() },
    { position: Vector3.create(1, 35.45, 32), rotation: Quaternion.fromEulerDegrees(0, -50, 0), scale: Vector3.One() },
    { position: Vector3.create(-1, 35.45, 34.5), rotation: Quaternion.fromEulerDegrees(0, 95, 0), scale: Vector3.One() },
    { position: Vector3.create(2, 35.45, 26.25), rotation: Quaternion.fromEulerDegrees(0, -95, 0), scale: Vector3.One() },


]

let dances: string[] = [
    "dance", "robot", "tik", "hammer", "tektonik", "disco"
]
let danceNpcBodyShapes: string[] = [
    'urn:decentraland:off-chain:base-avatars:BaseMale',
    'urn:decentraland:off-chain:base-avatars:BaseFemale',
    'urn:decentraland:off-chain:base-avatars:BaseMale',
    'urn:decentraland:off-chain:base-avatars:BaseFemale',
    'urn:decentraland:off-chain:base-avatars:BaseMale',
    'urn:decentraland:off-chain:base-avatars:BaseFemale',
    'urn:decentraland:off-chain:base-avatars:BaseMale',
    'urn:decentraland:off-chain:base-avatars:BaseFemale',
    //'urn:decentraland:off-chain:base-avatars:BaseMale',
];

let danceWearables: string[][] = [

    // MALE
    ['urn:decentraland:off-chain:base-avatars:m_sweater_02',
        'urn:decentraland:off-chain:base-avatars:comfortablepants',
        'urn:decentraland:off-chain:base-avatars:sneakers',
        'urn:decentraland:off-chain:base-avatars:hair_punk',
        'urn:decentraland:off-chain:base-avatars:beard_01',
        'urn:decentraland:off-chain:base-avatars:eyebrows_00',
        'urn:decentraland:off-chain:base-avatars:eyes_00'
    ],

    // FEMALE
    [
        'urn:decentraland:off-chain:base-avatars:black_top',
        'urn:decentraland:off-chain:base-avatars:f_capris',
        'urn:decentraland:off-chain:base-avatars:Espadrilles',
        'urn:decentraland:off-chain:base-avatars:pony_tail',
        'urn:decentraland:off-chain:base-avatars:f_mouth_05',
        'urn:decentraland:off-chain:base-avatars:f_eyebrows_02',
        'urn:decentraland:off-chain:base-avatars:f_eyes_06'],

    // MALE
    ['urn:decentraland:off-chain:base-avatars:m_sweater',
        'urn:decentraland:off-chain:base-avatars:comfortablepants',
        'urn:decentraland:off-chain:base-avatars:Espadrilles',
        'urn:decentraland:off-chain:base-avatars:rasta',
        'urn:decentraland:off-chain:base-avatars:beard',
        'urn:decentraland:off-chain:base-avatars:eyebrows_00',
        'urn:decentraland:off-chain:base-avatars:eyes_00'
    ],

    // FEMALE
    [
        'urn:decentraland:off-chain:base-avatars:f_blue_jacket',
        'urn:decentraland:off-chain:base-avatars:f_jeans',
        'urn:decentraland:off-chain:base-avatars:ruby_blue_loafer',
        'urn:decentraland:off-chain:base-avatars:shoulder_hair',
        // 'urn:decentraland:off-chain:base-avatars:beard', 
        'urn:decentraland:off-chain:base-avatars:eyebrows_00',
        'urn:decentraland:off-chain:base-avatars:eyes_00'],

    // MALE
    ['urn:decentraland:off-chain:base-avatars:sport_jacket',
        'urn:decentraland:matic:collections-v2:0x574a56013d8bb09795f3d2b32e2b7b9d9949d22b:1',
        'urn:decentraland:off-chain:base-avatars:sneakers',
        'urn:decentraland:off-chain:base-avatars:cool_hair',
        //'urn:decentraland:off-chain:base-avatars:beard', 
        'urn:decentraland:off-chain:base-avatars:eyebrows_00',
        'urn:decentraland:off-chain:base-avatars:eyes_00'],

    // FEMALE
    //playsuit
    //'urn:decentraland:matic:collections-v2:0x574a56013d8bb09795f3d2b32e2b7b9d9949d22b:0'
    ['urn:decentraland:off-chain:base-avatars:white_top',
        'urn:decentraland:matic:collections-v2:0x574a56013d8bb09795f3d2b32e2b7b9d9949d22b:1',
        'urn:decentraland:off-chain:base-avatars:Espadrilles',
        'urn:decentraland:off-chain:base-avatars:double_bun',
        //'', 
        'urn:decentraland:off-chain:base-avatars:eyebrows_00',
        'urn:decentraland:off-chain:base-avatars:eyes_00'],

    // MALE
    //pants
    //urn:decentraland:matic:collections-v2:0x574a56013d8bb09795f3d2b32e2b7b9d9949d22b:1
    ['urn:decentraland:off-chain:base-avatars:safari_shirt',
        'urn:decentraland:off-chain:base-avatars:grey_joggers',
        'urn:decentraland:off-chain:base-avatars:crocs',
        'urn:decentraland:off-chain:base-avatars:keanu_hair',
        'urn:decentraland:off-chain:base-avatars:beard',
        'urn:decentraland:off-chain:base-avatars:eyebrows_00',
        'urn:decentraland:off-chain:base-avatars:eyes_00'],

    // FEMALE
    //top
    //urn:decentraland:matic:collections-v2:0x574a56013d8bb09795f3d2b32e2b7b9d9949d22b:2
    ['urn:decentraland:matic:collections-v2:0x574a56013d8bb09795f3d2b32e2b7b9d9949d22b:0',
        'urn:decentraland:off-chain:base-avatars:diamondleggings_f',
        'urn:decentraland:off-chain:base-avatars:pink_sleepers',
        'urn:decentraland:off-chain:base-avatars:hair_bun',
        //'urn:decentraland:off-chain:base-avatars:beard', 
        'urn:decentraland:off-chain:base-avatars:eyebrows_00',
        'urn:decentraland:off-chain:base-avatars:eyes_00'],

    // MALE
    ['urn:decentraland:matic:collections-v2:0x574a56013d8bb09795f3d2b32e2b7b9d9949d22b:2',
        'urn:decentraland:off-chain:base-avatars:hip_hop_joggers',
        'urn:decentraland:off-chain:base-avatars:moccasin',
        'urn:decentraland:off-chain:base-avatars:semi_afro',
        'urn:decentraland:off-chain:base-avatars:beard',
        'urn:decentraland:off-chain:base-avatars:eyebrows_00',
        'urn:decentraland:off-chain:base-avatars:eyes_00']

]



export function addBartenderManager() {
    for (let i = 0; i < bartenderNpcT.length; i++) {
        let e = engine.addEntity()
        const av = AvatarShape.createOrReplace(e)
        Transform.create(e, bartenderNpcT[i])
        av.bodyShape = 'urn:decentraland:off-chain:base-avatars:BaseMale'
        av.hairColor = Color3.Gray()
        av.wearables = [
            'urn:decentraland:off-chain:base-avatars:safari_shirt',
            'urn:decentraland:off-chain:base-avatars:comfortablepants',
            'urn:decentraland:off-chain:base-avatars:keanu_hair',
            'urn:decentraland:off-chain:base-avatars:moccasin'

        ]
        bartenderNpcs.push(e)
        av.name = ""
    }
    startBartenderNpc()
}


function startBartenderNpc() {
    bartenderNpcs.forEach(e => {
        const av = AvatarShape.getMutable(e)
    })
}

export function removeBartenderNpcs() {
    bartenderNpcs.forEach(e => {
        engine.removeEntity(e)
    })
}

function startNpcDance() {
    danceNpcs.forEach((e, index) => {
        const av = AvatarShape.getMutable(e)
        av.expressionTriggerId = dances[Math.floor(Math.random() * dances.length)]
        av.wearables = danceWearables[index]
        av.skinColor = skinColors[index]
        av.hairColor = hairColors[index]
        av.bodyShape = danceNpcBodyShapes[index % danceNpcBodyShapes.length]

    })
    AvatarShape.getMutable(NPCManager.lostNpc).expressionTriggerId = "dance"
}

export function addDanceManager() {
    console.log("Adding dance NPCs and setting properties...");
    // Add new dance NPCs or update existing ones
    for (let i = 0; i < danceNpcT.length; i++) {
        let e: Entity;
        if (i < danceNpcs.length) {
            // If the NPC already exists, update its properties
            e = danceNpcs[i];
        } else {
            // If the NPC doesn't exist, add a new one
            e = engine.addEntity();
            danceNpcs.push(e);
        }

        // Set properties for the dance NPC
        Transform.createOrReplace(e, danceNpcT[i]);
        const av = AvatarShape.createOrReplace(e);
        av.name = "";
        av.expressionTriggerId = dances[Math.floor(Math.random() * dances.length)];
        av.wearables = danceWearables[i];
        av.skinColor = skinColors[i];
        av.hairColor = hairColors[i];
        av.bodyShape = danceNpcBodyShapes[i % danceNpcBodyShapes.length];
        console.log(`Updated properties for dance NPC ${i + 1}`);
    }

    console.log("All dance NPCs properties set. Starting NPC dance...");
    startNpcDance();
}



export function removeDanceNpcs() {
    danceNpcs.forEach(e => {
        engine.removeEntity(e)
        danceNpcs.length === 0
    })
}

const npcArrays: Entity[][] = [[], [], [], []];


// Function to add NPCs to a specific room
function addNPCToRoom(npc: Entity, roomIndex: number) {
    npcArrays[roomIndex].push(npc);
}

// Function to remove NPCs from a specific room
function removeNPCsFromRoom(roomIndex: number) {
    const npcsToRemove = npcArrays[roomIndex];
    npcsToRemove.forEach(npc => engine.removeEntity(npc));
    // Clear the array after removing NPCs
    npcArrays[roomIndex] = [];
}

// Function to spawn NPCs based on the current room index
export function spawnNPCsBasedOnRoom(roomIndex: number) {
    // Add NPCs to the corresponding room
    if (roomIndex === 0) {
        // Add bartender NPCs to the lounge
        bartenderNpcs.forEach(npc => addNPCToRoom(npc, roomIndex));
    } else if (roomIndex === 1) {
        // Add dance NPCs to the rooftop
        danceNpcs.forEach(npc => addNPCToRoom(npc, roomIndex));
    }
    // Add handling for other rooms
}

// Function to despawn NPCs based on the current room index
export function despawnNPCsBasedOnRoom(roomIndex: number) {
    // Remove NPCs from the corresponding room
    removeNPCsFromRoom(roomIndex);
}

// Example usage (assuming you have access to the current room index)
