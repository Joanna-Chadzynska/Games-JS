import React from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
	colors: {
		primary: {
			light: '#c0c0c0',
			dark: '#808080',
		},
		alarm: '#f80000',
		info: {
			one: '#0200fc',
			two: '#017e00',
			three: '#ff0000',
			four: '#010080',
			five: '#7f0300',
			six: '#008080',
			seven: '#000000',
			eight: '#808080',
		},
	},
	fonts: {
		digitalDream: 'DigitalDream',
	},
	gameSizes: {
		cellSize: '4rem',
		gamePadding: '1.5rem',
		borderWidth: '0.3rem',
	},
};

const Theme: React.SFC = ({ children }) => (
	<ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
