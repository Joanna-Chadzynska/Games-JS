/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

import './styles/app.scss';

import Theme from './styles/themes/theme';
import { Main } from './styles/App.styles';
import { GlobalStyle } from './styles/globalStyles';
import { Header, Board, Panel } from './features';

const App = () => {
	console.log('app');
	const [cols, setCols] = useState(9);
	const [rows, setRows] = useState(9);
	return (
		<Theme>
			<GlobalStyle />
			<Main cellsInRow={cols}>
				<Header />
				<Board cols={cols} rows={rows} />
				<Panel />
			</Main>
		</Theme>
	);
};

export default App;
