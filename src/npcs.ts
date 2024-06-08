import { Color3, Color4, Quaternion, Vector3 } from '@dcl/sdk/math';
import { AvatarShape, Entity, Transform, engine } from '@dcl/sdk/ecs';
import { NPCManager } from './npcManager';

// Constants for configuration
const BARTENDER_POSITIONS = [
    { position: Vector3.create(-0.5, 19.5, 60), rotation: Quaternion.fromEulerDegrees(0, 180, 0), scale: Vector3.One() }
];

const DANCE_POSITIONS = [
    { position: Vector3.create(2, 35.45, 30), rotation: Quaternion.fromEulerDegrees(0, 90, 0), scale: Vector3.One() },
    { position: Vector3.create(0, 35.45, 33.5), rotation: Quaternion.fromEulerDegrees(0, 140, 0), scale: Vector3.One() },
    { position: Vector3.create(-3, 35.45, 27.5), rotation: Quaternion.fromEulerDegrees(0, 10, 0), scale: Vector3.One() },
    { position: Vector3.create(-2, 35.45, 29.5), rotation: Quaternion.fromEulerDegrees(0, 50, 0), scale: Vector3.One() },
    { position: Vector3.create(-4, 35.45, 28.75), rotation: Quaternion.fromEulerDegrees(0, 180, 0), scale: Vector3.One() },
    { position: Vector3.create(3, 35.45, 31), rotation: Quaternion.fromEulerDegrees(0, 10, 0), scale: Vector3.One() },
    { position: Vector3.create(1, 35.45, 32), rotation: Quaternion.fromEulerDegrees(0, -50, 0), scale: Vector3.One() },
    { position: Vector3.create(-1, 35.45, 34.5), rotation: Quaternion.fromEulerDegrees(0, 95, 0), scale: Vector3.One() },
    { position: Vector3.create(2, 35.45, 26.25), rotation: Quaternion.fromEulerDegrees(0, -95, 0), scale: Vector3.One() }
];

const GALLERY_POSITIONS_1 = [
    { position: Vector3.create(1, 1, 29), rotation: Quaternion.fromEulerDegrees(0, -50, 0), scale: Vector3.One() },
    { position: Vector3.create(3, 1, 45), rotation: Quaternion.fromEulerDegrees(0, 45, 0), scale: Vector3.One() },
    { position: Vector3.create(-10, 1, 10), rotation: Quaternion.fromEulerDegrees(0, -140, 0), scale: Vector3.One() },
];

const SITTING_POSITIONS = [
    { position: Vector3.create(1, 50.5, 29), rotation: Quaternion.fromEulerDegrees(0, -50, 0), scale: Vector3.One() },

]

const GALLERY_POSITIONS_2 = [
    { position: Vector3.create(1, 19.5, 55), rotation: Quaternion.fromEulerDegrees(0, -50, 0), scale: Vector3.One() },
    { position: Vector3.create(10, 19.5, 43), rotation: Quaternion.fromEulerDegrees(0, 90, 0), scale: Vector3.One() },

]

const DANCE_MOVES = [
    "dance", "robot", "tik", "hammer", "tektonik", "disco"
];

const CUSTOM_EMOTES = [
    //
    'urn:decentraland:matic:collections-v2:0xca53b9436be1d663e050eb9ce523decbc656365c:0',
    "clap"]; // Add custom emote URNs here

const BODY_SHAPES = [
    'urn:decentraland:off-chain:base-avatars:BaseMale',
    'urn:decentraland:off-chain:base-avatars:BaseFemale'
];

const SKIN_COLORS = [
    Color4.create(0.95, 0.75, 0.6, 1),
    Color4.create(0.85, 0.65, 0.5, 1),
    Color4.create(0.7, 0.5, 0.4, 1),
    Color4.create(0.5, 0.35, 0.25, 1),
    Color4.create(0.3, 0.2, 0.15, 1)
];

const HAIR_COLORS = [
    Color4.create(0.839, 0.569, 0.345, 1),
    Color4.create(0.588, 0.424, 0.369, 1),
    Color4.create(0.988, 0.812, 0.435, 1),
    Color4.create(0.506, 0.333, 0.243, 1),
    Color4.create(0.788, 0.663, 0.529, 1),
    Color4.create(0.906, 0.757, 0.675, 1),
    Color4.create(0.584, 0.482, 0.345, 1)
];

const DANCE_WEARABLES = [

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

];

// State management
let bartenderNpcs: Entity[] = [];
let danceNpcs: Entity[] = [];
let galleryNpcs_1: Entity[] = [];
let galleryNpcs_2: Entity[] = [];

let sittingNpcs: Entity[] = []
const npcArrays: Entity[][] = [[], [], [], []];

// Helper functions
function createNPC(positionData: any, bodyShape: string, wearables: string[], hairColor: Color4, skinColor: Color4): Entity {
    const entity = engine.addEntity();
    const av = AvatarShape.createOrReplace(entity);
    Transform.createOrReplace(entity, positionData);
    av.bodyShape = bodyShape;
    av.hairColor = hairColor;
    av.skinColor = skinColor;
    av.wearables = wearables;
    av.name = "";
    return entity;
}

