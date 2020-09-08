/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Cell } from './Cell';
import { UI } from './Ui';
import { Counter } from './Counter';
import { Timer } from './Timer';
import { Modal } from './Modal';
import { ResetButton } from './ResetButton';

type Buttons = {
  easy: Element;
  normal: Element;
  expert: Element;
  reset?: ResetButton;
  modal?: Element;
};

type IGame = {
  numberOfRows: null | number;
  numberOfCols: null | number;
  numberOfMines: null | number;
  board: null | Element;
  buttons: Buttons;
  cells: any[][];
  cellsElements: NodeListOf<Element>;
  counter: Counter;
  modal: Modal;
  timer: Timer;
  isGameFinished: boolean;
  cellsToReveal: number;
  cellsRevealed: number;
};

/* eslint-disable @typescript-eslint/no-empty-function */
export class Game extends UI {
  private config = {
    easy: {
      rows: 8,
      cols: 8,
      mines: 10
    },
    normal: {
      rows: 16,
      cols: 16,
      mines: 40
    },
    expert: {
      rows: 16,
      cols: 30,
      mines: 99
    }
  };

  private numberOfRows: null | number;
  private numberOfCols: null | number;
  private numberOfMines: null | number;
  private board: null | Element;
  private buttons: Buttons;
  private cells: any[][];
  private cellsElements: NodeListOf<Element>;
  private counter: Counter;
  private modal: Modal;
  private timer: Timer;
  private isGameFinished: boolean;
  private cellsToReveal: number;
  private cellsRevealed: number;

  constructor() {
    super();
    this.numberOfRows = null;
    this.numberOfCols = null;
    this.numberOfMines = null;
    this.board = null;
    this.buttons = {
      easy: null,
      normal: null,
      expert: null,
      modal: null,
      reset: new ResetButton()
    };
    this.cells = [];
    this.cellsElements;
    this.counter = new Counter();
    this.modal = new Modal();
    this.timer = new Timer();
    this.isGameFinished = false;
    this.cellsToReveal = 0;
    this.cellsRevealed = 0;
  }

  start() {
    this.handleElements(); // get board element and other elements
    this.addButtonsEventListeners();
    this.counter.init();
    this.timer.init();
    this.newGame();
  }

  private newGame(
    rows: number = this.config.easy.rows,
    cols: number = this.config.easy.cols,
    mines: number = this.config.easy.mines
  ) {
    this.numberOfRows = rows;
    this.numberOfCols = cols;
    this.numberOfMines = mines;

    this.cellsToReveal = this.numberOfCols * this.numberOfRows - this.numberOfMines;

    this.counter.setValue(this.numberOfMines);
    this.setStyles();
    // draw cells
    this.drawCells();
    this.renderBoard();
    this.cellsElements = this.getElements(this.UiSelectors.cell);

    this.placeMinesInCells();

    this.addCellsEventListeners();
    this.timer.startTimer();
  }

  private endGame(isWin?: boolean) {
    this.isGameFinished = true;
    this.timer.stopTimer();

    if (!isWin) {
      this.revealMines();
    }
  }

  private handleElements() {
    this.board = this.getElement(this.UiSelectors.board);
    this.buttons.easy = this.getElement(this.UiSelectors.easyButton);
    this.buttons.normal = this.getElement(this.UiSelectors.normalButton);
    this.buttons.expert = this.getElement(this.UiSelectors.expertButton);
  }

  private addCellsEventListeners() {
    this.cellsElements.forEach((element) => {
      element.addEventListener('click', this.handleCellClick);
      element.addEventListener('contextmenu', this.handleContextMenu);
    });
  }

  private removeCellsEventListeners() {
    this.cellsElements.forEach((element) => {
      element.removeEventListener('click', this.handleCellClick);
      element.removeEventListener('contextmenu', this.handleContextMenu);
    });
  }

