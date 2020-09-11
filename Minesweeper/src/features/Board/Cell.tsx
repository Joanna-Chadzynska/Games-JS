import React from 'react';
import { ICell } from './Board';
import { StyledCell } from './styles';

export interface CellProps {
	handleRevealCell: (e: React.MouseEvent<HTMLButtonElement>) => void;
	value: ICell;
}

const Cell: React.SFC<CellProps> = ({ handleRevealCell, value }) => {
	const getValue = () => {
		if (!value.isRevealed) {
			return value.isFlagged ? '🚩' : null;
		}
		if (value.isMine) {
			return '💣';
		}
		if (value.neighbour === 0) {
			return null;
		}
		return value.neighbour;
	};
	return (
		<StyledCell
			className={value.isRevealed ? 'border-revealed' : 'border--concave'}
			onClick={handleRevealCell}
			data-x={value.x}
			data-y={value.y}>
			{getValue()}
		</StyledCell>
	);
};

export default Cell;
