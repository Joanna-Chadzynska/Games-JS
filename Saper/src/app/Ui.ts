/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class UI {
  public UiSelectors = {
    board: '[data-board]',
    cell: '[data-cell]',
    counter: '[data-counter]',
    timer: '[data-timer]',
    easyButton: '[data-button-easy]',
    normalButton: '[data-button-normal]',
    expertButton: '[data-button-expert]',
    resetButton: '[data-button-reset]',
    modal: '[data-modal]',
    modalHeader: '[data-modal-header]',
    modalButton: '[data-modal-button]'
  };

  public getElement(selector: string) {
    return document.querySelector(selector);
  }
  public getElements(selector: string) {
    return document.querySelectorAll(selector);
  }
}
