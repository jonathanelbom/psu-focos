import React from 'react';
import { Box, Card, IconButton, Typography, Tabs, Tab, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { AddCircle, Delete } from '@mui/icons-material';
import { useApp } from './App';
import { Column, ColumnHeader, ColumnFooter, InputSlider } from './Components';
import { button, card, color } from './styles';
import { practicesForCritique, practicesForDisplay } from './utils';

const Critique = ({data}) => {
    const {id, name, practice} = data;
    const { state, dispatch } = useApp();
    const {strategies, selectedStrategy, selectedCritique} = state;
    const strategy = strategies.find(({id}) => id === selectedStrategy);
    // console.log('data:', data);
    return (
        <Card
            tabIndex={0}    
            sx={{
                transition: 'none',
                cursor: 'pointer',
                padding: '12px',
                ...(id === selectedCritique && {
                    boxShadow: `0 0 0 2px ${color.blue_700}`,
                    backgroundColor: color.blue_50,
                })
            }}    
            onClick={() => {
                dispatch({
                    type: 'SET_SELECTED_CRITIQUE',
                    value: data.id,
                });
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    columnGap: '8px',
                }}
            >
                <Typography variant='h6'
                    sx={{
                        ...card.title,
                        flexGrow: 1,
                        wordBreak: 'break-all'
                    }}
                >
                     {name}<em>{` ${id}`}</em>
                </Typography>
                <IconButton
                    sx={{transform: 'translate(6px, -6px)'}}
                    aria-label="delete"
                    size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch({
                            type: 'REMOVE_CRITIQUE',
                            value: id
                        })
                    }}
                >
                    <Delete />
                </IconButton>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '6px',
                }}
            >
                  <Typography variant='body2'>
                    {'Select a PRACTICE to critique'}
                </Typography>
                <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label"></InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={practice}
                        label=""
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                            dispatch({
                                type: 'SET_PRACTICE',
                                value: {
                                    critiqueId: id,
                                    practice: e.target.value,
                                }
                            })
                        }}
                        sx={{ backgroundColor: '#fff'}}
                    >
                        <MenuItem value="">
                            <em>None selected</em>
                        </MenuItem>
                        {practicesForCritique.map(({id, label}) => (
                            <MenuItem key={id} value={id}>{label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </Card>
    );
}

const Critiques = () => {
    const { state, dispatch } = useApp();
    const {strategies, selectedStrategy} = state;
    const strategy = strategies.find(({id}) => id === selectedStrategy) || {critiques: []};
    const {critiques} = strategy;
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '16px'
            }}
        >
            {!critiques || critiques.length < 1 && <Typography><em>{'Use the button below to add a Critique.'}</em></Typography>}
            {critiques.map((critique) => {
                return (
                    <Critique data={critique} key={critique.id}/>
                )
            })}
        </Box>
    );
}

const StrategyValues = () => {
    const { state, dispatch } = useApp();
    const {strategies, selectedStrategy} = state;
    const strategy = strategies.find(({id}) => id === selectedStrategy) || {};
    const {practices} = strategy;
    
    if (!practices) {
        return null
    }
 
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '24px',
            }}
        >
            {practicesForDisplay.map((group) => (
                <Box
                    key={group.category}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '8px'
                    }}
                >
                    <Typography
                        sx={{
                            textTransform: 'uppercase',
				            fontSize: '14px',
                            fontWeight: 500,
                        }}
                    >
                        {group.category}
                    </Typography>
                    {group.practices.map((id) => {
                        const {label, value} = practices[id];
                        return (
                            <InputSlider
                                key={`${selectedStrategy}-${id}`}
                                label={label}
                                value={value}
                                callback={(newValue) => {
                                    dispatch({
                                        type: 'UPDATE_STRATEGY',
                                        value: {
                                            ...strategy,
                                            practices: {
                                                ...practices,
                                                [id]: {
                                                    ...practices[id],
                                                    value: newValue
                                                }
                                            },
                                        }
                                    })
                                }}
                            />
                        );
                    })}
                </Box>
            ))}
        </Box>
    )
}

export const ColumnSecondary = () => {
    const { state, dispatch } = useApp();
    const {strategies, secondaryNav, selectedStrategy, selectedCritique} = state;
    const hasStrategies = strategies && strategies.length > 0;
    const strategy = hasStrategies && strategies.find(({id}) => id === selectedStrategy);
    const {critiques} = strategy || {};
    const tabs = [
        {text: 'Practices', value: 'strategy'},
        {text: 'Critiques', value: 'critiques'}
    ]
    const Content = {
        'strategy': StrategyValues,
        'critiques': Critiques,
    }[secondaryNav];
    const onClick = (value) => {
        dispatch({
            type: 'SET_NAV',
            value: {
                secondaryNav: value,
                tertiaryNav: value === 'critiques' ? 'model' : 'output',
            }
        })
    };
    const columnStyle = {backgroundColor: color.column_secondary};
    if (!hasStrategies) {
        return (
            <Column sx={columnStyle}/>
        );
    }

    if (hasStrategies && !selectedStrategy) {
        return (
            <Column sx={columnStyle}>
                <Typography><em>{'Click on a Strategy on the left to select it.'}</em></Typography>
            </Column>
        );
    }
  
    return (
        <Column 
            sx={columnStyle}
            header={(
                <ColumnHeader
                    sx={{
                        padding: 0
                    }}
                >
                    <Tabs
                        value={secondaryNav}
                        onChange={() => {}}
                        centered
                        aria-label="main navigation tabs"
                    >
                        {tabs.map(({text, value}) => (
                            <Tab
                                label={text}
                                key={text}
                                value={value}
                                disabled={['explore', 'compare'].includes(value)}
                                {...(secondaryNav !== value && {onClick: () => onClick(value)})}
                            >
                                {text}
                            </Tab>
                        ))}
                    </Tabs>
                </ColumnHeader>
            )}
            {...(secondaryNav === 'critiques' && {
                footer: (
                    <ColumnFooter>
                        <Button
                            variant="outlined"
                            startIcon={<AddCircle />}
                            sx={button.footer}
                            onClick={() => {
                                dispatch({
                                    type: 'ADD_CRITIQUE',
                                })
                            }}
                        >
                            Add Critique
                        </Button>
                    </ColumnFooter>
                )
            })}
        >
            <Content/>
        </Column>
    )
}