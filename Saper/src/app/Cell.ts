import { UI } from './Ui';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class Cell extends UI {
  selector: string;
  value: number;
  isMine: boolean;
  isReveal: boolean;
  isFlagged: boolean;
  element: null | Element;

  constructor(public x: number, public y: number) {
    super();
    this.value = 0;
    this.isMine = false;
    this.isReveal = false;
    this.isFlagged = false;
    this.selector = `[data-x="${this.x}"][data-y="${this.y}"]`;
    this.element = null;
  }

  createElement() {
    const element = `<div class="cell border__game border__game--concave" data-cell data-x="${this.x}" data-y="${this.y}"></div>`;
    return element;
  }

  revealCell() {
    this.isReveal = true;
    this.element.classList.remove('border__game--concave');
    this.element.classList.add('border__game--revealed');

    if (this.isMine) {
      this.element.classList.add('cell--is-mine');
      return;
    }
    if (this.value) {
      this.element.textContent = `${this.value}`;
      this.element.classList.add(`cell-info-${this.value}`);
    }
  }

  toggleFlag() {
    this.isFlagged = !this.isFlagged;
    this.element.classList.toggle('cell--is-flag');
  }

  addMine() {
    this.isMine = true;
  }
}
