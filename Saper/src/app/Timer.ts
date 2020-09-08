/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { UI } from './Ui';

/* eslint-disable @typescript-eslint/no-empty-function */
export class Timer extends UI {
  private element: null | Element;
  private interval: null | any;
  numberOfSeconds: number;
  maxNumberOfSeconds: number;

  constructor() {
    super();
    this.numberOfSeconds = 0;
    this.maxNumberOfSeconds = 999;
    this.element = null;
    this.interval = null;
  }

  init() {
    this.element = this.getElement(this.UiSelectors.timer);
  }

  startTimer() {
    this.interval = setInterval(() => this.updateTimer(), 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
  }

  private updateTimer() {
    this.numberOfSeconds++;
    this.numberOfSeconds <= this.maxNumberOfSeconds ? this.setTimerValue(this.numberOfSeconds) : this.stopTimer();
  }

  private setTimerValue(value: number) {
    this.element.textContent = `${value}`;
  }
}
