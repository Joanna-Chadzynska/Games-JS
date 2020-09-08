/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { UI } from './Ui';

export class ResetButton extends UI {
  element = this.getElement(this.UiSelectors.resetButton);

  changeEmotion(emotion: string) {
    this.element.querySelector('use').setAttribute('xlink:href', `#img-${emotion}`);
  }
}
