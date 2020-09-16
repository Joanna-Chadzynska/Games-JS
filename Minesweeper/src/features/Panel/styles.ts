import styled from 'styled-components';

type BubbleProps = {
	left?: any;
};

export const StyledPanel = styled.article`
	header {
		text-align: center;
		font-size: 2.6rem;
	}
`;

export const PanelButtonsContainer = styled.section`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
`;

export const PanelButton = styled.button`
	background: radial-gradient(ellipse at center, #00bfff 0%, #1e90ff 100%);
	border-color: #fff ${({ theme }) => theme.colors.primary.dark}
		${({ theme }) => theme.colors.primary.dark} #fff;
	flex: 1;
	padding: 0.875em 1em;
	font-size: 2.25rem;
	transition: transform 0.3s ease-in-out;

	&:hover {
		transform: scale(1.02);
	}
`;

export const RangeContainer = styled.fieldset`
	label {
		padding-bottom: 0.5em;
	}
	padding: 1em;
`;

export const RangeWrap = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 0.5em;
	margin: 0 auto 3rem;
	span {
		font-size: 2rem;
	}
`;

export const BubbleRangeWrap = styled.div`
	position: relative;
	width: 100%;
	align-self: center;
	input[type='range'] {
		width: 100%;
	}
`;

export const BubbleRange = styled.output<BubbleProps>`
	background: red;
	border-radius: 5px;
	color: white;
	padding: 4px 12px;
	position: absolute;
	top: 4.25rem;
	left: calc(${(props) => props.left}%);
	transform: translateX(-50%);

	&::after {
		content: '';
		position: absolute;
		width: 2px;
		height: 2px;
		background: red;
		top: -1px;
		left: 50%;
	}
`;
