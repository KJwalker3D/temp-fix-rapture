import { ColliderLayer, GltfContainer, InputAction, Material, MeshCollider, MeshRenderer, Schemas, TextureWrapMode, Transform, VideoPlayer, VideoState, engine, pointerEventsSystem, videoEventsSystem } from '@dcl/sdk/ecs'
import { Vector3, Quaternion, Color4 } from '@dcl/sdk/math'


// We use this component to track and group all spinning entities.
// engine.getEntitiesWith(Spinner)
export const ArtHover = engine.defineComponent('artHover', { visible: Schemas.Boolean })

export const VonsArt = engine.defineComponent('vonsart', { visible: Schemas.Boolean})

// We use this component to track and group all the cubes.
// engine.getEntitiesWith(Cube)
export const Cube = engine.defineComponent('cube-id', {
    artTitle: Schemas.String,
    artDescription: Schemas.String
})

export function createBuilding() {

    const building = engine.addEntity()
    Transform.create(building, {
      position: Vector3.create(-16, 0, 0),
      rotation: Quaternion.fromEulerDegrees(0, 180, 0)
    })
    GltfContainer.create(building, {
      src: 'models/rapture-new.glb',
      visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS || ColliderLayer.CL_POINTER
    })
  
}

export const sceneParent = engine.addEntity()
Transform.create(sceneParent, {
position: Vector3.create(-13, 38.75, 32),
scale: Vector3.create(1.5, 1.5, 1.5),
rotation: Quaternion.fromEulerDegrees(0, 90, 0)
})

export const aspectRatio = 9 / 16; 

const mosaic = engine.addEntity();
const sideScreenLeft = engine.addEntity();
const sideScreenRight = engine.addEntity();

export const videoSource = 'https://player.vimeo.com/external/905949518.m3u8?s=6c752565cae32acc3b1699149645a354daf67212&logging=false'


let roofScreensVisible = false;
let roofScreensInstanced = false;



export function toggleRoofScreens() {
  if (!roofScreensInstanced) {
    createRoofScreens()
    roofScreensVisible = true
  }
  else if (roofScreensInstanced && roofScreensVisible) {
   // turnOffRoofScreens();
    roofScreensVisible = false
  } else if (roofScreensInstanced && !roofScreensVisible) {
   // turnOnRoofScreens();
    roofScreensVisible = true
  }
  }


