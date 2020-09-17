import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ModalContainer = styled(motion.div)`
	background: azure;
	height: 80vh;
	max-height: 100%;
	width: 90vh;
	max-width: 100%;
	overflow: auto;
	padding: 20px;
	text-align: center;
	z-index: 1010;
	position: relative;

	section {
		height: 100%;
	}

	button {
		background: #00bfff;
		background-image: linear-gradient(to bottom, #00bfff, #1e90ff);
		border: none;
		border-radius: 10px;
		box-shadow: 3px 3px 10px #666666;
		color: #ffffff;
		font-size: 1rem;
		padding: 0.75em 1.5em;
		text-shadow: 1px 1px 3px #666666;
		position: absolute;
		top: 5%;
		right: 5%;
		transition: 1s ease-in-out;

		&:hover {
			background: #3cb0fd;
			background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
		}
	}
`;

export const ModalOverlay = styled(motion.div)`
	background-color: rgba(0, 0, 0, 0.6);
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1000;
`;
