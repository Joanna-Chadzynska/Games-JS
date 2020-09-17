import styled from 'styled-components';

type CellProps = {
	value?: number;
	cell?: {
		isMine: boolean;
		isRevealed: boolean;
		isFlagged: boolean;
	};
	isGameFinished?: boolean;
};

export const StyledBoard = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

export const StyledCell = styled.button<CellProps>`
	background: ${(props) =>
		props.cell?.isRevealed
			? props.theme.colors.primary.light
			: 'radial-gradient(ellipse at center, #00bfff 0%, #1e90ff 100%)'};
	border-radius: 5px;
	cursor: pointer;
	font-size: 2.4rem;
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${({ theme }) => theme.gameSizes.cellSize};
	height: ${({ theme }) => theme.gameSizes.cellSize};

	&:focus {
		background: ${({ cell, theme, isGameFinished }) =>
			isGameFinished ? theme.colors.alarm : ''};
	}
`;

export const CellValue = styled.span<CellProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${({ cell }) => (cell?.isFlagged ? 'gold' : '')};
	border: none;

	width: 100%;
	height: 100%;
	${(props) => {
		switch (props.value) {
			case 1:
				return `
                color: ${props.theme.colors.info.one};
               
            `;
			case 2:
				return `
                color: ${props.theme.colors.info.two};
                
            `;
			case 3:
				return `
                color: ${props.theme.colors.info.three};
               
            `;
			case 4:
				return `
                color: ${props.theme.colors.info.four};
               
            `;
			case 5:
				return `
                color: ${props.theme.colors.info.five};
               
            `;
			case 6:
				return `
                color: ${props.theme.colors.info.six};
               
            `;
			case 7:
				return `
                color: ${props.theme.colors.info.seven};
               
            `;
			case 8:
			default:
				return `
                color: ${props.theme.colors.info.eight};
               
            `;
		}
	}};
`;
