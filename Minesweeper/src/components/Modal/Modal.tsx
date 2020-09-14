import React from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { ModalContainer, ModalOverlay } from './styles';

const modalRoot = document.getElementById('modal')! as HTMLDivElement;

type ModalProps = {
	isOpen: any;
	onClose: () => void;
};

const overlay = {
	visible: {
		opacity: 1,
	},
	hidden: {
		opacity: 0,
	},
};

const modal = {
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			delay: 0.5,
		},
	},
	hidden: {
		opacity: 0,
		y: '-100vh',
	},
};

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
	return (
		isOpen &&
		createPortal(
			<AnimatePresence exitBeforeEnter>
				<ModalOverlay
					variants={overlay}
					animate='visible'
					initial='hidden'
					exit='hidden'>
					<ModalContainer variants={modal} animate='visible' initial='hidden'>
						<section className='modal__content'>
							<div className='modal__text' data-modal-header>
								{children}
							</div>
						</section>
						<button
							className='modal__button'
							data-modal-button
							onClick={onClose}>
							X
						</button>
					</ModalContainer>
				</ModalOverlay>
			</AnimatePresence>,
			modalRoot
		)
	);
};

export default Modal;
