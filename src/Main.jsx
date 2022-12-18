import React, { createContext, useContext, useReducer } from 'react';
import { useApp } from './App';
import { DummyContent, Column, padding } from './Components';
import { Strategies } from './Strategies';

const tabStyle = {
    padding,
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer'
};

const selectedTabStyle = {
    ...tabStyle,
    color: '#383838',
    backgroundColor: '#fff',
    cursor: 'default'
};

const TopNav = () => {
    const {state, dispatch} = useApp();
    const {tab} = state;
    const tabs = [
        {text: 'Explore', value: 'explore'},
        {text: 'Strategies', value: 'strategies'},
        {text: 'Compare', value: 'compare'}]
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateRows: 'min-content 12px',
                position: 'relative',
                zIndex: 1,
                boxShadow: '0 2px 8px rgba(0, 0, 0, .2)',
            }}
        >
            <div
                style={{
                    backgroundColor: '#383838',
                    display: 'flex',
                    alignItems: 'flex-end',
                }}
            >
                    <div
                        style={{
                            fontSize: '24px',
                            color: '#fff',
                            padding,
                            backgroundColor: '#282828',
                        }}
                    >
                        <strong>FOCOS</strong>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'flex-end',
                            padding: '0 32px',
                            flexGrow: 1,
                            justifyContent: 'flex-start'
                        }}
                    >
                        {tabs.map(({text, value}) => (
                            <div
                                key={text}
                                style={tab === value ? selectedTabStyle : tabStyle}
                                {...(tab !== value && {onClick: () => {
                                    dispatch({

                                    })
                                }})}
                            >
                                {text}
                            </div>
                        ))}
                    </div>
            </div>
            <div style={{backgroundColor: '#fff'}} />
        </div>
    )  
}

export const Main = () => {
  const {state, dispatch} = useApp();
  const {tab} = state;
  const MainContent = {
    'explore': () => <div>{'Explore'}</div>,
    'strategies': Strategies,
    'compare': () => <div>{'Explore'}</div>,
  }[tab]
  return (
    <div
        style={{
            height: '100vh',
            overflow: 'auto',
            display: 'grid',
            gridTemplateRows: 'min-content 1fr',
        }}
    >
        <TopNav />
        <div
            style={{
                backgroundColor: '#ccc',
                overflow: 'auto'
            }}
        >
            <MainContent/>
        </div>
    </div>
  );
}
