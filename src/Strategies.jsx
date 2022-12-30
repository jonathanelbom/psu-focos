import React from 'react';
import { Box } from '@mui/material';
import { ColumnPrimary } from './StrategiesPrimary';
import { ColumnSecondary } from './StrategiesSecondary';
import { ColumnTertiary } from './StrategiesTertiary';

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
        <ColumnTertiary />
    </Box>
);
