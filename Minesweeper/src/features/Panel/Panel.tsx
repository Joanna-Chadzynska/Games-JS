import React, { memo } from 'react';
import PanelButtons from './PanelButtons';
import { StyledPanel } from './styles';
import { GameOptions } from '../../App';

export interface PanelProps {
	config: GameOptions;
}

const Panel: React.SFC<PanelProps> = memo(({ config }) => {
	return (
		<StyledPanel className='border border--convex'>
			<header>
				<h1>Select Difficulty</h1>
			</header>

			<PanelButtons config={config} />
		</StyledPanel>
	);
});

export default Panel;
