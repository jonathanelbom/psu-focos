import React, { useState } from 'react';
import { Box, Card, IconButton, Typography, Tabs, Tab, Button } from '@mui/material';
import { AddCircle, Delete, Edit } from '@mui/icons-material';
import { useApp } from './App';
import { DummyContent, Column, ColumnHeader, ColumnFooter, InputSlider } from './Components';
import { color } from './styles';
import { slidersForDisplay } from './utils';


export const Strategy = ({data}) => {
    const {state, dispatch} = useApp();
    const {selectedStrategy} = state;
    const {id, name, description, model, lastModified, critiques} = data;
    return (
        <Card
        sx={{
            height: '200px',
            transition: 'none',
            ...(id === selectedStrategy && {
                boxShadow: `0 0 0 2px ${color.blue_700}`,
                backgroundColor: color.blue_50,
            })
        }}    
        onClick={() => {
                dispatch({
                    type: 'SET_SELECTED_STRATEGY',
                    value: data.id,
                });
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: '12px',
                    borderBlockEnd: 'solid 1px #ccc',
                    columnGap: '8px',
                }}
            >
                <Typography variant='h6'
                    sx={{
                        fontWeight: 400,
                        flexGrow: 1,
                        wordBreak: 'break-all'
                    }}
                >
                    {name}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        columnGap: '8px',
                    }}
                >
                    <IconButton aria-label="delete" size="small">
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="delete" size="small">
                      <Delete />
                    </IconButton>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: '12px',
                    columnGap: '8px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        flexGrow: 1,
                        columnGap: '8px',
                    }}
                >
                    <Typography variant='h6'
                        sx={{
                            fontWeight: 400,
                            flexGrow: 1,
                            wordBreak: 'break-all'
                        }}
                    >
                        <em>Critiques</em>
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            columnGap: '8px',
                        }}
                    >
                        <IconButton aria-label="delete" size="small">
                            <AddCircle />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Card>
    );
}

const ColumnPrimary = () => {
    const { state, dispatch } = useApp();
    const {strategies} = state;

    return (
        <Column
            style={{ backgroundColor: '#d2d3d5' }}
            header={
                <ColumnHeader
                    sx={{ borderInlineEnd: `1px solid ${color.border_layout}`}}
                >Strategies</ColumnHeader>
            }
            footer={
                <ColumnFooter>
                    <Button
                        variant="outlined"
                        // size="small"
                        startIcon={<AddCircle />}
                        sx={{backgroundColor: '#fff', width: '100%'}}
                    >
                        Add Strategy
                    </Button>
                </ColumnFooter>
            }
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: ' 16px'
                }}
            >
                {strategies.map((data) => (
                    <Strategy key={data.id} data={data} />
                ))}
            </Box>
        </Column>
    );
}

const StrategyValues = () => {
    const { state, dispatch } = useApp();
    const {strategies, selectedStrategy, secondaryNav} = state;
    const strategy = strategies.find(({id}) => id === selectedStrategy);
    const {items} = strategy;
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '24px',
            }}
        >
            {slidersForDisplay.map((group) => (
                <Box
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
                    {group.items.map((id) => {
                        const {label, value} = items[id];
                        return (
                            <InputSlider
                                label={label}
                                value={value}
                                callback={(newValue) => {
                                    dispatch({
                                        type: 'UPDATE_STRATEGY',
                                        value: {
                                            ...strategy,
                                            items: {
                                                ...items,
                                                id: {
                                                    ...items[id],
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

const ColumnSecondary = () => {
    const { state, dispatch } = useApp();
    const {strategies, secondaryNav} = state;
    const tabs = [
        {text: 'Strategy', value: 'strategy'},
        {text: 'Critiques', value: 'critiques'}
    ]
    const Content = {
        'strategy': StrategyValues,
        'critiques': () => <div>{'Critiques'}</div>,
    }[secondaryNav];
    const onClick = (value) => {
        dispatch({
            type: 'SET_NAV',
            value: {
                secondaryNav: value
            }
        })
    };

    return (
        <Column style={{ backgroundColor: '#e2e3e5' }}
            header={
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
            }
        >
            <Content/>   
        </Column>
    )
}

export const Strategies = () => (
    <Box
        sx={{
            height: '100%',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 2fr',
        }}
    >
        <ColumnPrimary />
        <ColumnSecondary />
    </Box>
);
