import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: {
			primary: {
				light: string;
				dark: string;
			};
			alarm: string;
			info: {
				one: string;
				two: string;
				three: string;
				four: string;
				five: string;
				six: string;
				seven: string;
				eight: string;
			};
		};
		fonts: {
			digitalDream: string;
		};
		gameSizes: {
			cellSize: string;
			gamePadding: string;
			borderWidth: string;
		};
	}
}
