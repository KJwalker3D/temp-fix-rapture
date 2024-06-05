import { engine, Transform, Entity, InputAction, PointerEventType, PointerEvents, Schemas, inputSystem, MeshCollider, MeshRenderer, Material } from "@dcl/sdk/ecs";
import * as utils from '@dcl-sdk/utils';
import { Quaternion, Vector3 } from "@dcl/sdk/math";
//import { getRandomHexColor } from "../helperFunctions";
import { artTitle1, artDescription1, artTitle2, artDescription2, artDescription10, artDescription11, artDescription12, artDescription13, artDescription14, artDescription15, artDescription16, artDescription17, artDescription18, artDescription19, artDescription20, artDescription21, artDescription22, artDescription23, artDescription24, artDescription3, artDescription4, artDescription5, artDescription6, artDescription7, artDescription8, artDescription9, artTitle10, artTitle11, artTitle12, artTitle13, artTitle14, artTitle15, artTitle16, artTitle17, artTitle18, artTitle19, artTitle20, artTitle21, artTitle22, artTitle23, artTitle24, artTitle3, artTitle4, artTitle5, artTitle6, artTitle7, artTitle8, artTitle9, artTitle25, artDescription25, artTitle26, artDescription26, artPos1, artPos10, artPos11, artPos12, artPos13, artPos14, artPos15, artPos16, artPos17, artPos18, artPos19, artPos2, artPos20, artPos21, artPos22, artPos23, artPos24, artPos25, artPos26, artPos3, artPos4, artPos5, artPos6, artPos7, artPos8, artPos9, artRot1, artRot10, artRot11, artRot12, artRot13, artRot14, artRot15, artRot16, artRot17, artRot18, artRot19, artRot2, artRot20, artRot21, artRot22, artRot23, artRot24, artRot25, artRot26, artRot3, artRot4, artRot5, artRot6, artRot7, artRot8, artRot9, artPos37, artPos27, artPos28, artPos29, artPos30, artPos31, artPos32, artPos33, artPos34, artPos35, artPos36, artRot27, artRot28, artRot29, artRot30, artRot31, artRot32, artRot33, artRot34, artRot35, artRot36, artRot37, artTitle27, artTitle28, artTitle29, artTitle30, artTitle31, artTitle32, artTitle33, artTitle34, artTitle35, artTitle36, artTitle37, artDescription27, artDescription28, artDescription29, artDescription30, artDescription31, artDescription32, artDescription33, artDescription34, artDescription35, artDescription37, artDescription36, artRot38, artPos38, artDescription38, artTitle38 } from "./artData";


let hoverDistance = 8 // Distance at which artHover UI will appear
let visibilityTime = 9000 // duration of the artHover UI in miliseconds
let defaultScale = Vector3.create(1.5, 0.85, 0.5) // art hover trigger size



export let hoverVisible = false
export let currentArtworkId = 1;

export const ArtHover = engine.defineComponent('arthover', { visible: Schemas.Boolean })

export const ArtComponent = engine.defineComponent('art-id', {
    artTitle: Schemas.String,
    artDescription: Schemas.String
})

export function createArtID(position: Vector3, rotation: Vector3, artworkId: number, artTitle: string, artDescription: string): Entity {
    const entity = engine.addEntity()
    ArtHover.create(entity, { visible: false })
    addArtworkData(entity, artworkId, artTitle, artDescription, true);
    setArtworkId(entity, artworkId);
    Transform.create(entity, {
        position: Vector3.create(position.x, position.y - 2, position.z),
        rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z),
        scale: defaultScale
    })

    //MeshRenderer.setBox(entity) // handy for debugging
    MeshCollider.setBox(entity)
    PointerEvents.create(entity, {
        pointerEvents: [
            {
                eventType: PointerEventType.PET_HOVER_ENTER, eventInfo: {
                    button: InputAction.IA_ANY, hoverText: artTitle, maxDistance: hoverDistance,
                    
                }
            }

        ]
    })
    return entity
}

export function artHoverSystem(dt: number) {
    dt = 2000
    const artEntities = engine.getEntitiesWith(ArtHover, Transform)
    for (const [entity, _arthover, _transform] of artEntities) {
        const mutableTransform = Transform.getMutableOrNull(entity)
    }
}


