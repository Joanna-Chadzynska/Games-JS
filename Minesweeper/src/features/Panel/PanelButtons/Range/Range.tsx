import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { setBubblePosition } from '../../../Game/utils';
import {
	RangeContainer,
	RangeWrap,
	BubbleRangeWrap,
	BubbleRange,
} from '../../styles';

export interface RangeProps {}

const Range: React.SFC<RangeProps> = () => {
	const dispatch = useDispatch();
	const game = useSelector((state: RootState) => state.game);
	return (
		<RangeContainer>
			<label>Columns</label>

			<RangeWrap>
				<span>9</span>
				<BubbleRangeWrap>
					<input
						// onChange={handleRangeChange}
						type='range'
						name='cols'
						id='cols'
						value={game.cols}
						min='9'
						max='30'
					/>
					<BubbleRange id='cols' left={setBubblePosition(game.cols, 9, 30)}>
						{/* {ranges.cols} */}
					</BubbleRange>
				</BubbleRangeWrap>

				<span>30</span>
			</RangeWrap>
		</RangeContainer>
	);
};

export default Range;
