import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createDispatchHook, useDispatch } from 'react-redux';
import { GameOptions } from '../../App';
import { AppThunk, RootState } from '../../app/store';
import { CellViewModel } from '../Board/CellViewModel';
import { create2DArray } from './utils';

export interface ICell {
	x: number;
	y: number;
	isRevealed: boolean;
	isMine: boolean;
	isFlagged: boolean;
	neighbour: number;
}

export interface GameState {
	cols: number;
	rows: number;
	mines: number;
	isGameFinished: boolean;
	boardData: ICell[][];
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
	isGameFinished: false,
	boardData: [],
};

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		initBoardData: (state) => {
			let data = create2DArray(state.rows, state.cols);
			state.boardData = data;
		},
		changeMode: (state, action) => {
			const { cols, rows, mines } = action.payload;
			state.cols = cols;
			state.rows = rows;
			state.mines = mines;
			let data = create2DArray(state.rows, state.cols);
			state.boardData = data;
		},

		cellClick: (state, action: PayloadAction<ICell>) => {
			const { x, y } = action.payload;
			state.boardData[y][x].isRevealed = true;
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
	initBoardData,
	cellClick,
	setFlag,
	removeFlag,
	changeMode,
} = gameSlice.actions;

export default gameSlice.reducer;
