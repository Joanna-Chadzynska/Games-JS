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