function startNpcDance() {
    danceNpcs.forEach((e, index) => {
        const av = AvatarShape.getMutable(e);
        av.expressionTriggerId = DANCE_MOVES[Math.floor(Math.random() * DANCE_MOVES.length)];
        av.wearables = DANCE_WEARABLES[index];
        av.skinColor = SKIN_COLORS[index % SKIN_COLORS.length];
        av.hairColor = HAIR_COLORS[index % HAIR_COLORS.length];
        av.bodyShape = BODY_SHAPES[index % BODY_SHAPES.length];
    });
    AvatarShape.getMutable(NPCManager.lostNpc).expressionTriggerId = "dance";
}

const BARTENDER_WEARABLES: string[] = [

    'urn:decentraland:off-chain:base-avatars:BaseMale',
    'urn:decentraland:off-chain:base-avatars:safari_shirt',
    'urn:decentraland:off-chain:base-avatars:comfortablepants',
    'urn:decentraland:off-chain:base-avatars:keanu_hair',
    'urn:decentraland:off-chain:base-avatars:moccasin'

];

// Main functions
export function addBartenderManager() {

    const npc = createNPC(BARTENDER_POSITIONS[1], BODY_SHAPES[1], BARTENDER_WEARABLES, Color4.Gray(), SKIN_COLORS[SKIN_COLORS.length]);
    bartenderNpcs.push(npc);

}

export function removeBartenderNpcs() {
    bartenderNpcs.forEach(e => engine.removeEntity(e));
    bartenderNpcs = [];
}

export function addDanceManager() {
    DANCE_POSITIONS.forEach((pos, index) => {
        const npc = createNPC(pos, BODY_SHAPES[index % BODY_SHAPES.length], DANCE_WEARABLES[index], HAIR_COLORS[index % HAIR_COLORS.length], SKIN_COLORS[index % SKIN_COLORS.length]);
        danceNpcs.push(npc);
    });
    startNpcDance();
}

export function removeDanceNpcs() {
    danceNpcs.forEach(e => engine.removeEntity(e));
    danceNpcs = [];
}

export function addGalleryManager_1() {
    GALLERY_POSITIONS_1.forEach((pos, index) => {
        const npc = createNPC(pos, BODY_SHAPES[index % BODY_SHAPES.length], DANCE_WEARABLES[index], HAIR_COLORS[index % HAIR_COLORS.length], SKIN_COLORS[index % SKIN_COLORS.length]);
        galleryNpcs_1.push(npc);
    });


}


export function removeGalleryNpcs_1() {
    galleryNpcs_1.forEach(e => engine.removeEntity(e));
    galleryNpcs_1 = [];

}

export function addGalleryManager_2() {
    GALLERY_POSITIONS_2.forEach((pos, index) => {
        const npc = createNPC(pos, BODY_SHAPES[index % BODY_SHAPES.length], DANCE_WEARABLES[index], HAIR_COLORS[index % HAIR_COLORS.length], SKIN_COLORS[index % SKIN_COLORS.length])
        galleryNpcs_2.push(npc)
        const av = AvatarShape.getMutable(npc)
        av.expressionTriggerId = CUSTOM_EMOTES[index % CUSTOM_EMOTES.length]
    })
}

export function removeGalleryNpcs_2() {
    galleryNpcs_2.forEach(e => engine.removeEntity(e));
    galleryNpcs_2 = []
}

export function addSitManager() {
    SITTING_POSITIONS.forEach((pos, index) => {
        const npc = createNPC(pos, BODY_SHAPES[index % BODY_SHAPES.length], DANCE_WEARABLES[index], HAIR_COLORS[index % HAIR_COLORS.length], SKIN_COLORS[index % SKIN_COLORS.length])
        sittingNpcs.push(npc)
        const av = AvatarShape.getMutable(npc)
        av.expressionTriggerId = CUSTOM_EMOTES[index % CUSTOM_EMOTES.length]
    })
    AvatarShape.getMutable(NPCManager.sitNpc).expressionTriggerId = "dance";
}

export function removeSitNpcs() {
    sittingNpcs.forEach(e => engine.removeEntity(e));
    sittingNpcs = []
}

function addNPCToRoom(npc: Entity, roomIndex: number) {
    npcArrays[roomIndex].push(npc);
}

function removeNPCsFromRoom(roomIndex: number) {
    const npcsToRemove = npcArrays[roomIndex];
    npcsToRemove.forEach(npc => engine.removeEntity(npc));
    npcArrays[roomIndex] = [];
}

export function spawnNPCsBasedOnRoom(roomIndex: number) {
    if (roomIndex === 0) {
        bartenderNpcs.forEach(npc => addNPCToRoom(npc, roomIndex));
    } else if (roomIndex === 1) {
        danceNpcs.forEach(npc => addNPCToRoom(npc, roomIndex));
    } else if (roomIndex === 2) {
        galleryNpcs_1.forEach(npc => addNPCToRoom(npc, roomIndex));
    } else if (roomIndex === 3) {
        galleryNpcs_2.forEach(npc => addNPCToRoom(npc, roomIndex));
    }
}

export function despawnNPCsBasedOnRoom(roomIndex: number) {
    removeNPCsFromRoom(roomIndex);
}
