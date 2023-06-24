import React, { createContext, useContext, useReducer } from 'react';
import './App.scss';
import { Main } from './Main';
import { computeExpandedWidth, createModel, createStategy, getColumns, getNavValues } from './utils';
import { AppContext, AppReducer } from './AppContext';

const params = new URL(document.location).searchParams;
const initWithDemo = params.has('demo');
const strategies = initWithDemo ? new Array(5).fill('').map((_, i) => createStategy({name: `Strategy ${i +1}`}, true)) : [];
const models = initWithDemo ? new Array(2).fill('').map((_, i) => createModel({name: i == 0 ? 'Default' : `Model ${i}`}, i === 0)) : [createModel({name: 'Default'}, true)];
const compares = initWithDemo ? strategies.slice(0, 3).map((strategy) => strategy.id) : [];
const primaryNav = 'strategies';

const initialState = {
	...getNavValues({primaryNav}),
	strategies,
	models,
	compares,
	selectedStrategy: strategies[0]?.id || '',
	selectedModel: models[0]?.id || '',
	dialogData: {},
	expandedData: computeExpandedWidth({
		collapsedWidth: 58,
		...getColumns(primaryNav),
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