  private addButtonsEventListeners() {
    this.buttons.easy.addEventListener('click', () => {
      this.handleNewGameClick(this.config.easy.rows, this.config.easy.cols, this.config.easy.mines);
    });
    this.buttons.normal.addEventListener('click', () => {
      this.handleNewGameClick(this.config.normal.rows, this.config.normal.cols, this.config.normal.mines);
    });
    this.buttons.expert.addEventListener('click', () => {
      this.handleNewGameClick(this.config.expert.rows, this.config.expert.cols, this.config.expert.mines);
    });

    // add event listener to reset button
  }

  private handleNewGameClick(rows: number = null, cols: number = null, mines: number = null) {
    this.removeCellsEventListeners();
    this.newGame(rows, cols, mines);
  }

  private handleCellClick = (e: Event) => {
    const target: any = e.target;
    const rowIndex = Number(target.dataset?.y);
    const colIndex = Number(target.dataset.x);

    const cell = this.cells[rowIndex][colIndex];
    this.clickCell(cell);
  };

  private clickCell(cell: any) {
    if (this.isGameFinished || cell.isFlagged) return;
    if (cell.isMine) {
      this.endGame(false);
      console.log('bomb');
      return;
    }
    cell.revealCell();
    this.setCellValue(cell);
  }

  private revealMines() {
    this.cells
      .flat()
      .filter(({ isMine }) => isMine)
      .forEach((cell) => cell.revealCell());
  }

  private setCellValue(cell: any) {
    let minesCount = 0;

    for (let rowIndex = Math.max(cell.y - 1, 0); rowIndex <= Math.min(cell.y + 1, this.numberOfRows - 1); rowIndex++) {
      for (
        let colIndex = Math.max(cell.x - 1, 0);
        colIndex <= Math.min(cell.x + 1, this.numberOfCols - 1);
        colIndex++
      ) {
        if (this.cells[rowIndex][colIndex].isMine) minesCount++;
      }
    }

    cell.value = minesCount;
    cell.revealCell();

    if (!cell.value) {
      for (
        let rowIndex = Math.max(cell.y - 1, 0);
        rowIndex <= Math.min(cell.y + 1, this.numberOfRows - 1);
        rowIndex++
      ) {
        for (
          let colIndex = Math.max(cell.x - 1, 0);
          colIndex <= Math.min(cell.x + 1, this.numberOfCols - 1);
          colIndex++
        ) {
          const cell = this.cells[rowIndex][colIndex];
          if (!cell.isReveal) {
            this.clickCell(cell);
          }
        }
      }
    }
  }

  private handleContextMenu = (e: Event) => {
    e.preventDefault();
    const target: any = e.target;
    const rowIndex = Number(target.dataset?.y);
    const colIndex = Number(target.dataset.x);

    const cell = this.cells[rowIndex][colIndex];

    if (cell.isReveal || this.isGameFinished) return;

    if (cell.isFlagged) {
      this.counter.increment();
      cell.toggleFlag();
      return;
    }

    if (!!this.counter.value) {
      this.counter.decrement();
      cell.toggleFlag();
    }
  };

  private drawCells() {
    this.cells.length = 0;
    for (let row = 0; row < this.numberOfRows; row++) {
      this.cells[row] = [];

      for (let col = 0; col < this.numberOfCols; col++) {
        this.cells[row].push(new Cell(col, row));
      }
    }
  }

  private renderBoard() {
    while (this.board.firstChild) {
      this.board.removeChild(this.board.lastChild);
    }

    this.cells.flat().forEach((cell: Cell) => {
      this.board.insertAdjacentHTML('beforeend', cell.createElement());
      cell.element = cell.getElement(cell.selector);
    });
  }

  private placeMinesInCells() {
    let minesToPlace = this.numberOfMines;

    while (minesToPlace) {
      const rowIndex = Number(this.getRandomInteger(0, this.numberOfRows - 1));
      const colIndex = Number(this.getRandomInteger(0, this.numberOfCols - 1));
      const cell = this.cells[rowIndex][colIndex];
      const hasCellMine = cell.isMine;

      if (!hasCellMine) {
        cell.addMine();
        minesToPlace--;
      }
    }
  }

  private setStyles() {
    document.documentElement.style.setProperty('--cells-in-row', `${this.numberOfCols}`);
  }

  private getRandomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
