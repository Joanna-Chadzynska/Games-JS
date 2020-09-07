/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Cell } from './Cell';
import { UI } from './Ui';

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
  numberOfRows: null | number;
  private numberOfCols: null | number;
  private numberOfMines: null | number;
  cells: any[][];
  board: null | Element;

  constructor() {
    super();
    this.cells = [];
  }

  start() {
    this.handleElements();
    this.newGame();
  }

  private handleElements() {
    this.board = this.getElement(this.UiSelectors.board);
  }

  private newGame(
    rows: number = this.config.easy.rows,
    cols: number = this.config.easy.cols,
    mines: number = this.config.easy.mines
  ) {
    this.numberOfRows = rows;
    this.numberOfCols = cols;
    this.numberOfMines = mines;
    this.drawCells();
    this.renderBoard();
  }

  private drawCells() {
    for (let row = 0; row < this.numberOfRows; row++) {
      this.cells[row] = [];

      for (let col = 0; col < this.numberOfCols; col++) {
        this.cells[row].push(new Cell(col, row));
      }
    }
  }

  private renderBoard() {
    this.cells.flat().forEach((cell: Cell) => {
      this.board.insertAdjacentHTML('beforeend', cell.createElement());
      cell.element = cell.getElement(cell.selector);
    });
  }
}
