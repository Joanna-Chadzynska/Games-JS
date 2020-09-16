import styled from 'styled-components';

export const StyledHeader = styled.header`
	display: flex;
	justify-content: space-between;
	padding: 0.8rem;
`;

export const HeaderCounter = styled.article`
	background-color: #000;
	color: ${({ theme }) => theme.colors.alarm};
	font-family: ${({ theme }) => theme.fonts.digitalDream};
	font-size: 3.2rem;
	min-width: 9rem;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 0.5rem;
`;

export const HeaderReset = styled.button`
	background-color: ${({ theme }) => theme.colors.primary.light};
	display: flex;
	align-items: center;
	justify-content: center;
	outline: none;

	span {
		width: 4.8rem;
		height: 4.8rem;
		font-size: 3rem;
	}
`;
