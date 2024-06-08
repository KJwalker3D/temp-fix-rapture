import { AudioStream, Entity, Transform, engine } from "@dcl/sdk/ecs";
import * as utils from '@dcl-sdk/utils'
import { Vector3 } from "@dcl/sdk/math";
import { isParty } from "./config";

let streamisJazz = true;
//let audioStreamEntity: Entity | null = null;

export const sourceEntity = engine.addEntity()
Transform.create(sourceEntity, {
  position: Vector3.create(0, 10, 32),
  scale: Vector3.create(10, 10, 10)
})

let audioStreamEntity = engine.addEntity();

export async function createStream() {
  AudioStream.createOrReplace(audioStreamEntity, {
    url: 'https://cast1.torontocast.com:2060/stream/1/',
    playing: true,
    volume: 0.8,
  });
}

export async function toggleStream() {
  if (streamisJazz && !isParty) {
    await stopStream();
    audioStreamEntity = engine.addEntity();
    AudioStream.createOrReplace(audioStreamEntity, {
      url: 'https://strw3.openstream.co/1487?aw_0_1st.collectionid%3D4682%26stationId%3D4682%26publisherId%3D1511%26k%3D1708457720',
      playing: true,
      volume: 0.3,
    });
    streamisJazz = false;
  } else if (!streamisJazz && !isParty) {
    await stopStream();
    audioStreamEntity = engine.addEntity();
    AudioStream.createOrReplace(audioStreamEntity, {
      url: 'https://cast1.torontocast.com:2060/stream/1/',
      playing: true,
      volume: 0.8,
    });
    streamisJazz = true;
  } else if (isParty) {
    let fetchStream = AudioStream.getMutableOrNull(audioStreamEntity)?.playing
    if (fetchStream) {
      stopStream()
    } else {
      createStream()
    }
    fetchStream = !fetchStream

  }
}

export async function stopStream() {
  if (audioStreamEntity) {
    AudioStream.deleteFrom(audioStreamEntity);
  }
}

export function followAvatar(entity: Entity) {
  let player = engine.PlayerEntity;
  if (!player) {
    return;
  }
  const intervalID = utils.timers.setInterval(() => {
    let playerPosition = Transform.get(player).position;
    Transform.createOrReplace(sourceEntity, {
      position: Vector3.create(playerPosition.x, playerPosition.y, playerPosition.z),
      scale: Vector3.create(10, 10, 10)
    });
  }, 2000);

  return intervalID;
}

export function clearFollowAvatar(intervalID: number | null) {
  if (intervalID !== null) {
    utils.timers.clearInterval(intervalID);
  }
}
