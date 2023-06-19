import React, { useMemo } from 'react';
import { Typography, Tabs, Tab } from '@mui/material';
import { useApp } from './App';
import { Column, ColumnHeader } from './Components';
import { color } from './styles';
import { ModelSelect } from './ModelSelect';


const OutputPanel = () => {
    const { state } = useApp();
    const {strategies, selectedStrategy, models, selectedModel} = state;
    const hasStrategies = strategies && strategies.length > 0;
    const strategy = hasStrategies && strategies.find(({id}) => id === selectedStrategy);
    const modelName = useMemo(
        () => models.find(model => model.id === selectedModel)?.name || 'no model name found'
        , [selectedModel]
    )
    return (
        <Typography><em>{`${strategy.name} output display using Model: ${modelName} goes here`}</em></Typography>
    )
}

const InfoPanel = () => {
    return (
        <Typography><em>{`Strategies help and info display goes here`}</em></Typography>
    )
}

const tabs = [
    {text: 'Output', value: 'output'},
    {text: 'Info', value: 'info'}
]

export const ColumnTertiary = ({outerSx, onToggleExpanded, index}) => {
    const { state, dispatch } = useApp();
    const {strategies, primaryNav, secondaryNav, tertiaryNav, selectedStrategy} = state;
    const hasStrategies = strategies && strategies.length > 0;
    const strategy = hasStrategies && strategies.find(({id}) => id === selectedStrategy);
    const PanelContent = tertiaryNav === 'output' ? OutputPanel : InfoPanel
    const columnStyle = {backgroundColor: color.column_tertiary};
    
    if (!selectedStrategy) {
        return (
            <Column sx={columnStyle} index={index}/>
        );
    }

    return (
        <Column
            sx={{...columnStyle}}
            {...(outerSx && {outerSx})}
            {...(onToggleExpanded && {onToggleExpanded})}
            index={index}
            header={(
                <ColumnHeader sx={{padding: 0, borderInlineEnd: 'none', justifyContent: 'space-between'}}>
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
                                            primaryNav,
                                            tertiaryNav: value,
                                        }
                                    })
                                }})}
                            >
                                {text}
                            </Tab>
                        ))}
                    </Tabs>
                    {tertiaryNav === 'output' && <ModelSelect />}
                </ColumnHeader>
            )}
        >
            <PanelContent />
        </Column>
    );
}
