import React, { createContext, useContext, useReducer } from 'react';
import './App.scss';
import { DummyContent, Column, padding } from './Components';

export const AppContext = createContext();
const reducer = (state, action) => {
    const {type} = action;
    switch (type) {
        case 'ADD_STRATEGY':
          return (
            ...state,
            strategies: [...state.strategies, {}]
          );
        default:
            return {
                ...state,
            };
    }
}
const initialState = {
  strategies: []
};
export const AppProvider = ({ children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    );
}

export const useApp = () => {
  const {state, dispatch} = useContext(AppContext);
  return {state, dispatch};
}

const Main = () => {
  const {state, dispatch} = useApp();
  return (
    <div
      style={{
        height: '100vh',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '180px 1fr 1fr 2fr',
      }}
    >
      <Column
        style={{backgroundColor: '#383838'}}
        header={
          <div style={{fontSize: '30px', color: '#fff', padding}}><strong>FOCOS</strong></div>
        }
      >
        {/* <DummyContent /> */}
        <div
          style={{paddingTop: '60px'}}
        >
          {['Explore', 'Plan', 'Strategies', 'Compare', 'Critique'].map((section, i) => {
            const style = {padding: '16px', fontSize: '20px', color: '#fff'}
            return (
              <div
                style={{
                  ...style,
                  ...(i === 2 && {backgroundColor: '#d2d3d5', color: '#383838'})
                }}
              >
                {section}
              </div>
            )
          })}
        </div>
      </Column>
      <Column style={{backgroundColor: '#d2d3d5'}}>
        <DummyContent />
      </Column>
      <Column style={{backgroundColor: '#e2e3e5'}}>
        <DummyContent />
      </Column>
    </div>
  )
}

const App = () => {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
}

export default App;
