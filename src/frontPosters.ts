import { engine, MeshRenderer, Transform, Material, GltfContainer, Entity } from "@dcl/sdk/ecs";
import { Vector3, Quaternion, Color4 } from "@dcl/sdk/math";
import { sceneParent } from "./components";

const frontScreenLeft = engine.addEntity();
const frontScreenRight = engine.addEntity();
let frontScreensVisible = true;

const poster = 'https://bafkreib2v56py6d6obf2x35oviiw2fvomojszplmk6wxao3fzkfgg66vba.ipfs.nftstorage.link/';
//const gucciPoster = 'https://bafkreib2v56py6d6obf2x35oviiw2fvomojszplmk6wxao3fzkfgg66vba.ipfs.nftstorage.link/';

export function createFrontScreens() {
    if (!sceneParent) {
        console.error("Scene parent undefined, front screens may not be visible.");
        return;
    }

    console.log("Creating front screens...");

    MeshRenderer.setPlane(frontScreenLeft);
    Transform.createOrReplace(frontScreenLeft, {
        position: Vector3.create(12.345, -19.25, 18.01), // Adjust height if needed
        scale: Vector3.create(4.15, 7.5, 4),
        rotation: Quaternion.fromEulerDegrees(0, 180, 0),
        parent: sceneParent
    });

    Material.setPbrMaterial(frontScreenLeft, {
        texture: Material.Texture.Common({ src: poster }),
        roughness: 1, specularIntensity: 0, metallic: 0,
        emissiveTexture: Material.Texture.Common({ src: poster }),
        emissiveColor: Color4.White(), emissiveIntensity: 1,
    });

    MeshRenderer.setPlane(frontScreenRight);
    Transform.createOrReplace(frontScreenRight, {
        position: Vector3.create(-12.355, -19.25, 18.01),
        scale: Vector3.create(4.15, 7.5, 4),
        rotation: Quaternion.fromEulerDegrees(0, 180, 0),
        parent: sceneParent
    });

    Material.setPbrMaterial(frontScreenRight, {
        texture: Material.Texture.Common({ src: poster }),
        roughness: 1, specularIntensity: 0, metallic: 0,
        emissiveTexture: Material.Texture.Common({ src: poster }),
        emissiveColor: Color4.White(), emissiveIntensity: 1,
    });

    frontScreensVisible = true;
}

function entityExists(entity: Entity): boolean {
    return Transform.has(entity); // Checks if the entity has a Transform, indicating it's still in the scene
}

export function turnOffFrontScreens() {
    if (entityExists(frontScreenLeft)) engine.removeEntity(frontScreenLeft);
    if (entityExists(frontScreenRight)) engine.removeEntity(frontScreenRight);
    frontScreensVisible = false;
}

export function toggleFrontScreens() {
    frontScreensVisible ? turnOffFrontScreens() : createFrontScreens();
}
