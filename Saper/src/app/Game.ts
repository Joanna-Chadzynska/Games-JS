/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Cell } from './Cell';
import { UI } from './Ui';

type Buttons = {
  modal?: null;
  easy: Element;
  normal: Element;
  expert: Element;
  reset?: null;
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
  cells: any[][];
  cellsElements: NodeListOf<Element>;
  board: null | Element;
  buttons: Buttons;

  constructor() {
    super();

    this.numberOfRows = null;
    this.numberOfCols = null;
    this.numberOfMines = null;
    this.cells = [];
    this.cellsElements;
    this.board = null;
    this.buttons = {
      easy: null,
      normal: null,
      expert: null
    };
  }

  start() {
    this.handleElements(); // get board element and other elements
    this.addButtonsEventListeners();
    this.newGame();
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

  private handleCellClick = (e: Event) => {
    const target = e.target;
    const rowIndex = Number(target.dataset?.y);
    const colIndex = Number(target.dataset.x);

    const cell = this.cells[rowIndex][colIndex];
    cell.revealCell();
  };
  private handleContextMenu = (e: Event) => {
    e.preventDefault();
    const target = e.target;
    const rowIndex = Number(target.dataset?.y);
    const colIndex = Number(target.dataset.x);

    const cell = this.cells[rowIndex][colIndex];
    if (cell.isReveal) return;

    cell.toggleFlag();
  };

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
  }

  private removeCellsEventListeners() {
    this.cellsElements.forEach((element) => {});
  }

  private handleNewGameClick(rows: number = null, cols: number = null, mines: number = null) {
    // this.removeCellsEventListeners();

    this.newGame(rows, cols, mines);
  }

  private newGame(
    rows: number = this.config.easy.rows,
    cols: number = this.config.easy.cols,
    mines: number = this.config.easy.mines
  ) {
    this.numberOfRows = rows;
    this.numberOfCols = cols;
    this.numberOfMines = mines;

    this.setStyles();
    // draw cells
    this.drawCells();
    this.renderBoard();
    this.cellsElements = this.getElements(this.UiSelectors.cell);

    this.addCellsEventListeners();
  }

  private setStyles() {
    document.documentElement.style.setProperty('--cells-in-row', `${this.numberOfCols}`);
  }

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
}
