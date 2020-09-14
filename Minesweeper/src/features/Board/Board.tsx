/* eslint-disable no-const-assign */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GameOptions } from '../../App';
import { RootState } from '../../app/store';
import {
	initBoardData,
	cellClick,
	setFlag,
	removeFlag,
} from '../Game/gameSlice';
import Cell from './Cell';
import { StyledBoard } from './styles';

export interface ICell {
	x: number;
	y: number;
	isRevealed: boolean;
	isMine: boolean;
	isFlagged: boolean;
	neighbour: number;
}

export type BoardProps = {
	config: GameOptions;
};
const Board: React.SFC<BoardProps> = React.memo(({ config }) => {
	const dispatch = useDispatch();
	const game = useSelector((state: RootState) => state.game);

	useEffect(() => {
		dispatch(initBoardData());
	}, [dispatch]);

	const handleContextMenu = (
		e: React.MouseEvent<HTMLButtonElement>,
		data: ICell
	) => {
		e.preventDefault();

		if (data.isRevealed) return;

		if (data.isFlagged) {
			dispatch(removeFlag(data));
			return;
		} else {
			dispatch(setFlag(data));
		}
	};

	return (
		<StyledBoard className='border border--convex'>
			{game.boardData !== undefined &&
				game.boardData.map((row, rowIndex) =>
					row.map((col, colIndex) => {
						return (
							<Cell
								key={`${col.x}-${col.y}`}
								handleRevealCell={() => dispatch(cellClick(col))}
								contextMenu={(e: React.MouseEvent<HTMLButtonElement>) =>
									handleContextMenu(e, col)
								}
								cell={col}></Cell>
						);
					})
				)}
		</StyledBoard>
	);
});

export default Board;
