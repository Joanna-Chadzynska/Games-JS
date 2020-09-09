import React from 'react';
import { StyledHeader, HeaderCounter, HeaderReset } from './styles';

export interface HeaderProps {}

const Header: React.SFC<HeaderProps> = () => {
	return (
		<StyledHeader className=' border border--convex'>
			<HeaderCounter data-counter>0</HeaderCounter>
			<HeaderReset className='border border--concave' data-button-reset>
				reset
			</HeaderReset>
			<HeaderCounter data-timer>000</HeaderCounter>
		</StyledHeader>
	);
};

export default Header;
