import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { canvasInfo } from './helperFunctions'
import { toggleStream } from './playlist'


let playlistOn = true
const musicIcon = 'images/toggleAudio.png'
const musicIconOff = 'images/toggleAudio-off.png'


export function toggleMusic() {
    return (
      <UiEntity key={'maintogglemusic'}
        uiTransform={{
          height: `${canvasInfo.height * .15}`,
          width: `${canvasInfo.height * .15}`,
          positionType: 'absolute',
          position: `90% 0 0 95%`,
          flexDirection: 'column',
          alignItems: 'center',
          maxHeight: `${canvasInfo.height * .05}`,
          maxWidth: `${canvasInfo.height * .05}`,
  
  
  
        }}
        onMouseDown={() => {
          toggleStream(), 
          playlistOn = !playlistOn }
        }
        uiBackground={{
          texture: { src: playlistOn? musicIcon : musicIconOff },
          textureMode: "stretch", uvs: [1, 1, 1, 1]
        }}
  
      >
      </UiEntity>
  
    );
  
  
  }