import React from 'react';
import { Box, Card, IconButton, Typography, Tabs, Tab, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { AddCircle, Delete } from '@mui/icons-material';
import { useApp } from './App';
import { Column, ColumnHeader, ColumnFooter, InputSlider } from './Components';
import { button, card, color } from './styles';
import { practices, slidersForDisplay } from './utils';

const CritiquePanel = () => {
    const { state, dispatch } = useApp();
    const {strategies, secondaryNav, tertiaryNav, selectedStrategy, selectedCritique} = state;
    const hasStrategies = strategies && strategies.length > 0;
    const strategy = hasStrategies && strategies.find(({id}) => id === selectedStrategy);
    const {critiques} = strategy || {};
    const critique = critiques && critiques.find(({id}) => id === selectedCritique);
    const {practice} = critique || {};

    if (!practice) {
        
    }

    return (
        <Typography><em>{`Critique ${tertiaryNav === 'output' ? 'output display' : 'model editor'} goes here`}</em></Typography>
    )
}

const StrategyPanel = () => {
    const { state, dispatch } = useApp();
    const {strategies, secondaryNav, tertiaryNav, selectedStrategy, selectedCritique} = state;
    const hasStrategies = strategies && strategies.length > 0;
    const strategy = hasStrategies && strategies.find(({id}) => id === selectedStrategy);
    
    return (
        <Typography><em>{`Strategy ${tertiaryNav === 'output' ? 'output display' : 'info editor'} goes here`}</em></Typography>
    )
}

export const ColumnTertiary = ({outerSx, onToggleExpanded, index}) => {
    const { state, dispatch } = useApp();
    const {strategies, secondaryNav, tertiaryNav, selectedStrategy, selectedCritique} = state;
    const hasStrategies = strategies && strategies.length > 0;
    const strategy = hasStrategies && strategies.find(({id}) => id === selectedStrategy);
    const {critiques} = strategy || {};
    const critique = critiques && critiques.find(({id}) => id === selectedCritique);
    const tabs = {
        strategy: [
            {text: 'Output', value: 'output'},
            {text: 'Info', value: 'info'}
        ],
        critiques: [
            {text: 'Model', value: 'model'},
            {text: 'Output', value: 'output'},
        ]
    }[secondaryNav];
    const PanelContent = {
        strategy: StrategyPanel,
        critiques: CritiquePanel,
    }[secondaryNav];
    const columnStyle = {backgroundColor: color.column_tertiary};
    
    if (!selectedStrategy || (secondaryNav === 'critiques' && !selectedCritique)) {
        return (
            <Column sx={columnStyle} index={index}/>
        );
    }

    if (secondaryNav === 'critiques' && critique && !critique?.practice) {
        return (
            <Column sx={columnStyle} index={index}>
                <Typography><em>{'Select a Practice to critique from the dropdown in the highlighted Critique on the left'}</em></Typography>
            </Column>
        );
    }

    return (
        <Column
            sx={{...columnStyle}}
            {...(outerSx && {outerSx})}
            {...(onToggleExpanded && {onToggleExpanded})}
            index={index}
            header={(
                <ColumnHeader sx={{padding: 0, borderInlineEnd: 'none'}}>
                    <Tabs
                        value={tertiaryNav}
                        onChange={() => {}}
                        centered
                        aria-label="tertiary navigation tabs"
                    >
                        {tabs.map(({text, value}) => (
                            <Tab
                                label={text}
                                key={text}
                                value={value}
                                {...(tertiaryNav !== value && {onClick: () => {
                                    dispatch({
                                        type: 'SET_NAV',
                                        value: {
                                            tertiaryNav: value,
                                        }
                                    })
                                }})}
                            >
                                {text}
                            </Tab>
                        ))}
                    </Tabs>
                </ColumnHeader>
            )}
        >
            <PanelContent />
        </Column>
    );
}
