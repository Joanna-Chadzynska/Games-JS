import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GameOptions } from '../../App';
import { RootState } from '../../app/store';
import { newGame } from '../Game/gameSlice';
import { StyledHeader, HeaderCounter, HeaderReset } from './styles';

export interface HeaderProps {
	config?: GameOptions;
}

const Header: React.SFC<HeaderProps> = memo(({ config }) => {
	const dispatch = useDispatch();
	const game = useSelector((state: RootState) => state.game);
	console.log(game.cols);

	const handleResetGame = () => {
		dispatch(newGame({ cols: game.cols, rows: game.rows, mines: game.mines }));
	};
	return (
		<StyledHeader className=' border border--convex'>
			<HeaderCounter data-counter>{game.mines}</HeaderCounter>
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
			<HeaderCounter data-timer>000</HeaderCounter>
		</StyledHeader>
	);
});

export default Header;
