/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class UI {
  UiSelectors = {
    board: '[data-board]',
    cell: '[data-cell]'
  };

  getElement(selector: string) {
    return document.querySelector(selector);
  }
  getElements(selector: string) {
    return document.querySelectorAll(selector);
  }
}
