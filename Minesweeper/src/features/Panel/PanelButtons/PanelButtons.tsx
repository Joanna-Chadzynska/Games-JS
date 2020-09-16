import React from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../hooks/useModal';
import { newGame } from '../../Game/gameSlice';
import { GameOptions } from '../../../App';
import CustomModalSelect from './CustomModalSelect';
import Modal from '../../../components/Modal/Modal';
import PanelButtonItem from './PanelButtonItem';

import { PanelButton, PanelButtonsContainer } from '../styles';

export interface PanelButtonsProps {
	config: GameOptions;
}

const PanelButtons: React.SFC<PanelButtonsProps> = ({ config }) => {
	const { toggleModal, showModal } = useModal();
	const dispatch = useDispatch();

	const buttons = [
		{ id: 'easy', name: 'Easy' },
		{ id: 'normal', name: 'Normal' },
		{ id: 'expert', name: 'Expert' },
	];

	const handleChangeMode = (e: React.MouseEvent<HTMLButtonElement>) => {
		const target = e.currentTarget.value;

		switch (target) {
			case 'normal':
				return dispatch(newGame(config.normal));

			case 'expert':
				return dispatch(newGame(config.expert));

			case 'easy':
			default:
				return dispatch(newGame(config.easy));
		}
	};

	return (
		<PanelButtonsContainer>
			{buttons.map((button) => (
				<PanelButtonItem
					key={button.id}
					name={button.name}
					id={button.id}
					handleChange={handleChangeMode}
				/>
			))}
			<PanelButton onClick={toggleModal} value='custom'>
				Custom
			</PanelButton>
			<Modal isOpen={showModal} onClose={toggleModal}>
				<CustomModalSelect />
			</Modal>
		</PanelButtonsContainer>
	);
};

export default PanelButtons;
