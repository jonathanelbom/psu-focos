import React from 'react';
import { Box, Typography } from '@mui/material';
import { useApp } from './App';
import { Column, ColumnHeader, InputSlider } from './Components';
import { color, columnBoxShadow } from './styles';
import { practicesForDisplay } from './utils';

const StrategyValues = () => {
    const { state, dispatch } = useApp();
    const {strategies, selectedStrategy} = state;
    const strategy = strategies.find(({id}) => id === selectedStrategy) || {};
    const {practices} = strategy;
    
    if (!practices) {
        return null
    }
 
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '24px',
            }}
        >
            {practicesForDisplay.map((group) => (
                <Box
                    key={group.category}
                >
                    <Typography
                        sx={{
                            textTransform: 'uppercase',
				            fontSize: '14px',
                            fontWeight: 500,
                            position: 'sticky',
                            top: 0,
                            backgroundColor: color.column_secondary,
                            zIndex: 1,
                            padding: '8px 4px',
                            marginLeft: '-4px',
                            marginRight: '-4px',
                            borderBottom: `1px solid ${color.border_layout}`
                        }}
                    >
                        {group.category}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: '8px',
                            marginTop: '8px'
                        }}
                    >
                        {group.practices.map((id) => {
                            const {label, value} = practices[id];
                            return (
                                <InputSlider
                                    key={`${selectedStrategy}-${id}`}
                                    label={label}
                                    value={value}
                                    callback={(newValue) => {
                                        dispatch({
                                            type: 'UPDATE_STRATEGY',
                                            value: {
                                                ...strategy,
                                                practices: {
                                                    ...practices,
                                                    [id]: {
                                                        ...practices[id],
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
                </Box>
            ))}
        </Box>
    )
}

export const ColumnSecondary = ({outerSx, onToggleExpanded, index}) => {
    const { state } = useApp();
    const {strategies, selectedStrategy} = state;
    const hasStrategies = strategies && strategies.length > 0;
    const strategy = hasStrategies && strategies.find(({id}) => id === selectedStrategy);
    const columnStyle = {backgroundColor: color.column_secondary, ...columnBoxShadow, zIndex: 2};
    if (!hasStrategies) {
        return (
            <Column
                sx={{backgroundColor: color.column_tertiary, zIndex: 2, borderInlineEnd: 'none'}}
                index={index}
            />
        );
    }

    if (hasStrategies && !selectedStrategy) {
        return (
            <Column sx={columnStyle} index={index}>
                <Typography><em>{'Click on a Strategy on the left to select it.'}</em></Typography>
            </Column>
        );
    }
  
    return (
        <Column 
            sx={{...columnStyle}}
            {...(outerSx && {outerSx})}
            {...(onToggleExpanded && {onToggleExpanded})}
            index={index}
            header={<ColumnHeader>Practices</ColumnHeader>}
        >
            <StrategyValues/>
        </Column>
    )
}