/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './styles/app.scss';

import Theme from './styles/themes/theme';
import { Main } from './styles/App.styles';
import { GlobalStyle } from './styles/globalStyles';
import { Header, Board, Panel } from './features';
import { RootState } from './app/store';

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
		</Theme>
	);
};

export default App;
