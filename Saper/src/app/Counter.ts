/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { UI } from './Ui';

/* eslint-disable @typescript-eslint/no-empty-function */
export class Counter extends UI {
  public value: null | number;
  private element: null | Element;

  constructor() {
    super();
    this.value = null;
    this.element = null;
  }

  init() {
    this.element = this.getElement(this.UiSelectors.counter);
  }

  setValue(value: number) {
    this.value = value;
    this.updateValue();
  }

  increment() {
    this.value++;
    this.updateValue();
  }

  decrement() {
    this.value--;
    this.updateValue();
  }

  private updateValue() {
    this.element.textContent = `${this.value}`;
  }
}
