import { UiCanvasInformation, engine } from "@dcl/ecs";
import { Color4, Vector3 } from "@dcl/ecs-math";
import { currentArtworkId, findArtworkById, hoverVisible, toggleHover } from "./Art/artHover";
import { wordWrap, tieredModalTextWrapScale, breakLines, tieredFontScale } from "./helperFunctions";
import ReactEcs, { Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'


const Max_Chars = 38
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
      const artTitleWrap = wordWrap(title, 20 * tieredModalTextWrapScale, 6)
      const artDescriptionWrap = breakLines(description, Max_Chars)


      return (
        <UiEntity key={'art-main'}
          uiTransform={{
            height: `${UiCanvasInformation.get(engine.RootEntity).height * .15}`,
            width: `${UiCanvasInformation.get(engine.RootEntity).width * .1}`,
            positionType: 'absolute',
            position: `5% 0 0 90%`,
            flexDirection: 'column',
            alignItems: 'center',
            maxHeight: `${UiCanvasInformation.get(engine.RootEntity).height * .15}`,
            maxWidth: `${UiCanvasInformation.get(engine.RootEntity).width * .1}`,


          }}
          onMouseDown={toggleHover}
          uiBackground={{
            texture: { src: artFrame },
            textureMode: "stretch", uvs: [1, 1, 1, 1]
          }}

        >
          {/* Label displaying Art Title */}
          <Label key={'artTitle'}
            value={artTitleWrap}
            fontSize={titleFontSize * tieredFontScale}
            font={titleFont}
            textAlign="middle-left"
            uiTransform={{
              width: 'auto',
              height: 'auto',
              alignSelf: 'stretch',
              margin: `-10px 0px 0px ${UiCanvasInformation.get(engine.RootEntity).width * .0075}`,
              positionType: 'absolute',
              position: '-25% 0 0 0%',
            }}
            color={titleColor}
            onMouseDown={toggleHover}

          />
          {/* Label displaying Art Details */}
          <Label key={'artDetails'}
            value={artDescriptionWrap}
            fontSize={descriptionFontSize * tieredFontScale}
            font={descriptionFont}
            textAlign="middle-left"
            uiTransform={{
              width: 'auto',
              height: 'auto',
              alignSelf: 'stretch',
              margin: `10px 0px 0px ${UiCanvasInformation.get(engine.RootEntity).width * .0075}`,
              positionType: 'absolute',
              position: '15% 0 0 0',
            }}
            color={descriptionColor}
            onMouseUp={toggleHover}
          />
        </UiEntity>


      );

    }
  }

}