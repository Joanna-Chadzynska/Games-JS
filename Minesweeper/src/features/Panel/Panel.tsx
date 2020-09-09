import React from 'react';
import { StyledPanel, PanelButtons } from './styles';
import { CustomButton } from '../../styles/shared/CustomStyles';

export interface PanelProps {}

const Panel: React.SFC<PanelProps> = () => {
	return (
		<StyledPanel className='game__panel border border--convex'>
			<header className='panel__header'>
				<h1 className='panel__heading'>Select Difficulty</h1>
			</header>
			<PanelButtons className='panel__buttons'>
				<CustomButton className='button' data-button-easy>
					Easy
				</CustomButton>
				<CustomButton className='button' data-button-normal>
					Normal
				</CustomButton>
				<CustomButton className='button' data-button-expert>
					Expert
				</CustomButton>
			</PanelButtons>
		</StyledPanel>
	);
};

export default Panel;
