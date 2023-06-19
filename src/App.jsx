import React, { createContext, useContext, useReducer } from 'react';
import './App.scss';
import { Main } from './Main';
import { computeExpandedWidth, createModel, createStategy, getColumns, getNavValues } from './utils';
import { AppContext, AppReducer } from './AppContext';

const strategies = new Array(5).fill('').map((_, i) => createStategy({name: `Strategy ${i +1}`}));
const models = new Array(3).fill('').map((_, i) => createModel({name: i == 0 ? 'Default' : `Model ${i}`}, i === 0));
const compares = strategies.slice(0, 3).map((strategy) => strategy.id);
const primaryNav = 'strategies';

const initialState = {
	...getNavValues({primaryNav}),
	strategies,
	models,
	compares,
	selectedStrategy: strategies[0]?.id || '',
	selectedModel: models[0]?.id || '',
	// selectedCritique: strategies[0]?.critiques[0]?.id || '',
	dialogData: {},
	expandedData: computeExpandedWidth({
		collapsedWidth: 58,
		...getColumns(primaryNav),
		// size: 4,
		// columns: [
		// 	{size: 1, expanded: true, collapsable: true, width: `${1/4 * 100}%`},
		// 	{size: 1, expanded: true, collapsable: true, width: `${1/4 * 100}%`},
		// 	{size: 2, expanded: true, collapsable: false, width: `${2/4 * 100}%`}
		// ]
	})
};

export const App = () => {
	const [state, dispatch] = useReducer(AppReducer, initialState);
	return (
		<AppContext.Provider value={{ state, dispatch }}>
			<Main />
		</AppContext.Provider>
	);
}

export const useApp = () => {
	const { state, dispatch } = useContext(AppContext);
	return { state, dispatch };
}

export default App;
