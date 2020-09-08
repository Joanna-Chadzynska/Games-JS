/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { UI } from './Ui';

export class Modal extends UI {
  buttonText: string;
  infoText: string;
  element: Element;
  button: Element;
  header: Element;

  constructor() {
    super();
    this.buttonText = '';
    this.infoText = '';
    this.element = this.getElement(this.UiSelectors.modal);
    this.button = this.getElement(this.UiSelectors.modalButton);
    this.header = this.getElement(this.UiSelectors.modalHeader);
  }

  toggleModal = () => {
    this.element.classList.toggle('hide');
  };

  setText() {
    this.header.textContent = this.infoText;
    this.button.textContent = this.buttonText;
  }
}
