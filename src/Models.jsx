import React, { useRef, useState } from 'react';
import { Box } from '@mui/material';
import { ColumnPrimary } from './ModelsPrimary';
// import { ColumnSecondary } from './StrategiesSecondary';
import { ColumnTertiary } from './ModelsTertiary';

export const Models = () => (
    <Box
        sx={{
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
        }}
    >
        <ColumnPrimary index={0} />
        {/* <ColumnSecondary index={1} /> */}
        <ColumnTertiary index={1} />
    </Box>
);