export function changeArtHoverSystem() {
    for (const [entity] of engine.getEntitiesWith(ArtHover, PointerEvents)) {
        const artworkId = getArtworkId(entity);

        if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_HOVER_ENTER, entity)) {
            hoverVisible = true;
          //  Material.setPbrMaterial(entity, { albedoColor: Color4.fromHexString(getRandomHexColor()) }); // handy for debugging
            
            if (artworkId !== undefined) {
                changeCurrentArtworkId(artworkId);
                console.log('hover?', hoverVisible);
                console.log(`${artworkId}`);
            }
            utils.timers.setTimeout(() => {
                hoverVisible = false;
            }, visibilityTime);
        } 
    }
}

export function toggleHover() {
    hoverVisible = false
}


export function changeCurrentArtworkId(newId: number) {
    const artwork = findArtworkById(newId);
    if (artwork && artwork.visible) {
        currentArtworkId = newId;
    }
}


export function findArtworkById(id: number): ArtworkData | undefined {
    return artworkData.find(artwork => artwork.artworkId === id);
}


// Create a map to store artwork IDs associated with entities
export const ArtworkIdMap = new Map<Entity, number>();

// Function to set artwork ID for an entity
export function setArtworkId(entity: Entity, artworkId: number) {
    ArtworkIdMap.set(entity, artworkId);
}

// Function to get artwork ID for an entity
export function getArtworkId(entity: Entity): number | undefined {
    return ArtworkIdMap.get(entity);
}

export interface ArtworkData {
    entity: Entity;
    artworkId: number;
    title: string;
    description: string;
    visible: boolean;
}

export const artworkData: ArtworkData[] = []


export function addArtworkData(entity: Entity, artworkId: number, title: string, description: string, visible: boolean) {
    artworkData.push({ entity, artworkId, title, description, visible });
}


export function createArtHovers() {


// Define arrays for artwork positions, rotations, titles, and descriptions
const artPositions = [artPos1, artPos2, artPos3, artPos4, artPos5, artPos6, artPos7, artPos8, artPos9, artPos10, artPos11, artPos12, artPos13, artPos14, artPos15, artPos16, artPos17, artPos18, artPos19, artPos20, artPos21, artPos22, artPos23, artPos24, artPos25, artPos26, artPos27, artPos28, artPos29, artPos30, artPos31, artPos32, artPos33, artPos34, artPos35, artPos36, artPos37, Vector3.create(artPos38.x + 2, artPos38.y + 0.25, artPos38.z)];
const artRotations = [artRot1, artRot2, artRot3, artRot4, artRot5, artRot6, artRot7, artRot8, artRot9, artRot10, artRot11, artRot12, artRot13, artRot14, artRot15, artRot16, artRot17, artRot18, artRot19, artRot20, artRot21, artRot22, artRot23, artRot24, artRot25, artRot26, artRot27, artRot28, artRot29, artRot30, artRot31, artRot32, artRot33, artRot34, artRot35, artRot36, artRot37, artRot38];
const artTitles = [artTitle1, artTitle2, artTitle3, artTitle4, artTitle5, artTitle6, artTitle7, artTitle8, artTitle9, artTitle10, artTitle11, artTitle12, artTitle13, artTitle14, artTitle15, artTitle16, artTitle17, artTitle18, artTitle19, artTitle20, artTitle21, artTitle22, artTitle23, artTitle24, artTitle25, artTitle26, artTitle27, artTitle28, artTitle29, artTitle30, artTitle31, artTitle32, artTitle33, artTitle34, artTitle35, artTitle36, artTitle37, artTitle38];
const artDescriptions = [artDescription1, artDescription2, artDescription3, artDescription4, artDescription5, artDescription6, artDescription7, artDescription8, artDescription9, artDescription10, artDescription11, artDescription12, artDescription13, artDescription14, artDescription15, artDescription16, artDescription17, artDescription18, artDescription19, artDescription20, artDescription21, artDescription22, artDescription23, artDescription24, artDescription25, artDescription26, artDescription27, artDescription28, artDescription29, artDescription30, artDescription31, artDescription32, artDescription33, artDescription34, artDescription35, artDescription36, artDescription37, artDescription38];

// Loop through the arrays to create entities dynamically
for (let i = 0; i < 38; i++) {
    const entity = createArtID(artPositions[i], artRotations[i], i + 1, artTitles[i], artDescriptions[i]);
    addArtworkData(entity, i + 1, artTitles[i], artDescriptions[i], false);
}




}
