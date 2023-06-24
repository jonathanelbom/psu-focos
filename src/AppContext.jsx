import { createContext } from 'react';
import { computeExpandedWidth, createModel, createStategy, getColumns, getNavValues } from './utils';

export const AppContext = createContext();

export const AppReducer = (state, action) => {
	const { type, value } = action;
	switch (type) {
		case 'SET_NAV':
			const {primaryNav, secondaryNav, tertiaryNav} = getNavValues(value);
            return {
				...state,
				primaryNav,
				secondaryNav,
				tertiaryNav,
				expandedData: computeExpandedWidth({
					collapsedWidth: 58,
					...getColumns(primaryNav),
				}),
			};
		case 'SET_SELECTED_STRATEGY':
			return {
				...state,
				selectedStrategy: value,
			};
		case 'TOGGLE_COMPARING':
			let _compares;
			const hasCompare = state.compares.includes(value);
			return !hasCompare
				? {
					...state,
					compares: [value, ...state.compares]
			} : {
				...state,
				compares: state.compares.filter((i) => i !== value)
			};
		case 'SET_SELECTED_MODEL':
			return {
				...state,
				selectedModel: value,
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
			const strategy = createStategy(value || {});
			return {
				...state,
				selectedStrategy: strategy.id,
				strategies: [...state.strategies, strategy]
			};
		case 'ADD_MODEL':
			const model = createModel(value || {});
			return {
				...state,
				selectedModel: model.id,
				models: [...state.models, model]
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
		case 'REMOVE_MODEL':
			const models = state.models.filter((model) => model.id !== value);
			// console.log('REMOVE_MODEL, value:', value, ', models:', models);
			// console.log(getSelected(strategies));
			return {
				...state,
				models,
                ...(state.selectedModel === value && {selectedModel: ''})
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