

import { engine, UiCanvasInformation } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
//import { createBaseAudio, playCurrentSong, playlist, playlistOn, removeBaseAudio, shufflePlaylist, stopCurrentSong } from './playlist'
import { breakLines, canvasInfo, setupUiInfoEngine, tieredFontScale, tieredModalTextWrapScale, wordWrap } from './helperFunctions'
import { toggleStream } from './playlist'
import { ArtworkData, artworkData } from './Art/artData'
import { currentArtworkId, findArtworkById, hoverVisible, toggleHover } from './Art/artHover'


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