/* eslint-disable @typescript-eslint/no-non-null-assertion */
import './vendor';

import { Game } from './components/game';

const newGame = new Game({
  lettersWrapper: document.getElementById('letters')! as HTMLDivElement,
  categoryWrapper: document.getElementById('category')! as HTMLDivElement,
  wordWrapper: document.getElementById('word')! as HTMLDivElement,
  outputWrapper: document.getElementById('output')! as HTMLDivElement
});

newGame.start();
