/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { useModal } from './hooks/useModal';
import { GlobalStyle } from './assets/styles/globalStyles';
import Theme from './assets/styles/themes/theme';

import { Main } from './assets/styles/App.styles';
import { Header, Board, Panel } from './features';
import Modal from './components/Modal/Modal';

export type GameOptions = {
	easy: {
		cols: number;
		rows: number;
		mines: number;
	};
	normal: {
		cols: number;
		rows: number;
		mines: number;
	};
	expert: {
		cols: number;
		rows: number;
		mines: number;
	};
	custom: {
		cols: number;
		rows: number;
		mines: number;
	};
};

const App = () => {
	const game = useSelector((state: RootState) => state.game);
	const [showModal, setShowModal] = useState(false);

	const toggleModal = () => {
		if (showModal) {
			setShowModal(false);
		} else {
			setShowModal(true);
		}
	};
	const config: GameOptions = {
		easy: { cols: 9, rows: 9, mines: 10 },
		normal: { cols: 16, rows: 16, mines: 40 },
		expert: { cols: 30, rows: 16, mines: 99 },
		custom: { cols: 9, rows: 5, mines: 10 },
	};

	return (
		<Theme>
			<GlobalStyle />
			<Main cellsInRow={game.cols}>
				<Header config={config} />
				<Board config={config} />
				<Panel config={config} />
			</Main>
			{/* <Modal onClose={toggleModal} isOpen={game.isGameFinished ? true : false}>
				<h3>game result</h3>
			</Modal> */}
		</Theme>
	);
};

export default App;
