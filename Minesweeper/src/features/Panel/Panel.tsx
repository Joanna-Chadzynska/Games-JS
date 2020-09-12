import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeMode } from '../Game/gameSlice';
import { StyledPanel, PanelButtons } from './styles';
import { CustomButton } from '../../styles/shared/CustomStyles';
import { GameOptions } from '../../App';
import { useModal } from '../../hooks/useModal';
import Modal from '../../components/Modal/Modal';
import { randomBytes } from 'crypto';

export interface PanelProps {
	config: GameOptions;
}

const Panel: React.SFC<PanelProps> = memo(({ config }) => {
	const { toggleModal, showModal } = useModal();

	const dispatch = useDispatch();

	const [ranges, setRanges] = useState({
		columns: 0,
		rows: 0,
		mines: 0,
	});
	const countMaxMines = (row: number, col: number) => {
		let width = col - 1;
		let height = row - 1;

		return width * height;
	};

	const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setRanges({
			...ranges,
			[name]: value,
		});
	};
	const min = countMaxMines(Number(ranges.rows), Number(ranges.columns));
	// console.log(min);

	const rangeParams = {
		cols: {
			minCols: 9,
			maxCols: 30,
		},
		rows: {
			minRows: 9,
			maxRows: 24,
		},
		mines: {
			minMines: 10,
			maxMines: countMaxMines(24, 30),
		},
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
				<fieldset>
					<label htmlFor='cols'>Columns</label>
					<input
						onChange={handleRangeChange}
						type='range'
						name='columns'
						id='cols'
						value={ranges.columns}
						min={rangeParams.cols.minCols}
						max={rangeParams.cols.maxCols}
					/>
					<output id='cols'>{ranges.columns}</output>
				</fieldset>
				<fieldset>
					<label htmlFor='rows'>Rows</label>
					<input
						onChange={handleRangeChange}
						type='range'
						name='rows'
						id='rows'
						value={ranges.rows}
						min={rangeParams.rows.minRows}
						max={rangeParams.rows.maxRows}
					/>
					<output id='rows'>{ranges.rows}</output>
				</fieldset>
				<fieldset>
					<label htmlFor='mines'>Mines</label>
					<input
						onChange={handleRangeChange}
						type='range'
						name='mines'
						id='mines'
						value={ranges.mines}
						min={rangeParams.mines.minMines}
						max={rangeParams.mines.maxMines}
					/>
					<output id='mines'>{ranges.mines}</output>
				</fieldset>
			</Modal>
		</StyledPanel>
	);
});

export default Panel;
