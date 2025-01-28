import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math';
import { AvatarShape, Entity, Transform, engine } from '@dcl/sdk/ecs';

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
    { position: Vector3.create(2, 35.45, 26.25), rotation: Quaternion.fromEulerDegrees(0, -95, 0), scale: Vector3.One() },
    { position: Vector3.create(-0.5, 34.8, 59.75), rotation: Quaternion.fromEulerDegrees(0, 180, 0), scale: Vector3.One() }
];



const GALLERY_POSITIONS_1 = [
    { position: Vector3.create(1, 1, 29), rotation: Quaternion.fromEulerDegrees(0, -50, 0), scale: Vector3.One() },
    { position: Vector3.create(3, 1, 45), rotation: Quaternion.fromEulerDegrees(0, 45, 0), scale: Vector3.One() },
    { position: Vector3.create(-10, 1, 10), rotation: Quaternion.fromEulerDegrees(0, -140, 0), scale: Vector3.One() },
];

const GALLERY_POSITIONS_2 = [
    { position: Vector3.create(1, 19.5, 55), rotation: Quaternion.fromEulerDegrees(0, -50, 0), scale: Vector3.One() },
    { position: Vector3.create(10, 19.5, 43), rotation: Quaternion.fromEulerDegrees(0, 90, 0), scale: Vector3.One() },
    { position: Vector3.create(-0.5, 19.5, 60), rotation: Quaternion.fromEulerDegrees(0, 180, 0), scale: Vector3.One() }


]

//update to drink positions 
const SITTING_POSITIONS = [
    { position: Vector3.create(-8, 34.8, 21), rotation: Quaternion.fromEulerDegrees(0, -50, 0), scale: Vector3.One() },
    { position: Vector3.create(-10, 34.8, 22), rotation: Quaternion.fromEulerDegrees(0, 180-50, 0), scale: Vector3.One() },
    { position: Vector3.create(3.8, 34.8, 21), rotation: Quaternion.fromEulerDegrees(0, -45, 0), scale: Vector3.One() },
    { position: Vector3.create(6, 34.8, 22), rotation: Quaternion.fromEulerDegrees(0, -50, 0), scale: Vector3.One() },
    { position: Vector3.create(-1.2, 34.8, 46.5), rotation: Quaternion.fromEulerDegrees(0, 180-50, 0), scale: Vector3.One() },
    { position: Vector3.create(1.2, 34.8, 46.5), rotation: Quaternion.fromEulerDegrees(0, -50, 0), scale: Vector3.One() },
    { position: Vector3.create(6, 34.8, 43), rotation: Quaternion.fromEulerDegrees(0, -90, 0), scale: Vector3.One() },

]

const DANCE_MOVES = [ "dance", "robot", "tik", "hammer", "tektonik", "disco" ];

const CUSTOM_EMOTES = [
    'urn:decentraland:matic:collections-v2:0xca53b9436be1d663e050eb9ce523decbc656365c:0',
    "clap"];

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

const BARTENDER_WEARABLES: string[] = [

    'urn:decentraland:off-chain:base-avatars:BaseMale',
    'urn:decentraland:off-chain:base-avatars:safari_shirt',
    'urn:decentraland:off-chain:base-avatars:comfortablepants',
    'urn:decentraland:off-chain:base-avatars:keanu_hair',
    'urn:decentraland:off-chain:base-avatars:moccasin'

];

const SITTING_ROOM_INDEX = 4;

// State management
const npcArrays: { [key: number]: Entity[] } = {};


// Helper functions
function createNPC(
    positionData: { position: Vector3, rotation: Quaternion, scale: Vector3}, 
    bodyShape: string, 
    wearables: string[], 
    hairColor: Color4, 
    skinColor: Color4
): Entity {
    const entity = engine.addEntity();
    Transform.createOrReplace(entity, positionData);
    const av = AvatarShape.createOrReplace(entity);
    av.bodyShape = bodyShape;
    av.hairColor = hairColor;
    av.skinColor = skinColor;
    av.wearables = wearables || [];
    av.name = "";
    return entity;
}










function startNpcDance(npcs: Entity[]): void {
    console.log('Starting dance for NPCs...');
    npcs.forEach((npc, index) => {
      const av = AvatarShape.getMutable(npc);
      av.expressionTriggerId = DANCE_MOVES[index % DANCE_MOVES.length];
    });
  }
  

// Add npcs to room
export function addNPCsToRoom(positions: any[], roomIndex: number): void {
    const npcs = positions.map((pos, index) =>
    createNPC(pos, BODY_SHAPES[index % BODY_SHAPES.length], DANCE_WEARABLES[index % DANCE_WEARABLES.length], HAIR_COLORS[index % HAIR_COLORS.length], SKIN_COLORS[index % SKIN_COLORS.length])
);
npcArrays[roomIndex] = npcs;
}


// Remove npcs from room
export function removeNPCsFromRoom(roomIndex: number): void {
    if (npcArrays[roomIndex]) {
        npcArrays[roomIndex].forEach((npc) => engine.removeEntity(npc))
        npcArrays[roomIndex] = [];
    }
}


// Main functions
export function addBartenderManager(): void {
    addNPCsToRoom(BARTENDER_POSITIONS, 0);
}

export function removeBartenderNpcs(): void {
    removeNPCsFromRoom(0);
}

