import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameOptions } from '../../App';
import { AppThunk, RootState } from '../../app/store';
import {
	countMaxMines,
	create2DArray,
	getNeighbours,
	getRandomInteger,
	revealCell,
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
};

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		newGame: (state, action) => {
			const { cols, rows, mines } = action.payload;
			state.isGameFinished = false;
			state.boardData = [];
			state.cols = cols;
			state.rows = rows;
			state.mines = mines;
			state.maxMines = countMaxMines(state.rows, state.cols);
			let data = create2DArray(state.rows, state.cols);
			state.boardData = data;

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
		},

		changeMaxMines: (state) => {
			state.maxMines = countMaxMines(state.rows, state.cols);
		},

		cellClick: (state, action: PayloadAction<ICell>) => {
			const { x, y } = action.payload;
			if (state.boardData[y][x].isFlagged || state.isGameFinished) return;

			if (state.boardData[y][x].isMine) {
				state.isWin = false;
				state.isGameFinished = true;
				revealMines(state.boardData);
			}

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
			}
		},

		setFlag: (state, action: PayloadAction<ICell>) => {
			const { x, y } = action.payload;
			if (!!state.mines) {
				state.boardData[y][x].isFlagged = true;
				state.mines -= 1;
			}
		},
		removeFlag: (state, action: PayloadAction<ICell>) => {
			const { x, y } = action.payload;
			state.boardData[y][x].isFlagged = false;
			state.mines += 1;
		},
	},
});

export const {
	newGame,
	cellClick,
	setFlag,
	removeFlag,
	changeMaxMines,
} = gameSlice.actions;

export default gameSlice.reducer;
