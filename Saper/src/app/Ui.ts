/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class UI {
  UiSelectors = {
    board: '[data-board]',
    cell: '[data-cell]',
    easyButton: '[data-button-easy]',
    normalButton: '[data-button-normal]',
    expertButton: '[data-button-expert]'
  };

  getElement(selector: string) {
    return document.querySelector(selector);
  }
  getElements(selector: string) {
    return document.querySelectorAll(selector);
  }
}
