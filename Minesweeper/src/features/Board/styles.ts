import styled from 'styled-components';

export const StyledBoard = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

export const StyledCell = styled.button`
	background-color: inherit;
	border: 1px solid black;
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
