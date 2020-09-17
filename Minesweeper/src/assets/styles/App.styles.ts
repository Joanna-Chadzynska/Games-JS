import styled from 'styled-components';

type GameProps = {
	cellsInRow?: number;
};

export const Main = styled.main<GameProps>`
	background-color: ${({ theme }) => theme.colors.primary.light};
	margin: 0 auto;
	padding: ${({ theme }) => theme.gameSizes.gamePadding};
	min-width: calc(
		${({ theme }) => theme.gameSizes.cellSize} *
			${(props) => (props.cellsInRow ? props.cellsInRow : 9)} + calc(2 * 1.5rem) +
			calc(2 * 0.3rem)
	);
	max-width: calc(
		${({ theme }) => theme.gameSizes.cellSize} *
			${(props) => (props.cellsInRow ? props.cellsInRow : 9)} + calc(2 * 1.5rem) +
			calc(2 * 0.3rem)
	);
`;
