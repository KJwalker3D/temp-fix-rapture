import { setupUiInfoEngine } from './helperFunctions';
import { artDetailsUI } from './artHover.ui';
import ReactEcs, { ReactEcsRenderer, UiComponent } from '@dcl/sdk/react-ecs';
import { toggleMusic } from './playlist.ui';
import { isParty } from './config';

export function setupUi() {
  setupUiInfoEngine();
  ReactEcsRenderer.setUiRenderer((uiComponent as any) as UiComponent);
}

export const uiComponent = () => {
  const components = [
    artDetailsUI(),
    toggleMusic(),
  ];

  if (isParty) {
    // components.push(VLM.UI());
  }

  return components;
};