export function addSitManager(): void {
    console.log('Adding sitting NPCs...');
    removeSitNpcs();
  
    const sittingEntities = SITTING_POSITIONS.map((pos, index) =>
      createNPC(
        pos,
        BODY_SHAPES[index % BODY_SHAPES.length],
        DANCE_WEARABLES[index % DANCE_WEARABLES.length],
        HAIR_COLORS[index % HAIR_COLORS.length],
        SKIN_COLORS[index % SKIN_COLORS.length]
      )
    );
  
    sittingEntities.forEach((npc, index) => {
      const av = AvatarShape.getMutable(npc);
     // av.expressionTriggerId = index % 2 === 0 ? 'Idle' : 'clap'; // Alternate between Idle and clap
    });
  
    npcArrays[SITTING_ROOM_INDEX] = sittingEntities;
    console.log(`Sitting NPCs added: ${sittingEntities.length}`);
  }
  
  

export function removeSitNpcs(): void {
    console.log('Removing sitting npcs');
    removeNPCsFromRoom(SITTING_ROOM_INDEX);
}

let danceFlag: Boolean = true
export function addDanceManager(): void {
    console.log('Adding dancing NPCs...');
  
    // Clear existing dancers
    removeDanceNpcs();
  
    const danceEntities = DANCE_POSITIONS.map((pos, index) =>
      createNPC(
        pos,
        BODY_SHAPES[index % BODY_SHAPES.length],
        DANCE_WEARABLES[index % DANCE_WEARABLES.length],
        HAIR_COLORS[index % HAIR_COLORS.length],
        SKIN_COLORS[index % SKIN_COLORS.length]
      )
    );
  
    npcArrays[1] = danceEntities; // Track dancers in room 1
    startNpcDance(danceEntities);
  
    console.log(`Dancers added: ${danceEntities.length}`);
  }
  

export function removeDanceNpcs(): void {
    if (!danceFlag) {
        removeNPCsFromRoom(1);
    }
    else return
}

export function addGalleryManager_1(): void {
    console.log('Adding NPCs for Gallery 1...');
    removeGalleryNpcs_1();
  
    const galleryEntities = GALLERY_POSITIONS_1.map((pos, index) =>
      createNPC(
        pos,
        BODY_SHAPES[index % BODY_SHAPES.length],
        DANCE_WEARABLES[index % DANCE_WEARABLES.length],
        HAIR_COLORS[index % HAIR_COLORS.length],
        SKIN_COLORS[index % SKIN_COLORS.length]
      )
    );
  
    npcArrays[2] = galleryEntities; // Track NPCs in room 2
    console.log(`NPCs added to Gallery 1: ${galleryEntities.length}`);
  }
  

export function removeGalleryNpcs_1(): void {
    removeNPCsFromRoom(2);

}

export function addGalleryManager_2(): void {
    console.log('Adding NPCs for Vons...');
    removeGalleryNpcs_2();

    const galleryEntities = GALLERY_POSITIONS_2.map((pos, index) =>
        createNPC(
            pos,
            BODY_SHAPES[index % BODY_SHAPES.length],
            DANCE_WEARABLES[index % DANCE_WEARABLES.length],
            HAIR_COLORS[index % HAIR_COLORS.length],
            SKIN_COLORS[index % SKIN_COLORS.length]
        )
    );

    galleryEntities.forEach((npc, index) => {
        const av = AvatarShape.getMutable(npc);
        av.expressionTriggerId = index % 2 === 0 ? 'clap' : 'Idle'; // Alternate between predefined animations
    });

    npcArrays[3] = galleryEntities; // Track NPCs in room 3
    console.log(`NPCs added to Vons: ${galleryEntities.length}`);
}

  

export function removeGalleryNpcs_2(): void {
    removeNPCsFromRoom(3);
}

function getPositionsForRoom(roomIndex: number): { position: Vector3; rotation: Quaternion; scale: Vector3 }[] | null {
    switch (roomIndex) {
      case 0:
        return BARTENDER_POSITIONS;
      case 1:
        return DANCE_POSITIONS;
      case 2:
        return GALLERY_POSITIONS_1;
      case 3:
        return GALLERY_POSITIONS_2;
      case 4:
        return SITTING_POSITIONS;
      default:
        return null;
    }
  }


export function spawnNPCsBasedOnRoom(roomIndex: number): void {
    console.log(`Spawning NPCs for room: ${roomIndex}`);
   removeNPCsFromRoom(roomIndex)
    
   const npcPositions = getPositionsForRoom(roomIndex); // Helper function to get positions
  
    if (!npcPositions) return;

  
    const npcs = npcPositions.map((pos, index) => {
      const npc = createNPC(
        pos,
        BODY_SHAPES[index % BODY_SHAPES.length],
        DANCE_WEARABLES[index % DANCE_WEARABLES.length],
        HAIR_COLORS[index % HAIR_COLORS.length],
        SKIN_COLORS[index % SKIN_COLORS.length]
    );
  
    //npcArrays[roomIndex] = npcs; // Track the recreated NPCs
    const av = AvatarShape.getMutable(npc);
    //av.expressionTriggerId = index % 2 === 0 ? 'Idle' : 'clap';
    return npc;
});
npcArrays[roomIndex] = npcs
console.log(`NPCs spawned for room ${roomIndex}: ${npcs.length}`);
}

  export function despawnNPCsBasedOnRoom(roomIndex: number): void {
    console.log(`Despawning NPCs for room: ${roomIndex}`);
    removeNPCsFromRoom(roomIndex); // Clear all entities from the room's array
  }
  