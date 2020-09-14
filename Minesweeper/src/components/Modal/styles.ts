import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ModalContainer = styled(motion.div)`
	background: azure;
	border: 5px solid black;
	height: 80vh;
	max-height: 100%;
	width: 90vh;
	max-width: 100%;
	overflow: auto;
	padding: 20px;
	text-align: center;
	z-index: 1010;
	position: relative;

	button {
		position: absolute;
		top: 5%;
		right: 5%;
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