const videoTexture = Material.Texture.Video({
  videoPlayerEntity: mosaic, 
  wrapMode: TextureWrapMode.TWM_REPEAT,
  });
  
  
  videoEventsSystem.registerVideoEventsEntity(mosaic, function (
  videoEvent
  ) {
  console.log(
    'video event - state: ' +
    videoEvent.state +
    '\ncurrent offset:' + 
    videoEvent.currentOffset +
    '\nvideo length:' +
    videoEvent.videoLength
  );
  
  switch (videoEvent.state) {
    case VideoState.VS_READY:
      console.log('Video is ready');
     // checkAndStartShow();
      break
    case VideoState.VS_NONE:
      console.log('Video is in no state');
      break
    case VideoState.VS_ERROR:
      console.log('Video error');
      break
    case VideoState.VS_SEEKING:
      console.log('Video is seeking');
      break
    case VideoState.VS_LOADING:
      console.log('Video is loading');
      break
    case VideoState.VS_BUFFERING:
      console.log('Video is buffering');
      break
    case VideoState.VS_PLAYING:
      console.log('Video is playing');
      break
    case VideoState.VS_PAUSED:
      console.log('Video is paused')
  }
  });
  
  export function switchScreenMaterial() {
    const videoTexture = Material.Texture.Video({
      videoPlayerEntity: mosaic, 
      wrapMode: TextureWrapMode.TWM_REPEAT,
    });
    Material.setPbrMaterial(mosaic, {
      texture: videoTexture,
      roughness: 1, 
      specularIntensity: 0,
      metallic: 0,
      emissiveTexture: videoTexture,
      emissiveColor: Color4.White(),
      emissiveIntensity: 5,
    
    });
    VideoPlayer.createOrReplace(mosaic, {
      src: videoSource,
      playing: true,
      volume: 1,
      loop: false //remove thisa
      
    })
    };
    
    //create rooftop screens
    export function createRoofScreens() {
    VideoPlayer.createOrReplace(mosaic, {
      src: videoSource,
      playing: true,
      volume: 1,
      loop: true //remove thisa
    })
    
    
    
    Material.setPbrMaterial(mosaic, {
      texture: videoTexture,
      roughness: 1, 
      specularIntensity: 0,
      metallic: 0,
      //alphaTest: 0,
      //alphaTexture: videoTexture,
      emissiveTexture: videoTexture,
      emissiveColor: Color4.White(),
      emissiveIntensity: 1,
    })
    
    Transform.createOrReplace(mosaic, {
    position: Vector3.Zero(),
    scale: Vector3.create(9, 5, 3),
    rotation: Quaternion.fromEulerDegrees(0, 180, 0),
    parent: sceneParent
    });
    
    MeshRenderer.setPlane(mosaic);
    MeshCollider.setPlane(mosaic);
    
    pointerEventsSystem.onPointerDown(
    {
      entity: mosaic,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: "Play/Pause"
      }
    },
    function () {
      VideoPlayer.getMutable(mosaic)
      VideoPlayer.getMutable(mosaic).playing = !VideoPlayer.getMutable(mosaic).playing
    }
    )
    
    
    //side screen left
    VideoPlayer.createOrReplace(sideScreenLeft, {
    src: videoSource,
    playing: true,
    volume: 1,
    loop: true //remove thisa
    })
    
    
    Material.setPbrMaterial(sideScreenLeft, {
    texture: videoTexture,
    roughness: 1, 
    specularIntensity: 0,
    metallic: 0,
    //alphaTest: 0,
    //alphaTexture: videoTexture,
    emissiveTexture: videoTexture,
    emissiveColor: Color4.White(),
    emissiveIntensity: 1,
    })
    
    Transform.createOrReplace(sideScreenLeft, {
    position: Vector3.create(6.9, 0.7, -1.6),
    scale: Vector3.create(5, 3, 3),
    rotation: Quaternion.fromEulerDegrees(0, 180, -90),
    parent: sceneParent
    });
    
    MeshRenderer.setPlane(sideScreenLeft);
    MeshCollider.setPlane(sideScreenLeft);
    
    pointerEventsSystem.onPointerDown(
    {
    entity: sideScreenLeft,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: "Play/Pause"
    }
    },
    function () {
    VideoPlayer.getMutable(sideScreenLeft)
    VideoPlayer.getMutable(sideScreenLeft).playing = !VideoPlayer.getMutable(sideScreenLeft).playing
    }
    )
    
    
    // side screen right
    VideoPlayer.createOrReplace(sideScreenRight, {
    src: videoSource,
    playing: true,
    volume: 1,
    loop: true //remove thisa
    })
    
    
    Material.setPbrMaterial(sideScreenRight, {
    texture: videoTexture,
    roughness: 1, 
    specularIntensity: 0,
    metallic: 0,
    //alphaTest: 0,
    //alphaTexture: videoTexture,
    emissiveTexture: videoTexture,
    emissiveColor: Color4.White(),
    emissiveIntensity: 1,
    })
    
    Transform.createOrReplace(sideScreenRight, {
    position: Vector3.create(-6.9, 0.7, -1.6),
    scale: Vector3.create(5, 3, 5),
    rotation: Quaternion.fromEulerDegrees(0, 180, 90),
    parent: sceneParent
    });
    
    MeshRenderer.setPlane(sideScreenRight);
    MeshCollider.setPlane(sideScreenRight);
    
    pointerEventsSystem.onPointerDown(
    {
    entity: sideScreenRight,
    opts: {
      button: InputAction.IA_POINTER,
      hoverText: "Play/Pause"
    }
    },
    function () {
    VideoPlayer.getMutable(sideScreenRight)
    VideoPlayer.getMutable(sideScreenRight).playing = !VideoPlayer.getMutable(sideScreenRight).playing
    }
    )
    
    }
    
    export function turnOffRoofScreens() {
    VideoPlayer.deleteFrom(mosaic
    );
    //VideoPlayer.deleteFrom(sideScreenLeft);
    //VideoPlayer.deleteFrom(sideScreenRight);
    }
    
    export function turnOnRoofScreens() {
    VideoPlayer.createOrReplace(mosaic, {
      src: videoSource,
      playing: true,
      volume: 1,
      loop: true //remove thisa
    });
    
    VideoPlayer.createOrReplace(sideScreenLeft, {
      src: videoSource,
      playing: true,
      volume: 1,
      loop: true 
    });
    VideoPlayer.createOrReplace(sideScreenRight, {
      src: videoSource,
      playing: true,
      volume: 1,
      loop: true 
    });
    
    }
    
 
    
    
    
    
    
    
    
    // Format time in HH:MM:SS format
    export function formatTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    // Update the countdown text every second
    //utils.timers.setInterval(updateCountdownText, 1000);