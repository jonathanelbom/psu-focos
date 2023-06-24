import React, { useRef, useState } from 'react';
import { Box } from '@mui/material';
import { ColumnPrimary } from './ModelsPrimary';
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
        <ColumnTertiary index={1} />
    </Box>
);
