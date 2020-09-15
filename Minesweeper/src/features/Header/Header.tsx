import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GameOptions } from '../../App';
import { RootState } from '../../app/store';

import { newGame, setIntervalId, updateTimer } from '../Game/gameSlice';
import { StyledHeader, HeaderCounter, HeaderReset } from './styles';

export interface HeaderProps {
	config?: GameOptions;
}

const Header: React.SFC<HeaderProps> = memo(({ config }) => {
	const dispatch = useDispatch();

	const game = useSelector((state: RootState) => state.game);

	const handleResetGame = () => {
		dispatch(newGame({ cols: game.cols, rows: game.rows, mines: game.mines }));

		const interval = setInterval(() => {
			dispatch(updateTimer());
		}, 1000);
		dispatch(setIntervalId(interval));
	};

	return (
		<StyledHeader className=' border border--convex'>
			<HeaderCounter data-counter>{game.counter}</HeaderCounter>
			<HeaderReset
				className='border border--concave'
				data-button-reset
				onClick={handleResetGame}>
				{!game.isGameFinished ? (
					<span role='img' aria-label='happy emoji'>
						🙂
					</span>
				) : game.isWin ? (
					<span role='img' aria-label='happy emoji'>
						😎
					</span>
				) : (
					<span role='img' aria-label='happy emoji'>
						😞
					</span>
				)}
			</HeaderReset>
			<HeaderCounter data-timer>{game.timer.numberOfSeconds}</HeaderCounter>
		</StyledHeader>
	);
});

export default Header;
