import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeMode, changeMaxMines } from '../Game/gameSlice';
import {
	StyledPanel,
	PanelButtons,
	RangeContainer,
	RangeWrap,
	BubbleRangeWrap,
	BubbleRange,
} from './styles';
import { CustomButton } from '../../styles/shared/CustomStyles';
import { GameOptions } from '../../App';
import { useModal } from '../../hooks/useModal';
import Modal from '../../components/Modal/Modal';
import { RootState } from '../../app/store';
import { setBubblePosition } from '../Game/utils';

export interface PanelProps {
	config: GameOptions;
}

const Panel: React.SFC<PanelProps> = memo(({ config }) => {
	const { toggleModal, showModal } = useModal();
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
		dispatch(changeMode(ranges));
	};

	const handleChangeMode = (e: React.MouseEvent<HTMLButtonElement>) => {
		const target = e.currentTarget.value;

		switch (target) {
			case 'normal':
				return dispatch(changeMode(config.normal));

			case 'expert':
				return dispatch(changeMode(config.expert));

			case 'custom':
				return console.log('custom');

			case 'easy':
			default:
				return dispatch(changeMode(config.easy));
		}
	};

	return (
		<StyledPanel className='game__panel border border--convex'>
			<header className='panel__header'>
				<h1 className='panel__heading'>Select Difficulty</h1>
			</header>
			<PanelButtons className='panel__buttons'>
				<CustomButton
					onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
						handleChangeMode(e)
					}
					className='button'
					data-button-easy
					value='easy'>
					Easy
				</CustomButton>
				<CustomButton
					onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
						handleChangeMode(e)
					}
					className='button'
					data-button-normal
					value='normal'>
					Normal
				</CustomButton>
				<CustomButton
					onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
						handleChangeMode(e)
					}
					className='button'
					data-button-expert
					value='expert'>
					Expert
				</CustomButton>
				<CustomButton
					onClick={toggleModal}
					className='button'
					data-button-custom
					value='custom'>
					Custom
				</CustomButton>
			</PanelButtons>
			<Modal isOpen={showModal} onClose={toggleModal}>
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
			</Modal>
		</StyledPanel>
	);
});

export default Panel;
