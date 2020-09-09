import * as React from 'react';
import { render } from 'react-dom';

import './assets/styles/main.scss';

type App = {
	hi?: string;
};

const App: React.SFC<App> = ({ hi }) => {
	return (
		<div className='container'>
			<h1>hello</h1>
			<p>{hi}</p>
		</div>
	);
};

export default App;

render(<App />, document.getElementById('app'));
