import React, { useRef, useState } from 'react';
import { Box } from '@mui/material';
import { ColumnPrimary } from './ComparePrimary';
import { ColumnTertiary } from './CompareTertiary';

export const Compare = () => (
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
