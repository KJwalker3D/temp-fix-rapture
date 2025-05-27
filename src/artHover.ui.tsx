import { Color4, Vector3 } from "@dcl/ecs-math";
import { currentArtworkId, findArtworkById, hoverVisible, toggleHover } from "./Art/artHover";
import { wordWrap, tieredModalTextWrapScale, breakLines, tieredFontScale, canvasInfo } from "./helperFunctions";
import ReactEcs, { Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'


const Max_Chars = 60
const titleFontSize = 16;
const descriptionFontSize = 10

const titleFont = 'serif'
const descriptionFont = 'sans-serif'

const titleColor = Color4.White()
const descriptionColor = Color4.White()

const artFrame = 'images/artFrame.png'


// Set all Art Titles and Descriptions in artData.ts 

export function artDetailsUI() {
  if (hoverVisible) {
    const artwork = findArtworkById(currentArtworkId);
    if (artwork && artwork.visible) {
      const { title, description } = artwork;

      const artTitleWrap = wordWrap(title, Max_Chars, 1); // title: 1 line
      const artDescriptionWrap = breakLines(description, Max_Chars); // description: up to 55 chars per line

      return (
        <UiEntity
          key="art-main"
          uiTransform={{
            height: `${canvasInfo.height * 0.15}`,
            width: `${canvasInfo.width * 0.15}`, // Wider to accommodate text
            positionType: 'absolute',
            position: `5% 0 0 88%`,
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
          onMouseDown={toggleHover}
          uiBackground={{
            texture: { src: artFrame },
            textureMode: 'stretch',
            uvs: [1, 1, 1, 1]
          }}
        >
          <Label
            key="artTitle"
            value={artTitleWrap}
            fontSize={titleFontSize * tieredFontScale}
            font={titleFont}
            textAlign="top-left"
            uiTransform={{
              width: '100%',
              height: '25%',
              margin: '45px 10px 0 10px',
              alignSelf: 'flex-start',
            }}
            color={titleColor}
            onMouseDown={toggleHover}
          />
          <Label
            key="artDetails"
            value={artDescriptionWrap}
            fontSize={descriptionFontSize * tieredFontScale}
            font={descriptionFont}
            textAlign="top-left"
            uiTransform={{
              width: '100%',
              height: '75%',
              margin: '0px 10px 10px 10px',
              alignSelf: 'flex-start',
            }}
            color={descriptionColor}
            onMouseUp={toggleHover}
          />
        </UiEntity>
      );
    }
  }
  return null;
}
