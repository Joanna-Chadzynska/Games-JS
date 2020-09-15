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
				isEmpty: true,
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

export const getRandomInteger = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

export const setBubblePosition = (value: number, min: number, max: number) => {
	const minVal = min ? min : 0;
	const maxVal = max ? max : 100;
	const newVal = Number(((value - minVal) * 100) / (maxVal - minVal));

	return newVal;
};

export const getNeighbours = (
	cell: ICell,
	rows: number,
	cols: number,
	cells: ICell[][],
	cellsRevealed: any
) => {
	let minesCount = 0;

	for (
		let rowIndex = Math.max(cell.y - 1, 0);
		rowIndex <= Math.min(cell.y + 1, rows - 1);
		rowIndex++
	) {
		for (
			let colIndex = Math.max(cell.x - 1, 0);
			colIndex <= Math.min(cell.x + 1, cols - 1);
			colIndex++
		) {
			if (cells[rowIndex][colIndex].isMine) minesCount++;
		}
	}
	revealCell(cell);
	cell.neighbour = minesCount;
	cellsRevealed.cellsRevealed++;
	cell.neighbour ? (cell.isEmpty = false) : (cell.isEmpty = true);

	if (!cell.neighbour) {
		for (
			let rowIndex = Math.max(cell.y - 1, 0);
			rowIndex <= Math.min(cell.y + 1, rows - 1);
			rowIndex++
		) {
			for (
				let colIndex = Math.max(cell.x - 1, 0);
				colIndex <= Math.min(cell.x + 1, cols - 1);
				colIndex++
			) {
				const cell = cells[rowIndex][colIndex];

				if (!cell.isRevealed) {
					getNeighbours(cell, rows, cols, cells, cellsRevealed);
				}
			}
		}
	}
};

export const revealCell = (cell: ICell) => (cell.isRevealed = true);

export const revealMines = (cells: ICell[][]) => {
	cells
		.flat()
		.filter((cell) => cell.isMine)
		.forEach((cell) => revealCell(cell));
};
