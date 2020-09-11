/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

import './styles/app.scss';

import Theme from './styles/themes/theme';
import { Main } from './styles/App.styles';
import { GlobalStyle } from './styles/globalStyles';
import { Header, Board, Panel } from './features';

const App = () => {
	const [config, setConfig] = useState({
		cols: 9,
		rows: 5,
		mines: 10,
	});
	return (
		<Theme>
			<GlobalStyle />
			<Main cellsInRow={config.cols}>
				<Header />
				<Board cols={config.cols} rows={config.rows} mines={config.mines} />
				<Panel />
			</Main>
		</Theme>
	);
};

export default App;
