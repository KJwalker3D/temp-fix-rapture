let setupUiInfoEngineAlready = false
export let tieredModalScale = 1
export let tieredFontScale = 1
export let tieredModalTextWrapScale = 2

let devicePixelRatioScale: number = 1

export function setupEventDetailsUIScaling(inModalScale: number, inFontScale: number, inModalTextWrapScale: number) {
  tieredModalScale = inModalScale
  tieredFontScale = inFontScale
  tieredModalTextWrapScale = inModalTextWrapScale
}

export function updateUIScalingWithCanvasInfo(canvasInfo: { width: number, height: number, devicePixelRatio: number }) {
  devicePixelRatioScale = 1920 / 1080 / canvasInfo.devicePixelRatio

  const PIXEL_RATIO_THREADHOLD = 1.2

  if (canvasInfo.width > 1920 && canvasInfo.height > 1080) {
    tieredModalScale = 2
    tieredFontScale = 2
    tieredModalTextWrapScale = 1.08
  } else {
    tieredModalScale = 1.1
    tieredFontScale = 1.1
    tieredModalTextWrapScale = 0.9
  }

  const scale = canvasInfo.height / 1080
  setupEventDetailsUIScaling(scale, scale, scale)
}

export let canvasInfo = {
  width: 1920,
  height: 1080,
  devicePixelRatio: 1,
  interactableArea: undefined
}

export function setupUiInfoEngine() {
  if (setupUiInfoEngineAlready) return

  setupUiInfoEngineAlready = true

  // Use fixed values since UiCanvasInformation is not available
  const scale = 1
  canvasInfo.width = 1920
  canvasInfo.height = 1080
  canvasInfo.devicePixelRatio = 1
  canvasInfo.interactableArea = undefined

  setupEventDetailsUIScaling(scale, scale, scale)
}

export function splitTextIntoLines(text: string, maxLenght: number, maxLines?: number) {
  let finalText: string = ''
  for (let i = 0; i < text.length; i++) {
    let lines = finalText.split('\n')

    if (lines[lines.length - 1].length >= maxLenght && i !== text.length) {
      if (finalText[finalText.length - 1] !== ' ') {
        if (maxLines && lines.length >= maxLines) {
          finalText = finalText.concat('...')
          return finalText
        } else {
          finalText = finalText.concat('-')
        }
      }
      finalText = finalText.concat('\n')
      if (text[i] === ' ') {
        continue
      }
    }

    finalText = finalText.concat(text[i])
  }

  return finalText
}

export function cleanString(input: string) {
  var output = ''
  for (var i = 0; i < input.length; i++) {
    if (input.charCodeAt(i) <= 127 || (input.charCodeAt(i) >= 160 && input.charCodeAt(i) <= 255)) {
      output += input.charAt(i)
    }
  }
  return output
}

export function wordWrap(str: string, maxWidth: number, maxLines: number) {
  let newLineStr = '\n'
  let done = false
  let res = ''
  let linesSeparate = str.split(newLineStr)
  let lines = ''

  if (str.length > maxWidth) {
    for (let j = 0; j < linesSeparate.length; j++) {
      res = ''
      done = false
      while (linesSeparate[j].length > maxWidth) {
        let found = false
        for (let i = maxWidth - 1; i >= 0; i--) {
          if (testWhite(linesSeparate[j].charAt(i))) {
            res = res + [linesSeparate[j].slice(0, i), newLineStr].join('')
            if (testSlash(linesSeparate[j].charAt(i))) {
              linesSeparate[j] = linesSeparate[j].slice(i)
            } else {
              linesSeparate[j] = linesSeparate[j].slice(i + 1)
            }
            found = true
            break
          }
        }
        if (!found) {
          res += [linesSeparate[j].slice(0, maxWidth), newLineStr].join('')
          linesSeparate[j] = linesSeparate[j].slice(maxWidth)
        }
      }

      lines += res + linesSeparate[j] + '\n'
    }

    let finalLines = lines.split('\n')
    let croppedResult = ''

    for (let i = 0; i < maxLines && i < finalLines.length; i++) {
      if (i == maxLines - 1) {
        croppedResult += finalLines[i]
      } else {
        croppedResult += finalLines[i] + '\n'
      }
    }
    return croppedResult
  } else {
    return str
  }
}

function testWhite(x: string): boolean {
  var white = new RegExp(/^[\s/]+$/)
  return white.test(x.charAt(0))
}

function testSlash(x: string): boolean {
  var white = new RegExp(/^[/]+$/)
  return white.test(x.charAt(0))
}

export function shortenText(text: string, maxLenght: number) {
  let finalText: string = ''

  if (text.length > maxLenght) {
    finalText = text.substring(0, maxLenght)
    finalText = finalText.concat('...')
  } else {
    finalText = text
  }

  return finalText
}

export function breakLines(text: string, linelength: number) {
  const lineBreak = '\n'
  var counter = 0
  var line = ''
  var returnText = ''
  var bMatchFound = false
  const lineLen = linelength ? linelength : 50

  if (!text) return ''
  if (text.length < lineLen + 1) {
    return text
  }

  while (counter < text.length) {
    line = text.substring(counter, counter + lineLen)
    bMatchFound = false
    if (line.length == lineLen) {
      for (var i = line.length; i > -1; i--) {
        if (line.substring(i, i + 1) == ' ') {
          counter += line.substring(0, i).length
          line = line.substring(0, i) + lineBreak
          returnText += line
          bMatchFound = true
          break
        }
      }

      if (!bMatchFound) {
        counter += line.length
        line = line + lineBreak
        returnText += line
      }
    } else {
      returnText += line
      break
    }
  }

  return returnText
}

export function getRandomHexColor(): string {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
