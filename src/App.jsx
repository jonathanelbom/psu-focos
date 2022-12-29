import React, { createContext, useContext, useReducer } from 'react';
import './App.scss';
import { Main } from './Main';
import { createCritique, createStategy, makeId } from './utils';

export const AppContext = createContext();

const reducer = (state, action) => {
	const { type, value } = action;
	switch (type) {
		case 'SET_NAV':
			return {
				...state,
				...value,
			};
		case 'SET_SELECTED_STRATEGY':
			return {
				...state,
				selectedStrategy: value,
			};			
		case 'UPDATE_STRATEGY':
			return {
				...state,
				strategies: state.strategies.map((strategy) => (
					strategy.id === state.selectedStrategy
						? value
						: strategy
				))
			};
		case 'ADD_STRATEGY':
			return {
				...state,
				strategies: [...state.strategies, {}]
			};
		case 'REMOVE_STRATEGY':
			return {
				...state,
				strategies: [...state.strategies, {}]
			};
		case 'ADD_CRITIQUE':
			return {
				...state,
				strategies: [...state.strategies, {}]
			};
		case 'REMOVE_CRITIQUE':
			return {
				...state,
				strategies: [...state.strategies, {}]
			};
		default:
			return {
				...state,
			};
	}
}

const strategies = new Array(5).fill('').map(() => createStategy());
const initialState = {
	primaryNav: 'strategies',
	secondaryNav: 'strategy',
	strategies,
	selectedStrategy: strategies[0].id,
};

export const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
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
