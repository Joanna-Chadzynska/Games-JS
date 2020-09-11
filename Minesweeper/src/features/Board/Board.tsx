import React, { useState, useEffect, useCallback } from 'react';
import Cell from './Cell';
import { StyledBoard } from './styles';

export interface BoardProps {
	cols: number;
	rows: number;
	mines: number;
}

export interface ICell {
	x: number;
	y: number;
	isRevealed: boolean;
	isMine: boolean;
	isFlagged: boolean;
	neighbour: number;
}

type Props = {
	(): [ICell, React.Dispatch<React.SetStateAction<ICell>>];
};

const Board: React.SFC<BoardProps> = React.memo(({ cols, rows, mines }) => {
	const [boardData, setBoardData] = useState<BoardProps>({
		cols,
		rows,
		mines,
	});
	const [gameStatus, setGameStatus] = useState(false);
	const [minesCount, setMinesCount] = useState(mines);
	const [cells, setCells] = useState<ICell[][]>();

	const create2DArray = useCallback((rows: number, cols: number) => {
		let arr: any[][] = [];

		for (let row = 0; row < rows; row++) {
			arr.push([]);
			for (let col = 0; col < cols; col++) {
				let cell: ICell = {
					x: col,
					y: row,
					isFlagged: false,
					isMine: false,
					isRevealed: false,
					neighbour: 0,
				};
				arr[row][col] = cell;
			}
		}

		return arr;
	}, []);

	const plantMines = (data: any, rows: number, cols: number, mines: number) => {
		let randomx,
			randomy,
			minesPlanted = 0;
		while (minesPlanted < mines) {
			randomx = getRandomNumber(rows);
			randomy = getRandomNumber(cols);
			if (!data[randomx][randomy].isMine) {
				data[randomx][randomy].isMine = true;
				minesPlanted++;
			}
		}

		return data;
	};

	const getNeigbours = (data: any, rows: number, cols: number) => {
		let updatedData = data;

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				if (data[i][j].isMine !== true) {
					let mine = 0;
					const area = traverseBoard(data[i][j].x, data[i][j].y, data);
					area.map((value) => {
						if (value.isMine) {
							mine++;
						}
					});
					if (mine === 0) {
						updatedData[i][j].isEmpty = true;
					}
					updatedData[i][j].neighbour = mine;
				}
			}
		}
		return updatedData;
	};

	const traverseBoard = (x: number, y: number, data: any) => {
		const el = [];

		//up
		if (x > 0) {
			el.push(data[x - 1][y]);
		}

		//down
		if (x < rows - 1) {
			el.push(data[x + 1][y]);
		}

		//left
		if (y > 0) {
			el.push(data[x][y - 1]);
		}

		//right
		if (y < cols - 1) {
			el.push(data[x][y + 1]);
		}

		// top left
		if (x > 0 && y > 0) {
			el.push(data[x - 1][y - 1]);
		}

		// top right
		if (x > 0 && y < cols - 1) {
			el.push(data[x - 1][y + 1]);
		}

		// bottom right
		if (x < rows - 1 && y < cols - 1) {
			el.push(data[x + 1][y + 1]);
		}

		// bottom left
		if (x < rows - 1 && y > 0) {
			el.push(data[x + 1][y - 1]);
		}

		return el;
	};

	const getRandomNumber = (dimension: number) =>
		Math.floor(Math.random() * 1000 + 1) % dimension;

	const cellClick = (c: number, r: number) => {
		if (!cells) return;

		let x = cells.map((row) => {
			row.map(({ x, y, isRevealed }) => {
				if (x === c && y === r) {
					cells[x][y].isRevealed = true;
				}
			});
		});

		console.log(x);
	};

	useEffect(() => {
		setCells(create2DArray(rows, cols));
		return () => setCells([]);
	}, [cols, rows]);

	return (
		<StyledBoard className='border border--convex'>
			{cells !== undefined &&
				cells.map((row, rowIndex) =>
					row.map((col, colIndex) => {
						const cellKey = `${col.x}-${col.y}`;
						return (
							<Cell
								key={cellKey}
								handleRevealCell={() => cellClick(col.x, col.y)}
								value={col}></Cell>
						);
					})
				)}
		</StyledBoard>
	);
});

export default Board;
