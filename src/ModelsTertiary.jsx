import React, { useMemo } from 'react';
import { Box, Card, IconButton, Typography, Tabs, Tab, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { AddCircle, Delete } from '@mui/icons-material';
import { useApp } from './App';
import { Column, ColumnHeader, ColumnFooter, InputSlider } from './Components';
import { button, card, color } from './styles';
import { practices, slidersForDisplay } from './utils';
import { ModelSelect } from './ModelSelect';

const ConfigurationPanel = () => {
    const { state } = useApp();
    const {models, selectedModel} = state;
    const modelName = useMemo(
        () => models.find(model => model.id === selectedModel)?.name || 'no model name found',
        [selectedModel]
    );

    return (
        <Typography><em>{`Edit configuration display for Model: ${modelName}`}</em></Typography>
    )
}


const InfoPanel = () => {
    return (
        <Typography><em>{`Model help and info display goes here`}</em></Typography>
    )
}

const tabs = [
    {text: 'Configure', value: 'configure'},
    {text: 'Info', value: 'info'}
]

export const ColumnTertiary = ({outerSx, onToggleExpanded, index}) => {
    const { state, dispatch } = useApp();
    const {primaryNav, tertiaryNav, selectedModel, models} = state;
    const model = models.find(({id}) => id === selectedModel);
    const PanelContent = tertiaryNav === 'configure' ? ConfigurationPanel : InfoPanel
    const columnStyle = {backgroundColor: color.column_tertiary};
    if (!selectedModel) {
        return (
            <Column sx={columnStyle} index={index}>
                <Typography><em>{`Select a model on the left to configure it.`}</em></Typography>
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
