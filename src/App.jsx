import React, { createContext, useContext, useReducer } from 'react';
import { DummyContent, Column, padding } from './Components';
import './App.scss';
import { Main } from './Main';

export const AppContext = createContext();

const reducer = (state, action) => {
	const { type } = action;
	switch (type) {
		case 'ADD_STRATEGY':
			return {
				...state,
				strategies: [...state.strategies, {}]
			};
		case 'ADD_STRATEGY':
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
const initialState = {
	tab: 'strategies',
	strategies: []
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
