import { Box,Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import { useApp } from './App';
import { Strategies } from './Strategies';
import { color } from './styles';
import { Models } from './Models';
import { Compare } from './Compare';
import { MainDialog } from './Dialogs';

const tabs = [
    // { text: 'Explore', value: 'explore' },
    { text: 'Strategies', value: 'strategies', component: Strategies },
    { text: 'Compare', value: 'compare', component: Compare },
    { text: 'Models', value: 'models', component: Models },
];

const tabsMap = tabs.reduce((acc, {value, component}) => ({
    ...acc,
    [value]: component
}), {});

const TopNav = () => {
    const { state, dispatch } = useApp();
    const { primaryNav } = state;
    return (
        <Box
            style={{
                position: 'relative',
                padding: '0 16px 0 0',
                zIndex: 2,
                backgroundColor: '#fff',
                display: 'flex',
                borderBlockEnd: `solid 1px ${color.border_layout}`,
            }}
        >
            <Typography
                variant="h6"
                onClick={() => {
                    dispatch({
                        type: 'LOG_STATE'
                    })
                }}
                sx={{
                    color: '#fff',
                    padding: '0px 6px',
                    margin: '8px',
                    marginInlineEnd: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    background: color.gray_500,
                }}
            >
                FOCOS
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    justifyContent: 'flex-start',
                }}
            >
                <Tabs
                    value={primaryNav}
                    onChange={() => { }}
                    aria-label="main navigation tabs"
                >
                    {tabs.map(({ text, value }) => (
                        <Tab
                            label={text}
                            key={text}
                            value={value}
                            {...(primaryNav !== value && {
                                onClick: () => {
                                    dispatch({
                                        type: 'SET_NAV',
                                        value: {primaryNav: value},
                                    })
                                }
                            })}
                        >
                            {text}
                        </Tab>
                    ))}
                </Tabs>
            </Box>
        </Box>
    )
}

export const Main = () => {
    const { state } = useApp();
    const { primaryNav } = state;
    const MainContent = tabsMap[primaryNav];
    return (
        <div
            style={{
                height: '100vh',
                overflow: 'auto',
                display: 'grid',
                gridTemplateRows: 'min-content 1fr',
            }}
        >
            <TopNav />
            <div
                style={{
                    backgroundColor: '#ccc',
                    overflow: 'auto'
                }}
            >
                <MainContent />
            </div>
            <MainDialog />
        </div>
    );
}
