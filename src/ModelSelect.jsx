import React from 'react';
import { Box, Card, IconButton, Typography, Tabs, Tab, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useApp } from './App';

export const ModelSelect = () => {
    const { state, dispatch } = useApp();
    const {models, selectedModel} = state;
    const fontStyle = {fontSize: '14px'}
    return (
        <Box sx={{display: 'flex', alignItems: 'baseline', textTransform: 'capitalize', columnGap: '8px', paddingInlineEnd: '6px'}}>
            <Typography sx={{color: '#898887'}}><b>Model:</b></Typography>
            <FormControl size = "small" >
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select
                    // labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedModel}
                    label=""
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                        dispatch({
                            type: 'SET_SELECTED_MODEL',
                            value: e.target.value
                        })
                    }}
                    sx={{ backgroundColor: '#fff', ...fontStyle}}
                >
                    <MenuItem value="" sx={fontStyle}><em>Select the model to use</em>
                    </MenuItem>
                    {models.map(({id, name}) => (
                        <MenuItem key={id} value={id} sx={fontStyle}>{name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};
