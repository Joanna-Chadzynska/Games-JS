import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { changeMaxMines, newGame } from '../../Game/gameSlice';
import { setBubblePosition } from '../../Game/utils';
import {
	RangeContainer,
	RangeWrap,
	BubbleRangeWrap,
	BubbleRange,
} from '../styles';

export interface CustomModalSelectProps {}

const CustomModalSelect: React.SFC<CustomModalSelectProps> = () => {
	const dispatch = useDispatch();
	const game = useSelector((state: RootState) => state.game);
	const [ranges, setRanges] = useState({
		cols: 9,
		rows: 9,
		mines: 10,
	});
	const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setRanges({
			...ranges,
			[name]: Number(value),
		});
		dispatch(changeMaxMines());
		dispatch(newGame(ranges));
	};
	return (
		<>
			<p>select custom properties</p>
			<RangeContainer>
				<label>Columns</label>

				<RangeWrap>
					<span>9</span>
					<BubbleRangeWrap>
						<input
							onChange={handleRangeChange}
							type='range'
							name='cols'
							id='cols'
							value={game.cols}
							min='9'
							max='30'
						/>
						<BubbleRange id='cols' left={setBubblePosition(game.cols, 9, 30)}>
							{ranges.cols}
						</BubbleRange>
					</BubbleRangeWrap>

					<span>30</span>
				</RangeWrap>
			</RangeContainer>

			<RangeContainer>
				<label>Rows</label>

				<RangeWrap>
					<span>9</span>

					<BubbleRangeWrap>
						<input
							onChange={handleRangeChange}
							type='range'
							name='rows'
							id='rows'
							value={game.rows}
							min='9'
							max='24'
						/>
						<BubbleRange id='rows' left={setBubblePosition(game.rows, 9, 24)}>
							{ranges.rows}
						</BubbleRange>
					</BubbleRangeWrap>

					<span>24</span>
				</RangeWrap>
			</RangeContainer>

			<RangeContainer>
				<label>Mines</label>

				<RangeWrap>
					<span>10</span>

					<BubbleRangeWrap>
						<input
							onChange={handleRangeChange}
							type='range'
							name='mines'
							id='mines'
							value={game.mines}
							min='10'
							max={game.maxMines}
						/>
						<BubbleRange
							id='mines'
							left={setBubblePosition(game.mines, 10, game.maxMines)}>
							{game.mines}
						</BubbleRange>
					</BubbleRangeWrap>

					<span>{game.maxMines}</span>
				</RangeWrap>
			</RangeContainer>
		</>
	);
};

export default CustomModalSelect;
