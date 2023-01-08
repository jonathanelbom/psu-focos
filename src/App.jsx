import React, { createContext, useContext, useReducer } from 'react';
import './App.scss';
import { Main } from './Main';
import { computeExpandedWidth, createCritique, createStategy, getSelected, makeId } from './utils';


const strategies = new Array(1).fill('').map(() => createStategy());
const initialState = {
	primaryNav: 'strategies',
	secondaryNav: 'strategy', // 'critiques', // 'strategy',
	tertiaryNav: 'output', // 'critiques', // 'strategy',
	strategies,
	selectedStrategy: strategies[0]?.id || '',
	selectedCritique: strategies[0]?.critiques[0]?.id || '',
	dialogData: {},
	expandedData: computeExpandedWidth({
		collapsedWidth: 58,
		size: 4,
		columns: [
			{size: 1, expanded: true, collapsable: true, width: `${1/4 * 100}%`},
			{size: 1, expanded: true, collapsable: true, width: `${1/4 * 100}%`},
			{size: 2, expanded: true, collapsable: false, width: `${2/4 * 100}%`}
		]
	})
};

export const AppContext = createContext();

const reducer = (state, action) => {
	const { type, value } = action;
	// console.log(type,'\nvalue:', value, '\n\n');
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
		case 'SET_SELECTED_CRITIQUE':
			return {
				...state,
				selectedCritique: value,
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
			console.log('value:', value);
			const strategy = createStategy(value || {});
			return {
				...state,
				selectedStrategy: strategy.id,
				strategies: [strategy, ...state.strategies]
			};
		case 'SET_PRACTICE':
			const {critiqueId, practice} = value;
			return {
				...state,
				selectedCritique: critiqueId,
				strategies: state.strategies.map((strategy) => (
					strategy.id === state.selectedStrategy
						? {
							...strategy,
							critiques: strategy.critiques.map((critique) => (
								critique.id === critiqueId
									?	{
										...critique,
										practice
									}
									: critique
							))
						}
						: strategy
				)),
			};
		case 'REMOVE_STRATEGY':
			const strategies = state.strategies.filter((strategy) => strategy.id !== value);
			// console.log('REMOVE_STRATEGY, value:', value, ', strategies:', strategies);
			// console.log(getSelected(strategies));
			return {
				...state,
				strategies,
				...(value === state.selectedStrategy && {
					selectedStrategy: '',
					selectedCritique: '',
				})
				// getSelected(strategies)),
				
			};
		case 'ADD_CRITIQUE':
			const critique = createCritique(state.selectedStrategy);
			return {
				...state,
				selectedCritique: critique.id,
				strategies: state.strategies.map((strategy) => (
					strategy.id === state.selectedStrategy
						? {
							...strategy,
							critiques: [
								critique,
								...strategy.critiques,
							]
						}
						: strategy
				)),
			};
		case 'REMOVE_CRITIQUE':
			return {
				...state,
				...(value === state.selectedCritique && {
					selectedCritique: '',
				}),
				strategies: state.strategies.map((strategy) => (
					strategy.id === state.selectedStrategy
						? {
							...strategy,
							critiques: strategy.critiques.filter((critique) => critique.id !== value)
						}
						: strategy
				)),
			};
		case 'LOG_STATE':
			console.log(JSON.stringify(state, null, 4))
			return {
				...state,
			};
		case 'SET_DIALOG_DATA':
			return {
				...state,
				dialogData: value,
			};
		case 'TOGGLE_EXPANDED':
			return {
				...state,
				expandedData: computeExpandedWidth(state.expandedData, value),
			};
		default:
			return {
				...state,
			};
	}
}

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
