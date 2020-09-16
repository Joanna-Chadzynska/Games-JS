import React from 'react';
import { PanelButton } from '../styles';

export interface PanelButtonItemProps {
	name: string;
	id: string;
	handleChange: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PanelButtonItem: React.SFC<PanelButtonItemProps> = ({
	name,
	id,
	handleChange,
}) => {
	return (
		<PanelButton
			onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleChange(e)}
			value={id}>
			{name}
		</PanelButton>
	);
};

export default PanelButtonItem;
