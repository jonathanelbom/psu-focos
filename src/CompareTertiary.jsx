import React, { useMemo } from 'react';
import { Typography, Tabs, Tab } from '@mui/material';
import { useApp } from './App';
import { Column, ColumnHeader } from './Components';
import { color } from './styles';
import { ModelSelect } from './ModelSelect';

const OutputPanel = () => {
    const { state } = useApp();
    const {compares, strategies, models, selectedModel} = state;
    const modelName = useMemo(
        () => models.find(model => model.id === selectedModel)?.name || 'no model name found',
        [selectedModel]
    );
    const compareNames = useMemo(
        () => compares.map(id => strategies.find((strategy) => strategy.id === id)?.name || '[Strategy name not found]'),
        [compares.length]
    );
    
    return (
        <Typography><em>{`Output display comparing [${compareNames.join(', ')}] using Model: ${modelName} goes here`}</em></Typography>
    )
}


const InfoPanel = () => {
    return (
        <Typography><em>{`Compare help and info display goes here`}</em></Typography>
    )
}

const tabs = [
    {text: 'Output', value: 'output'},
    {text: 'Info', value: 'info'}
]

export const ColumnTertiary = ({outerSx, onToggleExpanded, index}) => {
    const { state, dispatch } = useApp();
    const {compares, primaryNav, tertiaryNav} = state;
    const PanelContent = tertiaryNav === 'output' ? OutputPanel : InfoPanel
    const columnStyle = {backgroundColor: color.column_tertiary};
    
    if (compares.length < 2) {
        return (
            <Column sx={columnStyle} index={index}>
                <Typography><em>{`Select 2 or more strategies on the left to compare.`}</em></Typography>
            </Column>
        )    
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
            // header={(
            //     <ColumnHeader sx={{padding: 0, borderInlineEnd: 'none', }}>
            //         {tertiaryNav === 'output' && <ModelSelect />}
            //     </ColumnHeader>
            // )}
        >
            <PanelContent />
        </Column>
    );
}
