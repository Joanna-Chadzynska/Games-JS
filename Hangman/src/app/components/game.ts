/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Quote } from './quote';

/* eslint-disable @typescript-eslint/no-empty-function */
type Start = {
  lettersWrapper: HTMLDivElement;
  categoryWrapper: HTMLDivElement;
  wordWrapper: HTMLDivElement;
  outputWrapper: HTMLDivElement;
};

type IQuote = {
  category: string;
  text: string;
};

const quotes = [
  { category: 'animal', text: 'gecko' },
  { category: 'animal', text: 'bobcat' },
  { category: 'animal', text: 'dolphin' },
  { category: 'animal', text: 'squirrel' },
  { category: 'animal', text: 'cobra' },
  { category: 'animal', text: 'parrot' },
  { category: 'plant', text: 'cactus' },
  { category: 'plant', text: 'moss' },
  { category: 'plant', text: 'lily' },
  { category: 'plant', text: 'yucca' },
  { category: 'plant', text: 'orchid' },
  { category: 'plant', text: 'ivy' },
  { category: 'food', text: 'pizza' },
  { category: 'food', text: 'hummus' },
  { category: 'food', text: 'pho' },
  { category: 'food', text: 'waffle' },
  { category: 'food', text: 'burger' },
  { category: 'food', text: 'lasagna' },
  { category: 'country', text: 'japan' },
  { category: 'country', text: 'canada' },
  { category: 'country', text: 'vietnam' },
  { category: 'country', text: 'brazil' },
  { category: 'country', text: 'russia' },
  { category: 'country', text: 'denmark' }
];

export class Game {
  letters: HTMLDivElement;
  category: HTMLDivElement;
  word: HTMLDivElement;
  output: HTMLDivElement;
  quotes: IQuote[];
  quote: Quote;
  currentStep: number;
  lastStep: number;

  constructor(start: Start) {
    this.category = start.categoryWrapper;
    this.letters = start.lettersWrapper;
    this.output = start.outputWrapper;
    this.word = start.wordWrapper;
    this.quotes = quotes;
    const { text, category } = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    this.category.innerHTML = `${category}`;
    this.quote = new Quote(text);
    this.currentStep = 0;
  }

  guess(letter: string, event: Event) {
    event.target.disabled = true;
    if (this.quote.guess(letter)) {
      this.drawQuote();
    } else {
      this.currentStep++;
      document.getElementsByClassName('step')[this.currentStep - 1].classList.remove('hidden');
      if (this.currentStep === 7) {
        this.checkLoss();
      }
    }
  }

  drawLetters() {
    for (let i = 0; i < 26; i++) {
      const label = (i + 10).toString(36);
      const button = document.createElement('button') as HTMLButtonElement;
      button.innerHTML = `${label}`;
      button.className = 'btn btn-warning m-2';
      button.addEventListener('click', (e: Event) => this.guess(label, e));
      this.letters.appendChild(button);
    }
  }

  drawQuote() {
    const content = this.quote.getContent();
    this.word.innerHTML = `${content}`;
    if (!content.includes('_')) {
      this.checkWin();
    }
  }

  start() {
    this.drawLetters();
    this.drawQuote();
  }

  checkWin() {
    this.word.innerHTML = `Win!`;
    this.letters.innerHTML = '';
  }

  checkLoss() {
    this.word.innerHTML = `Loss!`;
    this.letters.innerHTML = '';
  }
}
