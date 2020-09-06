/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class Quote {
  private readonly guessed: string[];

  constructor(public text: string) {
    this.guessed = [];
  }

  getContent() {
    let content = '';
    for (const char of this.text) {
      if (char == ' ' || this.guessed.includes(char)) {
        content += `&nbsp; ${char}`;
      } else {
        content += '_ ';
      }
    }

    return content;
  }

  guess(letter: string) {
    if (!this.text.includes(letter)) {
      return false;
    }
    this.guessed.push(letter);
    return true;
  }
}
