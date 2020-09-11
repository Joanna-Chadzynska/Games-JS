import styled from 'styled-components';

type CellProps = {
	isRevealed?: boolean;
};

export const StyledBoard = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

export const StyledCell = styled.button<CellProps>`
	background-color: inherit;
	cursor: pointer;
	width: 4rem;
	height: 4rem;
	background-size: 2rem;
	background-position: center;
	background-repeat: no-repeat;
	font-size: 2.4rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;
