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

export const PanelButtons = styled.section`
	display: flex;
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
	color: white;
	padding: 4px 12px;
	position: absolute;
	border-radius: 5px;
	top: 4.25rem;
	left: calc(${(props) => props.left}%);
	/* left: ${(props) => props.left}%; */
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
