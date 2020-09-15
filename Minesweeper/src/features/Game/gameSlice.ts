import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GameOptions } from '../../App';

import {
	countMaxMines,
	create2DArray,
	getNeighbours,
	getRandomInteger,
	revealMines,
} from './utils';

export interface ICell {
	x: number;
	y: number;
	isRevealed: boolean;
	isMine: boolean;
	isFlagged: boolean;
	neighbour: number;
	isEmpty: boolean;
}

export interface Timer {
	numberOfSeconds: number;
	maxNumberOfSeconds: number;
	interval: any;
	timeToReveal: number;
}

export interface GameState {
	cols: number;
	rows: number;
	mines: number;
	maxMines: number;
	isGameFinished: boolean;
	boardData: ICell[][];
	cell: ICell;
	cellsRevealed: number;
	cellsToReveal: number;
	isWin: boolean;
	timer: Timer;
	counter: number;
}

export interface CellProps {
	cols: number;
	rows: number;
	mines?: number;
}
export interface CellParams {
	row: number;
	col: number;
}

const config: GameOptions = {
	easy: { cols: 9, rows: 9, mines: 10 },
	normal: { cols: 16, rows: 16, mines: 40 },
	expert: { cols: 30, rows: 16, mines: 99 },
	custom: { cols: 9, rows: 5, mines: 10 },
};

const initialState: GameState = {
	cols: config.easy.cols,
	rows: config.easy.rows,
	mines: config.easy.mines,

	maxMines: config.easy.mines,
	isGameFinished: false,
	boardData: [],
	cell: {} as ICell,
	cellsToReveal: 0,
	cellsRevealed: 0,
	isWin: false,
	timer: {
		numberOfSeconds: 0,
		maxNumberOfSeconds: 999,
		interval: null,
		timeToReveal: 0,
	},
	counter: 0,
};

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		newGame: (state, action) => {
			const { cols, rows, mines } = action.payload;
			// reset before start
			state.isGameFinished = false;

			// create new board
			state.counter = mines;
			state.cols = cols;
			state.rows = rows;
			state.mines = mines;

			state.maxMines = countMaxMines(state.rows, state.cols);
			let data = create2DArray(state.rows, state.cols);
			state.boardData = data;

			// plant mines in cells
			let minesPlanted = 0;
			let minesToPlant = state.mines;

			while (minesPlanted < minesToPlant) {
				const rowIndex = getRandomInteger(0, state.rows - 1);
				const colIndex = getRandomInteger(0, state.cols - 1);

				if (state.boardData && !state.boardData[rowIndex][colIndex].isMine) {
					state.boardData[rowIndex][colIndex].isMine = true;
					minesPlanted++;
				}
			}
			state.cellsToReveal = state.rows * state.cols - state.mines;
			state.cellsRevealed = 0;
			state.timer.numberOfSeconds = 0;
		},
		updateTimer: (state) => {
			if (state.timer.numberOfSeconds <= state.timer.maxNumberOfSeconds) {
				state.timer.numberOfSeconds += 1;
			} else {
				state.timer.timeToReveal = state.timer.numberOfSeconds;
				clearInterval(state.timer.interval);

				return;
			}
		},
		stopTimer: (state, action) => {
			state.timer.numberOfSeconds = action.payload;
			console.log(action.payload);
		},
		resetTime: (state) => {
			state.timer.numberOfSeconds = 0;
		},
		setIntervalId: (state, action) => {
			state.timer.interval = action.payload;
		},
		changeMaxMines: (state) => {
			state.maxMines = countMaxMines(state.rows, state.cols);
		},

		cellClick: (state, action: PayloadAction<ICell>) => {
			const { x, y } = action.payload;
			if (state.boardData[y][x].isFlagged || state.isGameFinished) return;

			// check if cell has mine
			if (state.boardData[y][x].isMine) {
				state.isWin = false;
				state.isGameFinished = true;
				revealMines(state.boardData);
				state.timer.timeToReveal = state.timer.numberOfSeconds;
				clearInterval(state.timer.interval);
			}

			// set cell values
			getNeighbours(
				state.boardData[y][x],
				state.rows,
				state.cols,
				state.boardData,
				state
			);

			if (
				state.cellsRevealed === state.cellsToReveal &&
				!state.isGameFinished
			) {
				state.isWin = true;
				state.isGameFinished = true;
				state.timer.timeToReveal = state.timer.numberOfSeconds;
				clearInterval(state.timer.interval);
			}
		},

		setFlag: (state, action: PayloadAction<ICell>) => {
			const { x, y } = action.payload;
			if (!!state.mines) {
				state.boardData[y][x].isFlagged = true;
				state.counter -= 1;
			}
		},
		removeFlag: (state, action: PayloadAction<ICell>) => {
			const { x, y } = action.payload;
			state.boardData[y][x].isFlagged = false;
			state.counter += 1;
			return;
		},
	},
});

export const {
	newGame,
	cellClick,
	setFlag,
	removeFlag,
	changeMaxMines,
	updateTimer,
	resetTime,
	stopTimer,
	setIntervalId,
} = gameSlice.actions;

export default gameSlice.reducer;
