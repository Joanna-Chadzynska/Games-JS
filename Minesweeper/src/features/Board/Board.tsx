import React, { useState, useEffect } from 'react';
import { StyledBoard, StyledCell } from './styles';

export interface BoardProps {
	cols: number;
	rows: number;
}

const Board: React.SFC<BoardProps> = React.memo(({ cols, rows }) => {
	const [cells, setCells] = useState<string[][]>();

	const create2DArray = (rows: number, cols: number) => {
		let arr: string[][] = [];
		for (let row = 0; row < rows; row++) {
			arr[row] = [];
			for (let col = 0; col < cols; col++) {
				arr[row].push(``);
			}
		}

		return arr;
	};

	useEffect(() => {
		console.log('use effect');
		setCells(create2DArray(rows, cols));
		return () => setCells([]);
	}, [cols, rows]);

	return (
		<StyledBoard>
			{cells !== undefined &&
				cells.map((row, rowIndex) =>
					row.map((col, colIndex) => (
						<StyledCell key={col.toString()}>{col}</StyledCell>
					))
				)}
		</StyledBoard>
	);
});

export default Board;
