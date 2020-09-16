import React from 'react';
import { ICell } from '../Game/gameSlice';
import { CellValue, StyledCell } from './styles';

export interface CellProps {
	handleRevealCell?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	contextMenu?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	cell: ICell;
}

const Cell: React.SFC<CellProps> = ({
	handleRevealCell,
	contextMenu,
	cell,
}) => {
	const getValue = () => {
		if (!cell.isRevealed) {
			return cell.isFlagged ? '🚩' : null;
		}
		if (cell.isMine) {
			return '💣';
		}
		if (cell.neighbour === 0) {
			return null;
		}
		return cell.neighbour;
	};

	return (
		<StyledCell
			className={
				cell.isRevealed ? 'border border--revealed' : 'border border--concave'
			}
			onClick={handleRevealCell}
			onContextMenu={contextMenu}
			data-x={cell.x}
			data-y={cell.y}
			cell={cell}
			role='button'>
			<CellValue value={cell.neighbour} cell={cell}>
				{getValue()}
			</CellValue>
		</StyledCell>
	);
};

export default Cell;
