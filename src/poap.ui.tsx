/*
export function poapUI() {
  if (poapInfo) {
    const pass = 'Secret Word: Hope'
    const description = 'To claim your POAP, download the POAP mobile app and enter the secret word: Hope. POAPs will be available from 9.30pm to 10pm UTC today. The secret word is case sensitive.'
    const passWrap = wordWrap(pass, 12 * tieredModalTextWrapScale, 6) 
    const descriptionWrap = breakLines(description, poapMaxChars)
    return (
      <UiEntity key={'poapmain'}
        uiTransform={{
          height: `${UiCanvasInformation.get(engine.RootEntity).height * .15}`,
          width: `${UiCanvasInformation.get(engine.RootEntity).width * .5}`,
          positionType: 'absolute',
          position: `2% 0 0 50%`,
          flexDirection: 'column',
          alignItems: 'center',
          maxHeight: '15%',
          maxWidth: '600px',
          minWidth: '600px',
          

        }}
        onMouseDown={togglePOAP}
        uiBackground={{
          texture: { src: artFrame }, 
          textureMode: "stretch", uvs: [1, 1, 1, 1]
        }}

      >
        {/* Label displaying Art Title */
          /*
        }
        <Label key={'poapTitle'}
          value={passWrap}
          fontSize={16 * tieredFontScale}
          font={titleFont}
          textAlign="middle-center"
          uiTransform={{
            width: 'auto',
            height: 'auto',
            alignSelf: 'stretch',
            margin: `0px 0px 0px ${UiCanvasInformation.get(engine.RootEntity).width * .0375}`,
            positionType: 'absolute',
            position: '-30% 0 0 0%',
          }}
          color={titleColor}
          onMouseDown={togglePOAP}
          
        />
        {/* Label displaying Art Details */
          /*
        }
        <Label key={'poapDetails'}
          value={descriptionWrap}
          fontSize={10 * tieredFontScale}
          font={descriptionFont}
          textAlign="middle-left"
          uiTransform={{
            width: 'auto',
            height: 'auto',
            alignSelf: 'stretch',
            margin: `10px 0px 0px ${UiCanvasInformation.get(engine.RootEntity).width * .0075}`,
            positionType: 'absolute',
            position: '15% 0 0 0%',
          }}
          color={descriptionColor}
          onMouseDown={togglePOAP}
        />
      </UiEntity>


    );

  }
}
*/
