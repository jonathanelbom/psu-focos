import React, { createContext, useContext, useReducer } from 'react';
import { useApp } from './App';
import { DummyContent, Column, padding } from './Components';

const Strategy = () => {

}

export const Strategies = () => {
    const { state, dispatch } = useApp();
    return (
        <div
            style={{
                height: '100%',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 2fr',
            }}
        >
            <Column
                style={{ backgroundColor: '#d2d3d5' }}
                footer={
                    <div style={{backgroundColor: '#0f0', height: '44px'}}>
                        {'Add new strategy'}
                    </div>
                }
            >
                <DummyContent />
            </Column>
            <Column style={{ backgroundColor: '#e2e3e5' }}>
                <DummyContent />
            </Column>
        </div>
    )
}
