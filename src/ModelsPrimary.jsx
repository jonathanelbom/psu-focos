import React from 'react';
import { Box, Card, IconButton, Typography, Button} from '@mui/material';
import { AddCircle, Delete, Edit } from '@mui/icons-material';
import { useApp } from './App';
import { Column, ColumnHeader, ColumnFooter } from './Components';
import { button, card, color, columnBoxShadow } from './styles';
import { debug } from './utils';

const Model = ({data}) => {
    const {state, dispatch} = useApp();
    const {selectedModel} = state;
    const {id, name, description, version, isDefault, lastModified} = data;
    return (
        <Card
            tabIndex={0}    
            sx={{
                transition: 'none',
                cursor: 'pointer',
                padding: '12px',
                ...(id === selectedModel && {
                    boxShadow: `0 0 0 2px ${color.blue_700}`,
                    backgroundColor: color.blue_50,
                })
            }}    
            onClick={() => {
                dispatch({
                    type: 'SET_SELECTED_MODEL',
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
                    {name}<em>{debug ? ` ${id}` : ''}</em>
                </Typography>
                {!isDefault && (
                    <IconButton
                        sx={{transform: 'translate(6px, -6px)'}}
                        aria-label="delete"
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch({
                                type: 'SET_DIALOG_DATA',
                                value: {
                                    isOpen: true,
                                    title: 'Delete Model',
                                    body: `Are you sure you want to delete ${name}. This action cannout be undone.`,
                                    actions: [{
                                        label: 'Delete',
                                        action: {
                                            type: 'REMOVE_MODEL',
                                            value: id
                                        }
                                    }]
                                }
                            });
                        }}
                    >
                        <Delete fontSize="small"/>
                    </IconButton>
                )}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '6px',
                }}
            >
                {description && (
                    <Typography variant='body2'>
                        {description}
                    </Typography>
                )}
                {version && (
                    <Typography variant='body2'>
                        <strong>{'Version: '}</strong>{version}
                    </Typography>
                )}
                {lastModified && (
                    <Typography variant='body2'>
                        <strong>{'Last modified: '}</strong>{lastModified.toString()}
                    </Typography>
                )}
            </Box>
        </Card>
    );
}

export const ColumnPrimary = ({outerSx, index}) => {
    const { state, dispatch } = useApp();
    const {models} = state;
    const hasModels = models && models.length > 0;

    return (
        <Column
            sx={{ backgroundColor: color.column_primary, ...columnBoxShadow, zIndex: 3}}
            {...(outerSx && {outerSx})}
            header={<ColumnHeader>Models</ColumnHeader>}
            index={index}
            footer={
                <ColumnFooter>
                    <Button
                        variant="outlined"
                        startIcon={<AddCircle />}
                        sx={button.footer}
                        onClick={() => {
                            // dispatch({
                            //     type: 'ADD_STRATEGY'
                            // })
                            dispatch({
                                type: 'SET_DIALOG_DATA',
                                value: {
                                    isOpen: true,
                                    title: 'Add Model',
                                    // body: `Are you sure you want to delete ${name}. This action cannout be undone and all Critiques in this strategy will also be deleted.`,
                                    componentName: 'addModel',
                                    actions: [{
                                        label: 'Add Model',
                                        action: {
                                            type: 'ADD_MODEL',
                                        }
                                    }]
                                }
                            });
                        }}
                    >
                        Add Model
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
                {!hasModels && (
                    <Typography><em>{'Use the button below to add a Strategy'}</em></Typography>
                )}
                {models.map((data) => (
                    <Model key={data.id} data={data} />
                ))}
            </Box>
        </Column>
    );
}