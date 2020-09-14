import React from 'react';
import { StyledHeader, HeaderCounter, HeaderReset } from './styles';

export interface HeaderProps {
	mines: number;
}

const Header: React.SFC<HeaderProps> = ({ mines }) => {
	return (
		<StyledHeader className=' border border--convex'>
			<HeaderCounter data-counter>{mines}</HeaderCounter>
			<HeaderReset className='border border--concave' data-button-reset>
				<span role='img' aria-label='happy emoji'>
					🙂
				</span>
			</HeaderReset>
			<HeaderCounter data-timer>000</HeaderCounter>
		</StyledHeader>
	);
};

export default Header;
