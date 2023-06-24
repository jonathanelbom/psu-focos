import React, { useMemo, useRef } from 'react';
import { Box, Card, IconButton, Typography, Button} from '@mui/material';
import { AddCircle, Delete, Edit } from '@mui/icons-material';
import { useApp } from './App';
import { Column, ColumnHeader, ColumnFooter } from './Components';
import { card, color, columnBoxShadow } from './styles';
import { debug } from './utils';
import { useScrollIntoView } from './useScrollIntoView';

const Compare = ({data}) => {
    const {state, dispatch} = useApp();
    const {compares} = state;
    const {id, name, description, version, isDefault, lastModified} = data;
    
    const isCompared = compares.some((compare) => compare === id);

    return (
        <Card
            tabIndex={0}    
            sx={{
                transition: 'none',
                cursor: 'pointer',
                padding: '12px',
                ...(isCompared && {
                    boxShadow: `0 0 0 2px ${color.blue_700}`,
                    backgroundColor: color.blue_50,
                })
            }}
            data-id={id} 
            onClick={() => {
                dispatch({
                    type: 'TOGGLE_COMPARING',
                    value: id,
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
    const {strategies, compares} = state;
    const hasStrategies = strategies && strategies.length > 0;
    const columnRef = useRef(null);

    useScrollIntoView(columnRef, compares[0] || '', strategies.length);

    return (
        <Column
            sx={{ backgroundColor: color.column_primary, ...columnBoxShadow, zIndex: 3}}
            {...(outerSx && {outerSx})}
            header={<ColumnHeader>Strategies to compare</ColumnHeader>}
            index={index}
            ref={columnRef}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: ' 16px'
                }}
            >
                {!hasStrategies && (
                    <Typography><em>{'Use the button below to add a Strategy'}</em></Typography>
                )}
                {strategies.map((data) => (
                    <Compare key={data.id} data={data} />
                ))}
            </Box>
        </Column>
    );
}