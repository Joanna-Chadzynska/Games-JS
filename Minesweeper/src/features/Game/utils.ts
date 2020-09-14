import { ICell } from '../Board/Board';

export const create2DArray = (rows: number, cols: number) => {
	let arr: any[][] = [];

	for (let row = 0; row < rows; row++) {
		arr.push([]);
		for (let col = 0; col < cols; col++) {
			let cell: ICell = {
				x: col,
				y: row,
				isRevealed: false,
				isMine: false,
				isFlagged: false,
				neighbour: 0,
			};
			arr[row][col] = cell;
		}
	}

	return arr;
};

export const countMaxMines = (row: number, col: number) => {
	let width = col - 1;
	let height = row - 1;

	return width * height;
};

export const getRandomNumber = (dimension: number) =>
	Math.floor(Math.random() * 1000 + 1) % dimension;

export const setBubblePosition = (value: number, min: number, max: number) => {
	const minVal = min ? min : 0;
	const maxVal = max ? max : 100;
	const newVal = Number(((value - minVal) * 100) / (maxVal - minVal));

	return newVal;
};
