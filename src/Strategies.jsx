import React, { useRef, useState } from 'react';
import { Box } from '@mui/material';
import { ColumnPrimary } from './StrategiesPrimary';
import { ColumnSecondary } from './StrategiesSecondary';
import { ColumnTertiary } from './StrategiesTertiary';
import { ReportOff } from '@mui/icons-material';
import { useApp } from './App';

const boxShadowStyle = {
    boxShadow: '0 1px 12px rgba(0, 0, 0, .2)',
};

const proportions = {
    0: 1,
    1: 1,
    2: 2,
}

const defaultWidths = {
    0: 1,
    1: 1,
    2: 2,
}

const computeWidths = ({expanded, width}) => {
    const expandedCount = Object.values(expanded).reduce((acc, cur) => acc + (cur ? 1 : 0), 0)
}

export const Strategies = () => {
    const ref = useRef();
    const {state} = useApp();
    const {columns} = state.expandedData;
    return (
        <Box
            sx={{
                height: '100%',
                overflow: 'hidden',
                // display: 'grid',
                // gridTemplateColumns: '1fr 1fr 2fr',
                display: 'flex',
            }}
            ref={ref}
        >
            <ColumnPrimary
                outerSx={{width: columns[0].width, zIndex: 3, ...boxShadowStyle}}
                index={0}
                />
            <ColumnSecondary
                outerSx={{width: columns[1].width, zIndex: 2, ...boxShadowStyle}}
                index={1}
            />
            <ColumnTertiary
                outerSx={{width: columns[2].width}}
                index={2}
            />
        </Box>
    );
}
