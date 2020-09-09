import React from 'react';

export interface ModalProps {}

const Modal: React.SFC<ModalProps> = () => {
	return (
		<article className='modal hide' data-modal>
			<section className='modal__content'>
				<h2 className='modal__text' data-modal-header>
					You won!
				</h2>
				<button className='modal__button' data-modal-button>
					Play again!
				</button>
			</section>
		</article>
	);
};

export default Modal;
