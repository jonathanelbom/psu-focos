import React, { useRef, useState } from 'react';
import { Box } from '@mui/material';
import { ColumnPrimary } from './StrategiesPrimary';
import { ColumnSecondary } from './StrategiesSecondary';
import { ColumnTertiary } from './StrategiesTertiary';

export const Strategies = () => (
    <Box
        sx={{
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
        }}
    >
        <ColumnPrimary index={0} />
        <ColumnSecondary index={1} />
        <ColumnTertiary index={2} />
    </Box>
);
